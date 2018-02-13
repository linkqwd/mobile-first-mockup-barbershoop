const gulp   = require('gulp'), // Подключаем Gulp
sass         = require('gulp-sass'), //Подключаем sass пакет,
browserSync  = require('browser-sync'), // Подключаем Browser Sync
concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
cleanCss     = require('gulp-clean-css'), // Подключаем пакет для минификации CSS
gcmq         = require('gulp-group-css-media-queries'), // Подключаем для группировки медиа-запросов
del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

var files = {
	js: {
		main: 'src/js/main.js',
		jquery: 'src/libs/jquery/dist/jquery.js'
	}
}


gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - src
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('sass', function() {
	gulp.src('src/sass/styles.scss')
	.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError)) // Преобразуем sass в CSS посредством gulp-sass
	.pipe(gulp.dest('src/css/')) // Выгружаем результата в папку src/css
	.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
			files.js.jquery // Берем jQuery
		])
		.pipe(concat('libs.js')) // Собираем в новом файле libs.min.js
		.pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});

gulp.task('js-minify', function() {
	return gulp.src([ // Берем все необходимые библиотеки
			files.js.jquery, // Берем jQuery
			files.js.main // Берем main.js
		])
		.pipe(concat('scripts.min.js')) // Собираем в новом файле scripts.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});

gulp.task('css-minify', function() {
	return gulp.src('src/css/styles.css') // Выбираем файл для минификации
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gcmq()) // Группировка медиа-запросов
		.pipe(cleanCss()) // Сжимаем
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Берем все изображения из src
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
});

/* Build-production rules */

gulp.task('build', ['clean', 'img', 'sass', 'css-minify', 'js-minify'], function() {
	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts/'))

	var buildJs = gulp.src('src/js/scripts.min.js') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js/'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist/'));

	var buildHtml = gulp.src('src/img/**/*') // Переносим изображения в git dist
	.pipe(gulp.dest('dist/img/'));

	var buildHtml = gulp.src('src/css/styles.css') // Переносим CSS в git dist
	.pipe(gulp.dest('dist/css/'));
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});



gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('default', ['watch']);


/* Github */

gulp.task('github', ['cleanGit', 'img', 'sass', 'css-minify', 'js-minify'], function() {
	var gitFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в git doc
	.pipe(gulp.dest('docs/fonts/'))

	var gitJs = gulp.src('src/js/scripts.min.js') // Переносим скрипты в git docs
	.pipe(gulp.dest('docs/js/'))

	var gitHtml = gulp.src('src/*.html') // Переносим HTML в git docs
	.pipe(gulp.dest('docs/'));

	var gitHtml = gulp.src('src/img/**/*') // Переносим изображения в git docs
	.pipe(gulp.dest('docs/img/'));

	var gitHtml = gulp.src('src/css/styles.css') // Переносим CSS в git docs
	.pipe(gulp.dest('docs/css/'));
});

gulp.task('cleanGit', function() {
	return del.sync('docs'); // Удаляем папку dist перед сборкой
});