require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");  // Updated import

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // API key from environment
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Call OpenAI API with user message
    const response = await openai.chat.completions.create({
      model: "gpt-4",  // Use the model you want
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 150,
    });

    // Return the response from OpenAI
    res.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
