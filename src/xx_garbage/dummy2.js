var SapphireWidgets = (window.SapphireWidgets = window.SapphireWidgets || {});

function ifFnExists(fnName) {
  fn = window[fnName];
  fnExists = typeof fn === 'function';
  return fnExists;
}

$.fn.setCursorPosition = function (pos) {
  this.each(function (index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });
  return this;
};

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function changeUrlParam(param, value) {
  var currentURL = window.location.href + '&';
  var change = new RegExp('(' + param + ')=(.*)&', 'g');
  var newURL = currentURL.replace(change, '$1=' + value + '&');

  if (getURLParameter(param) !== null) {
    try {
      window.history.replaceState('', '', newURL.slice(0, -1));
    } catch (e) {
      console.log(e);
    }
  } else {
    var currURL = window.location.href;
    if (currURL.indexOf("?") !== -1) {
      window.history.replaceState('', '', currentURL.slice(0, -1) + '&' + param + '=' + value);
    } else {
      window.history.replaceState('', '', currentURL.slice(0, -1) + '?' + param + '=' + value);
    }
  }
}

SapphireWidgets.ElementEventBlocker = {};

SapphireWidgets.ElementEventBlocker.block = function (buttonId) {
  $('#' + buttonId).addClass('element-blocked');
}

function bindBlockableElement() {
  $('.blockable-element').off('mousedown').on('mousedown', function () {
    var buttonId = $(this).prop('id');
    SapphireWidgets.ElementEventBlocker.block(buttonId);
    $(this).off('mousedown');
    $(this).trigger('click');
  });
}

$(function () {
  bindBlockableElement();
});

$(window).load(function () {
  osAjaxBackend.BindAfterAjaxRequest(function () {
    bindBlockableElement();
  });
});