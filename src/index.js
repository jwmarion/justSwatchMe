import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

class Swatch extends React.Component{
  constructor(){
    super();
    this.state = {
      currentPic: './2.png',
      avgColor: 'rgb(123,123,123)'
    };
  }

    componentDidMount() {
      let img = new Image();
      let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
      let ctx = canvas.getContext('2d');
      console.log(img);
      img.src = this.state.currentPic;
      ctx.drawImage(img, 0, 0);
      img.onload = function() {
        ctx.drawImage(img, 0, 0);
        img.style.display = 'none';
        // averageColor();
      };

    }
    // componentOnChange() {
    //   let img = new Image();
    //   let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    //   let ctx = canvas.getContext('2d');
    //   console.log(img);
    //   img.src = this.state.currentPic;
    //   ctx.drawImage(img, 0, 0);
    //   img.style.display = 'none';
    // }

  render() {
    var color = document.getElementById('colorDisplay');
    var avg = [0,0,0,0];
    var pCount = 0;

    return (
      <div>
        <div className="buttons">
          <button id="b1" type="button" name="button">Image 1</button>
          <button id="b2" type="button" name="button">Image 2</button>
          <button id="b3" type="button" name="button">Image 3</button>
          <button id="b4" type="button" name="button">Image 4</button>
          <button id="b5" type="button" name="button" onClick={()=>this.averageColor()} >Get Color</button>
        </div>

        <canvas ref="myCanvas" width="600" height="400"></canvas>
        <img id="my-image" src="" alt=""/>
        <img  src="" alt="" />

        <pre id="output"></pre>
        <div style={{backgroundColor: this.state.avgColor} }id="colorDisplay"></div>
        <div id="colorDisplay2">Average Color</div>
      </div>
    )
  }
  picSelect(value){

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
        console.log(x + "  " + y);
        data = pixel.data;
        avg[0]=avg[0]+data[0];
        avg[1]=avg[1]+data[1];
        avg[2]=avg[2]+data[2];
        avg[3]=avg[3]+data[3];
        pCount += 1;
      }
    }
    console.log(pCount);
    avg = [avg[0]/pCount,avg[1]/pCount,avg[2]/pCount,avg[3]/pCount];
    color2.style.background = 'rgba(' + avg[0] + ', ' + avg[1] + ', ' + avg[2] + ', ' + (avg[3] / 255) + ')';
    console.log(avg);
    $('#colorDisplay2').css('backgroundColor','rgba(' + Math.floor(avg[0]) + ', ' + Math.floor(avg[1]) + ', ' + Math.floor(avg[2]) + ', ' + (Math.floor(avg[3]) / 255) + ')');
    console.log('backgroundColor','rgba(' + Math.floor(avg[0]) + ', ' + Math.floor(avg[1]) + ', ' + Math.floor(avg[2]) + ', ' + (Math.floor(avg[3]) / 255) + ')');
  }
}
ReactDOM.render(<Swatch/>,  document.getElementById('root')
);
