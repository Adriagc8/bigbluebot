# BigBlueBot

BigBlueButton bots

## Requirements

A BigBlueButton server with `bbb-demo` installed or setting the server API secret

## Instructions

**IMPORTANT**: do not run this lib with `root` privileges

`npm i bigbluebot`

`cp node_modules/bigbluebot/.env.template .env`

### Set your environment variables

At the `.env` file you just copied, set:

 - your BigBlueButton server URL
```
BIGBLUEBOT_HOST=https://your.bigbluebutton.server
```
 - [optional] room name - for a room that is to be created
```
BIGBLUEBOT_ROOM=Demo Meeting
```
 - [optional] your BigBlueButton server API secret
```
BIGBLUEBOT_SECRET=yourbigbluebuttonsecret
```
 - [optional] number of bots to join the room
```
BIGBLUEBOT_BOTS=1
```
 - [optional] time (milliseconds) between bots to join
```
BIGBLUEBOT_WAIT=2000
```
 - [optional] time (milliseconds) of a bot life span
```
BIGBLUEBOT_LIFE=60000
```
 - [optional] external browser to be used
```
BIGBLUEBOT_BROWSER=/path/to/your/browser
```
 - [optional] number of browser processes
```
BIGBLUEBOT_POOL=1
```
 - [optional] endpoint browser websocket to be used
```
BIGBLUEBOT_ENDPOINT=wss://your.browser.websocket
```
 - [optional] endpoint authentication token
```
BIGBLUEBOT_TOKEN=yourauthenticationtoken
```
 - [optional] log level
```
BIGBLUEBOT_LOG=info
```

### Let bots join an existing room

If you would like the bots to join an existing room, you may fill
out the following variables. To find out these variables, you may
call the `getMeetings` route of your BBB instance as described
[here](https://docs.bigbluebutton.org/dev/api.html#getmeetings).

 - [optional] the `meetingID` of the existing room as shown in getMeetings
```
BIGBLUEBOT_ROOM_ID=0123456789abcdef0123456789abcdef01234567
```

 - [optional] the `attendeePW` as shown in getMeetings
```
BIGBLUEBOT_ATTENDEE_PW=qwertyuiopas
```

 - [optional] the `moderatorPW` as shown in getMeetings
```
BIGBLUEBOT_MODERATOR_PW=abcdefghijkl
```

### Make a run script

Create your script, e.g. `run.js`:

Join audio with microphone

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.audio.modal.microphone(page)
}

bigbluebot.run(actions)
```

Join audio as a listener

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.audio.modal.listen(page)
}

bigbluebot.run(actions)
```

Join video

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  // H.264 users must use an external Chrome instance
  await bigbluebot.video.join(page)
}

bigbluebot.run(actions)
```

Write in chat

```js
const bigbluebot = require('bigbluebot')

let actions = async page => {
  await bigbluebot.chat.send(page)
}

bigbluebot.run(actions)
```

### Run your script

`node run.js`
