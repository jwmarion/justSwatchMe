$(function() {
var img = new Image();
img.src = './pic.jpg';
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  averageColor();
};

var color = document.getElementById('colorDisplay');
var color2 = document.getElementById('colorDisplay2');
var avg = [0,0,0,0];
var pCount = 0;
var data;

function averageColor(){
  console.log('test');
  console.log(ctx);
  for(var x = 0; x < ctx.width; x++){
    console.log('test2');
    for(var y = 0; y<ctx.height; y++){
      var pixel = ctx.getImageData(x, y, 1, 1);
      console.log(ctx);
      console.log(pixel);
       data = pixel.data;
      avg[0]=avg[0]+data[0];
      avg[1]=avg[1]+data[1];
      avg[2]=avg[2]+data[2];
      avg[3]=avg[3]+data[3];
      pCount +=1;
    }
  }
  console.log(pcount);
  avg = [data[0]/pCount,data[1]/pCount,data[2]/pCount,data[3]/pCount];
  color2.style.background = 'rgba(' + avg[0] + ', ' + avg[1] +
             ', ' + avg[2] + ', ' + (avg[3] / 255) + ')';
  color2.textContent = 'average';
}




function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ', ' + data[1] +
             ', ' + data[2] + ', ' + (data[3] / 255) + ')';
  color.style.background =  rgba;
  color.textContent = rgba;
}
canvas.addEventListener('mousemove', pick);
});
