const cosmiconfig = require('cosmiconfig')

const browserlistConfig = cosmiconfig('browserslist', {
  stopDir: process.cwd()
}).searchSync()
const opts = {}
if (!browserlistConfig) {
  opts.browsers = [
    '> 1%',
    'last 2 Chrome major versions',
    'last 2 Firefox major versions',
    'last 2 Edge major versions',
    'last 2 Safari major versions',
    'ie 11',
    'last 3 Android major versions',
    'last 3 ChromeAndroid major versions',
    'last 2 iOS major versions'
  ]
}
module.exports = {
  // eslint-disable-next-line
	plugins: [require('autoprefixer')(opts), require('cssnano')]
}
