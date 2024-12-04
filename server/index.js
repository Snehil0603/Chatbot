const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/api/recommend-jobs", async (req, res) => {
  const { resumeText } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo",
        prompt: `Suggest relevant job roles for the following resume: \n\n${resumeText}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        }
      }
    );

    res.json({ jobs: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error recommending jobs:", error);
    res.status(500).send("Error recommending jobs.");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
