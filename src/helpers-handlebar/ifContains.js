/**
 * Registers the "foo" Handlebars helper.
 *
 * @param {object} handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */

module.exports = function(handlebars) {
	handlebars.registerHelper('ifContains', (arg1, arg2 ='',options)=> {
		return  new handlebars.SafeString((arg2.includes(arg1) ) ? options.fn(this) : options.inverse(this));
	});
};

