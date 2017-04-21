$(document).ready(function() {
// //
// // var img = document.getElementById('my-image');
// console.log('test');
// // var canvas = document.getElementById('myCanvas');
// // canvas.width = img.width;
// // canvas.height = img.height;
// // canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
// // });
// var myCanvas = document.getElementById('myCanvas');
// var ctx = myCanvas.getContext('2d');
// var img = new Image;
// img.onload = function(){
//   ctx.drawImage(img,0,0); // Or at whatever offset you like
// };
// img.src = "./pic.jpg";
//
// $('canvas').mousemove(function(e) {
//
//     // if(!this.canvas) {
//     //     this.canvas = $('<canvas />')[0];
//     //     this.canvas.width = this.width;
//     //     this.canvas.height = this.height;
//     //     this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
//     // }
// console.log(myCanvas);
//     var pixelData = myCanvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
//
//     $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);
//
//
// });
// });
$(function() {


  var img = new Image;
  // This src needs the correct headers
  img.src = "./pic.jpg";
  // This makes it work
  img.crossOrigin = "anonymous";
  document.getElementById("my-image").src=img.src;

    $('img').mousemove(function(e) {

        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        }

        var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

        $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);

        color = 'rgba('+pixelData[0]+','+pixelData[1]+','+pixelData[2]+','+pixelData[3]+')';
        $('#output').css('backgroundColor',color);
    });



});
});
