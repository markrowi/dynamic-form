var gulp = require('gulp');
var useref = require('gulp-useref');
var del = require('del');
var gulpif = require('gulp-if');
const babel = require('gulp-babel');

gulp.task('babel', ['clean:tempJs'], () =>
	gulp.src('js/**.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('tempJs'))
);

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('clean:tempJs', function() {  
    return del.sync('tempJs');
})


gulp.task('build',  function(){
    return gulp.src('*.html')
        // .pipe(gulpif('*.js',babel({
        //     presets: ['env']
        // })))
      .pipe(useref())
      .pipe(gulp.dest('dist'))
  });