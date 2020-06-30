require('./components/index.scss');

//Import all JS files
const requireAll = r => r.keys().forEach(r);
requireAll(require.context('./components', true, /\.js$/));
