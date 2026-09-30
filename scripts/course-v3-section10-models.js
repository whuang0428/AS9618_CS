/* Section 10: deterministic teaching models, shared by browser experiments and Node tests. */
const S10Models = (() => {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const whole = (value, min, max) => Number.isInteger(value) && value >= min && value <= max;
  const outcome = (state, ok, line, message) => ({ state, ok, line, message });
  const reject = (state, message) => outcome(state, false, 'No assignment executed', message);
  function numbers(value, max = 8) {
    const parts = Array.isArray(value) ? value : String(value).split(',').map(part => part.trim());
    if (!parts.length || parts.length > max || parts.some(part => part === '' || !Number.isFinite(Number(part)) || Math.abs(Number(part)) > 999)) throw new RangeError(`Enter 1–${max} numbers from −999 to 999, separated by commas.`);
    return parts.map(Number);
  }
  function frames(initial) {
    const list = [];
    let current = clone(initial);
    return {
      add(patch, line, why, predict) {
        current = { ...current, ...clone(patch), line, why, predict };
        list.push(clone(current));
      },
      list
    };
  }
  function createHistory(state) { return { past: [], present: clone(state), future: [] }; }
  function recordHistory(history, state) { return { past: [...history.past, clone(history.present)], present: clone(state), future: [] }; }
  function moveHistory(history, direction) {
    if (direction === 'back') return history.past.length ? { past: history.past.slice(0, -1), present: clone(history.past.at(-1)), future: [clone(history.present), ...history.future] } : history;
    if (direction === 'next') return history.future.length ? { past: [...history.past, clone(history.present)], present: clone(history.future[0]), future: history.future.slice(1) } : history;
    throw new RangeError('Unknown history direction.');
  }
  function createRecord() { return { Name: 'Asha', Seats: 2, Paid: false, Category: 'S', Price: 7.5 }; }
  const fieldTypes = { Name: 'STRING', Seats: 'INTEGER', Paid: 'BOOLEAN', Category: 'CHAR', Price: 'REAL' };
  function assignField(state, field, raw) {
    if (!(field in fieldTypes)) return reject(state, 'Choose a field declared in BookingRecord.');
    let value = String(raw);
    if (/[\u0000-\u001f\u007f]/u.test(value)) return reject(state, 'Use printable characters so the assignment stays on one line.');
    if (field === 'Name' && (!value.trim() || value.length > 24)) return reject(state, 'Use 1–24 characters for Name in this display.');
    if (field === 'Name' && value.includes('"')) return reject(state, 'Use a name without double quotes in this literal display.');
    if (field === 'Category' && [...value].length !== 1) return reject(state, 'CHAR holds exactly one character; the field has not changed.');
    if (field === 'Category' && value === "'") return reject(state, 'Use a character other than a single quote in this literal display.');
    if (field === 'Paid') {
      if (!['TRUE', 'FALSE'].includes(value.toUpperCase())) return reject(state, 'BOOLEAN accepts TRUE or FALSE.');
      value = value.toUpperCase() === 'TRUE';
    }
    if (field === 'Seats' || field === 'Price') {
      if (value.trim() === '' || !Number.isFinite(Number(value)) || Math.abs(Number(value)) > 999 || (field === 'Seats' && !Number.isInteger(Number(value)))) return reject(state, `${fieldTypes[field]} needs ${field === 'Seats' ? 'a whole' : 'a finite'} number from −999 to 999 in this model.`);
      value = Number(value);
    }
    const literal = typeof value === 'string' ? field === 'Category' ? `'${value}'` : `"${value}"` : field === 'Price' && Number.isInteger(value) ? value.toFixed(1) : String(value).toUpperCase();
    return outcome({ ...state, [field]: value }, true, `Booking.${field} ← ${literal}`, `Only the ${field} field changes. The record still groups fields with their declared data types.`);
  }
  function createArray(values = [8, 3, 5, 3, 1], lower = 1) {
    const data = numbers(values);
    if (!whole(lower, 0, 1)) throw new RangeError('Choose lower bound 0 or 1.');
    return { values: data, lower, upper: lower + data.length - 1, focus: [], output: null };
  }
  function arrayAction(state, action, index, value) {
    if (!whole(index, state.lower, state.upper)) return reject(state, `Index ${index} is outside ${state.lower}…${state.upper}. No array element exists there.`);
    const next = clone(state), offset = index - state.lower;
    next.focus = [offset];
    if (action === 'read') { next.output = next.values[offset]; return outcome(next, true, `OUTPUT Values[${index}]`, `Index ${index} selects one position; the stored value is ${next.output}. Reading does not change it.`); }
    if (action !== 'write') throw new RangeError('Unknown array action.');
    if (!Number.isFinite(value) || Math.abs(value) > 999) return reject(state, 'Enter a number from −999 to 999.');
    const old = next.values[offset]; next.values[offset] = value;
    return outcome(next, true, `Values[${index}] ← ${value}`, `The value at index ${index} changes from ${old} to ${value}. The index stays ${index}; the other elements are unchanged.`);
  }
  function traversalTrace(values, operation = 'sum', direction = 'forward') {
    const data = numbers(values);
    if (!['sum', 'count', 'max'].includes(operation) || !['forward', 'reverse'].includes(direction)) throw new RangeError('Unknown traversal mode.');
    const order = data.map((_, i) => i); if (direction === 'reverse') order.reverse();
    const variable = { sum: 'Total', count: 'Count', max: 'Maximum' }[operation];
    const vars = { Index: null, [variable]: null };
    const trace = frames({ values: data, lower: 1, focus: [], variables: vars, done: false, visited: [] });
    trace.add({}, 'No assignments yet', 'Read the values and identify the first index to visit.', operation === 'max' ? 'Why can Maximum ← 0 fail for an all-negative array?' : `What initial value should ${variable} have?`);
    let answer = operation === 'max' ? data[order[0]] : 0;
    vars[variable] = answer;
    const visited = operation === 'max' ? [order[0]] : [];
    trace.add({ variables: vars, visited, focus: operation === 'max' ? [order[0]] : [] }, `${variable} ← ${operation === 'max' ? `Values[${order[0] + 1}]` : 0}`, operation === 'max' ? `Read the first element (${answer}) to initialise Maximum. Only the remaining elements need comparison.` : `${variable} starts at zero, before processing any element.`, visited.length === data.length ? 'Are there any remaining elements to compare?' : 'Which index is visited next?');
    for (const index of operation === 'max' ? order.slice(1) : order) {
      vars.Index = index + 1;
      trace.add({ variables: vars, focus: [index], visited }, `Index ← ${index + 1}`, `This visit reads Values[${index + 1}] = ${data[index]}.`, operation === 'sum' ? `What will Total become after adding ${data[index]}?` : operation === 'count' ? 'Is this value greater than zero? Does Count change?' : `Is ${data[index]} greater than Maximum (${answer})?`);
      const before = answer;
      if (operation === 'sum') answer += data[index];
      if (operation === 'count' && data[index] > 0) answer++;
      if (operation === 'max' && data[index] > answer) answer = data[index];
      vars[variable] = answer; visited.push(index);
      trace.add({ variables: vars, visited }, operation === 'sum' ? `Total ← ${before} + ${data[index]}` : operation === 'count' ? data[index] > 0 ? 'IF Values[Index] > 0 THEN Count ← Count + 1' : 'IF Values[Index] > 0: FALSE (Count unchanged)' : data[index] > before ? 'IF Values[Index] > Maximum THEN Maximum ← Values[Index]' : 'IF Values[Index] > Maximum: FALSE (Maximum unchanged)', `${variable}: ${before} → ${answer}. ${operation === 'count' ? 'Count measures qualifying elements, not their sum.' : operation === 'max' ? 'The maximum comes from the values visited so far.' : 'Total includes every value visited so far.'}`, visited.length < data.length ? 'Which index will the loop visit next?' : 'Have all elements been visited exactly once?');
    }
    trace.add({ done: true, focus: [] }, `OUTPUT ${variable}`, `${variable} = ${answer}. The ${direction} traversal visited all ${data.length} elements exactly once.`, 'Change the order or include negative values. Which results should stay the same?');
    return trace.list;
  }
  function matrixTrace(rows) {
    const matrix = rows.map(row => numbers(row, 4));
    if (matrix.length < 1 || matrix.length > 4 || matrix.some(row => row.length !== matrix[0].length)) throw new RangeError('Use 1–4 rows with the same number of columns (1–4).');
    const rowTotals = matrix.map(() => 0), columnTotals = matrix[0].map(() => 0);
    let grand = 0;
    const trace = frames({ matrix, rowTotals, columnTotals, grand, focus: [], variables: { Row: null, Column: null }, done: false });
    trace.add({}, 'Initialise each total to 0', 'Row totals, column totals and the grand total start at zero.', 'Which cell does the outer Row loop and inner Column loop visit first?');
    for (let r = 0; r < matrix.length; r++) for (let c = 0; c < matrix[r].length; c++) {
      trace.add({ focus: [r, c], variables: { Row: r + 1, Column: c + 1 } }, `Row ← ${r + 1}; Column ← ${c + 1}`, `Read Seats[${r + 1}, ${c + 1}] = ${matrix[r][c]}. The row index is written first.`, `Which row total and column total receive ${matrix[r][c]}?`);
      rowTotals[r] += matrix[r][c]; columnTotals[c] += matrix[r][c]; grand += matrix[r][c];
      trace.add({ rowTotals, columnTotals, grand }, 'RowTotal[Row] ← RowTotal[Row] + Seats[Row, Column]\nColumnTotal[Column] ← ColumnTotal[Column] + Seats[Row, Column]\nGrandTotal ← GrandTotal + Seats[Row, Column]', `Add ${matrix[r][c]} once to each relevant total. ${c === matrix[r].length - 1 ? 'The inner loop has reached the last column in this row.' : 'The next visit stays in this row and advances the column.'}`, c === matrix[r].length - 1 ? 'When another row starts, where must Column restart?' : 'Which cell comes next?');
    }
    trace.add({ done: true, focus: [] }, 'OUTPUT GrandTotal', `GrandTotal = ${grand}. Adding the row totals or the column totals gives the same result.`, 'Try a rectangle rather than a square. Why do the two loops need different upper bounds?');
    return trace.list;
  }
  function searchTrace(values, target) {
    const data = numbers(values);
    if (!Number.isFinite(target)) throw new RangeError('Enter a numeric target.');
    const vars = { Index: 1, Found: false, Position: -1, Target: target };
    const trace = frames({ values: data, lower: 1, focus: [], variables: vars, done: false, visited: [] });
    const visited = [];
    trace.add({}, 'Index ← 1; Found ← FALSE; Position ← −1', '−1 is the not-found result in this example; valid array indices start at 1.', 'Does the current element equal Target?');
    for (let i = 0; i < data.length; i++) {
      vars.Index = i + 1;
      trace.add({ focus: [i], variables: vars, visited }, `IF Values[Index] = Target (${data[i]} = ${target})`, `Compare the value ${data[i]} at index ${i + 1} with target ${target}.`, 'Will Found change, or must Index advance?');
      visited.push(i);
      if (data[i] === target) {
        vars.Found = true; vars.Position = i + 1;
        trace.add({ variables: vars, visited, done: true }, 'Found ← TRUE; Position ← Index', `First match at index ${i + 1}. Stop: later duplicates are not visited.`, 'Change Target to an absent value, then to the first or last element.');
        return trace.list;
      }
      vars.Index = i + 2;
      trace.add({ variables: vars, visited, focus: [] }, 'Index ← Index + 1', i + 1 === data.length ? `Index becomes ${vars.Index}, beyond the upper bound. The loop ends before another array read.` : 'The comparison was false. Advance to the next index.', i + 1 === data.length ? 'What result represents no matching element?' : 'Which value will be compared next?');
    }
    trace.add({ done: true }, 'Loop ends: Index > UpperBound', 'Every element was checked. Found is FALSE and Position remains −1.', 'Explain why the target value and its array index are different concepts.');
    return trace.list;
  }
  function sortTrace(values, order = 'ascending') {
    const data = numbers(values);
    if (!['ascending', 'descending'].includes(order)) throw new RangeError('Unknown sort order.');
    const trace = frames({ values: data, lower: 1, focus: [], variables: { Pass: 0, Index: null, Last: data.length, Temp: null, Swapped: false }, sortedFrom: data.length, done: false });
    const vars = { Pass: 0, Index: null, Last: data.length, Temp: null, Swapped: false };
    trace.add({}, 'Last ← UpperBound', 'Only adjacent values are compared. A complete pass moves an extreme value into its final position.', 'For this order, which adjacent pairs are out of order?');
    while (vars.Last > 1) {
      vars.Pass++; vars.Swapped = false; vars.Temp = null; vars.Index = 1;
      trace.add({ variables: vars, focus: [] }, 'Swapped ← FALSE; Index ← 1', `Pass ${vars.Pass} compares indices 1 to ${vars.Last - 1} with their right neighbours.`, 'Will the first pair need a swap?');
      for (let i = 0; i < vars.Last - 1; i++) {
        vars.Index = i + 1;
        const swap = order === 'ascending' ? data[i] > data[i + 1] : data[i] < data[i + 1];
        trace.add({ values: data, variables: vars, focus: [i, i + 1] }, `IF Values[Index] ${order === 'ascending' ? '>' : '<'} Values[Index + 1]`, `${data[i]} ${order === 'ascending' ? '>' : '<'} ${data[i + 1]} is ${String(swap).toUpperCase()}. ${swap ? 'Save the left value before overwriting it.' : 'This pair stays in place; equal values do not swap.'}`, swap ? 'What must Temp store?' : 'Which adjacent pair is compared next?');
        if (swap) {
          vars.Temp = data[i];
          trace.add({ variables: vars }, 'Temp ← Values[Index]', `Temp preserves ${vars.Temp}. The array is unchanged so far.`, 'After copying the right value left, where is the old left value preserved?');
          data[i] = data[i + 1];
          trace.add({ values: data }, 'Values[Index] ← Values[Index + 1]', 'The two array cells temporarily contain the same value. Temp still holds the value needed for the right cell.', 'What value should go into the right cell?');
          data[i + 1] = vars.Temp; vars.Swapped = true;
          trace.add({ values: data, variables: vars }, 'Values[Index + 1] ← Temp; Swapped ← TRUE', 'The swap is complete. The two original values have exchanged positions.', 'Has one pair been processed, or has the whole pass finished?');
        }
      }
      vars.Last--;
      trace.add({ values: data, variables: vars, focus: [], sortedFrom: vars.Last }, 'Last ← Last − 1', `Pass ${vars.Pass} is complete. Index ${vars.Last + 1} is in its final position; the next pass uses a smaller bound.`, vars.Swapped && vars.Last > 1 ? 'Why can the next pass ignore the sorted end?' : 'Why is another pass unnecessary?');
      if (!vars.Swapped) break;
    }
    trace.add({ values: data, done: true, focus: [], sortedFrom: 0 }, 'Stop when no swaps occurred OR Last ≤ 1', `Sorted in ${order} order after ${vars.Pass} pass${vars.Pass === 1 ? '' : 'es'}.`, 'Try already sorted data, reversed data and duplicate values. Compare the number of passes.');
    return trace.list;
  }
  function createFile(lines = ['Asha', '', 'Ben']) {
    if (!Array.isArray(lines) || lines.length > 8 || lines.some(line => typeof line !== 'string' || line.length > 24)) throw new RangeError('Use at most 8 lines of at most 24 characters each.');
    return { stored: clone(lines), mode: null, pointer: null, variable: null, eof: null };
  }
  function fileAction(state, action, value = '') {
    const next = clone(state);
    if (['READ', 'WRITE', 'APPEND'].includes(action)) {
      if (state.mode) return reject(state, 'Close the current file handle before opening another mode.');
      next.mode = action; next.pointer = action === 'APPEND' ? next.stored.length : 0; next.eof = null;
      if (action === 'WRITE') next.stored = [];
      return outcome(next, true, `OPENFILE "Names.txt" FOR ${action}`, action === 'WRITE' ? 'WRITE opens an empty file, replacing the previous contents immediately in this model.' : action === 'APPEND' ? 'APPEND preserves existing lines and positions the next write at the end.' : 'READ begins before the first line. Stored contents are unchanged.');
    }
    if (action === 'close') {
      if (!state.mode) return reject(state, 'No file handle is open.');
      next.mode = null; next.pointer = null; next.eof = null;
      return outcome(next, true, 'CLOSEFILE "Names.txt"', 'The handle is closed. File contents remain available for the next open; the last variable value remains in working memory.');
    }
    if (action === 'read' || action === 'eof') {
      if (state.mode !== 'READ') return reject(state, 'Open the file FOR READ before reading or checking EOF.');
      next.eof = state.pointer >= state.stored.length;
      if (action === 'eof') return outcome(next, true, 'EOF("Names.txt")', `EOF is ${String(next.eof).toUpperCase()}: ${next.eof ? 'no unread line remains' : 'at least one unread line remains; a blank line is still a line'}. Checking EOF does not advance the position.`);
      if (next.eof) return reject(state, 'READFILE refused: EOF is TRUE. No unread line remains and the variable is unchanged.');
      next.variable = state.stored[state.pointer]; next.pointer++; next.eof = next.pointer >= next.stored.length;
      return outcome(next, true, 'READFILE "Names.txt", Name', `Line ${state.pointer + 1} is copied into Name ${next.variable === '' ? 'as an empty string (a valid blank line)' : `as "${next.variable}"`}. The next read position advances; stored data is unchanged.`);
    }
    if (action === 'write') {
      if (!['WRITE', 'APPEND'].includes(state.mode)) return reject(state, 'Open the file FOR WRITE or FOR APPEND before writing.');
      if (typeof value !== 'string' || value.length > 24 || /[\u0000-\u001f\u007f]/u.test(value) || state.stored.length >= 8) return reject(state, 'This display allows at most 8 lines, each with at most 24 printable characters.');
      next.stored.push(value); next.pointer = next.stored.length;
      return outcome(next, true, 'WRITEFILE "Names.txt", Line', `The input value Line is written as one ${value === '' ? 'blank ' : ''}line at the end. The stored file now contains ${next.stored.length} lines.`);
    }
    throw new RangeError('Unknown file action.');
  }
  function createStack(capacity = 5, values = []) {
    if (!whole(capacity, 1, 8) || values.length > capacity) throw new RangeError('Choose capacity 1–8; initial values must fit.');
    return { slots: Array.from({ length: capacity }, (_, i) => values[i] ?? null), top: values.length - 1, output: null };
  }
  function stackAction(state, action, value) {
    const next = clone(state);
    if (action === 'push') {
      if (state.top === state.slots.length - 1) return reject(state, 'Overflow: Top is at the last valid index. No value is pushed.');
      next.top++; next.slots[next.top] = value;
      return outcome(next, true, 'Top ← Top + 1\nStack[Top] ← NewItem', `Push stores ${value} at index ${next.top}. Top identifies the last occupied position.`);
    }
    if (action === 'pop') {
      if (state.top === -1) return reject(state, 'Underflow: Top = −1, so the stack is empty. No array element is read.');
      next.output = next.slots[next.top]; next.top--;
      return outcome(next, true, 'Item ← Stack[Top]\nTop ← Top − 1', `Pop returns ${next.output}. The old slot may retain stale data, but it is outside the active stack.`);
    }
    throw new RangeError('Unknown stack action.');
  }
  function createQueue(capacity = 5, values = []) {
    if (!whole(capacity, 1, 8) || values.length > capacity) throw new RangeError('Choose capacity 1–8; initial values must fit.');
    return { slots: Array.from({ length: capacity }, (_, i) => values[i] ?? null), front: 0, rear: values.length - 1, count: values.length, output: null };
  }
  function queueIndices(state) { return Array.from({ length: state.count }, (_, i) => (state.front + i) % state.slots.length); }
  function queueAction(state, action, value) {
    const next = clone(state), capacity = state.slots.length;
    if (action === 'enqueue') {
      if (state.count === capacity) return reject(state, 'Overflow: Count equals capacity. No item is enqueued and both pointers stay unchanged.');
      next.rear = (next.rear + 1) % capacity; next.slots[next.rear] = value; next.count++;
      return outcome(next, true, 'Rear ← (Rear + 1) MOD Capacity\nQueue[Rear] ← NewItem\nCount ← Count + 1', `Enqueue stores ${value} at index ${next.rear}. Rear identifies the last inserted item; Front identifies the next removal.`);
    }
    if (action === 'dequeue') {
      if (state.count === 0) return reject(state, 'Underflow: Count = 0. No item is read and both pointers stay unchanged.');
      next.output = next.slots[next.front]; next.front = (next.front + 1) % capacity; next.count--;
      return outcome(next, true, 'Item ← Queue[Front]\nFront ← (Front + 1) MOD Capacity\nCount ← Count − 1', `Dequeue returns ${next.output}. The former front slot is now free even if its old value remains visible.`);
    }
    throw new RangeError('Unknown queue action.');
  }
  function createLinked(values = ['Asha', 'Ben', 'Chen'], capacity = 6) {
    if (!whole(capacity, 1, 8) || values.length > capacity) throw new RangeError('Choose capacity 1–8; initial values must fit.');
    const order = [2, 0, 4, 1, 3, 5, 6, 7].filter(index => index < capacity);
    const slots = Array.from({ length: capacity }, () => ({ data: null, next: -1 }));
    order.forEach((slot, i) => { slots[slot] = { data: i < values.length ? values[i] : null, next: i === values.length - 1 || i === order.length - 1 ? -1 : order[i + 1] }; });
    return { slots, head: values.length ? order[0] : -1, freeHead: values.length < capacity ? order[values.length] : -1, output: null };
  }
  function chain(state, start = state.head) {
    const indices = [], seen = new Set();
    let p = start;
    while (p !== -1) {
      if (!whole(p, 0, state.slots.length - 1) || seen.has(p)) throw new Error('Invalid or cyclic linked-list chain.');
      seen.add(p); indices.push(p); p = state.slots[p].next;
    }
    return indices;
  }
  function linkedAction(state, action, position, value) {
    const active = chain(state), next = clone(state);
    if (!whole(position, 1, action === 'insert' ? active.length + 1 : active.length)) return reject(state, `Use a logical position from 1 to ${action === 'insert' ? active.length + 1 : active.length}. This is a position in the chain, not a physical array index.`);
    const offset = position - 1, previous = offset ? active[offset - 1] : -1;
    if (action === 'insert') {
      if (state.freeHead === -1) return reject(state, 'The free list is empty. All array slots are active; no insertion occurs.');
      const fresh = next.freeHead;
      next.freeHead = next.slots[fresh].next;
      next.slots[fresh] = { data: value, next: active[offset] ?? -1 };
      if (previous === -1) next.head = fresh; else next.slots[previous].next = fresh;
      return outcome(next, true, `New ← FreeHead\nFreeHead ← Next[New]\nData[New] ← NewItem\nNext[New] ← ${active[offset] ?? -1}\n${previous === -1 ? 'Head' : `Next[${previous}]`} ← New`, `Take free slot ${fresh}, preserve the remaining free chain, then link the new node at logical position ${position}. No existing data value moves.`);
    }
    const slot = active[offset];
    if (action === 'update') { next.slots[slot].data = value; return outcome(next, true, `Data[${slot}] ← NewItem`, `Follow ${offset} link${offset === 1 ? '' : 's'} from Head to physical slot ${slot}. Updating data leaves all links unchanged.`); }
    if (action === 'delete') {
      next.output = next.slots[slot].data;
      if (previous === -1) next.head = next.slots[slot].next; else next.slots[previous].next = next.slots[slot].next;
      next.slots[slot].next = next.freeHead; next.freeHead = slot;
      return outcome(next, true, `${previous === -1 ? 'Head' : `Next[${previous}]`} ← Next[${slot}]\nNext[${slot}] ← FreeHead\nFreeHead ← ${slot}`, `Unlink ${next.output} from slot ${slot}, then return that slot to the free list. Stale data may remain, but the node is no longer active.`);
    }
    throw new RangeError('Unknown linked-list action.');
  }
  function createBooking() { return { seats: ['Asha', null, 'Ben', null], waiting: [], undo: [], output: null }; }
  function bookingAction(state, action, seat, name) {
    const next = clone(state);
    if (action === 'undo') {
      if (!next.undo.length) return reject(state, 'No successful booking change is available to undo.');
      const snapshot = next.undo.pop();
      next.seats = snapshot.seats; next.waiting = snapshot.waiting; next.output = 'Previous successful change restored';
      return outcome(next, true, 'Previous ← POP(UndoStack)\nRestore seats and waiting queue', 'Undo uses last-in, first-out order. Rejected requests never create an undo entry.');
    }
    if (!whole(seat, 1, state.seats.length)) return reject(state, 'Choose seat 1–4.');
    if (action === 'book') {
      if (typeof name !== 'string' || !name.trim() || name.length > 16) return reject(state, 'Enter a name of 1–16 characters.');
      name = name.trim();
      if (state.seats.includes(name) || state.waiting.includes(name)) return reject(state, 'This person already has a seat or a place in the queue. No change or undo entry is made.');
      if (state.seats[seat - 1] !== null && state.waiting.length === 4) return reject(state, 'The chosen seat is occupied and the waiting queue is full. No change or undo entry is made.');
      next.undo.push({ seats: clone(state.seats), waiting: clone(state.waiting) });
      if (next.seats[seat - 1] === null) { next.seats[seat - 1] = name; next.output = `${name} booked seat ${seat}`; }
      else { next.waiting.push(name); next.output = `${name} joined the queue; accepts any next available seat`; }
      return outcome(next, true, 'Validate request\nPUSH previous state onto UndoStack\nAssign free seat OR ENQUEUE waiting person', `${next.output}. Exactly one undo entry is added for this successful change.`);
    }
    if (action === 'cancel') {
      if (next.seats[seat - 1] === null) return reject(state, 'This seat is already free. No change or undo entry is made.');
      next.undo.push({ seats: clone(state.seats), waiting: clone(state.waiting) });
      const removed = next.seats[seat - 1], promoted = next.waiting.shift() ?? null;
      next.seats[seat - 1] = promoted; next.output = promoted ? `${removed} cancelled; ${promoted} receives seat ${seat}` : `${removed} cancelled; seat ${seat} is free`;
      return outcome(next, true, 'PUSH previous state onto UndoStack\nCancel seat\nIF queue is not empty THEN assign DEQUEUE()', `${next.output}. The first waiting person has priority.`);
    }
    throw new RangeError('Unknown booking action.');
  }
  return { clone, numbers, createHistory, recordHistory, moveHistory, fieldTypes, createRecord, assignField, createArray, arrayAction, traversalTrace, matrixTrace, searchTrace, sortTrace, createFile, fileAction, createStack, stackAction, createQueue, queueIndices, queueAction, createLinked, chain, linkedAction, createBooking, bookingAction };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = S10Models;
if (typeof window !== 'undefined') window.S10Models = S10Models;
