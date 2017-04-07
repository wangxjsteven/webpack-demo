var port = 4000,

    express = require('express'),
    webpack = require('webpack'),
    devConfig = require('./webpack.dev.conf.js'),
    app = new express(),
    compiler = webpack(devConfig);

app.use(require('webpack-dev-middleware')(compiler, null));

app.listen(port, function(arguments) {
    console.log('listen on ' + port);
});