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
                        RGBA(29,29,29), //mantelhinten
                        RGBA(9,8,8), //mantel
                        RGBA(48,48,48), //hose
                        RGBA(20,20,20), //manteluber
                        RGBA(65,65,65), //krawatte
                        RGBA(249,249,249), //unterhemd
                        RGBA(40,40,40), //sunglasses
                        RGBA(60,60,60), //eyes
                        RGBA(0,0,0), //overhair
                        RGBA(245,199,199), //skin light
                        RGBA(236,154,154), //skin dark
                        RGBA(15,15,15), //hair
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
                        RGBA(236,154,154), //hair
                        //RGBA(210,71,48), //hair
                    ]
                },
                'enemy2' : { //morpheus
                    weapon : 'shotgun',
                    hp:100,
                    weaponMod : {
                        randomizer :.15,
                        damage : 2,
                        cooldown: 1500,
                        ammo: 4,
                    },
                    from : [
                         //RGBA(29,29,29), //mantelhinten
                         //RGBA(9,8,8), //mantel
                         RGBA(48,48,48), //hose
                        //RGBA(20,20,20), //manteluber
                        RGBA(65,65,65), //krawatte
                        RGBA(249,249,249), //unterhemd
                         //RGBA(40,40,40), //sunglasses
                         //RGBA(60,60,60), //eyes
                         RGBA(0,0,0), //overhair
                         RGBA(245,199,199), //skin light
                         RGBA(236,154,154), //skin dark
                         RGBA(15,15,15), //hair
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
                'enemy3' : { //ghost
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
                         RGBA(29,29,29), //mantelhinten
                         RGBA(9,8,8), //mantel
                         RGBA(48,48,48), //hose
                        RGBA(20,20,20), //manteluber
                        RGBA(65,65,65), //krawatte
                        RGBA(249,249,249), //unterhemd
                         RGBA(40,40,40), //sunglasses
                         RGBA(60,60,60), //eyes
                         RGBA(0,0,0), //overhair
                         //RGBA(245,199,199), //skin light
                         //RGBA(236,154,154), //skin dark
                         RGBA(15,15,15), //hair
                        ],
                    to : [
                        RGBA(190,190,190), //mantelhinten
                        RGBA(220,220,220),   //mantel
                        RGBA(190,190,190), //hose
                        RGBA(220,220,220),  //manteluber
                        RGBA(74,74,74),   //krawatte
                        RGBA(190,190,190),   //unterhemd
                        RGBA(180,180,180),   //sunglasses
                        RGBA(180,180,180),   //eyes
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
                    //tint : RGBA(190,83,20)
                    from : [
                        RGBA(242,109,101),
                        RGBA(235,65,55),
                        RGBA(179,57,66),
                        RGBA(142,106,112),
                    ],
                    to : [
                        RGBA(227,242,101),
                        RGBA(215,235,55),
                        RGBA(179,176,57),
                        RGBA(142,138,106),
                    ]
                }
            }
        },
        crate: {
            name : 'crate',
            w: 20,
            h: 20,
            hp: 20,
            variations : {
                'crate2' : {
                    tint : RGBA(17,30,30)
                },
                'crate3' : {
                    tint : RGBA(100,20,20)
                }
            }
        },
        items: {
            name : 'items',
            w: 20,
            h: 18,
            subitems : [['pistols', 'rifle', 'shotgun', 'machinegun', 'explosion'],['speed','armor','health','grenade','teleport']]
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

            //console.log(proto['explosion'].sprites[0][0].toDataURL());

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