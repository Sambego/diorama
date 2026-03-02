import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
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
  external: ['react', 'react-dom', 'react-dom/client', 'react-dom/server', 'prop-types'],
  plugins: [
    resolve(),
    commonjs({ include: /node_modules/ }),
    postcss({
      modules: true,
      inject: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
  ],
};
