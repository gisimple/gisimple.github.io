'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    copy: {
      build: {
        cwd: 'src',
        src: ['**', '!**/*.styl'],
        dest: 'build',
        expand: true
      }
    },
    clean: {
      build: {
        src: [ 'build' ]
      },
      dist: {
        src: ['dist']
      }
    },
    stylus: {
      build: {
        options: {
          linenos: true,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '**/*.styl' ],
          dest: 'build',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
          browsers: ['last 2 version', 'ie 8', 'ie 9'],
          cascade: true
      },
      build: {
        expand: true,
        cwd: 'build/css/',
        src: [ '**/*.css', '!**/*.min.css' ]
      }
    },
    uglify: {
      minify: {
        options: { mangle: true },
        files: {
          'build/js/logo.min.js': ['build/js/logo.js'],
          'build/js/index.min.js': ['build/js/index.js']
        }
      }
    },
    jade: {
      debug: {
        options: {
          pretty: true,
          data: {
            'dotmin': ''
          }
        },
        files: [{
          expand: true,
          cwd: 'build',
          src: [ '**/*.jade' ],
          dest: 'build',
          ext: '.debug.html'
        }]
      },
      production: {
        options: {
          pretty: false,
          data: {
            'dotmin': '.min'
          }
        },
        files: [{
          expand: true,
          cwd: 'build',
          src: [ '**/*.jade' ],
          dest: 'build',
          ext: '.html'
        }]
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
        ext: '.min.css'
      }
    },
    inline: {
      dist: {
        src: ['build/*.html'],
        dest: ['dist/']
      }
    },
    watch: {
      html: {
        options: { livereload: true },
        files: ['dist/**/*.html']
      },
      all: {
        files: ['src/**/*', 'Gruntfile.js'],
        tasks: ['dist']
      }
    },
    connect: {
      server: {
        options: {
          base: 'dist/'
        }
      }
    },
    less: {
      production: {
        options: {
          paths: ['bootstrap/'],
          cleancss: true,
          modifyVars: {
            //imgPath: 'http://mycdn.com/path/to/images',
            bgColor: 'red'
          }
        },
        files: {
          'build/css/index.css': 'src/css/theme.less'
        }
      }
    },
    jshint: {
      options: {
        node: true,
        curly: false,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          d3: true
        },
      },
      all: ['Gruntfile.js', 'src/js/**/*.js', '!src/js/**/*.min.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('build-init', ['clean', 'copy']);
  grunt.registerTask('styles', ['less', 'autoprefixer', 'cssmin']);
  grunt.registerTask('scripts', ['jshint', 'uglify']);
  grunt.registerTask('build', ['build-init','styles','scripts','jade']);
  grunt.registerTask('dist', ['build', 'inline']);
  grunt.registerTask('default', ['dist']);
  grunt.registerTask('dev', ['dist', 'connect', 'watch']);
};