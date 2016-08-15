/**
 * Created by Marcel Michelfelder on 16.08.2016.
 */

var debug = function(){

    var debugWindow = document.getElementById('debug');

    function update(opts){
        console.log(opts);
        debugWindow.innerHTML = JSON.stringify(opts);
    }

    return {
        update : update
    }
};