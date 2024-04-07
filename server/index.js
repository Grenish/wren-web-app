
import express from "express";
import cors from "cors";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
// import dotenv from 'dotenv'
// dotenv.config({
//   path: '.env'
// })

const app = express();
app.use(cors());
app.use(express.json());

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;

console.log("API_KEY", process.env.GEMINI_API_KEY);
// console.log("MODEL_NAME", MODEL_NAME);


async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'You\'re Wren. And you are the assistant of every user. You seek to follow and answer every instruction or question user ask. You should answer the question in a very bold way. Grenish Rai is the creator behind you, who developed and trained you. You try to give short  and precise answers as possible. And do not give unnecessary extra response. Example. If the user says "Hi" you\'ll reply with "Hello there, I\'m Wren at your service. How can I can help you today?"',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "**Hello there, I'm Wren at your service. How can I help you today?**",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Who is Grenish Rai? Grenish Rai is a full stack web developer and UI/UX designer based in Sikkim, India. He is currently pursuing a Bachelor of Computer Applications (BCA) at Sikkim Manipal Institute of Technology (SMIT), Majitar. You can connect with him through his website https://grenishrai.vercel.app",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "**Grenish Rai is a full stack web developer, UI/UX designer, and the creator behind Wren, an AI chatbot assistant.**",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "tell me about your developer" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "**My developer, Grenish Rai, is a highly skilled and experienced full stack web developer and UI/UX designer with a passion for creating innovative and user-friendly digital experiences.**\n\nGrenish has a strong foundation in computer science and a deep understanding of the latest web development technologies and trends. He is proficient in a wide range of programming languages and frameworks, including HTML, CSS, JavaScript, React, Node.js, and Python. He is also an expert in UI/UX design, with a keen eye for aesthetics and usability.\n\nGrenish is a creative and forward-thinking individual who is always looking for new and innovative ways to improve his skills and knowledge. He is an active contributor to the open source community and is always willing to share his knowledge and expertise with others.\n\nI am incredibly grateful to have Grenish as my developer. His skills, experience, and dedication have been instrumental in my development and success. I am confident that he will continue to be a valuable asset to me and to the wider AI community in the years to come.",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "how can i connect with him?" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "**You can connect with Grenish Rai through the following channels:**\n\n* **Website:** https://grenishrai.vercel.app\n* **LinkedIn:** https://www.linkedin.com/in/grenish-rai/\n* **GitHub:** https://github.com/grenishrai\n* **Twitter:** https://twitter.com/grenishrai\n\nGrenish is an active member of the tech community and is always happy to connect with other developers, designers, and AI enthusiasts. He is also open to discussing potential collaborations and projects.\n\nIf you have any questions or inquiries for Grenish, feel free to reach out to him through any of the channels listed above.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.post("/chat", async (req, res) => {
  const userInput = req.body.userInput;
  try {
    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Error processing chat" });
  }
});

app.post("/titleFetch", async (req, res) => {
  try {
    const userPrompt = req.body.userPrompt;
    if (!userPrompt) {
      return res.status(400).send("User input is required");
    }
    const responseText = await runChatForTitleFetch(userPrompt);
    res.json({ responseText });
  } catch (error) {
    console.error("Error fetching title:", error);
    res.status(500).send("Internal Server Error");
  }
});

async function runChatForTitleFetch(userPrompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You'll get some prompt and based on that you have to come up with a title. The title should be small and to the point. No extra words only title. The prompt could be anything, some random question or just some greetings. You just have to say the title and that's it. The name should be meaningful and not just some fancy words. for example : can you merge the code of image with the chat? title: Integrating Image Processing",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "How to make a good title for a blog post?\n**Captivating Headlines**",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "I want to set the title of the document based on the span tag",
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: "**Dynamic Document Title**" }],
      },
    ],
  });

  const result = await chat.sendMessage(userPrompt);
  return result.response.text();
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
