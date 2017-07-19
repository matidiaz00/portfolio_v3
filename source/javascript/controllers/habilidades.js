/* ==========================================================================
   Habilidades
   ========================================================================== */
matidiazApp.controller('HabilidadesCtrl', function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray, $uibModal) {

	$scope.toggle = 0;

	// BASE DE DATOS DE "HABILIDADES"
	const rootRef = firebase.database().ref().child("02_habilidades");
	var syncObject = $firebaseObject(rootRef);

	// PRELOAD DE HABILIDADES
	syncObject.$loaded()
		.then(function(data) {
			
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// BASE DE DATOS DE "HABILIDADES"
	const rootRef2 = rootRef.child("columnas");
	var columnas = $firebaseArray(rootRef2);

	// TODAS LAS CATEGORIAS
	const db_categorias = firebase.database().ref().child("categorias");
	var itemCategoria = $firebaseArray(db_categorias);

	// PRELOAD DE LAS CATEGORIAS
	itemCategoria.$loaded()
		.then(function(data) {
			syncObject.$bindTo($scope, "itemHabilidades");
			$scope.itemCategoria = itemCategoria;
			$scope.columnas = columnas;
			$scope.toggle = 1;
			$scope.$root.toggle2 = 1;
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

	$scope.open = function (_cols) {
		var modalInstance = $uibModal.open({
			controller: "PopupHabilidadCtrl",
			templateUrl: "popup.html",
			resolve: {
                cols: function() {
                    return _cols;
                }
            }
		});
	};

	$scope.openIcon = function (_cols) {
		var modalInstance = $uibModal.open({
			controller: "PopupHabilidadCtrl",
			templateUrl: "icon.html",
			resolve: {
                cols: function() {
                    return _cols;
                }
            }
		});
	};

});

matidiazApp.controller('PopupHabilidadCtrl', function ($scope, $firebaseObject, $firebaseArray, $uibModalInstance, cols) {
	
	// BASE DE DATOS DE "HABILIDADES"
	const rootRef = firebase.database().ref().child("02_habilidades").child("columnas").child(cols.$id);
	var hab = $firebaseObject(rootRef);
	hab.$bindTo($scope, "hab");

	// TODAS LAS CATEGORIAS
	const db_categorias = firebase.database().ref().child("categorias");
	var itemCategoria = $firebaseArray(db_categorias);
	$scope.itemCategoria = itemCategoria;

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
});