var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var PORT = process.env.PORT || 3000;
var cors = require('cors');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath
  })
  .listen(PORT, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(`Running at https://0.0.0.0:${PORT}`);
  })
