const shell = require('shelljs')

function exec(command, flag) {
  const stdout = shell.exec(command, {
    silent: true,
  }).stdout
  if (flag) return stdout
  return stdout.replace(/['"\s]/g, '')
}

try {
  const log = exec(
    'git log --simplify-by-decoration --pretty=format:\'%d\' | head -1 | tr -d \'()\''
  )
  if (log.startsWith('HEAD->master,tag:')) {
    exec('git reset --hard HEAD~1')
    const body = exec(
      'git log --date-order --tags --simplify-by-decoration --pretty=format:\'%b\'',
      true
    )

    const tags = body.match(/'[\s\S]+?'/)[0].match(/[\S]{2,}/g)
    tags.forEach((tag) => {
      exec(`git tag -d ${tag}`)
    })
  }
} catch (e) {
  console.log('clear failed')
}
