/*
 * grunt-stripper
 * https://github.com/dsquier/grunt-stripper
 *
 * This library is based off https://github.com/philip/grunt-strip-code
 * release 1.2 with added support for HTML comment blocks.
 */
'use strict';

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask("stripper", "Strip code between comment blocks or by regex.", function(target) {
    var options = this.options({
          start_comment: "test-code",
          end_comment: "end-test-code"
        })
    , pattern
    , regex_js =
        "[\\s ]*\\/\\* ?" + options.start_comment + " ?\\*\\/"
      + "?[\\s\\S]*?"
      + "\\/\\* ?" + options.end_comment + " ?\\*\\/[\\s ]*\\n?"
    , regex_html =
        "[\\s ]*<!\\-\\- ?" + options.start_comment + " ?\\-\\->"
      + "?[\\s\\S]*?"
      + "[\\s ]*<!\\-\\- ?" + options.end_comment + " ?\\-\\->[\\s ]*\\n?";
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.forEach(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return;
        }
        // Determine file extension.
        var fileExt = filepath.split(".").pop();
        if (options.pattern) {
          grunt.log.writeln("User-provided regex");
          pattern = options.pattern;
        } else {
          if (fileExt === 'html' || fileExt === 'htm') {
            grunt.log.writeln("HTML file, using regex_html.");
            pattern = new RegExp(regex_html, "g");
          } else {
            grunt.log.writeln("JS file, using regex_js.");
            pattern = new RegExp(regex_js, "g");
          }
        }
        var contents = grunt.file.read(filepath)
          , replacement = contents.replace(pattern, "");
        // if replacement is different than contents, save file and print a success message.
        if (contents != replacement) {
          if (f.dest) {
            grunt.file.write(f.dest, replacement);
            grunt.log.writeln("Stripped code from " + filepath + " and saved to " + f.dest);
          } else {
            grunt.file.write(filepath, replacement);
            grunt.log.writeln("Stripped code from " + filepath);
          }
        }
      });
    });
  });
};
