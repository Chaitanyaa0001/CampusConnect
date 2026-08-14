import express from "express";
import { env } from "./config/env.config";
import cors from "cors";
import cookieParser from "cookie-parser";

import LostAndFoundRoutes from "./routes/LostAndFoundWrapper.route.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/lost&found", LostAndFoundRoutes);

app.get("/", (req, res) => {
    res.send("Hello, Lost and Found Service!");
});

export default app;
