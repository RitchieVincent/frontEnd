var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('karma').server;
var uglify = require('gulp-uglify');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/blueGreen.scss')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
    
    gulp.src('./scss/blueRed.scss')
        .pipe(sass())
        .pipe(minifyCss({
        keepSpecialComments: 0
    }))
        .pipe(rename({
        extname: '.min.css'
    }))
        .pipe(gulp.dest('./www/css/'))

    gulp.src('./scss/dpurplePink.scss')
        .pipe(sass())
        .pipe(minifyCss({
        keepSpecialComments: 0
    }))
        .pipe(rename({
        extname: '.min.css'
    }))
        .pipe(gulp.dest('./www/css/'))

    gulp.src('./scss/greyBlue.scss')
        .pipe(sass())
        .pipe(minifyCss({
        keepSpecialComments: 0
    }))
        .pipe(rename({
        extname: '.min.css'
    }))
        .pipe(gulp.dest('./www/css/'))

    gulp.src('./scss/orangeGreen.scss')
        .pipe(sass())
        .pipe(minifyCss({
        keepSpecialComments: 0
    }))
        .pipe(rename({
        extname: '.min.css'
    }))
        .pipe(gulp.dest('./www/css/'))

    gulp.src('./scss/purpleGrey.scss')
        .pipe(sass())
        .pipe(minifyCss({
        keepSpecialComments: 0
    }))
        .pipe(rename({
        extname: '.min.css'
    }))
        .pipe(gulp.dest('./www/css/'))

    gulp.src('./scss/purplePink.scss')
        .pipe(sass())
        .pipe(minifyCss({
        keepSpecialComments: 0
    }))
        .pipe(rename({
        extname: '.min.css'
    }))
        .pipe(gulp.dest('./www/css/'))

    gulp.src('./scss/redBlue.scss')
        .pipe(sass())
        .pipe(minifyCss({
        keepSpecialComments: 0
    }))
        .pipe(rename({
        extname: '.min.css'
    }))
        .pipe(gulp.dest('./www/css/'))



    gulp.src('./scss/materialize.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))

    .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});










gulp.task('test', function(done){
    karma.start({
        configFile: __dirname + '/tests/my.conf.js',
        singleRun: true
    }, function(){
        done();
    });
});










gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});