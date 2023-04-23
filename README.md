This is a port of my joulebot chatbot to react native with expo

Start a new expo project, copy this repo and rename app_default.json to app.json

Edit app.json with your own api key

Special thanks to this guy here:

https://www.youtube.com/watch?v=tdxgG9Gq41A

Which was what I watched before writing this version here.  I refactored a bit, updated the models used/provided personality/modified the UI to make the input area always appear above the keyboard/and disable so you aren't constantly sending requests, and added TTS.  Other additions include a 'loading' state image response while waiting for the API to return.
