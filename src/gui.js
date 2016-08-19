/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */

var Gui = function(player){
    var font = new pixelfont();
    var margin = 100;


    function draw(){
        var weapon = player.getWeapon();
        context.drawImage(font.draw(weapon.name, 10, "green"),margin,cHeight - margin);

    }

    return {
        draw : draw
    }
};