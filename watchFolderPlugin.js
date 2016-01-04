var watch = require('watch');
var path  = require('path');
var fs    = require('fs');


function watchFolderPlugin(options) {
  this.options = options;
}

watchFolderPlugin.prototype.apply = function(compiler) {
  var that = this;
  compiler.plugin("emit", function(compilation, callback) {
    var watchFolder = path.join(__dirname, that.options.watchFolder);
    watch.createMonitor(watchFolder, function(monitor){
      monitor.files[path.join(watchFolder, "/*."+that.options.watchExtension)]
      monitor.on("changed", function (f, curr, prev) {
        console.log(f);
        compiler.run(function(err) {
          if(err) throw err;
          monitor.stop();
        });
      });
    });
    callback();
  });
};

module.exports = watchFolderPlugin;