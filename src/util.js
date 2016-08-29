/**
 * Created by Marcel Michelfelder on 17.08.2016.
 */
function tint(img,rgba){

    var bc = getBufferAndContext(img);
    var buffer = bc[0], bx = bc[1];

    var imageData = bx.getImageData(0,0,buffer.width, buffer.height);
    var pixels = imageData.data;
    var numPixels = pixels.length;
    for (var i = 0; i < numPixels; i++) {
        var average = (pixels[i*4] + pixels[i*4+1] + pixels[i*4+2]) /3;
        // set red green and blue pixels to the average value
        pixels[i*4] = average + rgba.r;
        pixels[i*4+1] = average+rgba.g;
        pixels[i*4+2] = average+rgba.b;
    }
    bx.putImageData(imageData, 0, 0);

    return buffer;
}

function getBufferAndContext(i,w,h){
    var b = document.createElement('canvas');
    //console.log(buffer, img);
    b.width = w||i.width;
    b.height = h||i.height;
    var c = b.getContext('2d');
    if(i) c.drawImage(i,0,0);
    return [b,c]
}


function changeColorOfSprite(img,originRGBA,destRGBA){
    var bc = getBufferAndContext(img);
    var buffer = bc[0], bx = bc[1];

    var imageData = bx.getImageData(0,0,buffer.width, buffer.height);
    var pixels = imageData.data;
    var numPixels = pixels.length;
    for (var i = 0; i < numPixels; i++) {
        if(originRGBA.r === pixels[i*4] && originRGBA.g === pixels[i*4+1] && originRGBA.b === pixels[i*4+2] && originRGBA.a === pixels[i*4+3]){
            pixels[i*4] = destRGBA.r;
            pixels[i*4+1] = destRGBA.g;
            pixels[i*4+2] = destRGBA.b;
            pixels[i*4+3] = destRGBA.a;
        }
    }
    bx.putImageData(imageData, 0, 0);

    return buffer;
}

function getRandomTriangle(w,h){
    var points = [];
    for(var i = 0; i < 3; i++){
        points.push({
            x:getRandomArbitrary(-w/2,w/2) + w/2,
            y:getRandomArbitrary(-h/2,h/2) + h/2
        })
    }
    return points
}

function drawTriangle(w,h,x){
    x = x || 1;
    var bc = getBufferAndContext(null,w,h);
    var buffer = bc[0], bx = bc[1];
    for(var i=0; i<x;i++){
        var points = getRandomTriangle(w,h);
        bx.moveTo(points[0].x,points[0].y);
        for(var i=1;i<points.length;i++){
            var p=points[i];
            bx.lineTo(p.x,p.y);
        }
        bx.fill();
    }
    return buffer;
}

function drawXTriangles(w,h,x){
    var sprites = [];
    for(var i= 0; i<x;i++){
        sprites.push(drawTriangle(w,h));
    }
    return sprites;
}

function splinterSingle(img){
    var bc = getBufferAndContext(img);
    var buffer = bc[0], bx = bc[1];
    var w = buffer.width = img.width;
    var h = buffer.height = img.height;
    //bx.drawImage(img,0,0);
    bx.beginPath();
    var points = getRandomTriangle(w,h);

    bx.moveTo(points[0].x,points[0].y);
    for(var i=1;i<points.length;i++){
        var p=points[i];
        bx.lineTo(p.x,p.y);
    }
    bx.closePath();
    bx.clip();
    bx.drawImage(img,0,0);

    var angleRadians = Math.atan2(getRandomArbitrary(-1,1), getRandomArbitrary(-1,1));
    var vx = Cos(angleRadians);
    var vy = Sin(angleRadians);
    //console.log(buffer.toDataURL());

    //bx.putImageData(imageData, 0, 0);

    return {
        vx : vx,
        vy : vy,
        buffer : buffer,
    };
}

function splitSpritesheet(image, spriteW, spriteH){
    var sprites = [];
    var width = image.width;
    var height = image.height;
    var spritesW = width/spriteW;
    var spritesH = height/spriteH;
    var buffer;
    var bx;
    for(var j = 0; j < spritesH; j++){
        sprites[j] = [];
        for(var i = 0; i < spritesW; i++){
            buffer = document.createElement('canvas');
            buffer.width = spriteW;
            buffer.height = spriteH;
            bx = buffer.getContext('2d');

            //console.log(i*spriteW,j*spriteH,spriteW,spriteH);
            //bx.drawImage(image,i*spriteW,j*spriteH,spriteW,spriteH);
            bx.drawImage(image,i*spriteW,j*spriteH,spriteW,spriteH,0,0,spriteW,spriteH);
            //console.log(buffer.toDataURL());
            sprites[j][i] = buffer;
        }
    }
    return sprites;
}

function getAngleBetweenTwoPoints(sx,sy,tx,ty){
    return Math.atan2(ty - sy, tx - sx);
}


function createEntity(opts,array){
    var ent = new entity(opts);
    for(var i in array){
        array[i].push(ent);
    }
    ent.setRef(ent);
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


function iterateSprites(sprites, fnc){
    var newSprites = [];
    for(var y in sprites){
        newSprites[y] = [];
        for(var x in sprites[y]){
            newSprites[y][x] = fnc(sprites[y][x])
        }
    }
    return newSprites;
}


function splinter(img){
    var buffer = document.createElement('canvas');
    //console.log(buffer, img);
    var w = buffer.width = img.width*4;
    var h = buffer.height = img.height*4;
    var bx = buffer.getContext('2d');
    var finished;

    var splinters = [];
    for(var i = 0; i < 5; i++){
        splinters.push(splinterSingle(img));
    }
    //bx.drawImage(img,0,0);
    var d = 0;

    function draw(){
        bx.clearRect(0, 0, buffer.width, buffer.height);
        d+=3;
        for(var i in splinters){
            //context.drawImage(splinters[i],d*vx+200,d*vy+200);
            bx.globalAlpha = finished = 1 - (d/50);
            bx.drawImage(splinters[i].buffer,d*splinters[i].vx+w/2,d*splinters[i].vy+h/2);
        }
        //bx.fillRect(0,0,w,h);
        //console.log(splinters.length);
        //console.log(buffer.toDataURL());
        //console.log(finished);
        return buffer;
    }

    //setInterval(function(){
    //    draw();
    //}, 500)


    function isFinished(){
        return finished < 0;
    }

    //bx.putImageData(imageData, 0, 0);

    return {
        draw: draw,
        finished : isFinished
    };
}

function getRandomArbitrary(min, max) {
    return R() * (max - min) + min;
}

function createGlitchSprites(w,h){
    var sprites = [];
    for(var j=0; j <10; j++){
        sprites.push(createGlitchSprite(w,h));
    }
    return sprites;
}

function createGlitchSprite(w,h,clr){
    var buffer = document.createElement('canvas');
    //console.log(buffer, img);
    var fontheight = 6;
    var size = 2;
    buffer.width = w;
    buffer.height = h;
    var rows = C(buffer.height/fontheight);
    var bx = buffer.getContext('2d');
    for(var i=0; i <rows; i++){
        bx.drawImage(new pixelfont().draw(getBinaryString(rows*3),size,clr),0,i*size*fontheight);
    }
    return buffer;
}

//function drawImage(sprite,x,y,w,h,x2,y2,w2,h2){
function drawImage(sprite,w,h,w2,h2){
    var buffer = document.createElement('canvas');
    buffer.width = w2;
    buffer.height = h2;
    var bx = buffer.getContext('2d');
    bx.imageSmoothingEnabled = false;
    bx.drawImage(sprite, 0, 0, w, h, 0, 0, w2, h2);
    //bx.drawImage(sprite, 0, 0, w, h, 0, 0, w2, h2);
    //return clipObjectGlitch(buffer);
    return buffer;

}

function powerUpMultiplier(isPlayer,v){
    return v * isPlayer?speedMultiplier:1
}

function isGlitching(sw){
    sw = sw || 1
    //return glitchSin > player.getHp()/1000;
    return R()>(player.$.hp/1000)
        && R()>(player.$.hp/1000)
        && R()>(player.$.hp/1000)
        && R()>(player.$.hp/1000)
        && R()>(player.$.hp/1000)
        && sw>(player.$.hp/1000)
}

function drawZoomed(img,zoom){
    var buffer = document.createElement('canvas');
    buffer.width = img.width*zoom;
    buffer.height = img.height*zoom;;
    var bx = buffer.getContext('2d');
    bx.imageSmoothingEnabled = false;
    bx.drawImage(img, 0, 0, img.width, img.height, 0, 0, buffer.width, buffer.height);
    //bx.drawImage(sprite, 0, 0, w, h, 0, 0, w*overallZoom, h*overallZoom);
    return buffer;
}

var glitchsprite = (function(){
    var sprites ={}
    sprites['red'] = createXGlitchSprites(10,200,200,'red')
    sprites['lightgreen'] = createXGlitchSprites(10,200,200,'lightgreen')
    return sprites
})();

function createXGlitchSprites(x,w,h,clr){
    var sprites = [];
    for(var i = 0; i < x; i++){
        sprites.push(createGlitchSprite(w,h,clr));
    }
    return sprites;
}

// http://gamedev.stackexchange.com/questions/105823/js-canvas-creating-2d-game-lighting-effect-like-terraria
function darken(x, y, w, h, darkenColor, amount) {
    context.fillStyle = darkenColor;
    context.globalAlpha = amount;
    context.fillRect(x, y, w, h);
    context.globalAlpha = 1;
}

// http://gamedev.stackexchange.com/questions/105823/js-canvas-creating-2d-game-lighting-effect-like-terraria
function ligthenGradient(x, y, radius) {
    contextLight.save();
    //contextLight.globalCompositeOperation = 'screen';
    var rnd = 0.05 * Sin(1.1 * Dn() / 1000);
    radius = radius * (1 + rnd);
    var radialGradient = contextLight.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#BBB');
    radialGradient.addColorStop(0.2 + rnd, '#AAA');
    radialGradient.addColorStop(0.7 + rnd, '#333');
    radialGradient.addColorStop(0.90, '#111');
    radialGradient.addColorStop(1, '#000');
    //radialGradient.addColorStop(0.0, '#BB9');
    //radialGradient.addColorStop(0.2 + rnd, '#AA8');
    //radialGradient.addColorStop(0.7 + rnd, '#330');
    //radialGradient.addColorStop(0.90, '#110');
    //radialGradient.addColorStop(1, '#000');
    contextLight.fillStyle = radialGradient;
    contextLight.beginPath();
    contextLight.arc(x, y, radius, 0, 2 * P);
    contextLight.fill();
    contextLight.restore();
}


function clipObjectGlitch(img,clr){
    clr = clr || 'lightgreen';
    var bc = getBufferAndContext(img);
    var buffer = bc[0], bx = bc[1];
    var glitchSprite = getRandomElementInArray(glitchsprite[clr]);
    //var glitchSprite = createGlitchSprite(w,h);
    bx.drawImage(img,0,0);
    bx.globalCompositeOperation = "source-in";
    bx.drawImage(glitchSprite,0,0);
    return buffer;
}

function getRandomElementInArray(items){
    return items[F(R()*items.length)];
}

function getBinaryString(len){
    var str = "";
    while(len--){
        str += R()>.5?1:0;
    }
    return str;
}

function RGBA(r,g,b,a){
    //console.log(a,isNaN(a),isNaN(a)?1:a);
    return {
        r:r,
        g:g,
        b:b,
        //a:255
        a:255*(isNaN(a)?1:a)
    }
};

function objClone(obj){
    return JSON.parse(JSON.stringify(obj));
}

function dist (sx,sy,tx,ty){
    return Math.sqrt( (sx-=tx)*sx + (sy-=ty)*sy );
}