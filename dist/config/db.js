"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    const MONGO_URI = process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;
    mongoose_1.default.connect(MONGO_URI).then(() => {
        console.log("[server] database connected");
    });
}
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map