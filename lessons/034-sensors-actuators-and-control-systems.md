# Lesson 034: Sensors, actuators and control systems

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Monitoring, control, feedback and required sensors

### Direct explanation

- A monitoring system uses sensors to collect data for recording, display or alerts; it does not necessarily change the environment. A control system uses sensor input and a stored rule or target to send output to an actuator. In closed-loop control, feedback is the new sensor reading produced after the action, allowing the controller to adjust or stop the output.
- A temperature sensor measures temperature, a pressure sensor measures force per unit area or pressure, an infra-red sensor detects infra-red radiation, and a sound sensor detects sound level or sound waves. The sensor supplies input data; it does not itself decide or perform the control action.
- Choose a sensor by matching the physical quantity to the application: temperature for a greenhouse, pressure for a tyre or burglar mat, infra-red for a remote-control receiver or beam alarm, and sound for a noise monitor. A light-intensity sensor is useful supporting context but does not replace the named infra-red and sound sensors.
- A control system sends output signals to actuators and uses sensor feedback to determine the next control action.

### Worked example

**Greenhouse monitoring and control:** A monitoring system records and displays temperature readings. A control system also compares each reading with a threshold and activates a fan motor actuator when the greenhouse is too hot. New temperature readings provide feedback, so the fan can stop when the target is reached.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Compare monitoring from control.
   **Answer:** Monitoring records, displays or reports sensor data; control uses data to change an actuator or system state.
2. What is feedback in a closed-loop control system?
   **Answer:** A new sensor reading after the action, used to adjust or stop the output.
3. Which named sensor detects radiation used by a remote control?
   **Answer:** An infra-red sensor.
4. Which named sensor is suitable for a classroom noise monitor?
   **Answer:** A sound sensor.
5. Why is a sensor not an actuator?
   **Answer:** A sensor supplies input about a physical quantity; an actuator produces a physical output action.

### Exam-style question and MS

**Question (5 marks):** A greenhouse system records temperature and automatically opens a vent when necessary. Compare its monitoring and control functions and explain the feedback cycle.

| Answer | Guidance | Marks |
|---|---|---:|
| monitoring records/displays temperature readings | Do not state that monitoring necessarily changes an actuator, or that a sensor performs the control decision. | 1 |
| control compares a reading with a rule/threshold |  | 1 |
| controller sends output to a vent motor or other actuator |  | 1 |
| new sensor readings provide feedback after the action |  | 1 |
| feedback is used to adjust or stop the actuator |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the sensor, processor and output components involved in **Sensors, actuators, and control systems**.
2. Describe the sequence from input data to a control action.
3. Apply the control process to a stated scenario and explain its limitation.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Ask how a washing machine detects the current conditions and decides when to change its operation. Lead students to sensors, data input, processing and actuators.

Focus question: Which feature distinguishes **Sensors, actuators, and control systems** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Sensors, actuators, and control systems**. Follow its command word and apply each point to the stated context.

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

### Actuators turn output signals into physical action

- **Explains:** `actuators`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
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

### Required sensor types and applications

- **Explains:** `sensors`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-034-sensors.jpg`

1. A temperature sensor measures temperature and a pressure sensor measures pressure.
2. An infra-red sensor detects infra-red radiation, for example in a beam alarm or remote-control receiver.
3. A sound sensor detects sound level or sound waves, for example in a noise monitor.
4. A sensor supplies input data; the processor applies the rule and an actuator performs any physical output.
5. Light intensity is supporting context and does not replace the named infra-red or sound sensors.
<!-- stage10-explanations:end -->
