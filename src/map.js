/**
 * Created by Marcel Michelfelder on 16.08.2016.
 */

var map = function(){
    var pX, pY, image, tilesize;

    function init(opts, cb){
        // Create sprite sheet
        image = new Image();
        pX = opts.pos.x;
        pY = opts.pos.y;

        // Load sprite sheet
        image.addEventListener("load", function(){
            tilesize = this.width;

            var crate = new entity({
                name : 'crate',
                x: 0,
                y: 0,
                //x: 1000,
                //y: 700,
                ticksPerFrame: 4
                //todo: sprite position
            }, function(){
                entities.push(crate);
                crate.setRef(crate);
                cb();
            });
        });
        image.src = "../res/area.png"; //todo: path
    }

    function update(playerPos){
        pX = playerPos.x, pY = playerPos.y;
        draw();
    }

    function draw() {
        //context.drawImage(image, 0, 0, offset, offset, offset/2 - pX, offset/2 - pY, offset, offset);
        var zoomedTilesize = tilesize * overallZoom;
        for(var x = -zoomedTilesize;x < cWidth+zoomedTilesize; x+=zoomedTilesize){
            for(var y = -zoomedTilesize;y < cHeight+zoomedTilesize; y+=zoomedTilesize){
                context.drawImage(image, 0, 0, tilesize, tilesize, x-pX.mod(zoomedTilesize), y-pY.mod(zoomedTilesize), zoomedTilesize, zoomedTilesize);
            }
        }
        //context.fillStyle = '#000000';
        //context.fillRect(0,0,cWidth,cHeight);
        //context.fillStyle = '#00ff00';
        //context.fillRect(cWidth/2,cHeight/2,10,10);
    }

    //todo: obstacles

    return {
        init : init,
        update : update,
        draw : draw
    }
};