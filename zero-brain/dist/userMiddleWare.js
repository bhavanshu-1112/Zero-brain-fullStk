"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
//@ts-ignore
const userMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader, config_1.JWT_SECRET);
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.id;
            next();
        }
        else {
            return res.status(403).json({ message: "You are not logged in" });
        }
    }
    catch (e) {
        console.log("Error occured: ", e);
    }
};
exports.userMiddleWare = userMiddleWare;
// override the types of express request object
