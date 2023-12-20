import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: 'src/gatorpower-app.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'Gatorpower', 
    sourcemap: true
  },
  plugins: [
    typescript(),
    nodeResolve(),
    copy({
      targets: [
        { src: './assets/*', dest: 'dist/assets' },
        { src: './index.html', dest: 'dist' }
      ]
    }),
    serve('dist'),
    livereload('dist')
  ]
};