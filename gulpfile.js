'use strict';

// config
// don't forget to add domains to hostfile
// sudo hostile set localhost travisburandt.github.dev
var fs = require("fs");
var gulp = require('gulp');
var path = require('path');
var buildPath = path.resolve(__dirname + "/travisburandt.github.io");
var appPath = path.resolve(__dirname + "/");
var run = require("./lib/run-child-process");
var eventStream = require('event-stream');
var $ = require('gulp-load-plugins')();
var pouncyConfig = require("./pouncy.json");
var _ = require("lodash");

var config = {};
_.forEach(pouncyConfig, function  (value, key) {
    this[value.name] = value;
}, config);

//gulp.task('polymer', function () {
//    return gulp
//        .src('app/states/polymer/polymer.html')
//        .pipe($.vulcanize({
//            dest: 'app/polymer/.tmp',
//            strip: true
//        }))
//        .pipe(gulp.dest('app/polymer/.tmp'));
//});

gulp.task('resume.json', function () {
    return gulp
        .src([
            'app/resume.json'
        ])
        .pipe($.jsonminify())
        .pipe(gulp.dest(config.build.path))
        .pipe($.size());
});

gulp.task('styles', function () {
    return gulp
        .src([
            'app/styles/**/*.scss'
        ])
        .pipe($.rubySass({
            style: 'expanded',
            sourcemap: false
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles'))
        .pipe($.size());
});

gulp.task('templates', function () {
    return gulp
        .src([
            'app/**/*.html',
            '!app/index.html',
            '!app/.tmp/**/*',
            '!app/bower_components/**/*'
        ])
        .pipe($.angularTemplatecache('app-templates.js', {
            module : 'app-templates',
            standalone: []
        }))
        .pipe(gulp.dest('app/.tmp/js'))
});

gulp.task('scripts', function () {
    var jshint = require('gulp-jshint');

    return gulp.src([
            'app/**/*.js',
            '!app/.tmp/**/*.js',
            '!app/bower_components/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
//        .pipe(jshint.reporter('fail'))
});

gulp.task('html', ['scripts', 'styles', 'templates'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.rev())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest(buildPath))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp
        .src(
            'app/**/*.png'
        )
//        .pipe($.cache($.imagemin({
//            optimizationLevel: 3,
//            progressive: true,
//            interlaced: true
//        })))
        .pipe(gulp.dest(buildPath))
        .pipe($.size());
});

gulp.task('fonts', function () {
    var bootstrap = $.bowerFiles()
        .pipe($.filter([
            'bootstrap/**/*.{eot,svg,ttf,woff}'
//            'font-awesome/**/*.{eot,svg,ttf,woff}'
        ]))
        .pipe($.flatten())
        .pipe(gulp.dest(buildPath + '/styles/fonts'))
        .pipe($.size());

    var other = $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe(gulp.dest(buildPath + '/bower_components'))
        .pipe($.size());

    return eventStream.concat(bootstrap, other);
});

gulp.task('clean', ['reset'], function () {
    return gulp
        .src([
            'app/.tmp',
            buildPath + '/*',
            '!' + buildPath + '/.git*'
        ], { read: false })
        .pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts', 'resume.json']);

gulp.task('default', ['clean'], function () {
    gulp.start('push');
});

gulp.task('reset', function () {
    return run('git reset origin/master --hard', buildPath);
});

gulp.task('push', ['build'], function () {
    return run('git fetch', buildPath)
        .then(function (res) {
            return run('git add . --all', buildPath);
        })
        .then(function (res) {
            return run('git status -b --porcelain --ignore-submodules', appPath);
        })
        .then(function (res) {
            return run('git commit -m "'+ res +'"', buildPath);
        })
        .then(function (res) {
            return run('git push origin HEAD:master', buildPath);
        })
        .then(function (res) {
            return run('git submodule update --recursive --remote --force', appPath);
        })
        // make sure local repo has latest submodule that we just commited
        .then(function (res) {
            return run('git add . --all', appPath);
        })
});

//gulp.task('serve', ['connect'], function () {
//    require('opn')('http://localhost:9000');
//});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components',
            src: ['app/.tmp/**/*', 'app/components/**/*', 'app/states/**/*']
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: [
                'jquery',
                'bootstrap-sass-official',
                'bootstrap'
            ],
            src: ['app/.tmp/**/*', 'app/components/**/*', 'app/states/**/*']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', function () {

    /**
     * Express
     */
    var express = require('express');

    //
    // development express app
    //
    var devApp = express();

    devApp.use(require('connect-livereload')({
        port: config.livereload.port
    }));

    // serve static files for everything else
    devApp.use('/', express.static(__dirname + config.dev.path));

    devApp.listen(config.dev.port);

    //
    // build express app
    //
    var buildApp = express();

    // serve static files for everything else
    buildApp.use('/', express.static(__dirname + config.build.path));

    buildApp.listen(config.build.port);

    /**
     * livereload
     */
    var lr = require('tiny-lr')();
    lr.listen(config.livereload.port);

    function notifyLivereload(event) {
        console.log(event.path);
        gulp
            .src(event.path, {read: false})
            .pipe($.livereload(lr));
    }

    /**
     * Watch everything!
     */
    // watch general changes
    gulp.watch([
        'app/*.*',
        'app/images/**/*',
        'app/styles/main.css',
        'app/states/**/*',
        'app/components/**/*',
        'app/.tmp/**/*',
        '!app/**/*.scss'
    ]).on('change', function (event) {
        notifyLivereload(event);
    });

    // Watch .scss files
    gulp.watch('app/**/*.scss', function () {
        gulp.start('styles');
    });

    // Watch .html template files
    gulp
        .watch([
            'app/**/*.html',
            '!app/.tmp/**/*',
            '!app/bower_components/**/*'
        ], function () {
            gulp.start('templates');
        });

    // Watch .js files
    gulp
        .watch([
            'app/**/*.js',
            '!app/.tmp/**/*'
        ], function () {
            gulp.start('scripts');
        });

    // Watch image files
    gulp
        .watch('app/images/**/*', function () {
            gulp.start('images');
        })
        .on('change', function (event) {
            notifyLivereload(event);
        });

    // Watch bower files
    gulp.watch('bower.json', function () {
        gulp.start('wiredep');
    });
});