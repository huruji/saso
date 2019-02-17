module.exports.cli = (program) => {
  program
    .command('publish')
    .description('start publish ')
    .action((cmd, opt) => {
      console.log('publish');
    });
};
