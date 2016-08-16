/**
 * Created by Marcel Michelfelder on 16.08.2016.
 */

var debug = function(){

    var debugWindow = document.getElementById('debug');

    function update(opts){
        opts.mouseposition = {};
        opts.mouseposition.x =  mouseposition.x+opts.playerpos.x;
        opts.mouseposition.y =  mouseposition.y+opts.playerpos.y;
        //opts.mouseposition.x = -(cWidth/2)+ mouseposition.x+opts.playerpos.x;
        //opts.mouseposition.y = -(cHeight/2)+mouseposition.y+opts.playerpos.y;
        //(cWidth/2)+x-pX
        //if(opts.mouseposition.x != mouseposition.x){
        //    opts.mouseposition.x -= opts.playerpos.x;
        //    opts.mouseposition.y -= opts.playerpos.y;
        //}

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