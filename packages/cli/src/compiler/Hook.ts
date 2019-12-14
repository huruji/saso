class Hooks {
  hooks: Map<string, Function>
  constructor() {
    this.hooks = new Map()
  }

  add(name: string, fn: Function): void {
    const hooks = this.get(name)
    hooks.add(fn)
    this.hooks.set(name, hooks)
  }

  get(name: string): Set<Function> {
    return this.hooks.get(name) || new Set()
  }

  invoke(name: string, ...args: any[]): void {
    /* eslint-disable */
    for (const hook of this.get(name)) {
      hook(...args)
    }
    /* eslint-enable */
  }

  async invokePromise(name: string, ...args: any[]): Promise<void> {
    /* eslint-disable */
    for (const hook of this.get(name)) {
      await hook(...args)
    }
    /* eslint-enable */
  }
}

export default Hooks
