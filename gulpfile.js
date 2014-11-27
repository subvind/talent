'use strict';

// config
// don't forget to add domains to hostfile
// sudo hostile set localhost travisburandt.github.dev
var fs = require("fs");
var gulp = require('gulp');
var path = require('path');
var run = require("./lib/run-child-process");
var eventStream = require('event-stream');
var $ = require('gulp-load-plugins')();
var pouncyConfig = require("./pouncy.json");
var _ = require("lodash");

var config = {};
_.forEach(pouncyConfig, function (config, key) {
    config.root = config.path || __dirname;
    config.path = function (value) {
        // trim prefix slash?
        if (value && value.charAt(0) === '/') {
            value = value.substring(1);
        }

        // add trailing slash?
        if (config.root.charAt(-1) !== '/') {
            config.root = config.root + '/';
        }

        return path.resolve(config.root + (value || ''));
    };
    config.notPath = function (value) {
        return '!' + config.path(value);
    };
    this[config.name] = config;
}, config);

gulp.task('resume.json', function () {
    return gulp
        .src(config.dev.path('resume.json'))
        .pipe($.jsonminify())
        .pipe(gulp.dest(config.build.path()))
        .pipe($.size());
});

gulp.task('pdf', function () {
    return gulp
        .src(config.dev.path('*.pdf'))
        .pipe(gulp.dest(config.build.path()))
        .pipe($.size());
});

gulp.task('styles', function () {
    return gulp
        .src(config.dev.path('styles/**/*.scss'))
        .pipe($.rubySass({
            style: 'expanded',
            sourcemap: false
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(config.dev.path('styles')))
        .pipe($.size());
});

gulp.task('templates', function () {
    return gulp
        .src([
            config.dev.path('**/*.html'),
            config.dev.notPath('index.html'),
            config.dev.notPath('.tmp/**/*'),
            config.dev.notPath('bower_components/**/*')
        ])
        .pipe($.angularTemplatecache('app-templates.js', {
            module : 'app-templates',
            standalone: []
        }))
        .pipe(gulp.dest(config.dev.path('.tmp/js')))
});

gulp.task('scripts', function () {
    var jshint = require('gulp-jshint');

    return gulp.src([
            config.dev.path('**/*.js'),
            config.dev.notPath('.tmp/**/*.js'),
            config.dev.notPath('bower_components/**/*.js')
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
//        .pipe(jshint.reporter('fail'))
});

gulp.task('html', ['scripts', 'styles', 'templates'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src(config.dev.path('*.html'))
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
        .pipe(gulp.dest(config.build.path()))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp
        .src(config.dev.path('**/*.png'))
//        .pipe($.cache($.imagemin({
//            optimizationLevel: 3,
//            progressive: true,
//            interlaced: true
//        })))
        .pipe(gulp.dest(config.build.path()))
        .pipe($.size());
});

gulp.task('fonts', function () {
    var bootstrap = $.bowerFiles()
        .pipe($.filter([
            'bootstrap/**/*.{eot,svg,ttf,woff}'
        ]))
        .pipe($.flatten())
        .pipe(gulp.dest(config.build.path('styles/fonts')))
        .pipe($.size());

    var other = $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe(gulp.dest(config.build.path('bower_components')))
        .pipe($.size());

    return eventStream.concat(bootstrap, other);
});

gulp.task('clean', ['reset'], function () {
    return gulp
        .src([
            config.dev.path('.tmp'),
            config.build.path('*'),
            config.build.notPath('.git*')
        ], { read: false })
        .pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts', 'resume.json', 'pdf']);

gulp.task('default', ['clean'], function () {
    gulp.start('push');
});

gulp.task('reset', function () {
    return run('git reset origin/master --hard', config.build.path());
});

// generates PDF from the build directory
//gulp.task('resume.pdf', [], function () {
//    return gulp
//        .src(config.dev.path('index.html'))
//        .pipe($.html2pdf({
//            name: 'test.pdf'
//        }))
//        .pipe(gulp.dest(config.build.path()));
//});

gulp.task('push', ['build'], function () {
    return run('git fetch', config.build.path())
        .then(function (res) {
            return run('git add . --all', config.build.path());
        })
        .then(function (res) {
            return run('git status -b --porcelain --ignore-submodules', config.dev.path());
        })
        .then(function (res) {
            return run('git commit -m "'+ res +'"', config.build.path());
        })
        .then(function (res) {
            return run('git push origin HEAD:master', config.build.path());
        })
        .then(function (res) {
            return run('git submodule update --recursive --remote --force', config.dev.path());
        })
        // make sure local repo has latest submodule that we just commited
        .then(function (res) {
            return run('git add . --all', config.dev.path());
        })
});

//gulp.task('serve', ['connect'], function () {
//    require('opn')('http://localhost:9000');
//});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    var src = [
        config.dev.path('.tmp/**/*'),
        config.dev.path('components/**/*'),
        config.dev.path('states/**/*')
    ];

    gulp.src(config.dev.path('styles/*.scss'))
        .pipe(wiredep({
            directory: config.dev.path('bower_components'),
            src: src
        }))
        .pipe(gulp.dest(config.dev.path('styles')));

    gulp.src(config.dev.path('*.html'))
        .pipe(wiredep({
            directory: config.dev.path('bower_components'),
            exclude: [
                'jquery',
                'bootstrap-sass-official',
                'bootstrap'
            ],
            src: src
        }))
        .pipe(gulp.dest(config.dev.path()));
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
    devApp.use('/', express.static(config.dev.path()));

    devApp.listen(config.dev.port);

    //
    // build express app
    //
    var buildApp = express();

    // serve static files for everything else
    buildApp.use('/', express.static(config.build.path()));

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