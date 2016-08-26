/**
 * Created by Marcel Michelfelder on 23.08.2016.
 */
var video = function(textArray, skipMessage){

    var index = 0;
    skipMessage =  skipMessage || "Press [Space]"
    var wholeText = textArray || ["test lalala die busfahrt die macht spass", "esseidenn sie dauert zulange", "trace programm blabla"];
    var row = 0;
    var d = getRndTime();
    var dRow = 0;
    var nextRow = false;
    var textToIndex = "";
    var font = new pixelfont();
    var cursorVisible;
    var sequenceFinished;

    function getRndTime(){
        return getRandomArbitrary(0,5);
    }

    function update(){
        d--;
        dRow--;

        if(keysDown[32]){
            row = wholeText.length-1;
            index = wholeText[row].length
        }


        if(!wholeText[row+1] && dRow <= 0 && d<=0 && index > wholeText[row].length)
            sequenceFinished = true;

        if(d <= 0){
            index++;
            d = getRndTime();
        }

        if(nextRow && dRow <= 0 && wholeText[row+1]){
            index = 0;
            d = 60;
            row++;
            nextRow = false;
        }

        cursorVisible = Math.sin(Date.now()/100) > 0;

        textToIndex = wholeText[row].substring(0,index);

        if(index > wholeText[row].length && !nextRow){
            dRow = 100;
            nextRow = true;
        }

        draw();
    }

    function draw() {
        context.fillStyle = 'black';
        context.fillRect(0,0,cWidth,cHeight);
        var textImage = font.draw(textToIndex,5,'lightgreen');
        context.drawImage(textImage,100,100);
        context.fillStyle = 'lightgreen';
        if(cursorVisible)
            context.fillRect(textImage.width+100,98,20,28);
    }

    return {
        update : update,
        //finished : () => sequenceFinished
        finished : function(){return sequenceFinished}
    }
};
