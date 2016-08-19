/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */

var weapons = {
    pistol : {
        name : 'pistol',
        ammo : 10,
        cooldown : 300,
        shots : 2,
        speed : 20,
        damage : 10,
    },
    machinegun : {
        name : 'machinegun',
        ammo : 30,
        cooldown : 100,
        shots : 1,
        randomizer : 0.025,
        speed : 40,
        damage : 5
    }
};


var Weapon = function(opts, id){
    var ammo = opts.ammo, lastShot, cooldown = opts.cooldown, shots = opts.shots, type = opts.name, randomizer = opts.randomizer, speed = opts.speed, damage = opts.damage;

    function fire(sx,sy,tx,ty){

        for(var i=0; i < shots; i++){

            var r = getRandomArbitrary(-randomizer || 0, randomizer || 0);
            if(type == 'pistol')
                r = .025 * (i==0 ? 1 : -1);

            var angleRadians = getAngleBetweenTwoPoints(sx,sy,tx,ty)-r;
            createEntity({
                name : 'bullet',
                x : sx,
                y : sy,
                id : id,
                speed : speed,
                damage : damage,
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