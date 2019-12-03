/**
 * @name Chat
 *
 * @desc Collection of bot chat actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const main = require('./main.js')

const { chat } = conf.label
const { content } = conf.config

const options = async (page, option) => {
  await util.click(page, chat.options.open, true)
  await util.click(page, option, true)
}

const action = {
  get open() {
    return {
      description: 'chat open',
      before: main.panel.open,
      execute: async page => await util.click(page, chat.open, true),
      test: async page => await util.visible(page, chat.panel)
    }
  },
  get close() {
    return {
      description: 'chat close',
      before: main.panel.open,
      execute: async page => await util.click(page, chat.close, true),
      test: async page => await util.hidden(page, chat.panel)
    }
  },
  get send() {
    return {
      description: 'chat send',
      before: async page => await perform(page, this.open, true),
      execute: async page => {
        let messages = util.generateText(content.chat.lines)
        for (let i = 0; i < messages.length; i++) {
          await util.type(page, chat.form.input, messages[i])
          await util.click(page, chat.form.send, true)
        }
      },
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  options: {
    get clear() {
      return {
        description: 'chat clear',
        execute: async page => await options(page, chat.options.clear),
        test: async page => {
          // TODO: evaluation test
          return true
        }
      }
    },
    get copy() {
      return {
        description: 'chat copy',
        execute: async page => await options(page, chat.options.copy),
        test: async page => {
          // TODO: evaluation test
          return true
        }
      }
    },
    get save() {
      return {
        description: 'chat save',
        execute: async page => await options(page, chat.options.save),
        test: async page => {
          // TODO: evaluation test
          return true
        }
      }
    }
  }
}

module.exports = {
  open: async page => {
    await perform(page, action.open, true)
  },
  close: async page => {
    await perform(page, action.close, true)
  },
  send: async page => {
    await perform(page, action.send)
  },
  options: {
    clear: async page => {
      await perform(page, action.options.clear)
    },
    copy: async page => {
      await perform(page, action.options.copy)
    },
    save: async page => {
      await perform(page, action.options.save)
    }
  }
}
