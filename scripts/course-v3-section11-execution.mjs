// Small interpreter for the Cambridge subset displayed in S11. No host-code eval.
// Cases execute the displayed source, including function/procedure interfaces.
function tokens(source) {
  const re=/\s*("[^"\n]*"|'[^'\n]*'|\d+(?:\.\d+)?|[A-Za-z_][A-Za-z_0-9]*|<>|<=|>=|[()+\-*/,=<>])/gy;
  const out=[];let pos=0;
  while(pos<source.length){re.lastIndex=pos;const m=re.exec(source);if(!m)throw Error(`Invalid expression: ${source.slice(pos)}`);out.push(m[1]);pos=re.lastIndex;}
  return out;
}
const precedence={OR:1,AND:2,"=":3,"<>":3,"<":3,"<=":3,">":3,">=":3,"+":4,"-":4,"*":5,"/":5,DIV:5,MOD:5};
function expressions(source) {
  const ts=tokens(source.trim());let at=0;
  const expr=(minimum=0)=>{
    const token=ts[at++];let left;
    if(token==="NOT"||token==="-")left={unary:token,arg:expr(6)};
    else if(token==="("){left=expr();if(ts[at++]!==")")throw Error("Missing )");}
    else if(/^\d/.test(token??""))left={literal:Number(token)};
    else if(/^["']/.test(token??""))left={literal:token.slice(1,-1)};
    else if(token==="TRUE"||token==="FALSE")left={literal:token==="TRUE"};
    else if(/^[A-Za-z_]\w*$/.test(token??"")){
      if(ts[at]==="("){at++;const args=[];if(ts[at]!==")"){do{args.push(expr());}while(ts[at]===","&&at++);}if(ts[at++]!==")")throw Error("Missing call )");left={call:token,args};}
      else left={name:token};
    } else throw Error(`Expected operand: ${token}`);
    while(precedence[ts[at]]!==undefined&&precedence[ts[at]]>=minimum){const op=ts[at++];left={op,left,right:expr(precedence[op]+1)};}
    return left;
  };
  const result=[];do{result.push(expr());}while(ts[at]===","&&at++);
  if(at!==ts.length)throw Error(`Unconsumed expression tokens: ${ts.slice(at)}`);
  return result;
}
function parse(code) {
  const lines=code.split("\n").map(s=>s.trim()).filter(Boolean);let at=0;const functions=new Map();
  const one=s=>{const x=expressions(s);if(x.length!==1)throw Error(`Expected one expression: ${s}`);return x[0];};
  const block=stops=>{
    const nodes=[];
    while(at<lines.length&&!stops.some(s=>s.test(lines[at]))){
      const line=lines[at++];let m;
      if((m=line.match(/^(PROCEDURE|FUNCTION) (\w+)\((.*)\)(?: RETURNS (\w+))?$/))){
        const params=m[3]?m[3].split(",").map(s=>{const p=s.trim().match(/^(?:(BYVAL|BYREF) )?(\w+) : (\w+)$/);if(!p)throw Error(`Parameter: ${s}`);return {mode:p[1]??"BYVAL",name:p[2],type:p[3]};}):[];
        const body=block([/^END(?:PROCEDURE|FUNCTION)$/]);if(lines[at++]!==`END${m[1]}`)throw Error("Wrong subprogram closure");
        if(m[1]==="FUNCTION"&&(!m[4]||params.some(p=>p.mode==="BYREF")))throw Error("Invalid function interface");
        functions.set(m[2],{kind:m[1],params,body,result:m[4]});
      } else if((m=line.match(/^DECLARE (.+) : (INTEGER|REAL|STRING|CHAR|BOOLEAN)$/)))nodes.push({kind:"declare",names:m[1].split(",").map(s=>s.trim()),type:m[2]});
      else if((m=line.match(/^CONSTANT (\w+) = (.+)$/)))nodes.push({kind:"constant",name:m[1],value:one(m[2])});
      else if((m=line.match(/^IF (.+) THEN$/))){const yes=block([/^ELSE$/,/^ENDIF$/]);let no=[];if(lines[at]==="ELSE"){at++;no=block([/^ENDIF$/]);}if(lines[at++]!=="ENDIF")throw Error("Missing ENDIF");nodes.push({kind:"if",condition:one(m[1]),yes,no});}
      else if((m=line.match(/^FOR (\w+) <- (.+?) TO (.+?)(?: STEP (-?\d+))?$/))){const body=block([/^NEXT /]);if(lines[at++]!==`NEXT ${m[1]}`)throw Error("Wrong NEXT identifier");nodes.push({kind:"for",name:m[1],start:one(m[2]),end:one(m[3]),step:Number(m[4]??1),body});}
      else if(line==="REPEAT"){const body=block([/^UNTIL /]);const until=lines[at++];if(!until?.startsWith("UNTIL "))throw Error("Missing UNTIL");nodes.push({kind:"repeat",body,condition:one(until.slice(6))});}
      else if((m=line.match(/^WHILE (.+)$/))){const body=block([/^ENDWHILE$/]);if(lines[at++]!=="ENDWHILE")throw Error("Missing ENDWHILE");nodes.push({kind:"while",condition:one(m[1]),body});}
      else if((m=line.match(/^CASE OF (\w+)$/))){const cases=[];while(at<lines.length&&lines[at]!=="ENDCASE"){const label=lines[at++].match(/^(.+?) : OUTPUT (.+)$/);if(!label)throw Error("Unsupported CASE body");const bounds=label[1].split(" TO ").map(Number);cases.push({label:label[1],bounds,values:expressions(label[2])});}if(lines[at++]!=="ENDCASE")throw Error("Missing ENDCASE");nodes.push({kind:"case",name:m[1],cases});}
      else if((m=line.match(/^INPUT (\w+)$/)))nodes.push({kind:"input",name:m[1]});
      else if((m=line.match(/^OUTPUT (.+)$/)))nodes.push({kind:"output",values:expressions(m[1])});
      else if((m=line.match(/^RETURN (.+)$/)))nodes.push({kind:"return",value:one(m[1])});
      else if((m=line.match(/^CALL (.+)$/)))nodes.push({kind:"call",value:one(m[1])});
      else if((m=line.match(/^(\w+) <- (.+)$/)))nodes.push({kind:"assign",name:m[1],value:one(m[2])});
      else throw Error(`Unsupported or invalid statement: ${line}`);
    }
    return nodes;
  };
  return {body:block([]),functions};
}
const typeOK=(value,type)=>type==="INTEGER"?Number.isInteger(value):type==="REAL"?typeof value==="number"&&Number.isFinite(value):type==="BOOLEAN"?typeof value==="boolean":type==="CHAR"?typeof value==="string"&&value.length===1:type==="STRING"?typeof value==="string":false;
export function executeSection11(code,input=[],random=[]) {
  const parsed=parse(code),root=new Map(),output=[];let read=0,randomIndex=0,steps=0,comparisons=0;
  const tick=()=>{if(++steps>10000)throw Error("Execution limit exceeded");};
  const cell=(name,scope)=>{const c=scope.get(name)??root.get(name);if(!c)throw Error(`Undeclared ${name}`);return c;};
  const get=(name,scope)=>{const c=cell(name,scope);if(c.value===undefined)throw Error(`Uninitialised ${name}`);return c.value;};
  const set=(name,value,scope)=>{const c=cell(name,scope);if(c.constant||!typeOK(value,c.type))throw Error(`Invalid assignment ${name} <- ${value}`);c.value=value;};
  const evaluate=(a,scope)=>{
    if("literal" in a)return a.literal;
    if(a.name)return get(a.name,scope);
    if(a.unary){const v=evaluate(a.arg,scope);if(a.unary==="NOT"){if(typeof v!=="boolean")throw Error("NOT needs BOOLEAN");return !v;}return -v;}
    if(a.call)return invoke(a,scope,"FUNCTION");
    const l=evaluate(a.left,scope),r=evaluate(a.right,scope);if(["=","<>","<","<=",">",">="].includes(a.op))comparisons++;
    switch(a.op){case "+":return l+r;case "-":return l-r;case "*":return l*r;case "/":if(r===0)throw Error("Division by zero");return l/r;case "DIV":case "MOD":if(!Number.isInteger(l)||!Number.isInteger(r)||r===0)throw Error("Invalid integer division");return a.op==="DIV"?Math.trunc(l/r):l%r;case "=":return l===r;case "<>":return l!==r;case "<":return l<r;case "<=":return l<=r;case ">":return l>r;case ">=":return l>=r;case "AND":case "OR":if(typeof l!=="boolean"||typeof r!=="boolean")throw Error("Logical operands must be BOOLEAN");return a.op==="AND"?l&&r:l||r;default:throw Error(`Operator ${a.op}`);}
  };
  const invoke=(a,scope,kind)=>{
    tick();const args=a.args.map(x=>evaluate(x,scope));
    const builtin={
      INT:{types:["REAL"],run:x=>Math.trunc(x)},RAND:{types:["INTEGER"],run:x=>{if(x<=0||randomIndex>=random.length)throw Error("RAND needs positive bound and supplied test draw");const draw=random[randomIndex++];if(draw<0||draw>=1)throw Error("Invalid random draw");return draw*x;}},
      LENGTH:{types:["STRING"],run:s=>s.length},MID:{types:["STRING","INTEGER","INTEGER"],run:(s,start,n)=>{if(start<1||n<0||start+n-1>s.length)throw Error("MID bounds");return s.slice(start-1,start-1+n);}},RIGHT:{types:["STRING","INTEGER"],run:(s,n)=>{if(n<0||n>s.length)throw Error("RIGHT bounds");return s.slice(s.length-n);}},UCASE:{types:["CHAR"],run:s=>s.toUpperCase()},LCASE:{types:["CHAR"],run:s=>s.toLowerCase()},
    }[a.call];
    if(builtin){if(kind!=="FUNCTION"||args.length!==builtin.types.length||!args.every((v,i)=>typeOK(v,builtin.types[i])))throw Error(`Invalid built-in call ${a.call}`);return builtin.run(...args);}
    const fn=parsed.functions.get(a.call);if(!fn||fn.kind!==kind||args.length!==fn.params.length)throw Error(`Invalid ${kind} call ${a.call}`);
    const local=new Map();fn.params.forEach((p,i)=>{if(!typeOK(args[i],p.type))throw Error(`Argument type ${p.name}`);if(p.mode==="BYREF"){if(!a.args[i].name)throw Error("BYREF needs a variable");const reference=cell(a.args[i].name,scope);if(reference.constant||reference.type!==p.type)throw Error("BYREF type mismatch");local.set(p.name,reference);}else local.set(p.name,{type:p.type,value:args[i]});});
    const returned=run(fn.body,local);if(kind==="FUNCTION"){if(!returned||!typeOK(returned.value,fn.result))throw Error(`Missing or invalid RETURN ${a.call}`);return returned.value;}if(returned)throw Error("Procedure cannot return a value");
  };
  const condition=(a,scope)=>{const value=evaluate(a,scope);if(typeof value!=="boolean")throw Error("Condition must be BOOLEAN");return value;};
  const run=(nodes,scope)=>{
    for(const n of nodes){tick();let returned;
      switch(n.kind){
        case "declare":for(const name of n.names){if(scope.has(name))throw Error(`Duplicate declaration ${name}`);scope.set(name,{type:n.type,value:undefined});}break;
        case "constant":if(!("literal" in n.value))throw Error("Constant requires literal");scope.set(n.name,{constant:true,value:n.value.literal});break;
        case "assign":set(n.name,evaluate(n.value,scope),scope);break;
        case "input":if(read>=input.length)throw Error("Input exhausted");set(n.name,input[read++],scope);break;
        case "output":output.push(...n.values.map(a=>evaluate(a,scope)));break;
        case "if":returned=run(condition(n.condition,scope)?n.yes:n.no,scope);break;
        case "for":{const end=evaluate(n.end,scope);let index=evaluate(n.start,scope);if(!n.step||!Number.isInteger(end)||!Number.isInteger(index))throw Error("Invalid FOR bounds/step");set(n.name,index,scope);while(n.step>0?index<=end:index>=end){tick();set(n.name,index,scope);returned=run(n.body,scope);if(returned)break;index+=n.step;}break;}
        case "while":while(condition(n.condition,scope)){tick();returned=run(n.body,scope);if(returned)break;}break;
        case "repeat":do{tick();returned=run(n.body,scope);if(returned)break;}while(!condition(n.condition,scope));break;
        case "call":invoke(n.value,scope,"PROCEDURE");break;
        case "return":return {value:evaluate(n.value,scope)};
        case "case":{const value=get(n.name,scope);const chosen=n.cases.find(c=>c.label!=="OTHERWISE"&&(c.bounds.length===2?value>=c.bounds[0]&&value<=c.bounds[1]:value===c.bounds[0]))??n.cases.find(c=>c.label==="OTHERWISE");if(chosen)output.push(...chosen.values.map(a=>evaluate(a,scope)));break;}
        default:throw Error(`Statement kind ${n.kind}`);
      }
      if(returned)return returned;
    }
  };
  if(run(parsed.body,root))throw Error("RETURN outside function");
  return {output,read,state:Object.fromEntries([...root].map(([k,c])=>[k,c.value])),comparisons};
}
export function executeCountGraph(graph,input) {
  // Each graph node executes the same textual statement shown in the SVG.
  let id=graph.start,read=0,steps=0;const state={Count:undefined,Index:undefined,Value:undefined},output=[],edges=new Set();
  while(id){if(++steps>300)throw Error("Flowchart execution limit");const n=graph.nodes.find(n=>n.id===id);if(!n)throw Error(`Unknown node ${id}`);let next=n.next;
    if(n.kind==="decision"){
      const declarations=Object.entries(state).filter(([,v])=>v!==undefined).map(([k,v])=>`DECLARE ${k} : INTEGER\n${k} <- ${v}`).join("\n");
      next=executeSection11(`${declarations}\nOUTPUT ${n.condition}`).output[0]?n.yes:n.no;
    } else if(n.kind==="process"||n.kind==="io"){
      const declarations=Object.entries(state).map(([k,v])=>`DECLARE ${k} : INTEGER${v===undefined?"":`\n${k} <- ${v}`}`).join("\n");
      const result=executeSection11(`${declarations}\n${n.text.replaceAll("; ","\n")}`,input.slice(read));
      Object.assign(state,result.state);output.push(...result.output);read+=result.read;
    }
    if(next){if(!graph.edges.some(([a,b])=>a===id&&b===next))throw Error(`Missing drawn edge ${id}->${next}`);edges.add(`${id}->${next}`);}id=next;
  }
  return {output,read,edges};
}
const equal=(a,b)=>typeof a==="number"&&typeof b==="number"?Math.abs(a-b)<1e-9:JSON.stringify(a)===JSON.stringify(b);
export function validateSection11Execution(programs,graph) {
  const errors=[];let cases=0;const covered=new Set();
  for(const [key,p] of Object.entries(programs))for(const [i,c] of p.cases.entries()){
    cases++;try{const result=executeSection11(p.code,c.input,c.random);if(result.output.length!==c.output.length||!result.output.every((v,n)=>equal(v,c.output[n]))||result.read!==c.input.length)throw Error(`Observed ${JSON.stringify(result)}`);for(const [k,v] of Object.entries(c.state??{}))if(!equal(result.state[k],v))throw Error(`Wrong final ${k}`);
      if(key==="countPositive"){const g=executeCountGraph(graph,c.input);if(!equal(g.output,c.output)||g.read!==c.input.length)throw Error("Flowchart contradicts pseudocode");g.edges.forEach(e=>covered.add(e));}
    }catch(error){errors.push(`${key} case ${i+1}: ${error.message}`);}
  }
  for(const [from,to] of graph.edges)if(!covered.has(`${from}->${to}`))errors.push(`Unexercised flowchart edge ${from}->${to}`);
  for(const mark of [0,49,50,51,100]){const a=executeSection11(programs.repeated.code,[mark]),b=executeSection11(programs.factored.code,[mark]);if(!equal(a.output,b.output)||a.comparisons!==2||b.comparisons!==1)errors.push(`Refactoring changed behaviour or comparison count at ${mark}`);}
  return {errors,cases,edges:covered.size};
}
