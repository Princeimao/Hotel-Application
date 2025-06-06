"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const server = () => {
    try {
        app_1.app.listen(process.env.PORT, () => {
            console.log(`Auth Service Listening on Port:${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log("Something went wrong while connecting to Auth Service");
        process.exit(0);
    }
};
server();
