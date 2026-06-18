import express from "express";

import { checkEligibility } from "../rag/query.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userProfile } = req.body;

    const result = await checkEligibility(userProfile);

    // await QueryHistory.create({
    //   userProfile,
    //   category: userProfile.category,
    //   results: result.schemes
    // });

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;