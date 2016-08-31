/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var canvas,canvasLight, stage,
    context,contextLight,
    player,
    debugWindow,
    idCounter,
    score,
    pTicksPerFrame,
    speedMultiplier = 1,
    overallZoom = 8,
    mouseposition = {x:0,y:0},
    screenmouseposition = {x:0,y:0},
    P = Math.PI,
    R = Math.random,
    Ro = Math.round,
    Ma = Math.max,
    Mi = Math.min,
    F = Math.floor,
    C = Math.ceil,
    Sin = Math.sin,
    Cos = Math.cos,
    Dn = Date.now,
    entities,
    points = [],
    bullets,
    enemies,
    glitchSin,
    timeUntilNextWave,
    isHacking,
    isHackingMax = 150,
    waves,
    items,
    weaponOrder = ['pistol', 'pistols', 'machinegun', 'shotgun', 'rifle'],
    collectables,
    images = {},
    //cWidth = window.innerWidth,
    //cHeight = window.innerHeight,
    cWidth = 1200,
    cHeight = 800,
    SECOND = 1000,
    keysDown = [];
window.onload = function() {
    init();
};

function init() {

    canvas = document.getElementById('canvas');
    canvasLight = document.createElement('canvas');
    canvasLight.setAttribute('width', cWidth);
    canvasLight.setAttribute('height', cHeight);
    canvas.setAttribute('width', cWidth);
    canvas.setAttribute('height', cHeight);
    context = canvas.getContext('2d');
    contextLight = canvasLight.getContext('2d');
    context.imageSmoothingEnabled = false;



    document.onkeydown = document.onmousedown = keyDown;
    document.onkeyup = document.onmouseup = keyUp;

    canvas.onmousemove = function(e){
        //console.log(e);
        mouseposition.x = -(cWidth/2)+ (e.offsetX || e.layerX);
        mouseposition.y = -(cHeight/2)+ (e.offsetY || e.layerY);
        screenmouseposition.x = (e.offsetX || e.layerX);
        screenmouseposition.y = (e.offsetY || e.layerY);
        //mouseposition.x = -(cWidth/2)+ e.clientX;
        //mouseposition.y = -(cHeight/2)+ e.clientY;
        //screenmouseposition.x = e.clientX;
        //screenmouseposition.y = e.clientY;
    };

    function setKey(event, down) {
        if(++event.button) {
            event.keyCode = 900 + event.button;
            //console.log(event);
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
