import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from '@rollup/plugin-swc';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      banner: "'use client';",
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      banner: "'use client';",
    },
  ],
  external: ['react', 'react-dom', 'react-dom/client', 'react-dom/server'],
  plugins: [
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    commonjs({ include: /node_modules/ }),
    postcss({
      modules: true,
      inject: true,
    }),
    swc({
      swc: {
        swcrc: false,
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: { react: { runtime: 'classic' } },
        },
      },
    }),
  ],
};
