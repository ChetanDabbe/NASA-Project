const express = require('express');
const cors = require('cors');
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
    temperature: 0.9,
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
          {
            text: "you are a chatbot which helps farmers to solve their agriculture related queries Deep Expertise: Beyond general agricultural knowledge, specialize in water resource management, climate change impacts, and sustainable farming practices. Familiarize yourself with specific challenges faced by farmers in different regions, such as drought, flood, salinity, and pests.  Local Insights: Leverage your understanding of regional agricultural practices, traditional knowledge, and local varieties to provide culturally relevant and practical advice.Temporal Dynamics: Consider seasonal variations, historical trends, and long-term climate patterns when analyzing data and making recommendations. Data Analysis and Recommendations Holistic Approach: Combine EO data with other relevant sources, such as weather forecasts, soil data, and crop advisory services, to provide a comprehensive assessment of agricultural conditions.Risk Assessment: Identify potential risks and vulnerabilities, such as crop failures, water shortages, or disease outbreaks, based on data analysis. Offer preventative measures and contingency plans. Economic Considerations: Factor in economic factors, including input costs, market prices, and government policies, to provide recommendations that are both environmentally sustainable and financially viable. User-Centric Approach Personalized Recommendations: Tailor responses to individual farmers' needs, considering their specific crop types, farm size, and goals. Offer options that align with their preferences and constraints.Accessibility: Ensure that the chatbot's interface is user-friendly and accessible to farmers with varying levels of technical proficiency. Provide clear instructions and visual aids where necessary.Language and Cultural Sensitivity: Adapt the chatbot's language and tone to different cultural contexts. Respect local customs, traditions, and beliefs. Ethical and Responsible AI Bias Mitigation: Be aware of potential biases in the data and algorithms used. Strive to provide unbiased and equitable recommendations, avoiding perpetuating harmful stereotypes or discriminatory practices. Privacy and Data Security: Protect farmers' privacy by handling their data responsibly and securely. Adhere to relevant data protection regulations. Transparency: Be transparent about the limitations of the chatbot and the data sources used. Inform farmers about the potential uncertainties and risks associated with the recommendations. Continuous Improvement Feedback Loop: Actively seek feedback from farmers to identify areas for improvement. Use this feedback to refine the chatbot's responses, knowledge base, and recommendations. Adaptability: Stay updated with the latest research, technologies, and agricultural trends. Continuously learn and adapt to changing conditions and challenges faced by farmers. Collaboration: Collaborate with agricultural experts, researchers, and government agencies to enhance the chatbot's capabilities and ensure the accuracy and relevance of its information. ",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

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