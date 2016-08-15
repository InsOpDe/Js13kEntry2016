/**
 * Created by Marcel Michelfelder on 16.08.2016.
 */

var map = function(){
    var pX, pY, image, offset= 1000; //todo: determine screensize

    function init(opts, cb){
        // Create sprite sheet
        image = new Image();
        pX = opts.pos.x;
        pY = opts.pos.y;

        // Load sprite sheet
        image.addEventListener("load", cb);
        image.src = "../res/area.png"; //todo: path
    }

    function update(playerPos){
        pX = playerPos.x, pY = playerPos.y;
        draw();
    }

    function draw() {
        context.drawImage(image, 0, 0, offset, offset, offset/2 - pX, offset/2 - pY, offset, offset);
    }

    //todo: obstacles

    return {
        init : init,
        update : update,
        draw : draw
    }
};