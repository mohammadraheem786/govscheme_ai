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
Telangana Government Welfare Schemes

Category: ${userProfile.category || ""}

Gender: ${userProfile.gender || ""}

Age: ${userProfile.age || ""}

Caste Category: ${userProfile.casteCategory || ""}

Religion: ${userProfile.religion || ""}

District: ${userProfile.district || ""}

Annual Income: ${userProfile.annualIncome || ""}

Education Level: ${userProfile.educationLevel || ""}

Employment Status: ${userProfile.employmentStatus || ""}

BPL Card: ${userProfile.bplCard || ""}

Ration Card: ${userProfile.rationCard || ""}
`;

    const searchResults = await collection.query({
      queryTexts: [searchQuery],
      nResults: 10
    });

    const documents =
      searchResults.documents?.[0] || [];

    if (!documents.length) {
      return {
        success: false,
        schemes: [],
        summary: {
          eligible: 0,
          likelyEligible: 0,
          notRecommended: 0
        }
      };
    }

    const context = documents.join(
      "\n\n----------------------\n\n"
    );

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

Your task is to evaluate ONLY the schemes provided in the context.

Return ONLY VALID JSON.

Output Format:

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
      "eligibilityCriteria": [],
      "howToApply": "",
      "nextStep": "",
      "officialLink": null
    }
  ]
}

RULES:

1. Evaluate every scheme individually.

2. Compare user profile against eligibility criteria.

3. Never invent scheme names.

4. Never invent benefits.

5. Never invent documents.

6. Never invent departments.

7. Use information exactly from scheme data.

8. If user clearly satisfies eligibility:
   status = ELIGIBLE

9. If some information is missing:
   status = LIKELY_ELIGIBLE

10. If user clearly fails eligibility:
    status = NOT_RECOMMENDED

11. Match Score Guidelines:

95-100 => ELIGIBLE

70-94 => LIKELY_ELIGIBLE

0-69 => NOT_RECOMMENDED

12. Explain reasoning clearly.

13. Every scheme must appear in output.

14. Return JSON only.
`
          },
          {
            role: "user",
            content: `
USER PROFILE

${JSON.stringify(userProfile, null, 2)}

SCHEME DOCUMENTS

${context}

TASK:

1. Evaluate every scheme.

2. Generate:
   - status
   - matchScore
   - whyMatched
   - missingInformation
   - whyNotRecommended

3. Include:
   - benefits
   - documentsNeeded
   - eligibilityCriteria
   - howToApply

4. Return JSON only.
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
          (s) => s.status === "ELIGIBLE"
        ).length,

        likelyEligible: schemes.filter(
          (s) =>
            s.status === "LIKELY_ELIGIBLE"
        ).length,

        notRecommended: schemes.filter(
          (s) =>
            s.status === "NOT_RECOMMENDED"
        ).length
      }
    };
  } catch (error) {
    console.error(
      "Eligibility Error:",
      error
    );

    return {
      success: false,
      schemes: [],
      summary: {
        eligible: 0,
        likelyEligible: 0,
        notRecommended: 0
      }
    };
  }
}