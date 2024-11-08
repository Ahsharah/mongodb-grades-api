import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB using Mongoose.');
  } catch (err) {
    console.error('Connection error', err);
    process.exit(1);
  }
};

export default connectDB;