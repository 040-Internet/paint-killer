/**
 * Created by acido on 22/10/14.
 */

var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var io = require('socket.io');
var http = require('http');

app.use(serveStatic('public', {}));



var server = http.createServer(app).listen(3000, function() {
    console.log('Express server listening on port ' + 3000);
});

io = io.listen(server);


var clickX = [];
var clickY = [];
var clickDrag = [];


io.on('connection', function(socket){

    socket.join('main');
    socket.emit('init',{clickX : clickX, clickY: clickY, clickDrag : clickDrag});
    socket.on('addClick', function(data){
        clickX.push(data.clickX);
        clickY.push(data.clickY);
        clickDrag.push(data.clickDrag);
        socket.broadcast.to('main').emit('addClick', data);


    });
});

