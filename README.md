This is a port of my joulebot chatbot to react native with expo

https://docs.expo.dev/

Edit app.json with your own api key

Personalities are in /src/data/personalities.js

Special thanks to this guy here:

https://www.youtube.com/watch?v=tdxgG9Gq41A

Which was what I watched before writing this version here.  I refactored a bit, updated the models used/provided personality/modified the UI to make the input area always appear above the keyboard/and disable so you aren't constantly sending requests, and added TTS.  Other additions include a 'loading' state image response while waiting for the API to return.

Added a 10 message history to mimic functionality in my other implementations

Added Dall-E integration on keywords 'Draw a' or 'draw me a'

Added 'save to phone' ability on Dall-e generated images and began work on a settings tab

Added personality switch and ability to switch username/set TTS on/off in settings tab

-- Note:  I've updated this repo to gpt-4.  At this point it is still in early access, so if you are going to try this, you will
need to change the model to gpt-3.5-turbo and reduce the tokens and max history.  Added comments in api.js to where to do this, and 
there is a little powershell script included that if you put your openAI api key in, will list the models you have access to.
