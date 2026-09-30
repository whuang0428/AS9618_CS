/* Deterministic classroom models. Amounts are calculated in whole cents. */
const section9Models = (() => {
  'use strict';
  const integer = (value, name, min = -99, max = 100) => {
    if (!Number.isInteger(value) || value < min || value > max) throw new RangeError(`${name} must be a whole number from ${min} to ${max}.`);
    return value;
  };
  const choice = (value, choices, name) => {
    if (!choices.includes(value)) throw new RangeError(`Choose a valid ${name}.`);
    return value;
  };
  const boolean = (value, name) => {
    if (typeof value !== 'boolean') throw new TypeError(`${name} must be TRUE or FALSE.`);
    return value;
  };
  function cents(value) {
    if (!['string', 'number'].includes(typeof value) || !/^\d+(?:\.\d{1,2})?$/.test(String(value))) throw new RangeError('Enter a non-negative amount with at most two decimal places.');
    const [whole, fraction = ''] = String(value).split('.');
    const amount = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
    if (!Number.isSafeInteger(amount) || amount > 10000000) throw new RangeError('The amount must not exceed 100000.00.');
    return amount;
  }
  const money = amount => (amount / 100).toFixed(2);
  function inputList(value) {
    const values = Array.isArray(value) ? [...value] : typeof value === 'string' && value.trim() ? value.split(',').map(part => {
      if (!/^-?\d+$/.test(part.trim())) throw new RangeError('Enter whole numbers separated by commas.');
      return Number(part.trim());
    }) : [];
    if (!values.length || values.length > 8) throw new RangeError('Enter between 1 and 8 values.');
    values.forEach(number => integer(number, 'Each value'));
    return values;
  }
  function recorder(code, initial = {}) {
    const variables = { ...initial };
    const output = [];
    const frames = [];
    const lines = code.map(([id, text]) => ({ id, text }));
    const record = (node, explanation, changes = {}, emitted = []) => {
      Object.assign(variables, changes);
      output.push(...emitted);
      const line = lines.find(item => item.id === node);
      if (!line) throw new Error(`Missing statement: ${node}`);
      frames.push(Object.freeze({ node, statement: line.text, explanation, variables: Object.freeze({ ...variables }), output: Object.freeze([...output]) }));
    };
    return { variables, record, finish: (meta = {}) => ({ code: lines, initial: Object.freeze({ ...initial }), frames: Object.freeze(frames), ...meta }) };
  }
  // -1 is the prediction state. Frames are immutable; going back never reverses arithmetic.
  function moveStep(step, action, count) {
    integer(count, 'Frame count', 1, 500);
    integer(step, 'Current step', -1, count - 1);
    if (action === 'reset') return -1;
    if (action === 'next') return Math.min(count - 1, step + 1);
    if (action === 'previous') return Math.max(-1, step - 1);
    throw new RangeError('Unknown navigation action.');
  }
  const formatValue = value => value === null ? 'Not assigned' : typeof value === 'boolean' ? String(value).toUpperCase() : String(value);

  function trace({ quantity = 2, student = true, variant = 'ipo', earlyOutput = false } = {}) {
    integer(quantity, 'Quantity', 0, 100);
    boolean(student, 'Student');
    choice(variant, ['ipo', 'assignment', 'selection'], 'trace');
    boolean(earlyOutput, 'Move output before assignment');
    const code = [['input', 'INPUT Quantity'], ...(earlyOutput ? [['early', 'OUTPUT Total']] : []), ['cost', 'Total ← Quantity * 25.00']];
    if (variant === 'assignment') code.push(['change', 'Quantity ← Quantity + 1']);
    if (variant === 'selection') code.push(['student', 'INPUT Student'], ['test', 'IF Student THEN'], ['discount', '    Total ← Total * 0.90'], ['endif', 'ENDIF']);
    code.push(['output', variant === 'assignment' ? 'OUTPUT Quantity, Total' : 'OUTPUT Total']);
    const r = recorder(code, { Quantity: null, Total: null, ...(variant === 'selection' ? { Student: null } : {}) });
    r.record('input', `Read ${quantity} from the order. Quantity now stores this value.`, { Quantity: quantity });
    if (earlyOutput) {
      r.record('early', 'Total has not been assigned a value. This order cannot produce a defined total; stop and fix the dependency instead of inventing a value.');
      return r.finish({ variant, error: 'unassigned-output', moneyKeys: ['Total'] });
    }
    let total = quantity * 2500;
    r.record('cost', `Multiply ${quantity} by 25.00. Store the result in Total.`, { Total: total / 100 });
    if (variant === 'assignment') r.record('change', `Read the old Quantity (${quantity}), add 1, then replace Quantity with ${quantity + 1}. Total keeps its earlier value.`, { Quantity: quantity + 1 });
    if (variant === 'selection') {
      r.record('student', `Read Student as ${formatValue(student)}.`, { Student: student });
      r.record('test', student ? 'The condition is TRUE, so execute the discount assignment.' : 'The condition is FALSE, so skip the discount assignment.');
      if (student) { total = total * 9 / 10; r.record('discount', 'The student pays 90% of the subtotal: a 10% discount.', { Total: total / 100 }); }
      r.record('endif', 'Both possible paths continue here. Only the selected path has run.');
    }
    r.record('output', 'Display the stored result. OUTPUT does not change either variable.', {}, [variant === 'assignment' ? `${quantity + 1}, ${money(total)}` : money(total)]);
    return r.finish({ variant, moneyKeys: ['Total'] });
  }

  function condition({ quantity = 2, places = 8, operator = 'AND', inclusive = true } = {}) {
    integer(quantity, 'Quantity', -99, 101); integer(places, 'Places left', 0, 100); boolean(inclusive, 'Include upper boundary');
    choice(operator, ['AND', 'OR', 'NOT'], 'logical operator');
    const a = quantity >= 1, b = inclusive ? quantity <= places : quantity < places;
    const inner = `(Quantity >= 1) ${operator === 'OR' ? 'OR' : 'AND'} (Quantity ${inclusive ? '<=' : '<'} PlacesLeft)`;
    const expression = operator === 'NOT' ? `NOT (${inner})` : inner;
    const result = operator === 'OR' ? a || b : operator === 'NOT' ? !(a && b) : a && b;
    const r = recorder([['lower', 'Quantity >= 1'], ['upper', `Quantity ${inclusive ? '<=' : '<'} PlacesLeft`], ['combine', expression]], { Quantity: quantity, PlacesLeft: places });
    r.record('lower', `${quantity} >= 1 is ${formatValue(a)}. This excludes a zero or negative request.`, { Lower: a });
    r.record('upper', `${quantity} ${inclusive ? '<=' : '<'} ${places} is ${formatValue(b)}. ${inclusive ? 'The last available ticket is included.' : 'The strict comparison excludes a request equal to the available places.'}`, { Upper: b });
    r.record('combine', `${operator === 'AND' ? 'Both comparisons must be TRUE.' : operator === 'OR' ? 'At least one comparison must be TRUE.' : 'NOT reverses the result of the whole AND expression.'} The expression is ${formatValue(result)}.`, { Result: result }, [formatValue(result)]);
    return r.finish({ result, correct: quantity >= 1 && quantity <= places, expression });
  }

  function selection({ quantity = 2, places = 8 } = {}) {
    integer(quantity, 'Quantity'); integer(places, 'Places left', 0, 100);
    const code = [['input', 'INPUT Quantity'], ['test', 'IF (Quantity >= 1) AND (Quantity <= PlacesLeft) THEN'], ['yes', '    OUTPUT "Accepted"'], ['else', 'ELSE'], ['no', '    OUTPUT "Rejected"'], ['end', 'ENDIF']];
    const r = recorder(code, { PlacesLeft: places, Quantity: null });
    r.record('input', `The order requests ${quantity} tickets.`, { Quantity: quantity });
    const accepted = quantity >= 1 && quantity <= places;
    r.record('test', `${quantity} >= 1 is ${formatValue(quantity >= 1)}; ${quantity} <= ${places} is ${formatValue(quantity <= places)}. AND gives ${formatValue(accepted)}.`);
    r.record(accepted ? 'yes' : 'no', accepted ? 'The quantity fits both limits. This check does not yet take payment or change the stock.' : 'At least one limit fails. Follow only the rejection branch.', {}, [accepted ? 'Accepted' : 'Rejected']);
    r.record('end', 'The paths rejoin. The other branch was not executed.');
    return r.finish({ variant: 'selection', accepted });
  }

  function positiveLoop({ values = [0, -2, 3], reversed = false } = {}) {
    const entries = inputList(values);
    boolean(reversed, 'Reverse condition');
    const r = recorder([['repeat', 'REPEAT'], ['prompt', '    OUTPUT "Enter a positive quantity"'], ['input', '    INPUT Quantity'], ['test', `UNTIL Quantity ${reversed ? '<=' : '>'} 0`], ['output', 'OUTPUT Quantity']], { Quantity: null });
    let attempts = 0;
    for (const quantity of entries) {
      r.record('repeat', 'Enter the body before testing the quantity.');
      r.record('prompt', 'Ask for a new value on every attempt.', {}, ['Enter a positive quantity']);
      attempts += 1;
      r.record('input', `Read ${quantity} on attempt ${attempts}.`, { Quantity: quantity });
      const accepted = reversed ? quantity <= 0 : quantity > 0;
      r.record('test', `${quantity} ${reversed ? '<=' : '>'} 0 is ${formatValue(accepted)}. UNTIL stops when its condition is TRUE.`);
      if (accepted) {
        r.record('output', quantity > 0 ? 'The input is positive. Display the accepted quantity.' : 'This reversed condition has stopped on an invalid quantity. The input does not meet the stated positive-quantity rule.', {}, [quantity]);
        return r.finish({ variant: 'repeat', mode: 'positive', iterations: attempts, inputsRead: attempts, stopped: true, waiting: false, accepted: quantity > 0 });
      }
    }
    r.record('input', 'Another attempt is required, but the supplied inputs have ended. Add a positive input to continue.');
    return r.finish({ variant: 'repeat', mode: 'positive', iterations: attempts, inputsRead: attempts, stopped: false, waiting: true, accepted: false });
  }
  function loop({ values = [2, 3, 1], variant = 'for', reversed = false, resetInside = false, mode = 'sentinel' } = {}) {
    const entries = inputList(values);
    choice(variant, ['for', 'conditional', 'while', 'repeat'], 'loop'); boolean(reversed, 'Reverse condition'); boolean(resetInside, 'Initialise inside loop');
    choice(mode, ['sentinel', 'positive'], 'REPEAT task');
    if (variant === 'repeat' && mode === 'positive') return positiveLoop({ values: entries, reversed });
    const counted = ['for', 'conditional'].includes(variant);
    if (!counted && entries.some(value => value < 0)) throw new RangeError('Use non-negative ticket quantities; 0 ends this sequence.');
    let total = 0, iterations = 0, read = 0;
    if (counted) {
      const code = resetInside ? [['test', `FOR Index ← 1 TO ${entries.length}`], ['init', '    Total ← 0'], ['input', '    INPUT Quantity']] : [['init', 'Total ← 0'], ['test', `FOR Index ← 1 TO ${entries.length}`], ['input', '    INPUT Quantity']];
      if (variant === 'conditional') code.push(['positive', '    IF Quantity > 0 THEN']);
      code.push(['add', `${variant === 'conditional' ? '        ' : '    '}Total ← Total + Quantity`]);
      if (variant === 'conditional') code.push(['endif', '    ENDIF']);
      code.push(['next', 'NEXT Index'], ['output', 'OUTPUT Total']);
      const r = recorder(code, { Total: null, Index: null, Quantity: null });
      if (!resetInside) r.record('init', 'Start the accumulator at zero before any inputs are added.', { Total: 0 });
      for (let index = 1; index <= entries.length; index += 1) {
        r.record('test', `Iteration ${index} of ${entries.length}. The FOR control permits this iteration.`, { Index: index });
        if (resetInside) { total = 0; r.record('init', 'Resetting the accumulator inside the body discards the sum from all earlier iterations.', { Total: 0 }); }
        const quantity = entries[index - 1]; read += 1; iterations += 1;
        r.record('input', `Read the next value, ${quantity}. Replace the previous Quantity.`, { Quantity: quantity });
        if (variant === 'conditional') r.record('positive', `${quantity} > 0 is ${formatValue(quantity > 0)}. ${quantity > 0 ? 'Add this value.' : 'Skip the addition.'}`);
        if (variant !== 'conditional' || quantity > 0) {
          const before = total; total += quantity;
          r.record('add', `The running total becomes ${before} + ${quantity} = ${total}.`, { Total: total });
        }
        if (variant === 'conditional') r.record('endif', 'Continue to the loop control, whether or not the addition ran.');
        r.record('next', `Advance the FOR control to ${index + 1}. Check whether another iteration is permitted.`, { Index: index + 1 });
      }
      r.record('test', `The next index would be ${entries.length + 1}, beyond the limit ${entries.length}. The loop control now exits without another input.`);
      r.record('output', 'Output once, after the complete loop.', {}, [total]);
      return r.finish({ variant, iterations, inputsRead: read, total, stopped: true, waiting: false });
    }
    const isWhile = variant === 'while';
    const comparison = isWhile ? (reversed ? '<=' : '>') : (reversed ? '<>' : '=');
    const code = [['init', 'Total ← 0']];
    if (isWhile) code.push(['input', 'INPUT Quantity'], ['test', `WHILE Quantity ${comparison} 0`], ['add', '    Total ← Total + Quantity'], ['read', '    INPUT Quantity'], ['end', 'ENDWHILE']);
    else code.push(['repeat', 'REPEAT'], ['input', '    INPUT Quantity'], ['nonzero', '    IF Quantity <> 0 THEN'], ['add', '        Total ← Total + Quantity'], ['endif', '    ENDIF'], ['test', `UNTIL Quantity ${comparison} 0`]);
    code.push(['output', 'OUTPUT Total']);
    const r = recorder(code, { Total: null, Quantity: null });
    r.record('init', 'Initialise the total once, before processing the sequence.', { Total: 0 });
    let quantity;
    const takeInput = node => {
      if (read >= entries.length) {
        r.record(node, 'The algorithm needs another input. The supplied list has ended, so execution is paused. Add another value or change the condition.');
        return false;
      }
      quantity = entries[read++];
      r.record(node, `Read ${quantity}. ${quantity === 0 ? 'Zero is the sentinel, not an order.' : 'This is the next ticket quantity.'}`, { Quantity: quantity });
      return true;
    };
    if (isWhile) {
      takeInput('input');
      while (true) {
        const continueLoop = comparison === '>' ? quantity > 0 : quantity <= 0;
        r.record('test', `${quantity} ${comparison} 0 is ${formatValue(continueLoop)}. WHILE continues when its condition is TRUE.`);
        if (!continueLoop) break;
        iterations += 1;
        const before = total; total += quantity;
        r.record('add', `Add ${quantity} to ${before}, giving ${total}.`, { Total: total });
        if (!takeInput('read')) return r.finish({ variant, total, iterations, inputsRead: read, stopped: false, waiting: true });
        r.record('end', 'Return to the WHILE condition before another addition.');
      }
    } else {
      while (true) {
        r.record('repeat', 'Enter the body before checking the stopping condition.');
        iterations += 1;
        if (!takeInput('input')) return r.finish({ variant, total, iterations, inputsRead: read, stopped: false, waiting: true });
        r.record('nonzero', `${quantity} <> 0 is ${formatValue(quantity !== 0)}. The sentinel must not be processed as an order.`);
        if (quantity !== 0) {
          const before = total; total += quantity;
          r.record('add', `Add ${quantity} to ${before}, giving ${total}.`, { Total: total });
        }
        r.record('endif', 'Continue to the test at the end of the body.');
        const stop = comparison === '=' ? quantity === 0 : quantity !== 0;
        r.record('test', `${quantity} ${comparison} 0 is ${formatValue(stop)}. UNTIL stops when its condition is TRUE.`);
        if (stop) break;
      }
    }
    r.record('output', 'The stopping rule has been met. Output the accumulated total once.', {}, [total]);
    return r.finish({ variant, total, iterations, inputsRead: read, stopped: true, waiting: false });
  }

  function twoStage({ values = [0, 5, 27, 4, 27, 0] } = {}) {
    const entries = inputList(values);
    const r = recorder([
      ['waiting', 'REPEAT'], ['first', '    INPUT Value'], ['gate', 'UNTIL Value = 27'], ['init', 'Total ← 0'],
      ['collectInput', 'INPUT Value'], ['collectTest', 'WHILE Value <> 0'], ['add', '    Total ← Total + Value'], ['more', '    INPUT Value'], ['collectEnd', 'ENDWHILE'], ['output', 'OUTPUT Total']
    ], { Total: null, Value: null });
    let read = 0, total = 0, ignored = 0, added = 0, number;
    const take = (node, explanation) => {
      if (read >= entries.length) { r.record(node, 'The supplied list has ended. Another input is required, so execution pauses without a final output.'); return false; }
      number = entries[read++];
      r.record(node, `Read ${number}. ${explanation}`, { Value: number });
      return true;
    };
    const finish = waiting => r.finish({ variant: 'two-stage', inputsRead: read, total, ignored, added, waiting, stopped: !waiting });
    while (true) {
      r.record('waiting', 'Enter the input body at least once. The first loop waits for 27.');
      if (!take('first', 'Values before the first 27 are not added.')) return finish(true);
      r.record('gate', `${number} = 27 is ${formatValue(number === 27)}. UNTIL stops this waiting loop only when the start signal is found; a zero here is ignored.`);
      if (number === 27) break;
      ignored += 1;
    }
    r.record('init', 'The waiting loop has finished. Initialise the total before collection.', { Total: 0 });
    if (!take('collectInput', 'The first 27 only started collection. Read a new value for the second loop.')) return finish(true);
    while (true) {
      r.record('collectTest', `${number} <> 0 is ${formatValue(number !== 0)}. This second condition uses zero as its stopping signal.`);
      if (number === 0) break;
      const before = total; total += number; added += 1;
      r.record('add', `Add ${number} to ${before}, giving ${total}. ${number === 27 ? 'A later 27 is ordinary data in this loop.' : 'Only values after the first 27 reach this addition.'}`, { Total: total });
      if (!take('more', 'Test this new value against zero.')) return finish(true);
      r.record('collectEnd', 'Return to the second condition, not the first one.');
    }
    r.record('output', 'The second loop has stopped. Output the accumulated total.', {}, [total]);
    return finish(false);
  }
  function flowLoop({ values = [2, 3, 1] } = {}) {
    const entries = inputList(values);
    const r = recorder([['init', 'Total ← 0'], ['index', 'Index ← 1'], ['test', `WHILE Index <= ${entries.length}`], ['input', '    INPUT Quantity'], ['add', '    Total ← Total + Quantity'], ['next', '    Index ← Index + 1'], ['endwhile', 'ENDWHILE'], ['output', 'OUTPUT Total']], { Total: null, Index: null, Quantity: null });
    let total = 0;
    r.record('init', 'Initialise the accumulator before the loop.', { Total: 0 });
    r.record('index', 'Make the first iteration index explicit.', { Index: 1 });
    for (let index = 1; index <= entries.length + 1; index += 1) {
      const continues = index <= entries.length;
      r.record('test', `${index} <= ${entries.length} is ${formatValue(continues)}. ${continues ? 'Follow the body.' : 'Exit to the final output.'}`);
      if (!continues) break;
      const quantity = entries[index - 1];
      r.record('input', `Read input ${index}: ${quantity}.`, { Quantity: quantity });
      const before = total; total += quantity;
      r.record('add', `${before} + ${quantity} = ${total}.`, { Total: total });
      r.record('next', `Increase Index from ${index} to ${index + 1}, then return to the comparison.`, { Index: index + 1 });
    }
    r.record('output', 'All supplied values have been processed. Output after the failed condition.', {}, [total]);
    return r.finish({ variant: 'loop', total, iterations: entries.length, inputsRead: entries.length, stopped: true, waiting: false });
  }

  const facts = {
    Quantity: { label: 'Requested quantity', value: '2' }, Performance: { label: 'Performance identifier', value: 'A or B' }, PlacesLeft: { label: 'Places left by performance', value: 'A: 8; B: 0' },
    TicketPrice: { label: 'Price per ticket', value: '25.00' }, Student: { label: 'Student discount applies', value: 'TRUE' },
    PosterColour: { label: 'Poster colour', value: 'Blue' }, EventName: { label: 'Event name', value: 'School concert' }
  };
  const purposes = {
    availability: { label: 'Decide whether the quantity is available', required: ['Quantity', 'Performance', 'PlacesLeft'], explanation: 'Match the requested performance to its availability: A has 8 places, B has 0. Quantity 2 is available for A but unavailable for B. Without the identifier those two requests cannot be distinguished.' },
    charge: { label: 'Calculate the basic ticket cost', required: ['Quantity', 'TicketPrice'], explanation: 'At this stage there is no discount. The quantity and ticket price determine the basic cost.' },
    poster: { label: 'Reproduce the event poster', required: ['EventName', 'PosterColour', 'TicketPrice'], explanation: 'For this simplified poster, reproduce the event name, background colour and advertised ticket price.' }
  };
  function abstraction({ purpose = 'availability', selected = ['Quantity', 'Performance', 'PlacesLeft'] } = {}) {
    choice(purpose, Object.keys(purposes), 'purpose');
    if (!Array.isArray(selected) || new Set(selected).size !== selected.length) throw new TypeError('Select each information item at most once.');
    selected.forEach(key => choice(key, Object.keys(facts), 'information item'));
    const required = purposes[purpose].required;
    const missing = required.filter(key => !selected.includes(key));
    const extra = selected.filter(key => !required.includes(key));
    return { purpose, missing, extra, sufficient: missing.length === 0, rows: selected.map(key => [facts[key].label, facts[key].value, required.includes(key) ? 'Needed for this purpose' : 'Not needed for this purpose']), explanation: purposes[purpose].explanation,
      result: missing.length ? `Cannot answer reliably: the model is missing ${missing.map(key => facts[key].label.toLowerCase()).join(', ')}.` : purpose === 'availability' ? 'Request 2 for A: available within 8. Request 2 for B: unavailable with 0 places.' : purpose === 'charge' ? '2 × 25.00 = 50.00 basic cost.' : 'The model can reproduce “School concert”, a blue background and price 25.00.' };
  }

  function modules({ quantity = 2, unitPrice = '25.00', student = true, mode = 'return' } = {}) {
    integer(quantity, 'Quantity', 1, 100); choice(mode, ['return', 'display'], 'module result');
    boolean(student, 'Student');
    const price = cents(unitPrice), subtotal = quantity * price, amount = student ? Math.round(subtotal * 9 / 10) : subtotal;
    const code = [['call', 'Charge ← CalculateCharge(Quantity, Student, TicketPrice)'], ['calculate', '    Result ← Quantity * TicketPrice'], ['discount', '    IF Student THEN Result ← Result * 0.90'], ['result', mode === 'return' ? '    RETURN Result' : '    OUTPUT Result'], ['caller', 'Caller uses Charge for payment and receipt']];
    const r = recorder(code, { Quantity: quantity, Student: student, TicketPrice: price / 100, Charge: null, Result: null });
    r.record('call', 'The caller supplies the quantity, discount status and price, and expects a numeric return value.');
    r.record('calculate', `Inside the module, ${quantity} × ${money(price)} gives ${money(subtotal)} before discount.`, { Result: subtotal / 100 });
    r.record('discount', student ? `Student is TRUE: the amount due becomes ${money(amount)}. Round to the nearest cent only if the chosen price produces a fractional cent.` : 'Student is FALSE: retain the undiscounted amount.', { Result: amount / 100 });
    r.record('result', mode === 'return' ? 'RETURN supplies this numeric value to the caller. It does not display a message.' : 'OUTPUT displays a value. It does not return that value to the caller.', mode === 'return' ? { Charge: amount / 100 } : {}, mode === 'display' ? [money(amount)] : []);
    r.record('caller', mode === 'return' ? 'Charge now holds the result. Both payment and receipt can use the same value.' : 'The assignment cannot obtain a numeric return value from this output-only module. The caller cannot continue using Charge; revise the interface.');
    return r.finish({ validInterface: mode === 'return', moneyKeys: ['TicketPrice', 'Charge', 'Result'] });
  }

  function payment({ quantity = 2, places = 8, total = '45.00', paid = '50.00' } = {}) {
    integer(quantity, 'Quantity', 1, 100); integer(places, 'Places left', quantity, 100);
    const due = cents(total), offered = cents(paid);
    const r = recorder([['input', 'INPUT Paid'], ['test', 'IF Paid >= Total THEN'], ['change', '    Change ← Paid - Total'], ['stock', '    PlacesLeft ← PlacesLeft - Quantity'], ['yes', '    OUTPUT "Confirmed", Change, PlacesLeft'], ['else', 'ELSE'], ['no', '    OUTPUT "Insufficient payment"'], ['end', 'ENDIF']], { Quantity: quantity, PlacesLeft: places, Total: due / 100, Paid: null, Change: null });
    r.record('input', `The earlier work established Total ${money(due)} and a valid quantity. Read the payment.`, { Paid: offered / 100 });
    const enough = offered >= due;
    r.record('test', `${money(offered)} >= ${money(due)} is ${formatValue(enough)}; equality is sufficient.`);
    if (enough) {
      r.record('change', 'Subtract the amount due from the payment.', { Change: (offered - due) / 100 });
      r.record('stock', 'Decrease available places only on the successful path.', { PlacesLeft: places - quantity });
      r.record('yes', 'Confirm using the calculated change and updated availability.', {}, [`Confirmed; change ${money(offered - due)}; places left ${places - quantity}`]);
    } else r.record('no', 'Report failure and leave PlacesLeft unchanged.', {}, ['Insufficient payment']);
    r.record('end', 'The payment responsibility is complete.');
    return r.finish({ moneyKeys: ['Total', 'Paid', 'Change'], outcome: enough ? 'confirmed' : 'unpaid' });
  }
  function points({ amount = '99.77', truncateFirst = false } = {}) {
    const original = cents(amount), whole = Math.floor(original / 100);
    boolean(truncateFirst, 'Choose band after truncating');
    const basis = truncateFirst ? whole * 100 : original;
    const rate = basis < 1000 ? 5 : basis <= 10000 ? 7 : 10;
    const r = recorder([['input', 'Read Amount'], ...(truncateFirst ? [['early', 'Discard the fraction before choosing the band']] : []), ['rate', 'Choose Rate: below 10 → 5; up to 100 → 7; above 100 → 10'], ['whole', 'Discard the fraction to obtain WholeDollars'], ['points', 'Points ← WholeDollars * Rate'], ['output', 'Output Points']], { Amount: null, Rate: null, WholeDollars: null, Points: null });
    r.record('input', `Keep the complete original amount, ${money(original)}.`, { Amount: original / 100 });
    if (truncateFirst) r.record('early', `This changed order uses ${whole} to choose the band. It can discard information needed at a boundary.`, { WholeDollars: whole });
    r.record('rate', `The ${truncateFirst ? 'truncated' : 'original'} amount ${money(basis)} selects rate ${rate}. The rate applies to all whole dollars.`, { Rate: rate });
    r.record('whole', `Discard the fraction of ${money(original)} to obtain ${whole}; do not round up.`, { WholeDollars: whole });
    r.record('points', `${whole} × ${rate} = ${whole * rate}.`, { Points: whole * rate });
    r.record('output', 'Display the calculated points.', {}, [whole * rate]);
    const correctRate = original < 1000 ? 5 : original <= 10000 ? 7 : 10;
    return r.finish({ moneyKeys: ['Amount'], correctPoints: whole * correctRate, calculatedPoints: whole * rate });
  }
  function refinement({ quantity = 2, student = true, detail = 'outline', missing = 'none', variant = 'charge', total = '45.00', paid = '50.00', places = 8, amount = '99.77', truncateFirst = false } = {}) {
    integer(quantity, 'Quantity', 1, 100); boolean(student, 'Student');
    choice(variant, ['charge', 'payment', 'points'], 'refinement task');
    choice(detail, ['goal', 'outline', 'operations'], 'detail level'); choice(missing, ['none', 'price', 'discount', 'output'], 'omitted rule');
    if (variant !== 'charge') {
      const isPayment = variant === 'payment';
      const rules = isPayment ? ['INPUT Paid', missing === 'price' ? 'Decide whether payment is sufficient' : 'IF Paid >= Total THEN', missing === 'discount' ? 'Update the sale appropriately' : 'Change ← Paid - Total; PlacesLeft ← PlacesLeft - Quantity', missing === 'output' ? 'Report the outcome appropriately' : 'Output confirmation, change and places on success; otherwise output insufficient payment']
        : ['Read the complete Amount', missing === 'price' ? 'Choose a suitable rate' : 'Choose Rate from original Amount: < 10 uses 5; <= 100 uses 7; otherwise 10', missing === 'discount' ? 'Use an appropriate whole-dollar value' : 'Discard the fractional part to obtain WholeDollars', 'Points ← WholeDollars * Rate', missing === 'output' ? 'Report appropriately' : 'Output Points'];
      if (!isPayment && truncateFirst) {
        [rules[1], rules[2]] = [rules[2], missing === 'price' ? 'Choose a suitable rate' : 'Changed order: choose Rate from WholeDollars, using the same band boundaries'];
      }
      const leaves = detail === 'goal' ? [isPayment ? 'Complete payment' : 'Award reward points'] : detail === 'outline' ? (isPayment ? ['Obtain payment', 'Check whether it is sufficient', 'Complete the sale or report failure'] : ['Obtain spending', 'Choose a rate', 'Determine earning units', 'Calculate and report points']) : rules;
      const ready = detail === 'operations' && missing === 'none';
      const unresolved = ready ? [] : [detail !== 'operations' ? 'The broad tasks still hide comparisons, calculations and output rules.' : missing === 'price' ? 'The condition and its boundaries have not been specified.' : missing === 'discount' ? 'The required calculation or state change is still unspecified.' : 'The required output is still unspecified.'];
      return { variant, leaves, ready, unresolved, run: ready ? isPayment ? payment({ quantity, places, total, paid }) : points({ amount, truncateFirst }) : null };
    }
    const leaves = detail === 'goal' ? ['Process an order'] : detail === 'outline' ? ['Obtain the quantity and discount status', 'Calculate the amount due', 'Report the amount due'] : [
      'INPUT Quantity', 'INPUT Student', missing === 'price' ? 'Work out a suitable subtotal' : 'Subtotal ← Quantity * 25.00',
      missing === 'discount' ? 'Apply a suitable discount' : 'IF Student THEN Total ← Subtotal * 0.90 ELSE Total ← Subtotal',
      missing === 'output' ? 'Report the result appropriately' : 'OUTPUT Total'
    ];
    const ready = detail === 'operations' && missing === 'none';
    const unresolved = detail === 'goal' ? ['The input, calculation, decision and output rules are unspecified.'] : detail === 'outline' ? ['The price and discount formula are still hidden inside “Calculate”. The final operations are not yet defined.'] : missing === 'none' ? [] : [missing === 'price' ? 'The subtotal has no stated unit price or multiplication rule.' : missing === 'discount' ? 'The discount condition and percentage are unspecified.' : 'The value to display is unspecified.'];
    return { variant, leaves, ready, unresolved, run: ready ? trace({ quantity, student, variant: 'selection' }) : null };
  }

  function ticket({ quantity = 2, places = 8, student = true, paid = '50.00' } = {}) {
    integer(quantity, 'Quantity'); integer(places, 'Places left', 0, 100); boolean(student, 'Student');
    const payment = cents(paid);
    const r = recorder([
      ['quantity', 'INPUT Quantity'], ['places', 'INPUT PlacesLeft'], ['available', 'IF (Quantity >= 1) AND (Quantity <= PlacesLeft) THEN'],
      ['student', '    INPUT Student'], ['subtotal', '    Subtotal ← Quantity * 25.00'], ['discountTest', '    IF Student THEN'],
      ['discount', '        Total ← Subtotal * 0.90'], ['priceElse', '    ELSE'], ['regular', '        Total ← Subtotal'], ['priceEnd', '    ENDIF'], ['due', '    OUTPUT Total'],
      ['paid', '    INPUT Paid'], ['payment', '    IF Paid >= Total THEN'], ['change', '        Change ← Paid - Total'],
      ['stock', '        PlacesLeft ← PlacesLeft - Quantity'], ['confirmed', '        OUTPUT "Confirmed", Change, PlacesLeft'],
      ['paymentElse', '    ELSE'], ['unpaid', '        OUTPUT "Insufficient payment"'], ['paymentEnd', '    ENDIF'], ['quantityElse', 'ELSE'], ['unavailable', '    OUTPUT "Unavailable"'], ['quantityEnd', 'ENDIF']
    ], { Quantity: null, PlacesLeft: null, Student: null, Subtotal: null, Total: null, Paid: null, Change: null });
    r.record('quantity', `Read the requested ${quantity} tickets.`, { Quantity: quantity });
    r.record('places', `Read ${places} available places.`, { PlacesLeft: places });
    const available = quantity >= 1 && quantity <= places;
    r.record('available', `${quantity} >= 1 is ${formatValue(quantity >= 1)}; ${quantity} <= ${places} is ${formatValue(quantity <= places)}. AND gives ${formatValue(available)}.`);
    if (!available) {
      r.record('unavailable', 'The quantity fails the availability rule. Do not calculate a charge, read payment or change the stock.', {}, ['Unavailable']);
      return r.finish({ outcome: 'unavailable', placesLeft: places, moneyKeys: ['Subtotal', 'Total', 'Paid', 'Change'] });
    }
    r.record('student', `Read Student as ${formatValue(student)}.`, { Student: student });
    const subtotal = quantity * 2500, total = student ? subtotal * 9 / 10 : subtotal;
    r.record('subtotal', `${quantity} × 25.00 gives ${money(subtotal)} before any discount.`, { Subtotal: subtotal / 100 });
    r.record('discountTest', `Student is ${formatValue(student)}. Choose one pricing branch.`);
    r.record(student ? 'discount' : 'regular', student ? `Pay 90% of ${money(subtotal)}: ${money(total)}.` : 'Keep the complete subtotal; no discount applies.', { Total: total / 100 });
    r.record('due', 'Display the amount due before asking for payment.', {}, [money(total)]);
    r.record('paid', `Read payment of ${money(payment)}.`, { Paid: payment / 100 });
    const enough = payment >= total;
    r.record('payment', `${money(payment)} >= ${money(total)} is ${formatValue(enough)}. Exact payment is sufficient.`);
    if (enough) {
      r.record('change', `${money(payment)} − ${money(total)} gives the change.`, { Change: (payment - total) / 100 });
      r.record('stock', `Payment succeeded. Only now reduce the stock: ${places} − ${quantity} = ${places - quantity}.`, { PlacesLeft: places - quantity });
      r.record('confirmed', 'Confirm the purchase and display the change and remaining places.', {}, [`Confirmed; change ${money(payment - total)}; places left ${places - quantity}`]);
    } else r.record('unpaid', 'Do not confirm or reduce the stock. The available places remain unchanged.', {}, ['Insufficient payment']);
    return r.finish({ outcome: enough ? 'confirmed' : 'unpaid', placesLeft: enough ? places - quantity : places, totalCents: total, changeCents: enough ? payment - total : null, moneyKeys: ['Subtotal', 'Total', 'Paid', 'Change'] });
  }
  return { integer, cents, money, inputList, formatValue, moveStep, trace, condition, selection, loop, flowLoop, positiveLoop, twoStage, facts, purposes, abstraction, modules, payment, points, refinement, ticket };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = section9Models;
if (typeof window !== 'undefined') window.Section9Models = section9Models;
