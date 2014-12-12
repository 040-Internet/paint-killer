/**
 * Created by acido on 31/10/14.
 */


function User(app, id){
    this.app = app;
    this.id = id;
    this.color = '#cccccc';
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
    this.color = color;
}

User.prototype.mouseDown = function(e, localUser){
    this.isDrawing = true;

    if(this.tool != 'move'){

        this.handleEvent(e, 'mouseDown', localUser);
    }

    this.x = e.x;
    this.y = e.y;

}

User.prototype.mouseUp = function(e, localUser){
    this.isDrawing = false;

    if(this.tool != 'move') {

        this.handleEvent(e, 'mouseUp', localUser);
    }

    this.x = e.x;
    this.y = e.y;
}

User.prototype.mouseMove = function(e, localUser){

    if(this.tool != 'move') {

        if(!localUser || (localUser && this.isDrawing))
            this.handleEvent(e, 'mouseMove', localUser);

    }else if(this.isDrawing){
        this.app.tools[this.tool].move(null, this.x, e.x, this.y, e.y);
    }

    this.x = e.x;
    this.y = e.y;

}

User.prototype.handleEvent = function(e, eventType, localUser){

    if(localUser){
        e.x = (e.x - (pk.document.windowWidth *.5)) - pk.document.x; //compensate for document position
        e.y = (e.y - (pk.document.windowHeight *.5)) - pk.document.y;
        e.prevX = eventType == 'mouseDown' ? e.prevX : this.x;
        e.prevY = eventType == 'mouseDown' ? e.prevY : this.y;
        e.layer = this.app.document.currentLayer;
        e.eventType = eventType;
        e.size = this.size;
        e.isDrawing = this.isDrawing;
        e.color = this.color;
        e.tool = this.tool;

        this.app.socket.emit(eventType, e);
    }

    this.app.document.pushToLayer(e.layer, e);
}

//Animate pointer for me!!!!
User.prototype.movePointer = function(){

}
