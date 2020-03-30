(function () {

  class DataTables {

    constructor(config) {
      this.config = config;
      this.$widget = $(`#${config.widgetId}`);
      this.$table = this.$widget.find('table');
      this.onInit();
    }

    onInit() {
      var _this = this;
      $(function () {
        _this.$table.DataTable({
          "scrollY": "200px",
          "scrollCollapse": true,
          "paging": false,
          "scrollX": true
        });
      });
    }

  }

  const create = config => (window[config.widgetId] = new DataTables(config));

  SapphireWidgets.DataTables = {
    create
  };

})();