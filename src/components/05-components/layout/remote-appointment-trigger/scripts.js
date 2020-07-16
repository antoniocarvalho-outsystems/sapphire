/* Component RemoteAppointmentTrigger */

(function ($, window, SapphireWidgets) {

    class RemoteAppointmentTrigger {

      constructor(config) {
        this.options = {
          ...config
        }
        this.onComponentInit();
      }

      onComponentInit() {
        let dragger = document.createElement('div');
        dragger.id = 'remote-appointment-dragger';
        document.getElementById(this.options.widgetId).appendChild(dragger);
        let opener = document.createElement('div');
        opener.id = 'remote-appointment-opener';
        document.getElementById(this.options.widgetId).appendChild(opener);
        this.makeDraggable(document.getElementById(this.options.widgetId));
      }

      makeDraggable(el) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;

        document.getElementById('remote-appointment-dragger').onmousedown = dragMouseDown;

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;


          // console.log('el.offsetTop', el.offsetTop);
          // console.log('el.offsetLeft', el.offsetLeft);

          // console.log('pos1', pos1);
          // console.log('pos2', pos2);
          // console.log('pos3', pos3);
          // console.log('pos4', pos4);


          if (el.offsetTop < 5) {
            el.style.top = '5px';
          } else {
            el.style.top = (el.offsetTop - pos2) + 'px';
          }

          if (el.offsetLeft < 5) {
            el.style.left = '5px';
          } else {
            el.style.left = (el.offsetLeft - pos1) + 'px';
          }


        }

        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
        }

      }

    }

    const create = config => (window[config.widgetId] = new RemoteAppointmentTrigger(config));

    SapphireWidgets.RemoteAppointmentTrigger = {
      create
    }

  }

)(jQuery, window, SapphireWidgets);