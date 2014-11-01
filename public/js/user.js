/**
 * Created by acido on 31/10/14.
 */


function User(app, id){
    this.app = app;
    this.id = id;
    this.color = getRandomColor();
    this.x = null;
    this.y = null;
    this.isDrawing = false;
    this.tool = 'pen';
    this.size = 10;
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

    this.draw(e, localUser);

    if(localUser){
        e.eventType = 'mouseDown';
        e.color = this.color;
        e.tool = this.tool;
        e.prevX = this.x;
        e.prevY = this.y;
        e.size = this.size;
        e.isDrawing = this.isDrawing;
        this.app.socket.emit('mouseDown', e);
    }

    this.x = e.x;
    this.y = e.y;

    this.movePointer();
}

User.prototype.mouseUp = function(e, localUser){
    this.isDrawing = false;

    this.draw(e, localUser);

    if(localUser){
        e.eventType = 'mouseUp';
        e.color = this.color;
        e.tool = this.tool;
        e.prevX = this.x;
        e.prevY = this.y;
        e.size = this.size;
        e.isDrawing = this.isDrawing;
        this.app.socket.emit('mouseUp', e);
    }

    this.x = e.x;
    this.y = e.y;
}

User.prototype.mouseMove = function(e, localUser){

    if(this.isDrawing) {
        this.draw(e, localUser);
    }

    if(localUser){
        e.eventType = 'mouseMove';
        e.color = this.color;
        e.tool = this.tool;
        e.prevX = this.x;
        e.prevY = this.y;
        e.size = this.size;
        e.isDrawing = this.isDrawing;
        this.app.socket.emit('mouseMove', e);
    }

    this.x = e.x;
    this.y = e.y;

    this.movePointer();
}

User.prototype.draw = function(e, localUser){
    this.app.tools[this.tool].move(
        this.app.ctx,
        localUser ? this.x : e.prevX,
        e.x,
        localUser ? this.y : e.prevY,
        e.y,
        this.size,
        localUser ? this.color : e.color
    );
}

//Animate pointer for me!!!!
User.prototype.movePointer = function(){

}

//Add color picker for me!!!!!!!
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}