/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var entity = function(opts,cb) {
    idCounter++;

    var x,
        y,
        w = 1,
        h = 1,
        id = idCounter,
        originId,
        sX,
        sY,
        vx,
        vy,
        pX,
        pY,
        alreadyDebuged,
        hp = 0,
        tintedImg = 0,
        damage = 0,
    //todo: figure out anfangswert, ist der abstand zum mittelpunkt des spielers
        d = 30,
        hitCd = 200,
        name,
        gotHit,
        beingDestroyed,
        ticksPerFrame = 0,
        splinterSelf,
        numberOfCols = 1,
        numberOfRows = 1,
        frameIndex = 0,
        tickCount = 0,
        lastShot = 0,
        cooldown = 300,
        sprites,
        hitSprites,
        toggleAnimation,
        flip = 1,
        flop,
        isShooting,
        zoom = 1,
        offsetY = 0,
        visible = false,
        that,
        exports = {
            init: init,
            draw: draw,
            update: update,
            moveX: moveX,
            moveY: moveY,
            shoot: shoot,
            getId: getId,
            getName: getName,
            getBounding: getBounding,
            getPos: getPos,
            dealDamage: dealDamage,
            getRealPos: getRealPos,
            setRef: setRef,
            getHp: getHp,
            getRef: getRef,
            setHp: setHp,
            getImg: getImg,
        },
        isBullet = false,
        isEnemy = false,
        isPlayer = false;



    if (opts) {
        init(opts, cb)
    }


    function init(opts) {
        // Create sprite sheet

        name = opts.name;
        isPlayer = name == 'player';
        isBullet = name == 'bullet';
        isEnemy = name.match(/enemy/);

        if (!isBullet) {
            var obj = proto[name];
            h = obj.h;
            w = obj.w;
            //todo: hp als para übergeben
            hp = obj.hp;
            sprites = obj.sprites;
            hitSprites = obj.hitSprites;
            numberOfCols = sprites[0].length;
            numberOfRows = sprites.length;


            if(!isPlayer)
                splinterSelf = new splinter(sprites[0][0]);

        } else {
            originId = opts.id;
            damage = 10; //TODO: iwo her damage wert nehmen
        }

        x = sX = opts.x;
        y = sY = opts.y;
        //todo: streuung
        vx = opts.vx;
        vy = opts.vy;
        ticksPerFrame = 4;
        //ticksPerFrame = opts.ticksPerFrame;
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
            x = vx * d + sX;
            y = vy * d + sY;
            //todo: do exports for all entities
            var ent;
            for(var i in entities){
                ent = entities[i];
                if(id == ent.getId() || originId == ent.getId() || ent.getHp() <= 0)
                    continue;

                var x2 = ent.getPos().x;
                var y2 = ent.getPos().y;
                var w2 = ent.getBounding().w;
                var h2 = ent.getBounding().h;
                if(hits(x,y,w,h,x2,y2,w2,h2)){
                    bullets.splice(bullets.indexOf(that),1);
                    ent.dealDamage(damage);
                    break;
                    //todo: shoot through?
                }
            }
            //if(d > 1000) {
            //    bullets.splice(bullets.indexOf(that),1);
            //}
            //todo: check for collision
        }


        if(isEnemy){
            shoot(true, {x:pX, y:pY});
        }




        //console.log(dist(pX,pY,x,y));
        if(dist(pX,pY,x,y) > cWidth/1.5) {
            deleteItem();
        }

        return exports;
    }

    function deleteItem(){
        if(isBullet){
            bullets.splice(bullets.indexOf(that),1);
        } else {
            entities.splice(entities.indexOf(that),1);
            items.splice(items.indexOf(that),1);
        }
    }


    function hits(x1, y1, w1, h1,
                       x2, y2, w2, h2){
        if (x1 + w1 > x2)
            if (x1 < x2 + w2)
                if (y1 + h1 > y2)
                    if (y1 < y2 + h2)
                        return true;

        return false;
    }


    function draw() {

        // Draw the animation
        if(isShooting) offsetY = 1; else offsetY = 0;
        if(!toggleAnimation) frameIndex = 0;

        //var posX = isPlayer ? cWidth/2 : x-pX;
        //var posY =  isPlayer ? cHeight/2 : y-pY;
        //var posX = isPlayer ? cWidth/2 : (cWidth/2);
        //var posY =  isPlayer ? cHeight/2 : (cHeight/2);
        var posX = isPlayer ? cWidth/2 : (cWidth/2)+x-pX;
        var posY =  isPlayer ? cHeight/2 : (cHeight/2)+y-pY;
        //if(isEnemy){
        //    console.log(posX,posY);
        //}
        var delta = (gotHit - Date.now()) / hitCd;

        //todo: determine center of screen
        if(isPlayer && !alreadyDebuged){
            alreadyDebuged = true;
            //console.log(name,hitSprites,offsetY,frameIndex);
        }
       drawImage(
           isBullet ? false : sprites[offsetY][frameIndex],
           //todo: only player
            posX,
           posY,
            0,
           isBullet ? false : {
               img : hitSprites[offsetY][frameIndex],
               alpha : delta
           });

        toggleAnimation = 0;
        return exports;
    }

    function drawImage(sprite, x, y, deg, tintedImage) {
        context.save();
        var flipScale;
        var flopScale;

        // Set rotation point to center of image, instead of top/left
//        if(center) {
        //    x += w//*numberOfCols/2;
            //y += h*numberOfRows;
            x += zoom*(w/4);
            //y += h*zoom;

        //}
        // Set the origin to the center of the image
        //todo: zoom
        //context.translate(x + w/2, y + h/2);

        // Rotate the canvas around the origin
        //var rad = 2 * Math.PI - deg * Math.PI / 180;
        //context.rotate(rad);

        // Flip/flop the canvas //TODO: enhance
        if(flop) flopScale = -1; else flopScale = 1;
        context.scale(flip, flopScale);
        x *= flip;
        if(flip == -1) x += w * zoom / 2;
        y *= flopScale;

        //if(isPlayer)
        //console.log(x);

        //TODO: alpha
        //context.globalAlpha = 0.5;


        // Draw the image
        if(!isBullet){
            if(beingDestroyed){
                var splinterImg = splinterSelf.draw();
                var finished = splinterSelf.finished();
                var sW = splinterImg.width;
                var sH = splinterImg.height;
                context.drawImage(splinterImg, 0, 0, sW, sH, x+sW, y+sH, -sW/2 * zoom, -sH/2 * zoom);
                if(finished){
                    //console.log(entities.indexOf(beingDestroyed));
                    //entities.splice(entities.indexOf(beingDestroyed),1);
                    deleteItem()
                }
            } else {
                context.drawImage(sprite, 0, 0, w, h, x, y, -w/2 * zoom, -h/2 * zoom);
                //context.drawImage(image, indX, indY, w, h, x, y, -w/2 * zoom, -h/2 * zoom);

            }

        }

        //DEBUG
        if(isBullet){
            context.fillStyle = '#ff0000';
            context.fillRect(x,y,10,10);
        }


        if(tintedImage.alpha > 0){
            context.globalAlpha = tintedImage.alpha;
            context.drawImage(tintedImage.img, 0, 0, w, h, x, y, -w/2 * zoom, -h/2 * zoom);
        }

        //context.fillRect(x,y,-w*zoom/2,-h*zoom/2);

        context.restore();
    }

    function shoot(shooting, dest){
        isShooting = shooting;
        var now = Date.now();
        if(!isShooting || (lastShot > now - cooldown)){
            return;
        }
        lastShot = Date.now();
        //var sy = cHeight/ 2, sx = cWidth/ 2, tx = mouseposition.x, ty = mouseposition.y;
        if(isPlayer){
            var sy = pY - ((zoom * h/4)*1.3), sx = pX, tx = dest.x +pX, ty = dest.y + pY;
            //var sy = pY, sx = pX, tx = dest.x +pX, ty = dest.y + pY;
        } else {
            var sy = y - ((zoom * h/4)*1.3), sx = x, tx = dest.x, ty = dest.y;
        }

        //if(isPlayer)
            flip = sX < dest.x ? 1 : -1;


        var angleRadians = getAngleBetweenTwoPoints(sx,sy,tx,ty);
        //var angleRadians = Math.atan2(ty - sy, tx - sx);
        //var d = Math.sqrt( (sx-=tx)*sx + (sy-=ty)*sy );
        //console.log(d*Math.cos(angleRadians),d*Math.sin(angleRadians));
        //console.log(angleDeg,angle,angleRadians);
        var bullet = new entity({
            name : 'bullet',
            x : sx,
            //y : sy,
            //x : sx - (zoom * w/2),
            y : sy,
            id : id,
            vx : Math.cos(angleRadians),
            vy : Math.sin(angleRadians)
        });
        bullets.push(bullet);
        bullet.setRef(bullet);
    }



    function moveX(d) {
        toggleAnimation = toggleAnimation || d;
        if((lastShot < Date.now() - cooldown))
            flip = d == 0 ? flip : d > 0 ? 1 : -1;
        x += d;
    }
    function moveY(d) {
        toggleAnimation = toggleAnimation || d;
        y += d;
    }

    function getImg(){
        return image;
    }
    function getRealPos(){
        return {x : x, y : y}
    }
    function getPos(){
        return {x : x-w*zoom/2, y : y-h*zoom/2}
    }
    function getBounding(){
        return {w : w*zoom/2, h : h*zoom/2}
    }
    function getName(){
        return name
    }
    function getId(){
        return id
    }
    function getHp(){
        return hp
    }
    function setHp(newHp){
        hp = newHp
    }
    function dealDamage(d){
        gotHit = Date.now() + hitCd;
        hp -= d;
        if(hp <= 0){
            beingDestroyed = that;
        }
        return hp;
    }
    function setRef(ref){
        that = ref
    }
    function getRef(){
        return that
    }

    return exports
};