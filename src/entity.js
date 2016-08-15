/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var entity = function(){

    var x,
        y,
        w,
        h,
        ticksPerFrame = 0,
        numberOfFrames = 1,
        frameIndex = 0,
        tickCount = 0,
        image,
        toggleAnimation,
        flip = 1,
        flop,
        isShooting,
        zoom = 20,
        offsetY = 0,
        visible = false,
        isPlayer = false;



    function init(opts, cb) {
        isPlayer = !!opts.isPlayer;
        // Create sprite sheet
        image = new Image();
        h = opts.height;
        w = opts.width;
        x = opts.x;
        y = opts.y;
        numberOfFrames = opts.numberOfFrames;
        ticksPerFrame = opts.ticksPerFrame;

        // Load sprite sheet
        image.addEventListener("load", cb);
        image.src = "../res/neopixel.png"; //todo: path
    }


    function update(){
        if(toggleAnimation)
            tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    }


    function draw() {
        update();


        // Draw the animation
        var indexW = frameIndex * w;
        if(isShooting) offsetY = 1; else offsetY = 0;
        var indexH = offsetY * h;
        if(!toggleAnimation) indexW = 0;


        //todo: determine center of screen
       drawImage(
           indexW,
            indexH,
            500,
            250,
            //x,
            //y,
            0,
            false);

        toggleAnimation = 0;
    }

    function drawImage(indX, indY, x, y, deg, center) {

        context.save();
        var flipScale;
        var flopScale;

        // Set rotation point to center of image, instead of top/left
//        if(center) {
        //todo: zoom
        //    x -= w/2;
        //    y -= h/2;
        //}

        // Set the origin to the center of the image
        //todo: zoom
        context.translate(x + w/2, y + h/2);

        // Rotate the canvas around the origin
        var rad = 2 * Math.PI - deg * Math.PI / 180;
        context.rotate(rad);

        // Flip/flop the canvas //TODO: enhance
        if(flop) flopScale = -1; else flopScale = 1;
        context.scale(flip, flopScale);
        x *= flip;
        if(flip == -1) x += w * zoom / 2;
        y *= flopScale;

        // Draw the image
        context.drawImage(image, indX, indY, w, h, x, y, -w/2 * zoom, -h/2 * zoom);

        context.restore();
    }

    function shoot(shooting){
        isShooting = shooting;
    }



    function moveX(d) {
        toggleAnimation = toggleAnimation || d;
        flip = d == 0 ? flip : d > 0 ? 1 : -1;
        x += d;
    }
    function moveY(d) {
        toggleAnimation = toggleAnimation || d;
        y += d;
    }

    function getPos(){
        return {x : x, y : y}
    }

    return {
        init : init,
        draw : draw,
        moveX : moveX,
        moveY : moveY,
        shoot : shoot,
        getPos : getPos,
    }
};