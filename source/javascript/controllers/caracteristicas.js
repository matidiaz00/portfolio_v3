/* ==========================================================================
   Caracteristicas
   ========================================================================== */
matidiazApp.controller('CaracteristicasCtrl', function ($scope, $firebaseArray) {

	$scope.toggle = 0;

	// ARRAY DE "CARACTERISTICAS"
	const db_caracteristicas = firebase.database().ref().child("05_curriculum").child("caracteristicas");
	var itemCaracteristicas = $firebaseArray(db_caracteristicas);
	itemCaracteristicas.$loaded()
		.then(function(data) {
			$scope.itemCaracteristicas = itemCaracteristicas;
			$scope.newCar = function() {
				$scope.itemCaracteristicas.$add((
					"empty"
				)).then(function() {
					// CUANDO SE TERMINO DE AÑADIR
				});
			};
			$scope.toggle = 1;
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

});