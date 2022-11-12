import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`[server] running on http://localhost:${PORT}`);
});
