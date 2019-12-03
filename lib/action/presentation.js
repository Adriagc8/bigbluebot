/**
 * @name Presentation
 *
 * @desc Collection of bot presentation actions
 */

const conf = require('../conf.js')
const util = require('../util.js')
const perform = require('./perform.js')
const audio = require('./audio.js')

const { presentation } = conf.label

const action = {
  get upload() {
    return {
      description: 'presentation upload',
      execute: async page => {
        // TODO: interface actions
      },
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  get change() {
    return {
      description: 'presentation change',
      execute: async page => {
        // TODO: interface actions
      },
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  },
  slide: {
    get next() {
      return {
        description: 'presentation slide next',
        before: audio.modal.close,
        execute: async page => await util.click(page, presentation.slide.next, true),
        test: async page => {
          // TODO: evaluation test
          return true
        }
      }
    },
    get previous() {
      return {
        description: 'presentation slide previous',
        before: audio.modal.close,
        execute: async page => await util.click(page, presentation.slide.previous, true),
        test: async page => {
          // TODO: evaluation test
          return true
        }
      }
    }
  },
  zoom: {
    get in() {
      return {
        description: 'presentation zoom in',
        before: audio.modal.close,
        execute: async page => await util.click(page, presentation.zoom.in),
        test: async page => {
          // TODO: evaluation test
          return true
        }
      }
    },
    get out() {
      return {
        description: 'presentation zoom out',
        before: audio.modal.close,
        execute: async page => await util.click(page, presentation.zoom.out),
        test: async page => {
          // TODO: evaluation test
          return true
        }
      }
    }
  },
  get fit() {
    return {
      description: 'presentation fit',
      before: audio.modal.close,
      execute: async page => await util.click(page, presentation.fit, true),
      test: async page => {
        // TODO: evaluation test
        return true
      }
    }
  }
}

module.exports = {
  upload: async page => {
    await perform(page, action.upload)
  },
  change: async page => {
    await perform(page, action.change)
  },
  slide: {
    next: async page => {
      await perform(page, action.slide.next)
    },
    previous: async page => {
      await perform(page, action.slide.previous)
    }
  },
  zoom: {
    in: async page => {
      await perform(page, action.in)
    },
    out: async page => {
      await perform(page, action.out)
    }
  },
  fit: async page => {
    await perform(page, action.fit)
  }
}
