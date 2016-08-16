/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var entity = function(opts,cb) {

    var x,
        y,
        w = 1,
        h = 1,
        sx,
        sy,
        vx,
        vy,
        pX,
        pY,
        d = 0,
        name,
        imgW,
        imgH,
        ticksPerFrame = 0,
        numberOfCols = 1,
        numberOfRows = 1,
        frameIndex = 0,
        tickCount = 0,
        lastShot = 0,
        cooldown = 300,
        image,
        toggleAnimation,
        flip = 1,
        flop,
        isShooting,
        zoom = 1,
        offsetY = 0,
        visible = false,
        that = {
            init: init,
            draw: draw,
            update: update,
            moveX: moveX,
            moveY: moveY,
            shoot: shoot,
            getPos: getPos,
        },
        isBullet = false,
        isPlayer = false;


    var sprites = {
        player: {
            url: 'neopixel',
            w: 34,
            h: 30,
        },
        crate: {
            url: 'crate',
            w: 20,
            h: 20,
        }
    }

    if (opts) {
        init(opts, cb)
    }


    function init(opts, cb) {
        // Create sprite sheet

        name = opts.name;
        isPlayer = name == 'player';
        isBullet = name == 'bullet';
        if (!isBullet) {
            var sprite = sprites[name];
            h = sprite.h;
            w = sprite.w;
            image = new Image();
            // Load sprite sheet
            image.addEventListener("load", function () {
                imgW = this.width;
                imgH = this.height;
                numberOfCols = imgW / w;
                numberOfRows = imgH / h;
                if (cb) cb();
            });
            image.src = "../res/" + sprite.url + ".png";
        }

        x = sx = opts.x;
        y = sy = opts.y;
        vx = opts.vx;
        vy = opts.vy;
        ticksPerFrame = opts.ticksPerFrame;
        //todo zoom
        zoom = overallZoom;

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

        if(isBullet){
            d+=30;
            x = vx * d + pX;
            y = vy * d + pY;
            //todo: check for collision
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
        if(!isBullet)
            context.drawImage(image, indX, indY, w, h, x, y, -w/2 * zoom, -h/2 * zoom);
        context.fillStyle = '#ff0000';
        context.fillRect(x,y,10,10);

        context.restore();
    }

    function shoot(shooting){
        isShooting = shooting;
        var now = Date.now();
        if(!isShooting || (lastShot > now - cooldown)){
            return;
        }
        lastShot = Date.now();
        //var sy = cHeight/ 2, sx = cWidth/ 2, tx = mouseposition.x, ty = mouseposition.y;
        var sy = pY, sx = pX, tx = mouseposition.x +pX, ty = mouseposition.y + pY;

        var angleRadians = Math.atan2(ty - sy, tx - sx);
        //var d = Math.sqrt( (sx-=tx)*sx + (sy-=ty)*sy );
        //console.log(d*Math.cos(angleRadians),d*Math.sin(angleRadians));
        //console.log(angleDeg,angle,angleRadians);
        entities.push(new entity({
            name : 'bullet',
            x : pX,
            y : pY,
            vx : Math.cos(angleRadians),
            vy : Math.sin(angleRadians)
        }))
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