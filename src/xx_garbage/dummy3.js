window.top._iframePopup.Popup_Window_Close();
if (window.top.SapphireWidgets && window.top.SapphireWidgets.LayoutBase) {
  if (window.top.$('.LayoutBase-iframesidebar iframe').length) {
    window.top.$('.LayoutBase-iframesidebar iframe')[0].contentWindow.window.SapphireWidgets.Sidebar.close();
  }
}