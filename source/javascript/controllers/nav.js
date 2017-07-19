/* ==========================================================================
   Nav
   ========================================================================== */
matidiazApp.controller('NavCtrl', function ($scope, $firebaseObject, $location) {

	// BASE DE DATOS DEL MENU
	const rootRef = firebase.database().ref().child("menu");
	$scope.itemMenu = $firebaseObject(rootRef);

	// CLASE ACTIVA DEPENDIENDO DE LA URL
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.classCollapse = "";

	$scope.openMobileNav = function () {
		if ($scope.classCollapse === "")
	      $scope.classCollapse = "animation-right";
	    else
	      $scope.classCollapse = "";
	};

	$scope.onlyCloseMobileNav = function () {
	      $scope.classCollapse = "";
	};

});