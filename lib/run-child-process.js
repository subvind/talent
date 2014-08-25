var exec = require('child_process').exec;
var gutil = require('gulp-util');
var Q = require('Q');

function log(stdout) {
    stdout.toString().split("\n").map(function (log) {
        gutil.log(log);
    });
}

function run(command, path) {
    var deferred = Q.defer();
    var proc = exec(command, { cwd: path });
    var res;

    log('cmd: ' + command);

    proc.stdout.on('data', function (chunk) {
        res = chunk;
        log(chunk);
    });
    proc.stderr.on('data', function (chunk) {
        res = chunk;
        log(chunk);
    });
    proc.on('close', function (code) {
        log('exit: ' + code);
        if (code) {
            deferred.reject(res);
        } else {
            deferred.resolve(res);
        }
    });

    return deferred.promise;
}

module.exports = run;