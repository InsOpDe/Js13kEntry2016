/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */

var Gui = function(player){
    var font = new pixelfont();
    var margin = 100;


    function draw(){
        var weapon = player.getWeapon();
        context.drawImage(font.draw(weapon.name, 10, "green"),margin,cHeight - margin);
        drawHp();
    }

    function drawHp(){

        var w = 500;
        var h = 20;
        var x = cWidth/2-w/2;
        var y = margin;
        var zoom = overallZoom/2;

        context.fillStyle = '#000000';
        context.fillRect(x,y,w,h);

        context.fillStyle = '#ff8888';
        context.fillRect(x+zoom,y+zoom,w-zoom*2,h-zoom*2);

        context.fillStyle = '#ff0000';
        context.fillRect(x+zoom,y+zoom,(w-zoom*2)*(player.getHp()/1000),h-zoom*2);

    }

    return {
        draw : draw
    }
};