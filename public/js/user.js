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
    this.size = 10;
    this.setTool('pen');
}

User.prototype.setTool = function(tool){
    this.tool = tool;
    this.app.tools[tool].init();
}

User.prototype.setColor = function(color){

}

User.prototype.mouseDown = function(e, localUser){
    this.isDrawing = true;

    if(this.tool != 'move'){
        e.x -= pk.document.x; //compensate for document position
        e.y -= pk.document.y;
        e.prevX = this.x;
        e.prevY = this.y;

        if(localUser){
            e.layer = this.app.document.currentLayer;
            e.eventType = 'mouseDown';
            e.size = this.size;
            e.isDrawing = this.isDrawing;
            e.color = this.color;
            e.tool = this.tool;
            this.app.socket.emit('mouseDown', e);
        }

        this.draw(e, localUser);
    }

    this.x = e.x;
    this.y = e.y;

}

User.prototype.mouseUp = function(e, localUser){
    this.isDrawing = false;

    if(this.tool != 'move') {
        e.x -= pk.document.x; //compensate for document position
        e.y -= pk.document.y;
        e.prevX = this.x;
        e.prevY = this.y;

        if (localUser) {
            e.layer = this.app.document.currentLayer;
            e.eventType = 'mouseUp';
            e.color = this.color;
            e.tool = this.tool;
            e.size = this.size;
            e.isDrawing = this.isDrawing;
            this.app.socket.emit('mouseUp', e);
        }

        this.draw(e, localUser);
    }

    this.x = e.x;
    this.y = e.y;
}

User.prototype.mouseMove = function(e, localUser){

    if(this.tool != 'move') {

        e.x -= pk.document.x; //compensate for document position
        e.y -= pk.document.y;

        e.prevX = this.x;
        e.prevY = this.y;

        if (localUser) {
            e.layer = this.app.document.currentLayer;
            e.eventType = 'mouseMove';
            e.color = this.color;
            e.size = this.size;
            e.isDrawing = this.isDrawing;
            e.tool = this.tool;
            this.app.socket.emit('mouseMove', e);
        }

        if (e.isDrawing) {
            this.draw(e, localUser);
        }

    }else if(this.isDrawing){
        this.app.tools[this.tool].move(null, this.x, e.x, this.y, e.y);
    }

    this.x = e.x;
    this.y = e.y;

}

User.prototype.draw = function(e, localUser){
    this.app.document.pushToLayer(e.layer, e);
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