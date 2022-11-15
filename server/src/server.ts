import { IGetUserAuthInfoRequest } from "./types";
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
import { verifyAuth } from "./utils/jwt";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
import commentRoute from "./routes/commentRoute";
import {
	uploadImage,
	getAssetInfo,
	cloudinaryUpload,
} from "./utils/cloudinary";
import morgan from "morgan";
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(morgan("tiny"));

// connect database
connectDB();

// routes
app.get("/ping", (_req, res) => {
	res.json({ message: "ping" });
});

app.get("/authPing", verifyAuth, (req: IGetUserAuthInfoRequest, res) => {
	console.log(req.user);

	res.send("Authenticated");
});

app.post(
	"/uploadImage",
	cloudinaryUpload.single("avatar"),
	async (req, res) => {
		console.log(req.file!.path);
		const url = await uploadImage(req.file!.path);
		res.send(url);
	}
);

app.post(
	"/uploadImages",
	cloudinaryUpload.array("photos", 12),
	async (req, res) => {
		const files = (req.files as any).map((file: any) => file.path);
		for (let i = 0; i < files.length; i++) {
			files[i] = await uploadImage(files[i]);
		}
		console.log(files);

		res.send("nice cock");
	}
);

app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`[server] running on http://localhost:${PORT}`);
});
