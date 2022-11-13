"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        throw "Token not found";
    }
    const decoded = jsonwebtoken_1.default.verify(token.split(" ")[1], process.env.JWT_SECRET);
    if (!decoded) {
        throw "Invalid token";
    }
    req.user = await userModel_1.default.findById(decoded.sub);
    next();
};
exports.verifyAuth = verifyAuth;
//# sourceMappingURL=jwt.js.map