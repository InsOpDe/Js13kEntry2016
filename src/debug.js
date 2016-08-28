/**
 * Created by Marcel Michelfelder on 16.08.2016.
 */

var debug = function(){

    var debugWindow = document.getElementById('debug');

    function update(opts){
        opts.mouseposition = {};
        opts.screenmouseposition = {};
        opts.mouseposition.x =  mouseposition.x+opts.playerpos.x;
        opts.mouseposition.y =  mouseposition.y+opts.playerpos.y;
        opts.screenmouseposition.x =  screenmouseposition.x
        opts.screenmouseposition.y =  screenmouseposition.y

        opts.hp = player.$.hp;

        var html = "";
        for(var i in opts){
            html += i + ": " + JSON.stringify(opts[i]) + "<br>";
        }
        debugWindow.innerHTML = html;
    }

    return {
        update : update
    }
};