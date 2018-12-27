const ncu = require('npm-check-updates')

module.exports = async (pkg, registry = 'http://legos.wq.jd.com/legosv5/registry/', filterReg = /^@legos\//) => {
  const upgraded = await ncu.run({
    packageFile: pkg,
    filter: filterReg,
    registry
  });
  return upgraded
}
