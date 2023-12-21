import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://chidinmaakunwa:XDTzagpeYlasp2SW@simplebks-api.exyjyfw.mongodb.net/?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGODB_URI);
}

export default dbConnect;
