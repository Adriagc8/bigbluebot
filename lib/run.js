const util = require('./util');
const pool = require('./pool');
const conf = require('./conf');
const logger = require('./logger');

const { api, bot, url } = conf.config;

const dependencies = () => {
  if (!url.host) {
    logger.error('BigBlueButton host is not defined');
    return false;
  }
  return true;
};

const run = async actions => {
  if (!dependencies()) return null;
  logger.info(`Bots: ${pool.size * pool.population}`);
  logger.info(`Life: ${bot.life / 1000} seconds`);
  if (api.secret) {
    const success = await util.create();
    if (!success) return null;
  }
  const locale = await util.locale();
  let poolPromises = [];
  for (let i = 0; i < pool.size; i++) {
    poolPromises.push(pool.browsers.acquire().then(async browser => {
      let promises = [];
      for (let j = 0; j < pool.population; j++) {
        let username;
        await util.delay(bot.wait);
        promises.push(browser.newPage().then(async page => {
          username = await util.join(page, locale);
          page.bigbluebot = { username, locale };
          await actions(page);
          await page.waitForTimeout(bot.life);
          await util.screenshot(page);
          logger.info(`${username}: leaving`);
        }).catch(error => {
          logger.error(error);
          return error;
        }));
      }
      await Promise.all(promises).then(async () => {
        const { endpoint } = conf.config.browser;
        if (endpoint) {
          await browser.disconnect();
        } else {
          await browser.close();
        }
      }).catch(error => {
        logger.error(error);
        return error;
      });
    }).catch(error => {
      logger.error(error);
      return error;
    }))
    await util.delay(bot.wait * pool.population);
  }
  await Promise.all(poolPromises).finally(async () => {
    if (api.secret) await util.close();
  });
};

module.exports = run;
