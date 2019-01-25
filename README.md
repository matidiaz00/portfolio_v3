# Matidiaz APP - Beta

Estos son los archivos del sitio de mi porfolio, es una version beta porque tengo muchas cosas por cambiarle ([las cuales indico al final](#cambios-a-completar-para-la-version-final)), actualmente estoy trabajando en la version final.

Si quieren ver el sitio corriendo con contenido pueden verlo desde aquí <a href="http://www.matidiaz.com.ar/matidiaz3" target="_blank">www.matidiaz.com.ar/matidiaz3</a>

## Tabla de contenidos

* [Guia para iniciar el sitio](#guia-para-iniciar-el-sitio)
* [Qué incluye](#qué-incluye)
* [Cambios a completar para la versión final](#cambios-a-completar-para-la-versión-final)

## Guia para iniciar el sitio

Para poder iniciar este sitio es necesario lo siguiente.

* Tener instalado <a href="https://nodejs.org/es/" target="_blank">NodeJS</a> y algun servidor local como <a href="https://www.apachefriends.org/es/index.html" target="_blank">XAMPP</a>.
* Tener conocimiento basico de AngularJS y del manejo de la consola de NodeJS.
* Por ultimo tener un usuario y aplicación lista en <a href="https://firebase.google.com/" target="_blank">Firebase</a>.

Si cumples con todos los requisitos solo tienes que hacer lo siguiente.

* Clonar repo: `git clone https://github.com/matidiaz00/matidiazapp-beta.git` (tiene que estar corriendo en los repositorios de XAMPP).
* Instalar los complementos: `npm install`
* Cambiar los datos de Firebase:
  * Abrir el archivo a editar: `source/javascript/main.js`
  * Ir a tu cuenta en Firebase y obtener los datos de tu aplicacion.
  * Despues de editar los datos correr en la consola: `grunt`
  * Ejemplo del codigo que hay que editar:
```javascript
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
};
```
* Por ultimo hay que importar el archivo `firebase.json` en la base de datos de tu cuenta en Firebase.

## Qué incluye

Esto es una breve explicación de como estan dispersos los archivos para que sea más rapido de comprender y editar.

```
matidiazapp-beta/
├── source/
│   ├── javascript/
│   │   └── ...
│   └── styles/
│       └── ...
├── www/
│   ├── assets/
│   │   ├── javascript.min.js
│   │   └── styles.min.css
│   ├── includes/
│   │   └── ...
│   ├── browserconfig.xml
│   ├── index.html
│   └── send.php
├── Gruntfile.js
├── firebase.json
└── package.json
```

* En la carpeta `matidiazapp-beta/source/` estan todos los archivos que hay que editar de AngularJS (JS) y LESS (CSS).
* En la carpeta `matidiazapp-beta/www/` estan todos los archivos que hay que subir a producción.
  * En la carpeta `matidiazapp-beta/www/assets` estan los archivos compilados con grunt de JS y CSS (esto no hay que editarlo manualmente).
  * En la carpeta `matidiazapp-beta/www/includes` esta toda la parte de HTML del sitio.
  * El archivo `matidiazapp-beta/www/browserconfig.xml` es donde se configuran los iconos de la aplicación.
  * El archivo `matidiazapp-beta/www/index.html` es el archivo principal de HTML a demás de los includes.
  * El archivo `matidiazapp-beta/www/send.php` es donde se desarrolla el envio del fomulario de contacto.
* El archivo `matidiazapp-beta/Gruntfile.js` es donde se configura todas las tareas de GruntJS (como la compilación de LESS y JS).
* El archivo `matidiazapp-beta/firebase.json` es la base de datos echa en JSON para Firebase.
* El archivo `matidiazapp-beta/package.json` es donde se configura la aplicación, principalmente aca estan todos los plugins de GruntJS que usa el sitio.

## Cambios a completar para la versión final

Esta es una versión beta porque fui agregando cosas nuevas a medida que iba aprendiendo cuando termine habian muchas cosas para corregir.

```Tiene imperfecciones de CSS```
Arme primero la parte de JavaScript asi que tiene algunas imperfecciones de CSS, por ejemplo hay partes de responsive que podria pensarlas mejor, ya que use bootstrap y no lo pense como mobile first.

```No esta limpio el codigo```
Por ejemplo hay varias secciones comentadas en los HTML y en JS.

```No esta preparado para verse con json vacio```
Todavia no lo prepare para que tenga un buen diseño si no tiene contenido el sitio, asi que si corren el sitio es probable por ejemplo que al no verse las imágenes muchas cosas se vean mal.

```Tengo que pasar el send.php a otro envio para que funcione en PhoneGap Build```
La idea de armar el sitio con estas tecnologias fue poder hacer aplicaciones con el contenido, el formulario lo hice rapido en PHP la cual no se puede correr con PhoneGap Build.

```Hay algunas pocas cosas que solo se editan desde el Json```
En algunas secciones no las pensé para que se puedan editar porque no me pareció necesario, por ejemplo en la sección de habilidades tiene cuatro imágenes que solo se pueden editar manualmente desde el JSON, en este caso cuando corran el sitio no va a tener ninguna imagen y hay que cambiarlas desde el JSON.
