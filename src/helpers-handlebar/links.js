/**
 * Registers the "foo" Handlebars helper.
 *
 * @param {object} handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */

module.exports = handlebars => {
	handlebars.registerHelper('btnTypes', value => {
		const btnTypes = {
			button: 'Primary',
			second: 'Secondary',
			third: 'Third',
			link: 'Link',
			cancel: 'Cancel',
		};

		return new handlebars.SafeString(btnTypes[value]);
	});
};
