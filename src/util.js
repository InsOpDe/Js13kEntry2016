/**
 * Created by Marcel Michelfelder on 17.08.2016.
 */

function tint(img,rgba, cb){
    //var can = document.getElementById('canvas1');
    //var ctx = can.getContext('2d');
    //var imageData = ctx.getImageData(0,0,can.width, can.height);
    //var pixels = imageData.data;
    //var numPixels = pixels.length;
    //for (var i = 0; i < numPixels; i++) {
    //    var average = (pixels[i*4] + pixels[i*4+1] + pixels[i*4+2]) /3;
    //    // set red green and blue pixels to the average value
    //    pixels[i*4] = average;
    //    pixels[i*4+1] = average+30;
    //    pixels[i*4+2] = average;
    //}
    //ctx.putImageData(imageData, 0, 0);
    // create offscreen buffer,



    var buffer = document.createElement('canvas');
    //console.log(buffer, img);
    buffer.width = img.width;
    buffer.height = img.height;
    var bx = buffer.getContext('2d');
    bx.drawImage(img,0,0);

    var imageData = bx.getImageData(0,0,buffer.width, buffer.height);
    var pixels = imageData.data;
    var numPixels = pixels.length;
    for (var i = 0; i < numPixels; i++) {
        var average = (pixels[i*4] + pixels[i*4+1] + pixels[i*4+2]) /3;
        // set red green and blue pixels to the average value
        pixels[i*4] = average + rgba.r;
        pixels[i*4+1] = average+rgba.g;
        pixels[i*4+2] = average+rgba.b;
    }
    bx.putImageData(imageData, 0, 0);

    // fill offscreen buffer with the tint color
    //bx.fillStyle = '#FF0000';
    //bx.fillRect(0,0,buffer.width,buffer.height);
    //
    //// destination atop makes a result with an alpha channel identical to img, but with all pixels retaining their original color *as far as I can tell*
    //bx.globalCompositeOperation = "destination-atop";
    //bx.drawImage(img,0,0);

    var image = new Image();
    image.src = buffer.toDataURL();
    image.onload = function(){
        cb(image);
    };


    // to tint the image, draw it first
    //x.drawImage(img,0,0);
}

function RGBA(r,g,b,a){
    return {
        r:r,
        g:g,
        b:b,
        a:a||1
    }
};