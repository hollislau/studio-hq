const gulp = require("gulp");
const prefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean-css");
const eslint = require("gulp-eslint");
const livereload = require("gulp-livereload");
const nodemon = require("gulp-nodemon");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");
const named = require("vinyl-named");
const webpack = require("webpack-stream");

var lintAppFiles = ["app/**/*.js"];
var lintServerFiles = ["gulpfile.js", "index.js", "server.js"];
var buildFiles = ["babel-polyfill", "app/js/entry.js"];
var staticFiles = [
  "app/**/*.html",
  "app/**/*.svg",
  "app/**/*.eot",
  "app/**/*.ttf",
  "app/**/*.woff"
];

gulp.task("lint:app", () => {
  return gulp.src(lintAppFiles)
    .pipe(eslint("app/.eslintrc.json"))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("lint:server", () => {
  return gulp.src(lintServerFiles)
    .pipe(eslint(".eslintrc.json"))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("webpack:dev", () => {
  return gulp.src(buildFiles)
    .pipe(named())
    .pipe(webpack({
      devtool: "source-map",
      output: {
        filename: "main.js"
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            include: [
              __dirname + "/app/js"
            ],
            loader: "babel",
            query: {
              presets: ["es2015"]
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(livereload());
});

gulp.task("webpack:pro", () => {
  return gulp.src(buildFiles)
    .pipe(named())
    .pipe(webpack({
      output: {
        filename: "main.js"
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            include: [
              __dirname + "/app/js"
            ],
            loader: "babel",
            query: {
              presets: ["es2015"]
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("sass:dev", () => {
  return gulp.src("app/sass/main.scss")
    .pipe(maps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(prefixer({
      browsers: ["last 2 versions"]
    }))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("build/css"))
    .pipe(livereload());
});

gulp.task("sass:pro", () => {
  return gulp.src("app/sass/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(prefixer({
      browsers: ["last 2 versions"]
    }))
    .pipe(clean())
    .pipe(gulp.dest("build/css"));
});

gulp.task("static:dev", () => {
  return gulp.src(staticFiles)
    .pipe(gulp.dest("build"))
    .pipe(livereload());
});

gulp.task("static:pro", () => {
  return gulp.src(staticFiles)
    .pipe(gulp.dest("build"));
});

gulp.task("nodemon", () => {
  nodemon({
    script: "server.js",
    watch: ["server.js"]
  })
  .on("restart", () => {
    process.stdout.write("Server restarted!\n");
  });
});

gulp.task("watch", ["build:dev", "nodemon"], () => {
  livereload.listen();
  gulp.watch("app/**/*.js", ["webpack:dev"]);
  gulp.watch("app/**/*.scss", ["sass:dev"]);
  gulp.watch(staticFiles, ["static:dev"]);
});

gulp.task("lint", ["lint:app", "lint:server"]);
gulp.task("build:dev", ["webpack:dev", "sass:dev", "static:dev"]);
gulp.task("build:pro", ["webpack:pro", "sass:pro", "static:pro"]);
gulp.task("default", ["lint"]);
