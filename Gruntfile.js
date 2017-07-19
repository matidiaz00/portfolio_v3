module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		// Package
		pkg: grunt.file.readJSON('package.json'),

		// Uglify
		uglify: {
			build: {
				options: {
					mangle: false
				},
				files: {
					'www/assets/javascript.min.js': [
						'source/javascript/main.js',
						'source/javascript/controllers/login.js',
						'source/javascript/controllers/nav.js',
						'source/javascript/controllers/footer.js',
						'source/javascript/controllers/carousel.js',
						'source/javascript/controllers/sobre_mi.js',
						'source/javascript/controllers/habilidades.js',
						'source/javascript/controllers/experiencia.js',
						'source/javascript/controllers/proyectos.js',
						'source/javascript/controllers/proyectos_interna.js',
						'source/javascript/controllers/curriculum.js',
						'source/javascript/controllers/contacto.js',
						'source/javascript/controllers/categorias.js',
						'source/javascript/controllers/caracteristicas.js'
					]
				}
			}
		},
		// LESS
		less: {
			options: {
				compress: true,
				strictMath: true
			},
			production: {
				files: {
					'www/assets/styles.min.css': ['source/styles/_import.less']
				}
			}
		},
		watch: {
			styles: {
				files: ['source/styles/*.less'], // which files to watch
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		}
	});

	// Load the plugin that provides the "**" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'less', 'watch']);

};