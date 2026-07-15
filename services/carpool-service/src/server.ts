import express from "express";
import { env } from "./config/env.config";
import app from "./app";
import "auth-sdk";


app.listen(env.PORT, () => {
    console.log(`Carpool Service is running on port ${env.PORT}`);
});
