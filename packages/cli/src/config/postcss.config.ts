import { cosmiconfigSync } from 'cosmiconfig'

interface Options {
  browsers?: string[]
}

const browserlistConfig = cosmiconfigSync('browserslist', {
  stopDir: process.cwd()
}).search()
const opts: Options = {}
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
export default {
  // eslint-disable-next-line
  plugins: [ require('autoprefixer')(opts), require('cssnano') ]
}
