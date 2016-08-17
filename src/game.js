/**
 * Created by Marcel Michelfelder on 14.08.2016.
 */

var game = function(){
    var now,
        factor,
        last,
        player,
        isPaused = false;




    function init(cb) {

        _map = new map();
        _map.init(function(){
            player = new entity({
                name : 'player',
                x: 0,
                y: 0,
                ticksPerFrame: 4
            });
            entities.push(player);
            player.setRef(player);

            debugWindow = new debug();

            cb()
        });




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
    }


    function input(){
        var d = 0;
        var s = 5;
        var shooting = false;
        if (keysDown[900]) shooting = true;
        player.shoot(shooting);

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
    }

    return {
        init : init,
        pause : pause,
        run : run
    };
};