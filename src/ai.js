/**
 * Created by Marcel Michelfelder on 19.08.2016.
 */
var Ai = function(entity){
    var movementTimer = Date.now(), movementCooldown = 3000, moveOrder, movementSpeed = 5, f;



    function update(){
        move();
    }

    function move(){
        var now = Date.now();
        if(movementCooldown + movementTimer < now || moveOrder){
            //console.log("bot moves");
            movementTimer = Date.now();



            if(moveOrder){
                //todo: mit vektoren machen
                f = moveOrder.x < entity.getPos().x ? -1 : 1;
                entity.moveX(f * movementSpeed);
                f = moveOrder.y < entity.getPos().y ? -1 : 1;
                entity.moveY(f * movementSpeed);
            } else {
                var dir = Math.random() <.5 ? -1 : 1;
                var dist = getRandomArbitrary(50,100);
                var x = dir*dist + entity.getPos().x;
                var dir = Math.random() <.5 ? -1 : 1;
                var dist = getRandomArbitrary(50,100);
                var y = dir*dist + entity.getPos().y;
                moveOrder = {x:x,y:y};
                //console.log("THERE?",moveOrder);
            }

            if(moveOrder && hits(moveOrder.x, moveOrder.y, 10, 10,
                    entity.getPos().x, entity.getPos().y, entity.getDim().w, entity.getDim().h)) {
                //console.log(moveOrder.x, moveOrder.y, 10, 10,
                //    entity.getPos().x, entity.getPos().y, entity.getDim().w, entity.getDim().h);

            //if(moveOrder.x == entity.getPos().x && moveOrder.y == entity.getPos().y) {
                moveOrder = false;
                movementCooldown = getRandomArbitrary(500, 2000);

            }


        }
    }

    return {
        update : update
    }

};
