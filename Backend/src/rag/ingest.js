import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";
import data from "../data/telangana_schemes_dataset.json" with { type: "json" };

const client = new ChromaClient({
  host: "chroma-production-25c6.up.railway.app",
  port: 443,
  ssl: true
});

// Delete old collection to avoid stale/duplicate data
try {
  await client.deleteCollection({ name: "telangana_schemes" });
  console.log("Old collection deleted");
} catch (err) {
  console.log("No existing collection to delete, continuing...");
}

const collection = await client.getOrCreateCollection({
  name: "telangana_schemes",
  embeddingFunction: new DefaultEmbeddingFunction()
});

const documents = data.map(item => `
Scheme Name: ${item.scheme_name}

Category: ${item.category}

Department: ${item.department}

Description:
${item.description}

Eligibility:
${item.eligibility.join("\n")}

Benefits:
${item.benefits.join("\n")}

Documents Required:
${item.documents_required.join("\n")}

Application Process:
${item.how_to_apply}

Official Link:
${item.official_link || "N/A"}

Keywords:
${item.keywords.join(", ")}
`);

const ids = data.map(
  (item, index) => item.id || `TS_${index + 1}`
);

const metadatas = data.map((item) => ({
  scheme_name: item.scheme_name,
  category: item.category,
  department: item.department,
  official_link: item.official_link || "",
  eligibility_count: item.eligibility.length,
  benefit_count: item.benefits.length
}));

const batchSize = 20;
console.log("Total IDs:", ids.length);
console.log("Unique IDs:", new Set(ids).size);

for (let i = 0; i < ids.length; i += batchSize) {
  try {
    await collection.add({
      ids: ids.slice(i, i + batchSize),
      documents: documents.slice(i, i + batchSize),
      metadatas: metadatas.slice(i, i + batchSize)
    });

    console.log(
      `Inserted ${Math.min(i + batchSize, ids.length)} / ${ids.length}`
    );
  } catch (err) {
    console.error(`Failed at batch starting index ${i}`);
    console.error(err);
    break;
  }
}

console.log("Ingestion complete!");