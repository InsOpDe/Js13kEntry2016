/**
 * Created by Marcel Michelfelder on 18.08.2016.
 */
var proto, collectableitems;

var loader = function(){

    proto = {
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
            weapon : 'pistol',
            variations :  {
                'enemy1' : {
                    weapon : 'pistols',
                    weaponMod : {
                        cooldown : 1000,
                        randomizer : .35
                    },
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
            weapon : 'pistol',
            weaponMod : {
                cooldown : 1000,
                randomizer : .35
            },
            variations :  {
                'drone1' : {
                    weapon : 'rifle',
                    weaponMod : {
                        cooldown : 1000,
                        randomizer : .35,
                        damage : 30
                    },
                    hp : 30,
                    tint : RGBA(17,30,30)
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
        },
        items: {
            name : 'items',
            w: 20,
            h: 18,
            subitems : [['pistols', 'rifle', 'shotgun', 'machinegun'],['speed','armor','health','grenade','teleport']]
            //variations : {
            //    'crate2' : {
            //        tint : RGBA(17,30,30)
            //    }
            //}
        }
    };
    collectableitems = [];

    function init(cb){
        var toLoad = [];
        for(var i in proto){
            toLoad.push(proto[i])
        }


        //for(var i in proto) {
        //    proto[i].sprites = iterateSprites(proto[i].sprites, function (sprite) {
        //        return drawZoomed(sprite, 10);
        //    })
        //    proto[i].w *= 10;
        //    proto[i].h *= 10;
        //}

        var zoom = 10;

        loadAssets(toLoad, function(){
            var vars, altSprites;
            for(var i in proto){
                //proto[i].sprites = iterateSprites(proto[i].sprites, function (sprite) {
                //    return drawZoomed(sprite, zoom);
                //})
                //proto[i].w *= zoom;
                //proto[i].h *= zoom;
                if(vars = proto[i].variations){
                    for(var j in vars){
                        altSprites = [];
                        var sprites = undefined;

                        proto[j] = {
                            w : proto[i].w,
                            h : proto[i].h,
                            hp : vars[j].hp || proto[i].hp,
                            weapon : vars[j].weapon || proto[i].weapon,
                            weaponMod : vars[j].weaponMod || proto[i].weaponMod,
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
                //proto[i].sprites = iterateSprites(proto[i].sprites,function(sprite){
                //    return drawZoomed(sprite,10);
                //})
                //proto[i].w *= 10;
                //proto[i].h *= 10;
                proto[i].hitSprites = iterateSprites(proto[i].sprites,function(sprite){
                    return tint(sprite,RGBA(hl,hl,hl));
                })
                for(var j in proto[i].subitems){
                    for(var k in proto[i].subitems[j]){
                        var tempName = proto[i].subitems[j][k];
                        collectableitems.push(tempName);
                        var spritesTemp = [[proto[i].sprites[j][k]]];
                        proto[tempName] = {
                            w : proto[i].w,
                            h : proto[i].h,
                            name : tempName,
                            sprites : spritesTemp
                        }
                    }
                }
            }

            //var points = getRandomTriangle(99,96);


            proto.glitch ={
                name : 'glitch',
                w: 20,
                h: 20,
                //sprites : [[clipObjectGlitch(proto.player.sprites[0][0])]]
                //sprites : [[drawTriangle(20,20),drawTriangle(20,20),drawTriangle(20,20),drawTriangle(20,20),drawTriangle(20,20),drawTriangle(20,20)]]
                sprites : [[drawTriangle(20,20)]]
                //sprites : [drawXTriangles(20,20,99)]

                //sprites : [createGlitchSprites(100)]
            };

            cb();

        });

        function loadAssets(names,cb){
            var image = new Image();
            var spriteObj = names.pop();
            var name = spriteObj.name;
            image.src = "data:image/png;base64," + img[name];
            //image.src = "../res/" + name + ".png";
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