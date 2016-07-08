var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var argv = require('yargs').argv;

var DEST_JS_DIR = '../src/main/webapp/js';
var DEST_CSS_DIR = '../src/main/webapp/css';
var COMMON_JS = 'common.js';
var IS_PRODUCTION = !gutil.env.production || gutil.env.production == undefined ? false : true;

var DEST_RUNTIME_JS_DIR = '../target/jersey-react-reflux-starter-0.1/js';

gutil.log("production?=" + IS_PRODUCTION);

var PATHS = {
    watches: ['app/**/*.jsx'],
    scripts: [
        {name: 'app', from: './app/app.jsx', to: 'app.js'}
    ]
};

/**
 * generate common script for react, react-dom, lodash, portal etc.
 */
function doCommonScript() {
    var b = browserify({debug: true})
        .require('react')
        .require('react-dom')
        .require('reflux')
        .transform(babelify.configure({presets: ["es2015", "react"]}));

    var stream = b.bundle()
        .on('error', swallowError)
        .pipe(source(COMMON_JS))
        .pipe(IS_PRODUCTION ? buffer() : gutil.noop())
        .pipe(IS_PRODUCTION ? uglify() : gutil.noop())
        .pipe(gulp.dest(DEST_JS_DIR));

    stream.on('end', function () {
        var fromjs = DEST_JS_DIR + '/' + COMMON_JS;
        gulp.src(fromjs)
            .pipe(gulp.dest(DEST_RUNTIME_JS_DIR))
            .on('end', function () {
                gutil.log('Copied', gutil.colors.green(fromjs), "->", gutil.colors.magenta(DEST_RUNTIME_JS_DIR + '/' + COMMON_JS), "Done.");
                console.log("-----------------------------------------------");
            });
        gutil.log("Copied", gutil.colors.green(DEST_JS_DIR + '/' + COMMON_JS));
    });
}

/**
 * generate app specific scripts
 */
function doAppScript(from, to) {
    var b = browserify({debug: true})
        .require(from, {entry: true})
        .external('react')
        .external('react-dom')
        .external('reflux')
        .transform(babelify.configure({presets: ["es2015", "react"]}));

    var stream = b.bundle()
        .on('error', swallowError)
        .pipe(source(to))
        .pipe(IS_PRODUCTION ? buffer() : gutil.noop())
        .pipe(IS_PRODUCTION ? uglify() : gutil.noop())
        .pipe(gulp.dest(DEST_JS_DIR));

    stream.on('end', function () {
        var fromjs = DEST_JS_DIR + '/' + to;
        gulp.src(fromjs)
            .pipe(gulp.dest(DEST_RUNTIME_JS_DIR))
            .on('end', function () {
                gutil.log('Copied', gutil.colors.green(fromjs), "->", gutil.colors.magenta(DEST_RUNTIME_JS_DIR + '/' + to), "Done.");
                console.log("-----------------------------------------------");
            });

        gutil.log("Copied", gutil.colors.green(fromjs));
    });
}

/**
 * catch and display error
 */
function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}

/**
 * common js scripts
 */
gulp.task('common', function () {
    gutil.log('Generating common script...');
    doCommonScript();
});

/**
 * script tasks
 */
gulp.task('scripts', function () {
    if (argv.file === undefined) {
        gutil.log("running all scripts");
        PATHS.scripts.forEach(function (script) {
            doAppScript(script.from, script.to);
        });
    } else {
        var script = PATHS.scripts.find(function (s) {
            return s.name === argv.file
        });
        if (script === undefined) {
            gutil.log(gutil.colors.red("script not found: " + argv.file));
            return;
        }
        gutil.log("running single script: " + script.from);
        doAppScript(script.from, script.to);
    }
});

/**
 * copy tasks
 */
gulp.task('copy-semantic', function () {
    gulp.src('./node_modules/semantic-ui/dist/semantic.min.js')
        .pipe(gulp.dest(DEST_JS_DIR + '/semantic-ui'));

    gulp.src('./node_modules/semantic-ui/dist/components/*.min.{js,css}')
        .pipe(gulp.dest(DEST_JS_DIR + '/semantic-ui/components'));

    gulp.src('./node_modules/semantic-ui/dist/semantic.min.css')
        .pipe(gulp.dest(DEST_CSS_DIR + '/semantic-ui'));

    gulp.src('./node_modules/semantic-ui/dist/themes/**/*')
        .pipe(gulp.dest(DEST_CSS_DIR + '/semantic-ui/themes'));
});
gulp.task('copy-fixed-data-table', function () {
    // gulp.src('./node_modules/fixed-data-table/dist/*.min.js')
    //   .pipe(gulp.dest(DEST_JS_DIR + '/fixed-data-table'));

    // gulp.src('./node_modules/fixed-data-table/dist/*.min.css')
    //   .pipe(gulp.dest(DEST_CSS_DIR + '/fixed-data-table'));
});
gulp.task('copy-jquery', function () {
    gulp.src('./node_modules/jquery/dist/*.min.js')
        .pipe(gulp.dest(DEST_JS_DIR + '/jquery'));
    // gulp.src('./node_modules/jquery-ui-bundle/*.min.js')
    //   .pipe(gulp.dest(DEST_JS_DIR + '/jquery'));
    // gulp.src('./node_modules/jquery-mask-plugin/dist/*.min.js')
    //   .pipe(gulp.dest(DEST_JS_DIR + '/jquery'));

    // gulp.src('./node_modules/jquery-ui-bundle/*.min.css')
    //   .pipe(gulp.dest(DEST_CSS_DIR + '/jquery'));
    // gulp.src('./node_modules/jquery-ui-bundle/images/*')
    //   .pipe(gulp.dest(DEST_CSS_DIR + '/jquery/images'));
});
gulp.task('copy-lodash', function () {
    gulp.src('./node_modules/lodash/lodash.min.js')
        .pipe(gulp.dest(DEST_JS_DIR + '/lodash'));
});

/**
 * clean dest dir
 */
gulp.task('clean', function () {
    return del([DEST_JS_DIR]);
});

/**
 * watch scripts
 */
gulp.task('watch-scripts', function () {
    gulp.watch(PATHS.watches, ['scripts'])
});

/**
 * public tasks
 */
gulp.task('default', ['scripts']);

gulp.task('copy', ['copy-jquery', 'copy-semantic', 'copy-fixed-data-table', 'copy-lodash'])

gulp.task('watch', ['watch-scripts', 'scripts']);

gulp.task('all', ['copy', 'common', 'scripts'])
