/**
 * Created by acido on 31/10/14.
 */


function User(app, id){
    this.app = app;
    this.id = id;
    this.color = getRandomColor();
    this.x = 0;
    this.y = 0;
    this.isDrawing = false;
}

User.prototype.connect = function(){

}

User.prototype.disconnect = function(){

}

User.prototype.setTool = function(){

}

User.prototype.setColor = function(color){

}

User.prototype.mouseDown = function(e, localUser){
    this.isDrawing = true;

    this.x = e.x;
    this.y = e.y;

    this.movePointer();

    if(localUser){
        this.app.socket.emit('mouseDown', e);
    }
}

User.prototype.mouseUp = function(e, localUser){
    this.isDrawing = false;

    if(localUser){
        this.app.socket.emit('mouseUp', e);
    }
}

User.prototype.mouseMove = function(e, localUser){

    if(this.isDrawing) {
        Pen.draw(this.app.ctx, this.x, e.x, this.y, e.y, 18, localUser ? this.color : e.color);
    }

    this.x = e.x;
    this.y = e.y;

    this.movePointer();

    if(localUser){
        e.color = this.color;
        this.app.socket.emit('mouseMove', e);
    }
}

User.prototype.movePointer = function(){

}


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}