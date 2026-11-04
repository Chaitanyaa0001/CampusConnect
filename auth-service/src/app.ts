import express  from 'express';
import cors from 'cors';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authWrapper.route';
import jwksRoutes from './routes/jwks.route';
import { env } from './config/env.config';


const app = express();


app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ 
    origin: env.CLIENT_URL,
    credentials: true
}));    

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jwks', jwksRoutes);

app.get("/api/v1/health`", (req, res) =>{
    return res.status(200).json({status : "ok"});
})

export default app;