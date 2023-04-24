This is a port of my joulebot chatbot to react native with expo

https://docs.expo.dev/

Edit app.json with your own api key

It's pretty modular, all the styles are in src/styles.js and you could replace the header image with your own png.   
To give your chatbot a custom personality, edit the message content in api.js

Special thanks to this guy here:

https://www.youtube.com/watch?v=tdxgG9Gq41A

Which was what I watched before writing this version here.  I refactored a bit, updated the models used/provided personality/modified the UI to make the input area always appear above the keyboard/and disable so you aren't constantly sending requests, and added TTS.  Other additions include a 'loading' state image response while waiting for the API to return.

Added a 10 message history to mimic functionality in my other implementations

Added Dall-E integration on keywords 'Draw a' or 'draw me a'

Added 'save to phone' ability on Dall-e generated images and began work on a settings tab
