import Constants from 'expo-constants'

let API_KEY

if (typeof process.env.API_KEY !== 'undefined') {
  // For the Heroku deployment (web version)
  API_KEY = process.env.API_KEY
} else {
  // For the mobile app (Expo)
  API_KEY = Constants.manifest.extra.API_KEY
}

console.log(process.env.API_KEY)

export { API_KEY }
