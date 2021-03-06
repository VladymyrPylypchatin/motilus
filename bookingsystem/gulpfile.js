var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    plumber = require('gulp-plumber'),
    run = require('run-sequence'),
    babel = require("gulp-babel"),
    browserify = require('gulp-browserify');

// Compile sass
gulp.task('sass', function () {
     return gulp.src(['source/assets/sass/main.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(['last 5 versions'], {cascade: true}))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({stream: true}))
});

// Compress css libs
gulp.task('css-libs', function () {
//    return gulp.src('source/assets/sass/libs.scss')
//         .pipe(sass())
//         .pipe(cssnano())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('dist/assets/css'));
});

// Build css
gulp.task("build-css", function () {
    run('sass', 'css-libs')
});

//Compress js
gulp.task('scripts', function () {
    return gulp.src([
        'source/assets/js/Messanger.js',
        'source/assets/js/Notificator.js',
        'source/assets/js/Validator.js',
        'source/assets/js/ServiceView.js',
        'source/assets/js/SelectAddressView.js',
        'source/assets/js/CalendarView.js',
        'source/assets/js/RegistrationView.js',
        'source/assets/js/NewPasswordView.js',
        'source/assets/js/AddCardView.js',
        'source/assets/js/LoginView.js',
        'source/assets/js/BookingStatusView.js',
        'source/assets/js/TimePickerView.js',
        'source/assets/js/AddAddressView.js',
        'source/assets/js/SelectSpecialistView.js',
        'source/assets/js/views/AddSpecialistView.js',
        'source/assets/js/Tab.js',
        'source/assets/js/tabs/TabSelectService.js',
        'source/assets/js/tabs/TabCalendar.js',
        'source/assets/js/tabs/TabCustomerInfo.js',
        'source/assets/js/tabs/TabNewPassword.js',
        'source/assets/js/tabs/TabAddCard.js',
        'source/assets/js/tabs/TabBookingStatus.js',
        'source/assets/js/tabs/TabSelectAccount.js',
        'source/assets/js/tabs/TabSelectAddress.js',
        'source/assets/js/tabs/TabSelectSpecialist.js',
        'source/assets/js/tabs/TabLogin.js',
        'source/assets/js/tabs/TabError.js',
        'source/assets/js/tabs/TabServiceDuration.js',
        'source/assets/js/tabs/TabAddAddress.js',
        'source/assets/js/BookingView.js',
        'source/assets/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(babel({
        plugins: ['@babel/plugin-proposal-optional-chaining']
    }))
    .pipe(browserify({
        insertGlobals : true,
      }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream: true}));
});

//Compress js libs
gulp.task('scripts-libs', function () {
    // return gulp.src([
    //     // 'source/assets/libs/jquery/dist/jquery.min.js',
    //     // 'source/assets/libs/Magnific-Popup-master/dist/jquery.magnific-popup.min.js'
    //     // 'source/assets/libs/jquery.mmenu/dist/jquery.mmenu.js',
    //     // 'source/assets/libs/owlcarusel/owl.carousel.min.js',
    // ])
    //     .pipe(concat('libs.min.js'))
    //     .pipe(uglify())
    //     .pipe(gulp.dest('dist/assets/js'))
});


//Browser sync
gulp.task('browser-sync', function () {
    browserSync({ // 
        proxy: 'http://motilus.booking/',
        port: 3000,
        notify: true // 
    });

});



//Compress images
gulp.task('img', function () {
    return gulp.src(['source/assets/img/*.*'], ['!source/assets/img/svg'])
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/assets/img/'));
        // .pipe(imagemin({
        //     interlaced: true,
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     use: [pngquant()]
        // }))
});

gulp.task('fonts', function () {
    return gulp.src('source/assets/fonts/**/*')
           .pipe(gulp.dest('dist/assets/fonts/'));
});


//Creating svg sprite
gulp.task('svgSprite', function () {
    return gulp.src('source/assets/img/svg/**/*.svg')
    // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "assets/img/svg/sprite.svg",
                    render: {
                        scss: {
                            dest: 'sass/_sprite.scss',
                            template: "source/assets/sass/_sprite-template.scss"
                        }
                    }
                }

            }

        }))
        .pipe(gulp.dest('source/assets/'));
});


// Clean build
gulp.task('clean', function (done) {
    del.sync('dist');
    done();
});

//Clean cahe
gulp.task('clear', function () {
    return cache.clearAll();
});

// Transport html
gulp.task('html', function () {
    return gulp.src(['source/*.html', 'source/*.php']).
    pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
});

//Build
gulp.task('build',  gulp.series('clean', 'html', 'sass',  'scripts', 'img', 'fonts'));


//Watch
gulp.task('watch', gulp.parallel('build', 'browser-sync', function () {
    gulp.watch('source/assets/sass/**/*.scss', gulp.series('sass'));
    //gulp.watch('source/assets/img/svg/**/*.svg', ['svgSprite']);//test
    gulp.watch('source/assets/img/**/*.*', gulp.parallel('img'));//test
    gulp.watch('source/*.html', gulp.parallel('html'));
    gulp.watch('source/*.php', gulp.parallel('html'));
    gulp.watch('source/assets/js/**/*.js', gulp.parallel('scripts'));
    gulp.watch('source/assets/fonts/**/*', gulp.parallel('fonts'));
}));


