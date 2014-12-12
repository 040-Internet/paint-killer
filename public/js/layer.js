/**
 * Created by acido on 11/12/14.
 */

function Layer(document, name, position){
    this.data = [];
    this.document = document;
    this.name = name;
    this.paint = false;
    this.cache = false;
    this.recache = true;
    this.cacheIndex = 0;
    this.position = position;

    this.$canvas = $('<canvas class="layer" width="'+this.document.windowWidth+'px" height="'+this.document.windowHeight+'"></canvas>');
    this.document.$canvasHolder.append(this.$canvas);
    this.ctx = this.$canvas.get(0).getContext("2d");
    this.setPosition(this.position);
}

Layer.prototype.setPosition = function(position){
    this.$canvas.css('z-index', position);
    this.position = position;
}

Layer.prototype.destroy = function(){

}

Layer.prototype.resize = function(){
    this.$canvas.attr('width', this.document.windowWidth);
    this.$canvas.attr('height', this.document.windowHeight);
}


Layer.prototype.push = function(data){
    this.data.push(data);
    this.paint = true;
}

Layer.prototype.draw = function(redraw){

    if(redraw){
        this.ctx.restore();
        //TODO: Make cache work
        /*if(this.recache) {
            this.cache = this.ctx.getImageData(-(this.document.width*.5 - this.document.x), -(this.document.height*.5 - this.document.y), this.document.width, this.document.height);
            this.recache = false;
        }*/
        this.ctx.clearRect(-(this.document.width *.5), -(this.document.height *.5), this.document.width,this.document.height);
        this.ctx.save();

        //TODO: Make cache work
        /*if(this.cache)
        	this.ctx.putImageData(this.cache, -(this.document.width*.5 - this.document.x), -(this.document.height*.5 - this.document.y), this.document.x, this.document.y, this.document.width, this.document.height);
        */
        this.ctx.translate(
            (this.document.windowWidth / 2) + this.document.x,
            (this.document.windowHeight / 2) + this.document.y
        );

        this.paint = true;
        this.cacheIndex = 0;

    }

    if(this.paint || this.cacheIndex.length < this.data.length) {
        var data;
        for (var i = this.cacheIndex; i < this.data.length; i++) {
            data = this.data[i];
            pk.tools[data.tool].move(
                this.ctx,
                data.prevX ? data.prevX : data.x,
                data.x,
                data.prevY ? data.prevY : data.y,
                data.y,
                data.size,
                data.color
            );
            this.cacheIndex = i;
        }
        this.recache = true;
        this.paint = false;
    }
}