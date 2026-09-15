import {coreParagraph as p,coreSteps as steps,coreTable as table} from './course-v3-core-blocks.mjs';
import {bufferTrace,heaterTrace,truthRows,op} from './course-v3-section3-examples.mjs';
import {section3Visual as visual} from './course-v3-section3-teaching-diagrams.mjs';
import {section3AdditionalPractice,section3ReviewPractice,completeSection3Answers} from './course-v3-section3-questions.mjs';

const entry=(blocks,core,prompt,answer,lead,extra={})=>({blocks,core,checkpoint:{prompt,answer},lead,...extra});
const extension=(title,explanation,materials=[])=>({title:`Optional extension: ${title}`,explanation,materials});
const mt=(title,headers,rows)=>({type:'table',title,headers,rows,preserve:true,preserveText:true});
const v=(name,title,alt)=>visual(name,title,alt);
const circuit=(key,title,alt)=>v(`logic-${key}`,title,alt);

export const section3Teaching = {
  'S3.01-COMPONENT-ROLES':entry([
    p('A computer needs a way to receive data and instructions, process them, and make the result useful. Input can come from a person or a sensor. Output can be information for a person, such as a displayed reading, or a physical action, such as operating a motor. The processor follows instructions; memory holds the instructions and data it needs.','Follow data through a system'),
    p('Primary memory is available for the processor’s current work. RAM provides changing working space; ROM provides persistent instructions. Primary memory is therefore not defined by being volatile. Secondary storage retains saved programs and user data between sessions. A removable drive is secondary storage that can be disconnected for transfer or a separately held copy. A component can have more than one role: a touchscreen both displays output and senses input.','Distinguish the storage roles'),
    steps('A complete reading, save and restart example',[
      ['Initial state','A hand-held recorder has working firmware, empty RAM for the new session and no saved record. Its sensor supplies a reading of 23.'],
      ['Process and output','The processor stores 23 in RAM, applies the recording instructions and displays 23. The value is currently working data.'],
      ['Save','The user requests a save. The recorder writes a record containing 23 to its flash file and reports that the write has completed.'],
      ['Change without saving','A correction changes only the RAM value to 24. The flash file still contains 23. A power interruption now loses the unsaved 24.'],
      ['Restart and read','Persistent firmware starts the device. The recorder reads the saved file into new RAM workspace and displays 23. It cannot reconstruct the unsaved 24 from that file.'],
      ['Make an offline copy','While powered, copy the saved record to a removable drive, confirm completion, then disconnect it. The separate copy contains 23; later edits to the recorder do not automatically update it.'],
    ]),
    p('This is a conceptual hardware/data-state trace, not a file-handling program. Later file lessons specify opening, writing, closing and reading files in pseudocode. Here, the essential condition is that the stated save and copy have completed before power or the drive is removed.','State what the example assumes'),
  ],['Input supplies data; processing uses stored instructions; output communicates a result or causes an action.','Distinguish current working data, persistent firmware and saved user files; a completed removable copy can be held separately.'],'The screen displays 24 but the most recent completed save contains 23. What can the device recover after power is lost?','It can reload 23 from the saved file. Displaying or editing 24 did not itself update that file.',v('reading-lifecycle','A reading through a power cycle','The saved reading is 23. An unsaved RAM change to 24 is lost; restart reloads 23 from flash.')),

  'S3.02-EMBEDDED-STRUCTURE':entry([
    p('An embedded system is a computer incorporated into a larger device to perform a dedicated function or a related set of functions. It is identified by its role within that device, not merely by its size. A small general-purpose laptop is not made embedded simply by being small. Embedded systems may use a microcontroller combining processor, memory and input/output interfaces, or a more complex processor arrangement.','Identify the boundary and purpose'),
    steps('Trace one electronic bicycle gear change',[
      ['Given state','The bicycle is in gear 3. Its controller has stored gear-control instructions and working memory for the selected gear.'],
      ['Input','The rider presses the up-shift button once. The button supplies a request; it does not itself move the gear mechanism.'],
      ['Processing','The controller interprets the request, checks that a higher gear is available and selects the command for gear 4.'],
      ['Output','A driver supplies the required electrical power to the gear motor. The motor moves the mechanism to the requested position.'],
      ['Result and boundary','In this successful case the bicycle reaches gear 4. A position sensor could confirm the result; that feedback decision is developed in Lesson 018. At the highest gear, a further up-shift request must not imply that another physical gear exists.'],
    ]),
    p('The rider’s button, controller and motor belong to a larger gear-changing system with a dedicated purpose. The stored instructions are software; the processor, memory and interfaces are hardware. Dedicated does not mean that every instruction is permanently unchangeable or that every embedded system must be connected to a network.','Connect the structure to the definition'),
  ],['Identify the larger device and the controller’s dedicated function.','Describe input, stored instructions, working data and output inside that system.'],'A controller runs several related wash programs. Does that prevent it being embedded?','No. It is incorporated into the washing machine for a related set of washing functions; dedicated does not require one unvarying instruction sequence.'),

  'S3.02-EMBEDDED-TRADEOFFS':entry([
    p('The same restriction to a dedicated job can provide a benefit and a drawback. A convincing explanation starts with a requirement, identifies a design property and follows its consequence. Low price, low power and reliability are possible outcomes of a suitable design, not automatic properties of every embedded device.','Explain the consequence of a design choice'),
    steps('Evaluate a battery-powered irrigation timer',[
      ['Requirement','The timer opens one water valve on a schedule, uses a small display and must run for a long period between battery replacements.'],
      ['Benefit with a cause','A controller with enough memory and interfaces for that limited job avoids the resources of a general-purpose computer. Low-power operation can extend battery life, while a compact repeated design can reduce unit size and cost.'],
      ['Changed requirement','The owner now wants a camera to classify plants. Image input and processing require different interfaces, more working memory and more processing capacity.'],
      ['Drawback and judgement','The installed controller may not support that workload. Replacement hardware may be needed. The original design was suitable for valve timing; its suitability does not automatically extend to image processing.'],
    ]),
    p('In a washing machine, integration can remove unnecessary user controls and make normal operation straightforward. However, a failed controller can stop the whole appliance and may require specialist replacement. A firmware update is possible only when the device has suitable writable storage and an update mechanism; neither ease nor impossibility of updating follows from the word embedded alone.','Apply the same reasoning to a second device'),
  ],['Link each claimed advantage or limitation to the device’s task and constraints.','Dedicated optimisation can reduce resources while restricting later unrelated functions.'],'Why is “embedded systems are always cheaper” an incomplete explanation?','Cost depends on design, production and requirements. Explain how the dedicated device avoids unnecessary resources or gains from repeated manufacture, and recognise development and repair costs.'),

  'S3.03-LASER-PRINTER':entry([
    p('A laser printer converts a page description into a fixed toner image. The controller prepares a pattern for the page, and laser timing transfers that pattern to a rotating photosensitive drum. The drum temporarily carries the image; it is not the final printed page.','Separate image formation from permanent fixing'),
    steps('Print a black square on an otherwise blank page',[
      ['Prepare and charge','Assume a working monochrome printer using the negative-charge arrangement shown. Page data specifies a black square. The charging stage gives the drum a uniform negative charge.'],
      ['Expose','As the drum rotates, the laser exposes positions corresponding to the square. Exposure reduces the negative charge at those positions, forming an electrostatic image. It does not make the exposed areas positive.'],
      ['Develop','Negatively charged toner is supplied under a suitable electrical bias. The resulting electric field favours deposition on the exposed, less-negative image regions. Relative electrical potentials determine movement; “negative toner sticks to negative charge” alone would not explain it.'],
      ['Transfer','Paper passes beside the drum. A positive transfer charge behind the paper attracts the toner pattern from the drum onto the paper. The correct pattern now exists on the sheet but is not yet firmly bonded.'],
      ['Fuse','Heated pressure rollers bond the toner to the paper. The sheet exits with the square fixed in place. Cleaning and charge removal prepare the drum for another page.'],
    ]),
    p('If the square has the correct shape but rubs off, inspect the fusing stage. A correct transferred image is evidence that image formation and transfer occurred; it does not establish that the later heat and pressure were adequate. The laser exposes the drum, whereas the fuser fixes toner on paper.','Use a fault to distinguish the stages'),
  ],['Trace page data → drum charge pattern → toner → paper transfer → heat and pressure.','Explain the role of each stage and keep the charge convention consistent.'],'A printer’s laser exposes the drum correctly. Is that enough to produce a durable printed image?','No. Toner must still be developed, transferred to paper and fused by heat and pressure.'),

  'S3.03-3D-PRINTER':entry([
    p('Additive manufacturing builds a physical object from successive cross-sections. Software slices a digital three-dimensional model into layers and supplies the shapes or paths required at each height. The printer deposits material or solidifies it at the specified positions; the head, platform or both move as required by the process.','Connect the digital model to physical layers'),
    table('Reconstruct a small stepped object',['Layer','Filled cross-section','Height after the layer','State of the object'],[
      ['1','3 × 3 square of filled cells','1 mm','Only the broad base exists.'],
      ['2','2 × 2 square, aligned above the base','2 mm','The narrower middle is bonded to the base.'],
      ['3','1 × 1 square, aligned above the middle','3 mm','The three-step object is complete.'],
    ]),
    p('The table uses three equal 1 mm layers and ideal filled cells as a teaching model. The machine completes a layer, repositions by one layer height and follows the next slice until the last slice is complete. A two-dimensional outline of the base cannot determine the upper layers: their different cross-sections must also be supplied.','Complete all the specified slices'),
    p('In an extrusion example, material leaves a nozzle along a path and bonds into a layer. Some resin systems expose and solidify a whole cross-section at once. Both remain layer-by-layer processes: curing one complete layer does not produce the full height. This distinction explains the principle without requiring detailed printer operating settings.','Change the process while keeping the principle'),
  ],['Slice the model, form each specified cross-section and reposition between layers.','The last completed layer determines whether the whole object has been built.'],'The second slice is 2 × 2 but the printer repeats the 3 × 3 first slice. Does reaching the correct height prove the model is correct?','No. The object has the wrong cross-section. Both layer order and each layer’s geometry must match the model.',v('three-layer-build','Three slices produce one stepped object','Illustrative filled-cell cross-sections: 3 × 3, 2 × 2 and 1 × 1; each layer is 1 mm thick.')),

  'S3.03-MICROPHONE':entry([
    p('A microphone is an input transducer: it turns acoustic motion into a corresponding electrical signal. In a moving-coil dynamic microphone, a diaphragm is attached to a coil placed in the field of a permanent magnet. Sound-pressure variations move the diaphragm and coil; movement of the coil in the magnetic field induces a varying voltage. This supplies the missing physical link between vibration and an analogue signal.','How movement produces an electrical signal'),
    steps('Record a spoken word',[
      ['Sound to movement','The speaker’s voice produces changing air pressure. The diaphragm follows those changes and moves the attached coil.'],
      ['Movement to voltage','The coil’s motion relative to the magnetic field generates an analogue electrical signal. It is not yet a list of stored binary numbers.'],
      ['Prepare and convert','Suitable input electronics condition the signal. An ADC samples at chosen instants, quantises amplitudes to available levels and encodes the values in binary. Sampling and quantisation are developed in Lesson 006.'],
      ['Hold and save','The recorder places samples in working memory and completes a save to secondary storage. The saved sample sequence represents the recording.'],
      ['Check the boundary','Without analogue-to-digital conversion, the varying microphone voltage cannot by itself supply the binary sample sequence expected by the digital recorder.'],
    ]),
    p('This physical example is explicitly a moving-coil microphone. Other microphone designs use different transducers. A USB or other digital-output microphone can include conversion electronics inside its enclosure, so the external connector may carry digital data even though the sound still requires transduction and conversion internally.','Keep the device boundary clear'),
  ],['Sound moves the diaphragm; in this dynamic example, coil motion in a magnetic field induces an analogue voltage.','An ADC separately samples, quantises and encodes the signal for digital processing.'],'The ADC works but the microphone diaphragm cannot move. Would changing the sample format restore the missing voice signal?','No. The missing acoustic-to-electrical transduction occurs before the ADC. Encoding cannot restore a voice signal that the microphone did not supply.',v('sound-transduction','Compare recording with playback','Dynamic microphone: movement induces a voltage. Loudspeaker: current produces movement. ADC and DAC belong at different ends of the digital path.')),

  'S3.03-SPEAKERS':entry([
    p('A loudspeaker is an output transducer. A changing current through its voice coil interacts with a permanent magnetic field, producing a force. The coil is attached to a cone or diaphragm, so its motion creates pressure variations in air. A digital file is a sequence of values, not the physical movement or power needed to drive that cone.','How an electrical signal produces sound'),
    steps('Play the saved spoken word',[
      ['Read','Assume a valid uncompressed recording and the correct sample format and playback rate. The player reads the saved sample sequence into working memory.'],
      ['Convert','A DAC and associated output circuitry produce an analogue electrical signal corresponding to the sample sequence.'],
      ['Drive','An amplifier supplies sufficient current and power for the loudspeaker. The varying coil current produces a changing force in the permanent magnet’s field.'],
      ['Move and hear','The coil moves the attached cone. The cone moves air, and the resulting pressure variations are heard as the recording.'],
      ['Compare with the original','The output represents the captured samples. It cannot recover detail absent from the original sampling or discarded in lossy compression.'],
    ]),
    p('The DAC produces an electrical signal; the amplifier supplies drive; the loudspeaker produces the acoustic output. If the amplifier is disconnected, a correct DAC output alone does not establish that the cone will be driven. If the cone is immobilised, correct data and electrical conversion still do not produce normal sound.','Locate a failure along the playback chain'),
  ],['Read samples → DAC → amplifier → changing coil current and force → cone motion → sound.','The DAC, amplifier and loudspeaker perform different jobs.'],'Why does a loudspeaker need a moving cone after a DAC has already converted the data?','The DAC output is electrical. Cone motion transfers the electrical drive into air-pressure variations that can be heard.'),

  'S3.03-MAGNETIC-HARD-DISK':entry([
    p('A magnetic hard disk stores data as magnetic patterns on rotating platters. A track is a circular recording path; sectors divide the stored data into addressable blocks along tracks. An actuator positions the head over a track, while rotation brings the required sector under it. The head normally flies above the surface rather than scraping it.','Separate the two positioning operations'),
    steps('Write and read a specified sector',[
      ['Initial conditions','Use a conceptual disk with tracks T0, T1 and T2. A request is to write a complete data block to sector S3 of T2; the head initially lies over T0.'],
      ['Position','The actuator moves the head to T2. The disk then rotates until S3 reaches the head. Moving to the track and waiting for the sector are different delays.'],
      ['Write','The write head changes magnetic states in the selected region according to the controller’s encoded data. The block remains recorded when normal power is removed.'],
      ['Read later','After restart, locate T2 and S3 again. The read sensor detects the magnetic pattern; the controller decodes it and returns the stored data block.'],
      ['Change the request','A second sector on T2 may still require rotational waiting but not a seek to another track. A sector on T0 can require both operations again.'],
    ]),
    p('A coloured bit strip is a conceptual encoding illustration. Real recording and error-correction formats are more involved; do not infer that one coloured sector equals one bit or that arbitrary drawn colours reveal the stored file. For this lesson, the core contrast is changing magnetic states when writing and sensing them when reading.','Use diagrams within their stated scope'),
  ],['Locate the track with the actuator and the sector through rotation.','Writing changes magnetic states; reading detects and decodes their pattern.'],'Why can a read from the same track still wait even if the head is already positioned correctly?','The requested sector may not yet be beneath the head. Rotation must bring it to the reading position.',v('disk-access','Locate, then transfer a data block','The highlighted circular track and target sector separate radial positioning from rotational waiting.')),

  'S3.03-FLASH':entry([
    p('Flash is non-volatile electronic storage. In a floating-gate model, charge is held in an electrically insulated region of a transistor. The insulation lets that stored charge remain when external power is removed. The charge changes the transistor’s threshold voltage: the voltage required to make its channel conduct. Reading senses this behaviour rather than mechanically moving a head to a surface.','Why stored charge can survive shutdown'),
    table('One complete single-level-cell example',['Stage','Cell state in the declared model','Result'],[
      ['Erase','Little stored floating-gate charge; lower threshold','The cell reads as 1.'],
      ['Program','Programming adds trapped charge; threshold rises','The cell now reads as 0.'],
      ['Remove external power','The insulating structure retains the programmed charge','The stored state remains; reading circuitry is not operating.'],
      ['Restore power and read','Apply a test voltage between the two thresholds and sense conduction','The high-threshold state is detected and decoded as 0.'],
      ['Erase again','Erasure removes stored charge','The declared cell returns to the state read as 1.'],
    ]),
    p('The table explicitly declares a simple one-bit convention; it does not claim that every modern flash cell stores exactly one bit. Programming, reading and erasing are different operations. A controller applies the needed electrical conditions and addresses the storage. Unlike DRAM, retention does not require periodic capacitor refresh while continuously powered.','Distinguish retained state from active access'),
  ],['Insulated charge changes a cell’s threshold and can persist without external power.','Program/erase alter stored state; reading senses it electronically, with no moving head.'],'Does a flash drive need power to read a file even though it does not need power to retain that file?','Yes. Retention and access are different: stored charge can persist while the controller and sensing circuitry require power to read it.',v('flash-retention','Stored charge and the sensed threshold','Declared single-level model: erased lower-threshold state reads 1; programmed higher-threshold state reads 0 and survives a power cycle.'),{extensions:[extension('flash erase units and update limits','Flash is an electrically erasable non-volatile memory technology. Typical flash devices erase groups of cells rather than freely replacing every stored bit in place. Controllers manage the required erase/program operations, and cells tolerate a finite number of such cycles. This explains update constraints; detailed controller algorithms and wear levelling are outside this lesson.')] }),

  'S3.03-OPTICAL-DISC':entry([
    p('An optical drive rotates a disc and follows its recording track using a focused laser. For reading, a low-power beam illuminates the track and a detector senses changes in the returned light. The controller decodes those variations into binary data. The laser does not read a magnetic field, and the optical pickup does not scrape the recording surface.','Read through optical differences'),
    steps('Record data and read it back',[
      ['Select compatible media','Assume a writer and an unused recordable disc that are compatible. The recording layer can be changed by the writer; a pressed read-only disc would not meet this condition.'],
      ['Write','The controller directs a higher-power laser at selected positions. Its energy changes the recording layer to form the required distinguishable optical pattern.'],
      ['Complete and retain','The recording operation completes. The changed layer remains when the disc is removed or power is switched off.'],
      ['Read later','Reinsert the disc in a compatible reader. The low-power laser and detector recover the optical pattern without deliberately changing it, and the controller returns the recorded data.'],
      ['Check the limit','The read beam is deliberately insufficient to create the recording change. A successful read also does not prove that the disc can be erased and rewritten.'],
    ]),
    table('The recording layer determines update possibilities',['Medium','How information is represented or changed','Consequence'],[
      ['Pressed read-only disc','A pattern is manufactured into the disc.','A normal computer writer does not rewrite that manufactured pattern.'],
      ['Recordable disc','Writing changes selected regions of its recording layer.','Previously written regions are not generally erased for reuse.'],
      ['Rewritable disc','A compatible writer can switch the recording material between distinguishable states.','The medium supports repeated erase/rewrite operations.'],
    ]),
  ],['Low-power reading detects reflected-light variations; higher-power writing changes a suitable recording layer.','Distinguish read-only, recordable and rewritable media before claiming an update is possible.'],'Why is “the writer cuts new pits in every disc” an unsuitable account of optical recording?','It conflates manufactured read-only patterns with recording-layer changes. State the medium and describe how the laser changes its suitable layer.',v('optical-roundtrip','Write a recording, then detect it','Writing changes a compatible layer; a later low-power read detects optical differences and decodes the stored data.')),

  'S3.03-TOUCHSCREEN':entry([
    p('A touchscreen combines two roles. The display produces visible output; a sensing layer detects input. In a capacitive screen, conductive electrodes form a sensing grid. A conducting finger changes local capacitance, and the controller measures the pattern of changes to estimate a touch position. The principal sensing mechanism is electrical, not pressure closing a switch.','Separate the display from the sensing layer'),
    steps('Select a displayed Start button',[
      ['Coordinate convention','Use a teaching screen whose x coordinate increases rightward and y coordinate increases downward. Start occupies x = 200–300 and y = 80–160, including the edges.'],
      ['Touch','A finger touches the sensing surface. The controller detects local capacitance changes and reports the illustrative coordinate (240, 120).'],
      ['Interpret','Software checks the coordinate against the control’s bounds. Both 200 ≤ 240 ≤ 300 and 80 ≤ 120 ≤ 160 are true.'],
      ['Respond','The application starts its specified operation and redraws the display to show that response. A coordinate such as (340, 120) would lie outside this button.'],
    ]),
    p('If the picture remains visible but touches are not registered, the output display alone does not prove that the sensing layer or its controller is working. Conversely, coordinates can be detected even if the display image is faulty. This distinction follows from the two separate roles.','Diagnose input and output separately'),
  ],['A capacitive controller locates a touch from changes measured across electrodes.','Coordinates are input; software interprets them, while the display supplies output.'],'A stylus produces no detectable capacitance change on the specified screen. Does pressing harder necessarily solve the problem?','No. Pressure is not its principal sensing mechanism. The input must be compatible with the specified capacitive sensing system.',v('touch-position','A reported coordinate selects a control','The declared coordinate (240, 120) lies within Start’s bounds; the display and capacitive sensing layer have separate roles.'),{extensions:[extension('a resistive touchscreen comparison','A resistive screen detects pressure bringing conductive layers into contact and derives a position from the electrical measurements. This can permit input from a non-conducting pointed object suitable for that screen. Compare the sensing mechanism, not a universal quality ranking; the capacitive example remains the main worked mechanism.')] }),

  'S3.03-VR-HEADSET':entry([
    p('A VR headset presents a viewpoint for each eye, with lenses making the nearby displays usable in the wearer’s field of view. The two views are rendered from slightly different eye positions to support depth perception. Motion and orientation tracking supplies input; the display and optional audio supply output. A headset is therefore more than a pair of screens.','Connect tracking with visual output'),
    steps('Turn right in a virtual gallery',[
      ['Initial view','The viewer faces a teal cube on a pedestal. An ochre doorway appears towards the right of the view. Assume a stationary viewer position and stationary virtual objects.'],
      ['Measure','The wearer turns their head to the right. Tracking sensors and processing report the changed orientation to the rendering system.'],
      ['Render','The computer updates the virtual viewing direction and generates the new left-eye and right-eye views. The doorway comes towards the centre; the cube appears further left in the view.'],
      ['Display','The displays show the updated views. The virtual room remains stationary in its world coordinates while the wearer looks in a new direction.'],
      ['Late or missing data','With stale orientation data, the renderer can keep showing an earlier viewpoint. Working screens alone do not ensure that the displayed view corresponds to the wearer’s current pose.'],
    ]),
    p('The paired illustration is a conceptual comparison of view directions, not a measured camera calibration or a left-eye/right-eye stereo pair. It shows that the view changes when the head turns. It must not be read as a claim that the world’s objects move together with the head. Lens design, three-dimensional transformation matrices and detailed tracking algorithms are beyond this explanation.','Read the illustration correctly'),
  ],['Tracking supplies pose input; rendering uses it to update the two eye views.','Separate functioning displays from accurate and timely viewpoint updates.'],'If the headset displays a prerecorded image that never changes with head orientation, which part of the illustrated response is missing?','The tracking-to-rendering update is missing or ineffective. Two functioning displays do not establish a viewpoint that responds to a head turn.',{type:'reviewed-visual',asset:'/assets/course-v3/section-3/vr-viewpoint-pair.png',title:'Looking ahead, then turning right',alt:'Two conceptual gallery views. Left: a teal cube is central and an ochre doorway is on the right. Right: after turning the view rightward, the doorway moves towards the centre and the cube appears on the left.',facts:['These panels compare viewing directions, not the two eyes.','The cube and doorway represent stationary world objects.','A rightward turn changes their positions within the rendered view.'],caption:'Left: looking ahead. Right: looking rightward from the same intended position. Conceptual scene illustration; the objects remain stationary in the virtual world.',layout:'mechanism',review:'Built-in ImageGen; reviewed for object identity, direction of view change and absence of embedded claims.'}),
  'S3.04-BUFFER':entry([
    p('A buffer is an area of memory that temporarily holds data during a transfer. A sender can produce a short burst faster than a receiver consumes it. The stored data waits until the receiver is ready, allowing the two sides to work at different instants. Capacity limits how much can wait; it does not increase the receiver’s sustained operating rate.','Generalise the streaming idea to devices'),
    p('For a printer, a buffer can hold received page data while the print mechanism works. For a recorder, it can hold samples while storage completes a write. Lesson 012 developed streaming-rate calculations; here, track individual blocks and the producer’s response to a full buffer. A device driver translates device-specific requests, while a print queue orders jobs. Neither is the buffer’s temporary-storage role itself.','Recognise the same role in different systems'),
    p('Use a capacity of four blocks and an initially empty buffer. The sender has P1–P6 in order. At time zero it supplies P1–P4 and pauses with P5–P6 still waiting at the sender. At each later one-second event, the receiver removes the oldest block first; the sender then supplies one waiting block if there is space. Transfer at these event boundaries is assumed instantaneous for this trace.','Trace full, paused and resumed transfer'),
    table('Capacity four: all six blocks eventually leave',['Time','Event order','In the buffer after event','Waiting at sender','Removed so far'],bufferTrace),
    p('At 6 s all six blocks have been removed once, in order, and the buffer is empty. Count a removed block at the receiver, not in the waiting column. If the producer cannot pause and sends to a full buffer, the system needs a specified policy such as dropping new data; otherwise data loss is possible. Do not invent a policy from capacity alone. The simpler three-block table below illustrates draining a single burst with no later arrivals.','Check completion and the full boundary'),
  ],['A finite buffer holds waiting data and absorbs temporary rate differences.','On full capacity, apply the stated pause or loss policy; track arrivals and removals separately.'],'In the four-block example, why is P5 absent from the buffer at time zero but present after 1 s?','The sender was paused while capacity was full. Removing P1 creates one slot, after which P5 is accepted; the receiver’s rate has not increased.'),

  'S3.05-RAM-ROM':entry([
    p('RAM is read/write working memory. Running programs change its contents as they receive data and produce intermediate results; ordinary RAM loses those contents when power is removed. ROM is non-volatile instruction storage, commonly used for firmware needed at start-up or to control a dedicated device. During normal operation those instructions are read rather than continuously replaced. Some ROM technologies permit a separate update procedure.','Compare normal use and power loss'),
    steps('Choose memory for a recorder through one session',[
      ['Start-up','Persistent firmware supplies the recorder’s instructions after power is applied. Empty working RAM is initialised for the new recording.'],
      ['Capture and edit','Incoming samples and temporary editing results repeatedly change. RAM supports those reads and writes. A buffer is part of the memory assigned to temporarily waiting samples.'],
      ['Save','The recording is written to non-volatile secondary storage. Its saved user data has a different role from the firmware instructions even when both use flash technology.'],
      ['Switch off and restart','RAM’s unsaved working data is lost. Firmware remains available, and the saved recording can be loaded into new RAM workspace on restart.'],
    ]),
    p('A desktop uses RAM for active applications and data; a printer uses it for changing page data; an embedded logger uses it for current readings. Each also needs persistent control or start-up instructions. “Non-volatile” alone does not mean “ROM”: a saved photograph on an SSD is user data in secondary storage, not thereby start-up firmware.','Distinguish a storage property from its job'),
  ],['RAM supports changing working data and is normally volatile; ROM retains instructions without power.','State each device’s workload and distinguish firmware from saved user files.'],'A flash chip stores both firmware and recordings in separate regions. Must both regions have the same role because the technology is the same?','No. One region supplies persistent instructions; the other retains user files. Technology, volatility and role are different classifications.',v('memory-roles','The job and the technology are separate choices','Working data, firmware and saved files have different roles. SRAM/DRAM and ROM update variants answer different technology questions.')),

  'S3.06-SRAM-DRAM':entry([
    p('Static RAM stores a bit in a bistable circuit: it can hold either of two stable states while supplied with power. Writing sets the state and reading detects it. The circuit does not need the periodic refresh used by DRAM, but removing power still loses the stored information. “Static” does not mean read-only or non-volatile.','How SRAM holds a bit'),
    p('Dynamic RAM stores a bit using charge in a capacitor selected by access circuitry. The charge leaks over time, so the memory system must periodically restore the charge states. This is refresh, not a new user save or a copy to a backup. If refresh stops long enough, information can become unreliable even before the entire device is switched off.','Why DRAM needs refresh'),
    steps('Select memory from two different constraints',[
      ['Small, frequent-access workspace','A processor cache needs low-latency access close to the processor. SRAM is suitable: its fast access reduces waiting, and the required capacity is small enough to accept a higher cost per bit.'],
      ['Large affordable workspace','A desktop needs much more main memory for active programs and data. DRAM’s high density and lower cost per bit make that capacity practical, while the system provides refresh.'],
      ['Change the constraint','Using SRAM for all large main memory would increase cost and reduce density for a given area. Choosing DRAM solely because it is cheaper would not meet every low-latency cache requirement.'],
      ['Remove power','Neither choice preserves the unsaved workspace across shutdown. Data that must survive is saved separately to non-volatile storage.'],
    ]),
    p('A small controller may also use SRAM for its working variables; a system processing large images may need a larger DRAM workspace. Cache and main memory are representative uses, not definitions of the two technologies. The comparison table links the storage mechanism to speed, density and cost. Detailed cache organisation is left to processor study.','Transfer the reasoning to another device'),
  ],['SRAM holds a powered bistable state; DRAM stores capacitor charge and requires refresh.','Compare latency, density and cost against the workload; both are volatile.'],'A student chooses SRAM to keep data after power is removed because it needs no refresh. What is wrong?','SRAM needs continuous power to maintain its bistable state. No periodic refresh does not mean non-volatile retention.'),

  'S3.07-PROM-EPROM-EEPROM':entry([
    p('All three technologies retain programmed information without continuous power. Their important difference is the way the stored instructions can be changed. PROM is supplied unprogrammed and can be programmed once; EPROM can be erased with ultraviolet light and then reprogrammed; EEPROM supports electrical erasure and reprogramming. ROM is therefore not a claim that no form of programmed ROM can ever be updated.','Separate programming, erasing and reading'),
    table('A calibration instruction must change from version A to B',['Technology','Attempted lifecycle','Does it meet repeated in-device electrical updates?'],[
      ['PROM','Program A → retain and read A → attempt replacement B','No. It cannot be erased and programmed again as required.'],
      ['EPROM','Program A → remove as needed → erase with UV → program B → reinstall','No. Reuse is possible, but the erase process does not meet the stated electrical in-device requirement.'],
      ['EEPROM','Program A → electrically erase/reprogram using supported procedure → read B','Yes, with suitable device hardware and update software. B remains after power is removed.'],
    ]),
    p('If a low-cost product is programmed once and never updated, PROM can meet that different requirement. If workshop removal and UV erasure are acceptable, EPROM becomes a possible reusable choice. Selecting EEPROM requires more than saying it is non-volatile: all three share that property, so the decisive factor is how the application must update its data or instructions.','Change the requirement and reconsider'),
  ],['PROM: program once. EPROM: ultraviolet erase then reprogram. EEPROM: electrical erase and rewrite.','Choose from the update process as well as the need for retention.'],'Why does “it keeps instructions after shutdown” fail to justify EEPROM over PROM here?','Both retain instructions. EEPROM is distinguished by supporting the required electrical rewriting, whereas PROM cannot be repeatedly programmed.'),

  'S3.08-MONITORING-CONTROL':entry([
    p('Monitoring obtains information about a physical condition and records, displays or reports it. A warning can be part of monitoring: it tells someone that a condition requires attention but does not necessarily regulate that condition. Control applies an output that changes the process. In closed-loop control, new measurements guide the next corrective action.','Classify the whole task, not merely the presence of output'),
    table('Three cold-store arrangements use the same measurement',['System','Response to a high reading','What it accomplishes'],[
      ['Logger','Record and display 9 °C.','Monitoring: reports temperature.'],
      ['Temperature alarm','Sound a warning at 9 °C.','Monitoring with an alert: the sound does not itself cool the store.'],
      ['Automatic refrigeration','Switch cooling on under the stored rule; measure again and stop when required.','Closed-loop temperature control: an actuator changes the measured condition.'],
    ]),
    p('Identify the physical quantity being regulated. A sounder is an output device and can be an actuator in an alarm system, but sounding it does not by itself close a loop that reduces workshop noise. Similarly, an operator could react to a displayed temperature, but that does not establish automatic temperature control by the computer.','Explain why a report is not itself correction'),
  ],['Monitoring measures and reports; control applies an action to the process.','A closed-loop controller uses returned measurements to guide further action.'],'A greenhouse monitor displays a warning and switches on a lamp above the display. Has it necessarily regulated greenhouse temperature?','No. Those outputs report the condition. Temperature regulation requires an action that changes temperature and, for closed-loop control, returned temperature measurements.',v('monitor-control','Use the same measured quantity to compare systems','The monitoring lane reports temperature. The closed-loop lane operates refrigeration and measures the temperature again.'),{extensions:[extension('control without feedback','A timer can open a watering valve for a fixed duration without measuring the resulting soil condition. That is an open-loop control action: it changes the process but does not automatically correct from the outcome. This comparison explains why the feedback loop taught here is a particular and valuable form of control.')] }),

  'S3.09-NAMED-SENSORS':entry([
    p('A sensor responds to a physical quantity and supplies a corresponding signal. Select it by the quantity required, not by the name of the larger machine. Temperature, pressure, infra-red and sound sensors are the four named types used here. A signal can be analogue or already digitised by a sensor module; conversion is needed only where an analogue signal must enter a digital processor.','Match a physical quantity to a signal'),
    table('Make and justify a sensor choice',['Requirement','Suitable sensor','What the reading tells the system'],[
      ['Detect warming in a refrigerator','Temperature','Whether the measured temperature has reached the switching condition.'],
      ['Stop an air pump at a tyre-pressure target','Pressure','The actual pressure; motor running time alone cannot establish that pressure.'],
      ['Detect interruption of a directed IR beam','Infra-red receiver','Whether the specified beam reaches the receiver. A transmitter supplies the beam in this arrangement.'],
      ['Report excessive workshop noise','Sound','A signal related to the detected sound level, which can be compared with the chosen limit.'],
    ]),
    p('A pressure sensor measures pressure; force and pressure are related but should not be used as interchangeable labels without the device context. An infra-red beam receiver is also not the same mechanism as a passive detector responding to changes in incoming thermal radiation. Name the signal that the stated arrangement actually measures.','Avoid replacing the measurement with a guess'),
    p('In the beam example, first establish that the beam is received. An object interrupts it, the receiver’s signal changes, and the controller applies the specified alert or counting rule. When the beam is restored the signal returns. Whether to count once, sound continuously or reset an alarm is a control rule, not information supplied by the sensor type alone.','Complete one detection and recovery'),
  ],['Match temperature, pressure, infra-red or sound sensing to the required physical input.','Separate a sensor’s measurement from the controller’s response rule.'],'A motor is powered for three seconds. Is that a pressure reading?','No. It describes an output duration. A pressure sensor is needed to measure the actual pressure produced.',undefined,{replaceLead:mt('Choose the measurement before the response',['Input quantity','Example use'],[['Temperature','Cold-store reading'],['Pressure','Tyre-pressure reading'],['Infra-red radiation','Received or interrupted beam'],['Sound','Workshop noise level']])}),

  'S3.09-SENSOR-ACTUATOR-FLOW':entry([
    p('The sensor measures, the processor decides and the actuator acts. A sensor signal is converted to digital data when necessary before the processor compares it with a stored target or rule. The resulting output signal usually operates suitable driving circuitry; it does not imply that the processor can directly supply a heater’s or motor’s power.','Follow information and physical power separately'),
    steps('Complete a tyre-inflation control example',[
      ['Given state and rule','Target pressure is 220 kPa. The pump is initially off. Turn it on while the measured pressure is below 220 kPa; switch it off at or above the target. Assume a working sensor, driver and pump.'],
      ['First measurement','The pressure sensor reports 200 kPa. Convert its signal if necessary. The processor compares 200 with 220 and commands the driver to power the pump motor.'],
      ['Physical action','The motor operates the pump, adding air and increasing actual pressure. The motor is the actuator in the stated assembly.'],
      ['Measure again','The next reading is 215 kPa, so pumping continues. A later reading of 220 kPa causes the controller to switch the pump off.'],
      ['Final state','The measured target has been reached and the pump is off. Continued measurements can detect a later change rather than assuming pressure remains correct forever.'],
    ]),
    p('ADC and DAC should not be inserted mechanically into every block diagram. An analogue input needs digitisation; an already digital sensor output does not need an additional external ADC for that same signal. A switched motor or relay can use a digital command and driver; an actuator interface requiring an analogue command may use a DAC. State the actual signal requirement.','Choose conversion from the interface'),
  ],['Trace sensor → conversion if needed → processor comparison → output driver → actuator → physical effect.','A command and the actual outcome are different; new sensing checks the result.'],'If the processor sends an ON command but the pump motor is disconnected, which pressure should the next sensor reading describe?','The actual physical pressure, which may remain unchanged. It must not simply echo the intended pressure or the ON command.',mt('Assign each responsibility in the pump example',['Part','Information or action'],[['Pressure sensor','Measures 200, then 215, then 220 kPa'],['Input conversion, if required','Digitises an analogue reading'],['Processor','Compares the reading with 220 kPa'],['Output driver','Supplies motor power when commanded'],['Motor and pump','Add air to raise actual pressure']])),

  'S3.08-FEEDBACK':entry([
    p('Feedback returns information about the actual measured condition to the controller. It is used to compare the outcome with a target or switching rule and determine the next output. A reading that has not changed can be valuable feedback when an actuator is ineffective. Feedback does not require that the attempted action already succeeded.','Measure what happened, not what was commanded'),
    p('Begin with a single threshold: switch a heater on below 20 °C and off at or above 20 °C. Readings 18, 19, 20 produce ON, ON, OFF. Continued sensing matters because an open door can cool the room again. The exact action follows the stored rule; the sensor does not choose it.','Follow an ordinary closed loop'),
    p('A two-threshold variant turns on below 18 °C and off at or above 20 °C. Between those boundaries it keeps its previous state. The initial state is OFF. The readings below are supplied observations, not values predicted by a thermal simulation.','Trace both warming and cooling'),
    table('The same middle reading can require different states',['Step','Previous state','Reading / °C','Apply the stated rule','New state'],heaterTrace),
    table('Use feedback to reason about faults',['Changed condition','Information returned','Likely consequence under the stated rule'],[
      ['Door opens after heating stops','Temperature can fall below 18 °C.','Heating restarts from the new measurement.'],
      ['Sensor is stuck at 17 °C','The controller keeps receiving a low reading even if the room warms.','It may keep heating; the measurement is no longer reliable evidence of actual temperature.'],
      ['Heater fails to produce heat','A working sensor keeps reporting the actual low temperature.','The controller can continue commanding heat, but feedback alone cannot repair the actuator.'],
    ]),
  ],['Feedback is returned measurement of the actual condition, including unchanged outcomes.','Use the supplied rule and previous state; disturbances and faulty measurements can change the result.'],'Why is the heater ON at the first 19 °C reading but OFF at the later 19 °C reading?','The value lies between the switching thresholds. The rule retains the previous state: ON while warming, OFF after the 20 °C switch-off.',v('feedback-outcome','Return the actual outcome to the controller','Sensor information closes the loop. The output command alone cannot prove that the actuator changed the environment.'),{dropFlows:true,extensions:[extension('why use two switching thresholds?','Separate on and off thresholds create a band in which the existing state is retained. This hysteresis can reduce rapid on/off switching when measurements fluctuate near a single threshold. It introduces state dependence, so both boundary values and the previous state must be specified. No PID calculation is required.')] }),

  'S3.10-SYMBOLS':entry([
    p('A logic gate maps binary input values to a binary output. In these examples 1 represents TRUE/high and 0 FALSE/low; each scenario must say what those values mean for its inputs. NOT has one input. The other five named gates each have two inputs, even when a whole circuit has three or more independent variables.','Read the input and output connections'),
    steps('Build the basic rules before their variants',[
      ['NOT','Invert one input: 0 becomes 1 and 1 becomes 0. Its triangular symbol has an output inversion circle.'],
      ['AND','The output is 1 only for 11. For 01, one required condition is missing, so the output is 0.'],
      ['OR','The output is 1 when either or both inputs are 1. The 11 case is included.'],
      ['NAND and NOR','Evaluate AND or OR first, then invert the whole result at the output bubble. Inverting one input is a different circuit.'],
      ['XOR / EOR','Exactly one of the two inputs must be 1. The output is 1 for 01 and 10, and 0 for 00 and 11. The extra curved input line distinguishes its symbol from OR.'],
    ]),
    table('Use a decisive row to distinguish rules',['Question','Evaluate this input','Conclusion'],[
      ['OR or XOR?','A = 1, B = 1','OR = 1, XOR = 0. An example with 10 cannot distinguish them.'],
      ['NAND or AND with B inverted?','A = 0, B = 0','NAND = 1; A AND NOT B = 0. Moving the inversion changes the function.'],
      ['NOR or OR?','A = 0, B = 0','NOR = 1 while OR = 0. The bubble complements the whole result.'],
    ]),
    p('Use AND, OR and NOT words with brackets in the following expressions. Other texts may use a dot for AND, a plus for OR, an overbar or ¬ for NOT, and ⊕ for XOR. A logical plus is not ordinary binary addition. The equality sign in Q = A AND B describes a Boolean relationship, not a pseudocode assignment statement.','Keep notation and meaning aligned'),
  ],['Recognise NOT, AND, OR, NAND, NOR and XOR by their shapes and output rules.','Output circles invert; XOR’s extra input curve does not denote inversion.'],'Which input row distinguishes OR from XOR, and why is 10 insufficient?','Use 11: OR returns 1 and XOR 0. For 10 both return 1.',v('gate-symbols','Six symbols with exact input and output connections','Compare the output circles on NOT, NAND and NOR, and the extra curved line on XOR.')),

  'S3.10-TABLES':entry([
    p('A truth table lists every possible combination of independent binary inputs and the resulting output. With n independent inputs there are 2^n combinations. One input gives two rows; two give four; three give eight. The number of gates or intermediate wires does not create extra independent input combinations.','Enumerate inputs before calculating outputs'),
    steps('Construct AND, then NAND, without memorising a sequence',[
      ['List inputs','Write 00, 01, 10, 11 once each. Keep that order for every output column.'],
      ['Apply AND','00 fails both conditions; 01 and 10 each fail one; 11 satisfies both. AND therefore gives 0, 0, 0, 1.'],
      ['Invert for NAND','Complement each completed AND result, obtaining 1, 1, 1, 0. Inversion comes after the AND operation.'],
      ['Check','There are four distinct rows, every row has one output and the 11 result matches the NAND rule.'],
    ]),
    p('For NOR, OR first gives 0,1,1,1 and inversion gives 1,0,0,0. For XOR, compare the two input values in each row: they differ only at 01 and 10. The comparison table above collects these independently derived results. The complete NOT example below uses only two rows because its one input has only two states.','Extend the method to every named gate'),
    p('An output sequence such as 1,0,0,0 is meaningful only with its input order. Omitting a zero-output row would lose information about rejected cases. To challenge a proposed table, choose a row that separates the correct rule from the claimed rule, then still check that all rows are present.','Check completeness and correctness separately'),
  ],['List all 2^n input combinations exactly once, then evaluate the rule for each row.','State input order and include both accepted and rejected cases.'],'A circuit has six gates but only three independent inputs. How many input rows are required?','Eight. The six gates transform the existing input values; they do not supply six independent binary choices.'),

  'S3.10-STATEMENT':entry([
    p('Start by defining each variable and its active value. A deterministic rule must say exactly when the output is 1 and when it is 0. Preserve each AND, OR and NOT relationship with explicit brackets. In the door example, D = 1 means a valid request and C = 1 means the lock condition is active; permission is 1 exactly when D is 1 and C is 0.','Translate the complete condition'),
    steps('Connect words, expression, circuit and table',[
      ['Words to expression','A valid request and an inactive lock give P = D AND (NOT C). Both conditions are required.'],
      ['Expression to circuit','C feeds NOT first. That result and D feed a two-input AND. Label the output P; the small circle belongs on NOT’s output, before AND.'],
      ['Words or expression to table','List DC as 00, 01, 10, 11. Calculate NOT C, then P. Check each P against the original permission condition.'],
      ['Check the alternative','NOT (D AND C) returns 1 for DC = 00, granting permission without a valid request. One counterexample disproves equivalence.'],
    ]),
    p('For three conditions, keep two inputs per gate. A lamp rule “S is on and both U and V are off” becomes L = S AND ((NOT U) AND (NOT V)). Build NOT U and NOT V, combine them with AND, then combine that intermediate result with S. This whole circuit has three independent inputs and eight rows, although each AND gate still has two inputs.','Construct a cascade from an expression'),
    table('Lamp construction with intermediate values',['S','U','V','NOT U','NOT V','(NOT U) AND (NOT V)','L'],truthRows('lamp',[op('NOT','U'),op('NOT','V'),op('AND',op('NOT','U'),op('NOT','V'))])),
    p('Only SUV = 100 lights the lamp. This is checked against the condition as well as the constructed expression. Draw the provided cascade before using the separate practice conditions; the number of written conditions does not justify drawing an unsupported three-input gate.','Verify the constructed result'),
  ],['Define input meanings, translate negations and brackets, then build gates from inner operations outward.','Check all input rows against the original statement, not merely your own expression.'],'Why is NOT (U AND V) not a correct translation of “both U and V are off”?','At UV = 01 it returns 1 although V is on. The correct condition is (NOT U) AND (NOT V).',undefined,{support:[circuit('lamp','A complete three-input cascade','Two NOT gates feed an AND; its output and S feed the final AND. Only input SUV = 100 gives L = 1.')] }),

  'S3.10-CIRCUIT':entry([
    p('Read a circuit in dependency order. A gate can be evaluated only after its inputs are known. Give intermediate wires names, calculate their values and pass them onward. A branch carries the same signal on both paths; a crossing joins wires only when a junction is explicitly indicated. Repeated input labels in the tree-style solution diagrams refer to the same input signal.','Follow connections rather than page-reading order'),
    steps('Read the existing Circuit B',[
      ['First branches','The XOR receives A and B: X = A XOR B. The NOT receives C: Y = NOT C.'],
      ['Final gate','The AND receives X and Y: Q = X AND Y. Substitute both definitions to obtain Q = (A XOR B) AND (NOT C).'],
      ['Trace one row','For ABC = 010, X = 1 and Y = 1, so Q = 1. For ABC = 011 the XOR stays 1 but Y becomes 0, so Q becomes 0.'],
      ['Complete the table','Calculate the same intermediate columns for all eight rows, as in the complete example below. The accepted rows are 010 and 100.'],
    ]),
    p('A NAND at the end would invert the entire AND result; an input NOT would invert only its own incoming signal. For Circuit C in the exam questions, form the OR output first and then apply the NAND with C. Keep brackets when substituting so that the inversion scope remains visible.','Preserve the final gate’s operation'),
  ],['Label intermediate outputs and evaluate gates in dependency order.','Substitute complete expressions with brackets, then construct every truth-table row.'],'Circuit B has X = 1 and C = 1. Why is Q still 0?','Y = NOT C = 0, so the final AND receives 1 and 0 and outputs 0.'),

  'S3.10-FROM-TABLE':entry([
    p('An output-1 row states a complete accepted input condition. Use an unmodified variable for each input 1 and its NOT form for each input 0. AND those conditions to select that one row. OR the terms for all accepted rows so that any accepted condition can produce the output. This constructs a valid expression without needing algebraic simplification.','Why one row becomes one AND term'),
    p('The equality example has accepted rows AB = 00 and 11. The first term is (NOT A) AND (NOT B); the second is A AND B. Their OR gives the full rule. The circuit in the visual overview makes the two branches visible. NOT (A XOR B) is another valid implementation using the six taught gate types; an additional single XNOR symbol is not needed.','Complete the two-input construction'),
    table('Verify the equality construction',['A','B','Q'],truthRows('equality')),
    p('Connect inverted A and inverted B to the first AND. Connect unchanged A and B to the second AND. Join those outputs with OR and label its output Q. The four rows give 1,0,0,1; both rejected rows remain 0. A single matching row would not establish the whole equality rule.','Wire and verify the two-input circuit'),
    table('A second source table: three independent inputs',['A','B','C','Q'],truthRows('acceptedRows')),
    steps('Construct the circuit for the three-input table',[
      ['Select accepted rows','Only 001 and 101 have Q = 1. Row 001 requires NOT A, NOT B and C; row 101 requires A, NOT B and C.'],
      ['Write each term','T1 = ((NOT A) AND (NOT B)) AND C. T2 = (A AND (NOT B)) AND C. Each three-condition term uses two cascaded two-input AND gates.'],
      ['Combine','Q = T1 OR T2. Draw the two term circuits and join their outputs with a two-input OR. Repeated A, B and C labels carry the same respective input values.'],
      ['Verify every case','The circuit gives 0,1,0,0,0,1,0,0 in ABC order 000–111. Checking all six rejected rows is necessary; a missing NOT could otherwise accept unwanted cases.'],
    ]),
    p('A shorter expression (NOT B) AND C happens to implement this table because both values of A are accepted whenever B = 0 and C = 1. The unsimplified construction is already correct. Recognise the shorter form only by checking all rows; do not delete a variable merely to make a diagram smaller.','Distinguish correctness from optional simplification'),
  ],['AND the conditions in each output-1 row, then OR all accepted-row terms.','Draw the actual two-input gate circuit and verify both output-1 and output-0 rows.'],'A student builds only the term for ABC = 001. Which source-table row proves the circuit is incomplete?','ABC = 101 should also produce 1, but the single term for 001 rejects it.',undefined,{support:[circuit('equality','The equality rule as an actual circuit','Two accepted-row terms, NOT A AND NOT B and A AND B, feed OR. Repeated labels refer to the same two inputs.'),circuit('acceptedRows','Build both three-input accepted terms','The terms for 001 and 101 use cascaded two-input AND gates and join at OR. All six rejected rows must remain 0.')],extensions:[extension('prove a Boolean equivalence with a table','Expressions may be equivalent even when their circuits look different. For example, NOT (A OR B) and (NOT A) AND (NOT B) both give 1 only for 00. A complete truth table proves equivalence for the stated inputs; one differing row disproves it. Algebraic minimisation and Karnaugh maps are not required here.')] }),
};

function authorReview(lesson) {
  const target=lesson.units.find(u=>u.syllabusId==='REVIEW-1-3');
  if(!target) throw new Error('Missing S3 Paper 1 review unit');
  const objectiveIds=lesson.objectives.filter(([id])=>id.startsWith('S3.')).map(([id])=>id);
  const units=lesson.units.map(u=>u!==target?u:{...u,unitKey:'S3-REVIEW',objectiveIds,useAuthoredVisual:true,preserveTeachingSteps:true,
    teachingBlocks:[
      p('An environmental recorder measures conditions, stores observations and controls a pump. Diagnose it by separating the physical measurement, data representation, temporary workspace, persistent files and corrective action. A component’s name alone does not demonstrate that the full system is working.','Connect the hardware responsibilities'),
      table('Choose evidence that separates possible faults',['Observation','Reasoning to apply'],[
        ['A saved reading returns after restart but an unsaved edit disappears.','Separate non-volatile saved data from volatile working memory.'],
        ['A burst can be accepted but a sustained excess eventually blocks transfer.','Compare waiting content and finite capacity; apply the full-buffer policy.'],
        ['A motor receives a command but the pressure stays unchanged.','The command is not the physical outcome; use actual feedback and investigate the actuator.'],
        ['An alarm triggers under a supposedly rejected input.','Translate the stated condition, trace intermediate logic and identify a counterexample.'],
      ]),
      p('Use the three hardware diagnosis tasks and the retained logic task below. Return to Lessons 015–020 to reconstruct any missing physical stage or Boolean relationship. The logic task’s complete eight-row answer is a check on the supplied expression, not a substitute for independently deriving the table.','Demonstrate the chain independently'),
    ],explanation:['Trace physical and data changes before assigning a fault or choosing hardware.','Use the full rule, actual state and all input combinations when checking control and logic.'],materials:[mt('Section 3 application route',['Topic','Produce this evidence'],[['Device mechanism','Ordered conversion and a fault consequence'],['Memory and buffer','Power-cycle result, update choice and waiting-state trace'],['Control','Measured quantity, actuator and feedback outcome'],['Logic','Expression, circuit and complete input table']])],checkpoint:{prompt:'The processor commands a pump ON. Does this establish that the target pressure was reached?',answer:'No. A functioning pressure sensor must report the actual pressure. A command can be sent while the actuator or pump fails.'},misconceptions:['Correct output commands or available capacity do not prove a successful physical result or an indefinitely sustainable transfer.']});
  const practice=lesson.practice.map(q=>q.id==='V3-Q-L045-03'?{...q,authored:true,objectiveIds:['S3.10.R']}:q);
  return {...lesson,units,practice:[...practice,...section3ReviewPractice(objectiveIds)]};
}

export function authorSection3Teaching(lesson) {
  if(lesson.kind==='review' && lesson.paper===1) return authorReview(lesson);
  if(lesson.section!==3) return lesson;
  const units=lesson.units.map(unit=>{
    const spec=section3Teaching[unit.unitKey];
    if(!spec) throw new Error(`Missing S3 teaching: ${unit.unitKey}`);
    let materials=unit.materials.filter(m=>!(spec.dropFlows && m.type==='flow') && !(unit.unitKey==='S3.10-FROM-TABLE' && ['table','worked-example'].includes(m.type)));
    const lead=spec.lead??spec.replaceLead;
    if(lead) materials=[lead,...materials.filter(m=>!['reviewed-visual','analogy'].includes(m.type) && !(spec.replaceLead && m===unit.materials[0]))];
    materials=[...materials,...(spec.support??[]).map(m=>({...m,preserve:true}))];
    return {...unit,teachingBlocks:spec.blocks,explanation:spec.core,checkpoint:spec.checkpoint,preserveTeachingSteps:true,useAuthoredVisual:true,preserveSelectedVisual:Boolean(lead),
      materials:materials.map(m=>({...m,objectiveIds:unit.objectiveIds})),
      ...(spec.extensions?{extensions:spec.extensions.map(e=>({...e,materials:e.materials.map(m=>({...m,objectiveIds:unit.objectiveIds}))}))}:{}),
      ...(unit.unitKey==='S3.08-FEEDBACK'?{misconceptions:['Feedback is the returned measurement of the actual condition. It can remain unchanged when an actuator fails; it is not the output command.']}:{}),
    };
  });
  const revised={...lesson,units,practice:[...lesson.practice,...section3AdditionalPractice(lesson)]};
  if(lesson.originalLesson===14) revised.teachingCheckpoints=['Printing and manufacture: trace a finished laser-printed image and all slices of the three-layer model, then diagnose the printer questions.','Recording and playback: explain both physical transducers and place ADC, memory, storage and DAC in a complete chain.','Storage read/write: locate a disk sector, trace flash retention and compare optical recording layers before the storage tasks.','Interaction: interpret a supplied touch coordinate and explain how a rightward head turn changes the rendered view.'];
  return completeSection3Answers(revised);
}
