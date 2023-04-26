import Constants from 'expo-constants'
import { Platform } from 'react-native'

let API_KEY

if (Platform.OS === 'web') {
  // For the Heroku deployment (web version)
  API_KEY = process.env.API_KEY
} else if (Constants?.manifest?.extra) {
  // For the mobile app (Expo)
  API_KEY = Constants.manifest.extra.API_KEY
}

export { API_KEY }
