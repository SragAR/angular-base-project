var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');


//*****1 extract all scripts from bower_modules
gulp.task('bowerIt', function(){
return gulp.src(mainBowerFiles('**/*.js',{
    paths: {
        bowerDirectory: './libs',
        bowerrc: './.bowerrc',
        bowerJson: './bower.json'
    }
}))
.pipe(gulp.dest('bowers'));
})

//*****2 concat all bower modules except jquery and angular
gulp.task('concat-bower-scripts', function(){
return gulp.src(['!./bowers/angular.js', '!./bowers/jquery.js', 'bowers/**/*.js'])
.pipe(concat('bower.js'))
.pipe(gulp.dest('./app/bower_scripts'))
});

//*****3 concat jquery and angular 
gulp.task('concat-base-scripts', function(){
return gulp.src(['./bowers/jquery.js','./bowers/angular.js'])
.pipe(concat('base.js'))
.pipe(gulp.dest('./app/bower_scripts'))
});
//***4 concat all scripts in correct order 
gulp.task('concat-all-scripts', function(){
return gulp.src(['./app/bower_scripts/base.js','./app/bower_scripts/bower.js'])
.pipe(concat('all-bower.js'))
.pipe(gulp.dest('./app/bower_scripts'))
});
//*****5 */ injecting all modules
gulp.task('inject-all', function() {
    var target = gulp.src('index.html');
    var sources = gulp.src('./app/bower_scripts/all-bower.js', {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('bower-inject', function(){
     runSequence('bowerIt','concat-bower-scripts', 'concat-base-scripts', 'concat-all-scripts', 'inject-all');
});
