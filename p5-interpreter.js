//type State = { [key: string]: number | boolean }


// Given a state object and an AST of an expression as arguments,

// interpExpression returns the result of the expression (number or boolean)
//interpExpression(state: State, e: Expr): number | boolean
function interpExpression(state, e){
  if (e.kind === 'number' || e.kind === 'boolean') {
    return e.value;
  } 
  else if (e.kind === 'operator') {
      if(e.op === '+'){return interpExpression(state, e.e1) + interpExpression(state, e.e2);}
      if(e.op === '-'){return interpExpression(state, e.e1) - interpExpression(state, e.e2);}
      if(e.op === '*'){return interpExpression(state, e.e1) * interpExpression(state, e.e2);}
      if(e.op === '/'){return interpExpression(state, e.e1) / interpExpression(state, e.e2);}
      if(e.op === '&&'){return interpExpression(state, e.e1) && interpExpression(state, e.e2);}
      if(e.op === '||'){return interpExpression(state, e.e1) || interpExpression(state, e.e2);}
      if(e.op === '>'){return interpExpression(state, e.e1) > interpExpression(state, e.e2);}
      if(e.op === '<'){return interpExpression(state, e.e1) < interpExpression(state, e.e2);}
      if(e.op === '==='){return interpExpression(state, e.e1) === interpExpression(state, e.e2);}
  } else if (e.kind === 'variable') {
    return lib220.getProperty(state, e.name).value;
  } else {
    return;
  }
}
// let program =
//   "let x = 3;     " +
//   "let y = 0;     " +
//   "while(y < x) {  " +
//   "  y = y + 1;   " +
//   "  print(x + y);" +
//   "}              "
//  ;
// let p = parser.parseProgram(program);
// console.log(p);

// console.log('\nresults: ');

// console.log(interpProgram(p.value));


// test("multiplication with a variable", function() {
// let r = interpExpression({ x: 10 }, parser.parseExpression("x * 2").value);
// assert(r === 20);
// });


// Given a state object and an AST of a statement,
// interpStatement updates the state object and returns nothing

//interpStatement(state: State, statement: Stmt): void
function interpStatement(state, statement){
  if(statement.kind === 'let'){
    lib220.setProperty(state, statement.name, interpExpression(state, statement.expression));
  }
  else if(statement.kind === 'assignment'){
    if(lib220.getProperty(state, statement.name).found){
     lib220.setProperty(state, statement.name, interpExpression(state, statement.expression));
    }
    else{
      return;
    }
  }
  else if(statement.kind === 'if'){
    if(interpExpression(state, statement.test)){
      interpBlock(state, statement.truePart);
    }
    else{
      interpBlock(state, statement.falsePart);
    }
 }
  else if(statement.kind === 'print'){
    console.log(interpExpression(state, statement.expression));
  }
  else if(statement.kind === 'while'){
  let modifiedAST = {
      kind: 'if',
      test: statement.test,
      truePart: statement.body.concat(statement),
      falsePart: []
    };
  interpStatement(state, modifiedAST);
  }
}
function interpBlock(state, p){
  for(let i = 0; i<p.length; ++i){
    interpStatement(state, p[i]);
  }
}


// Given the AST of a program,
// interpProgram returns the final state of the program
//interpProgram(p: Stmt[]): State
function interpProgram(p){
  let state = {};
  for(let i = 0; i<p.length; ++i){
    interpStatement(state, p[i]);
  }
  return state;
}


// test("multiplication with a variable", function() {
// let r = interpExpression({ x: 10 }, parser.parseExpression("x * 2").value);
// assert(r === 20);
// });
// test("assignment", function() {
// let st = interpProgram(parser.parseProgram("let x = 10; x = 20;").value);
// assert(st.x === 20);
// });

//parseExpression(str: string): Result<Expr>
//parseProgram(str: string): Result<Stmt[]

// type Result<T> = { kind: ‘ok’, value: T } | { kind: ‘error’, message: string };
// type Binop = '+' | '-' | '*' | '/' | '&&' | '||' | '>' | '<' | '===';
// type Expr = { kind: 'boolean', value: boolean }
// | { kind: 'number', value: number }
// | { kind: 'variable', name: string }
// | { kind: 'operator', op: Binop, e1: Expr, e2: Expr };
// type Stmt = { kind: 'let', name: string, expression: Expr }
// | { kind: 'assignment', name: string, expression: Expr }
// | { kind: 'if', test: Expr, truePart: Stmt[], falsePart: Stmt[] }
// | { kind: 'while', test: Expr, body: Stmt[] }
// | { kind: 'print', expression: Expr };