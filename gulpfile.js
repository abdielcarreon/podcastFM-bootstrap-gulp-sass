const {src, dest, watch, series} = require('gulp');

//Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

//Imagenes
const imagemin = require('gulp-imagemin');

function css(done) {
    src('src/scss/app.scss') //Identificar el archivo principal
        .pipe(sass())  // Compilar SASS
        .pipe(dest('build/css')) //Exportar o guardar en una ubicación

    done();
}

function cssbuild(done) {
    src('build/css/app.css') // Ubicando el archivo que va a minificar "purgecss" y además modificar con "rename"
        .pipe(rename({ //Gulp por si solo no puede renombrar un archivo, así que necesita el paquete "rename"
            suffix: '.min' // 'min' es lo que se le va agregar después del nombre y antes de su extensión
        }))
        .pipe(purgecss({
            content: ['index.html']//En que archivo HTML encontrará el código que va a comparar para ver si se está utilizando una clase de css
        }))
        .pipe(dest('build/css')) // Ruta de almacenamiento 


    done();
}

function dev() {
    watch('src/scss/**/*.scss', css);
}

function imagenes(done) {
     src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))

        done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);
exports.build = series(cssbuild);
