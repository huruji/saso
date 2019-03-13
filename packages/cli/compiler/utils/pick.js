module.exports = (obj, ...keys) => Object.keys(obj)
  .filter(key => keys.includes(key))
  .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {})
