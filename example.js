const nanoScheduler = require('./')

const scheduler = nanoScheduler()
let i = 10000
while (i--) scheduler.push(() => console.log(`idle time! ${Date.now()}`))
