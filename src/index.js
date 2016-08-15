/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var canvas,
    context,
    stage,
    keysDown = [];

window.onload = function() {

    init();
};


/**
 * @author Marcel Michelfelder
 *
 * initializes all dom manipulations and events
 *
 */
function init() {

    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', document.body.clientWidth);
    canvas.setAttribute('height', document.documentElement.clientHeight);
    //canvas.setAttribute('width', window.innerWidth);
    //canvas.setAttribute('height', window.innerHeight);
    context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    //context.webkitImageSmoothingEnabled = false;
    //context.mozImageSmoothingEnabled = false;



    document.onkeydown = document.onmousedown = keyDown;
    document.onkeyup = document.onmouseup = keyUp;

    function setKey(event, down) {
        if(++event.button) event.keyCode = 900 + event.button;
        //console.log(event.keyCode);
        keysDown[event.keyCode] = down;
        event.preventDefault()
    }
    function keyUp(event) {
        setKey(event, false)
    }
    function keyDown(event) {
        setKey(event, true)
    }


    stage = new game();
    stage.init();
    stage.run();

}


