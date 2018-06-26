/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

    // level: 'info',
    
    
    /**
     * An array of route addresses to monitor.
     *
     * (e.g. [ 'get /foo/bar', 'post /foo', 'all /admin/*' ])
     *
     * Defaults to `[ '/*' ]`.
     */
    routesToLog: [
      '/*'
    ],
 
    /**
     * Request parameters which should NEVER be logged.
     * If seen, they will be replaced with "*REDACTED*"
     *
     * (e.g. "password")
     *
     * > WARNING:
     * > This is a SHALLOW check of request body, querystring, and route path parameters.
     * > Deeply nested properties with these names are not redacted.
     */
    dontLogParams: [
      'password',
      'token'
    ],
 
    /**
     * When request starts...
     *
     * > If omitted, this defaults to doing nothing.
     * > This can be useful for debugging.
     *
     * @param {Dictionary} report  [info about the request]
     * @param {Ref} req  [request object -- careful not to modify!]
     * @param {Ref} res  [response object -- careful not to modify!  And don't try to respond!]
     * @synchronous
     */
    onRequest: function onRequest(report, req, res) {
 
        sails.log('request:', req.method, req.url);
 
        return;
    },
 
    /**
     * When response is sent...
     *
     * > If omitted, this defaults to logging request metadata to the
     * > console in a vaguely attractive way.  If you define this function,
     * > then it will override the default output.
     *
     * @param {Dictionary} report  [info about the request]
     * @param {Ref} req  [request object -- careful not to modify!]
     * @param {Ref} res  [response object -- careful not to modify!  And don't try to respond!]
     * @synchronous
     */
    onResponse: function onResponse(report, req, res) {
 
        sails.log('response:', report.statusCode);
 
      return;
    }
}
