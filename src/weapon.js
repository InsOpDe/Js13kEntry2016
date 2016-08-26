/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */

var weaponsProto = {
    pistol : {
        name : 'pistol',
        ammo : null,
        reloadAmmo : 10,
        cooldown : 600,
        shots : 1,
        speed : 20,
        damage : 10,
    },
    pistols : {
        name : 'pistols',
        ammo : 10,
        reloadAmmo : 10,
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
        randomizer : 0.005,
        speed : 40,
        damage : 5
    },
    shotgun : {
        name : 'shotgun',
        ammo : 8,
        cooldown : 800,
        shots : 10,
        randomizer : 0.025,
        speed : 30,
        damage : 5,
        startRandomizer : 50
        //shift : 5
    },
    rifle : {
        name : 'rifle',
        ammo : 7,
        cooldown : 1000,
        shots : 1,
        speed : 50,
        damage : 60,
        shootThrough : true
        //shift : 50
    }
};


var Weapon = function(opts, id, weaponMod){
    opts = objClone(opts);
    for(var i in weaponMod){
        opts[i] = weaponMod[i];
    }
    if(!opts.ammo) opts.ammo =  Number.POSITIVE_INFINITY;

    var ammo = opts.ammo, lastShot, cooldown = opts.cooldown, shots = opts.shots, type = opts.name,
        randomizer = opts.randomizer || 0, speed = opts.speed, damage = opts.damage, startRandomizer = opts.startRandomizer || 0,
        shift = opts.shift || 0, shootThrough = opts.shootThrough, isReloading, reloadProgress = 0;
    var reloadAmmo = opts.reloadAmmo || ammo;

    var reloadMaxAmmo = reloadAmmo;
    var reloadTime = reloadAmmo * damage * shots /3;

    function fire(sx,sy,angleRadians){
        //todo: ggf eine ebene höher machen
        if(isReloading) return;
        var baseR = 0;
        if(type == 'pistols')
            var baseR = getRandomArbitrary(-randomizer, randomizer);


        for(var i=0; i < shots; i++){

            var r = 0;

            if(type == 'pistols')
                r += .035 * (i==0 ? 1 : -1);
            else
                r += getRandomArbitrary(-randomizer, randomizer);



            var start = getRandomArbitrary(-startRandomizer, startRandomizer) + 100;


            angleRadians = angleRadians-r-baseR;
            createEntity({
                name : 'bullet',
                x : sx,
                y : sy,
                id : id,
                speed : speed,
                start : start,
                damage : damage,
                shift : speed,
                shootThrough : shootThrough,
                vx : Math.cos(angleRadians),
                vy : Math.sin(angleRadians),
            },[bullets]);
        }
        ammo--;
        reloadAmmo--;
        if(reloadAmmo <= 0)
            startReloading();

        lastShot = Date.now();
    }

    function reload(){
        if(isReloading){
            reloadProgress = reloadTime - ++isReloading;
            //reloadProgress = ((Date.now() + reloadTime) - isReloading) / reloadTime;
            if(reloadProgress <= 0){
                reloadAmmo = reloadMaxAmmo;
                isReloading = 0;
                reloadProgress = 0;
            }
        }
    }

    function startReloading(){
        isReloading = 1;
    }

    function checkCooldown(){
        return lastShot + cooldown > Date.now();
    }


    return {
        name : type,
        reload : reload,
        startReloading : startReloading,
        getReloadProgress : function(){return {reloadProgress:reloadProgress, reloadTime:reloadTime}},
        getAmmo : function(){return {ammo : ammo,  reloadAmmo : reloadAmmo}} , //TODO: mach arrowfunctions
        addAmmo : function(addAmmo){ammo += addAmmo} ,
        fire : fire,
        checkCooldown : checkCooldown,
    }
};