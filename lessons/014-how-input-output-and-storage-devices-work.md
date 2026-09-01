# Lesson 014: How input, output and storage devices work

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 3: Hardware<br>
**Syllabus requirements:** S3.03<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S3.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Show understanding of the need for input, output, primary memory and secondary storage, including removable storage.


## 2. Knowledge explanation

### 1. Principal operation of laser printer, 3D printer, microphone, speakers, HDD, flash memory, optical reader/writer, touchscreen and… (S3.03)

**Atomic learning targets**

- **S3.03.A01:** laser printer
- **S3.03.A02:** 3D printer
- **S3.03.A03:** microphone
- **S3.03.A04:** speaker
- **S3.03.A05:** HDD / magnetic hard disk
- **S3.03.A06:** flash memory
- **S3.03.A07:** optical reader/writer / optical disc reader/writer
- **S3.03.A08:** touchscreen
- **S3.03.A09:** VR headset / virtual reality headset

**Core explanation**

- Laser printer: a drum is charged, a laser changes the charge at image positions, toner adheres to those positions, the toner transfers to paper, and heat and pressure fuse it permanently.
- 3D printer: software slices a digital model into layers; the printer deposits, melts or solidifies material one layer at a time until the physical object is built.
- Microphone: sound vibrates a diaphragm; a transducer produces an analogue electrical signal, and an analogue-to-digital converter samples it into binary values.
- Speaker: a digital-to-analogue converter and amplifier drive a coil in a magnetic field; the attached cone vibrates and creates pressure waves that are heard as sound.
- Magnetic hard disk: platters rotate while an actuator positions a read/write head. Writing changes magnetic orientation; reading senses the stored magnetic pattern.
- Flash memory: electrical charge is stored in floating-gate cells. The controller reads charge states and erases or programs blocks electronically, so no moving parts are required.
- Optical disc reader/writer: the disc spins while a laser follows its track. Reflected-light differences are read as data; a higher-power writing laser changes a dye or recording layer on writable media.
- Capacitive touchscreen: a transparent electrode grid creates an electric field. A finger changes capacitance, and the controller calculates the touch coordinates from the measured changes.
- Virtual-reality headset: separate images are displayed to the two eyes while orientation and motion sensors measure head movement. The computer updates the viewpoint with low latency so the scene follows the user's movement.

**Mechanism or method**

1. **Identify the incoming energy or data** — Name the light, sound, touch, electrical data or stored pattern presented to the device.
2. **Trace the physical conversion** — Follow charge, magnetism, light, motion or material through the named internal components in the correct order.
3. **State the resulting data or physical effect** — Finish with the printed page, object, binary data, sound, touch coordinates, stored data or updated visual scene.

#### Worked example: Trace three different conversions

1. **Microphone**

Sound wave → diaphragm motion → analogue electrical signal → ADC samples → binary sample values.

2. **Speaker**

Binary sample values → DAC analogue signal → amplified coil movement → cone vibration → sound wave.

3. **Laser printer**

Page description → laser charge pattern on drum → toner image → transfer to paper → fuser bonds toner.

4. **Compare**

The microphone and touchscreen are input devices, the speaker and printers are output devices, and HDD/flash/optical media store data; the mechanism justifies the category.

**Misconceptions to correct**

- Naming a component is not enough: a principal-operation answer must connect input, internal conversion and output in order.

#### Mastery check (MC-L014-S3.03)

Describe the following targets in one connected answer, using a concrete example for each: laser printer; 3D printer; microphone; speaker; HDD / magnetic hard disk; flash memory; optical reader/writer / optical disc reader/writer; touchscreen; VR headset / virtual reality headset.

<details><summary>Answer criteria</summary>

- Laser printer: a drum is charged, a laser changes the charge at image positions, toner adheres to those positions, the toner transfers to paper, and heat and pressure fuse it permanently.
- 3D printer: software slices a digital model into layers; the printer deposits, melts or solidifies material one layer at a time until the physical object is built.
- Microphone: sound vibrates a diaphragm; a transducer produces an analogue electrical signal, and an analogue-to-digital converter samples it into binary values.
- Speaker: a digital-to-analogue converter and amplifier drive a coil in a magnetic field; the attached cone vibrates and creates pressure waves that are heard as sound.
- Magnetic hard disk: platters rotate while an actuator positions a read/write head. Writing changes magnetic orientation; reading senses the stored magnetic pattern.
- Flash memory: electrical charge is stored in floating-gate cells. The controller reads charge states and erases or programs blocks electronically, so no moving parts are required.
- Optical disc reader/writer: the disc spins while a laser follows its track. Reflected-light differences are read as data; a higher-power writing laser changes a dye or recording layer on writable media.
- Capacitive touchscreen: a transparent electrode grid creates an electric field. A finger changes capacitance, and the controller calculates the touch coordinates from the measured changes.
- Virtual-reality headset: separate images are displayed to the two eyes while orientation and motion sensors measure head movement. The computer updates the viewpoint with low latency so the scene follows the user's movement.

</details>

**Supplementary concept map**

- **optical reader:** Principal operation of laser printer, 3D printer, microphone,…
- **laser printer:** Laser printer, 3D printer, microphone, speakers, magnetic hard…
- **flash memory:** An HDD or magnetic hard disk uses rotating…
- **speaker:** A speaker converts an electrical signal into sound.
- **3D printer:** A 3D printer builds successive layers
- **microphone:** A microphone diaphragm vibrates with sound

**Supplementary three-step recap**

1. **Identify the incoming energy or data** — Name the light, sound, touch, electrical data or stored pattern presented to the device.
2. **Trace the physical conversion** — Follow charge, magnetism, light, motion or material through the named internal components in the correct order.
3. **State the resulting data or physical effect** — Finish with the printed page, object, binary data, sound, touch coordinates, stored data or updated visual scene.

**Concrete case: optical reader:** Laser printer, 3D printer, microphone, speakers, magnetic hard disk, solid state (flash) memory, optical disc reader/writer, touchscreen and virtual reality headset.



<details><summary>Precise syllabus wording</summary>

Describe principal operation of laser printer, 3D printer, microphone, speakers, HDD, flash memory, optical reader/writer, touchscreen and VR headset.

Describe the principal operations of: laser printer, 3D printer, microphone, speakers, magnetic hard disk, solid state (flash) memory, optical disc reader/writer, touchscreen and virtual reality headset.

</details>

### Lesson technical reference

- Describe the principal operations of: laser printer, 3D printer, microphone, speakers, magnetic hard disk, solid state (flash) memory, optical disc reader/writer, touchscreen and virtual reality headset.
- A microphone diaphragm vibrates with sound; a transducer converts the movement into an analogue electrical signal, which an ADC samples into digital values. A capacitive touchscreen detects a change in an electric field and calculates touch coordinates.
- A VR headset displays a separate view to each eye and uses motion/orientation sensors to update the viewpoint. Low-latency tracking is needed so the displayed scene follows head movement.
- Required device overview: a laser printer uses an electrostatic drum, laser, toner and fuser; a 3D printer builds successive layers; a speaker converts an electrical signal into sound. An HDD or magnetic hard disk uses rotating magnetic platters, flash memory stores charge electronically, and an optical reader/writer uses a laser.
- A laser printer charges a drum, a laser discharges selected points, toner adheres to the image, toner transfers to paper and heat/pressure fuse it. A 3D printer deposits or solidifies material layer by layer from a digital model.
- A speaker uses a DAC/amplifier to drive a coil and cone, producing pressure waves. An output buffer temporarily holds data because the processor can produce it faster or in different-sized bursts than a printer or audio device can consume it.
- An HDD spins magnetic platters while an actuator positions read/write heads; writing changes magnetic orientation and reading senses it. Flash memory stores charge in floating-gate cells and has no moving parts.
- An optical drive spins a disc and directs a laser at its track. Reflected-light differences are read as data; a writer uses a higher-power laser to change a dye or recording layer.
- A magnetic HDD uses moving read/write heads over rotating platters. Flash memory stores charge electronically with no moving parts. An optical disc reader/writer uses a laser to read marks and, on writable media, to create or alter marks.
- RAM is volatile read/write primary memory used for programs and data currently being processed. ROM is non-volatile primary memory used for instructions that must remain when power is removed, such as firmware or start-up instructions. ROM is not ordinary long-term storage for user files.
- SRAM stores bits using flip-flop circuits, needs no refresh and is fast but expensive with lower density, so it is used for cache. DRAM stores charge in capacitors, requires refresh and is slower but cheaper and denser, so it is used for main memory.

Beyond syllabus / 延伸知识（不要求背诵）: professional device selection also considers accessibility, reliability, repairability and energy use.
## 3. Practice by question type

### Question 1 - foundation - describe - 9 marks

Describe the principal operation of a laser printer, a 3D printer and a microphone. For each device, connect the input to the internal mechanism and output.

**Answer:** laser printer: charged drum, laser charge pattern, toner, paper transfer and fuser; 3D printer: digital model sliced into layers and material deposited/solidified layer by layer; microphone: diaphragm vibration, transducer analogue signal and ADC binary samples

**Marking guidance:** Do not accept that the microphone directly records binary without an analogue signal and conversion stage.

**Common error:** For the command word describe, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - describe - 9 marks

Describe the principal operation of a speaker, magnetic hard disk and flash memory. Name the physical conversion or storage mechanism in each case.

**Answer:** speaker: DAC/amplifier drives coil and cone to make pressure waves; HDD: rotating magnetic platters and positioned read/write heads change or sense magnetic orientation; flash: charge states stored and read electronically in floating-gate cells with no moving parts

**Marking guidance:** Award mechanism-linked points rather than device names alone.

**Common error:** Do not describe RAM when the question asks for flash storage.

### Question 3 - transfer - compare - 9 marks

Compare the principal operation of an optical disc reader/writer, a capacitive touchscreen and a virtual-reality headset. For each one, trace its distinct input, conversion mechanism and result.

**Answer:** optical drive: spinning track and reflected laser differences, with a higher-power laser changing writable media; touchscreen: finger changes capacitance in an electrode grid and controller calculates coordinates; VR headset: separate eye images and motion/orientation sensors update the viewpoint with low latency

**Marking guidance:** Each description must include an input, mechanism and result.

**Common error:** A laser is not a complete optical-drive explanation; state what reflected light or writing power does.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/11/S/25 Q6(b) | 5 | complete | recall |
| 9618/11/S/25 Q6(i) | 4 | complete | recall |
| 9618/11/S/25 Q6(ii) | 3 | complete | recall |
| 9618/11/W/25 Q10(a) | 3 | explain | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S3.03: explain laser printer, 3D printer, microphone, speaker, HDD / magnetic hard disk, flash memory, optical reader/writer / optical disc reader/writer, touchscreen, VR headset / virtual reality headset.
- S3.03 method: Identify the incoming energy or data → Trace the physical conversion → State the resulting data or physical effect.
- Correction to remember: Naming a component is not enough: a principal-operation answer must connect input, internal conversion and output in order.

### Common error to correct

Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For how input, output and storage devices work, use the exact technical term before applying it to the scenario.
