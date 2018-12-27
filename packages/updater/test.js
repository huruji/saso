const updater = require('.');

(async () => {
  const upgrade = await updater('package.json')
  console.log(upgrade)
})()
