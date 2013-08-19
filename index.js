/**
 * Module dependencies
 */

var defaults = require('defaults');
var pad = require('pad');

// Default config
var config = {
  facility: 14,
  severity: 6,
  version: 1,
  hostname: 'nohost',
  app_name: 'browser',
  proc_id: 'web'
};

function toISOString(date) {
  return date.getUTCFullYear()
    + '-' + pad(date.getUTCMonth() + 1 + '', 2, '0')
    + '-' + pad(date.getUTCDate() + 1 + '', 2, '0')
    + 'T' + pad(date.getUTCHours() + 1 + '', 2, '0')
    + ':' + pad(date.getUTCMinutes() + 1 + '', 2, '0')
    + ':' + pad(date.getUTCSeconds() + 1 + '', 2, '0')
    + '.' + String((date.getUTCMilliseconds()/1000).toFixed(3)).slice(2, 5)
    + 'Z';
};

module.exports = exports = function(opts) {
  if(!opts) opts = {};

  defaults(opts, config);

  var prefix = ['<', (opts.priority || opts.facility * 8 + opts.severity), '>', opts.version].join('')
    , system = [opts.hostname, opts.app_name, opts.proc_id, '- -'].join(' ');

  return function() {
    var message = Array.prototype.join.call(arguments, ' ');
    var msg = [prefix, toISOString(new Date), system, message].join(' ');
    return [msg.length, msg].join(' ');
  };
};
