/**
 * Created by Marcel Michelfelder on 23.08.2016.
 */
var video = function(textArray, skipMessage, showScore){

    var index = 0;
    skipMessage =  "Press -Space- " + skipMessage;
    var wholeText = textArray;
    var row = 0;
    var d = getRndTime();
    var dRow = 0;
    var nextRow = false;
    var textToIndex = "";
    var font = new pixelfont();
    var cursorVisible;
    var sequenceFinished, sequenceRealFinished;

    function getRndTime(){
        return getRandomArbitrary(0,3);
    }

    function update(){
        d--;
        dRow--;

        if(keysDown[32]){
            row = wholeText.length-1;
            index = wholeText[row].length
            sequenceRealFinished = true;
        }


        if(!wholeText[row+1] && dRow <= 0 && d<=0 && index > wholeText[row].length)
            sequenceFinished = true;

        if(d <= 0){
            index++;
            d = getRndTime();
        }

        if(nextRow && dRow <= 0 && wholeText[row+1]){
            index = 0;
            d = 40;
            row++;
            nextRow = false;
        }

        cursorVisible = Math.sin(Date.now()/100) > 0;

        textToIndex = wholeText[row].substring(0,index);

        if(index > wholeText[row].length && !nextRow){
            dRow = 50;
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
            context.fillRect(textImage.width + 100, 98, 20, 28);

        var skipMessageImg = font.draw(skipMessage, 5, "lightgreen");
        context.drawImage(skipMessageImg,cWidth/2-skipMessageImg.width/2,cHeight - 150);

        if(showScore){
            var hs = localStorage.getItem("highscore") || 0;
            var text = "Your score: " + score + " - highscore: " + hs;
            if(score > hs){
                text = "New highscore: " + score;
            }

            var scoreMessageImg = font.draw(text, 5, "lightgreen");
            context.drawImage(scoreMessageImg,cWidth/2-scoreMessageImg.width/2,cHeight - 200);
        }
    }

    return {
        update : update,
        //finished : () => sequenceFinished
        finished : function(){return sequenceFinished},
        realFinished : function(){return sequenceRealFinished},
    }
};
