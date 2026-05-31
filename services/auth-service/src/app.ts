import express  from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authWrapper.route';


const app = express();

console.log("EXPRESS =", express);
console.log("TYPE =", typeof express);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/api", (req, res) =>{
    return res.status(200).json({ message: "Auth service running on port gandu  " });
})

export default app;