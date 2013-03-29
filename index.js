/**
 * Module dependencies
 */
var defaults = require("defaults");

// Default config
var config = {
  priority: 0,
  version: 1,
  hostname: window.location.hostname,
  app_name: "app",
  proc_id: "browser"
};

module.exports = function(opts) {
  if(!opts) opts = {};

  defaults(opts, config);

  var prefix = "<"+opts.priority+">"+opts.version
    , system = [opts.hostname, opts.app_name, opts.proc_id, "- -"].join(" ");

  return function() {
    var message = Array.prototype.join.call(arguments, " ");
    var msg = [prefix, (new Date).toISOString(), system, message].join(" ");
    return [msg.length,msg].join(" ");
  };
};
