/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var entity = function(){

    var x,
        y,
        w,
        h,
        pX,
        pY,
        name,
        imgW,
        imgH,
        ticksPerFrame = 0,
        numberOfCols = 1,
        numberOfRows = 1,
        frameIndex = 0,
        tickCount = 0,
        image,
        toggleAnimation,
        flip = 1,
        flop,
        isShooting,
        zoom = 1,
        offsetY = 0,
        visible = false,
        that = {
            init : init,
            draw : draw,
            update : update,
            moveX : moveX,
            moveY : moveY,
            shoot : shoot,
            getPos : getPos,
        },
        isPlayer = false;



    var sprites = {
        player : {
            url: 'neopixel',
            w:34,
            h:30,
        },
        crate : {
            url: 'crate',
            w:20,
            h:20,
        }
    }



    function init(opts, cb) {
        // Create sprite sheet
        image = new Image();
        name = opts.name;
        isPlayer = name == 'player';
        var sprite = sprites[name];
        h = sprite.h;
        w = sprite.w;
        x = opts.x;
        y = opts.y;
        ticksPerFrame = opts.ticksPerFrame;
        //todo zoom
        zoom = overallZoom;

        // Load sprite sheet
        image.addEventListener("load", function(){
            imgW = this.width;
            imgH = this.height;
            numberOfCols = imgW/w;
            numberOfRows = imgH/h;
            cb();
        });
        image.src = "../res/" + sprite.url + ".png";
    }


    function update(pPos){
        pX = pPos.x;
        pY = pPos.y;
        if(toggleAnimation)
            tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range
            if (frameIndex < numberOfCols - 1) {
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
        return that;
    }


    function draw() {

        // Draw the animation
        var indexW = frameIndex * w;
        if(isShooting) offsetY = 1; else offsetY = 0;
        var indexH = offsetY * h;
        if(!toggleAnimation) indexW = 0;

        //var posX = isPlayer ? cWidth/2 : x-pX;
        //var posY =  isPlayer ? cHeight/2 : y-pY;
        var posX = isPlayer ? cWidth/2 : (cWidth/2)+x-pX;
        var posY =  isPlayer ? cHeight/2 : (cHeight/2)+y-pY;
        if(!isPlayer){
            //console.log(x,y);
        }


        //todo: determine center of screen
       drawImage(
           indexW,
            indexH,
           //todo: only player
            posX,
           posY,
            0,
            false);

        toggleAnimation = 0;
        return that;
    }

    function drawImage(indX, indY, x, y, deg, center) {

        context.save();
        var flipScale;
        var flopScale;

        // Set rotation point to center of image, instead of top/left
//        if(center) {
        //todo: zoom
            x += w*numberOfCols/2;
            //y += h*numberOfRows;
            //x += w*numberOfCols;
            //y += h*zoom;

        //}

        // Set the origin to the center of the image
        //todo: zoom
        //context.translate(x + w/2, y + h/2);

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
        context.fillStyle = '#ff0000';
        context.fillRect(x,y,10,10);

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

    return that
};