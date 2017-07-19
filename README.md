# Matidiaz APP - Beta

Estos son los archivos del sitio de mi porfolio actual, es una version beta porque tengo muchas cosas por cambiarle ([las cuales indico al final](#ID)), actualmente estoy trabajando en la version final.

## Tabla de contenidos

- [Guia para iniciar el sitio](#guia-para-iniciar-el-sitio)
- [Titulo](#ID)
- [Titulo](#ID)
- [Titulo](#ID)
- [Titulo](#ID)

## Guia para iniciar el sitio

Para poder iniciar este sitio es necesario tener instalado [NodeJS](https://nodejs.org/es/), tener conocimiento basico de AngularJS y del manejo de la consola de NodeJS y por ultimo tener un usuario y aplicación lista en [Firebase](https://firebase.google.com/).

* Clonar repo: `git clone https://github.com/matidiaz00/matidiazapp-beta.git`
* Instalar los complementos: `npm install`
* Cambiar los datos de Firebase:
  * Abrir el archivo a editar: `source/javascript/main.js`
  * Ir a tu cuenta en Firebase y obtener los datos de tu aplicacion.
  * Ejemplo:
```javascript
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
};
```
  * Despues de editar los datos correr en la consola: `grunt`
* Cambiar correo en el archivo del formulario para que te lo envie a vos: `www/send.php`
