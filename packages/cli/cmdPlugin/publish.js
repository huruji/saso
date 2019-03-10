module.exports.cli = (program) => {
  program
    .command('publish')
    .description('start publish ')
    .action(() => {
      console.log('publish')
    })
}
