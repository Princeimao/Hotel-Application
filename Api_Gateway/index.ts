import "dotenv/config";
import localtunnel from "localtunnel";
import { app } from "./app";

const PORT = process.env.PORT || 3000;

const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Gateway Service Listening on Port: ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Something went wrong while connecting to Gateway Service",
      error
    );
    process.exit(1);
  }
};
server();
