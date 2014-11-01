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

var roomData = [];

io.on('connection', function(socket){
    var connectionId = socket.conn.id;
    var room = 'main';
    socket.join(room);

    //announce new user
    socket.broadcast.to(room).emit('userConnect', connectionId);

    //announce user disconnect
    socket.on('disconnect', function(){
        socket.broadcast.to(room).emit('userDisconnect', connectionId);
    });

    //init the canvas for the new user
    socket.emit('init', roomData);

    //mousedown
    socket.on('mouseDown', function(e){
        if(e.isDrawing)
            roomData.push(e);
        socket.broadcast.to(room).emit('mouseDown', {user:connectionId, event:e});
    });

    //mouseup
    socket.on('mouseUp', function(e){
        if(e.isDrawing)
            roomData.push(e);
        socket.broadcast.to(room).emit('mouseUp', {user:connectionId, event:e});
    });

    //mousemove
    socket.on('mouseMove', function(e){
        if(e.isDrawing)
            roomData.push(e);
        socket.broadcast.to(room).emit('mouseMove', {user:connectionId, event:e});
    });

});

