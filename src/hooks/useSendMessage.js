import { useState } from 'react'
import * as Speech from 'expo-speech'
import { generateImage, handleSend as handleSendMessage } from '../api'

export const useSendMessage = (apiKey, ttsEnabled, personalityIdx) => {
  const [data, setData] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSend = async (textInput) => {
    try {
      setIsDisabled(true)
      setLoading(true)
      setData((prevData) => [{ type: 'user', text: textInput }, ...prevData])
      const isDrawRequest = textInput.toLowerCase().startsWith('draw a') || textInput.toLowerCase().startsWith('draw me a')
      if (isDrawRequest) {
        // Remove the prefix from the textInput
        const strippedInput = textInput.replace(/^(draw\s+a|draw\s+me\s+a)/i, '').trim()
        const imageUrl = await generateImage(strippedInput)
        if (imageUrl) {
          setData((prevData) => [{ type: 'bot', text: '', image: imageUrl }, ...prevData])
        } else {
          setData((prevData) => [{ type: 'bot', text: 'Error generating image.' }, ...prevData])
        }
      } else {
        const response = await handleSendMessage(textInput, personalityIdx, apiKey)
        setData((prevData) => [{ type: 'bot', text: response }, ...prevData])
        // If text-to-speech is enabled, use the Speech.speak() function.
        if (ttsEnabled) {
          Speech.speak(response, { rate: 0.9 })
        } else {
          if (await Speech.isSpeakingAsync()) {
            Speech.stop()
          }
        }
      }
      setIsDisabled(false)
      setLoading(false)
    } catch (error) {
      console.error(error)
      if (error.response) {
        console.error(error.response.data)
      }
      setIsDisabled(false)
      setLoading(false)
    }
  }

  return { data, isDisabled, loading, handleSend, setData }
}
