import Express from "express";
import morgan from "morgan";
import cors from "cors";
import tweetsRouter from "./routers/tweets.routes.js";
import { FRONTEND_URL } from "./config/config.js";

const app = Express();

const corsOptions = {
  origin: FRONTEND_URL,
};

app.use(Express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/api", tweetsRouter);

export default app;
