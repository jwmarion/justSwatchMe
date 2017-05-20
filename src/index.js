import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

class Swatch extends React.Component{
  constructor(){
    super();
    this.state = {
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
          <button id="b1" type="button" name="button" onClick={()=>this.changePic(1)}>Image 1</button>
          <button id="b2" type="button" name="button" onClick={()=>this.changePic(2)}>Image 2</button>
          <button id="b3" type="button" name="button" onClick={()=>this.changePic(3)}>Image 3</button>
          <button id="b4" type="button" name="button" onClick={()=>this.changePic(4)}>Image 4</button>
          <button id="b5" type="button" name="button" onClick={()=>this.averageColor()} >Get Average Color</button>

        <input type="file" id="imageLoader" name="imageLoader" onChange={(event)=>
          { this.handleImage(event) }}
          onClick={(event)=> { event.target.value = null
          }}/>
            </div>
        <canvas ref="myCanvas" className="myCanvas"width="400" height="300" onClick={(event)=>this.pick(event)}></canvas>
        <img id="my-image" src="" alt=""/>

        <div className="colors">
          <div className="cd" id="colorDisplay2" style={{backgroundColor: this.toStringHsl(this.state.activeColor)}}>Average Color</div>
          <div className="cd" id="colorDisplay3" style={{backgroundColor: this.toStringHsl(this.state.genColor[0])}}>Complementary Color</div>
          <div className="cd" id="colorDisplay4" style={{backgroundColor: this.toStringHsl(this.state.genColor[1])}}>split complementary 1</div>
          <div className="cd" id="colorDisplay5" style={{backgroundColor: this.toStringHsl(this.state.genColor[2])}}>split complementary 2</div>
          <div className="cd" id="colorDisplay6" style={{backgroundColor: this.toStringHsl(this.state.genColor[3])}}>Analogous 1</div>
          <div className="cd" id="colorDisplay7" style={{backgroundColor: this.toStringHsl(this.state.genColor[4])}}>Analogous 2</div>

          <div className="cd" id="colorDisplay8" style={{backgroundColor: this.toStringHsl(this.state.activeColor)}}>Average Color</div>
          <div className="cd" id="colorDisplay9" style={{backgroundColor: this.toStringHsl(this.state.genColor[0])}}>Complementary Color</div>
          <div className="cd" id="colorDisplay10" style={{backgroundColor: this.toStringHsl(this.state.genColor[1])}}>split complementary 1</div>
          <div className="cd" id="colorDisplay11" style={{backgroundColor: this.toStringHsl(this.state.genColor[2])}}>split complementary 2</div>
          <div className="cd" id="colorDisplay12" style={{backgroundColor: this.toStringHsl(this.state.genColor[3])}}>Analogous 1</div>
          <div className="cd" id="colorDisplay13" style={{backgroundColor: this.toStringHsl(this.state.genColor[4])}}>Analogous 2</div>
          <div className="cd" id="colorDisplay14" style={{backgroundColor: this.toStringHsl(this.state.activeColor)}}>Average Color</div>
          <div className="cd" id="colorDisplay15" style={{backgroundColor: this.toStringHsl(this.state.genColor[0])}}>Complementary Color</div>
          <div className="cd" id="colorDisplay16" style={{backgroundColor: this.toStringHsl(this.state.genColor[1])}}>split complementary 1</div>
          <div className="cd" id="colorDisplay17" style={{backgroundColor: this.toStringHsl(this.state.genColor[2])}}>split complementary 2</div>
          <div className="cd" id="colorDisplay18" style={{backgroundColor: this.toStringHsl(this.state.genColor[3])}}>Analogous 1</div>
          <div className="cd" id="colorDisplay19" style={{backgroundColor: this.toStringHsl(this.state.genColor[4])}}>Analogous 2</div>
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
    return ('hsl('+color[0]+','+color[1]+'%,'+color[2]+'%)');

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
ReactDOM.render(<Swatch/>,  document.getElementById('root')
);
