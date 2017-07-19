/* ==========================================================================
   Proyectos Interna
   ========================================================================== */
matidiazApp.controller('ProyectosInternaCtrl', function ($scope, $firebaseAuth, $routeParams, $firebaseObject, $firebaseArray, $uibModal) {

	$scope.toggle = 0;

	// PROYECTO POR ID
	const rootRef = firebase.database().ref().child("04_proyectos").child("proyectos").child($routeParams.id);
	var syncObject = $firebaseObject(rootRef);
	syncObject.$loaded()
		.then(function(data) {
			syncObject.$bindTo($scope, "itemProyectosInterna");
			$scope.toggle = 1;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// URLS DE IMAGENES DEL PROYECTO
	const rootRef2 = rootRef.child("imagenes");
	var itemProyectosInternaCarousel = $firebaseArray(rootRef2);
	itemProyectosInternaCarousel.$loaded()
		.then(function(data) {
			$scope.itemProyectosInternaCarousel = itemProyectosInternaCarousel;
			$scope.newIntCar = function() {
				$scope.itemProyectosInternaCarousel.$add({
					"imagen_desktop": "empty",
					"imagen_mobile": "empty"
				}).then(function() {
					// CUANDO SE TERMINO DE AÑADIR
				});
			};
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});


	// CATEGORIAS EN EL PROYECTO
	const rootRef3 = rootRef.child("categorias");
	var itemProyectosInternaCategorias = $firebaseArray(rootRef3);
	itemProyectosInternaCategorias.$loaded()
		.then(function(data) {
			$scope.itemProyectosInternaCategorias = itemProyectosInternaCategorias;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// TODAS LAS CATEGORIAS
	const db_categorias = firebase.database().ref().child("categorias");
	var itemCategoria = $firebaseArray(db_categorias);
	itemCategoria.$loaded()
		.then(function(data) {
			$scope.itemCategoria = itemCategoria;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});


	$scope.logued = false;
	// IF SI ESTAS LOGUEADO
	var authObj = $firebaseAuth();
	authObj.$onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			// SI ESTAS LOGUEADO
			$scope.logued = true;
		} else {
			// SI NO ESTAS LOGUEADO
			$scope.logued = false;
		}
	});

	$scope.open = function (_InternalCarousel) {
		var modalInstance = $uibModal.open({
			controller: "PopupCarouselProyCtrl",
			templateUrl: "popup.html",
			resolve: {
                InternalCarousel: function() {
                    return _InternalCarousel;
                }
            }
		});
	};

	$scope.openLink = function () {
		var modalInstance = $uibModal.open({
			controller: "ProyInterCtrl",
			templateUrl: "popupLink.html"
		});
	};

	$scope.openTec = function () {
		var modalInstance = $uibModal.open({
			controller: "ProyInterCtrl",
			templateUrl: "popupTec.html"
		});
	};

	$scope.openBg = function () {
		var modalInstance = $uibModal.open({
			controller: "ProyInterCtrl",
			templateUrl: "popupBg.html"
		});
	};
	
});

matidiazApp.controller('PopupCarouselProyCtrl', function ($scope, $routeParams, $firebaseObject, $uibModalInstance, InternalCarousel) {
	// ARRAY DE LAS "REDES SOCIALES"
	const imagen = firebase.database().ref().child("04_proyectos").child("proyectos").child($routeParams.id).child("imagenes").child(InternalCarousel.$id);
	var InternalCarousel = $firebaseObject(imagen);
	InternalCarousel.$bindTo($scope, "slide");

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.remove = function () {
		InternalCarousel.$remove();
		$uibModalInstance.dismiss('cancel');
	};
});

matidiazApp.controller('ProyInterCtrl', function ($scope, $routeParams, $firebaseArray, $firebaseObject, $uibModalInstance) {
	// ARRAY DE LAS "REDES SOCIALES"
	const base = firebase.database().ref().child("04_proyectos").child("proyectos").child($routeParams.id);
	var Item = $firebaseObject(base);
	Item.$bindTo($scope, "item");

	// TODAS LAS CATEGORIAS
	const db_categorias = firebase.database().ref().child("categorias");
	var itemCategoria = $firebaseArray(db_categorias);
	$scope.itemCategoria = itemCategoria;

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};
});