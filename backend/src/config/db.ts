import mongoose from "mongoose";

export const logDbConnection = async () => {
  try {
    const connected = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING!
    );

    if (connected) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to MongoDB");
  }
};
