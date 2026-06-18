import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import queryRouter from './routes/query.js';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/query", queryRouter);

export default app;