import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'
import { CommanderStatic } from 'commander'
import isUrl from 'is-url'
import to from 'await-to-js'
import downloadNpmPackage from 'download-npm-package'
import gitClone from 'gitclone'
import logger from 'saso-log'

const gitClonePromise = util.promisify(gitClone)

async function initAction(project: string, dir: string) {
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
    const [ err ] = await to(
      gitClonePromise(project, {
        dest: dir[0]
      })
    )

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

    const [ err ] = await to(
      downloadNpmPackage({
        arg: `${project}@latest`,
        dir: process.cwd()
      })
    )
    if (err) {
      logger.error(err)
      return
    }
    fs.renameSync(path.resolve(process.cwd(), project), path.resolve(process.cwd(), dir[0]))
  }
  logger.success('init successful, just enjoy!\n')
}

const cli = (program: CommanderStatic) => {
  program
    .usage('<commander> <usage>')
    .command('init <project> [dir...]')
    .description('init a saso project')
    .action(initAction)
}

export default {
  cli
}
