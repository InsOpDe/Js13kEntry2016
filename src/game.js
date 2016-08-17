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
        player = new entity({
            name : 'player',
            x: 0,
            y: 0,
            ticksPerFrame: 4
        }, function(){
            entities.push(player);
            player.setRef(player);
            map.init({
                pos : player.getPos()
            }, cb)
        });
        map = new map();
        debugWindow = new debug();


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

        debugWindow.update({
            playerpos: player.getPos()
        });
    }

    function draw(){

        context.clearRect(0, 0, canvas.width, canvas.height);

        map.update(player.getPos());

        entities.sort(function(a,b){
            //console.log(b.getPos().y, a.getPos().y);
            return a.getPos().y - b.getPos().y
        });

        for(var i in entities){
            entities[i].update(player.getPos()).draw();
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