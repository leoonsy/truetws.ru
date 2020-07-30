'use strict';

/* подключаем gulp и плагины */
const gulp = require('gulp'),  // подключаем Gulp
    plumber = require('gulp-plumber'), // модуль для отслеживания ошибок
    rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    sourcemaps = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
    sass = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
    autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
    cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS
    uglify = require('gulp-uglify'), // модуль для минимизации JavaScript
    cache = require('gulp-cache'), // модуль для кэширования
    rimraf = require('gulp-rimraf'), // плагин для удаления файлов и каталогов,
    babel = require('gulp-babel'), //перевод с новых стандартов js в старые для кроссбраузерности
    htmlmin = require('gulp-htmlmin'), //минификация html
    args = require('yargs').argv, //работа с аргументами
    rename = require('gulp-rename'), //переименование
    gulpif = require('gulp-if'), //проверка условий
    imagemin = require('gulp-imagemin'), //сжатие изображений
    imageminJpegRecompress = require('imagemin-jpeg-recompress'), //сжатие изображений
    imageminPngquant = require('imagemin-pngquant'), //сжатие изображений
    browserSync = require('browser-sync').create() //обновление браузера

/* параметры скрипта */
let mode = args.mode || 'development';
let key = args.key || 'main',
    isDev = mode == 'development',
    isProd = !isDev;

console.log(`Ключ: ${key}`);

let srcFolders = {
    main: 'src/',
    back: 'public_html_src/'
};

let buildFolders = {
    main: 'dist/',
    back: 'public_html/'
}

/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
let path = {
    src: {
        html: srcFolders[key] + '**/[^_]*.+(html|php|tpl)',
        js: srcFolders[key] + '**/[^_]*.js',
        scss: srcFolders[key] + '**/[^_]*.+(sass|scss)',
        css: srcFolders[key] + '**/[^_]*.css',
        img: srcFolders[key] + '**/[^_]*.+(jpg|jpeg|png|svg|gif)',
        other: srcFolders[key] + '**/[^_]*.!(html|php|js|sass|scss|css|jpg|jpeg|png|svg|gif|tpl)',
        dots: srcFolders[key] + '**/.*' //не получилось в watch запихать dots файлы и через |, гребаный node-glob
    },
    watch: {
        html: srcFolders[key] + '**/*.+(html|php|tpl)',
        js: srcFolders[key] + '**/*.js',
        css: srcFolders[key] + '**/*.css',
        scss: srcFolders[key] + '**/*.+(sass|scss)',
        img: srcFolders[key] + '**/*.(jpg|jpeg|png|svg|gif)',
        other: srcFolders[key] + '**/*.!(html|php|js|sass|scss|css|jpg|jpeg|png|svg|gif|tpl)',
        dots: srcFolders[key] + '**/.*' //не получилось в watch запихать dots файлы и через |, гребаный node-glob
    },
    build: {
        html: buildFolders[key] + '**/*.+(html|php|tpl)',
        js: buildFolders[key] + '**/*.js',
        scss: buildFolders[key] + '**/*.+(sass|scss)',
        css: buildFolders[key] + '**/*.css',
        img: buildFolders[key] + '**/*.+(jpg|jpeg|png|svg|gif)',
        other: buildFolders[key] + '**/*.!(html|php|js|sass|scss|css|jpg|jpeg|png|svg|gif|tpl)',
        dots: buildFolders[key] + '**/.*' //не получилось в watch запихать dots файлы и через |, гребаный node-glob
    }
};

// сбор html
gulp.task('html:build', () => {
    return gulp.src(path.src.html) // выбор всех html файлов по указанному пути
        .pipe(plumber()) // отслеживание ошибок
        .pipe(rigger()) // импорт вложений
        .pipe(gulpif(isProd, htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        })))
        //нам не нужны html в back
        .pipe(gulp.dest(buildFolders[key])) // выгружаем в dist
});

// css компиляция
gulp.task('css:build', () => {
    return gulp.src(path.src.css) // получим все стили css
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(rename({suffix: ".min"}))
        .pipe(gulpif(isDev, sourcemaps.init())) // инициализируем sourcemap
        .pipe(autoprefixer({ //префиксы
            overrideBrowserslist: ['last 25 versions'],
            cascade: false
        }))
        .pipe(gulpif(isProd, cleanCSS())) // минимизируем CSS
        .pipe(gulpif(isDev, sourcemaps.write('./'))) // записываем sourcemap
        .pipe(gulp.dest(buildFolders[key])) // выгружаем в dist
});

// scss компиляция
gulp.task('scss:build', () => {
    return gulp.src(path.src.scss) // получим все стили scss
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(rename({suffix: ".min"}))
        .pipe(gulpif(isDev, sourcemaps.init())) // инициализируем sourcemap
        .pipe(sass({outputStyle: 'expanded', includePaths: ['node_modules']})) // scss -> css
        .pipe(autoprefixer({ //префиксы
            overrideBrowserslist: ['last 25 versions'],
            cascade: false
        }))
        .pipe(gulpif(isProd, cleanCSS())) // минимизируем CSS
        .pipe(gulpif(isDev, sourcemaps.write('./'))) // записываем sourcemap
        .pipe(gulp.dest(buildFolders[key])) // выгружаем в dist
});

const isNotMinifiedFile = (file) => {
    return !/.*\.min\.js/.test(file.history[0]);
};

// сбор js
gulp.task('js:build', () => {
    return gulp.src(path.src.js) // получим файлы js
        .pipe(gulpif(isNotMinifiedFile, rename({suffix: ".min"})))
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(rigger()) // импортируем все указанные файлы js
        .pipe(gulpif(isDev, sourcemaps.init())) //инициализируем sourcemap
        .pipe(gulpif(isNotMinifiedFile, babel({
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "modules": false
                    }
                ]
            ]
        })))
        .pipe(gulpif(isProd, uglify())) // минимизируем js
        .pipe(gulpif(isDev, sourcemaps.write('./'))) //  записываем sourcemap
        .pipe(gulp.dest(buildFolders[key])) // положим готовый файл
});

// сбор img
gulp.task('img:build', () => {
    return gulp.src(path.src.img) // получим файлы img
        .pipe(gulpif(isProd, cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 60
            }),
            imageminPngquant({quality: [0.6, 0.8]}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))))
        .pipe(gulp.dest(buildFolders[key])) // положим файлы
});

// сбор остального
gulp.task('other:build', () => {
    return gulp.src(path.src.other) // выбор всех других файлов по указанному пути
        .pipe(gulp.dest(buildFolders[key])) // выкладывание готовых файлов
});

// сбор остального
gulp.task('dots:build', () => {
    return gulp.src(path.src.dots) // выбор всех точечных файлов по указанному пути
        .pipe(gulp.dest(buildFolders[key])) // выкладывание готовых файлов
});

// удаление js
gulp.task('js:clean', () => {
    return gulp.src(path.build.js, {read: false})
        .pipe(rimraf());
});

// удаление img
gulp.task('img:clean', () => {
    return gulp.src(path.build.img, {read: false})
        .pipe(rimraf());
});

// удаление html
gulp.task('html:clean', () => {
    return gulp.src(path.build.html, {read: false})
        .pipe(rimraf());
});

// удаление css
gulp.task('css:clean', () => {
    return gulp.src(path.build.css, {read: false})
        .pipe(rimraf());
});

// удаление scss
gulp.task('scss:clean', () => {
    console.log(path.build.scss);
    return gulp.src(path.build.scss, {read: false})
        .pipe(rimraf());
});

// удаление стилей
gulp.task('style:clean',
    gulp.series(
        gulp.parallel(
            'css:clean',
            'scss:clean'
        )
    )
);

// удаление other
gulp.task('other:clean', () => {
    return gulp.src(path.build.other, {read: false })
        .pipe(rimraf());
});

// удаление dots
gulp.task('dots:clean', () => {
    return gulp.src(path.build.dots, {read: false })
        .pipe(rimraf());
});

// удаление каталога dist 
gulp.task('clean', () => {
    return gulp.src(buildFolders[key] + '*', {read: false, dot: true})
        .pipe(rimraf());
});

// сборка стилей
gulp.task('style:build',
    gulp.parallel(
        'css:build',
        'scss:build'
    )
);

// сборка всего
gulp.task('build',
    gulp.parallel(
        'style:build',
        // 'js:build',
        'html:build',
        'img:build',
        'other:build',
        'dots:build'
    )
);

gulp.task('serve', () => {
    if (!isDev)
        return;

    browserSync.init({
        server: {
            baseDir: buildFolders[key]
        },
        notify: false
    })

    browserSync.watch(buildFolders[key] + '**/*.*').on('change', browserSync.reload);
});

// запуск задач при изменении файлов
gulp.task('watch', () => {
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.scss, gulp.series('scss:build'));
    // gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.img, gulp.series('img:build'));
    gulp.watch(path.watch.other, gulp.series('other:build'));
    gulp.watch(path.watch.dots, gulp.series('dots:build'));
});

// очистка кэша
gulp.task('cache:clear', async () => {
    await cache.clearAll();
});

gulp.task('build-watch', gulp.series('build', 'watch'));

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));