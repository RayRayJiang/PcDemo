var gulp = require("gulp");
var minifycss = require("gulp-minify-css");
var imagemin = require("gulp-imagemin");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");

gulp.task("php", async () => {
    gulp.src("php/*.php")
        .pipe(gulp.dest("dist/php"));
});

gulp.task("css", async () => {
    gulp.src("css/*.css")
        .pipe(minifycss())
        .pipe(gulp.dest("dist/css"));
});

gulp.task("html", async () => {
    gulp.src("html/*.html")
        .pipe(gulp.dest("dist/html"));
});

gulp.task("img", async () => {
    gulp.src("imges/*.jpg")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/imges"));
    gulp.src("imges/goodsimges/*.{jpg,png}")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/imges/goodsimges"));
});

gulp.task("js", async () => {
    gulp.src("js/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
    gulp.src("js/user/*.js")
        // .pipe(babel())
        // .pipe(uglify())
        .pipe(gulp.dest("dist/js/user"));
});

gulp.task("sass", async () => { 
    gulp.src("csstest/*.scss")
        .pipe(sass())   // sass文件转对应的css文件
        .pipe(gulp.dest("csstest/"));
});
gulp.task("watchsass", async () => {
    gulp.watch("csstest/*.scss", gulp.series(["sass"])); // 监听sass文件,实时编译
});

gulp.task("build", gulp.series(["php", "css", "html", "img", "js"]), async () => {
    console.log("发布完成");
});






