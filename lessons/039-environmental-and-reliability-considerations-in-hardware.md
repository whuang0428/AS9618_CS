# Lesson 039: Environmental and reliability considerations in hardware

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 3  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Environmental and reliability considerations in hardware** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?

Lesson-specific focus question: What would go wrong if a student confused **Environmental and reliability considerations in hardware** with a neighbouring syllabus idea?

## Guided Explanation
Classify the component first, then examine how it interacts with the rest of the system. Compare at least two alternatives using capacity, speed, durability, cost, accuracy or suitability. End with a scenario so students must justify, not just name, hardware.

Topic-specific teaching move: keep the explanation anchored to **Environmental and reliability considerations in hardware**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: component category. Middle: characteristics comparison table. Right: scenario-based recommendation sentence.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Choose suitable hardware for a school attendance system and justify two choices. The worked example must explicitly use **Environmental and reliability considerations in hardware**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for matching device characteristics to the scenario, such as fast input, reliable storage, or suitable output feedback.



## Student Task
Teams design a hardware set-up for a specific user: librarian, weather station, exam office or delivery driver. They must reject one tempting but unsuitable device. Their final answer must include the phrase **Environmental and reliability considerations in hardware** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Environmental and reliability considerations in hardware**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Environmental and reliability considerations in hardware** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Environmental and reliability considerations in hardware** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need. For this lesson, make students contrast that mistake with the exact idea of **environmental and reliability considerations in hardware**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Environmental factors change hardware suitability

- **Explains:** `environment`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-039-environment.jpg`

1. Possible effect
2. Suitable protection
3. Exam warning
4. Temperature
5. Overheating can slow, shut down or damage components.
6. Cooling, heat sinks, ventilation, temperature-rated hardware
7. Do not just say "fast"; explain heat tolerance or cooling.
8. Moisture / water
9. Corrosion or short circuits can stop the system working.
10. Sealed casing, waterproof enclosure, humidity control
11. Name what water does to reliability.
12. Dust / dirt

### Mitigation must match the risk

- **Explains:** `mitigation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-039-mitigation.jpg`

1. Outdoor weather station Weatherproof casing, low-power controller, battery/solar power and wireless communication.
2. Hospital workstation Reliable power, backup, regular maintenance and quick replacement to reduce downtime.
3. Delivery handheld Rugged case, long battery life, mobile data fallback and SSD/flash storage.
4. Data server Cooling, UPS, RAID, backup, monitoring and controlled access.
5. A strong answer rejects an unsuitable protection. A UPS helps power cuts; it does not make a sensor waterproof.

### Reliability is about continuing to work correctly

- **Explains:** `reliability`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-039-reliability.jpg`

1. Availability The system is usable when required, such as a checkout system during opening hours.
2. Redundancy Extra hardware can take over if one component fails, such as a spare disk or power supply.
3. Backup Copies of data reduce the impact of storage failure or accidental loss.
4. MTBF Mean time between failures indicates expected reliability, often used for comparing components.
5. Maintenance Cleaning, updates and replacement schedules reduce unexpected failure.
6. Monitoring Temperature, battery, disk and network monitoring can warn before failure becomes outage.
7. Reliability answer frame: "If X fails, Y prevents or reduces the impact, so the user can continue Z."
<!-- stage10-explanations:end -->
