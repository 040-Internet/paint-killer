/**
 * Created by acido.
 */

function Document(windowWidth, windowHeight){
	var self = this;

	this.$canvasHolder = $('#canvas-holder');
	this.$layersList = $('.layers ul');
	this.width = 4000;
	this.height = 4000;
	this.windowWidth = windowWidth;
	this.windowHeight = windowHeight;
	this.x = 0;
	this.y = 0;
	this.layerOrder = [];
	this.layerMap = [];
	this.currentLayer = 'root';
	this.redraw = true;

	$(document).on('click touch','.layers .layer',function(e){
		self.setActiveLayer($(this).data('name'));
		e.preventDefault();
		e.stopPropagation();
	});

	this.clear();
}

Document.prototype.resize = function(width, height){
	this.windowWidth = width;
	this.windowHeight = height;
}

Document.prototype.clear = function(){
	this.layerOrder = [];
	this.layerMap = [];
	this.createLayer('first');
	this.createLayer('root');
	this.createLayer('last');
	this.setActiveLayer('root');
	this.redraw = true;
}

Document.prototype.createLayer = function(name){
	var layer = new Layer(this, name, this.layerOrder.length);
	this.layerOrder.push(layer);
	this.layerMap[name] = layer;
	this.redraw = true;


}

Document.prototype.setActiveLayer = function(name){
	this.currentLayer = name;
	this.drawLayerList();
}

Document.prototype.drawLayerList = function(){
	this.$layersList.empty();
	for(var i = 0;i <= this.layerOrder.length;i++){
		if(this.layerOrder[i]) {
			this.$layersList.append('<li class="layer '+(this.layerOrder[i].name == this.currentLayer ?  'active' : '')+'" data-name="'+this.layerOrder[i].name+'">' + this.layerOrder[i].name + '</li>');
		}
	}
}

Document.prototype.setPos = function(x, y){
	var minWidth =  (this.width *.5) - (this.windowWidth *.5);
	var minHeight =  (this.width *.5) - (this.windowWidth *.5);

	if(x < -minWidth)
		x = -minWidth;

	if(x > minWidth)
		x = minWidth;

	if(y < -minHeight)
		y = -minHeight;

	if(y > minHeight)
		y = minHeight;

	this.x = x;
	this.y = y;
	console.log('move!');
	this.redraw = true;
}

Document.prototype.pushToLayer = function(layer, data){
	this.layerMap[layer].push(data);
}

Document.prototype.draw = function(){
	for(var i = 0;i < this.layerOrder.length; i++){
		this.layerOrder[i].draw(this.redraw);
	}
	this.redraw = false;
}