var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
}).listen(5000, 'localhost', function(error) {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.log('Demo is ready at http://localhost:5000/demo/dist/index.html'); // eslint-disable-line no-console
  }
});
