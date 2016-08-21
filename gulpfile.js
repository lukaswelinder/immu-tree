const gulp = require('gulp'),
      watch = require('gulp-watch'),
      sequence = require('gulp-sequence');

const rollup = require('rollup'),
      buble = require('rollup-plugin-buble'),
      flow = require('rollup-plugin-flow'),
      eslint = require('rollup-plugin-eslint'),
      commonjs = require('rollup-plugin-commonjs'),
      node_resolve = require('rollup-plugin-node-resolve');



gulp.task('bundle', function() {
  let cache;

  return rollup.rollup({

    entry: 'src/index.js',
    external: 'immutable',
    plugins: [
      flow(),
      buble(),
      // eslint({ useEslintrc: true }),

      node_resolve({ module: true, jsnext: true, main: true }),
      commonjs({include: 'node_modules/**', namedExports: { 'immutable': ['Record'] } })

    ]

  }).then((bundle) => {

    cache = bundle;

    let es = bundle.write({
      dest: 'dist/bundle.es2015.js',
      format: 'es',
      exports: 'named',
      sourceMap: true
    });

    let cjs = bundle.write({
      dest: 'dist/bundle.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourceMap: true
    });

    return Promise.all([es]);

  }).catch((err) => {

    console.log(err.message, err.stack);
    return null;

  });

});

gulp.task('pack:dev', function() {
  return watch('src/**/*.js', () => sequence('bundle'))
});