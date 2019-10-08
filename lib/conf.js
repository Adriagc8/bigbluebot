/**
 * @name Conf
 *
 * @desc Set of configurations
 */

const config = require('../config/config.json')
const label = require('../config/label.js')
const logger = require('./logger.js')

let custom = config

const {
  BIGBLUEBOT_HOST,
  BIGBLUEBOT_ROOM,
  BIGBLUEBOT_WAIT,
  BIGBLUEBOT_LIFE,
  BIGBLUEBOT_BROWSER
} = process.env;

if (BIGBLUEBOT_HOST) custom.url.host = BIGBLUEBOT_HOST
else logger.error('BigBlueButton host is not defined')

if (BIGBLUEBOT_ROOM) custom.url.meeting = BIGBLUEBOT_ROOM
if (BIGBLUEBOT_BOTS) custom.bot.population = BIGBLUEBOT_BOTS
if (BIGBLUEBOT_WAIT) custom.bot.wait = BIGBLUEBOT_WAIT
if (BIGBLUEBOT_LIFE) custom.bot.life = BIGBLUEBOT_LIFE
if (BIGBLUEBOT_BROWSER) custom.browser.executablePath = BIGBLUEBOT_BROWSER

module.exports = {
  config: custom,
  label: label
}
