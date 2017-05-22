import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

class Swatch extends React.Component{
  constructor(){
    super();
    this.state = {
      hoverColor: [37, 100, 50],
      currentPic: './wheel.jpeg',
      activeColor: [37, 100, 50],
      genColor: [[37, 100, 50],[55,100,50],[123,100,50],[215,100,50],[275,100,50]]

    };
  }
    componentDidUpdate(prevProps, prevState){
      console.log(this.state.activeColor);
      console.log(prevState);
      if (prevState.activeColor !== this.state.activeColor){
        this.generateColors();
      }
    }
    componentDidMount() {
      let img = new Image();
      let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
      let ctx = canvas.getContext('2d');
      img.src = this.state.currentPic;
      ctx.drawImage(img, 0, 0);

        img.onload = function(){
          let ratio = this.height / this.width;
          img.width = 500;
          img.height = 500 *ratio;
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, (canvas.width / 2) - (img.width / 2), 0, img.width, canvas.height);
      };


    }

  render() {



    var color = document.getElementById('colorDisplay');
    var avg = [0,0,0,0];
    var pCount = 0;

    return (
      <div>

      <div className="topBar">
        <h1>
          just
          <span style={{color:this.toStringHsl(this.state.activeColor)}}>S</span>
          <span style={{color:this.toStringHsl(this.state.genColor[0])}}>W</span>
          <span style={{color:this.toStringHsl(this.state.genColor[1])}}>A</span>
          <span style={{color:this.toStringHsl(this.state.genColor[2])}}>T</span>
          <span style={{color:this.toStringHsl(this.state.genColor[3])}}>C</span>
          <span style={{color:this.toStringHsl(this.state.genColor[4])}}>H</span>
           me
        </h1>
      </div>


        <div className="buttons">
          <div className="hoverColor"  style={{
            backgroundColor: this.toStringHsl(this.state.hoverColor)}}></div>
          <button id="b1" type="button" name="button" onClick={()=>this.setState({img: './wheel.jpeg'})}>Color Wheel</button>
          <button id="b5" type="button" name="button" onClick={()=>this.averageColor()} >Get Average Color</button>

        <input type="file" id="imageLoader" name="imageLoader" onChange={(event)=>
          { this.handleImage(event) }}
          onClick={(event)=> { event.target.value = null
          }}/>
            </div>
        <canvas ref="myCanvas" className="myCanvas"width="400" height="300" onMouseMove={(event)=>this.hoverColor(event)} onClick={(event)=>this.pick(event)}></canvas>
        <img id="my-image" src="" alt=""/>

        <div className="colors">
          <div className="cd" id="colorDisplay2" style={{
            backgroundColor: this.toStringHsl(this.state.activeColor)}}>
            Active Color <br/>
            {this.toStringRgb(this.state.activeColor)}<br/>
            {this.toStringHsl(this.state.activeColor)}</div>

          <div className="cd" id="colorDisplay3" style={{
            backgroundColor: this.toStringHsl(this.state.genColor[0])}}>
            Complementary Color<br/>
            {this.toStringRgb(this.state.genColor[0])}<br/>
            {this.toStringHsl(this.state.genColor[0])}</div>

          <div className="cd" id="colorDisplay4" style={{
            backgroundColor: this.toStringHsl(this.state.genColor[1])}}>
            split complementary 1<br/>
            {this.toStringRgb(this.state.genColor[1])}<br/>
            {this.toStringHsl(this.state.genColor[1])}</div>

          <div className="cd" id="colorDisplay5" style={{
            backgroundColor: this.toStringHsl(this.state.genColor[2])}}>
            split complementary 2<br/>
            {this.toStringRgb(this.state.genColor[2])}<br/>
            {this.toStringHsl(this.state.genColor[2])}</div>

          <div className="cd" id="colorDisplay6" style={{
            backgroundColor: this.toStringHsl(this.state.genColor[3])}}>
            Analogous 1<br/>
            {this.toStringRgb(this.state.genColor[3])}<br/>
            {this.toStringHsl(this.state.genColor[3])}</div>

          <div className="cd" id="colorDisplay7" style={{
            backgroundColor: this.toStringHsl(this.state.genColor[4])}}>
            Analogous 2<br/>
            {this.toStringRgb(this.state.genColor[3])}<br/>
            {this.toStringHsl(this.state.genColor[3])}</div>

        </div>
      </div>
    )
  }
  changePic(value){
    let val = '';
    if(value ==1){
      val = './1.jpg';
    }else if(value ==2){
      val = './2.png';
    }else if(value ==3){
      val = './3.jpg';
    }else if(value ==4){
      val = './4.jpg';
    }
    this.setState({
      currentPic: val
    });

  }
   handleImage(e){
     var imageLoader = document.getElementById('imageLoader');
     let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
     var ctx = canvas.getContext('2d');
      var reader = new FileReader();
      reader.onload = function(event){
          var img = new Image();
          img.onload = function(){
            let ratio = this.height / this.width;
            img.width = 500;
            img.height = 500 *ratio;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, (canvas.width / 2) - (img.width / 2), 0, img.width, canvas.height);
          }
          img.src = event.target.result;
      }

      reader.readAsDataURL(e.target.files[0]);
  }
   pick(event) {
    console.log(event.nativeEvent.layerX);
   let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
   let ctx = canvas.getContext('2d');
    var x = event.nativeEvent.layerX;
    var y = event.nativeEvent.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgba = 'rgba(' + data[0] + ', ' + data[1] +
               ', ' + data[2] + ', ' + (data[3] / 255) + ')';

    var hsl = rgbToHsl(data[0],data[1],data[2]);
    console.log(rgba);
    console.log(hsl);
    this.setState({
      activeColor:[hsl[0] * 360, hsl[1]*100, hsl[2]*100]
    })
    // this.state.activeColor =  rgba;
    // this.state.activeColor.textContent = rgba;
  }

  hoverColor(event){
   let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
   let ctx = canvas.getContext('2d');
    var x = event.nativeEvent.layerX;
    var y = event.nativeEvent.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgba = 'rgba(' + data[0] + ', ' + data[1] +
               ', ' + data[2] + ', ' + (data[3] / 255) + ')';

    var hsl = rgbToHsl(data[0],data[1],data[2]);
    console.log(rgba);
    console.log(hsl);
    this.setState({
      hoverColor:[hsl[0] * 360, hsl[1]*100, hsl[2]*100]
    })
  }
  averageColor(){
    let img = new Image();
    let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    let ctx = canvas.getContext('2d');
    var data;
    var color2 = document.getElementById('colorDisplay2');
    var avg = [0,0,0,0];
    var pCount = 0;
    for(var x = 0; x < ctx.canvas.width-10; x+=10){
      for(var y = 0; y < ctx.canvas.height-10; y+=10){
        var pixel = ctx.getImageData(x, y, 1, 1);
        // console.log(x + "  " + y);
        data = pixel.data;
        avg[0]=avg[0]+data[0];
        avg[1]=avg[1]+data[1];
        avg[2]=avg[2]+data[2];
        avg[3]=avg[3]+data[3];
        pCount += 1;
      }
    }
    avg = [avg[0]/pCount,avg[1]/pCount,avg[2]/pCount,avg[3]/pCount];
    var comp = rgbToHsl(Math.floor(avg[0]),+ Math.floor(avg[1]),Math.floor(avg[2]));
    console.log(comp)

    this.setState({
      activeColor:[comp[0] * 360,(comp[1]*100),(comp[2] *100)]
    });

  }

  toStringHsl(color){
    // console.log('hsl('+color[0]+','+color[1]+'%,'+color[2]+'%)');
    return ('hsl('+Math.floor(color[0])+','+Math.floor(color[1])+'%,'+Math.floor(color[2])+'%)');

  }
  toStringRgb(color){
    // console.log('hsl('+color[0]+','+color[1]+'%,'+color[2]+'%)');
   let rgb = hslToRgb(color[0]/360,color[1]/100,color[2]/100);
    return ('rgb:('+Math.floor(rgb[0])+','+Math.floor(rgb[1])+','+Math.floor(rgb[2])+')');

  }
  
  generateColors(){
    let comp = this.state.activeColor
    this.setState({
        genColor: [
        [(comp[0])+180,comp[1] ,comp[2]],
        [(comp[0])+120,comp[1],comp[2]],
        [(comp[0])-120,comp[1],comp[2]],
        [(comp[0])+30,comp[1],comp[2]],
        [(comp[0])-30,comp[1],comp[2]]]
        });
  }


}
function decimalToHexString(number)
{
    if (number < 0)
    {
        number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
}
/**
* Converts an RGB color value to HSL. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
* Assumes r, g, and b are contained in the set [0, 255] and
* returns h, s, and l in the set [0, 1].
*from https://gist.github.com/mjackson/5311256
*
* @param   Number  r       The red color value
* @param   Number  g       The green color value
* @param   Number  b       The blue color value
* @return  Array           The HSL representation
*/

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}
ReactDOM.render(<Swatch/>,  document.getElementById('root')
);
