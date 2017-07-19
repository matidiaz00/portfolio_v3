/* ==========================================================================
   Inicio
   ========================================================================== */
matidiazApp.controller('CarouselCtrl', function ($scope, $firebaseAuth, $firebaseArray, $uibModal) {

	$scope.toggle = 0;

	// ARRAY DEL CAROUSEL
	const rootRef = firebase.database().ref().child("carousel");
	var itemCarousel = $firebaseArray(rootRef);

	// PRELOAD DEL CAROUSEL
	itemCarousel.$loaded()
		.then(function(data) {
			$scope.itemCarousel = itemCarousel;
			$scope.toggle = 1;
			// AGREGA UN NUEVO SLIDE EN EL CAROUSEL
			$scope.newSlide = function() {
				$scope.itemCarousel.$add({
					"imagen_desktop": "empty",
					"imagen_mobile": "empty",
					"subtitulo": "empty",
					"titulo": "empty"
				}).then(function() {
					// CUANDO SE TERMINO DE AÑADIR
				});
			};





			/*
			// CAMBIA LAS IMAGENES
			$scope.changeImage = function() {
				// get file
				var file = e.target.files[0];

				// create a storage ref
				var storageRef = firebase.storage().ref('sweet_gifs/' + file.name);

				// upload file
				var task = storageRef.put(file);

				// upload progress bar
				task.on('state_changed',
					function progress(snapshot) {
						var porcentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						uploader.value = porcentage;
						console.log('cargando');
					},
					function error(err) {
						console.log('Error');
					},
					function complete() {
						console.log('Completado');
					}
				);
			};
			*/






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

	$scope.open = function (_carousel) {
		var modalInstance = $uibModal.open({
			controller: "PopupCarouselCtrl",
			templateUrl: "popup.html",
			resolve: {
                carousel: function() {
                    return _carousel;
                }
            }
		});
	};
	
});

matidiazApp.controller('PopupCarouselCtrl', function ($scope, $firebaseObject, $uibModalInstance, carousel) {
	// ARRAY DE LAS "REDES SOCIALES"
	const rootRef = firebase.database().ref().child("carousel").child(carousel.$id);
	var carousel = $firebaseObject(rootRef);
	carousel.$bindTo($scope, "slide");

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.remove = function () {
		carousel.$remove();
		$uibModalInstance.dismiss('cancel');
	};
});