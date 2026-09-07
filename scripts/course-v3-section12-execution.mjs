import { executeSection9Program } from './course-v3-section9-execution.mjs';
import { structureCode } from './course-v3-section12-programs.mjs';

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Expand only the straight-line procedures/functions in the S12 chart examples.
// Each call gets a local scope. BYREF aliases the caller; BYVAL copies its value.
// The existing scalar interpreter then executes the actual expanded statements.
// This intentionally rejects unsupported syntax instead of pretending to be a
// general Cambridge pseudocode compiler.
export function executeSection12Structure(code, input) {
  const definitions = new Map(), top = [], lines = code.split('\n').map(s => s.trim()).filter(Boolean);
  for (let i = 0; i < lines.length; i++) {
    const header = /^(PROCEDURE|FUNCTION) (\w+)(?:\((.*)\))?(?: RETURNS (INTEGER|REAL|STRING|BOOLEAN))?$/.exec(lines[i]);
    if (!header) { top.push(lines[i]); continue; }
    const [, kind, name, parameters = '', resultType] = header;
    if (definitions.has(name) || (kind === 'FUNCTION') !== Boolean(resultType)) throw new Error('Invalid subprogram definition');
    const formals = parameters ? parameters.split(',').map(p => {
      const m = /^(BYREF|BYVAL) (\w+) : (INTEGER|REAL|STRING|BOOLEAN)$/.exec(p.trim());
      if (!m) throw new Error(`Invalid formal parameter ${p}`);
      return { mode: m[1], name: m[2], type: m[3] };
    }) : [];
    const body = [];
    while (++i < lines.length && lines[i] !== `END${kind}`) body.push(lines[i]);
    if (i === lines.length) throw new Error(`Unclosed ${name}`);
    definitions.set(name, { kind, formals, resultType, body });
  }
  const expanded = [], types = new Map(); let frame = 0;
  const rename = (s, bindings) => s.replace(/\b[A-Za-z][A-Za-z0-9]*\b/g, word => bindings.get(word) ?? word);
  const declare = (name, type) => { if (types.has(name)) throw new Error('Duplicate local'); types.set(name, type); expanded.push(`DECLARE ${name} : ${type}`); };
  function call(name, args, target, depth) {
    const def = definitions.get(name);
    if (!def || depth > 8 || args.length !== def.formals.length) throw new Error(`Invalid call to ${name}`);
    if ((def.kind === 'FUNCTION') !== Boolean(target)) throw new Error('Procedure/function call mismatch');
    if (target && types.get(target) !== def.resultType) throw new Error('Return type mismatch');
    const prefix = `Frame${++frame}`, bindings = new Map();
    def.formals.forEach((p, i) => {
      const actual = args[i];
      if (types.get(actual) !== p.type) throw new Error(`Argument type mismatch for ${p.name}`);
      if (p.mode === 'BYREF') bindings.set(p.name, actual);
      else { const local = prefix + p.name; declare(local, p.type); bindings.set(p.name, local); expanded.push(`${local} <- ${actual}`); }
    });
    let returned = false;
    for (const source of def.body) {
      const declaration = /^DECLARE (\w+) : (INTEGER|REAL|STRING|BOOLEAN)$/.exec(source);
      if (declaration) {
        if (bindings.has(declaration[1])) throw new Error('Duplicate identifier');
        const local = prefix + declaration[1]; bindings.set(declaration[1], local); declare(local, declaration[2]); continue;
      }
      const line = rename(source, bindings);
      if (line.startsWith('RETURN ')) {
        if (!target) throw new Error('RETURN in procedure');
        expanded.push(`${target} <- ${line.slice(7)}`); returned = true; break;
      }
      statement(line, depth + 1);
    }
    if (target && !returned) throw new Error('Missing return');
  }
  function statement(line, depth) {
    const procedure = /^CALL (\w+)(?:\((.*)\))?$/.exec(line);
    const fn = /^(\w+) <- (\w+)\((.*)\)$/.exec(line);
    const args = s => s ? s.split(',').map(x => x.trim()) : [];
    if (procedure) call(procedure[1], args(procedure[2]), null, depth);
    else if (fn) call(fn[2], args(fn[3]), fn[1], depth);
    else if (/^(INPUT |OUTPUT |\w+ <- )/.test(line)) expanded.push(line);
    else throw new Error(`Unsupported chart statement: ${line}`);
  }
  for (const line of top) statement(line, 0);
  return executeSection9Program(expanded.join('\n'), input);
}

export function traceSection12States(model, events) {
  const states = [model.initial], edges = [];
  for (const event of events) {
    const matches = model.transitions.filter(t => t.from === states.at(-1) && t.event === event);
    if (matches.length !== 1) throw new Error(`Undefined or ambiguous ${states.at(-1)} + ${event}`);
    const edge = matches[0]; states.push(edge.to); edges.push(`${edge.from}|${edge.event}|${edge.to}`);
  }
  return { states, edges };
}

export function validateSection12Execution(programs, structures, states, codes = Object.fromEntries(Object.keys(structures).map(key => [key, structureCode(key)]))) {
  const errors = []; let cases = 0, structureCases = 0, stateCases = 0, regressionCases = 0;
  const check = (ok, message) => { if (!ok) errors.push(message); };
  for (const [key, program] of Object.entries(programs)) for (const test of program.tests) {
    try { check(same(executeSection9Program(program.code, test.input).output, test.output), `${key}: wrong result for ${test.input}`); cases++; }
    catch (error) { errors.push(`${key}: ${error.message}`); }
  }
  for (const prefix of ['pass', 'rain', 'parcel', 'sales', 'journeys']) for (const test of programs[`${prefix}Enhanced`].tests) {
    try {
      const original = executeSection9Program(programs[`${prefix}Original`].code, test.input).output;
      const amended = executeSection9Program(programs[`${prefix}Enhanced`].code, test.input).output;
      check(same(original, [amended[0]]), `${prefix}: amendment damaged the original output`); regressionCases++;
    } catch (error) { errors.push(`${prefix}: regression ${error.message}`); }
  }
  for (const [key, spec] of Object.entries(structures)) for (const test of spec.tests) {
    try { check(same(executeSection12Structure(codes[key], test.input).output, test.output), `${key}: chart program output mismatch`); structureCases++; }
    catch (error) { errors.push(`${key}: ${error.message}`); }
  }
  const edges = new Set();
  for (const test of states.tests) {
    try { const result = traceSection12States(states, test.events); check(same(result.states, test.states), 'State trace mismatch'); result.edges.forEach(e => edges.add(e)); stateCases++; }
    catch (error) { errors.push(error.message); }
  }
  check(edges.size === states.transitions.length, 'Some state transitions were not exercised');
  return { errors, cases, structureCases, stateCases, regressionCases, stateEdges: edges.size };
}
