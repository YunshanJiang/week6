function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    
    
  }
  
  function draw() {
    if (isloaded)
    {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          
          let mapTempValue = map(i,0, height,maxTemp,minTemp);
          //console.log(mapTempValue);
          let c = calColor(mapTempValue);
          set(j, i, c);
        }
      }
      updatePixels();
      //background(currentTemp);
      isloaded = false;
    }
  }

  function calColor(m){
    if (m > 0){
      let r = map(m,0, highestTemp,0,255);
      //console.log(r);
      return color(r, 0, 0);
    }
    else{
      let b = map(m,lowestTemp, 0,255,0);
      return color(0, 0, b);
    }
  }