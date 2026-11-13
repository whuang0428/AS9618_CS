// Original Cambridge question parts in the order students attempt them.
export const section4Checkpoints = {
  architecture: { title: 'CPU architecture and registers', lesson: 21, papers: ['E029', 'E4C01', 'E4C02'] },
  performance: { title: 'Processor performance', lesson: 22, papers: ['E031', 'E4C03', 'E4C04'] },
  ports: { title: 'Peripheral interfaces', lesson: 22, papers: ['E030', 'E4C05', 'E4C06'] },
  interrupts: { title: 'Interrupts and service routines', lesson: 24, papers: ['E4C07', 'E4C08', 'E034'] },
  assembly: { title: 'Assembly language and addressing', lesson: 26, papers: ['E035', 'E4D01', 'E036'] },
  bits: { title: 'Bit manipulation', lesson: 27, papers: ['E4D02', 'E037', 'E038'] },
};

export const section4NewPaperObjectives = {
  E4C01: ['S4.02.A02', 'S4.02.A03', 'S4.03.A01', 'S4.04.A01'],
  E4C02: ['S4.02.A01'],
  E4C03: ['S4.05.A02'],
  E4C04: ['S4.05.A03'],
  E4C05: ['S4.06.A01', 'S4.06.A02'],
  E4C06: ['S4.06.A01', 'S4.06.A03'],
  E4C07: ['S4.08.A02'],
  E4C08: ['S4.08.A04', 'S4.08.A06'],
};

export const section4NewPaperNotes = {
  E4C01: 'The three corrected statements test the PC, the MDR and the control bus used by the CU. Other components appear in distractors.',
  E4C02: 'Requires two paired differences between general-purpose and special-purpose registers.',
  E4C03: 'Tests why a second core at the same frequency may add less than a full core of useful throughput on this workload.',
  E4C04: 'Accepts distinct explanations for data-bus transfer width or address-bus addressability. The selected part does not compare the other specifications.',
  E4C05: 'Tests USB identification and how the host recognises an attached flash drive.',
  E4C06: 'Tests how HDMI carries signals between a computer and a peripheral, including audio and video on one connection.',
  E4C07: 'Requires one source of a software interrupt.',
  E4C08: 'Asks the student to supply the steps for identifying the source and priority, starting the ISR and re-enabling lower priorities. The question supplies the timing and context-save steps.',
};
