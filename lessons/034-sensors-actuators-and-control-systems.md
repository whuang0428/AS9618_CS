# Lesson 034: Sensors, actuators, and control systems

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 3  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Sensors, actuators, and control systems** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Ask: How does a washing machine know it is being dramatic, not just wet? Lead students to sensors, data input, decisions and actuators.

Lesson-specific focus question: What would go wrong if a student confused **Sensors, actuators, and control systems** with a neighbouring syllabus idea?

## Guided Explanation
Build a control loop: sensor reads a physical quantity, processor compares it with a rule, actuator changes the environment, then the sensor reads again. Keep the loop visible and ask where errors could enter.

Topic-specific teaching move: keep the explanation anchored to **Sensors, actuators, and control systems**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: physical condition. Middle: sensor -> processor -> actuator loop. Right: error and safety checks.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Design a control system for a greenhouse fan using temperature readings. The worked example must explicitly use **Sensors, actuators, and control systems**, not a generic example from the wider unit.

**Worked answer / marking focus:** A complete answer names the sensor, decision condition, actuator, and feedback loop. Extra credit for validation or safety limits.



## Student Task
Students write a three-step control rule for traffic lights, greenhouse fans or automatic doors, then identify the sensor and actuator. Their final answer must include the phrase **Sensors, actuators, and control systems** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Sensors, actuators, and control systems**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Sensors, actuators, and control systems** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Sensors, actuators, and control systems** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say the sensor 'does the action'. Correction: sensors detect; actuators act. For this lesson, make students contrast that mistake with the exact idea of **sensors, actuators, and control systems**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Actuators turn output signals into physical action

- **Explains:** `actuators`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-034-actuators.jpg`

1. Motor Creates movement, such as opening a door or spinning a fan.
2. Valve Controls flow of water, gas or air.
3. Heater Changes temperature by producing heat.
4. Light Turns visual warning or illumination on/off.
5. Lock / brake Controls physical safety or movement.
6. An actuator receives an output signal. It does not decide the rule; the processor/controller does that.

### Control systems use rules and feedback

- **Explains:** `control`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-034-control.jpg`

1. 1 Sensor reads
2. 2 Processor compares
3. 3 Fan and vent act
4. The solid arrows show input and output signals. The dashed arrow shows feedback: the changed temperature is measured again.
5. Sense: the temperature sensor produces a reading.
6. Compare: the controller compares the reading with its threshold.
7. Act: an output signal switches or adjusts the fan and vent.
8. Repeat: a new reading checks whether further action is needed.
9. Input Sensor reads the physical condition.
10. Decision Processor compares the reading with a threshold or rule.
11. Output Signal is sent to an actuator.
12. Feedback New sensor readings check the result.

### Sensors capture physical data

- **Explains:** `sensors`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-034-sensors.jpg`

1. Example system
2. Exam warning
3. Temperature
4. Heat / temperature value
5. Greenhouse fan, thermostat, freezer alarm
6. It detects temperature; it does not cool the room.
7. Light intensity
8. Street lights, phone brightness
9. The output may be a lamp, not the sensor.
10. Pressure
11. Force/pressure level
12. Burglar mat, weighing scale, tyre pressure
<!-- stage10-explanations:end -->
