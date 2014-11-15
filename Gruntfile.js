module.exports = function (grunt) {
    grunt.initConfig({
        "uglify": {
            "js": {
                "files": {
                    'dist/xcon-min.js': ['build/xcon.js']
                }
            }
        },
        "requirejs": {
            "js": {
                "options": {
                    'findNestedDependencies': true,
                    'baseUrl': 'src',
                    'optimize': 'none',
                    'mainConfigFile': 'src/config/config.js',
                    'include': ['main.js'],
                    'out': 'build/xcon.js',
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
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build', ['requirejs:js', 'uglify:js']);
};
