// A deliberately small interpreter for the scalar Cambridge pseudocode used in
// S9. It executes the published text, rather than a second hand-written solution.
// Unsupported syntax, unassigned values and exhausted input fail explicitly.
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function tokens(text) {
  const result = [], pattern = /\s*("[^"\n]*"|\d+(?:\.\d+)?|[A-Za-z][A-Za-z0-9]*|>=|<=|<>|[=<>+*/(),-])/y;
  let index = 0;
  while (index < text.trimEnd().length) {
    pattern.lastIndex = index;
    const match = pattern.exec(text);
    if (!match) throw new Error(`Unsupported expression near ${text.slice(index)}`);
    result.push(match[1]); index = pattern.lastIndex;
  }
  return result;
}
const precedence = { OR:1, AND:2, "=":3, "<>":3, "<":3, ">":3, "<=":3, ">=":3, "+":4, "-":4, "*":5, "/":5 };
const boolean = v => { if (typeof v !== "boolean") throw new Error(`Expected Boolean, got ${v}`); return v; };
function expressions(text, state) {
  const ts = tokens(text); let i = 0;
  const numeric = v => { if(typeof v !== "number" || !Number.isFinite(v)) throw new Error(`Expected finite number, got ${v}`); return v; };
  function expression(min = 0) {
    const token = ts[i++]; let left;
    if(token === "(") { left=expression(); if(ts[i++] !== ")") throw new Error("Missing closing parenthesis"); }
    else if(token === "NOT") left = !boolean(expression(3));
    else if(token === "-") left = -numeric(expression(6));
    else if(token?.startsWith('"')) left = token.slice(1,-1);
    else if(/^\d/.test(token ?? "")) left = Number(token);
    else if(token === "TRUE" || token === "FALSE") left = token === "TRUE";
    else { if(!Object.hasOwn(state.values,token)) throw new Error(`Unassigned identifier ${token}`); left=state.values[token]; }
    while(Object.hasOwn(precedence,ts[i]) && precedence[ts[i]] >= min) {
      const op=ts[i++], right=expression(precedence[op]+1);
      if(op === "AND") left=boolean(left) && boolean(right);
      else if(op === "OR") left=boolean(left) || boolean(right);
      else if(["=","<>"].includes(op)) left=op === "=" ? left === right : left !== right;
      else if(["<",">","<=",">="].includes(op)) {
        numeric(left); numeric(right);
        left=op === "<" ? left < right : op === ">" ? left > right : op === "<=" ? left <= right : left >= right;
      } else {
        numeric(left); numeric(right);
        if(op === "/" && right === 0) throw new Error("Division by zero");
        left=op === "+" ? left+right : op === "-" ? left-right : op === "*" ? left*right : left/right;
      }
    }
    return left;
  }
  const values=[expression()];
  while(ts[i] === ",") { i++; values.push(expression()); }
  if(i !== ts.length) throw new Error(`Unexpected expression token ${ts[i]}`);
  return values;
}
const value = (text,state) => { const vs=expressions(text,state); if(vs.length!==1)throw new Error("Expected one expression");return vs[0]; };
function parse(code) {
  const lines=code.split("\n").map(x=>x.trim()).filter(Boolean); let i=0;
  const consume=expected=>{if(lines[i++]!==expected)throw new Error(`Expected ${expected}`);};
  function block(stops=[]) {
    const result=[];
    while(i<lines.length && !stops.some(s=>lines[i]===s || lines[i].startsWith(s+" "))) {
      const line=lines[i++]; let m;
      if((m=/^IF (.+) THEN$/.exec(line))) {
        const yes=block(["ELSE","ENDIF"]); let no=[];
        if(lines[i]==="ELSE"){i++;no=block(["ENDIF"]);} consume("ENDIF");
        result.push({kind:"if",condition:m[1],yes,no});
      } else if((m=/^FOR (\w+) <- (.+) TO (.+)$/.exec(line))) {
        const body=block(["NEXT"]);consume(`NEXT ${m[1]}`);result.push({kind:"for",name:m[1],start:m[2],end:m[3],body});
      } else if((m=/^WHILE (.+) DO$/.exec(line))) {
        const body=block(["ENDWHILE"]);consume("ENDWHILE");result.push({kind:"while",condition:m[1],body});
      } else if((m=/^DECLARE (\w+) : (INTEGER|REAL|STRING|BOOLEAN)$/.exec(line))) result.push({kind:"declare",name:m[1],type:m[2]});
      else if((m=/^CONSTANT (\w+) = (.+)$/.exec(line))) result.push({kind:"constant",name:m[1],expression:m[2]});
      else if((m=/^INPUT (\w+)$/.exec(line))) result.push({kind:"input",name:m[1]});
      else if((m=/^OUTPUT (.+)$/.exec(line))) result.push({kind:"output",expression:m[1]});
      else if((m=/^(\w+) <- (.+)$/.exec(line))) result.push({kind:"assign",name:m[1],expression:m[2]});
      else throw new Error(`Unsupported statement: ${line}`);
    }
    return result;
  }
  const result=block();if(i!==lines.length)throw new Error("Unconsumed statements");return result;
}
function stateFor(input,loose=false) { return {values:{},types:{},constants:new Set(),input:[...input],position:0,output:[],steps:0,loose}; }
function tick(s) { if(++s.steps>2000)throw new Error("Algorithm did not terminate within 2000 operations"); }
function assign(s,name,v) {
  if(s.constants.has(name))throw new Error(`Cannot change constant ${name}`);
  const type=s.types[name];
  if(!type && !s.loose)throw new Error(`Undeclared identifier ${name}`);
  if((type==="INTEGER" && !Number.isInteger(v)) || (type==="REAL" && (typeof v!=="number" || !Number.isFinite(v))) || (type==="STRING" && typeof v!=="string") || (type==="BOOLEAN" && typeof v!=="boolean"))throw new Error(`Invalid ${type} value for ${name}`);
  s.values[name]=v;
}
function execute(block,s) {
  for(const x of block) {
    tick(s);
    if(x.kind==="declare") {if(s.types[x.name] || s.constants.has(x.name))throw new Error(`Duplicate declaration ${x.name}`);s.types[x.name]=x.type;}
    else if(x.kind==="constant") {s.values[x.name]=value(x.expression,s);s.constants.add(x.name);}
    else if(x.kind==="input") {if(s.position>=s.input.length)throw new Error("Input exhausted");assign(s,x.name,s.input[s.position++]);}
    else if(x.kind==="assign") assign(s,x.name,value(x.expression,s));
    else if(x.kind==="output") s.output.push(...expressions(x.expression,s));
    else if(x.kind==="if") execute(boolean(value(x.condition,s)) ? x.yes : x.no,s);
    else if(x.kind==="while") {while(boolean(value(x.condition,s))){tick(s);execute(x.body,s);}}
    else if(x.kind==="for") {
      const first=value(x.start,s), last=value(x.end,s);
      if(!Number.isInteger(first)||!Number.isInteger(last))throw new Error("Non-integer FOR limit");
      for(assign(s,x.name,first);s.values[x.name]<=last;assign(s,x.name,s.values[x.name]+1)){tick(s);execute(x.body,s);}
    }
  }
}
function finish(s) {if(s.position!==s.input.length)throw new Error("Not all supplied inputs were consumed");return {output:s.output,values:s.values};}
export function executeSection9Program(code,input) {const s=stateFor(input);execute(parse(code),s);return finish(s);}
export function executeSection9Flowchart(graph,input) {
  const s=stateFor(input,true), nodes=new Map(graph.nodes.map(n=>[n.id,n])), visited=[];
  let id="start";
  while(id) {
    tick(s);const n=nodes.get(id);if(!n)throw new Error(`Missing flowchart node ${id}`);
    if(n.type==="end")return {...finish(s),visited};
    let next;
    if(n.type==="decision") next=boolean(value(n.text,s)) ? n.yes : n.no;
    else {if(n.type!=="start")execute(parse(n.text),s);next=n.next;}
    if(!next)throw new Error(`Missing outgoing path from ${id}`);
    visited.push(`${id}:${next}`);id=next;
  }
  throw new Error("Flowchart did not reach END");
}
export function validateSection9Execution(programs,graphs) {
  const errors=[]; let cases=0, graphCases=0;
  for(const [key,program] of Object.entries(programs)) for(const [index,test] of program.tests.entries()) {
    cases++;
    try {
      const actual=executeSection9Program(program.code,test.input);
      if(!same(actual.output,test.output))throw new Error(`Output ${JSON.stringify(actual.output)}; expected ${JSON.stringify(test.output)}`);
      for(const [name,v] of Object.entries(test.variables ?? {}))if(!same(actual.values[name],v))throw new Error(`Wrong final ${name}`);
    } catch(error){errors.push(`${key} case ${index+1}: ${error.message}`);}
  }
  for(const [key,graph] of Object.entries(graphs)) {
    const program=programs[graph.programKey], covered=new Set();
    if(!program){errors.push(`${key}: missing reference program`);continue;}
    for(const test of program.tests) {
      graphCases++;
      try {
        const actual=executeSection9Flowchart(graph,test.input);
        actual.visited.forEach(edge=>covered.add(edge));
        if(!same(actual.output,test.output))throw new Error(`Flowchart output ${JSON.stringify(actual.output)} disagrees with expected ${JSON.stringify(test.output)}`);
      }catch(error){errors.push(`${key} flowchart: ${error.message}`);}
    }
    for(const n of graph.nodes)for(const next of [n.next,n.yes,n.no].filter(Boolean))if(!covered.has(`${n.id}:${next}`))errors.push(`${key}: untested edge ${n.id}:${next}`);
  }
  return {errors,cases,graphCases};
}
