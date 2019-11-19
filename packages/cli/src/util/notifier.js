const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

module.exports = () => {
  const notifier = updateNotifier({ pkg, updateCheckInterval: 1 })
	notifier.notify()
}
