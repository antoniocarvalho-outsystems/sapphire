/* Component GenericGallery2 */
(function ($, window, document, SapphireWidgets) {

	var create = function (config) {
		window[config.widgetId] = new GenericGallery2(config);
	};

	var GenericGallery2 = function (config) {
		this.config = config;
		this.$widget = $('#' + this.config.widgetId).css('display', 'block');
		this.equalHeight = this.config.equalHeight;
		if (this.$widget.find('.GenericGallery-content > span').length === 1 && this.$widget.find('.GenericGallery-content > span').hasClass('ListRecords')) {
			this.$gallery = this.$widget.find('.GenericGallery2-content > span.ListRecords');
		} else {
			this.$gallery = this.$widget.find('.GenericGallery2-content');
		}

		this.$gallery.css({
			'gridTemplateColumns': 'repeat(auto-fit, minmax(' + this.config.columnMinWidth + ', 1fr))'
		});

		this.$galleryItems = this.$gallery.children();
		this.$galleryItems.each(function () {
			if (!$(this).hasClass('GenericGallery-item')) {
				$(this).wrap('<div class="GenericGallery-item"></div>');
			}
		});
	};

	SapphireWidgets.GenericGallery2 = {
		create: create
	};

})(jQuery, window, document, SapphireWidgets);