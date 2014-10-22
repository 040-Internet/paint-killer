/**
 * Created by acido on 22/10/14.
 */

var express = require('express');
var app = express();
var serveStatic = require('serve-static');

app.use(serveStatic('public', {}));

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});