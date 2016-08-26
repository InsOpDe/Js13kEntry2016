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
        factor,
        last,
        gui,
        beginningSequence = new video(['','call trans opt: received. 9-18-99 14:32:21 REC:log>','warning: carrier anomaly', 'trace program: running..'],'to skip'),
    //todo: get correct date
        endingSequence = new video(['','system failure'], 'to retry', true),
        gameOverTime = false,
        isPaused = false;



    registerSingleKeyEvents();
    function registerSingleKeyEvents(){
        document.body.onkeyup = function(event){
            var code = event.keyCode;
            if (code == 89) {
                player.switchWeapon(1);
            } else if (code == 88) {
                player.switchWeapon(-1);
            }

            if(code == 82){
                player.getWeapon().startReloading();
            }
        }
    }




    function init(cb) {

        _map = new map();
        _map.init(function(){
            player = new entity({
                name : 'player',
                x: 0,
                y: 0,
                hp: 1000
            });
            entities.push(player);
            player.setRef(player);
            gui = new Gui(player);

            //debugWindow = new debug();
            cb()
        });
    }



    /**
     * @author Marcel Michelfelder
     *
     * runs gameloop
     *
     */
    function run() {

        now = Date.now();
        factor = (now - last) / 16;
        last = now;

        if(isPaused) return;

        input();
        draw();
        if(!endingSequence.realFinished())
            requestAnimationFrame(run);


        //todo: update


        //debugWindow.update({
        //    playerpos: player.getRealPos()
        //});
    }

    function draw(){

        if(!skpIntro){
            beginningSequence.update();
            if(!beginningSequence.finished())
                return;
        }

        if(typeof gameOverTime == 'number'){
            if(--gameOverTime <= 0){
                endingSequence.update();

                if(endingSequence.realFinished()){
                    var hs = localStorage.getItem("highscore") || 0;
                    if(score > hs){
                        localStorage.setItem("highscore", score)
                    }

                    delete window.stage;
                    window.stage = new game(true);
                    window.stage.init(function(){
                        window.stage.run();
                    });
                }
                return;
            }
        }


        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.globalCompositeOperation = 'source-over';

        _map.update(player.getRealPos());


        if(player.getHp() > 0){
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

            contextLight.fillStyle = '#000000';
            contextLight.fillRect(0, 0, cWidth, cHeight);
//            contextLight.beginPath();
//            //contextLight.moveTo(cWidth/2, cWidth/2);
//            contextLight.arc(cWidth/2, cHeight/2, 100, -1 * Math.PI, 1 * Math.PI, false);
//
//// fill arc with gradient
//            contextLight.fillStyle = '#ffffff';
//            contextLight.fill();
            ligthenGradient(cWidth/2, cHeight/2, cHeight);

            context.save();
            context.globalCompositeOperation="multiply";
            context.drawImage(canvasLight, 0, 0);
            context.restore(); // sets the composite operation back to default

            //darken(0, 0, cWidth, cHeight, '#000', 0.6);

            gui.draw();
        } else if(typeof gameOverTime == 'boolean') {
            gameOverTime = 45;
        }


        //fonts
        //context.drawImage(font.draw('Pixel Font', 24),0,0);
    }


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

        if(player.getHp()>0)
            player.moveX(d);

        d = 0;
        if (keysDown[83]) {
            d = s;
        } else if (keysDown[87]) {
            d = s * (-1);
        }
        if(player.getHp()>0)
            player.moveY(d);


        player.shoot(shooting, mouseposition);
    }

    return {
        init : init,
        run : run,
    };
};