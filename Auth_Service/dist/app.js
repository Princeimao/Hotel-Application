"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)());
exports.app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://authorization-sticks-champions-circle.trycloudflare.com",
    ],
    credentials: true,
}));
exports.app.use((0, cookie_parser_1.default)());
//Importing Routes
const user_route_1 = __importDefault(require("./src/router/user.route"));
exports.app.use("/", user_route_1.default);
