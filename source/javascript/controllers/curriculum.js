/* ==========================================================================
   Curriculum
   ========================================================================== */
matidiazApp.controller('CurriculumCtrl', function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray, $uibModal) {

	$scope.toggle = 0;

	// BASE DE DATOS DE "CURRICULUM"
	const rootRef = firebase.database().ref().child("05_curriculum");
	var syncObject = $firebaseObject(rootRef);
	syncObject.$loaded()
		.then(function(data) {
			syncObject.$bindTo($scope, "itemCurriculum");
			$scope.toggle = 1;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// ARRAY DE LAS "COLUMNAS"
	const columnas = rootRef.child("columnas");
	var itemColumnas = $firebaseArray(columnas);
	itemColumnas.$loaded()
		.then(function(data) {
			$scope.itemColumnas = itemColumnas;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// ARRAY DE LAS "CARACTERISTICAS"
	const db_caracteristicas = rootRef.child("caracteristicas");
	var itemCaracteristicas = $firebaseArray(db_caracteristicas);	
	itemCaracteristicas.$loaded()
		.then(function(data) {
			$scope.itemCaracteristicas = itemCaracteristicas;
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

	$scope.open = function (_col) {
		var modalInstance = $uibModal.open({
			controller: "PopupCurriculumCtrl",
			templateUrl: "popup.html",
			resolve: {
                col: function() {
                    return _col;
                }
            }
		});
	};

	$scope.openDescarga = function (_col) {
		var modalInstance = $uibModal.open({
			controller: "PopupCurriculumCtrl",
			templateUrl: "descarga.html",
			resolve: {
                col: function() {
                    return _col;
                }
            }
		});
	};

	$scope.openImagen = function (_col) {
		var modalInstance = $uibModal.open({
			controller: "PopupCurriculumCtrl",
			templateUrl: "imagen.html",
			resolve: {
                col: function() {
                    return _col;
                }
            }
		});
	};

});

matidiazApp.controller('PopupCurriculumCtrl', function ($scope, $firebaseObject, $firebaseArray, $uibModalInstance, col) {

	// ARRAY DE LAS "CARACTERISTICAS"
	const rootRef = firebase.database().ref().child("05_curriculum").child("columnas").child(col.$id);
	var syncObject = $firebaseObject(rootRef);
	syncObject.$loaded()
		.then(function(data) {
			syncObject.$bindTo($scope, "itemHabilidad");
			$scope.toggle = 1;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// ARRAY DE LAS "CARACTERISTICAS"
	const db_caracteristicas = firebase.database().ref().child("05_curriculum").child("caracteristicas");
	$scope.itemCaracteristicas = $firebaseArray(db_caracteristicas);

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
});