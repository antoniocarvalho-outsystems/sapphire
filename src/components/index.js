require('./index.scss');

//require('./05-components/v3-pat/spinner-horizontal/scripts.js');

// Import all JS files
const requireAll = r => r.keys().forEach(r);
requireAll(require.context('./', true, /\.js$/));
