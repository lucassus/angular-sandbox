const gulp = require('gulp');

gulp.task('server:test', (done) => {
  const mocha = require('gulp-mocha');

  gulp.src(['dist/server/**/*.spec.js'], { read: false })
    .pipe(mocha({
      ui: 'bdd',
      reporter: 'dot',
      require: ['./dist/server/enable-power-assert']
    }))
    .on('end', done);
});

gulp.task('default', ['server:test']);
