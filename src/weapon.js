/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */
var Weapon = function(type,ownerId){
    var ammo = 10, lastShot, cooldown = 300, shots = 2, id = ownerId;

    function fire(sx,sy,tx,ty){

        for(var i=0; i < shots; i++){

            var randomizer = 0;
            if(type == 'pistol')
                randomizer = .025 * (i==0 ? 1 : -1);

            var angleRadians = getAngleBetweenTwoPoints(sx,sy,tx,ty)-randomizer;

            createEntity({
                name : 'bullet',
                x : sx,
                y : sy,
                id : id,
                vx : Math.cos(angleRadians),
                vy : Math.sin(angleRadians),
                array : bullets
            });
        }
        lastShot = Date.now();
    }

    function checkCooldown(){
        return lastShot + cooldown > Date.now();
    }

    return {
        fire : fire,
        checkCooldown : checkCooldown,
    }
};