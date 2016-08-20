/**
 * Created by Marcel Michelfelder on 18.08.2016.
 */
var proto = {
    area:{
        name : 'area',
        w: 30,
        h: 30
    },
    player: {
        name : 'player',
        w: 34,
        h: 30,
        hp: 100,
        variations :  {
            'enemy1' : {
                from : [RGBA(248,248,248)],
                to : [RGBA(219,17,17)]
            }
        }
    },
    drone: {
        name : 'drone',
        w: 10,
        h: 10,
        hp: 10,
        variations :  {
            'drone1' : {
                from : [RGBA(248,248,248)],
                to : [RGBA(219,17,17)]
            }
        }
    },
    crate: {
        name : 'crate',
        w: 20,
        h: 20,
        hp: 30,
        variations : {
            'crate2' : {
                tint : RGBA(17,30,30)
            }
        }
    }
};

var loader = function(){

    function init(cb){
        var toLoad = [];
        for(var i in proto){
            toLoad.push(proto[i])
        }

        loadAssets(toLoad, function(){
            var vars, altSprites;
            for(var i in proto){
                if(vars = proto[i].variations){
                    for(var j in vars){
                        altSprites = [];
                        var sprites = undefined;
                        proto[j] = {
                            w : proto[i].w,
                            h : proto[i].h,
                            hp : proto[i].hp,
                            name : j
                        };
                        if(vars[j].from){
                            sprites = iterateSprites(proto[i].sprites, function(sprite){
                                var tempSprite = sprite;
                                for(var k = 0; k < vars[j].from.length; k++){
                                    tempSprite = changeColorOfSprite(tempSprite,vars[j].from[k],vars[j].to[k]);
                                }
                                return tempSprite;
                            })

                        }
                        if(vars[j].tint) {
                            sprites = iterateSprites(sprites || proto[i].sprites, function(sprite){
                                return tint(sprite,vars[j].tint);
                            })
                        }
                        proto[j].sprites = sprites;
                    }
                }
            }

            for(var i in proto){
                var hl = 150;
                proto[i].hitSprites = iterateSprites(proto[i].sprites,function(sprite){
                    return tint(sprite,RGBA(hl,hl,hl));
                })
            }

            cb();

        });

        function loadAssets(names,cb){
            var image = new Image();
            var spriteObj = names.pop();
            var name = spriteObj.name;
            image.src = "../res/" + name + ".png";
            image.addEventListener("load", function(){
                proto[name].sprites = splitSpritesheet(this,spriteObj.w,spriteObj.h);
                if(names.length){
                    loadAssets(names,cb)
                } else {
                    cb();
                }
            });
        }
    }

    return {
        init : init
    }
};