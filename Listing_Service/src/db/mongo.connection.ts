import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(
      `${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`
    );
    console.log("connected to database successfully");
  } catch (error) {
    console.log("something went wrong while connection to mongodb", error);
    process.exit(0);
  }
};
