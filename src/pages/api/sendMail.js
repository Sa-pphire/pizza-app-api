import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export default async function handler(req, res) {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const subject = "New contact Request";
        const message = req.body.message; 

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                
              type: 'OAuth2',
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
              clientId: process.env.CLIENTID,
              clientSecret: process.env.CLIENTSECRET,
              refreshToken: process.env.REFRESHTOKEN
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: subject,
            text: `You have recieved a contact request from ${name} with email; ${email}. The message is shown below:\nMessage: ${message}`,
        };
        
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function(err,data){
            if (err) reject(err)
            res.status(200).json({
                status: 200,
                message: 'Email sent successfully!'
            })
        })
    });
        
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: error.message
        })
    }
}