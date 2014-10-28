/**
 * Created by acido on 22/10/14.
 */

function Main(){
    var self = this;

    //app vars
    this.$canvas = $('#canvas').get(0);
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint = false;

    //socket
    this.socket = io.connect('/');
    this.socket.on('connect', function(socket){
 
    });

    this.socket.on('init', function(data){
       self.init(data);
    });

    this.socket.on('addClick', function(data){
       self.addClick(data.clickX, data.clickY, data.clickDrag);
    });
    this.socket.on('addClick1', function(data){console.log(data)});

    //canvas
    var c = document.getElementById("canvas");
    this.ctx = c.getContext("2d");

    //bind events
    $('#canvas').mousedown(function(e){
        self.mouseDownEvent(e);
    });
    $('#canvas').mouseup(function(e){
        self.mouseUpEvent(e);
    });
    $('#canvas').mousemove(function(e){
        self.mouseMoveEvent(e);
    });
}

Main.prototype.init = function(data){
    this.clickX = data.clickX;
    this.clickY = data.clickY;
    this.clickDrag = data.clickDrag;
    this.redraw();
}

Main.prototype.mouseDownEvent = function(e){
    var mouseX = e.pageX - this.$canvas.offsetLeft;
    var mouseY = e.pageY - this.$canvas.offsetTop;

    this.paint = true;
    var x = e.pageX - this.$canvas.offsetLeft;
    var y = e.pageY - this.$canvas.offsetTop;

    this.addClick(e.pageX - this.$canvas.offsetLeft, e.pageY - this.$canvas.offsetTop);
    this.socket.emit('addClick', {clickX : x, clickY: y, clickDrag : false});
}

Main.prototype.mouseUpEvent = function(e){
    this.paint = false;
}

Main.prototype.mouseMoveEvent = function(e){
    if(this.paint){
        var x = e.pageX - this.$canvas.offsetLeft;
        var y = e.pageY - this.$canvas.offsetTop;
        this.addClick(e.pageX - this.$canvas.offsetLeft, e.pageY - this.$canvas.offsetTop, true);
        this.socket.emit('addClick', {clickX : x, clickY: y, clickDrag : true});
    }
}

Main.prototype.addClick = function(x, y, dragging){
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
    this.redraw();

}

Main.prototype.redraw = function(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clears the canvas
    this.ctx.strokeStyle = "#df4b26";
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = 5;

    for(var i=0; i < this.clickX.length; i++) {
        this.ctx.beginPath();
        if(this.clickDrag[i] && i){
            this.ctx.moveTo(this.clickX[i-1], this.clickY[i-1]);
        }else{
            this.ctx.moveTo(this.clickX[i]-1, this.clickY[i]);
        }
        this.ctx.lineTo(this.clickX[i], this.clickY[i]);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}



$(document).ready(function(){
    var app = new Main();
});