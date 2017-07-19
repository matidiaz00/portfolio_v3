
/* ==========================================================================
   Configuracion de Firebase
   ========================================================================== */
var config = {
	apiKey: "#",
	authDomain: "#",
	databaseURL: "#",
	storageBucket: "#",
	messagingSenderId: "#"
};
firebase.initializeApp(config);

/* ==========================================================================
   Insersion de frameworks angularjs
   ========================================================================== */
var matidiazApp = angular.module('matidiazApp', [
	'firebase',
	'ngRoute',
	'ngSanitize',
	'ngAnimate',
	'duScroll',
	'angular-carousel',
	'monospaced.elastic',
	'ui.bootstrap',
	'contenteditable'
]);

/* ==========================================================================
   Configuracion de ng route
   ========================================================================== */
matidiazApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'includes/inicio.html'
		})
		.when('/inicio', {
			templateUrl: 'includes/inicio.html'
		})
		.when('/sobre_mi', {
			templateUrl: 'includes/sobre_mi.html',
			controller: 'SobreMiCtrl'
		})
		.when('/habilidades', {
			templateUrl: 'includes/habilidades.html',
			controller: 'HabilidadesCtrl'
		})
		.when('/experiencia', {
			templateUrl: 'includes/experiencia.html',
			controller: 'ExperienciaCtrl'
		})
		.when('/proyectos', {
			templateUrl: 'includes/proyectos.html',
			controller: 'ProyectosCtrl'
		})
		.when('/proyectos/:id', {
			templateUrl: 'includes/proyectos_interna.html',
			controller: 'ProyectosInternaCtrl'
		})
		.when('/curriculum', {
			templateUrl: 'includes/curriculum.html',
			controller: 'CurriculumCtrl'
		})
		.when('/contacto', {
			templateUrl: 'includes/contacto.html',
			controller: 'ContactoCtrl'
		})
		.when('/categorias', {
			templateUrl: 'includes/categorias.html',
			controller: 'CategoriasCtrl'
		})
		.when('/caracteristicas', {
			templateUrl: 'includes/caracteristicas.html',
			controller: 'CaracteristicasCtrl'
		})
		.when('/login', {
			templateUrl: 'includes/login.html',
			controller: 'LoginCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

		// use the HTML5 History API
		//$locationProvider.html5Mode(true);
}]);

matidiazApp.filter('toTrusted', ['$sce', function ($sce) {
   return function (text) {
      return text ? $sce.trustAsHtml(text.replace(/\\n/g, '<br/>')) : '';
   };
}]);

matidiazApp.run(function($rootScope, $document) {
    $rootScope.gotoTop = function() {
        $document.scrollTop(0, 600);
    };

    $rootScope.fixed = "";
    $rootScope.addFixed = function () {
		if ($rootScope.fixed === "")
	      $rootScope.fixed = "fixed";
	    else
	      $rootScope.fixed = "";
	};
	$rootScope.onlyRemoveFixed = function () {
		$rootScope.fixed = "";
	};
});