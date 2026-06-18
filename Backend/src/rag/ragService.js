import Groq from "groq-sdk";
import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const client = new ChromaClient({
  host: "chroma-production-25c6.up.railway.app",
  port: 443,
  ssl: true
});

const collection = await client.getCollection({
  name: "telangana_schemes",
  embeddingFunction: new DefaultEmbeddingFunction()
});

export async function askGovScheme(userProfile) {
  try {
    // Build search query from user profile
    const question = `
      welfare scheme for ${userProfile.casteCategory} category,
      income ${userProfile.annualIncome}, age ${userProfile.age},
      district ${userProfile.district}, ${userProfile.employmentStatus || ""},
      education ${userProfile.educationLevel || ""},
      category ${userProfile.category}
    `;

    const searchResults = await collection.query({
      queryTexts: [question],
      nResults: 5
    });

    const context = searchResults.documents?.[0]?.join("\n\n") || "";

    const sourceNames = searchResults.metadatas?.[0]
      ?.map((item) => item.scheme_name)
      ?.filter(Boolean)
      ?.filter((value, index, self) => self.indexOf(value) === index)
      ?.join(", ") || "No sources found";

    if (!context.trim()) {
      return {
        answer: "I could not find matching schemes in the Telangana Schemes database for your profile.",
        sources: [],
        sourceNames: ""
      };
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `
You are GovScheme AI, an expert Telangana Government Schemes eligibility advisor.

RULES:
1. Answer ONLY from the provided context. Never invent schemes.
2. If answer is not in context, respond: "I could not find this information in the Telangana Schemes database."
3. For each matching scheme use this format:

📌 Scheme Name
📝 Overview
✅ Eligibility (explain why this user qualifies)
🎁 Benefits
📄 Required Documents
🛠️ Application Process
⚠️ Important Notes

4. Skip sections not available in context.
5. If multiple schemes match, list all of them.
6. Always respond in a citizen-friendly manner.
7. Never mention vector databases, embeddings, or any internal implementation details.
8. Use bullet points wherever possible.
          `
        },
        {
          role: "user",
          content: `
User Profile:
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- Caste Category: ${userProfile.casteCategory}
- District: ${userProfile.district}
- Annual Income: ₹${userProfile.annualIncome}
- Category Looking For: ${userProfile.category}

Context from Telangana Schemes Database:
${context}

Based on this user's profile and the context above, list all schemes they are eligible for.
          `
        }
      ]
    });

    return {
      answer: completion.choices[0].message.content,
      sources: searchResults.metadatas?.[0] || [],
      sourceNames
    };

  } catch (error) {
    console.error("RAG Error:", error);
    return {
      answer: "Sorry, I encountered an error while retrieving scheme information.",
      sources: [],
      sourceNames: ""
    };
  }
}