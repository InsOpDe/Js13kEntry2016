/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */
var Ai = function(ent){
    var movementTimer = Date.now(), movementCooldown = getRandomArbitrary(500, 2000), moveOrder, movementSpeed = 5, f;
    var pX, pY; //todo: get all enemies


    function update(posPlayer){
        pX = posPlayer.x;
        pY = posPlayer.y;
        move();
        ent.shoot(true, {x:pX, y:pY});
    }


    function move(){
        var now = Date.now();
        if(movementCooldown + movementTimer < now || moveOrder){
            //console.log("bot moves");
            movementTimer = Date.now();



            if(moveOrder){
                //todo: mit vektoren machen
                f = moveOrder.x < ent.getPos().x ? -1 : 1;
                ent.moveX(f * movementSpeed);
                f = moveOrder.y < ent.getPos().y ? -1 : 1;
                ent.moveY(f * movementSpeed);
            } else {
                //var dir = Math.random() <.5 ? -1 : 1;
                var dir = ent.getPos().x > pX ? -1 : 1;
                var dist = getRandomArbitrary(50,100);
                var x = dir*dist + ent.getPos().x;
                var dir = ent.getPos().y > pY ? -1 : 1;
                //var dir = Math.random() <.5 ? -1 : 1;
                var dist = getRandomArbitrary(50,100);
                var y = dir*dist + ent.getPos().y;
                moveOrder = {x:x,y:y};
                //console.log("THERE?",moveOrder);
            }

            if(moveOrder && hits(moveOrder.x, moveOrder.y, 10, 10,
                    ent.getPos().x, ent.getPos().y, ent.getDim().w, ent.getDim().h)) {
                //console.log(moveOrder.x, moveOrder.y, 10, 10,
                //    ent.getPos().x, ent.getPos().y, ent.getDim().w, ent.getDim().h);

            //if(moveOrder.x == ent.getPos().x && moveOrder.y == ent.getPos().y) {
                moveOrder = false;
                movementCooldown = getRandomArbitrary(500, 2000);

            }


        }
    }

    return {
        update : update
    }

};
