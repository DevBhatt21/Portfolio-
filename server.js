require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");  // OpenAI import
const helmet = require("helmet"); // For setting headers securely

const app = express();
const port = 5000;

// Enable CORS for your frontend
app.use(cors());

// Helmet to set secure HTTP headers including CSP
app.use(helmet());

// Allowing specific Content Security Policy for localhost
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:5000 http://localhost:3000;");
  next();
});

// Parse JSON request bodies
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Your OpenAI API key from .env
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Call OpenAI API with the user message
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Specify the OpenAI model you want to use
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
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    menu.classList.toggle("active");
}

