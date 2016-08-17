/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var canvas,
    context,
    stage,
    debugWindow,
    idCounter = 0,
    overallZoom = 10,
    mouseposition = {x:0,y:0},
    entities = [],
    bullets = [],
    cWidth = window.innerWidth,
    cHeight = window.innerHeight,
    //cWidth = 900,
    //cHeight = 600,
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
    //canvas.setAttribute('width', document.body.clientWidth);
    //canvas.setAttribute('height', document.documentElement.clientHeight);
    //canvas.setAttribute('width', window.innerWidth);
    //canvas.setAttribute('height', window.innerHeight);
    canvas.setAttribute('width', cWidth);
    canvas.setAttribute('height', cHeight);
    context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    //context.webkitImageSmoothingEnabled = false;
    //context.mozImageSmoothingEnabled = false;



    document.onkeydown = document.onmousedown = keyDown;
    document.onkeyup = document.onmouseup = keyUp;

    document.onmousemove = function(e){
        mouseposition.x = -(cWidth/2)+ e.x;
        mouseposition.y = -(cHeight/2)+ e.y;
    }

    function setKey(event, down) {
        if(++event.button) {
            event.keyCode = 900 + event.button;
            //console.log(event);
            //mouseposition.x = -(cWidth/2)+ event.x;
            //mouseposition.y = -(cHeight/2)+ event.y;
            //mouseposition.x = event.x;
            //mouseposition.y = event.y;
        }
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
    stage.init(function(){
        stage.run();
    });


}

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};
