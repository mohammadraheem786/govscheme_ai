import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

const client = new ChromaClient({
  host: "chroma-production-25c6.up.railway.app",
  port: 443,
  ssl: true
});

try {
  const collection = await client.getOrCreateCollection({
    name: "telangana_schemes",
    embeddingFunction: new DefaultEmbeddingFunction()
  });

  console.log("✅ Collection Created");
  console.log(collection.name);
} catch (err) {
  console.error(err);
}