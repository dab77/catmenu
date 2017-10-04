var gulp       = require('gulp'), // Подключаем Gulp
	scss         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
  cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

  gulp.task('scss', function(){ // Создаем таск Sass
  	return gulp.src('src/scss/**/*.scss') // Берем источник
  		.pipe(scss()) // Преобразуем Sass в CSS посредством gulp-sass
  		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
      .pipe(cssnano())
  		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку app/css
  		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
  });


  gulp.task('browser-sync', function() { // Создаем таск browser-sync
  	browserSync({ // Выполняем browserSync
  		server: { // Определяем параметры сервера
  			baseDir: 'src' // Директория для сервера - app
  		},
  		notify: false // Отключаем уведомления
  	});
  });

  gulp.task('watch', ['browser-sync', 'scss' ], function() {
  	gulp.watch('src/scss/**/*.scss', ['scss']); // Наблюдение за sass файлами в папке sass
  	gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  	gulp.watch('src/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
  });

	
