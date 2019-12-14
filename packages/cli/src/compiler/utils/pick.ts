function pick(obj: any, ...keys: string[]): any {
  return Object.keys(obj)
    .filter((key) => keys.includes(key))
    .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {})
}

export default pick
