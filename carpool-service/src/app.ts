import express from "express";
import { env } from "./config/env.config";
import cors from "cors";
import cookieParser from "cookie-parser";

import carpoolRoutes from "./routes/carpoolWrapper.route"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/carpools", carpoolRoutes);

app.get("/", (req, res) => {
    res.send("Hello, Carpool Service!");
});

export default app;
