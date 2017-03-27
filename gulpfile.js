const gulp = require('gulp');

gulp.task('server:test', (done) => {
  const mocha = require('gulp-mocha');

  gulp.src(['server/**/*.spec.js'], { read: false })
    .pipe(mocha({
      ui: 'bdd',
      reporter: 'dot',
      require: ['./server/enable-power-assert']
    }))
    .on('end', done);
});

gulp.task('default', ['server:test']);
