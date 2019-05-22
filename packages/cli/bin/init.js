
const isUrl = require('is-url')
const fs = require('fs')
const downloadNpmPackage = require('download-npm-package')
const to = require('await-to-js').default
const gitClone = require('gitclone')
const path = require('path')
const util = require('util')
const logger = require('saso-log')


const gitClonePromise = util.promisify(gitClone)

async function initAction(project, dir) {
  if (!project) {
    logger.error('project name is needed')
  }
  if (!dir || dir.length < 1) {
    return
  }
  const isExist = fs.existsSync(path.resolve(process.cwd(), dir[0]))
  if (isExist) {
    logger.error(`${dir[0]} is not an empty directory!\n`)
    return
  }
  const isgit = isUrl(project)
  if (isgit) {
    console.log(to)
    const [err] = await to(gitClonePromise(project, {
      dest: dir[0]
    }))

    if (err) {
      logger.error(err)
      return
    }
  } else {
    const isExistProject = fs.existsSync(path.resolve(process.cwd(), project))
    if (isExistProject) {
      logger.error(`${project} is not an empty directory!\n`)
      return
    }

    const [err] = await to(downloadNpmPackage({
      arg: `${project}@latest`,
      dir: process.cwd()
    }))
    if (err) {
      logger.error(err)
      return
    }
    fs.renameSync(path.resolve(process.cwd(), project), path.resolve(process.cwd(), dir[0]))
  }
  logger.success('init successful, just enjoy!\n')
}


module.exports.cli = function init(program) {
  program
    .usage('<commander> <usage>')
    .command('init <project> [dir...]')
    .description('init a saso project')
    .action(initAction)
}
