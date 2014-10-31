/**
 * Created by acido on 31/10/14.
 */

function Pen(){

}


Pen.draw = function(ctx, prevX, x, prevY, y, size, color){
    if(!color)
        color = '#000000';

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.lineWidth = size;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.stroke();

}

Pen.start = function(){

}

Pen.stop = function(){

}