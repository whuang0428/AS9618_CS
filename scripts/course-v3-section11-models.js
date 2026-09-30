/* Section 11: bounded, deterministic models of the displayed pseudocode. */
const Section11Models = (() => {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const shown = value => typeof value === 'boolean' ? String(value).toUpperCase() : typeof value === 'number' ? String(Number(value.toFixed(8))) : String(value);
  function number(value, name, min, max, integer = true) {
    if (!['number', 'string'].includes(typeof value) || String(value).trim() === '' || !Number.isFinite(Number(value)) || Number(value) < min || Number(value) > max || (integer && !Number.isInteger(Number(value)))) throw new RangeError(`${name}: enter ${integer ? 'a whole number' : 'a number'} from ${min} to ${max}.`);
    return Number(value);
  }
  function list(value, name = 'Input stream') {
    const parts = Array.isArray(value) ? value : String(value).split(',').map(item => item.trim());
    if (!parts.length || parts.length > 16) throw new RangeError(`${name}: enter 1–16 whole numbers, separated by commas.`);
    return parts.map(item => number(item, name, -9, 99));
  }
  function text(value, name, max = 24) {
    if (typeof value !== 'string' || !value.length || value.length > max || /[^\x20-\x7e]|["\\]/u.test(value)) throw new RangeError(`${name}: use 1–${max} printable ASCII characters without double quotes or backslashes.`);
    return value;
  }
  function choose(value, choices, name) {
    if (!choices.includes(value)) throw new RangeError(`${name}: choose ${choices.join(' or ')}.`);
    return value;
  }
  const n = (name, label, value, min, max, step = 1) => ({ name, label, value, type: 'number', min, max, step });
  const s = (name, label, value, options) => ({ name, label, value, type: 'select', options });
  const t = (name, label, value, maxlength = 80) => ({ name, label, value, type: 'text', maxlength });
  const definitions = {
    assignment: { title: 'Copy a value, then update a variable', fields: [n('seats', 'Initial seats', 3, 0, 20), n('increment', 'Additional seats', 1, 0, 10)], note: 'Try zero additional seats. Predict whether SavedSeats changes when Seats changes.' },
    arithmetic: { title: 'Calculate a charge and split a duration', fields: [n('seats', 'Seats', 3, 0, 20), n('price', 'Price per seat', 12.5, 0, 100, 0.5), n('minutes', 'Duration in minutes', 125, 0, 600)], note: 'Try 59, 60 and 61 minutes. DIV gives the whole-number quotient; MOD gives the remainder for these non-negative inputs.' },
    logic: { title: 'Combine booking conditions', fields: [n('seats', 'Requested seats', 3, -2, 8), n('available', 'Available seats', 4, 0, 8), s('paid', 'Payment received', 'TRUE', ['TRUE', 'FALSE'])], note: 'Change one input at a time. Compare a valid seat count with permission to confirm the booking.' },
    selection: { title: 'Select one booking outcome', fields: [n('seats', 'Requested seats', 3, -2, 8), n('available', 'Available seats', 4, 0, 8)], note: 'Try 0, exactly Available and Available + 1. Follow the branch selected at each test.' },
    for: { title: 'Count the visits made by a FOR loop', fields: [n('start', 'Start value', 1, -5, 8), n('end', 'End value', 3, -5, 8), n('step', 'Step (must not be zero)', 1, -4, 4)], note: 'Try 3 TO 1 STEP −1, then 3 TO 1 STEP 1. The second loop makes zero visits. STEP 0 is rejected because it cannot progress.' },
    while: { title: 'Read requests until the sentinel', fields: [t('requests', 'Input stream (0 ends input)', '3, 2, 4, 0')], note: 'Try 0 first. It stops the loop without adding to Total. Values after the first 0 remain unread.' },
    repeat: { title: 'Request a valid seat count', fields: [t('attempts', 'Input attempts (valid range 1–6)', '0, 7, 3')], note: 'Supply at least one valid value. REPEAT always reads at least one input; UNTIL ends the loop when its condition is TRUE.' },
    nested: { title: 'Visit every seat in every row', fields: [n('rows', 'Rows', 2, 1, 4), n('cols', 'Seats per row', 3, 1, 4)], note: 'The inner loop starts again for each new row. Compare the output count with Rows × Columns.' },
    strings: { title: 'Use a supplied string-function interface', fields: [t('code', 'Booking code (ASCII)', 'ART0072', 24), n('start', 'First character position', 4, 1, 24), n('length', 'Number of characters', 4, 1, 24)], note: 'Supplied interface for this experiment: LENGTH(S) counts characters; MID(S, Start, Count) uses positions starting at 1; TO_UPPER(S) returns uppercase text. Valid slices must fit inside S.' },
    procedure: { title: 'Call a procedure and return to the caller', fields: [n('seats', 'Seats', 3, 0, 20)], note: 'CALL transfers control into the procedure. ENDPROCEDURE returns control to the statement after CALL.' },
    reference: { title: 'Compare a copied value with a reference', fields: [n('total', 'Caller Total', 5, 0, 20), n('seats', 'Seats to add', 3, 0, 10), s('mode', 'Parameter mode for RunningTotal', 'BYREF', ['BYREF', 'BYVAL'])], note: 'Run both modes with identical inputs. BYREF RunningTotal names the caller’s Total variable. BYVAL RunningTotal is a separate local copy.' },
    function: { title: 'Return a charge to an expression', fields: [n('seats', 'Seats', 3, 0, 20), n('price', 'Price per seat', 12.5, 0, 100, 0.5)], note: 'RETURN supplies a value to the calling expression. It does not display output; OUTPUT is a separate statement.' },
    efficiency: { title: 'Print the same receipt with fewer multiplications', fields: [n('seats', 'Seats in this booking', 3, 0, 20), n('price', 'Price per seat', 12.5, 0, 100, 0.5), n('copies', 'Receipt copies (0–8)', 3, 0, 8)], note: 'The first loop calculates the unchanged seat charge for every copy. The second version calculates it once, only when Copies > 0. Compare the two output groups and teaching counters; the counters measure multiplications, not elapsed time.' },
    booking: { title: 'Validate, record and report accepted bookings', fields: [n('count', 'Number of accepted bookings', 3, 1, 5), t('attempts', 'Seat inputs (valid range 1–6)', '0, 3, 7, 2, 4')], note: 'ValidSeats returns a Boolean decision. After acceptance, RecordBooking updates Total and Groups through reference parameters. Provide enough valid values (1–6); rejected attempts change neither accumulator. A group booking requests at least 3 seats.' }
  };
  function trace(key, inputs, source, variables, inputStream = []) {
    const result = { key, inputs: clone(inputs), code: source.split('\n'), inputStream: clone(inputStream), frames: [] };
    const state = { line: null, variables: clone(variables), output: [], consumed: 0, metrics: {}, returnValue: null, explanation: '', predict: '', complete: false };
    function add(line, explanation, predict, patch = {}) {
      Object.assign(state, clone(patch), { line, explanation, predict });
      if (result.frames.length >= 400) throw new RangeError('This example exceeds the 400-step teaching limit.');
      result.frames.push(clone(state));
    }
    const set = (line, name, value, explanation, predict) => { state.variables[name] = value; add(line, explanation, predict); };
    const output = (line, value, explanation, predict = 'What executes next?') => { state.output.push(shown(value)); add(line, explanation, predict); };
    const input = (line, name, value, explanation, predict) => { state.consumed++; set(line, name, value, explanation, predict); };
    add(null, 'Prepared. No program statement has executed. Unassigned variables have no value yet.', 'Predict the first change.');
    return { result, state, add, set, output, input, finish(explanation = 'The program has finished. Compare the output with your prediction.') { add(null, explanation, 'Change an input, select Prepare, and test another case.', { complete: true }); return result; } };
  }
  function prepare(key, raw = {}) {
    if (!Object.prototype.hasOwnProperty.call(definitions, key)) throw new RangeError('Unknown Section 11 experiment.');
    const supplied = Object.fromEntries(definitions[key].fields.map(field => [field.name, raw[field.name] ?? field.value]));
    const i = {}, read = (name, min, max, integer = true) => i[name] = number(supplied[name], name, min, max, integer);
    let q;
    if (key === 'assignment') {
      const seats = read('seats', 0, 20), increment = read('increment', 0, 10);
      q = trace(key, i, `DECLARE Seats, SavedSeats : INTEGER\nSeats ← ${seats}\nSavedSeats ← Seats\nSeats ← Seats + ${increment}\nOUTPUT Seats, ", ", SavedSeats`, { Seats: null, SavedSeats: null });
      q.add(1, 'DECLARE introduces two INTEGER variables. It does not assign their values.', 'What value is assigned to Seats?');
      q.set(2, 'Seats', seats, `Seats now stores ${seats}.`, 'What is copied into SavedSeats?');
      q.set(3, 'SavedSeats', seats, `Copy the current value ${seats} into a separate variable.`, `Will adding ${increment} to Seats also change SavedSeats?`);
      q.set(4, 'Seats', seats + increment, `Evaluate ${seats} + ${increment}, then replace only Seats. SavedSeats still holds ${seats}.`, 'Predict both output values, in order.');
      q.output(5, `${seats + increment}, ${seats}`, 'OUTPUT reads the two values; it does not change either variable.');
    }
    if (key === 'arithmetic') {
      const seats = read('seats', 0, 20), price = read('price', 0, 100, false), minutes = read('minutes', 0, 600);
      q = trace(key, i, 'DECLARE Seats, Minutes, Hours, Remainder : INTEGER\nDECLARE Price, Charge : REAL\nINPUT Seats\nINPUT Price\nINPUT Minutes\nCharge ← Seats * Price\nHours ← Minutes DIV 60\nRemainder ← Minutes MOD 60\nOUTPUT Charge\nOUTPUT Hours, ", ", Remainder', { Seats: null, Minutes: null, Hours: null, Remainder: null, Price: null, Charge: null }, [seats, price, minutes]);
      q.add(1, 'These variables store whole numbers.', 'Which variables need a REAL value?'); q.add(2, 'Price and Charge can include a fractional part.', 'Which input is read first?');
      q.input(3, 'Seats', seats, `Read ${seats} into Seats.`, 'Which input is read next?'); q.input(4, 'Price', price, `Read ${price} into Price.`, 'Which input is read next?'); q.input(5, 'Minutes', minutes, `Read ${minutes} into Minutes.`, 'Predict the multiplication result.');
      q.set(6, 'Charge', seats * price, `${seats} × ${price} = ${shown(seats * price)}.`, 'How many whole hours fit in Minutes?');
      q.set(7, 'Hours', Math.floor(minutes / 60), 'DIV gives the whole-number quotient for these non-negative values.', 'How many minutes remain after the whole hours?');
      q.set(8, 'Remainder', minutes % 60, `${minutes} = ${Math.floor(minutes / 60)} × 60 + ${minutes % 60}.`, 'Predict both output statements.');
      q.output(9, seats * price, 'Display the charge.'); q.output(10, `${Math.floor(minutes / 60)}, ${minutes % 60}`, 'Display whole hours followed by remaining minutes.');
    }
    if (key === 'logic') {
      const seats = read('seats', -2, 8), available = read('available', 0, 8), paid = choose(supplied.paid, ['TRUE', 'FALSE'], 'Paid') === 'TRUE'; i.paid = shown(paid);
      const valid = seats >= 1 && seats <= available;
      q = trace(key, i, 'DECLARE Seats, Available : INTEGER\nDECLARE Paid, Valid, Confirm, Attention : BOOLEAN\nINPUT Seats\nINPUT Available\nINPUT Paid\nValid ← (Seats >= 1) AND (Seats <= Available)\nConfirm ← Valid AND Paid\nAttention ← (NOT Valid) OR (NOT Paid)\nOUTPUT Valid, ", ", Confirm, ", ", Attention', { Seats: null, Available: null, Paid: null, Valid: null, Confirm: null, Attention: null }, [seats, available, paid]);
      q.add(1, 'Seats and Available hold whole numbers.', 'Which results will be BOOLEAN?'); q.add(2, 'A BOOLEAN stores TRUE or FALSE.', 'Read the first input.');
      q.input(3, 'Seats', seats, 'Read the requested seat count.', 'Read availability.'); q.input(4, 'Available', available, 'Read the available seat count.', 'Read payment status.'); q.input(5, 'Paid', paid, 'Read TRUE or FALSE for Paid.', 'Are both comparisons TRUE?');
      q.set(6, 'Valid', valid, `Seats >= 1 is ${shown(seats >= 1)}; Seats <= Available is ${shown(seats <= available)}. AND is TRUE only when both are TRUE.`, 'Does a valid count alone confirm the booking?');
      q.set(7, 'Confirm', valid && paid, `Valid AND Paid = ${shown(valid)} AND ${shown(paid)}.`, 'Is either invalidity or unpaid status enough to require attention?');
      q.set(8, 'Attention', !valid || !paid, `NOT Valid is ${shown(!valid)}; NOT Paid is ${shown(!paid)}. OR is TRUE when at least one is TRUE.`, 'Predict all three Boolean outputs.');
      q.output(9, `${shown(valid)}, ${shown(valid && paid)}, ${shown(!valid || !paid)}`, 'Display Valid, Confirm and Attention in that order.');
    }
    if (key === 'selection') {
      const seats = read('seats', -2, 8), available = read('available', 0, 8);
      q = trace(key, i, 'DECLARE Seats, Available : INTEGER\nINPUT Seats\nINPUT Available\nIF Seats < 1 THEN\n    OUTPUT "Invalid request"\nELSE\n    IF Seats <= Available THEN\n        OUTPUT "Booking accepted"\n    ELSE\n        OUTPUT "Not enough seats"\n    ENDIF\nENDIF', { Seats: null, Available: null }, [seats, available]);
      q.add(1, 'Declare both seat counts as INTEGER.', 'Which input comes first?'); q.input(2, 'Seats', seats, 'Read the requested count.', 'What capacity is available?'); q.input(3, 'Available', available, 'Read capacity.', 'Is Seats less than 1?');
      q.add(4, `${seats} < 1 is ${shown(seats < 1)}.`, seats < 1 ? 'Which message is selected?' : 'Which condition is tested inside ELSE?');
      if (seats < 1) q.output(5, 'Invalid request', 'This branch rejects non-positive requests. The outer ELSE is skipped.');
      else { q.add(6, 'Enter the outer ELSE because Seats < 1 was FALSE.', 'Can the requested count fit?'); q.add(7, `${seats} <= ${available} is ${shown(seats <= available)}.`, 'Which message is selected?'); if (seats <= available) q.output(8, 'Booking accepted', 'Equality is accepted: the request may use all available seats.'); else { q.add(9, 'Enter the inner ELSE because the request exceeds capacity.', 'Which message is selected?'); q.output(10, 'Not enough seats', 'Only the insufficient-capacity message is output.'); } q.add(11, 'The inner selection is complete.', 'Where does control continue?'); }
      q.add(12, 'The outer selection is complete. Exactly one message was output.', 'Compare with the boundary inputs 0, Available and Available + 1.');
    }
    if (key === 'for') {
      const start = read('start', -5, 8), end = read('end', -5, 8), step = read('step', -4, 4); if (step === 0) throw new RangeError('STEP must not be zero: the control variable must progress.');
      q = trace(key, i, `DECLARE Index, Visits : INTEGER\nVisits ← 0\nFOR Index ← ${start} TO ${end} STEP ${step}\n    OUTPUT Index\n    Visits ← Visits + 1\nNEXT Index\nOUTPUT Visits`, { Index: null, Visits: null });
      q.add(1, 'Declare the control variable and the visit count.', 'What is Visits before the loop?'); q.set(2, 'Visits', 0, 'No loop body has executed.', 'Does the starting value meet the bound for this direction?');
      let index = start, visits = 0; q.state.variables.Index = index;
      while (true) { const within = step > 0 ? index <= end : index >= end; q.add(3, `${index} ${step > 0 ? '<=' : '>='} ${end} is ${shown(within)}. ${within ? 'Enter the body.' : 'Leave the loop.'}`, within ? 'Predict the next output.' : 'How many visits occurred?'); if (!within) break; q.output(4, index, 'Output the current control-variable value.', 'What will Visits become?'); q.set(5, 'Visits', ++visits, 'Count this one execution of the body.', `What is Index + (${step})?`); index += step; q.set(6, 'Index', index, `NEXT adds STEP (${step}) before checking the bound again.`, 'Will another body execution occur?'); }
      q.output(7, visits, 'Display the visit count after the loop. A failed initial test gives zero visits.');
    }
    if (key === 'while') {
      const values = list(supplied.requests); i.requests = values.join(', '); if (!values.includes(0)) throw new RangeError('Include 0 in the input stream so the sentinel loop can finish.'); if (values.some(v => v < 0 || v > 6)) throw new RangeError('Use seat requests 1–6 and sentinel 0 in this experiment.');
      q = trace(key, i, 'DECLARE Seats, Total : INTEGER\nTotal ← 0\nINPUT Seats\nWHILE Seats <> 0\n    Total ← Total + Seats\n    INPUT Seats\nENDWHILE\nOUTPUT Total', { Seats: null, Total: null }, values);
      q.add(1, 'Declare the current request and accumulator.', 'What is Total before any request?'); q.set(2, 'Total', 0, 'The accumulator starts at zero.', 'What does the first input contain?'); let p = 0, total = 0; q.input(3, 'Seats', values[p++], 'Read the first value before testing WHILE.', 'Is this input the sentinel?');
      while (true) { const seats = values[p - 1]; q.add(4, `Seats <> 0 is ${shown(seats !== 0)}. ${seats === 0 ? 'The body is skipped.' : 'Enter the body.'}`, seats === 0 ? 'Was 0 added to Total?' : 'Predict Total after this request.'); if (seats === 0) break; total += seats; q.set(5, 'Total', total, `Add the request of ${seats} seats once.`, 'Which input is read next?'); q.input(6, 'Seats', values[p++], 'Read the next value; the next condition test decides whether it is processed.', 'Does control test before another addition?'); q.add(7, 'Return to the WHILE test.', 'Is the new Seats value the sentinel?'); }
      q.output(8, total, `Display the sum. ${values.length - p} prepared input value(s) remain unread.`);
    }
    if (key === 'repeat') {
      const values = list(supplied.attempts); i.attempts = values.join(', '); if (!values.some(v => v >= 1 && v <= 6)) throw new RangeError('Include an accepted value from 1 to 6 so the validation loop can finish.');
      q = trace(key, i, 'DECLARE Seats : INTEGER\nREPEAT\n    INPUT Seats\nUNTIL (Seats >= 1) AND (Seats <= 6)\nOUTPUT Seats', { Seats: null }, values); q.add(1, 'Declare the input variable.', 'Will input execute before the first test?');
      for (const seats of values) { q.add(2, 'Begin the body without testing first.', 'What will be read?'); q.input(3, 'Seats', seats, `Read ${seats}. This replaces the previous attempt.`, 'Do both range comparisons hold?'); const valid = seats >= 1 && seats <= 6; q.add(4, `${shown(seats >= 1)} AND ${shown(seats <= 6)} = ${shown(valid)}. ${valid ? 'Stop repeating.' : 'Repeat the body.'}`, valid ? 'Which value is output?' : 'Will the invalid value be output?'); if (valid) { q.output(5, seats, 'Output occurs after validation, so it receives the accepted value.'); break; } }
    }
    if (key === 'nested') {
      const rows = read('rows', 1, 4), cols = read('cols', 1, 4);
      q = trace(key, i, `DECLARE Row, Column, Count : INTEGER\nCount ← 0\nFOR Row ← 1 TO ${rows}\n    FOR Column ← 1 TO ${cols}\n        OUTPUT Row, ", ", Column\n        Count ← Count + 1\n    NEXT Column\nNEXT Row\nOUTPUT Count`, { Row: null, Column: null, Count: null }); q.add(1, 'Each loop has its own control variable.', 'What does Count start at?'); q.set(2, 'Count', 0, 'No seat positions have been visited.', 'Which row is first?'); let count = 0;
      for (let row = 1; row <= rows; row++) { q.set(3, 'Row', row, `Row ${row} is within 1…${rows}.`, 'Where does Column start for this row?'); for (let col = 1; col <= cols; col++) { q.set(4, 'Column', col, `Column ${col} is within 1…${cols}${col === 1 ? '; the inner loop starts at 1 for this row' : ''}.`, 'Predict the pair that is output.'); q.output(5, `${row}, ${col}`, 'The pair identifies one seat position.', 'What will Count become?'); q.set(6, 'Count', ++count, 'Count this position once.', 'Which control variable advances first?'); q.set(7, 'Column', col + 1, 'NEXT Column increments the inner control variable.', 'Does Column still fit its bound?'); } q.add(4, `Column = ${cols + 1}, beyond the inner bound. Leave the inner loop.`, 'Which loop continues now?'); q.set(8, 'Row', row + 1, 'NEXT Row increments the outer control variable.', row < rows ? 'Will Column restart at 1?' : 'Does another row exist?'); }
      q.add(3, `Row = ${rows + 1}, beyond the outer bound.`, 'Predict the final count.'); q.output(9, count, `${rows} rows × ${cols} columns = ${count} positions.`);
    }
    if (key === 'strings') {
      const code = i.code = text(supplied.code, 'Booking code'), start = read('start', 1, 24), length = read('length', 1, 24); if (start + length - 1 > code.length) throw new RangeError('The selected MID range must fit inside the booking code. Shorten the range or change its first position.');
      q = trace(key, i, `DECLARE Code, Part, UpperCode : STRING\nDECLARE Size : INTEGER\nINPUT Code\nSize ← LENGTH(Code)\nPart ← MID(Code, ${start}, ${length})\nUpperCode ← TO_UPPER(Code)\nOUTPUT Size, ", ", Part, ", ", UpperCode`, { Code: null, Size: null, Part: null, UpperCode: null }, [code]); q.add(1, 'Declare the three text variables.', 'Which result is a count?'); q.add(2, 'Size stores a whole-number character count.', 'What text is input?'); q.input(3, 'Code', code, 'Read the original booking code.', 'Count every character, including any space.'); q.set(4, 'Size', code.length, `The supplied LENGTH function returns ${code.length}.`, `Which characters occupy positions ${start} to ${start + length - 1}?`); q.set(5, 'Part', code.slice(start - 1, start - 1 + length), 'The supplied MID interface uses a first position and a character count, with positions starting at 1.', 'Does uppercasing change the original Code variable?'); q.set(6, 'UpperCode', code.toUpperCase(), 'The supplied TO_UPPER function returns text assigned to UpperCode. Code remains unchanged; leading zeros remain text.', 'Predict Size, Part and UpperCode.'); q.output(7, `${code.length}, ${code.slice(start - 1, start - 1 + length)}, ${code.toUpperCase()}`, 'Display the values with the comma separators supplied by the OUTPUT statement. The digits in Part are still text.');
    }
    if (key === 'procedure') {
      const seats = read('seats', 0, 20);
      q = trace(key, i, 'PROCEDURE ShowBooking(BYVAL Quantity : INTEGER)\n    OUTPUT "Seats: ", Quantity\nENDPROCEDURE\nDECLARE Seats : INTEGER\nINPUT Seats\nCALL ShowBooking(Seats)\nOUTPUT "Ready for next booking"', { Seats: null }, [seats]); q.add(4, 'The procedure is defined above. Its body runs only when called. Main code begins here.', 'Which value is read into Seats?'); q.input(5, 'Seats', seats, 'Read the caller’s Seats variable.', 'What value is passed to Quantity?'); q.add(6, 'CALL pauses the main program and enters ShowBooking.', 'What is the local parameter value?'); q.set(1, 'local.Quantity', seats, 'BYVAL creates a local copy of the argument value.', 'What will the procedure output?'); q.output(2, `Seats: ${seats}`, 'The procedure outputs its local Quantity.', 'Where will control return?'); delete q.state.variables['local.Quantity']; q.add(3, 'The local parameter ends. Control returns to the statement after CALL.', 'Which main-program statement follows CALL?'); q.output(7, 'Ready for next booking', 'Execution resumes in the caller.');
    }
    if (key === 'reference') {
      const total = read('total', 0, 20), seats = read('seats', 0, 10), mode = i.mode = choose(supplied.mode, ['BYREF', 'BYVAL'], 'Parameter mode');
      q = trace(key, i, `PROCEDURE AddSeats(BYVAL Quantity : INTEGER, ${mode} RunningTotal : INTEGER)\n    RunningTotal ← RunningTotal + Quantity\nENDPROCEDURE\nDECLARE Total, Seats : INTEGER\nINPUT Total\nINPUT Seats\nCALL AddSeats(Seats, Total)\nOUTPUT Total`, { Total: null, Seats: null }, [total, seats]);
      q.add(4, 'Main code declares the caller’s variables. The procedure body is not executed yet.', 'What is the starting Total?');
      q.input(5, 'Total', total, 'Read the initial caller Total.', 'How many seats are added?');
      q.input(6, 'Seats', seats, 'Read Seats.', 'Will RunningTotal alias Total or copy its value?');
      q.add(7, 'CALL passes the Seats value to Quantity and Total to RunningTotal, in that order.', 'What does the selected mode for RunningTotal mean?');
      q.state.variables['local.Quantity'] = seats;
      q.set(1, 'local.RunningTotal', total, mode === 'BYREF' ? 'Quantity is a separate value copy. RunningTotal refers to the same variable as caller Total.' : 'Quantity and RunningTotal are separate local copies of the argument values.', 'Which caller variable can the assignment affect?');
      if (mode === 'BYREF') q.state.variables.Total = total + seats;
      q.set(2, 'local.RunningTotal', total + seats, mode === 'BYREF' ? `Writing ${total + seats} through RunningTotal also changes Total immediately: these are two names for the same variable.` : `Only local RunningTotal becomes ${total + seats}. Caller Total remains ${total}.`, 'What remains after the procedure returns?');
      delete q.state.variables['local.Quantity']; delete q.state.variables['local.RunningTotal'];
      q.add(3, 'The procedure returns; its local parameter names end.', 'Predict the caller’s output.');
      q.output(8, mode === 'BYREF' ? total + seats : total, `OUTPUT reads caller Total after a ${mode} call.`);
    }
    if (key === 'function') {
      const seats = read('seats', 0, 20), price = read('price', 0, 100, false);
      q = trace(key, i, 'FUNCTION Charge(Quantity : INTEGER, PriceEach : REAL) RETURNS REAL\n    RETURN Quantity * PriceEach\nENDFUNCTION\nDECLARE Seats : INTEGER\nDECLARE Price, Total : REAL\nINPUT Seats\nINPUT Price\nTotal ← Charge(Seats, Price)\nOUTPUT Total', { Seats: null, Price: null, Total: null }, [seats, price]); q.add(4, 'Declare Seats in the caller. The function body runs only when called.', 'Which values may have a fractional part?'); q.add(5, 'Declare Price and Total as REAL.', 'Read Seats.'); q.input(6, 'Seats', seats, 'Read the seat count.', 'Read Price.'); q.input(7, 'Price', price, 'Read the price per seat.', 'Does Total change before the function returns?'); q.add(8, 'Evaluate the right-hand expression first: call Charge. Total is not assigned yet.', 'Which arguments enter the function?'); q.state.variables['local.Quantity'] = seats; q.set(1, 'local.PriceEach', price, 'The parameters receive the supplied argument values.', 'Predict the returned product.'); q.add(2, `RETURN supplies ${shown(seats * price)} to the call expression. No OUTPUT statement has executed.`, 'Which caller variable receives this returned value?', { returnValue: seats * price }); delete q.state.variables['local.Quantity']; delete q.state.variables['local.PriceEach']; q.set(8, 'Total', seats * price, 'The function call has produced a value; assignment now stores it in Total.', 'What statement displays Total?'); q.output(9, seats * price, 'OUTPUT displays the assigned value.');
    }
    if (key === 'efficiency') {
      const seats = read('seats', 0, 20), price = read('price', 0, 100, false), copies = read('copies', 0, 8), cost = seats * price;
      q = trace(key, i, 'DECLARE Seats, Copies, Index : INTEGER\nDECLARE Price, OriginalCost, Cost : REAL\nINPUT Seats\nINPUT Price\nINPUT Copies\n// Original version: calculate for every copy\nFOR Index ← 1 TO Copies\n    OriginalCost ← Seats * Price\n    OUTPUT OriginalCost\nNEXT Index\n// Improved version: calculate only when needed\nIF Copies > 0 THEN\n    Cost ← Seats * Price\n    FOR Index ← 1 TO Copies\n        OUTPUT Cost\n    NEXT Index\nENDIF', { Seats: null, Copies: null, Index: null, Price: null, OriginalCost: null, Cost: null }, [seats, price, copies]);
      q.add(1, 'Declare the quantity, copy count and loop control variable.', 'Which values can have a fractional part?');
      q.add(2, 'Declare the price and the two versions’ calculated costs.', 'Read the fixed booking inputs.', { metrics: { 'Original multiplications': 0, 'Improved multiplications': 0 } });
      q.input(3, 'Seats', seats, 'The booking quantity remains unchanged while copies are printed.', 'What is the unit price?');
      q.input(4, 'Price', price, 'The price remains unchanged in both versions.', 'How many copies are required?');
      q.input(5, 'Copies', copies, 'Both versions must print this many receipts.', 'Will the original loop execute at all?');
      q.set(7, 'Index', 1, `1 <= ${copies} is ${shown(copies > 0)}. ${copies ? 'Enter the original loop.' : 'The original loop has zero iterations.'}`, copies ? 'What does Seats * Price produce?' : 'Should the improved version perform any multiplication?');
      for (let index = 1; index <= copies; index++) {
        if (index > 1) q.add(7, `${index} <= ${copies} is TRUE. Enter the next original iteration.`, 'Have either multiplication operand changed?');
        q.state.metrics['Original multiplications'] = index;
        q.set(8, 'OriginalCost', cost, `Compute ${seats} × ${price} = ${shown(cost)} again for this copy.`, 'Which receipt value is printed?');
        q.output(9, cost, 'Print one original-version receipt.', 'How does the loop advance?');
        q.set(10, 'Index', index + 1, 'NEXT increments Index before another bound test.', 'Is another original copy required?');
      }
      if (copies > 0) q.add(7, `Index is ${copies + 1}, beyond Copies. The original version is complete.`, 'What does the improved guard test?');
      q.add(12, `Copies > 0 is ${shown(copies > 0)}. ${copies ? 'A calculation is needed.' : 'Skip both the calculation and the improved loop.'}`, copies ? 'How many times should this multiplication run?' : 'How many outputs and multiplications should each version have?');
      if (copies > 0) {
        q.state.metrics['Improved multiplications'] = 1;
        q.set(13, 'Cost', cost, 'Calculate the unchanged product once before printing the improved copies.', 'What work remains inside the loop?');
        q.set(14, 'Index', 1, 'Start the improved copy loop at 1.', 'Does printing a copy need another multiplication?');
        for (let index = 1; index <= copies; index++) {
          if (index > 1) q.add(14, `${index} <= ${copies} is TRUE. Print another improved copy.`, 'Which stored value is reused?');
          q.output(15, cost, 'Reuse Cost to print the same receipt value.', 'Is another copy required?');
          q.set(16, 'Index', index + 1, 'NEXT advances the improved loop.', 'Does Index still fit its bound?');
        }
        q.add(14, `Index is ${copies + 1}, beyond Copies.`, 'Do the two output groups match?');
      }
      q.add(17, `Both versions print ${copies} receipt(s). Multiplications: original ${copies}; improved ${copies ? 1 : 0}.`, 'Explain why the guard matters when Copies is zero.');
    }
    if (key === 'booking') {
      const count = read('count', 1, 5), values = list(supplied.attempts); i.attempts = values.join(', ');
      if (values.filter(v => v >= 1 && v <= 6).length < count) throw new RangeError(`Supply at least ${count} valid seat values (1–6) so every booking can be processed.`);
      q = trace(key, i, `FUNCTION ValidSeats(Quantity : INTEGER) RETURNS BOOLEAN\n    RETURN (Quantity >= 1) AND (Quantity <= 6)\nENDFUNCTION\nPROCEDURE RecordBooking(BYVAL Quantity : INTEGER, BYREF RunningTotal : INTEGER, BYREF GroupCount : INTEGER)\n    RunningTotal ← RunningTotal + Quantity\n    IF Quantity >= 3 THEN\n        GroupCount ← GroupCount + 1\n    ENDIF\nENDPROCEDURE\nDECLARE Index, Seats, Total, Groups : INTEGER\nTotal ← 0\nGroups ← 0\nFOR Index ← 1 TO ${count}\n    REPEAT\n        INPUT Seats\n    UNTIL ValidSeats(Seats)\n    CALL RecordBooking(Seats, Total, Groups)\nNEXT Index\nOUTPUT Total, ", ", Groups`, { Index: null, Seats: null, Total: null, Groups: null }, values);
      q.add(10, 'Main code begins here. Neither subprogram has executed yet.', 'What initial values do the accumulators need?');
      q.set(11, 'Total', 0, 'No accepted seats have been counted.', 'How many group bookings have been accepted?');
      q.set(12, 'Groups', 0, 'No group bookings have been accepted.', 'Which accepted booking slot is first?');
      let p = 0, total = 0, groups = 0;
      for (let index = 1; index <= count; index++) {
        q.set(13, 'Index', index, `Begin accepted booking slot ${index} of ${count}.`, 'Will an invalid attempt advance this outer slot?');
        let seats, valid;
        do {
          q.add(14, 'Begin an input attempt for the current slot.', 'What is the next prepared input?');
          seats = values[p++];
          q.input(15, 'Seats', seats, `Read ${seats}. This replaces the preceding attempt.`, 'What will ValidSeats return?');
          q.add(16, 'Evaluate the ValidSeats function before deciding whether to stop repeating.', 'Which argument is copied into Quantity?');
          q.set(1, 'local.Quantity', seats, 'The validation function receives a copied quantity. It does not update either accumulator.', 'Do both inclusive boundary comparisons hold?');
          valid = seats >= 1 && seats <= 6;
          q.add(2, `RETURN supplies ${shown(valid)} to the UNTIL expression. Nothing is output.`, 'Does this returned value end or repeat the input loop?', { returnValue: valid });
          delete q.state.variables['local.Quantity'];
          q.add(16, `UNTIL receives ${shown(valid)}. ${valid ? 'Finish validation for this slot.' : 'Repeat input in the same slot; Total and Groups stay unchanged.'}`, valid ? 'Which caller variables will RecordBooking update?' : 'Which input replaces this invalid attempt?');
        } while (!valid);
        q.add(17, 'CALL RecordBooking with the accepted Seats, caller Total and caller Groups.', 'Which parameter is copied and which two refer to caller storage?');
        q.state.variables['local.Quantity'] = seats;
        q.state.variables['local.RunningTotal'] = total;
        q.set(4, 'local.GroupCount', groups, 'Quantity is a value copy. RunningTotal refers to Total; GroupCount refers to Groups.', 'What is the new seat total?');
        total += seats;
        q.state.variables.Total = total;
        q.set(5, 'local.RunningTotal', total, `The reference assignment updates caller Total to ${total} immediately.`, 'Does this accepted quantity qualify as a group booking?');
        q.add(6, `${seats} >= 3 is ${shown(seats >= 3)}.`, seats >= 3 ? 'Which caller accumulator increments?' : 'Does the group count stay unchanged?');
        if (seats >= 3) { groups++; q.state.variables.Groups = groups; q.set(7, 'local.GroupCount', groups, `The reference assignment updates caller Groups to ${groups}.`, 'Where does the procedure continue?'); }
        q.add(8, 'The group-selection decision is complete.', 'Where does execution return after the procedure?');
        delete q.state.variables['local.Quantity']; delete q.state.variables['local.RunningTotal']; delete q.state.variables['local.GroupCount'];
        q.add(9, 'Local parameter names end. Caller Total and Groups retain the reference updates.', 'Does the outer loop now advance?');
        q.set(18, 'Index', index + 1, 'NEXT advances only after the accepted booking has been recorded.', 'Is another accepted slot required?');
      }
      q.add(13, `Index is ${count + 1}, beyond the final accepted slot.`, 'Predict both final report values.');
      q.output(19, `${total}, ${groups}`, `Display total seats and group bookings. ${values.length - p} prepared input value(s) remain unread.`);
    }
    return q.finish();
  }
  return { definitions, prepare, shown };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = Section11Models;
if (typeof window !== 'undefined') window.Section11Models = Section11Models;
