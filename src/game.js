/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var game = function(){
    var now,
        factor,
        last,
        gui,
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

            debugWindow = new debug();

            cb()
        });
    }


    function getAllDistances(){
        for(var i in items){
            console.log(items[i].getName(),dist(player.getPos().x,player.getPos().y,items[i].getPos().x,items[i].getPos().y),items[i].getPos().x,items[i].getPos().y)
        }
    }

    function pause() {
        isPaused ^= true;
    }


    /**
     * @author Marcel Michelfelder
     *
     * runs gameloop
     *
     */
    function run() {

        requestAnimationFrame(run);
        now = Date.now();
        factor = (now - last) / 16;
        last = now;


        if(isPaused) return;

        input();
        draw();
        //todo: update

        debugWindow.update({
            playerpos: player.getRealPos()
        });
    }

    function draw(){


        context.clearRect(0, 0, canvas.width, canvas.height);

        _map.update(player.getRealPos());

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

        gui.draw();

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
        player.moveX(d);

        d = 0;
        if (keysDown[83]) {
            d = s;
        } else if (keysDown[87]) {
            d = s * (-1);
        }
        player.moveY(d);


        player.shoot(shooting, mouseposition);
    }

    return {
        init : init,
        pause : pause,
        run : run,
        getAllDistances:getAllDistances
    };
};