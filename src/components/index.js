require('./index.scss');

const SapphireWidgets = (window.SapphireWidgets = window.SapphireWidgets || {});

// Import all JS files
const requireAll = r => r.keys().forEach(r);
requireAll(require.context('./', true, /\.js$/));
