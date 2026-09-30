// Shared listings and expected results. Pseudocode fixtures are simulated, not compiled.
const program = (code, tests) => ({ code, tests });
const repeated = (increment, limit = 3) => `DECLARE Count : INTEGER
DECLARE Total : INTEGER
Count <- 0
Total <- 0
WHILE Count < ${limit}
    Total <- Total + ${increment}
    Count <- Count + 1
ENDWHILE
OUTPUT Total`;
const debug = operator => `DECLARE Total : INTEGER
DECLARE Increment : INTEGER
Total <- 12
Increment <- 4
Total <- Total ${operator} Increment
OUTPUT Total`;
export const section5Programs = Object.freeze({
  library: program(`DECLARE Value : REAL
DECLARE Result : REAL
INPUT Value
IF Value >= 0.0 THEN
    Result <- SQRT(Value)
    OUTPUT Result
ELSE
    OUTPUT "Unsupported input"
ENDIF`, [{input:[81],output:[9]},{input:[0],output:[0]},{input:[-4],output:['Unsupported input']}]),
  repeatedA: program(repeated(2), [{input:[],output:[6]}]),
  repeatedB: program(repeated(4), [{input:[],output:[12]}]),
  repeatedZero: program(repeated(2, 0), [{input:[],output:[0]}]),
  runtimeFault: program(`DECLARE Count : INTEGER
DECLARE Average : REAL
INPUT Count
OUTPUT "Starting"
Average <- 12.0 / Count
OUTPUT Average`, [{input:[3],output:['Starting',4]},{input:[0],output:['Starting'],error:'division by zero'}]),
  debugFault: program(debug('-'), [{input:[],output:[8]}]),
  debugFixed: program(debug('+'), [{input:[],output:[16]}]),
  wrongVariable: program(`DECLARE Quantity : INTEGER
DECLARE UnitPrice : INTEGER
DECLARE Delivery : INTEGER
DECLARE Cost : INTEGER
Quantity <- 3
UnitPrice <- 4
Delivery <- 2
Cost <- Quantity * Delivery
OUTPUT Cost`, [{input:[],output:[6]}]),
  wrongVariableFixed: program(`DECLARE Quantity : INTEGER
DECLARE UnitPrice : INTEGER
DECLARE Delivery : INTEGER
DECLARE Cost : INTEGER
Quantity <- 3
UnitPrice <- 4
Delivery <- 2
Cost <- Quantity * UnitPrice
OUTPUT Cost`, [{input:[],output:[12]}]),
  presentation: program(`DECLARE Mark : INTEGER
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Retry"
ENDIF`, [{input:[60],output:['Pass']},{input:[49],output:['Retry']},{input:[50],output:['Pass']}]),
});
export const s5Code = (key, numbered = false) => {
  const code = section5Programs[key]?.code;
  if (!code) throw new Error(`Unknown S5 program: ${key}`);
  return numbered ? code.split('\n').map((line,i)=>`${i+1}  ${line}`).join('\n') : code;
};
export const section5Java = Object.freeze({
  hello: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  helloEdited: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Class!");
    }
}`,
  debug: `public class DebugDemo {
    public static void main(String[] args) {
        int total = 12;
        int increment = 4;
        total = total - increment;
        System.out.println(total);
    }
}`,
});
export const s5LoopTrace = Object.freeze([
  ['Initialised', '0', '0', 'No output'],
  ['First body complete', '1', '2', 'No output'],
  ['Second body complete', '2', '4', 'No output'],
  ['Third body complete', '3', '6', 'No output'],
  ['Count < 3 is false; OUTPUT executes', '3', '6', '6'],
]);
