import "dotenv/config";
import { app } from "./app";

const server = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Auth Service Listening on Port:${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong while connecting to Auth Service");
    process.exit(0);
  }
};

server();
