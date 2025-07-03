import "dotenv/config";
import { app } from "./app";
import { dbConnection } from "./src/db/mongo.connection";

const server = async () => {
  try {
    await dbConnection();
    app.listen(process.env.PORT, () => {
      console.log(`Listing Service Listening on Port:${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong while connecting to Auth Service");
    process.exit(0);
  }
};

server();
