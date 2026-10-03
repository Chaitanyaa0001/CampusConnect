import express, {
    type Express,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/api", (_req, res) => {
    return res.status(200).json({
        message: "Chat service running",
    });
});

export default app;