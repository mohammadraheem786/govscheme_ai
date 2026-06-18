import dotenv from "dotenv";
dotenv.config();

import { askGovScheme } from "./ragService.js";

const answer =
  await askGovScheme(
    "What are the benefits of Rythu Bandhu?"
  );

console.log(answer);