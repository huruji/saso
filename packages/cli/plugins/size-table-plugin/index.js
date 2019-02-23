const SizeTableWebpackPlugin = require('size-table-webpack-plugin');
const chalk = require('chalk');

module.exports.apply = (compiler) => {
  let isWatch = false;
  let port = false;
  compiler.hook('afterConfigure', (config) => {
    if (config.watch) isWatch = true;
    if (config.port) port = config.port;
  });
  compiler.hook('beforeCompile', (config) => {
    config
      .plugin('sizeTableWebpackPlugin')
      .use(SizeTableWebpackPlugin, [
        {
          clear: true,
          postmessage: isWatch && port ? chalk.blue(`\nStarting server on http://localhost:${port}`) : ''
        }
      ])
      .end();
  });
};
