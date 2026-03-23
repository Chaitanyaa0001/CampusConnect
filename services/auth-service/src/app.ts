import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) =>{
    return res.status(200).json({ message: "Auth service running" });
})

export default app;