import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      compact: true,
    },
    {
      file: pkg.module,
      format: 'es',
      compact: true,
    },
  ],

  plugins: [typescript()],
}
