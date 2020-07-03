/* Component CountryPhone */
(function($, window, SapphireWidgets) {
	const create = config => {
		const $element = document.querySelector(`#${config.widgetId}`);

		const countryPhoneInput = window.intlTelInput($element, {
			initialCountry: config.initialCountry,
			preferredCountries: preferedCountries,
			separateDialCode: config.separateDialCode,
			nationalMode: config.nationalMode,
			autoPlaceholder: config.autoPlaceholder ? 'polite' : false,
			formatOnDisplay: false,
			utilsScript: '/V3_Pat/js/utils.js',
		});
	};

	SapphireWidgets.CountryPhone = { create };
})(jQuery, window, SapphireWidgets);

/*"
var countryPhone_" + PhoneInput + " = document.querySelector('#" + PhoneInput + "');

var input_" + PhoneInput + " = window.intlTelInput(countryPhone_" + PhoneInput + ", {
    initialCountry:'" + EncodeJavaScript(initialCountry) + "',
    " + If(Trim(preferedCountries)="","","preferredCountries:  " + preferedCountries + " ,") + "
    separateDialCode: " + If(separateDialCode,"true", "false") + ",
    nationalMode: " + If(nationalMode,"true", "false") + ",
    autoPlaceholder: " + If(autoPlaceholder,"polite", "false") + ",
    formatOnDisplay: false,
    utilsScript: '/V3_Pat/js/utils.js' // just for formatting/placeholders etc
});

"*/
