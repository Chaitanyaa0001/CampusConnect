import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'auth-sdk';

import profileRoute from './routes/profile.route.js';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/profile", profileRoute);


app.get("/api", (req, res) =>{
    return res.status(200).json({ message: "User service is running" });
})

export default app;