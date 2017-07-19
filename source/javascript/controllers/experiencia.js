/* ==========================================================================
   Experiencia
   ========================================================================== */
matidiazApp.controller('ExperienciaCtrl', function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray, $uibModal) {

	$scope.toggle = 0;

	// BASE DE DATOS DE "EXPERIENCIA"
	const rootRef = firebase.database().ref().child("03_experiencia");
	var syncObject = $firebaseObject(rootRef);
	syncObject.$loaded()
		.then(function(data) {

		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// TODAS LAS CATEGORIAS
	const db_categorias = firebase.database().ref().child("categorias");
	var itemCategoria = $firebaseArray(db_categorias);
	itemCategoria.$loaded()
		.then(function(data) {
			
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// ARRAY DE EXPERIENCIAS
	const db_experiencias = rootRef.child("experiencias");
	var itemExperiencias = $firebaseArray(db_experiencias);
	$scope.itemExperiencias = itemExperiencias;
	itemExperiencias.$loaded()
		.then(function(data) {
			syncObject.$bindTo($scope, "itemExperiencia");
			$scope.itemCategoria = itemCategoria;
			
			$scope.toggle = 1;
			$scope.$root.toggle4 = 1;
			$scope.newExp = function() {
				$scope.itemExperiencias.$add({
					"cargo": "empty",
					"fecha": "empty",
					"imagen": "empty",
					"informacion_empresa": "empty",
					"link": {
						"texto": "empty",
						"url": "#"
					},
					"mis_tareas": "empty",
					"puesto": "empty",
					"razon_abandono": "empty",
					"titulo": "empty"
				}).then(function() {
					// CUANDO SE TERMINO DE AÑADIR
				});
			};
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

	$scope.open = function (_exp) {
		var modalInstance = $uibModal.open({
			controller: "PopupExpCtrl",
			templateUrl: "popup.html",
			resolve: {
                exp: function() {
                    return _exp;
                }
            }
		});
	};
	
});

matidiazApp.controller('PopupExpCtrl', function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray, $uibModalInstance, $uibModal, exp) {
	
	// BASE DE DATOS DE "HABILIDADES"
	const rootRef = firebase.database().ref().child("03_experiencia").child("experiencias").child(exp.$id);
	var experiencia = $firebaseObject(rootRef);
	experiencia.$bindTo($scope, "experiencia");

	// TODAS LAS CATEGORIAS
	const db_categorias = firebase.database().ref().child("categorias");
	var itemCategoria = $firebaseArray(db_categorias);
	$scope.itemCategoria = itemCategoria;

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.openLink = function (_experiencia) {
		var modalInstance = $uibModal.open({
			controller: "PopupExpLinkCtrl",
			templateUrl: "popupLink.html",
			resolve: {
                experiencia: function() {
                    return _experiencia;
                }
            }
		});
	};

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
	
});

matidiazApp.controller('PopupExpLinkCtrl', function ($scope, $firebaseObject, $uibModalInstance, experiencia) {
	
	// BASE DE DATOS DE "HABILIDADES"
	const rootRef = firebase.database().ref().child("03_experiencia").child("experiencias").child(experiencia.$id);
	var exp = $firebaseObject(rootRef);
	exp.$bindTo($scope, "experiencia");

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
});