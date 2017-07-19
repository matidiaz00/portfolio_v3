/* ==========================================================================
   Proyectos
   ========================================================================== */
matidiazApp.controller('ProyectosCtrl', function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray, $uibModal) {

	$scope.toggle = 0;

	// BASE DE DATOS DE "PROYECTOS"
	const rootRef = firebase.database().ref().child("04_proyectos");
	var syncObject = $firebaseObject(rootRef);
	syncObject.$loaded()
		.then(function(data) {
			syncObject.$bindTo($scope, "itemProyectos");
			$scope.toggle = 1;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// MUESTRA ELEMENTOS SOLO DESPUES DEL PRELOAD
	$scope.toggle_child = 0;

	// PRELOAD DE LOS PROYECTOS EN SI
	const db_proyectos = rootRef.child("proyectos");
	var itemProyectos_interna = $firebaseArray(db_proyectos);
	itemProyectos_interna.$loaded()
		.then(function(data) {
			$scope.itemProyectos_interna = itemProyectos_interna;
			$scope.toggle_child = 1;
			$scope.lenght = itemProyectos_interna.length;
			$scope.newProy = function() {
				$scope.itemProyectos_interna.$add({
					"fecha" : "empty",
					"imagenes" : {
						"001" : "empty",
					},
					"informacion" : "empty",
					"link" : {
						"texto" : "empty",
						"url" : "#"
					},
					"thumbnail" : "",
					"titulo" : "empty"
				}).then(function() {
					// CUANDO SE TERMINO DE AÑADIR
				});
			};
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// LIMITE DE LOS PROYECTOS VISIBLES
	var limitStep = -8;
	$scope.limit = limitStep;
	limit = $scope.limit;
	$scope.inc = function() {
	    $scope.limit += -4;
	    $scope.limitForBtn = $scope.limit.toString().replace('-', '');
	};

	$scope.logued = false;
	// IF SI ESTAS LOGUEADO
	var authObj = $firebaseAuth();
	authObj.$onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			// SI ESTAS LOGUEADO
			$scope.logued = true;
			$scope.limit -= -1;
		} else {
			// SI NO ESTAS LOGUEADO
			$scope.logued = false;
		}
	});

	$scope.open = function (_proyecto) {
		var modalInstance = $uibModal.open({
			controller: "thumbnail",
			templateUrl: "popup.html",
			resolve: {
                proyecto: function() {
                    return _proyecto;
                }
            }
		});
	};

});

matidiazApp.controller('thumbnail', function ($scope, $firebaseObject, $uibModalInstance, proyecto) {
	// ARRAY DE LAS "REDES SOCIALES"
	const rootRef = firebase.database().ref().child("04_proyectos").child("proyectos").child(proyecto.$id);
	var syncObject = $firebaseObject(rootRef);
	syncObject.$bindTo($scope, "proyecto");

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};
});