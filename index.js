/**
 * Module dependencies
 */
var defaults = require("defaults");

// Default config
var config = {
  facility: 14,
  severity: 6,
  version: 1,
  app_name: "app",
  proc_id: "web.1"
};

module.exports = exports = function(opts) {
  if(!opts) opts = {};

  defaults(opts, config);

  var prefix = "<"+(opts.priority || opts.facility*8+opts.severity)+">"+opts.version
    , system = [opts.hostname, opts.app_name, opts.proc_id, "- -"].join(" ");

  return function() {
    var message = Array.prototype.join.call(arguments, " ");
    var msg = [prefix, (new Date).toISOString(), system, message].join(" ");
    return [msg.length,msg].join(" ");
  };
};
