/**
 * Created by acido.
 */

function Document(){
	this.width = 4000;
	this.height = 4000;
	this.x = 0;
	this.y = 0;
	this.layerOrder = [];
	this.layerMap = [];
	this.currentLayer = 'root';
	this.reDraw = false;
	this.clear();
}

Document.prototype.clear = function(){
	this.layerOrder = [];
	this.layerMap = [];
	this.createLayer('root');
	this.currentLayer = 'root';
	this.reDraw = true;
}

Document.prototype.createLayer = function(name){
	var layer = new Layer(name);
	this.layerOrder.push(layer);
	this.layerMap[name] = layer;

	this.reDraw = true;
}

Document.prototype.setPos = function(x, y){
	//todo: make sure that we use the document size to restrict movment
	this.x = x;
	this.y = y;
	this.reDraw = true;
}

Document.prototype.pushToLayer = function(layer, data){
	this.layerMap[layer].push(data);
	this.reDraw = true;
}

Document.prototype.draw = function(ctx){
	if(!this.reDraw)
		return;

	//clear the screen
	ctx.clearRect(0, 0, pk.$canvas.attr('width'),pk.$canvas.attr('height'));
	ctx.save();

	//set correct offset position
	//this will enable us to move around in the document
	ctx.translate(this.x, this.y);

	//draw layers
	for(var i = 0;i < this.layerOrder.length; i++){
		this.layerOrder[i].draw(ctx, this);
	}

	ctx.restore();
	this.reDraw = false;
}



function Layer(name){
	this.data = [];
	this.name = name;
	this.reDraw = false; //TODO: Bitmap cache? Not sure if that is faster than redrawing. We should try :)
	this.cache = null;
}

Layer.prototype.push = function(data){
	this.data.push(data);
	this.reDraw = true;
}

Layer.prototype.draw = function(ctx, document){
	var data;
	for(var i = 0; i < this.data.length; i++) {
		data = this.data[i];
		pk.tools[data.tool].move(
			ctx,
			data.prevX ? data.prevX : data.x,
			data.x,
			data.prevY ? data.prevY : data.y,
			data.y,
			data.size,
			data.color
		);
	}
}