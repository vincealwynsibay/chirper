"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db");
const jwt_1 = require("./utils/jwt");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
(0, db_1.connectDB)();
app.get("/ping", (_req, res) => {
    res.send("ping");
});
app.get("/authPing", jwt_1.verifyAuth, (req, res) => {
    console.log(req.user);
    res.send("Authenticated");
});
app.use(userRoute_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server] running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map