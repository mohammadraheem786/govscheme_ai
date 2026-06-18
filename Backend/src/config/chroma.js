import { ChromaClient } from "chromadb";
const client = new ChromaClient({
  host: "chroma-production-25c6.up.railway.app",
  port: 443,
  ssl: true
});