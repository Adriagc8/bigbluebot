// const bigbluebot = require('./index.js');

// const actions = async page => {
//   await bigbluebot.audio.modal.microphone(page);
//   await bigbluebot.video.join(page);
//   await bigbluebot.chat.send(page);
// };

// bigbluebot.run(actions);
const bigbluebot = require('bigbluebot');

const actions = async page => {
  await bigbluebot.audio.modal.listen(page);
  await bigbluebot.chat.send(page);
};

const options = {
  moderator: false
};

bigbluebot.run(actions, options);