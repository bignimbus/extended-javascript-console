module.exports = function (grunt) {
    grunt.initConfig({
        "jasmine": {
            "pivotal": {
                "src": 'src/*.js',
                "options": {
                    "specs": 'tests/*.spec.js',
                    "version": "2.0.4",
                    "template": require('grunt-template-jasmine-requirejs'),
                    "templateOptions": {
                        "requireConfigFile": 'config/config.js'
                    }
                }
            }
        },
        "uglify": {
            "js": {
                "files": {
                    'dist/xcon-0.6.0.min.js': ['build/xcon-0.6.0.js']
                }
            }
        },
        "requirejs": {
            "js": {
                "options": {
                    'findNestedDependencies': true,
                    'baseUrl': 'src',
                    'optimize': 'none',
                    'mainConfigFile': 'config/config.js',
                    'include': ['main.js'],
                    'out': 'build/xcon-0.6.0.js',
                    'onModuleBundleComplete': function (data) {
                        var fs = require('fs'),
                        amdclean = require('amdclean'),
                        outputFile = data.path;

                        fs.writeFileSync(outputFile, amdclean.clean({
                            'filePath': outputFile
                        }));
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build', ['jasmine', 'requirejs:js', 'uglify:js']);
};
