import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: './src/index.tsx',
  output: [{
    file: './dist/index.js',
    format: 'cjs',
  }, {
    file: './dist/index.esm.js',
    format: 'esm',
  }, {
    file: './dist/index.umd.js',
    format: 'umd',
    name: 'skeleton-screen'
  }],
  plugins: [
    typescript(),
    postcss({
      modules: true
    }),
  ],
  external: ['react', 'react-dom']
}

export default config
