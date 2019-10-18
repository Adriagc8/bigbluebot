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
  open: {
    description: 'opens chat',
    before: main.panel.open,
    execute: async page => await util.click(page, chat.open, true),
    test: async page => await util.visible(page, chat.panel)
  },
  close: {
    description: 'closes chat',
    before: main.panel.open,
    execute: async page => await util.click(page, chat.close, true),
    test: async page => await util.hidden(page, chat.panel)
  },
  send: {
    description: 'sends chat message',
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
  },
  options: {
    clear: {
      description: 'clears chat',
      execute: async page => await options(page, chat.options.clear),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    copy: {
      description: 'copies chat',
      execute: async page => await options(page, chat.options.copy),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    },
    save: {
      description: 'saves chat',
      execute: async page => await options(page, chat.options.save),
      test: async page => {
        // TODO: evaluation test
        return true
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
