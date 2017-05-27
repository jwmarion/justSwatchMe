import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';
// import Sidebar from 'react-sidebar';


// const styles = {
//   contentHeaderMenuLink: {
//     textDecoration: 'none',
//     color: 'white',
//     padding: 8,
//   },
//   content: {
//     padding: '16px'
//   },
//   sidebar:{
//     width: '300px',
//     backgroundColor: 'white'
//   }
// };

class Swatch extends React.Component{
  constructor(){

    super();
    this.state = {
      open: false,
      userInfo: null,
      colorType: 'hsl',
      selected:[[0,0,100]],
      uSwatch: [[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100]],
      wSwatch: [[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100]],
      sbSwatch: [[[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100]],[[37, 100, 50],[2, 92, 57],[55,100,50],[123,100,50],[215,100,50],[275,100,50]]],
      hoverColor: [37, 100, 50],
      currentPic: './wheel.png',
      activeColor: [2, 92, 57],
      rgbColor: [246,51,44],
      genColor: [[37, 100, 50],[55,100,50],[123,100,50],[215,100,50],[275,100,50]],
      value: 10,
      pLog: null,
      uLog: null

    };
    // this.onSetOpen = this.onSetOpen.bind(this);
  }


    componentDidUpdate(prevProps, prevState){
      if (prevState.activeColor !== this.state.activeColor ){
        this.generateColors();
      }
      // if (prevState.sbSwatch !== this.state.sbSwatch ){
      //   this.getTopSwatches();
      // }
    }

    componentDidMount() {
      let rangeValue=[this.state.activeColor];
      let img = new Image();
      let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
      let ctx = canvas.getContext('2d');
      this.getTopSwatches();
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
    let topRight;
    if (this.state.userInfo !== null){
      topRight = (
      <div className='topRight'>
      <h3>{'Welcome ' + this.state.userInfo.username}</h3>
       <button onClick={()=>(this.setState({userInfo: null}))}>Log out!</button>
      </div>)
    }else{
      topRight = (
        <div className="topRight">
        <input onChange={(event)=>this.write(event.target.value,'uLog')}className="userLogin" type='text'/>
        <input onChange={(event)=>this.write(event.target.value,'pLog')} className="passLogin" type='password'/>
       <button>Sign Up!</button>
         <button onClick={()=>this.logIn({username: this.state.uLog, password: this.state.pLog})}>Log in!</button>
         </div>

     )
    }

    let sidebar;
    if(this.state.userInfo != null && this.state.sbSwatch[0] != null){
      let keys = Object.keys(JSON.parse(this.state.sbSwatch[0].colors))
      console.log(keys[0]);
      console.log(keys);
      let value = JSON.parse(this.state.sbSwatch[0].colors)[keys[0]];
      console.log(value);
      }
    if(this.state.open && this.state.userInfo !=null ){

      sidebar=(
        <div className="sidebar">
        <h2>Your Swatches</h2>
        <button onClick={()=>this.setState({open: false})}>X</button>
        {this.state.sbSwatch.map((swatch,j)=>
          <div key={j}>
          {Object.keys(JSON.parse(swatch.colors)).map((val,i)=>
            <div key={i}className="sideColor" style={{backgroundColor: this.toStringHsl(JSON.parse(swatch.colors)[val])}}>
              </div>
          )}
          <button onClick={()=>this.setSwatch(j)}>Set Swatch</button><button>Delete</button>
          </div>
      )}
      </div>
    )
    }
    return (
      <div>
//sidebar
      {sidebar}
//topbar
      <div className="topBar">
        <div className="topLeft">
//title
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
          <button onClick={()=>(this.setState({open: true}))}>Swatches</button>
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
              <div className="cd" id="colorDisplay2" onClick={()=>this.setSelected(-1,'g')} style={{
                backgroundColor: this.toStringHsl(this.state.activeColor)}}>
                Active Color <br/>
                {this.toStringRgb(this.state.activeColor)}<br/>
                {this.toStringHsl(this.state.activeColor)}<br/>
                {this.toStringHex(this.state.activeColor)}
                </div>
                {}
              <div className="cd" id="colorDisplay3" onClick={()=>this.setSelected(0,'g')} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[0])}}>
                Complementary Color<br/>
                {this.toStringRgb(this.state.genColor[0])}<br/>
                {this.toStringHsl(this.state.genColor[0])}<br/>
                {this.toStringHex(this.state.genColor[0])}
                </div>

              <div className="cd" id="colorDisplay4" onClick={()=>this.setSelected(1,'g')} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[1])}}>
                split complementary 1<br/>
                {this.toStringRgb(this.state.genColor[1])}<br/>
                {this.toStringHsl(this.state.genColor[1])}<br/>
                {this.toStringHex(this.state.genColor[1])}
                </div>

              <div className="cd" id="colorDisplay5" onClick={()=>this.setSelected(2,'g')} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[2])}}>
                split complementary 2<br/>
                {this.toStringRgb(this.state.genColor[2])}<br/>
                {this.toStringHsl(this.state.genColor[2])}<br/>
                {this.toStringHex(this.state.genColor[2])}
                </div>

              <div className="cd" id="colorDisplay6" onClick={()=>this.setSelected(3,'g')} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[3])}}>
                Analogous 1<br/>
                {this.toStringRgb(this.state.genColor[3])}<br/>
                {this.toStringHsl(this.state.genColor[3])}<br/>
                {this.toStringHex(this.state.genColor[3])}
                </div>

              <div className="cd" id="colorDisplay7" onClick={()=>this.setSelected(4,'g')} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[4])}}>
                Analogous 2<br/>
                {this.toStringRgb(this.state.genColor[4])}<br/>
                {this.toStringHsl(this.state.genColor[4])}<br/>
                {this.toStringHex(this.state.genColor[4])}
                </div>
            </div>
            <button style={{float: 'left',clear:'left'}} onClick={()=>this.copySwatch('g')}>copy</button>
//sliders
          <div className="sliders">
            <div className="slider">
            <label>H</label>
              <input
                type="range"
                value={this.state.activeColor[0]}
                min={0}
                max={360}
                onInput={(event)=>{this.sliderChange(0,event.target.value)}}
                onChange={(event)=>{this.sliderChange(0,event.target.value)}}
                step={1} />
              <label>S</label>
              <input
                type="range"
                value={this.state.activeColor[1]}
                min={0}
                max={100}
                onInput={(event)=>{this.sliderChange(1,event.target.value)}}
                onChange={(event)=>{this.sliderChange(1,event.target.value)}}
                step={1} />
              <label>L</label>
              <input
                type="range"
                value={this.state.activeColor[2]}
                min={0}
                max={100}
                onInput={(event)=>{this.sliderChange(2,event.target.value)}}
                onChange={(event)=>{this.sliderChange(2,event.target.value)}}
                step={1} />
                </div>
            </div>
            <div className="slider">
            <label>R</label>
              <input
                type="range"
                value={this.state.rgbColor[0]}
                min={0}
                max={255}
                onInput={(event)=>{this.sliderChange(3,event.target.value)}}
                onChange={(event)=>{this.sliderChange(3,event.target.value)}}
                step={1} />
              <label>G</label>
              <input
                type="range"
                value={this.state.rgbColor[1]}
                min={0}
                max={255}
                onInput={(event)=>{this.sliderChange(4,event.target.value)}}
                onChange={(event)=>{this.sliderChange(4,event.target.value)}}
                step={1} />
              <label>B</label>
              <input
                type="range"
                value={this.state.rgbColor[2]}
                min={0}
                max={255}
                onInput={(event)=>{this.sliderChange(5,event.target.value)}}
                onChange={(event)=>{this.sliderChange(5,event.target.value)}}
                step={1} />
              </div>
            </div>
            <button onClick={()=>console.log(hslToRgb(this.state.activeColor[0]/360,this.state.activeColor[1]/100,this.state.activeColor[2]/100))}>TEST</button>
          <div className="swatchArea">

            <div className="activeSwatch">
            {this.state.uSwatch.map((val,i)=>
               <div className="cd" onClick={()=>this.setSelected(i,'a')} style={{
                 backgroundColor: this.toStringHsl(this.state.wSwatch[i])}} key={i}>
                 {this.toStringRgb(this.state.wSwatch[i])}<br/>
                 {this.toStringHsl(this.state.wSwatch[i])}<br/>
                 {this.toStringHex(this.state.wSwatch[i])}
               </div>)}
            </div>
            <button onClick={()=>this.copySwatch('a')}>copy</button>


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
              <button onClick={()=>this.uploadSwatch()}>upload</button>
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

  getTopSwatches(){
    let url = 'http://localhost:3003/api/swatches';
    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data) {
          console.log(data);
        if(data !== null){
          this.setState({

            sbSwatch: data
          });}
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
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
      let rgbColor=hslToRgb(hsl[0],hsl[1],hsl[2]);
      this.setState({
        activeColor:[hsl[0] * 360, hsl[1]*100, hsl[2]*100],
        rgbColor: rgbColor
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
    let color = [(comp[0] * 360),(comp[1]*100),(comp[2] *100)]
    let rgbColor = hslToRgb(comp[0],comp[1],comp[2]);
    this.setState({
      activeColor: color,
      rgbColor: rgbColor
    });
  }

  setSelected(value,type){
    if (type === 'g'){
      if (value === -1){
        this.setState({
          selected: this.state.activeColor
        })
      }
      else{
        this.setState({
          selected: this.state.genColor[value]
      })}
    } else {
      this.setState({
        selected: this.state.wSwatch[value]
      })
    }
  }
  copySwatch(type){
    let swatch;
    if(type === 'g'){
      swatch = [this.state.activeColor];
      this.state.genColor.map((value)=>{
        swatch.push(value);
      });
      console.log(swatch);
    }
    else if (type === 'a'){
      swatch = this.state.wSwatch;
    }
    this.setState({
      uSwatch: swatch
    })
  }
  setSwatch(swatch){

    let keys = Object.keys(JSON.parse(this.state.sbSwatch[0].colors));
    let value = JSON.parse(this.state.sbSwatch[0].colors)[keys[0]];
    console.log(value);

    let r = [];
    keys.map((val,i)=>{
      r.push(JSON.parse(this.state.sbSwatch[swatch].colors)[val])
    });

    this.setState({
      wSwatch:r
    });
  }

  logIn(data){
    console.log(data);
    let url = 'http://localhost:3003/api/user/login';
    $.ajax({
        type: 'POST',
        url: url,
       contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        cache: false,
        success: function(data) {
          this.setState({userInfo: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }




  uploadSwatch(){
    let url = 'http://localhost:3003/api/user/postswatch';
    $.ajax({
        type: 'POST',
        url: url,
       contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify({
          user: this.state.userInfo.id,
          swatch:({
            color1: this.state.uSwatch[0],
            color2: this.state.uSwatch[1],
            color3: this.state.uSwatch[2],
            color4: this.state.uSwatch[3],
            color5: this.state.uSwatch[4],
            color6: this.state.uSwatch[5],
          })
        }),
        cache: false,
        success: function(data) {
          console.log('success');
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }




  write(value, type){
    if (type === 'pLog'){
      this.setState({
        pLog: value
      });
    }
    else if (type === 'uLog'){
      this.setState({
        uLog: value
      });
    }
  }

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
    if (value > 2){
      value -= 3;
      temp = hslToRgb(temp[0]/360,temp[1]/100,temp[2]/100);
      temp[value] = event;
      temp = rgbToHsl(temp[0],temp[1],temp[2]);
      temp= [temp[0]*360, temp[1]*100, temp[2]*100];
    }
    else{
      temp[value] = event;
    }
    let rgbColor = hslToRgb(temp[0]/360,temp[1]/100,temp[2]/100);
    this.setState({
      activeColor: temp,
      rgbColor: rgbColor
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

  return [h, s, l ];
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
