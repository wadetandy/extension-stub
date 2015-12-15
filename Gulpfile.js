var gulp    =  require('gulp')
var rename  =  require('gulp-rename')
var umd     =  require('gulp-umd')
var coffee  =  require('gulp-coffee')
var browserify  =  require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')

var browserSync = require('browser-sync')
var reload = browserSync.reload

gulp.task('build', function() {
    // return gulp.src('./src/extension.js')
    //     .pipe(rename('output.js'))
    //     .pipe(umd())
    //     .pipe(gulp.dest('.'))
    var b = browserify({
        entries: './src/extension.js',
        debug: true,
        transform: []
    })

    return b.bundle()
        .pipe(source('src/extension.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build'))
        .pipe(reload({stream: true}))
})

gulp.task('serve', ['build'], function() {
    browserSync({
        server: {
            baseDir: 'app',
            port: 8888
        }
    })

    return gulp.watch('src/**/*.js', ['build'])
})
