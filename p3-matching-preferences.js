// let companies = [
//  [1, 0],[0, 1]
// ];
// let candidates = [
// [1, 0],[0, 1]
// ];

// console.log(wheat1(companies, candidates));
//oracle(wheat1);
// console.log();
// console.log();
// console.log(parseHires(chaff1(companies, candidates)));

oracle(wheat1);

//oracle(f: (companies: number[][], candidates: number[][]) => Hire[]): void
function oracle(f) {
  let numTests = 2; // Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
  let n = 20; // Change this to some reasonable size
   let companies = generateInput(n);
 let candidates = generateInput(n);
   let h = f(companies, candidates);

  test('All lengths are correct', 
    function() {
      let len = h.length
     assert(companies.length === len);
     assert(candidates.length === len);
     for(let i = 0; i<len; ++i){
        assert(companies[i].length === len);
        assert(candidates[i].length === len);
     }
    }
   );

  test('No duplicate assignments', 
    function(){  
      let duplicate = companies.reduce(function(acc, curr){
        let numbs = []
        for(let i = 0; i < n; ++i){
          numbs.push(false);
        }  
        let j = 0;
        while(!acc && j < n){ 
          ++j;
        }
       }, false)
       assert(!duplicate);
    }
  );

 test('Matches are stable', function(){
   let stable = true;
   for(let i = 0; i < h.length && stable; ++i){
      let currComp = h[i].company;
      let currCand = h[i].candidate;

      let currCompPri = companies[currComp];
      for(let j = 0; j < h.length && currCompPri[j]!== currCand && stable; ++j){
       let alternateCand = currCompPri[j];
       let alternateCandPri = candidates[alternateCand]
       let alternateCandComp = getCompany(alternateCand);
       if(firstComesBeforeSecond(currComp, alternateCandComp, alternateCandPri)){
         stable = false;
       }
      }
   }
   assert(stable);
 });

 function getCompany(candidate){
   for(let i = 0; i<h.length; ++i){
     if(h[i].candidate === candidate){
       return h[i].company;
     }
   }
   return -1;
 }

 function firstComesBeforeSecond(a,b,arr){
    for(let i = 0; i<arr.length; ++i){
      if(arr[i] === a){
        return true;
      }
      if(arr[i] === b){
        return false;
      }
    }
    return false;
 }

}}





function contains(n, a){
  for(let i = 0; i < a.length; ++i){
    if(a[i] === n ){
      return true;
    }
  }
  return false;
}

//generateInput(n: number): number[][]
function generateInput(n){
  let prefs = [];
  for(let i = 0; i < n; ++i){

    prefs.push([]);

    while(prefs[i].length !== n){
      let rand = randomInt(0, n);
      if(prefs[i].length === 0 || !contains(rand, prefs[i])){
        prefs[i].push(rand);
      }
    }
  }
  return prefs;
}

// Returns a random int i where min <= i < max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}