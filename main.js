$(document).ready(function() {
// // //
// // // var img = document.getElementById('my-image');
// // console.log('test');
// // // var canvas = document.getElementById('myCanvas');
// // // canvas.width = img.width;
// // // canvas.height = img.height;
// // // canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
// // // });
// // var myCanvas = document.getElementById('myCanvas');
// // var ctx = myCanvas.getContext('2d');
// // var img = new Image;
// // img.onload = function(){
// //   ctx.drawImage(img,0,0); // Or at whatever offset you like
// // };
// // img.src = "./pic.jpg";
// //
// // $('canvas').mousemove(function(e) {
// //
// //     // if(!this.canvas) {
// //     //     this.canvas = $('<canvas />')[0];
// //     //     this.canvas.width = this.width;
// //     //     this.canvas.height = this.height;
// //     //     this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
// //     // }
// // console.log(myCanvas);
// //     var pixelData = myCanvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
// //
// //     $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);
// //
// //
// // });
// // });
// $(function() {
//
//
//   var img = new Image();
//   // This src needs the correct headers
//   img.src = "./pic.jpg";
//   // This makes it work
//   img.crossOrigin = "anonymous";
//   document.getElementById("my-image").src=img.src;
//
//   var color = [0,0,0,0];
//   var num = 0;
//   var pixelData;
//   if(!this.canvas) {
//       this.canvas = $('<canvas />')[0];
//     }
//
//   console.log(this.canvas.getContext('2d').getImageData(0, 0, 1, 1).data);
//
//   for(var w = 0; w<this.canvas.width; w++){
//     for(var h = 0; h<this.canvas.height; h++){
//       pixelData = this.canvas.getContext('2d').getImageData(w, h, 1, 1).data;
//       color[0] += pixelData[0];
//       color[1] += pixelData[1];
//       color[2] += pixelData[2];
//       color[3] += pixelData[3];
//       num +=1;
//     }
//   }
// console.log(color);
//  $('#output').html('R: ' + color[0] + '<br>G: ' + color[1] + '<br>B: ' + color[2] + '<br>A: ' + pixelData[3]);
//  var c = 'rgba('+pixelData[0]/num+','+pixelData[1]/num+','+pixelData[2]/num+','+pixelData[3]/num+')';
//  $('#output').css('backgroundColor',c);
//
// // $('img').mousemove(function(e) {
//     //
//     //     if(!this.canvas) {
//     //         this.canvas = $('<canvas />')[0];
//     //         this.canvas.width = this.width;
//     //         this.canvas.height = this.height;
//     //         this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
//     //     }
//     //
//     //     var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
//     //
//     //     $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);
//     //
//     //     color = 'rgba('+pixelData[0]+','+pixelData[1]+','+pixelData[2]+','+pixelData[3]+')';
//     //     $('#output').css('backgroundColor',color);
//     // });
//
// // console.log(img.width  +"   "+ img.height);
//
//
//
//
// });
// });



var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};
var color = document.getElementById('color');
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
