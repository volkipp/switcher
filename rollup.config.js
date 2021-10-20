import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      compact: true,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      compact: true,
      sourcemap: true,
    },
  ],

  plugins: [
    typescript({
      declaration: true,
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
}
