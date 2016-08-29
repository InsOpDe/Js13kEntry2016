/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */
var Ai = function(ent){
    var movementTimer = Dn(), movementCooldown = getRandomArbitrary(500, 2000), moveOrder, movementSpeed = 5, f;
    var pX, pY; //todo: get all enemies


    function update(posPlayer){
        pX = posPlayer.x;
        pY = posPlayer.y;
        move();
        ent.shoot(true, {x:pX, y:pY});
    }


    function move(){
        var now = Dn();
        if(movementCooldown + movementTimer < now || moveOrder){
            movementTimer = Dn();


            var eX = ent.getPos().x;
            var eY = ent.getPos().y;
            if(moveOrder){
                f = moveOrder.x < eX ? -1 : 1;
                ent.moveX(f * movementSpeed);
                f = moveOrder.y < eY ? -1 : 1;
                ent.moveY(f * movementSpeed);
            } else {
                var d = dist(pX,pY,eX,eY);
                var maxReach = Ma(150,d/2);
                var dir = eX > pX ? -1 : 1;
                var distX = getRandomArbitrary(50,maxReach);
                var x = dir*distX + eX;
                dir = eY > pY ? -1 : 1;
                var distY = getRandomArbitrary(50,maxReach);
                var y = dir*distY + eY;
                moveOrder = {x:x,y:y};
                //console.log("THERE?",moveOrder);
            }

            if(moveOrder && hits(moveOrder.x, moveOrder.y, 10, 10,
                    eX, eY, ent.getDim().w, ent.getDim().h)) {
                moveOrder = false;
                movementCooldown = getRandomArbitrary(500, 2000);
            }

        }
    }

    return {
        update : update
    }

};
