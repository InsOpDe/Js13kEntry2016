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
                    hp : 40,
                    weaponMod : {
                        cooldown : 1000,
                        randomizer : .35
                    },
                    from : [
                        RGBA(8,7,7), //mantelhinten
                        RGBA(9,8,8), //mantel
                        RGBA(48,48,48), //hose
                        RGBA(9,8,9), //manteluber
                        RGBA(65,65,65), //krawatte
                        RGBA(248,248,248), //unterhemd
                        RGBA(22,22,22), //sunglasses
                        RGBA(21,22,22), //eyes
                        RGBA(7,7,7), //overhair
                        RGBA(245,199,199), //skin light
                        RGBA(236,154,154), //skin dark
                        RGBA(6,6,6), //hair
                    ],
                    to : [
                        RGBA(236,154,154), //mantelhinten
                        RGBA(48,94,210),   //mantel
                        RGBA(40,85,200), //hose
                        RGBA(0,0,0,0),  //manteluber
                        RGBA(236,154,154),   //krawatte
                        RGBA(236,154,154),   //unterhemd
                        RGBA(236,154,154),   //sunglasses
                        RGBA(126,79,79),   //eyes
                        RGBA(0,0,0,0),   //overhair
                        RGBA(245,199,199), //skin light
                        RGBA(236,154,154), //skin dark
                        RGBA(210,71,48), //hair
                    ]
                },
                'enemy2' : { //morpheus
                    weapon : 'shotgun',
                    hp:100,
                    weaponMod : {
                        randomizer :.05,
                        damage : 2,
                        cooldown: 1500,
                        ammo: 4,
                    },
                    from : [
                         //RGBA(8,7,7), //mantelhinten
                         //RGBA(9,8,8), //mantel
                         RGBA(48,48,48), //hose
                        //RGBA(9,8,9), //manteluber
                        RGBA(65,65,65), //krawatte
                        RGBA(248,248,248), //unterhemd
                         //RGBA(22,22,22), //sunglasses
                         //RGBA(21,22,22), //eyes
                         RGBA(7,7,7), //overhair
                         RGBA(245,199,199), //skin light
                         RGBA(236,154,154), //skin dark
                         RGBA(6,6,6), //hair
                        ],
                    to : [
                        //RGBA(20,150,120), //mantelhinten
                        //RGBA(30,150,130),   //mantel
                        RGBA(50,16,16), //hose
                        //RGBA(0,0,0,0),  //manteluber
                        RGBA(74,74,74),   //krawatte
                        RGBA(44,44,44),   //unterhemd
                        //RGBA(245,199,199),   //sunglasses
                        //RGBA(236,154,154),   //eyes
                        RGBA(0,0,0,0),   //overhair
                        RGBA(100,80,49), //skin light
                        RGBA(77,59,30), //skin dark
                        RGBA(0,0,0), //hair
                    ]
                },
                'enemy3' : {
                    weapon : 'machinegun',
                    hp:75,
                    weaponMod : {
                        randomizer :.35,
                        damage : 2,
                        cooldown: 200,
                        ammo: 10,
                        speed: 20,
                    },
                    from : [
                         RGBA(8,7,7), //mantelhinten
                         RGBA(9,8,8), //mantel
                         RGBA(48,48,48), //hose
                        RGBA(9,8,9), //manteluber
                        RGBA(65,65,65), //krawatte
                        RGBA(248,248,248), //unterhemd
                         RGBA(22,22,22), //sunglasses
                         RGBA(21,22,22), //eyes
                         RGBA(7,7,7), //overhair
                         //RGBA(245,199,199), //skin light
                         //RGBA(236,154,154), //skin dark
                         RGBA(6,6,6), //hair
                        ],
                    to : [
                        RGBA(190,190,190), //mantelhinten
                        RGBA(220,220,220),   //mantel
                        RGBA(190,190,190), //hose
                        RGBA(220,220,220),  //manteluber
                        RGBA(74,74,74),   //krawatte
                        RGBA(190,190,190),   //unterhemd
                        RGBA(74,74,74),   //sunglasses
                        RGBA(74,74,74),   //eyes
                        RGBA(190,190,190),   //overhair
                        //RGBA(100,80,49), //skin light
                        //RGBA(77,59,30), //skin dark
                        RGBA(190,190,190), //hair
                    ]
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
                        ammo : 4,
                        damage : 20
                    },
                    hp : 15,
                    tint : RGBA(17,30,30)
                },
                'drone2' : {
                    weapon : 'rifle',
                    weaponMod : {
                        cooldown : 1000,
                        randomizer : .5,
                        damage : 30,
                        shots : 3,
                        ammo: 3,
                        damage: 15,
                    },
                    hp : 30,
                    tint : RGBA(190,83,20)
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
                                    //console.log(j,k);
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