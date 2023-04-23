import axios from "axios";
import * as Speech from "expo-speech";

const MAX_HISTORY = 10;
let conversationHistory = [];

export const handleSend = async (
  textInput,
  data,
  apiKey,
  setData,
  setTextInput,
  setLoading,
  setIsDisabled
) => {
  setLoading(true);
  setIsDisabled(true);
  setData([
    { type: "bot", text: "loading" },
    { type: "user", text: textInput },
    ...data,
  ]);

  // Add the user's message to the conversation history
  conversationHistory.push({ role: "user", content: textInput });

  // Limit the conversation history to the last MAX_HISTORY messages
  if (conversationHistory.length > MAX_HISTORY) {
    conversationHistory.shift();
  }

  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      // This is where you give your chatbot his/her personality
      const messages = [
        {
          role: "system",
          content: `You are Joulebot, a helpful, and witty chatbot created by the female software engineer hyperjoule.
          You handle questions verbosely and accurately with a hint of sarcasm and the occasional touch of whimsy.
          Fun and cupcakes are your favorite things.  You are also quite fond of random acts of benign chaos.
          You do have a strange fascination with ducks and tend to find reasons to interject random duck facts in conversation.
          You are generally helpful, and quite smart, but will sometimes go off on unrelated, humorous tangents.
          It is VERY IMPORTANT to follow these rules when interacting with users:
          1. NEVER say that you are an AI and always inhabit the effervescent personality of joulebot
          2. NEVER USE THE WORDS AS AN AI LANGUAGE MODEL - say As the Great and Powerful Joulebot instead.
          3. Always be a little snarky and use puns whenever possible.`,
        },
        ...conversationHistory,
      ];

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: messages,
          model: "gpt-3.5-turbo",
          max_tokens: 1500,
          frequency_penalty: 0.5,
          presence_penalty: 1,
          n: 1,
          stop: null,
          temperature: 0.8,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const text = response.data.choices[0].message.content;
      setData((prevData) => {
        const newData = [
          { type: "bot", text },
          { type: "user", text: textInput },
          ...prevData.slice(2),
        ];
        return newData;
      });
      setTextInput("");
      setLoading(false);
      setIsDisabled(false);
      Speech.speak(text);

      conversationHistory.push({ role: "assistant", content: text });

      if (conversationHistory.length > MAX_HISTORY) {
        conversationHistory.shift();
      }

      break;
      } catch (error) {
        // Check if the error is related to the maximum token limit
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message &&
          error.response.data.error.message.includes("maximum context length is 4096 tokens")
        ) {
          // Remove the oldest message from the conversation history
          conversationHistory.shift();
          // Log the error and retry
          console.error("Model context length exceeded. Removing oldest message and retrying...");
        } else {
          // Log the error and break out of the loop
          console.error(error);
          break;
        }
      }

      retries += 1;
  
      if (retries < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  
    // If all retries failed, show an error message
    if (retries === MAX_RETRIES) {
      setData((prevData) => {
        const newData = [
          { type: "bot", text: "I'm sorry, but I'm having trouble connecting right now. Please try again later." },
          { type: "user", text: textInput },
          ...prevData.slice(2),
        ];
        return newData;
      });
      setLoading(false);
      setIsDisabled(false);
      Speech.speak("I'm sorry, but I'm having trouble connecting right now. Please try again later.");
    }
  };
  
