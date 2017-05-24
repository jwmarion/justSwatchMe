import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Swatch extends React.Component{
  constructor(){
    super();
    this.state = {
      colorType: 'hsl',
      selected:[[0,0,100]],
      uSwatch: [[0,0,100]],
      hoverColor: [37, 100, 50],
      currentPic: './wheel.png',
      activeColor: [2, 92, 57],
      sliderValue: [2,92,57],
      genColor: [[37, 100, 50],[55,100,50],[123,100,50],[215,100,50],[275,100,50]],
      value: 10,
      userInfo: null

    };
  }
    componentDidUpdate(prevProps, prevState){
      if (prevState.activeColor !== this.state.activeColor ){
        this.generateColors();
      }
    }
    componentDidMount() {
      let rangeValue=[this.state.activeColor];
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
    const { value } = this.state
    let topRight;
    if (this.state.userInfo !== null){
      topRight = (
      <div className='topRight'>
      <h3>{'Welcome ' + this.state.userInfo.username}</h3>
       <button onClick={()=>this.props.logOut({user: this.state.uLog, pass: this.state.uPass})}>Log out!</button>
      </div>)
  }else{
      topRight = (
        <div className="topRight">
        <input onChange={(event)=>this.props.write(event.target.value,'uLog')}className="userLogin" type='text'/>
        <input onChange={(event)=>this.props.write(event.target.value,'pLog')} className="passLogin" type='text'/>
       <button>Sign Up!</button>
         <button onClick={()=>this.props.logIn({user: this.props.uLog, pass: this.props.uPass})}>Log in!</button>
         </div>

     )
    }
    return (
      <div>
      <div className="topBar">
        <div className="topLeft">
          <h1>
            just
            <span style={{color:this.toStringHsl(this.state.activeColor)}}>S</span>
            <span style={{color:this.toStringHsl(this.state.genColor[0])}}>W</span>
            <span style={{color:this.toStringHsl(this.state.genColor[1])}}>A</span>
            <span style={{color:this.toStringHsl(this.state.genColor[2])}}>T</span>
            <span style={{color:this.toStringHsl(this.state.genColor[3])}}>C</span>
            <span style={{color:this.toStringHsl(this.state.genColor[4])}}>H</span>
            .me
          </h1>
        </div>
        {topRight}
      </div>
        <div className="leftSide">
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
          </div>
          <div className="rightSide">
            <div className="colors">
              <div className="cd" id="colorDisplay2" onClick={()=>this.setSelected(-1)} style={{
                backgroundColor: this.toStringHsl(this.state.activeColor)}}>
                Active Color <br/>
                {this.toStringRgb(this.state.activeColor)}<br/>
                {this.toStringHsl(this.state.activeColor)}<br/>
                {this.toStringHex(this.state.activeColor)}
                </div>
                {}
              <div className="cd" id="colorDisplay3" onClick={()=>this.setSelected(0)} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[0])}}>
                Complementary Color<br/>
                {this.toStringRgb(this.state.genColor[0])}<br/>
                {this.toStringHsl(this.state.genColor[0])}<br/>
                {this.toStringHex(this.state.genColor[0])}
                </div>

              <div className="cd" id="colorDisplay4" onClick={()=>this.setSelected(1)} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[1])}}>
                split complementary 1<br/>
                {this.toStringRgb(this.state.genColor[1])}<br/>
                {this.toStringHsl(this.state.genColor[1])}<br/>
                {this.toStringHex(this.state.genColor[1])}
                </div>

              <div className="cd" id="colorDisplay5" onClick={()=>this.setSelected(2)} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[2])}}>
                split complementary 2<br/>
                {this.toStringRgb(this.state.genColor[2])}<br/>
                {this.toStringHsl(this.state.genColor[2])}<br/>
                {this.toStringHex(this.state.genColor[2])}
                </div>

              <div className="cd" id="colorDisplay6" onClick={()=>this.setSelected(3)} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[3])}}>
                Analogous 1<br/>
                {this.toStringRgb(this.state.genColor[3])}<br/>
                {this.toStringHsl(this.state.genColor[3])}<br/>
                {this.toStringHex(this.state.genColor[3])}
                </div>

              <div className="cd" id="colorDisplay7" onClick={()=>this.setSelected(4)} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[4])}}>
                Analogous 2<br/>
                {this.toStringRgb(this.state.genColor[4])}<br/>
                {this.toStringHsl(this.state.genColor[4])}<br/>
                {this.toStringHex(this.state.genColor[4])}
                </div>
            </div>

          <div className="sliders">
          <input id="slider1"
            type="range"
            value={this.state.activeColor[0]}
            min={0}
            max={this.state.colorType === 'hsl'?360:255}
            onInput={(event)=>{this.sliderChange(0,event)}}
            onChange={(event)=>{this.sliderChange(0,event)}}

            step={1} />
          <input id="slider2"
            type="range"
            value={this.state.activeColor[1]}
            min={0}
            max={this.state.colorType === 'hsl'?100:255}
            onInput={(event)=>{this.sliderChange(1,event)}}
            onChange={(event)=>{this.sliderChange(1,event)}}
            step={1} />
          <input id="slider3"
            type="range"
            value={this.state.activeColor[2]}
            min={0}
            max={this.state.colorType === 'hsl'?100:255}
            onInput={(event)=>{this.sliderChange(2,event)}}
            onChange={(event)=>{this.sliderChange(2,event)}}
            step={1} />
            </div>

          <div className="swatchArea">
            <div className="userSwatch">
              {this.state.uSwatch.map((val,i)=>
                 <div className="cd" onClick={()=>this.select(i)} style={{
                   backgroundColor: this.toStringHsl(this.state.uSwatch[i])}} key={i}>
                   {this.toStringRgb(this.state.uSwatch[i])}<br/>
                   {this.toStringHsl(this.state.uSwatch[i])}<br/>
                   {this.toStringHex(this.state.uSwatch[i])}
                 </div>)}
            </div>

            <div className="slideMgmt">
              <button onClick={()=>this.addRemoveTiles(1)}>+</button>
              <button onClick={()=>this.addRemoveTiles(-1)}>-</button>
            </div>
          </div>
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
     let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
     let ctx = canvas.getContext('2d');
      var x = event.nativeEvent.layerX;
      var y = event.nativeEvent.layerY;
      var pixel = ctx.getImageData(x, y, 1, 1);
      var data = pixel.data;
      var rgba = 'rgba(' + data[0] + ', ' + data[1] +
                 ', ' + data[2] + ', ' + (data[3] / 255) + ')';

      var hsl = rgbToHsl(data[0],data[1],data[2]);
      this.setState({
        activeColor:[hsl[0] * 360, hsl[1]*100, hsl[2]*100]
    })
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
    this.setState({
      hoverColor:[hsl[0] * 360, hsl[1]*100, hsl[2]*100]
    });
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
    this.setState({
      activeColor:[(comp[0] * 360),(comp[1]*100),(comp[2] *100)]
    });
  }

  setSelected(value){
    if (value === -1){
      this.setState({
        selected: this.state.activeColor
      })
    }
    else{this.setState({
      selected: this.state.genColor[value]
    })}
  };

  select(value){
    let temp = this.state.uSwatch;
    temp[value] = this.state.selected;
    this.setState({
      uSwatch: temp
    });
  }

  toStringHsl(color){
    return ('hsl('+ Math.floor(color[0])+','+Math.floor(color[1])+'%,'+Math.floor(color[2])+'%)');
  }

  toStringRgb(color){
   let rgb = hslToRgb(color[0]/360,color[1]/100,color[2]/100);
    return ('rgb('+Math.floor(rgb[0])+','+Math.floor(rgb[1])+','+Math.floor(rgb[2])+')');
  }

  toStringHex(color){
    let rgb = hslToRgb(color[0]/360,color[1]/100,color[2]/100);
    let hex = (Math.floor(rgb[0])).toString(16).toUpperCase()+(Math.floor(rgb[1])).toString(16).toUpperCase()+(Math.floor(rgb[2])).toString(16).toUpperCase();
    return ('Hex:#'+hex);
  }

  addRemoveTiles(value){
    let temp = this.state.uSwatch;
    if (value == -1){
      temp.pop();
    } else{
      let pushed = temp.push([0,0,100]);
    }
    this.setState({
      uSwatch: temp
    });
  }

  sliderChange(value,event){
    let temp = this.state.activeColor;
    temp[value] = event.target.value;
    this.setState({
      activeColor: temp
    });
    this.generateColors();
  }

  generateColors(){
    let comp = this.state.activeColor;
    let output = [
    [parseInt(comp[0])+parseInt(180),comp[1] ,comp[2]],
    [parseInt(comp[0])+parseInt(120),comp[1],comp[2]],
    [parseInt(comp[0])-parseInt(120),comp[1],comp[2]],
    [parseInt(comp[0])+parseInt(30),comp[1],comp[2]],
    [parseInt(comp[0])-parseInt(30),comp[1],comp[2]]];
    let newOutput = output.map((e)=>{
      let t = e[0]
      if(t < 0){
        t += 360;
      }
      else if (e[0] > 360){
        t -= 360;
      }
      return [t,e[1],e[2]];
    })
    this.setState({
        genColor: newOutput
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
