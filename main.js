$(function() {
var img = new Image();
img.src = './pic2.png';
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  // averageColor();
};

var color = document.getElementById('colorDisplay');
var color2 = document.getElementById('colorDisplay2');
var avg = [0,0,0,0];
var pCount = 0;
var data;

function averageColor(){
  console.log('test');
  console.log(ctx);
  for(var x = 0; x < ctx.canvas.width-10; x+=10){
    console.log('test2');
    for(var y = 0; y<ctx.canvas.height-10; y+=10){
      var pixel = ctx.getImageData(x, y, 1, 1);
      console.log(x + "  " + y);
       data = pixel.data;
      avg[0]=avg[0]+data[0];
      avg[1]=avg[1]+data[1];
      avg[2]=avg[2]+data[2];
      avg[3]=avg[3]+data[3];
      pCount +=1;
    }
  }
  console.log(pCount);
  avg = [avg[0]/pCount,avg[1]/pCount,avg[2]/pCount,avg[3]/pCount];
  color2.style.background = 'rgba(' + avg[0] + ', ' + avg[1] +
             ', ' + avg[2] + ', ' + (avg[3] / 255) + ')';
  color2.textContent = 'average';
  console.log(avg);
  $('#colorDisplay2').css('backgroundColor','rgba(' + Math.floor(avg[0]) + ', ' + Math.floor(avg[1]) +
             ', ' + Math.floor(avg[2]) + ', ' + (Math.floor(avg[3]) / 255) + ')');
     console.log('backgroundColor','rgba(' + Math.floor(avg[0]) + ', ' + Math.floor(avg[1]) +
                ', ' + Math.floor(avg[2]) + ', ' + (Math.floor(avg[3]) / 255) + ')');
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


$('.buttons').on('click','#b1',function(){
  img.src = './pic.jpg';
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
});
$('.buttons').on('click','#b2',function(){
  img.src = './pic2.png';
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
});
$('.buttons').on('click','#b3',function(){
  img.src = './3.jpg';
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
});
$('.buttons').on('click','#b4',function(){
  img.src = './4.jpg';
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
});
$('.buttons').on('click','#b5',function(){
  averageColor();
});
});
