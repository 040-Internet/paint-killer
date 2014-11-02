/**
 * Created by acido.
 */


function Move(){

}

Move.init = function(){
	$('#canvas').css('cursor', 'move');
}

Move.move = function(ctx, prevX, x, prevY, y){
	var deltaX = prevX - x;
	var deltaY = prevY - y;

	pk.document.setPos(pk.document.x - deltaX, pk.document.y - deltaY);
}

Move.stop = function(){

}

Move.draw = function(){

}
