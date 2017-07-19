/* ==========================================================================
   Categorias
   ========================================================================== */
matidiazApp.controller('CategoriasCtrl', function ($scope, $firebaseArray) {

	$scope.toggle = 0;

	// ARRAY DE "CATEGORIAS"
	const db_categorias = firebase.database().ref().child("categorias");
	var itemCategoria = $firebaseArray(db_categorias);
	itemCategoria.$loaded()
		.then(function(data) {
			$scope.itemCategoria = itemCategoria;
			$scope.toggle = 1;
			$scope.newCat = function() {
				$scope.itemCategoria.$add({
					"porcentaje":0,
					"texto": 'empty'
				}).then(function() {
					// CUANDO SE TERMINO DE AÑADIR
				});
			};
		})
		.catch(function(error) {
			// CUANDO HAY UN ERROR
		});

});