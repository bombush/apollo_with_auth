// setup ad-hoc babel
require('babel-register')({
  presets: [ 'es2015', 'es2017' ],
  plugins: [
    "babel-plugin-inline-import", // plugin for importing text files as string (for .graphql)
    "babel-plugin-transform-object-rest-spread" // plugin for transforming object spread syntax ({...object})
  ],
  cache: false
});
require('babel-polyfill');


// load and run the actual server
require('./server.js');