declare module 'terser-webpack-plugin'
declare module 'vue-loader'
declare module 'vue-loader/lib/plugin'
declare module 'size-table-webpack-plugin'
declare module 'v8-compile-cache'
declare module 'webpack-fix-style-only-entries'
declare module 'mini-css-extract-plugin'
declare module 'open-browser-plugin'
declare module 'add-server-client-script-webpack-plugin'
declare module 'html-webpack-include-assets-plugin'
declare module 'progress-bar-webpack-plugin'
declare module 'html-webpack-plugin'
declare module 'saso-log'
declare module 'assign-deep'
declare module 'semver'

declare module 'download-npm-package' {
  interface Options {
    arg: string
    dir: string
  }

  function download(opt: Options): Promise<void>

  export default download
}

declare module 'gitclone' {
  function clone(project: string, option: { dest?: string }, cb: Function): void

  export default clone
}
