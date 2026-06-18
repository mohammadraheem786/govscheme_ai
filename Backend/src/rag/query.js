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

export async function checkEligibility(userProfile) {
  try {

    const searchQuery = `
      Telangana schemes for
      ${userProfile.category}
      ${userProfile.gender}
      ${userProfile.age}
      ${userProfile.casteCategory}
      income ${userProfile.annualIncome}
      ${userProfile.district}
      ${userProfile.educationLevel || ""}
      ${userProfile.employmentStatus || ""}
    `;

    const searchResults = await collection.query({
      queryTexts: [searchQuery],
      nResults: 6
    });

    const documents =
      searchResults.documents?.[0] || [];

    if (!documents.length) {
      return {
        success: false,
        schemes: []
      };
    }

    const context = documents.join("\n\n---\n\n");

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        response_format: {
          type: "json_object"
        },
        messages: [
          {
            role: "system",
            content: `
You are Telangana Government Scheme Eligibility Advisor.

Evaluate every scheme against the user's profile.

Return ONLY JSON.

Format:

{
  "schemes": [
    {
      "schemeName": "",
      "department": "",
      "status": "ELIGIBLE" | "LIKELY_ELIGIBLE" | "NOT_RECOMMENDED",
      "matchScore": 0,
      "whyMatched": [],
      "missingInformation": [],
      "whyNotRecommended": [],
      "benefits": [],
      "documentsNeeded": [],
      "nextStep": "",
      "officialLink": null
    }
  ]
}

Rules:

- 90-100 => ELIGIBLE
- 60-89 => LIKELY_ELIGIBLE
- below 60 => NOT_RECOMMENDED

Always explain WHY.

Never invent schemes.

Only use schemes found in context.

If data is missing:
add it to missingInformation.
`
          },
          {
            role: "user",
            content: `
USER PROFILE

${JSON.stringify(userProfile, null, 2)}

SCHEME DOCUMENTS

${context}
`
          }
        ]
      });

    const response = JSON.parse(
      completion.choices[0].message.content
    );

    const schemes =
      response.schemes || [];

    schemes.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    return {
      success: true,
      schemes,

      summary: {
        eligible: schemes.filter(
          s => s.status === "ELIGIBLE"
        ).length,

        likelyEligible: schemes.filter(
          s => s.status === "LIKELY_ELIGIBLE"
        ).length,

        notRecommended: schemes.filter(
          s => s.status === "NOT_RECOMMENDED"
        ).length
      }
    };

  } catch (error) {
    console.error(error);

    return {
      success: false,
      schemes: []
    };
  }
}