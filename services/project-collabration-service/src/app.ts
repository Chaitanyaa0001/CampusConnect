import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import  projectroutes from "./routes/projectsWrapper.route.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/projects", projectroutes);

app.get("/", (req, res) => {
    res.send("Hello, Project Service!");
});

export default app;
