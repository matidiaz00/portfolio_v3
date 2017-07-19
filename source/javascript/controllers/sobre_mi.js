/* ==========================================================================
   Sobre mi
   ========================================================================== */
matidiazApp.controller('SobreMiCtrl', function ($scope, $firebaseAuth, $firebaseObject) {

	$scope.toggle = 0;

	// BASE DE DATOS DE "SOBRE MI"
	const rootRef = firebase.database().ref().child("01_sobre_mi");
	var syncObject = $firebaseObject(rootRef);

	// PRELOAD DEL SOBRE MI
	syncObject.$loaded()
		.then(function(data) {
			syncObject.$bindTo($scope, "itemSobreMi");
			$scope.toggle = 1;
			$scope.$root.toggle1 = 1;
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

});