/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */

var Gui = function(player){
    var font = new pixelfont();
    var margin = 100;


    function draw(){
        var weapon = player.getWeapon();
        context.drawImage(font.draw(weapon.name + " " + weapon.getAmmo().ammo, 10, "green"),margin,cHeight - margin- 50);
        drawHp();
        drawAmmo();
    }

    function drawBar(opts){
        var w = opts.w;
        var h = opts.h;
        var x = opts.x;
        var y = opts.y;
        var zoom = overallZoom/2;
        var ratio = opts.fill/opts.fillMax;
        if(opts.inverse){
            ratio = 1 - ratio;
        }


        context.fillStyle = '#000000';
        context.fillRect(x,y,w,h);

        context.fillStyle = opts.bg;
        context.fillRect(x+zoom,y+zoom,w-zoom*2,h-zoom*2);

        context.fillStyle = opts.fg;
        context.fillRect(x+zoom,y+zoom,(w-zoom*2)*ratio,h-zoom*2);
    }

    function drawHp(){
        var w = 500;
        drawBar({
             w : w,
             h : 20,
             x : cWidth/2-w/2,
             y : margin,
            bg : '#ff8888',
            fg : '#ff0000',
            fill : player.getHp(),
            fillMax : 1000
        })
    }
    function drawAmmo(){
        var w = 500;
        var weapon = player.getWeapon();
        var reload = weapon.getReloadProgress();
        var bg = '#3b321b',
            fg = '#ffd674',
            fill = weapon.getAmmo().reloadAmmo,
            fillMax = weaponsProto[weapon.name].reloadAmmo | weaponsProto[weapon.name].ammo;

        if(reload.reloadProgress){
            fill  = reload.reloadProgress;
            fillMax  = reload.reloadTime;
        }
        drawBar({
             w : w,
             h : 20,
             x : cWidth/2-w/2,
             y : margin + 30,
            bg : bg,
            fg : fg,
            fill : fill,
            fillMax : fillMax,
            inverse : reload.reloadProgress
        })
    }

    return {
        draw : draw
    }
};