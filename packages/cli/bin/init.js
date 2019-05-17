
const isUrl = require('is-url')
const downloadNpmPackage = require('download-npm-package')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const util = require('util')

const mkdir = util.promisify(mkdirp)

async function initAction(project, dir) {
  console.log(project, dir)
  if (!dir || dir.length < 1) {
    console.log('return')
    return
  }
  console.log(process.cwd())
  const isgit = isUrl(project)
  if (isgit) {
    /* TODO: git download */
    console.log('isgit')
  } else {
    const isExist = fs.existsSync(path.resolve(process.cwd(), dir[0]))

    if (isExist) return

    await mkdir(dir[0])

    await downloadNpmPackage({
      arg: `${project}@latest`, // for example, npm@2 or @mic/version@latest etc
      dir: dir[0] // package will be downlodaded to ${dir}/packageName
    })

    console.log('success')
  }
}


module.exports.cli = function init(program) {
  program
    .usage('<commander> <usage>')
    .command('init <project> [dir...]')
    .description('init a saso project')
    .action(initAction)
}
