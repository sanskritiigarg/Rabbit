import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection established");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

export default connectdb