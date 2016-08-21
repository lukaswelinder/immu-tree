const gulp = require('gulp'),
      watch = require('gulp-watch'),
      sequence = require('gulp-sequence');

const rollup = require('rollup'),
      buble = require('rollup-plugin-buble'),
      eslint = require('rollup-plugin-eslint'),
      commonjs = require('rollup-plugin-commonjs'),
      node_resolve = require('rollup-plugin-node-resolve');

let cache = null;

gulp.task('bundle', rollupBundle);

gulp.task('bundle:dev', function() {

  rollupBundle();
  return watch('src/**/*.js', { read: false }, rollupBundle);

});

function rollupBundle() {

  let startTime = new Date();
  console.log(`[${ startTime.toTimeString().split(' ')[0] }] Starting bundling task...`);

  return rollup.rollup({

    entry: 'src/index.js',

    external: ['immutable'],

    globals: { immutable: 'immutable' },

    cache: cache,

    plugins: [
      buble(),
      node_resolve({
        module: true,
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: { immutable: ['Record', 'fromJS', 'Map', 'List'] }
      })
    ]

  }).then((bundle) => {

    cache = bundle;

    console.log(`Writing bundles to 'dist/'`);

    let es = bundle.write({
      dest: 'dist/bundle.es2015.js',
      format: 'es',
      exports: 'named',
      moduleName: 'immuTree',
      sourceMap: true
    });

    let umd = bundle.write({
      dest: 'dist/bundle.umd.js',
      format: 'umd',
      exports: 'named',
      globals: { immutable: 'immutable' },
      moduleName: 'immuTree',
      sourceMap: true
    });

    return Promise.all([es, umd]);

  }).then((bundles) => {

    let endTime = new Date();
    console.log(`[${ endTime.toTimeString().split(' ')[0] }] Completed bundling...`);
    console.log(`Bundling task completed in ${endTime.getTime() - startTime.getTime()} ms`);

    return bundles;

  }).catch((err) => {

    console.log(err.message, err.stack);
    return null;

  });

}