/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

//shinecolor: ffb400

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
        ai,
        isHovering,
        hoverDelta = 0,
        speed,
        alreadyDebuged,
        hp = 0,
        tintedImg = 0,
        damage = 0,
    //todo: figure out anfangswert, ist der abstand zum mittelpunkt des spielers
        d,
        lastPositions = [],
        lastShiftPositions = [],
        hitCd = 200,
        name,
        gotHit,
        shootThrough,
        beingDestroyed,
        ticksPerFrame = 0,
        splinterSelf,
        shift = 0,
        numberOfCols = 1,
        numberOfRows = 1,
        frameIndex = 0,
        tickCount = 0,
        weaponIndex = 0,
        weapon,
        weapons = [],
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
            switchWeapon: switchWeapon,
            moveX: moveX,
            moveY: moveY,
            shoot: shoot,
            getId: getId,
            getName: getName,
            getBounding: getBounding,
            getPos: getPos,
            getDim: getDim,
            dealDamage: dealDamage,
            getRealPos: getRealPos,
            setRef: setRef,
            getWeapon: getWeapon,
            getHp: getHp,
            getRef: getRef,
            setHp: setHp,
            getImg: getImg,
            isEnemyFnct : isEnemyFnct,
            isPlayerFnct : isPlayerFnct,
            isItemFnct : isItemFnct
        },
        isBullet = false,
        isEnemy = false,
        isBot = false,
        isItem = false,
        isCollectable = false,
        isPlayer = false;



    if (opts) {
        init(opts, cb)
    }


    function init(opts) {
        // Create sprite sheet

        name = opts.name;
        isPlayer = name == 'player';
        isBullet = name == 'bullet';
        isEnemy = !!(name.match(/enemy/) || name.match(/drone/));
        isCollectable = opts.isCollectable;
        isHovering = name.match(/drone/) || isCollectable;
        isItem = name.match(/crate/);

        isBot = opts.bot;


        if (!isBullet) {
            var obj = proto[name];
            h = obj.h;
            w = obj.w;
            hp = opts.hp || obj.hp;
            sprites = obj.sprites;
            hitSprites = obj.hitSprites;
            numberOfCols = sprites[0].length;
            numberOfRows = sprites.length;


            if(!isPlayer)
                splinterSelf = new splinter(sprites[0][0]);

        } else {
            originId = opts.id;
            speed = opts.speed;
            damage = opts.damage;
            shootThrough = opts.shootThrough;
            shift = opts.shift;
            d = opts.start;
        }



        weapons.push(new Weapon(weaponsProto['pistol'], id));

        if(isPlayer){
            //todo: slots, damit die weaponreihenfolge fest ist
            weapons.push(new Weapon(weaponsProto['rifle'], id));
            weapons.push(new Weapon(weaponsProto['machinegun'], id));
            weapons.push(new Weapon(weaponsProto['shotgun'], id));
            //weapons.push(new Weapon(weaponsProto['pistol'], id));
        }

        if(isBot || isPlayer)
            weapon = weapons[0];


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

    function switchWeapon(r){
        weaponIndex += r;
        if(weaponIndex < 0)
            weaponIndex = weapons.length + weaponIndex;
        weaponIndex = weaponIndex.mod(weapons.length);
        weapon = weapons[weaponIndex];
    }


    function update(pPos){
        pX = pPos.x;
        pY = pPos.y;

        lastPositions.unshift({x:x,y:y});
        lastPositions.splice(10,1);


        if(ai) ai.update(pPos);

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
            d+=speed;
            var dTemp = d;
            for(var i=0; i<shift; i++){
                lastShiftPositions.unshift({x:vx * dTemp + sX,y:vy * dTemp + sY});
                lastShiftPositions.splice(shift,1);
                dTemp--;
            }

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
                //TODO: nochmal überarbeiten von welchem schießer der schuss kommt und wen er trifft
                if(hits(x,y,w,h,x2,y2,w2,h2) && (ent.isItemFnct() ||ent.isPlayerFnct() || (ent.isEnemyFnct() && originId == player.getId()))){
                    //TODO: nach hit ggf vektoren abändern - das ist auch ne gute idee für nen glitch
                    if(!shootThrough)
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




        //todo: in Ai einbauen
        //if(isEnemy){
        //    shoot(true, {x:pX, y:pY});
        //}




        if(dist(pX,pY,x,y) > cWidth) {
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


    function draw() {

        // Draw the animation
        if(isShooting && !isHovering) offsetY = 1; else offsetY = 0;
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
        if(isBot && !alreadyDebuged){
            //alreadyDebuged = true;
            //console.log(name,toggleAnimation,offsetY,frameIndex);
        }
       drawImage(
           isBullet ? false : sprites[offsetY][frameIndex],
           //todo: only player
            posX,
           posY,
            0,
           isBullet || isCollectable ? false : {
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

        if(isHovering)
            y += Math.sin(hoverDelta++ /7)*5;
            //y += Math.sin(Date.now() /100)*5;

        // Set rotation point to center of image, instead of top/left
//        if(center) {
            x += zoom*(w/4);

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

        if(isBullet){
            context.fillStyle = '#ffffff';
            var size = zoom / 2;
            context.fillRect(x,y,size,size);
            if(shift){
                var shiftX, shiftY
                for(var i = 0; i < shift; i++){
                    if(lastShiftPositions[i]){
                        context.globalAlpha = i/shift;
                        shiftX = (cWidth/2)+lastShiftPositions[i].x-pX;
                        shiftY = (cHeight/2)+lastShiftPositions[i].y-pY;
                        context.fillRect(shiftX,shiftY,size,size);
                    }
                }
            }
            context.globalAlpha = 1;
        }


        if(tintedImage.alpha > 0){
            context.globalAlpha = tintedImage.alpha;
            context.drawImage(tintedImage.img, 0, 0, w, h, x, y, -w/2 * zoom, -h/2 * zoom);
        }

        //context.fillRect(x,y,-w*zoom/2,-h*zoom/2);

        context.restore();
        //context.fillRect(x,y,-w*zoom/2,-h*zoom/2);
    }


    //TODO: machen dass er die waffe nicht zückt wenn der cd noch nicht fertig ist
    function shoot(shooting, dest){
        isShooting = shooting;
        var cd = weapon.checkCooldown();
        if(!shooting || cd){
            //isShooting = !cd && shooting;
            return;
        }

        //var sy = cHeight/ 2, sx = cWidth/ 2, tx = mouseposition.x, ty = mouseposition.y;
        if(isPlayer){
            var sy = pY - ((zoom * h/4)*1.3), sx = pX, tx = dest.x +pX, ty = dest.y + pY;
            //var sy = pY, sx = pX, tx = dest.x +pX, ty = dest.y + pY;
        } else {
            var sy = y - ((zoom * h/4)*1.3), sx = x, tx = dest.x, ty = dest.y- ((zoom * h/4)*1.3);
        }

        //if(isPlayer)
            flip = sX < dest.x ? 1 : -1;

        weapon.fire(sx,sy,tx,ty);

    }



    function moveX(d) {
        toggleAnimation = toggleAnimation || d;
        if(!weapon.checkCooldown())
            flip = d == 0 ? flip : d > 0 ? 1 : -1;
        x += d;
    }
    function moveY(d) {
        toggleAnimation = toggleAnimation || d;
        y += d;
    }

    function getDim(){
        return {w:w,h:h};
    }
    function getImg(){
        return image;
    }
    function getRealPos(){
        return {x : x, y : y}
    }
    function getPos(){
        return {x : x-w*zoom/4, y : y-h*zoom/2}
        //return {x : x-w*zoom/2, y : y-h*zoom/2}
        //return {x : x-w*zoom/2+zoom*(w/4), y : y-h*zoom/2}
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
    function getWeapon(){
        return weapon
    }
    function dealDamage(d){
        gotHit = Date.now() + hitCd;
        hp -= d;
        if(hp <= 0){
            beingDestroyed = that;
            if(isItem){
                var name = proto.items.subitems[Math.round(getRandomArbitrary(0,proto.items.subitems.length-1))];
                createEntity({
                    name : name,
                    isCollectable : true,
                    x:x,
                    y:y
                },[entities,collectables])
            }
        }
        return hp;
    }
    function setRef(ref){
        if(isBot)
            ai = new Ai(ref);
        that = ref
    }
    function getRef(){
        return that
    }
    function isEnemyFnct(){
        return isEnemy
    }
    function isPlayerFnct(){
        return isPlayer
    }
    function isItemFnct(){
        return isItem
    }

    return exports
};