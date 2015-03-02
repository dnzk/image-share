var LIVERELOAD_PORT = 35769;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
  return connect['static'](require('path').resolve(dir));
};
module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      less: {
        files: ['./app/styles-less/**/*.less'],
        tasks: ['less'],
        options: { livereload: true }
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: ['./app/index.html', './app/scripts/**/*.js', './app/styles-less/**/*.less', './app/stylesheets/**/*.css', './app/pages/**/*.html']
      }
    },
    connect: {
      options: {
        port: 9069,
        hostname: '0.0.0.0',
        base: ['./app']
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [lrSnippet, mountFolder(connect, './app')]
          }
        }
      }
    },
    open: {
      dev: {
        path: "http://localhost:<%= connect.options.port %>",
        app: "chrome"
      }
    },
    less: {
      server: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "./app/stylesheets/main.css": "./app/styles-less/main.less"
        }
      }
    }
  });
  var dependencies = ['grunt-contrib-watch', 'grunt-contrib-connect', 'grunt-contrib-less', 'grunt-open'];
  dependencies.forEach(function(current) {
    grunt.loadNpmTasks(current);
  });
  grunt.registerTask('default', ['connect:livereload', 'open:dev', 'watch']);
  // grunt.registerTask('default', function() {
    // grunt.task.run([
      // 'connect:livereload',
      // 'open:dev',
      // 'watch:less'
    // ]);
  // });
};