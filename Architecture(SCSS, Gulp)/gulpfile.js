import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import cleanAll from 'gulp-clean';
import fs from 'fs';
import changed from 'gulp-changed';
import {compareContents} from 'gulp-changed';
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import gulpSass from "gulp-sass";
import * as dartSass from "sass"
const sass = gulpSass(dartSass);
import sassGlob from 'gulp-sass-glob';
import sourceMap from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import mediaQueries from 'gulp-group-css-media-queries';
import csso from 'gulp-csso';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import ttf2woff2 from 'gulp-ttf2woff2';
import imageMin, {mozjpeg, optipng} from 'gulp-imagemin';
import gulpIf from 'gulp-if';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const argv = yargs(hideBin(process.argv)).parse();

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

export function server(){
    return browserSync.init({
        server: {
            baseDir: "./dist/",
        },
        notify: false,
    });
}

export function clean(){
    if(fs.existsSync('./dist/')){
        return gulp.src('./dist/', {read: false}).pipe(cleanAll({force: true}))
    }
    return Promise.resolve();
}

export function html(){
    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(gulpIf(!argv.prod, changed('./dist/', {hasChanged: compareContents})))
    .pipe(gulpIf(!argv.prod, plumber(plumberNotify('HTML'))))
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    //.pipe(gulpIf(argv.prod, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulpIf(!argv.prod, browserSync.stream()));
}

export function css(){
    return gulp.src('./src/scss/*.scss')
    .pipe(gulpIf(!argv.prod, changed('./dist/')))
    .pipe(gulpIf(!argv.prod, plumber(plumberNotify('SCSS'))))
    .pipe(gulpIf(!argv.prod, sourceMap.init({loadMaps: true})))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions'],
    }))
    .pipe(gulpIf(argv.prod, mediaQueries()))
    .pipe(gulpIf(argv.prod, csso()))
    .pipe(gulpIf(!argv.prod, sourceMap.write()))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulpIf(!argv.prod, browserSync.stream()));
}

export function js(){
    return gulp.src('./src/js/*.js')
    .pipe(gulpIf(!argv.prod, changed('./dist/js/')))
    .pipe(gulpIf(!argv.prod, plumber(plumberNotify('JS'))))
    .pipe(babel())
    //.pipe(gulpIf(argv.prod, concat('main.min.js')))
    .pipe(webpack(webpackConfig))
    //.pipe(gulpIf(argv.prod, terser()))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(gulpIf(!argv.prod, browserSync.stream()))
}

export function fonts(){
    if(fs.existsSync('./src/fonts/')){
        return gulp.src('./src/fonts/**/*.ttf', { encoding: false })
        .pipe(gulpIf(!argv.prod, changed('./dist/fonts/')))
        .pipe(ttf2woff2())
        .pipe(gulp.dest('./dist/fonts/'))
        .pipe(gulpIf(!argv.prod, browserSync.stream()))
    }
    return Promise.resolve();
}

export function files(){
    if(fs.existsSync('./src/files/')){
        return gulp.src('./src/files/**/*', { encoding: false })
        .pipe(gulpIf(!argv.prod, changed('./dist/files/')))
        .pipe(gulp.dest('./dist/files'))
        .pipe(gulpIf(!argv.prod, browserSync.stream()))
    }
    return Promise.resolve();
}

export function images(){
    if(fs.existsSync('./src/images/')){
        return gulp.src('./src/images/**/*', { encoding: false })
        .pipe(gulpIf(!argv.prod, changed('./dist/images/')))
        //.pipe(gulpIf(argv.prod, imageMin([
        //    mozjpeg({quality: 80, progressive: true}),
        //    optipng({optimizationLevel: 3}),
        //])))
        .pipe(gulp.dest('./dist/images/'))
        .pipe(gulpIf(!argv.prod, browserSync.stream()))
    }
    return Promise.resolve();
}

export function watcher(){
    const watchers = [
        gulp.watch('./src/**/*.html', html),
        gulp.watch('./src/scss/**/*.scss', css),
        gulp.watch('./src/js/**/*.js', js),
        gulp.watch('./src/fonts/**/*', fonts),
        gulp.watch('./src/files/**/*', files),
        gulp.watch('./src/images/**/*', images),
    ];
    return watchers;
}

const dev = gulp.series(
    clean,
    gulp.parallel(html, css, js, images, fonts, files),
    gulp.parallel(server, watcher)
);
const prod = gulp.series(
    clean,
    gulp.parallel(html, css, js, images, fonts, files)
);
export default argv.prod ? prod : dev;