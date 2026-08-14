import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Chat service is running",
    });
});

export default app;
