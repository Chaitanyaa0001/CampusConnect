import express from "express";
import { env } from "./config/env.config";
import app from "./app";
import "auth-sdk";
import getAllCarpoolsRoute from "./routes/getAllCarpools.route";

app.use("/carpools", getAllCarpoolsRoute);

app.listen(env.PORT, () => {
    console.log(`Carpool Service is running on port ${env.PORT}`);
});
