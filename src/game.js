/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var game = function(skpIntro){
    idCounter = 0,
    entities = [],
    bullets = [],
    enemies = [],
    timeUntilNextWave = 0,
    isHacking = 0,
    score = 0,
    items = [],
    collectables = [];

    var now,
        beginningSequence = new video(['','call trans opt: received. '+getDateTime()+' REC:log>','warning: carrier anomaly', 'trace program: running..'],'to skip'),
    //todo: get correct date
        endingSequence = new video(['system failure'], 'to retry', true),
        gameOverTime = false;

    function getDateTime(){
        var date = new Date();
        return date.getDay()+"-"+(date.getMonth()+1)+"-"+(1900+date.getYear())+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }



    registerSingleKeyEvents();
    function registerSingleKeyEvents(){
        document.body.onkeyup = function(event){
            var code = event.keyCode;
            if (code == 89) {
                player.switchWeapon(1);
            } else if (code == 88) {
                player.switchWeapon(-1);
            }

            if(code == 69){
                player.throws(mouseposition);
            }

            var basecode = 49;
            for(var i=0; i<5;i++){
                if (code == basecode+i) {
                    player.switchToWeapon(weaponOrder[i]);
                }
            }


            if(code == 82){
                player.$.weapon.startReloading();
            }
        }
    }


    /**
     * @author Marcel Michelfelder
     *
     * runs gameloop
     *
     */
    function run() {

        input();
        draw();
        if(!endingSequence.realFinished())
            requestAnimationFrame(run);
    }

    function draw(){

        if(!skpIntro){
            beginningSequence.update();
            if(!beginningSequence.finished()){
                timeUntilNextWave = Dn() + 5000;
                return;
            }
        }

        if(typeof gameOverTime == 'number'){
            if(--gameOverTime <= 0){
                endingSequence.update();

                if(endingSequence.realFinished()){
                    var hs = localStorage.getItem("stm_highscore") || 0;
                    if(score > hs){
                        localStorage.setItem("stm_highscore", score)
                    }

                    stage = new game(true);
                    stage.init(function(){
                        stage.run();
                    });
                }
                return;
            }
        }

        glitchSin = isGlitching();
        //glitchSin = Math.abs(Math.sin(++cnt/10));

        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.globalCompositeOperation = 'source-over';

        _map.update(player.getRealPos());


        if(player.$.hp > 0){

            entities.sort(function(a,b){
                //console.log(b.getPos().y, a.getPos().y);
                return a.getRealPos().y - b.getRealPos().y
            });


            for(var i in entities){
                entities[i].update(player.getRealPos()).draw();
            }
            for(var i in bullets){
                bullets[i].update(player.getRealPos()).draw();
            }
            for(var i in points){
                points[i].update(player.getRealPos()).draw();
            }

            if(!isFF){
                contextLight.fillStyle = '#000000';
                contextLight.fillRect(0, 0, cWidth, cHeight);
                ligthenGradient(cWidth/2, cHeight/2, cHeight*1.2);
                context.save();
                context.globalCompositeOperation = "multiply";
                context.drawImage(canvasLight, 0, 0);
                context.restore(); // sets the composite operation back to default
            }


            gui.draw();
        } else if(typeof gameOverTime == 'boolean') {
            gameOverTime = 45;
        }

    }



    var teleportCd = Dn();
    function input(){
        var d = 0;
        var s = 5;
        var shooting = false;
        if (keysDown[900]) shooting = true;


        if (keysDown[65]) {
            d = s * (-1);
        } else if (keysDown[68]) {
            d = s;
        }

        if(player.$.hp>0)
            player.moveX(d);

        d = 0;
        if (keysDown[83]) {
            d = s;
        } else if (keysDown[87]) {
            d = s * (-1);
        }
        if(player.$.hp>0)
            player.moveY(d);

        var powerup = player.getPowerUp();
        if(keysDown[16] && powerup){
            if(powerup.name =='speed'){
                pTicksPerFrame = 1;
                speedMultiplier = 2;
                player.usePowerup();
            } else if(powerup.name =='teleport' && teleportCd + 500 < Dn()) {
                player.moveX(mouseposition.x);
                player.moveY(mouseposition.y);
                teleportCd = Dn();
                player.usePowerup();
            }
        } else {
            pTicksPerFrame = 4;
            speedMultiplier = 1;
        }


        player.shoot(shooting, mouseposition);
    }


    return {
        init : function(cb) {


            _map = new map();
            _map.init(function(){
                //player = new entity({
                //    name : 'player',
                //    x: 0,
                //    y: 0,
                //    hp: 1000
                //});
                //entities.push(player);
                //player.setRef(player);
                player = createEntity({
                    name : 'player',
                    x: 0,
                    y: 0,
                    hp: 1000
                },[entities]);


                gui = new Gui(player);

                //debugWindow = new debug();
                cb()
            });
        },
        run : run,
    };
};