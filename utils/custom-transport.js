const Transport = require('winston-transport');

/**
 * Custom Winston 3.0 transport to support logging to console
 *
 * NOTE: The default Winston console transport uses `console._stdout`
 * instead of `console.log`, so Stackdriver doesn't pick up logs.. :(
 */
class CustomTransport extends Transport {
  log(info, callback) {
    // Emit a `logged` event for instances to listen to
    setImmediate(() => {
      this.emit('logged', info);
    });

    /* eslint-disable no-console */

    // Use standard console function based on level
    switch (info.level) {
      case 'verbose':
      case 'debug':
        console.log(info.message);
        break;
      case 'notice':
      case 'info':
        console.info(info.message);
        break;
      case 'warn':
      case 'warning':
        console.warn(info.message);
        break;
      case 'error':
      case 'crit':
      case 'alert':
      case 'emerg':
        console.error(info.message);
        break;
      default:
        console.log(info.message);
    }

    /* eslint-enable */

    callback();
  }
}

module.exports = CustomTransport;
