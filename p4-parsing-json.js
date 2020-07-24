let data = lib220.loadJSONFromURL('https://people.cs.umass.edu/~joydeepb/yelp.json');


//console.log(restaurants.filter(x => x.categories.reduce((acc, y) => if(!acc && y.localeCompare("Mexican"){acc = true;}, false))));


class FluentRestaurants{

  constructor(jsonData) {
    this.data = jsonData;
  }

 // fromState(stateStr: string): FluentRestaurants
 fromState(stateStr){
    this.data = this.data.filter(x => x.state === stateStr);
    return this;                
 }

 // ratingLeq(rating: number): FluentRestaurants returns rating less than or equal to number
 ratingLeq(n){
  this.data = this.data.filter(x => x.stars <= n);
  return this;                
 }

 // ratingGeq(rating: number): 
 ratingGeq(n){
  this.data = this.data.filter(x => x.stars >= n);       
  return this;         
 }

 // category(categoryStr: string): FluentRestaurants
 category(categoryStr){
  this.data = this.data.filter(x => contains(x.categories, categoryStr));  
  return this;             
 }
 
 // hasAmbience(ambienceStr: string): FluentRestaurants //ambience may or may not be withing the attributes section of an 
 hasAmbience(ambienceStr){
    function f(x){ 
      if(x.hasOwnProperty('attributes') && x.attributes.hasOwnProperty('Ambience')){
       return hasProperty(Object.entries(x.attributes.Ambience), ambienceStr);
      }
      return false;
    }

    this.data = this.data.filter(f);       
    return this;   
 }
 
 // bestPlace(): Restaurant | {}  //returns the "best" restaurant. highest reviews, if tie, most reviews, if tie, first one. if no match, return empty object
  bestPlace(){
    let candidates = [];
    let copy = this.copy();

    for(let i = 5; i >= 0 && candidates.length === 0; i -= 0.5){
      let copy2 = copy.copy().ratingGeq(i);
     
      for(let j = 0; j < copy2.data.length; ++j){
        candidates.push(copy2.data[j]);
      }
    }
    
    if(candidates.length === 0){
      return {};
    }
    
    if(candidates.length === 1){
      return candidates[0];
    }

    function f(acc, x){
      if(x.review_count > acc.review_count){
        return x;
      }
      return acc;
    }
    
    return candidates.reduce(f, {review_count: -1});
    
  }

  copy(){
    let out = [];
    for(let i = 0; i < this.data.length; ++i){
      out.push(this.data[i]);
    }

    return new FluentRestaurants(out);
  }

  toString(){
   return this.data.toString();
 }
}


function contains(arr, obj){
  for(let i = 0; i < arr.length; ++i){
    if(arr[i] === obj){
      return true;
    }
  }
  return false;
}

function hasProperty(arr, prop){
  for(let i = 0; i < arr.length; ++i){
    if(arr[i][0] === prop){
      return arr[i][1];
    }
  }
  return false;
}


// let w = [{
//   name: "Wendy's",
//   city: "Charlotte",
//   state: "NC",
//   stars: 1,
//   review_count: 5,
// }, {name: "Wendy's 2",
//   city: "Amherst",
//   state: "MA",
//   stars: 3,
//   review_count: 9,
//   attributes: {
//     hello: "goodbye",
//     Ambience: {
//       flay: true,
//       gay: true
//     }
//   }
// }, {name: "Wendy's 3",
//   city: "Acton",
//   state: "MA",
//   stars: 2,
//   review_count: 10,
// },{name: "Wendy's 4",
//   city: "Acton",
//   state: "MA",
//   stars: 3,
//   review_count: 10,
//   attributes: {
//     hello: "goodbye",
//     Ambience: {
//       flay: true,
//       gay: true
//     }
//   }
// }]

// let a = new FluentRestaurants(w);
// console.log(
// a.hasAmbience("gay").bestPlace()
//a.fromState('AZ').ratingGeq(2).ratingLeq(4.5).bestPlace()
//);



//let b = 'casual';
//console.log(a.bestPlace());
//console.log(a.data[0].attributes.hasOwnProperty('Ambience'));

//tests();




// type Restaurant = {
// name: string,
// city: string,
// state: string,
// stars: number,
// review_count: number,
// attributes: {} | {
// Ambience: {
// [key: string]: boolean
// }
// },
// categories: string[]
// }

// lib220.getProperty(jsonObj,memberStr)
// getProperty(obj: Object, memberStr: string):
// { found: true, value: any } | { found: false }

function tests(){
  const testData = [
 {
 name: "Applebee's",
 state: "NC",
 stars: 4,
 review_count: 6,
 },
 {
 name: "China Garden",
 state: "NC",
 stars: 4,
 review_count: 10,
 },
 {
 name: "Beach Ventures Roofing",
 state: "AZ",
 stars: 3,
 review_count: 30,
 },
 {
 name: "Alpaul Automobile Wash",
 state: "NC",
 stars: 3,
 review_count: 30,
 }
]
test('fromState filters correctly', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.fromState('NC').data;
 assert(list.length === 3);
 assert(list[0].name === "Applebee's");
 assert(list[1].name === "China Garden");
 assert(list[2].name === "Alpaul Automobile Wash");
});
test('bestPlace tie-breaking', function() {
 let tObj = new FluentRestaurants(testData);
 let place = tObj.fromState('NC').bestPlace();
 assert(place.name === 'China Garden');
});
}