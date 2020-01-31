/**
 * Registers the "foo" Handlebars helper.
 *
 * @param {object} handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */

module.exports = function(handlebars) {
	handlebars.registerHelper('test', function(arg1, arg2, options) {
      const someArr = [1,2,3,4,];

		return new handlebars.SafeString(someArr);
	});
};
