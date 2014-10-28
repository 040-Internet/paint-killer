/**
 * Created by acido on 22/10/14.
 */

function Main(){
    var self = this;
    this.$canvas = $('#canvas').get(0);
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint = false;
    var c = document.getElementById("canvas");
    this.ctx = c.getContext("2d");
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(0,0,150,75);
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

Main.prototype.mouseDownEvent = function(e){
    var mouseX = e.pageX - this.$canvas.offsetLeft;
    var mouseY = e.pageY - this.$canvas.offsetTop;

    this.paint = true;
    this.addClick(e.pageX - this.$canvas.offsetLeft, e.pageY - this.$canvas.offsetTop);
    this.redraw();
}

Main.prototype.mouseUpEvent = function(e){
    this.paint = false;
}

Main.prototype.mouseMoveEvent = function(e){
    if(this.paint){
        this.addClick(e.pageX - this.$canvas.offsetLeft, e.pageY - this.$canvas.offsetTop, true);
        this.redraw();
    }
}

Main.prototype.addClick = function(x, y, dragging){
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
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

Main.prototype.connect = function(){

}

(function(){
    var app = new Main();
}());