import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
 

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get("/api", (req, res) =>{
    return res.status(200).json({ message: "Chat service running on port   " });
})

export default app;