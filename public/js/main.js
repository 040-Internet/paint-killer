/**
 * Created by acido on 22/10/14.
 */

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Main(){
    var self = this;

    //canvas
    /*var c = document.getElementById("canvas");
    this.ctx = c.getContext("2d");

    //elements
    this.canvas = $('#canvas').get(0);
    this.$canvas = $('#canvas');
    this.$canvasRender = $('#canvas-render');*/
    this.$document = $(document);
    this.$window = $(window);
    this.colorPicker = document.querySelector('color-picker');

    //app vars
    this.document = new Document(this.$document.width(), this.$document.height());
    this.tools = {
        'pen' : Pen,
        'move' : Move
    };

    this.users = [];
    this.currentUser = new User(this, 'self');
    this.users['self'] = this.currentUser;

    //socket
    this.socket = io.connect('/');

    //small helper to get the current position for the mouse pointer
    function getPos(e){
        var x = e.pageX - self.document.$canvasHolder.get(0).offsetLeft;
        var y = e.pageY - self.document.$canvasHolder.get(0).offsetTop;

        return {x:x, y:y};
    }


    //bind events

    $(document).on('click touch','.tool',function(e){
        self.currentUser.setTool($(this).data('tool'));
        e.preventDefault();
        e.stopPropagation();
    });

    $(window).resize(function(){
       self.resize();
    });

    $('#canvas-holder > .overlay').mousedown(function(e){
        self.currentUser.mouseDown(getPos(e), true);
    });
    $('#canvas-holder > .overlay').mouseup(function(e){
        self.currentUser.mouseUp(getPos(e), true);
    });
    $('#canvas-holder > .overlay').mousemove(function(e){
        self.currentUser.mouseMove(getPos(e), true);
    });

    //listen to events
    this.socket.on('init', function(data){
        self.reDraw(data);
    });


    this.socket.on('userConnect', function(user){
        self.checkOrCreateUser(user);
    });

    this.socket.on('userDisconnect', function(user){
        delete self.users[user];
    });

    this.socket.on('mouseDown', function(data){
        self.checkOrCreateUser(data.user);
        self.users[data.user].mouseDown(data.event, false);
    });

    this.socket.on('mouseUp', function(data){
        self.checkOrCreateUser(data.user);
        self.users[data.user].mouseUp(data.event, false);

    });

    this.socket.on('mouseMove', function(data){
        self.checkOrCreateUser(data.user);
        self.users[data.user].mouseMove(data.event, false);
    });

    //color picker event
    this.colorPicker.addEventListener('colorselected', function(e) {
        self.currentUser.setColor(e.detail.hex);
        $('.color-picker').css('background-color', e.detail.hex);
    });

}

Main.prototype.run = function(){
    this.resize();
    this.draw();
}

Main.prototype.checkOrCreateUser = function(user){
    if(!this.users.hasOwnProperty(user)){
        this.users[user] = new User(this, user);
    }
}


Main.prototype.reDraw = function(data){
    var self = this;
    for(var i = 0; i < data.length; i++) {
        this.addDataWithDelay(i*1, data[i]);
    }
}

Main.prototype.addDataWithDelay = function(delay, data){
    var self = this;
    setTimeout(function(){
        self.document.pushToLayer(data.layer, data);
    },delay);
}

Main.prototype.resize = function(){
    var width = this.$document.width();
    var height = this.$document.height();

    this.document.resize(width, height);
}

Main.prototype.draw = function(){
    var self = this;

    this.document.draw();

    requestAnimFrame(function(){
        self.draw();
    })
}


$(document).ready(function(){
    var app = new Main();
    window.pk = app; //global namespace
    app.run();
});