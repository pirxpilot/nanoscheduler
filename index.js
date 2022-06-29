const assert = require('assert')

module.exports = createScheduler

/* global requestIdleCallback */

function createScheduler () {
  if (!globalThis._nanoScheduler) globalThis._nanoScheduler = scheduler()
  return globalThis._nanoScheduler
}

const method = typeof requestIdleCallback === 'function' ? requestIdleCallback : fallbackRequestIdleCallback

function scheduler () {
  let scheduled = false
  const queue = []
  return { push }

  function push (cb) {
    assert.equal(typeof cb, 'function', 'nanoscheduler.push: cb should be type function')

    queue.push(cb)
    schedule()
  }

  function schedule () {
    if (scheduled) return

    scheduled = true

    method(idleDeadline => {
      while (queue.length && idleDeadline.timeRemaining() > 0) {
        const cb = queue.shift()
        cb(idleDeadline)
      }
      scheduled = false
      if (queue.length) schedule()
    })
  }
}

function fallbackRequestIdleCallback (cb) {
  setTimeout(cb, 0, { timeRemaining: () => 1 })
}
