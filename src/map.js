/**
 * Created by Marcel Michelfelder on 16.08.2016.
 */

var map = function(){
    var pX, pY, lastX, lastY, tilesize, wave = 1000;
    var enemies = ['enemy1','glitch','enemy3','enemy2'];
    //var enemies = ['drone','enemy1','enemy3','drone1','enemy2','drone2'];
    //var enemies = ['enemy1'];
    waves=(function(){
        var waves =[];
        for(var i = 1; i < 1000; i++){
            waves.push({
                enemies: createEnemies(i),
                lasting : SECOND * 7
            });
        }
        return waves;
    })();

    function createEnemies(c){
        var en = [];
        for(var i in enemies){
            if(c%(Number(i)+1)==0){
                en.push({name:enemies[i], count:F(Ma(1,c/10))})
            }
        }
        return en;
    }


    function init(cb){
        var loaderObj = new loader();
        loaderObj.init(function(){
            cb();
            initItems();
            //createGlitch();
            tilesize = proto['area'].w-1;

        })
    }

    function createGlitch(){
        var x = getRandomArbitrary(-1,1)*cWidth/3 + pX;
        var y = getRandomArbitrary(-1,1)*cHeight/3 + pY;
        createEntity({
            //name : 'drone',
            name : 'glitch',
            x: x,
            y: y,
        },[entities, collectables])
    }

    function nextWave(){
        if(waves[wave]){
            var waveInfo = waves[wave].enemies;
            timeUntilNextWave = Dn() + waves[wave].lasting;
            for(var j in waveInfo){
                if(waveInfo[j].name == 'glitch'){
                    createGlitch();
                } else {
                    for(var i = 0; i < waveInfo[j].count; i++){
                        var x = getRandomArbitrary(-1,1)*cWidth/2 + pX;
                        var y = getRandomArbitrary(-1,1)*cHeight/2 + pY;
                        createEntity({
                            //name : 'drone',
                            name : waveInfo[j].name,
                            x: x,
                            y: y,
                            bot: true,
                        },[entities,enemies])
                    }
                }

            }
            //if(wave%3==0)
            //    createGlitch();
            //console.log(wave);
        } else {
            //console.log("game completed");
        }
        wave++;


    }

    function initItems(){
        var availItems = ['crate', 'crate2'];

        for(var i = getRandomArbitrary(4,7); i > 0; i--){
            var whichItem = Ma((Ro(R()*availItems.length)-1),0);
            var x = getRandomArbitrary(-1,1)*cWidth/2 + pX;
            var y = getRandomArbitrary(-1,1)*cHeight/2 + pY;
            createEntity({
                name : availItems[whichItem],
                x: x,
                y: y
            },[entities, items])
        }
    }

    function update(playerPos){
        pX = playerPos.x, pY = playerPos.y;
        addRandomItem();
        lastX = pX;
        lastY = pY;

        if(Dn() > timeUntilNextWave){
            nextWave();
        }

        draw();
    }

    function addRandomItem(){
        if(R()>items.length/10 && items.length < 10 && (lastX != pX || lastY != pY)){
            var x,y;
            var xOrY = true;
            if(lastX != pX && lastY != pY){
                xOrY = R() > .5;
            }
            if(lastX != pX && xOrY){
                x = (lastX > pX?-1:1) * cWidth/2 + pX;
                y = getRandomArbitrary(-1,1)*cHeight/2 + pY;
            } else if(lastY != pY) {
                y = (lastY > pY?-1:1) * cHeight/2 + pY;
                x = getRandomArbitrary(-1,1)*cWidth/2 + pX;
            }

            var crate = new entity({
                name : (R() >.7)?'crate2':'crate',
                x: x,
                y: y,
                ticksPerFrame: 4
            });
            entities.push(crate);
            items.push(crate);
            crate.setRef(crate);

        }
    }

    function draw() {
        //context.drawImage(image, 0, 0, offset, offset, offset/2 - pX, offset/2 - pY, offset, offset);
        var zoomedTilesize = tilesize * overallZoom;
        for(var x = -zoomedTilesize;x < cWidth+zoomedTilesize; x+=zoomedTilesize){
            for(var y = -zoomedTilesize;y < cHeight+zoomedTilesize; y+=zoomedTilesize){
                //else {
                if(player.$.hp > 0)
                    context.drawImage(proto["area"].sprites[0][0], 0, 0, tilesize, tilesize, x-pX.mod(zoomedTilesize), y-pY.mod(zoomedTilesize), zoomedTilesize, zoomedTilesize);
                //}
                //todo: kann man vll wieder reinmachen aber die sprites halt schon vorherladen
                //if(isGlitching(.3)){
                //    //context.globalAlpha = 1 - player.getHp()/1000;
                if(player.$.hp<=0){
                    context.globalAlpha = .25;
                    context.drawImage(clipObjectGlitch(drawImage(proto["area"].sprites[0][0], tilesize,tilesize,zoomedTilesize/2, zoomedTilesize/2))
                        , 0, 0, zoomedTilesize/2, zoomedTilesize/2, x-pX.mod(zoomedTilesize), y-pY.mod(zoomedTilesize), zoomedTilesize, zoomedTilesize);
                    context.globalAlpha = 1;
                }

                //}


            }
        }
    }

    //todo: obstacles

    return {
        init : init,
        update : update,
        draw : draw
    }
};