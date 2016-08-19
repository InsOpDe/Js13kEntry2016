/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */

var weaponsProto = {
    pistol : {
        name : 'pistol',
        ammo : 10,
        cooldown : 600,
        shots : 2,
        speed : 20,
        damage : 10,
    },
    machinegun : {
        name : 'machinegun',
        ammo : 30,
        cooldown : 100,
        shots : 1,
        randomizer : 0.05,
        speed : 40,
        damage : 5
    },
    shotgun : {
        name : 'shotgun',
        ammo : 30,
        cooldown : 1200,
        shots : 10,
        randomizer : 0.05,
        speed : 30,
        damage : 5,
        startRandomizer : 50
        //shift : 5
    },
    rifle : {
        name : 'rifle',
        ammo : 30,
        cooldown : 1000,
        shots : 1,
        speed : 70,
        damage : 60,
        //shift : 50
    }
};


var Weapon = function(opts, id){
    var ammo = opts.ammo, lastShot, cooldown = opts.cooldown, shots = opts.shots, type = opts.name,
        randomizer = opts.randomizer || 0, speed = opts.speed, damage = opts.damage, startRandomizer = opts.startRandomizer || 0,
        shift = opts.shift || 0;

    function fire(sx,sy,tx,ty){

        for(var i=0; i < shots; i++){

            var r = getRandomArbitrary(-randomizer, randomizer);
            if(type == 'pistol')
                r = .025 * (i==0 ? 1 : -1);
            var start = getRandomArbitrary(-startRandomizer, startRandomizer) || 100;

            ammo += shots;

            var angleRadians = getAngleBetweenTwoPoints(sx,sy,tx,ty)-r;
            createEntity({
                name : 'bullet',
                x : sx,
                y : sy,
                id : id,
                speed : speed,
                start : start,
                damage : damage,
                shift : speed,
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
        name : type,
        ammo : function(){return ammo} , //TODO: mach arrowfunctions
        fire : fire,
        checkCooldown : checkCooldown,
    }
};