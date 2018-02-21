import * as chalk from 'chalk';
import * as del from 'del';
import * as gulp from 'gulp';
import * as inliner from 'gulp-inline-ng2-template';
import * as less from 'less';
import * as merge from 'merge-stream';
import * as minifier from 'html-minifier';
import * as ngc from '@angular/compiler-cli/src/main';
import * as path from 'path';

// globals
const source = path.join(process.cwd(), './');
const target = path.join(process.cwd(), './dist');

function clean() {
  return del([
    path.join(target, '**/*')
  ], {force: true});
}

// copy root files
function copyRoot() {
  const globs = [
    path.join(source, 'package.json'),
    path.join(source, 'startup.html'),
    path.join(source, 'theme.html')
  ];
  return gulp.src(globs)
    .pipe(gulp.dest(target));
}

// inline styles and templates
function inline() {
  const globs = [
    path.join(source, '**', '*.ts')
  ];
  return gulp.src(globs)
    .pipe(inliner({
        base: './',
        removeLineBreaks: false,
        styleProcessor: toCSS,
        templateProcessor: minify,
        useRelativePaths: true
      }))
    .pipe(gulp.dest(target));
}

// minify HTML
function minify(path, ext, file, cb) {
  console.log('Inlining HTML', chalk['blue'](`${path}`));
  const output = minifier.minify(file, {
    caseSensitive: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    decodeEntities: true,
    minifyCSS: true,
    removeAttributeQuotes: true,
    removeComments: true
  });
  cb(null, output);
}

function purge() {
  return del([
    path.join(target, '**/*.ts'),
    '!' + path.join(target, '**/gulpfile.ts'),
    '!' + path.join(target, '**/tools/*.ts'),
    '!' + path.join(target, '**/*.d.ts')
  ], {force: true});
}

// convert styles to CSS
function toCSS(path, ext, file, cb) {
  console.log('Inlining LESS', chalk['green'](`${path}`));
  less.render(file, {compress: true}, function(e, output) {
    if (e)
      console.log(chalk['red'](e, `${path}`), chalk['yellow'](file));
    else cb(null, output.css);
  });
}

// gulp tasks

gulp.task('clean', function() {
  return clean();
});

gulp.task('pre-process', ['clean'], function() {
  return merge(
    copyRoot(),
    inline()
  );
});

gulp.task('build', ['pre-process'], function() {
  return ngc.main(['-p', './lib.tsconfig.json']);
});

gulp.task('post-process', ['build'], function() {
  return purge();
});

gulp.task('default', ['post-process']);
