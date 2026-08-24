# Lesson 033: Embedded systems and microcontrollers

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 3  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the sensor, processor and output components involved in **Embedded systems and microcontrollers**.
2. Describe the sequence from input data to a control action.
3. Apply the control process to a stated scenario and explain its limitation.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Ask how a washing machine detects the current conditions and decides when to change its operation. Lead students to sensors, data input, processing and actuators.

Focus question: Which feature distinguishes **Embedded systems and microcontrollers** from the most closely related syllabus concept?

## Guided Explanation
Build a control loop: sensor reads a physical quantity, processor compares it with a rule, actuator changes the environment, then the sensor reads again. Keep the loop visible and ask where errors could enter.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: physical condition. Middle: sensor -> processor -> actuator loop. Right: error and safety checks.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Design a control system for a greenhouse fan using temperature readings.

**Worked answer / marking focus:** A complete answer names the sensor, decision condition, actuator, and feedback loop. Extra credit for validation or safety limits.



## Student Task
Students write a three-step control rule for traffic lights, greenhouse fans or automatic doors, then identify the sensor and actuator.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Embedded systems and microcontrollers**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say the sensor 'does the action'. Correction: sensors detect; actuators act.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### What is an embedded system?

- **Explains:** `embedded`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-033-embedded.jpg`

1. Dedicated purpose Designed to perform a specific task or set of tasks.
2. Built into device Part of a larger product, such as a washing machine or traffic light.
3. Limited interface Often has few controls or displays compared with a general-purpose computer.
4. Real-world input/output Often reads sensors and controls actuators.
5. Reliability focus Usually expected to run repeatedly and predictably.

### The basic control loop

- **Explains:** `loop`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-033-loop.jpg`

1. 1. Sense A sensor captures a physical quantity, such as temperature, light, pressure or distance.
2. 2. Process The microcontroller compares the reading with a stored rule or threshold.
3. 3. Act An actuator changes something physically, such as opening a valve or starting a motor.
4. 4. Repeat The sensor reads again so the system can respond to changing conditions.
5. Example rule: IF temperature > 28°C THEN turn fan ON ELSE turn fan OFF.

### Microcontroller vs general-purpose computer

- **Explains:** `microcontroller`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-033-microcontroller.jpg`

1. Microcontroller / embedded system
2. General-purpose computer
3. Designed for a specific control task.
4. Designed to run many different programs.
5. Hardware
6. Often integrates CPU, memory and I/O on one chip.
7. Separate high-performance components are common.
8. Interface
9. May have simple buttons, LEDs or no screen.
10. Usually has richer input/output and user interface.
11. Design priorities
12. Low cost, low power, reliability, real-time response.
<!-- stage10-explanations:end -->
