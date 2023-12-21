import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';
import User from '../../models/User.js';
import dbConnect from '../../config/db.js';
import cookieSession from 'cookie-session';
import bcrypt from 'bcrypt'

dotenv.config();
dbConnect();

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await User.findOne({email: username })
    if (!user) return done(null, false, { message: 'Incorrect username' });
    const comparePassword = await bcrypt.compareSync( password, user.password);
    if (!comparePassword) return done(null, false, { message: 'Incorrect password' });
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const sessionMiddleware = cookieSession({
  name: 'session',
  keys: [process.env.SECRET],
  maxAge: 24 * 60 * 60 * 1000,
});

export default async function handler(req, res) {
  await sessionMiddleware(req, res, async () => {
    await passport.initialize()(req, res, async () => {
      await passport.session()(req, res, async () => {
        try {
          passport.authenticate('local', (err, user, info) => {
            if (err) {
              res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
        
            if (!user) {
              res.status(401).json({ success: false, message: info.message });
            }
        
            req.logIn(user, (loginErr) => {
              if (loginErr) {
                res.status(500).json({ success: false, message: 'Login Error' });
              }
        
              return res.status(200).json({ success: true, data : {
                _id: user._id,
                email: user.email
              } });
            });
          })(req, res);
        } catch (error) {
          res.status(500).json({
            success: false,
            error: error.message,
          });
        }
      });
    });
  });
}

