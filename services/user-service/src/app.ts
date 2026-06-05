import express  from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get("/api", (req, res) =>{
    return res.status(200).json({ message: "User Service running on port 3001" });
})
export default app;