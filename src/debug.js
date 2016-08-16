/**
 * Created by Marcel Michelfelder on 16.08.2016.
 */

var debug = function(){

    var debugWindow = document.getElementById('debug');

    function update(opts){
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