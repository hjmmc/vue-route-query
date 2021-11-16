import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import { name, version, author, license } from './package.json'

export default {
  input: './src/index.js',
  output: {
    file: './dist/vue-route-query.js',
    name: 'vue-route-query',
    format: 'umd',
    banner: `/*!
  * ${name} v${version}
  * (c) 2021 ${author} 
  * @license ${license}
  */`,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env'],
      plugins: ['@babel/transform-object-assign'],
    }),
  ],
}
