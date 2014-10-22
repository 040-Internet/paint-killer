/**
 * Created by acido on 22/10/14.
 */

function Main(){
    var c = document.getElementById("canvas");
    this.ctx = c.getContext("2d");
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(0,0,150,75);
}


Main.prototype.run = function(){

}

Main.prototype.connect = function(){

}

(function(){
    var app = new Main();
}());