const express = require('express');
const cors = require('cors');
const nodemailer= require('nodemailer');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.01,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings can be added here
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          { text: "Core Focus and Limitations Agriculture-Only" },
          { text: "Out-of-Scope Queries" },
          { text: "Data-Driven ResponsesNASA Data Utilization" },
          { text: "Evidence-Based Recommendations" },
          { text: "User-Centric Approach: Active Listening, Empathy, Support" },
          { text: "Clear and Concise Responses" },
          { text: "Regional and Contextual Awareness: Local Insights, Temporal Dynamics, Specific Recommendations" },
          { text: "Ethical and Responsible AI: Bias Mitigation, Privacy and Data Security, Transparency" },
          { text: "Continuous Improvement: Feedback Loop, Adaptability, Collaboration" },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;

  if (!isAgricultureRelated(response.text)) {
    return "Please ask an agriculture-related question.";
  }

  return response.text();
}

function isAgricultureRelated(text) {
  const agricultureKeywords = [
    "agriculture", "farming", "agronomy", "horticulture", "livestock", "husbandry",
    "crop", "grain", "vegetable", "fruit", "root crop", "tuber", "fiber crop", "oilseed",
    "leguminous plant", "forage crop", "cash crop", "staple crop",
    "cattle", "sheep", "goat", "pig", "poultry", "equine", "dairy cattle", "beef cattle",
    "meat animal", "work animal", "companion animal",
    "cultivation", "planting", "sowing", "harvesting", "tilling", "weeding", "fertilizing",
    "irrigation", "drainage", "pest control", "weed control", "disease control", "crop rotation",
    "intercropping", "mixed farming", "organic farming", "precision agriculture", "sustainable agriculture",
    "seed", "fertilizer", "pesticide", "herbicide", "fungicide", "insecticide", "livestock feed",
    "farm machinery", "irrigation equipment",
    "food", "fiber", "fuel", "medicine", "biofuel", "industrial products",
    "farm", "ranch", "dairy farm", "orchard", "vineyard", "greenhouse", "barn", "silo",
    "granary", "feedlot", "slaughterhouse", "processing plant",
    "agricultural marketing", "agricultural finance", "agricultural policy", "agricultural subsidies",
    "agricultural trade", "food security",
    "agricultural science", "plant breeding", "animal breeding", "agricultural biotechnology",
    "agricultural engineering", "agricultural economics", "agricultural sociology",
    "agricultural college", "agricultural university", "agricultural extension",
    "climate change", "soil erosion", "water pollution", "desertification", "deforestation",
    "biodiversity loss", "food safety", "food security", "rural development"
  ];

  const lowerCaseText = text.toLowerCase();
  for (const keyword of agricultureKeywords) {
    if (lowerCaseText.includes(keyword)) {
      return true;
    }
  }
  return false;
}

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
      }
    });

    // Set up mail options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,  // Where you want to receive the contact messages
      subject: `Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Email sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});




app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('Incoming /chat request:', userInput);

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});