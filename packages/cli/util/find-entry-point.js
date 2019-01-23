const fs = require('fs');
const path = require('path')

const jsfiles = ['index.js', 'main.js', 'src/index.js', 'src/main.js'];

const htmlFiles = ['index.html', 'src/index.html'];

module.exports = (isPage) => {
  let files = [];
  if (!isPage) {
    files = files.concat(jsfiles);
  }
  files = files.concat(htmlFiles);
  console.log('fffffff')
  console.log(files)
  const a = files.filter(e => fs.existsSync(path.resolve(process.cwd(), e)))[0]
  console.log(a)
  return a
};
