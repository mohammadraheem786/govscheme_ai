# GovScheme AI

**An AI-powered eligibility engine for Telangana government welfare schemes.**

Instead of manually searching through dozens of government scheme websites to figure out what you qualify for, GovScheme AI takes a quick structured profile and tells you exactly which schemes you're eligible for — with a match score, the reasoning behind it, required documents, and how to apply.

🔗 **Live demo:** [govscheme-ai-git-main-mohammadraheem358-gmailcoms-projects.vercel.app](https://govscheme-ai-git-main-mohammadraheem358-gmailcoms-projects.vercel.app/)


---

## What it does

1. Pick a scheme category — Education, Farmer & Agriculture, Housing, Employment, Women & Maternity, Senior Citizen & Pension, Disability, Health, or Unorganised Workers
2. Fill a dynamic multi-step form — only the fields relevant to your selected category are shown
3. Get a structured eligibility report:
   - ✅ **Strong Matches** — schemes you clearly qualify for
   - 🟡 **Possible Matches** — schemes you may qualify for, with missing info flagged
   - 🔴 **Not Recommended** — schemes you don't qualify for, with a clear reason why
4. Download a PDF report of your results

---

## Why this is different from a chatbot

Most "government scheme assistants" are just a RAG-powered chatbot — you ask a question, it answers from retrieved documents. That's useful for lookup, but it doesn't actually solve the real problem: **most people don't know what to ask because they don't know what schemes exist.**

GovScheme AI flips this. Instead of question-answering, it does **structured eligibility matching** — it takes your actual profile data, retrieves the schemes relevant to your category, and reasons over each one's eligibility criteria against your specific values to produce a decision, not just an answer.

---

## Tech Stack

**Frontend**
- React.js + Tailwind CSS
- Dynamic multi-step form with category-based conditional rendering
- Axios for API communication
- Client-side PDF report generation

**Backend**
- Node.js + Express.js
- LangChain.js for RAG orchestration
- ChromaDB (hosted on Railway) as the vector store
- Groq API (LLaMA 3.3 70B) for eligibility reasoning

**Dataset**
- 25+ structured Telangana government welfare schemes covering agriculture, education, housing, health, women welfare, pensions, disability support, and unorganised worker schemes — each with detailed eligibility criteria, benefits, required documents, and application steps

---

## Architecture

```
React Frontend (Vercel)
       │
       │  POST /api/query  { userProfile, category }
       ▼
Node.js + Express Backend (Render)
       │
       │  1. Build category-specific search query from profile
       │  2. Retrieve relevant scheme documents from ChromaDB
       │  3. Pass profile + retrieved context to Groq LLM
       │  4. Groq reasons over eligibility criteria vs. profile values
       ▼
Structured JSON response
  { schemeName, status, matchScore, whyMatched,
    whyNotRecommended, missingInformation, benefits,
    documentsNeeded, nextStep, officialLink }
       │
       ▼
Results rendered as scored, categorized scheme cards
```

---

## Key Engineering Challenges Solved

- **Retrieval accuracy** — early versions returned semantically similar but category-irrelevant schemes (e.g., agriculture schemes for an education query). Fixed by building category-specific search term mapping and structuring ChromaDB metadata with proper category tagging.
- **Eligibility reasoning vs. generic Q&A** — restructured the LLM prompt from a "scheme assistant" persona to a strict "eligibility checker" that evaluates each retrieved scheme against explicit profile fields, producing a JSON decision rather than a conversational answer.
- **Dynamic form complexity** — government schemes require different inputs depending on category (a farmer needs land size; a student needs course type). Built a config-driven dynamic form where category selection determines which fields render, keeping the UX fast instead of one long generic form.

---

## Running Locally

**Backend**
```bash
cd Backend
npm install
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

Create a `.env` file in `Backend/` with:
```
GROQ_API_KEY=your_groq_api_key
CHROMA_URL=your_chromadb_url
PORT=5000
```

And in `client/`:
```
VITE_API_URL=http://localhost:5000
```

---

## Future Improvements

- Source citation per scheme — link each eligibility decision back to the exact government document chunk used
- Hard rule-based pre-filtering (income brackets, age limits) before LLM reasoning, for full determinism
- Multi-language support for Telugu and Hindi
- Saved/shareable eligibility reports via unique link

---

## Author

**Mohammad Raheem**
[GitHub](https://github.com/mohammadraheem786) · [LeetCode](https://leetcode.com/mohammadraheem359)