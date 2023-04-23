import axios from "axios";
import * as Speech from "expo-speech";

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
    ...data.map((item, index) => ({
      role: item.type === "user" ? "user" : "assistant",
      content: item.text,
    })),
    {
      role: "user",
      content: textInput,
    },
  ];

  try {
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
    // Convert chatbot response text to voice
    Speech.speak(text);
  } catch (error) {
    return { error };
  }
};
