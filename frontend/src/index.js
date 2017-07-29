import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';
import BASEURL from './baseurl';

class Swatch extends React.Component{
  constructor(){

    super();
    this.state = {
      open: false,
      signingUp: false,
      swatchPage:0,
      userInfo: null,
      colorType: 'hsl',
      pageType: 'top',
      topSwatches:[[[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100]],[[37, 100, 50],[2, 92, 57],[55,100,50],[123,100,50],[215,100,50],[275,100,50]]],
      selected:[0,0,100],
      uSwatch: [[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100]],
      wSwatch: null,
      userSwatch: [[[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100],[0,0,100]],[[37, 100, 50],[2, 92, 57],[55,100,50],[123,100,50],[215,100,50],[275,100,50]]],
      hoverColor: [37, 100, 50],
      currentPic: './wheel.png',
      activeColor: [2, 92, 57],
      rgbColor: [246,51,44],
      genColor: [[37, 100, 50],[55,100,50],[123,100,50],[215,100,50],[275,100,50]],
      value: 10,
      pLog: null,
      uLog: null,
      npLog: null,
      nuLog: null,
      cpLog: null

    };
    // this.onSetOpen = this.onSetOpen.bind(this);
  }


    componentDidUpdate(prevProps, prevState){
      if (prevState.activeColor !== this.state.activeColor ){
        this.generateColors();
      }
      if( prevState.swatchPage !== this.state.swatchPage || prevState.pageType !== this.state.pageType){
        if(this.state.pageType === 'top'){
          this.getTopSwatches();
        } else if
        (this.state.pageType === 'fav'){
          this.getFavoriteSwatches();
        }
        else{
          this.getUserSwatches();
        }
      }

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
        img.width = 400;
        img.height = 400 *ratio;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, (canvas.width / 2) - (img.width / 2), 0, img.width, canvas.height);
      };
    }

  render() {
    let topRight;
    let activeSwatch;
    let next;
    let prev;


    if(this.state.swatchPage > 0){
      prev = <button onClick={()=>this.changePage(-1)}>prev</button>;
    }
    if(this.state.topSwatches.length == 10){
      next = <button onClick={()=>this.changePage(1)}>Next</button>
    }


    if (this.state.wSwatch != null){
    activeSwatch =  <div className="activeSwatch">
  <div>
  <h2>  Loaded Swatch</h2>
      {this.state.uSwatch.map((val,i)=>
         <div className="cd" onClick={()=>this.setSelected(i,'a')} style={{
           backgroundColor: this.toStringHsl(this.state.wSwatch[i])}} key={i}>
           {this.toStringRgb(this.state.wSwatch[i])}<br/>
           {this.toStringHsl(this.state.wSwatch[i])}<br/>
           {this.toStringHex(this.state.wSwatch[i])}
         </div>)}
      </div>
        <button onClick={()=>this.copySwatch('a')}>copy</button>
      </div>
    }




    if (this.state.userInfo !== null){
      topRight = (
      <div className='topRight'>
      <h3>{'Welcome ' + this.state.userInfo.username}</h3>
       <button onClick={()=>(this.setState({userInfo: null}))}>Log out!</button>
      </div>)
    }else{
      topRight = (
        <div className="topRight">
          <div className="login">
            <input onChange={(event)=>this.write(event.target.value,'uLog')} className="userLogin" style={{float: 'left'}} placeholder="Username" type='text'/>
            <input onChange={(event)=>this.write(event.target.value,'pLog')} className="passLogin" style={{float: 'left'}} placeholder="Password" type='password'/>
          </div>
       <button onClick={()=>this.setState({signingUp:true})}>Create an account!</button>
         <button onClick={()=>this.logIn({username: this.state.uLog, password: this.state.pLog})}>Log in!</button>
         </div>

     )
    }

    let sidebar;
    let signUpBox;
    let logInButtons;
    let uploadButton;


    if (this.state.signingUp === true){
    signUpBox =
    <div className='signUpBox'>
        <div>
        <h1>Enter a name and password</h1>
        </div>

        <div style={{float: 'left', width: '100%'}}>
          <h2 style={{float: 'left'}}>Name:</h2>
          <input onChange={(event)=>this.write(event.target.value,'nuLog')} className="userCreate" style={{float: 'left'}} placeholder="Username" type='text'/>
        </div>

        <div style={{float: 'left', clear: 'left', width: '100%'}}>
          <h2 style={{float: 'left'}}>Password:</h2>
          <input onChange={(event)=>this.write(event.target.value,'npLog')} className="passCreate" style={{float: 'left'}} placeholder="Password" type='password'/>
        </div>

        <div style={{float: 'left', clear: 'left', width: '100%'}}>
          <h2 style={{float: 'left'}}>Confirm Password:</h2>
          <input onChange={(event)=>this.write(event.target.value,'cpLog')} className="confPassCreate" style={{float: 'left'}} placeholder="Confirm Password" type='password'/>
        </div>
        <div onClick={()=>this.setState({signingUp:false})}>
          <p>[x] close</p>
        </div>

    </div>
    }

    if (this.state.userInfo != null){
    uploadButton=<button onClick={()=>this.uploadSwatch()}>upload</button>;
    logInButtons=
    <div className='logInButtons'>
    <button onClick={()=>this.setState({pageType:'user', swatchPage: 0})}>Saved</button>
      <button onClick={()=>this.setState({pageType:'fav', swatchPage: 0})}>Favorites</button>
      </div>
    }
    // if(this.state.pageType === 'user'){
    //   delete =
    // }
    if(this.state.userInfo != null && this.state.topSwatches[0] != null){
      let keys = Object.keys(JSON.parse(this.state.topSwatches[0].colors))

      let value = JSON.parse(this.state.topSwatches[0].colors)[keys[0]];

      }
    if(this.state.open){
      sidebar=(
        <div className="sidebar">
        <button onClick={()=>this.setState({pageType:'top', swatchPage: 0})}>Top</button>
      {logInButtons}

        {this.state.topSwatches.map((swatch,j)=>
          <div className="sideItem" key={j}>
          {Object.keys(JSON.parse(swatch.colors)).map((val,i)=>
            <div key={i}className="sideColor" style={{backgroundColor: this.toStringHsl(JSON.parse(swatch.colors)[val])}}>
              </div>
          )}
          <button onClick={()=>this.setSwatch(j)}>Set Swatch</button>
          {(this.state.pageType==='user'?(<button onClick={()=>this.deleteSwatch(swatch.id)}>Delete</button>):null)}
          <button onClick={()=>this.setFavorite([this.state.userInfo.id,swatch.id])}>Favorite</button>

          </div>
      )}
      {prev}
      {next}


      </div>
    )
    }
    return (
      <div>
      {signUpBox}
        {sidebar}
      <div className="topBar">
            {topRight}
        <div className="topLeft">
          <div className="burger" onClick={()=>this.handleSideBar()}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="title">
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
        </div>
      </div>
        <div className="leftSide">
          <div className="buttons">
            <button id="b1" type="button" name="button" onClick={()=>this.setWheel()}>Color Wheel</button>
            <button id="b5" type="button" name="button" onClick={()=>this.averageColor()} >Get Average Color</button>
            <input type="file" id="imageLoader" name="imageLoader" onChange={(event)=>
              { this.handleImage(event) }}
              onClick={(event)=> { event.target.value = null
              }}/>
          </div>
          <canvas ref="myCanvas" className="myCanvas"width="400" height="300" onMouseMove={(event)=>this.hoverColor(event)} onClick={(event)=>this.pick(event)}></canvas>
          <img id="my-image" src="" alt=""/>
          <div className="sliders">
            <div className="hoverColor"  style={{
              backgroundColor: this.toStringHsl(this.state.hoverColor)}}></div>
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
          </div>
          <div className="rightSide">
            <div className="colors">
            <h2>  Generated Swatch</h2>
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
                Split Complementary 1<br/>
                {this.toStringRgb(this.state.genColor[1])}<br/>
                {this.toStringHsl(this.state.genColor[1])}<br/>
                {this.toStringHex(this.state.genColor[1])}
                </div>

              <div className="cd" id="colorDisplay5" onClick={()=>this.setSelected(2,'g')} style={{
                backgroundColor: this.toStringHsl(this.state.genColor[2])}}>
                Split Complementary 2<br/>
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
          <div className="swatchArea">

          {activeSwatch}

            <div className="userSwatch">
            <h2>  Active Swatch</h2>
              {this.state.uSwatch.map((val,i)=>
                 <div className="cd" onClick={()=>this.select(i)} style={{
                   backgroundColor: this.toStringHsl(this.state.uSwatch[i])}} key={i}>
                   {this.toStringRgb(this.state.uSwatch[i])}<br/>
                   {this.toStringHsl(this.state.uSwatch[i])}<br/>
                   {this.toStringHex(this.state.uSwatch[i])}
                 </div>)}
            </div>


            <div className="slideMgmt">
              {uploadButton}
            </div>
            </div>

        </div>
      </div>
    )
  }
  handleSideBar(){
    let r;
    if(this.state.open){
      r = false
    } else{ r = true;}
    this.setState({
      open: r
    });
  }
  changePage(val){
    this.setState({
      swatchPage: this.state.swatchPage + val
    });
    let check = this.state.pageType;
    if( check = 'top'){
      this.getTopSwatches();
    }else if(check = 'user'){
      this.getUserSwatches();
    }else if(check = 'fav'){
      this.getFavoriteSwatches();
    }

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
    let url = BASEURL+'/api/swatches_top';
    let page = this.state.swatchPage;

    $.ajax({
        type: 'POST',
        url: url,
        cache: false,
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          page: page
        }),
        success: function(data) {

        if(data !== null){

          this.setState({
            topSwatches: data
          });}
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  }

  getUserSwatches(){
    let url = BASEURL+'/api/swatches_user';
    $.ajax({
        type: 'POST',
        url: url,
        cache: false,
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          userid: this.state.userInfo.id,
          page: this.state.swatchPage
        }),
        success: function(data) {

        if(data !== null){
          this.setState({
            topSwatches: data
          });}
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  }
  //{/*create account*/}
  signUp(){
    let url = BASEURL+'/api/user/signup';
    $.ajax({
        type: 'POST',
        url: url,
       contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify({
          username: this.state.uLog,
          password: this.state.pLog
        }),
        cache: false,
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });

  }
//  {/*collects swatches favorited by user*/}
  getFavoriteSwatches(){
    let url = BASEURL+'/api/swatches_favorite';
    $.ajax({
        type: 'POST',
        url: url,
        cache: false,
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          userid: this.state.userInfo.id,
          page: this.state.swatchPage
        }),
        success: function(data) {

        if(data !== null){
          this.setState({
            topSwatches: data
          });}
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
  }
//{/*draw image*/}
  handleImage(e){
    var imageLoader = document.getElementById('imageLoader');
    let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    reader.onload = function(event){
      var img = new Image();
      img.onload = function(){
        let ratio = this.height / this.width;
        img.width = 400;
        img.height = 400 *ratio;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, (canvas.width / 2) - (img.width / 2), 0, img.width, canvas.height);
      }
      img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }
//{/*handles pulling of color from canvas*/}
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
  //{/*pulls average color of picture*/}
  averageColor(){
    let img = new Image();
    let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    let ctx = canvas.getContext('2d');
    var data;
    var color2 = document.getElementById('colorDisplay2');
    var avg = [0,0,0,0];
    var pCount = 0;
    for(var x = 0; x < ctx.canvas.width-5; x+=5){
      for(var y = 0; y < ctx.canvas.height-5; y+=5){
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
//{/*sets last clicked color*/}
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
  //{/*copies swatch to user swatch*/}
  copySwatch(type){
    let swatch;
    if(type === 'g'){
      swatch = [this.state.activeColor];
      this.state.genColor.map((value)=>{
        swatch.push(value);
      });
    }
    else if (type === 'a'){
      swatch = this.state.wSwatch;
    }
    this.setState({
      uSwatch: swatch
    })
  }
  //{/*sets selected sidebar swatch*/}
  setSwatch(swatch){

    let keys = Object.keys(JSON.parse(this.state.topSwatches[0].colors));
    let value = JSON.parse(this.state.topSwatches[0].colors)[keys[0]];

    let r = [];
    keys.map((val,i)=>{
      r.push(JSON.parse(this.state.topSwatches[swatch].colors)[val])
    });

    this.setState({
      wSwatch:r
    });
  }
//  {/*resets color wheel*/}
  setWheel(){
    let img = new Image();
    let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    let ctx = canvas.getContext('2d');
    this.getTopSwatches();
    img.src = './wheel.png';
    ctx.drawImage(img, 0, 0);
    img.onload = function(){
      let ratio = this.height / this.width;
      img.width = 400;
      img.height = 400 *ratio;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, (canvas.width / 2) - (img.width / 2), 0, img.width, canvas.height);
    };
  }
//{/*user log in*/}
  logIn(data){

    let url = BASEURL+'/api/user/login';
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
//{/*sets swatch as a favorite*/}
  setFavorite(data){
    let url = BASEURL+'/api/user/set_favorite';
    $.ajax({
        type: 'POST',
        url: url,
       contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify({//userid/swatchi
          userid: data[0],
          swatchid: data[1]
        }),
        cache: false,
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
//{/*deletes saved user swatch*/}
  deleteSwatch(swatch){
    let url = BASEURL+'/api/delete_swatch';
    $.ajax({
        type: 'POST',
        url: url,
       contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify({
          swatchid: swatch
        }),
        cache: false,
        success: function(data) {
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

//{/*uploads current swatch*/}
  uploadSwatch(){
    let url = BASEURL+'/api/user/postswatch';
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
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }



//{/*handles pass and login*/}
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
//{/*outputs css of color*/}
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
//{/*adds and removes swatches. deprecated*/}
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
//{/*handles sliders*/}
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
//{/*selects analogous and complementary colors*/}
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
