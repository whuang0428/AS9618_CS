const scenarioMap = {
  deleted: {
    result: "Best fit: backup utility.",
    method: "A backup utility can restore a previous copy of files if the backup was made before the deletion.",
    trap: "Do not say antivirus can recover deleted work. Antivirus targets malware, not ordinary file loss.",
  },
  email: {
    result: "Best fit: compression utility.",
    method: "Compression reduces file size, which can reduce upload time and help the file meet an attachment limit.",
    trap: "Do not claim compression always improves quality. Lossy compression may reduce quality.",
  },
  stolen: {
    result: "Best fit: encryption utility.",
    method: "Encryption changes readable plaintext into ciphertext, so stolen data cannot be read without the key.",
    trap: "Do not say encryption prevents theft or deletion. It protects confidentiality if data is accessed.",
  },
  slowhdd: {
    result: "Best fit: defragmentation utility.",
    method: "On a magnetic hard disk, defragmentation rearranges scattered file blocks to reduce disk head movement.",
    trap: "Do not apply this explanation to SSD storage; SSDs do not use a moving disk head.",
  },
  malware: {
    result: "Best fit: antivirus utility.",
    method: "Antivirus software can scan the attachment, detect known or suspicious malware, then quarantine or remove it.",
    trap: "Do not say antivirus guarantees complete protection against all new threats.",
  },
  ssd: {
    result: "Best fit: not defragmentation as the main answer.",
    method: "An SSD has no mechanical disk head, so classic defragmentation does not give the same access-time benefit.",
    trap: "Do not recommend defragmentation just because the word sounds like 'make storage tidy'.",
  },
};

const examples = {
  backup: {
    title: "Example 1: Backup after accidental deletion",
    problem: "A student deletes a project folder and needs to restore yesterday's version.",
    steps: [
      "The correct utility is a backup utility.",
      "It creates copies of data on another drive, server or cloud service.",
      "The deleted folder can be restored from a backup made before the deletion.",
      "A limitation is that work created after the most recent backup may still be lost.",
    ],
  },
  compression: {
    title: "Example 2: Compression for file transfer",
    problem: "A video file is too large to upload to a learning platform.",
    steps: [
      "The correct utility is a compression utility.",
      "It reduces the number of bits needed to store or transmit the file.",
      "This can reduce upload time and help fit within a size limit.",
      "A limitation is that lossy compression may reduce image or sound quality.",
    ],
  },
  encryption: {
    title: "Example 3: Encryption for confidential data",
    problem: "A company stores customer records on laptops used outside the office.",
    steps: [
      "The correct utility is encryption software.",
      "It converts plaintext records into ciphertext using an algorithm and key.",
      "If the laptop is stolen, an unauthorised person cannot read the records without the key.",
      "A limitation is that losing the key can prevent authorised recovery too.",
    ],
  },
  defrag: {
    title: "Example 4: Defragmentation for a magnetic hard disk",
    problem: "An older desktop with an HDD opens large files slowly after years of file changes.",
    steps: [
      "The relevant utility is defragmentation.",
      "Files may be split into fragments stored in different physical locations on the disk.",
      "Defragmentation rearranges blocks so file parts are stored closer together.",
      "This can reduce disk head movement, but the same reasoning is not valid for SSDs.",
    ],
  },
  antivirus: {
    title: "Example 5: Antivirus for suspicious downloads",
    problem: "A user downloads an attachment from an unknown sender.",
    steps: [
      "The correct utility is antivirus software.",
      "It scans the file for malware signatures or suspicious behaviour.",
      "It may warn the user, quarantine the file, delete malware or block the action.",
      "A limitation is that new malware may not be detected immediately, so updates matter.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which utility creates copies of data so files can be restored later?", accepted: ["backup", "backup utility", "backup software"], answer: "Backup utility" },
  { id: "p2", prompt: "Which utility reduces the size of files?", accepted: ["compression", "compression utility", "file compression"], answer: "Compression utility" },
  { id: "p3", prompt: "Which utility converts plaintext into ciphertext using a key?", accepted: ["encryption", "encryption utility", "encrypt"], answer: "Encryption utility" },
  { id: "p4", prompt: "Which utility rearranges fragmented files on a magnetic hard disk?", accepted: ["defragmentation", "defrag", "disk defragmentation", "defragmentation utility"], answer: "Defragmentation utility" },
  { id: "p5", prompt: "Which utility scans for, quarantines or removes malware?", accepted: ["antivirus", "anti virus", "antivirus software", "anti-virus"], answer: "Antivirus software" },
  { id: "p6", prompt: "State one reason backups should be made regularly.", accepted: ["recent", "restore recent", "reduce data loss", "less data lost", "up to date", "current"], answer: "So a recent copy can be restored and less new data is lost" },
  { id: "p7", prompt: "State one benefit of compression when sending a file over a network.", accepted: ["less bandwidth", "faster", "less time", "reduced upload", "reduced download", "smaller file"], answer: "Smaller files may take less time/bandwidth to transmit" },
  { id: "p8", prompt: "Does encryption stop a file from being deleted? Answer yes or no.", accepted: ["no"], answer: "No. Encryption protects confidentiality, not availability" },
  { id: "p9", prompt: "Why is classic defragmentation mainly linked to magnetic hard disks rather than SSDs?", accepted: ["moving head", "disk head", "mechanical", "no moving parts", "ssd no moving"], answer: "HDDs have moving disk heads; SSDs do not" },
  { id: "p10", prompt: "Why should antivirus software be updated?", accepted: ["new malware", "new threats", "definitions", "signatures", "detection rules"], answer: "To recognise newer malware signatures or detection patterns" },
];

const mistakes = [
  {
    wrong: "Backup software protects data by stopping hackers from reading it.",
    fix: "Backup software helps restore data after loss or damage. Encryption is the utility that protects confidentiality by making data unreadable without a key.",
  },
  {
    wrong: "Compression always keeps every bit of the original data.",
    fix: "Lossless compression reconstructs the original exactly. Lossy compression discards some detail to reduce file size further.",
  },
  {
    wrong: "Encryption prevents malware infection.",
    fix: "Encryption protects data from being read by unauthorised users. Antivirus software scans for and deals with malware.",
  },
  {
    wrong: "Defragmentation is equally useful for SSDs because it tidies the drive.",
    fix: "Classic defragmentation is linked to magnetic disks because it reduces disk head movement. SSDs have no moving head, so this benefit does not apply in the same way.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Describe the purpose of backup software and explain two reasons why a school should use it.",
    answer: "Backup software creates copies of files or systems, usually on another storage device, server or cloud location. A school should use it so deleted or corrupted coursework can be restored from a previous copy. It also helps recover data after hardware failure or malware damage. Backups should be regular and tested so the restored version is recent and usable.",
    marking: [
      { mark: "B1", text: "backup software creates/copies data or system files" },
      { mark: "B1", text: "copy is stored separately / on another medium / cloud / off-site" },
      { mark: "B1", text: "allows restoration after accidental deletion or corruption" },
      { mark: "B1", text: "allows recovery after hardware failure, malware or similar data loss event" },
    ],
    strict: [
      "Do not accept 'backup makes data secure' without restore/recovery idea.",
      "Do not award separate marks for repeated examples of the same loss event.",
      "Allow cloud backup if restoration is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Explain why compression software may be used before sending files over a network.",
    answer: "Compression software reduces the file size by encoding the data using fewer bits. A smaller file may need less bandwidth and take less time to upload or download. It may also help the file fit within an attachment or storage limit. If lossy compression is used, some quality or detail may be lost, while lossless compression allows exact reconstruction.",
    marking: [
      { mark: "B1", text: "compression reduces file size / number of bits" },
      { mark: "B1", text: "less data to transmit so upload/download time or bandwidth use is reduced" },
      { mark: "B1", text: "reduced transmission time and/or reduced bandwidth requirement explained" },
    ],
    strict: [
      "Do not accept 'makes the file faster' unless transmission or processing context is clear.",
      "Do not accept 'zips it' alone without reduced size idea.",
      "Allow 'smaller file' for B1.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A company stores customer data on laptops used by employees. Explain how encryption software can help and give one limitation.",
    answer: "Encryption software converts plaintext customer data into ciphertext using an encryption algorithm and a key. If a laptop is stolen, the data cannot be read by an unauthorised person without the correct key, so confidentiality is protected. A limitation is that encryption does not prevent the laptop being stolen or the file being deleted. If the key is lost, authorised users may also be unable to decrypt the data.",
    marking: [
      { mark: "B1", text: "plaintext/readable data is converted into ciphertext/unreadable form" },
      { mark: "B1", text: "uses an algorithm and/or key" },
      { mark: "B1", text: "unauthorised user cannot read data without correct key" },
      { mark: "B1", text: "benefit linked to laptop/customer data scenario or confidentiality" },
      { mark: "B1", text: "valid limitation such as no prevention of theft/deletion/malware or key loss" },
    ],
    strict: [
      "Do not accept 'data is hidden' without unreadable/ciphertext idea.",
      "Do not accept encryption as backup or antivirus.",
      "Allow symmetric/asymmetric references if technically correct.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Describe defragmentation and explain why it may improve performance on a magnetic hard disk.",
    answer: "Defragmentation rearranges file fragments or blocks so parts of a file are stored closer together or contiguously on a magnetic hard disk. This can reduce the amount of movement required by the disk read/write head. As a result, file access can be faster. This explanation is linked to HDDs and should not be stated as the same benefit for SSDs, which have no moving disk head.",
    marking: [
      { mark: "B1", text: "file fragments/blocks are rearranged" },
      { mark: "B1", text: "parts of a file are made contiguous/closer together" },
      { mark: "B1", text: "reduces movement of magnetic disk read/write head" },
      { mark: "B1", text: "access time/performance improvement linked to HDD, or SSD boundary correctly stated" },
    ],
    strict: [
      "Do not accept 'deletes unnecessary files' as defragmentation.",
      "Do not accept performance mark without mechanism on HDD.",
      "Allow 'hard disk' for magnetic disk if context implies HDD.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "For each scenario, name a suitable utility and justify it: recovering deleted documents; protecting files if a laptop is stolen; checking a suspicious download.",
    answer: "For recovering deleted documents, a backup utility is suitable because it can restore a previous copy made before the deletion. For protecting files if a laptop is stolen, encryption is suitable because it converts readable data into ciphertext that cannot be read without the key. For checking a suspicious download, antivirus software is suitable because it scans for malware and can quarantine or remove infected files.",
    marking: [
      { mark: "B1", text: "backup selected for recovering deleted documents" },
      { mark: "B1", text: "backup justification linked to restoring a previous copy" },
      { mark: "B1", text: "encryption selected for stolen laptop/files" },
      { mark: "B1", text: "encryption justification linked to ciphertext/key/unauthorised reading" },
      { mark: "B1", text: "antivirus selected for suspicious download" },
      { mark: "B1", text: "antivirus justification linked to scanning, quarantine or removal of malware" },
    ],
    strict: [
      "Do not award selection mark if the utility is matched to the wrong scenario.",
      "Do not accept 'secure' as justification unless the mechanism is clear.",
      "Allow anti-malware as antivirus equivalent.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s/]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    backup: "Correct. A backup made before deletion can be used to restore the coursework folder.",
    compression: "No. Compression may make files smaller, but it does not restore deleted data.",
    encryption: "No. Encryption protects confidentiality, but it does not bring deleted files back.",
    defrag: "No. Defragmentation rearranges blocks on a magnetic disk; it is not a time machine.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSimulator() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#simulateResult");
  const method = document.querySelector("#simulateMethod");
  const trap = document.querySelector("#simulateTrap");
  function simulate() {
    const item = scenarioMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Reasoning:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", simulate);
  document.querySelector("#simulateBtn").addEventListener("click", simulate);
  simulate();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>${example.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
}

function setupExamples() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("backup");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <article class="practice-item">
      <p><strong>${index + 1}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" aria-label="Answer for question ${index + 1}" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}Mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer">${item.answer}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const correct = item.accepted.some((answer) => value.includes(normalise(answer)));
      const mark = document.querySelector(`#${item.id}Mark`);
      mark.textContent = correct ? "Correct." : "Not quite. Reveal the answer, then improve the wording.";
      mark.className = `mark ${correct ? "correct" : "incorrect"}`;
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}Answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Mistake ${index + 1}:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}">${item.fix}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <h4>Indicative answer</h4>
        <p>${question.answer}</p>
        <h4>CIE-style mark scheme</h4>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSimulator();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
