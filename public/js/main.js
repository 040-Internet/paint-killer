/**
 * Created by acido on 22/10/14.
 */

function Main(){
    var self = this;

    //canvas
    var c = document.getElementById("canvas");
    this.ctx = c.getContext("2d");

    //app vars
    this.$canvas = $('#canvas').get(0);
    this.$document = $(document).get(0);
    this.tools = {
      'pen' : Pen
    };

    this.users = [];
    this.currentUser = new User(this, 'self');
    this.users['self'] = this.currentUser;

    //socket
    this.socket = io.connect('/');

    //small helper to get the current position for the mouse pointer
    function getPos(e){
        var x = e.pageX - self.$canvas.offsetLeft;
        var y = e.pageY - self.$canvas.offsetTop;
        return {x:x, y:y};
    }


    //bind events

    $('#canvas').mousedown(function(e){
        console.log('Down!');
        self.currentUser.mouseDown(getPos(e), true);
    });
    $('#canvas').mouseup(function(e){
        self.currentUser.mouseUp(getPos(e), true);
    });
    $('#canvas').mousemove(function(e){
        self.currentUser.mouseMove(getPos(e), true);
    });

    //listen to events
    this.socket.on('userConnect', function(user){
        self.checkOrCreateUser(user);
    });

    this.socket.on('userDisconnect', function(user){
        delete self.users[user];
        console.log(user);
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

}

Main.prototype.checkOrCreateUser = function(user){
    if(!this.users.hasOwnProperty(user)){
        this.users[user] = new User(this, user);
    }
}



$(document).ready(function(){
    var app = new Main();
});