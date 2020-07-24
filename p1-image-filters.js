let robot = lib220.loadImageFromURL(
//    'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/38765839_440331423141105_8304495158611673088_n.jpg?_nc_cat=106&_nc_ht=scontent.fzty2-1.fna&oh=ba8f1e612878337e57fed7f5d26d8e17&oe=5CF5B1DE');
    'https://people.cs.umass.edu/~joydeepb/robot.jpg');

robot.show();
removeBlueAndGreen(robot).show();
makeGrayscale(robot).show();
highlightEdges(robot).show();
blur(robot).show();
console.log("Order of images: original, redscale, grayscale, highlight edges, and blur.");
console.log("If you are interested in seeing how the code works, check out my github for CS220 at:");
console.log("https://github.com/ETrimbs?tab=repositories");


//blur(a:image):image
function blur(a){
  let out = a.copy();
  for (let i = 0; i < out.width; ++i) {
    for (let j = 0; j < out.height; ++j) {
      let r = 0; 
      let g = 0;
      let b = 0;
      for(let k = i-5; k <= i + 5; ++k){
        let p = null;
        if(k < 0){
          p = a.getPixel(0, j);
        }
        else if(k >= out.width){
          p = a.getPixel(out.width-1, j)
        }
        else{
          p = a.getPixel(k, j);
        }
        r += p[0];
        g += p[1];
        b += p[2];
      }

      out.setPixel(i, j, [r/11,g/11,b/11]);
    }
  }
  return out;
}

//highlightEdges(a:image):image
function highlightEdges(a){
  let out = a.copy();
  for (let i = 0; i < out.width; ++i) {
    for (let j = 0; j < out.height; ++j) {
      let b = a.getPixel(i,j);
      let c = null;
      if(i === out.width-1){
        c = a.getPixel(i-1,j);
      }else{
        c = a.getPixel(i+1,j);
      }
      let m1 = (b[0] + b[1] + b[2]) / 3;
      let m2 = (c[0] + c[1] + c[2]) / 3;
      let co = Math.abs(m1 - m2);
      out.setPixel(i, j, [co,co,co]);
    }
  }
  return out;
}

//makeGreyscale(a:image):image
function makeGrayscale(a){
  let out = a.copy();
  for (let i = 0; i < out.width; ++i) {
    for (let j = 0; j < out.height; ++j) {
      let b = a.getPixel(i,j);
      let mean = (b[0] + b[1] + b[2]) / 3;
      out.setPixel(i, j, [mean,mean,mean]);
    }
  }
  return out;
}

//removeBlueAndGreen(a:image):image
function removeBlueAndGreen(a){
  let out = a.copy();
  for (let i = 0; i < out.width; ++i) {
    for (let j = 0; j < out.height; ++j) {
      out.setPixel(i, j, [out.getPixel(i, j)[0],0,0]);
    }
  }
  return out;
}