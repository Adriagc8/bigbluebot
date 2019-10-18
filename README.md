# BigBlueBot

BigBlueButton bots

## Requisites

A BigBlueButton server with `bbb-demo` installed

## Instructions

`npm i bigbluebot`

`cp node_modules/bigbluebot/.env.template .env`

Set your BigBlueButton server URL at the `.env` file you just copied

Create your script, e.g. `run.js`:

Join audio with microphone

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.audio.dialog.microphone(page)
}

bigbluebot.run(actions)
```

Join audio as a listener

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.audio.dialog.listen(page)
}

bigbluebot.run(actions)
```

Join video (VP8 only!)

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  // Using puppeteer with Chromium (our default case here) you will need to
  // configure bbb-webrtc-sfu to use VP8 instead of H.264
  await bigbluebot.video.join(page)
}

bigbluebot.run(actions)
```

Write in chat

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.chat.open(page)
  await bigbluebot.chat.send(page)
}

bigbluebot.run(actions)
```

`node run.js`
