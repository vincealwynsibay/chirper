import { IGetUserAuthInfoRequest } from "./types";
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
import { verifyAuth } from "./utils/jwt";
import userRoute from "./routes/userRoute";
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// connect database
connectDB();

// routes
app.get("/ping", (_req, res) => {
	res.send("ping");
});

app.get("/authPing", verifyAuth, (req: IGetUserAuthInfoRequest, res) => {
	console.log(req.user);

	res.send("Authenticated");
});

app.use(userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`[server] running on http://localhost:${PORT}`);
});
