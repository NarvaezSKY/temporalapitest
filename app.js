import Express from "express";
import morgan from "morgan";
import cors from "cors";
import tweetsRouter from "./routers/tweets.routes.js";
import userRouter from "./routers/user.routes.js";
import eventsRouter from "./routers/events.routes.js";

const app = Express();

const corsOptions = {
  origin: ["http://localhost:5173","https://test-sena-book-git-ft-2335-senathreads.vercel.app"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(Express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/api", tweetsRouter);
app.use("/api", userRouter);
app.use("/api", eventsRouter);

export default app;
