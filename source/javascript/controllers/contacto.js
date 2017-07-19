/* ==========================================================================
   Contacto
   ========================================================================== */
matidiazApp.controller('ContactoCtrl', function ($scope, $firebaseAuth, $firebaseObject, $firebaseArray, $http, $uibModal) {

	$scope.toggle = 0;

	// BASE DE DATOS DE "CONTACTO"
	const rootRef = firebase.database().ref().child("06_contacto");
	var syncObject = $firebaseObject(rootRef);
	syncObject.$loaded()
		.then(function(data) {
			syncObject.$bindTo($scope, "itemContacto");
			$scope.toggle = 1;
			$scope.$root.toggle3 = 1;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// ARRAY DE LAS "REDES SOCIALES"
	const db_redes_sociales = rootRef.child("redes_sociales");
	var itemRedesSociales = $firebaseArray(db_redes_sociales);
	itemRedesSociales.$loaded()
		.then(function(data) {
			$scope.itemRedesSociales = itemRedesSociales;
			$scope.newRedSocial = function() {
				$scope.itemRedesSociales.$add({
					"icono": "empty",
					"id": "empty",
					"texto": "empty",
					"url": "empty"
				}).then(function() {
					// CUANDO SE TERMINO DE AÑADIR
				});
			};
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

	// FORMULARIO DE CONTACTO
	$scope.formData = {};
	$scope.enviado = false;
	$scope.submitForm = function() {
		$http({
			method  : 'POST',
			url     : 'send.php',
			data    : $scope.formData,
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.success(function() {
			// CUANDO SE TERMINO DE AÑADIR
			$scope.enviado = true;
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

	$scope.open = function (_red_social) {
		var modalInstance = $uibModal.open({
			controller: "PopupRedSocialCtrl",
			templateUrl: "popup.html",
			resolve: {
                red_social: function() {
                    return _red_social;
                }
            }
		});
	};
	
});

matidiazApp.controller('PopupRedSocialCtrl', function ($scope, $firebaseObject, $uibModalInstance, red_social) {
	// ARRAY DE LAS "REDES SOCIALES"
	const rootRef = firebase.database().ref().child("06_contacto").child("redes_sociales").child(red_social.$id);
	var red_s = $firebaseObject(rootRef);
	red_s.$bindTo($scope, "red");

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.remove = function () {
		red_s.$remove();
		$uibModalInstance.dismiss('cancel');
	};
});