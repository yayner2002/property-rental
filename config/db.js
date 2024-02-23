import mongoose from "mongoose";

let connected = false;
const connectDB = async () => {
  // set strict to true so that we can't save data that doesn't match the schema
  mongoose.set("strict", true);

  if (connected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    connected = true;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;
