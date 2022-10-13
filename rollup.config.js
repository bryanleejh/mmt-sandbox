import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';
import rollupJson from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: ['src/index.ts'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve({ jsnext: true, preferBuiltins: true, browser: true }),
    rollupJson(),
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      tsconfigOverride: {
        exclude: ['**/*.test.tsx', '**/*.test.ts', '**/__mocks__/**/*', '**/setupTests.ts'],
      },
    }),
    commonjs({
      nclude: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/prop-types/index.js': ['elementType'],
        'node_modules/@material-ui/utils/node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef',
          'Memo',
        ],
        'node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef', 'Memo'],
      },
    }),
    sass({
      output: pkg.style,
    }),
    copy({
      targets: [{ src: 'src/styles/variables.scss', dest: 'build' }],
    }),
  ],
};
