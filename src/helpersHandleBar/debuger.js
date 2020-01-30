/**
 * Register a debug helper for Handlebars to be able to log data or inspect data in the browser console
 * 
 * Usage: 
 *   {{debug someObj.data}} => logs someObj.data to the console
 *   {{debug someObj.data true}} => logs someObj.data to the console and stops at a debugger point
 * 
 * https://gist.github.com/elgervb/5c38c8d70870f92ef6338a291edf88e9
 * 
 * @param {any} the data to log to console
 * @param {boolean} whether or not to set a breakpoint to inspect current state in debugger
 */

module.exports = function(handlebars) {
  handlebars.registerHelper('debug', function(data , breakpoint) {
    console.log(data);
  if (breakpoint === true) {   
      debugger;
  }
  return '';
  });
};
