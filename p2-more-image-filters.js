 let url = 'https://people.cs.umass.edu/~joydeepb/robot.jpg';
 let robot = lib220.loadImageFromURL(url);

// imageMap(robot, function(image, x, y) {
// if(x % 2 === 0){
//   return [0,0,0];
// }
// return image.getPixel(x,y);
// }).show();

// imageMap(robot, function(img, x, y) {
// const c = img.getPixel(x, y);
// return [c[0], 0, 0];
// }).show();

// imageMask(robot, function(img, x, y) {
// return (y % 10 === 0);}, [1, 0, 0]).show();

robot.show();
blurImage(robot).show();
darken(robot).show();
lighten(robot).show();
lightenAndDarken(robot).show();

console.log("Order of images: original, blurred, darken, lighten, darken and lighten.");
console.log("If you are interested in seeing how the code works, check out my github for CS220 at:");
console.log("https://github.com/ETrimbs?tab=repositories");


// function test('imageMap function definition is correct', function() {
// let identityFunction = function(image, x, y) {
// return image.getPixel(x, y);
// };
// let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
// let outputImage = imageMap(inputImage, identityFunction);
// // Output should be an image, so getPixel must work without errors.
// let p = outputImage.getPixel(0, 0);
// assert(p[0] === 0);
// 4
// assert(p[1] === 0);
// assert(p[2] === 0);
// assert(inputImage !== outputImage);
// });

// function pixelEq (p1, p2) {
// const epsilon = 0.002;
// for (let i = 0; i < 3; ++i) {
// if (Math.abs(p1[i] - p2[i]) > epsilon) {
// return false;
// }
// }
// return true;
// };
// test('identity function with imageMap', function() {
// let identityFunction = function(image, x, y ) {
// return image.getPixel(x, y);
// };
// let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
// inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
// inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]);
// inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
// let outputImage = imageMap(inputImage, identityFunction);
// assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0.5, 0.5]));
// assert(pixelEq(outputImage.getPixel(5, 5), [0.1, 0.2, 0.3]));
// assert(pixelEq(outputImage.getPixel(2, 8), [0.9, 0.7, 0.8]));
// assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
// });


//imageMap(img: Image, func: (img: Image, x: number, y: number) => Pixel): Image
function imageMap(img, f){
  let out = img.copy();
  for (let i = 0; i < img.width; ++i) {
      for (let j = 0; j < img.height; ++j) {
        out.setPixel(i,j,f(img, i, j));
      }
    }
  return out;
}



//blurImage(img: Image): Image
function blurImage(img){
  return imageMap(img, blurPixel);
}

//blurPixel(img: Image, x: number, y: number): Pixel
function blurPixel(img, x, y){
  let r = 0; 
  let g = 0;
  let b = 0;
  for(let k = x-5; k <= x+5; ++k){
   let p = [];
   if(k < 0){
     p = img.getPixel(0, y);
   }
   else if(k >= img.width){
    p = img.getPixel(img.width-1, y)
   }
   else{
    p = img.getPixel(k, y);
   }
   r += p[0];
   g += p[1];
   b += p[2];
  }
 return [r/11,g/11,b/11];
}

//imageMask(img: Image,func: (img: Image, x: number, y: number) => boolean, maskValue: Pixel): Image
function imageMask(img, f, maskValue){
  return imageMap(img, function(img, x, y){
    if(f(img,x,y)){
     return maskValue;
    }
    else{
      return img.getPixel(x,y);
    }
  });
}

//lighten(img: Image): Image
function lighten(img){
  return imageMask(img, isLight, [1,1,1]);
}

//isLight(img: Image, x: number, y: number): boolean
function isLight(img, x, y){
  let p = img.getPixel(x,y);
  if(p[0] >= 0.5 && p[1] >= 0.5 && p[2] >= 0.5){
    return true;
  }
  return false;
}

//darken(img: Image): Image
function darken(img){
  return imageMask(img, isDark, [0,0,0]);
}

//isDark(img: Image, x: number, y: number): boolean
function isDark(img, x, y){
  let p = img.getPixel(x,y);
  if(p[0] < 0.5 && p[1] < 0.5 && p[2] < 0.5){
    return true;
  }
  return false;
}

//lightenAndDarken(img: Image): Image
function lightenAndDarken(img){
  return darken(lighten(img));
}