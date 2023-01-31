"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const { authorization: token } = req.headers;
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.userId = payload.user._id;
        next();
    }
    catch (err) {
        res.status(401).json(`invalid token ${err}`);
    }
};
exports.default = verifyToken;
