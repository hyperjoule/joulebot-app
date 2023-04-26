import Constants from 'expo-constants'

const API_KEY = (process.env.API_KEY === 'undefined') ? Constants.manifest.extra.API_KEY : Constants.manifest.extra.API_KEY

console.log(API_KEY)

export { API_KEY }
