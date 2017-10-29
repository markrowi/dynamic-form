var gulp = require('gulp');
var useref = require('gulp-useref');
var del = require('del');
var gulpif = require('gulp-if');
const babel = require('gulp-babel');

gulp.task('babel', () =>
	gulp.src('js/**.js')
		.pipe(babel({
			presets: ['env']
		}))
        .pipe(gulp.dest('temp/js'))
);

gulp.task('vendor', () =>
    gulp.src('js/vendor/**.js')   
    .pipe(gulp.dest('temp/js/vendor'))
);

gulp.task('html', () =>
    gulp.src('**.html')   
    .pipe(gulp.dest('temp'))
);


gulp.task('css', () =>
    gulp.src('css/**.css')   
    .pipe(gulp.dest('temp/css'))
);


gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('clean:temp', function() {  
    return del.sync('temp');
})


gulp.task('build',['clean:temp','clean:dist','html','css','vendor', 'babel'],  function(){
    return gulp.src('temp/*.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'))
  });