import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

const client = new ChromaClient({
  host: "chroma-production-25c6.up.railway.app",
  port: 443,
  ssl: true
});

const embeddingFunction = new DefaultEmbeddingFunction();

const collection = await client.getCollection({
  name: "telangana_schemes",
  embeddingFunction
});

const test = await collection.query({
  queryTexts: ["education scholarship student fee reimbursement"],
  nResults: 5
});

console.log(test.documents[0]);