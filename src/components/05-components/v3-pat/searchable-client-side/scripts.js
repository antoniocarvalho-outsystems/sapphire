/* Component SearchClientSide */

(function ($, window, SapphireWidgets) {

  class SearchClientSide {

    constructor(config) {
      this.options = {
        ...config,
      };

      this.onComponentInit();

      $(window).load(() => {
        osAjaxBackend.BindAfterAjaxRequest(() => {
          setTimeout(() => {
            $('#' + this.options.inputId).trigger('change');
          }, 200);
        });
      });

    }

    onComponentInit() {
      $('#' + this.options.inputId).on('change keydown paste input', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        } else {
          this.searchClientSide(this.options.inputId, this.options.searchableElementSelector);
        }
      });
    }

    searchClientSide(inputId, selector) {
      if ($('#' + inputId).is(':visible')) {
        var searchText = osjs('#' + inputId).val().toLowerCase();
        var searchCounter = 0;
        var selecion = osjs(selector);
        selecion.removeClass('searchNotFound');
        selecion.removeClass('searchFound');
        selecion.unhighlight();
        if (searchText.length > 1) {
          selecion.each(function () {
            if (this.innerText.trim().toLowerCase().indexOf(searchText) > -1) {
              osjs(this).addClass('searchFound');
              searchCounter++;
              osjs(this).highlight(searchText);
            } else {
              osjs(this).addClass('searchNotFound');
            }
          });
        }
      }
    }

  }

  const create = config => (window[config.widgetId] = new SearchClientSide(config));

  SapphireWidgets.SearchClientSide = {
    create,
  };

})(jQuery, window, SapphireWidgets);