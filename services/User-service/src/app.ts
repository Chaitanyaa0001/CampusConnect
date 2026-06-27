import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.get("/api", (req, res) =>{
    return res.status(200).json({ message: "Auth service running on port gandu  " });
})

export default app;