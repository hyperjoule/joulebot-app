import axios from 'axios'
import { API_KEY } from './config'
import personalityArray, { temperatureArray } from './personalities'
const MAX_TOKENS = 1500
const MAX_HISTORY = 10 // I've played with this a bit but 10 seems to work well with the token limit 1500
const MAX_RETRIES = 3
const conversationHistory = []

export const generateImage = async (prompt, apiKey = API_KEY) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'image-alpha-001',
        prompt,
        num_images: 1,
        size: '256x256',
        response_format: 'url'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    )

    if (response.status === 200) {
      return response.data.data[0].url
    }
  } catch (error) {
    console.error('Error generating image:', error)
    if (error.response) {
      console.error('Error response data:', error.response.data)
    }
    return null
  }
}

export const handleSend = async (textInput, personalityIdx, apiKey = API_KEY) => {
  let retries = 0
  let retryDelay = 500

  // Add the user's input message to the conversation history
  conversationHistory.push({ role: 'user', content: textInput })

  // Limit the conversation history to the last MAX_HISTORY messages
  if (conversationHistory.length > MAX_HISTORY) {
    conversationHistory.shift()
  }

  while (retries < MAX_RETRIES) {
    try {
      const messages = [
        {
          role: 'system',
          content: personalityArray[personalityIdx]
        },
        ...conversationHistory
      ]
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages,
          model: 'gpt-3.5-turbo',
          max_tokens: MAX_TOKENS,
          frequency_penalty: 0.5,
          presence_penalty: 1,
          n: 1,
          stop: null,
          temperature: temperatureArray[personalityIdx]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        }
      )

      const text = response.data.choices[0].message.content
      conversationHistory.push({ role: 'assistant', content: text })

      if (conversationHistory.length > MAX_HISTORY) {
        conversationHistory.shift()
      }

      return text // Return the response text
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message &&
        error.response.data.error.message.includes('maximum context length is')
      ) {
        conversationHistory.shift()
      } else if (error.response && error.response.status === 429) {
        console.log(`Retry ${retries + 1}/${MAX_RETRIES} - waiting for ${retryDelay} ms`)
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        retryDelay *= 2 // Increase the delay for the next retry
      } else {
        console.error(error)
        break
      }
    }

    retries += 1
    if (retries < MAX_RETRIES) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  // If all retries failed, return an error message
  return "I'm sorry, but I'm having trouble connecting right now. Please try again later."
}
