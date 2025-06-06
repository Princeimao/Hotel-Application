"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var app_1 = require("./app");
var server = function () {
    try {
        app_1.app.listen(process.env.PORT, function () {
            console.log("Auth Service Listening on Port:".concat(process.env.PORT));
        });
    }
    catch (error) {
        console.log("Something went wrong while connecting to Auth Service");
        process.exit(0);
    }
};
server();
