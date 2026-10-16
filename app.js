
const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({ status: "Skull API online" });
});

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await ai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: req.body.messages
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Skull API started");
});
