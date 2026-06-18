import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import queryRouter from './routes/query.js';

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://govscheme-ai-git-main-mohammadraheem358-gmailcoms-projects.vercel.app/"
    ],
    credentials: true
  })
);


app.use(express.json());
app.use(cookieParser());

app.use("/api/query", queryRouter);

export default app;