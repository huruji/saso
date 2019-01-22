const fs = require('fs')

const jsfiles = [
  'index.js',
  'main.js',
  'src/index.js',
  'src/main.js',
]

const htmlFiles = [
  'index.html',
  'src/index.html'
]

module.exports = (isPage) => {
  const files = []
  if (!isPage) {
    files.push(jsfiles)
  }
  files.push(htmlFiles)
  return files.filter(fs.existsSync)[0]
}
