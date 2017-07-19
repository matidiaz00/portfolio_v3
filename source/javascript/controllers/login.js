/* ==========================================================================
   Login
   ========================================================================== */
matidiazApp.controller('LoginCtrl', function ($scope, $firebaseAuth, $location) {

	// AUTENTIFICACION
	var authObj = $firebaseAuth();

	// LOGUEARTE CON EMAIL Y CONTRASEÑA
	$scope.signIn = function() {
		$scope.firebaseUser = null;
		$scope.error = null;
		authObj.$signInWithEmailAndPassword(email.value, password.value).then(function(firebaseUser) {
			// SI TE LOGUEAS console.log("(signInWithEmailAndPassword) Signed in as:", firebaseUser.email);
			$location.path('/inicio');
		}).catch(function(error) {
			// SI TE DESLOGUEAS console.log("(signInWithEmailAndPassword) Error:", error);

		});
	};

	// DESLOGUEARTE
	$scope.signOut = function() {
		authObj.$signOut();
	};

	// IF SI ESTAS LOGUEADO
	$scope.logued = false;
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