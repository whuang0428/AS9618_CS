const scenarioMap = {
  school: {
    result: "Suitable: frequent incremental backups plus regular full backups, with offsite copies.",
    method: "The database changes during the day, so incremental backups reduce possible data loss and storage use; full backups simplify restore points.",
    trap: "Do not keep the only backup on the same server as the live database.",
  },
  photos: {
    result: "Suitable: full archive backup after project completion, with offsite/cloud storage.",
    method: "Finished photo projects change rarely, so a full archived copy with clear retention is practical.",
    trap: "Do not confuse archive copies with frequent operational backups for changing data.",
  },
  hospital: {
    result: "Suitable: very frequent backups/replication and a tested disaster recovery plan.",
    method: "Patient systems have low tolerance for data loss and downtime, so RPO/RTO must be small.",
    trap: "Do not recommend weekly backup only for a system needed continuously.",
  },
  ransomware: {
    result: "Suitable: isolated/offline or immutable offsite backups.",
    method: "If ransomware can reach connected drives, backups must be separated so the same attack cannot encrypt every copy.",
    trap: "Do not leave the only backup permanently connected to the infected network.",
  },
  laptop: {
    result: "Suitable: automatic cloud/offsite backup plus local sync checks.",
    method: "A portable device can be lost, stolen or damaged, so local files need copies away from the device.",
    trap: "Do not rely only on the laptop's internal drive as a backup of itself.",
  },
};

const rpoMap = {
  hour: {
    result: "Suggested frequency: hourly or near-continuous backup/replication.",
    reason: "If only about one hour of data loss is acceptable, the backup interval must be short enough to meet that RPO.",
  },
  day: {
    result: "Suggested frequency: daily backups, with clear timing.",
    reason: "Daily backup may be acceptable if losing work since the last backup would not exceed the business tolerance.",
  },
  week: {
    result: "Suggested frequency: weekly full backup may be enough for low-change data.",
    reason: "This is suitable only when the data changes slowly or can be recreated without major impact.",
  },
  none: {
    result: "Suggested approach: replication/high availability plus tested backups.",
    reason: "If meaningful data loss is not acceptable, ordinary periodic backups alone are not enough.",
  },
};

const examples = {
  ransomware: {
    title: "Example 1: Ransomware and isolated backups",
    problem: "A shared drive and connected USB backup are both encrypted by ransomware.",
    steps: [
      "The backup was reachable by the same attack as the live data.",
      "A better strategy includes offline, offsite or immutable backups.",
      "Recent versions should be retained so clean data can be restored.",
      "Restores must be tested so the organisation knows the backup is usable.",
    ],
  },
  hospital: {
    title: "Example 2: Hospital disaster recovery",
    problem: "A hospital patient system becomes unavailable after a server failure.",
    steps: [
      "The disaster recovery plan should identify critical systems and responsibilities.",
      "Recent backups or replication reduce possible patient data loss.",
      "A standby server or cloud recovery can reduce downtime.",
      "After restoration, staff must check that records are complete and accessible.",
    ],
  },
  audit: {
    title: "Example 3: Audit trail investigation",
    problem: "A customer record was deleted and the company needs to know what happened.",
    steps: [
      "An audit trail can show the user account that deleted the record.",
      "It can include timestamp, device/IP address and action performed.",
      "This supports accountability and incident investigation.",
      "The audit trail does not restore the record; a backup may be needed for recovery.",
    ],
  },
  testing: {
    title: "Example 4: Testing backup restores",
    problem: "A school has nightly backups but has never restored from them.",
    steps: [
      "A backup strategy is incomplete unless restore testing is performed.",
      "A test restore checks that backup files are not corrupted or missing.",
      "Testing also reveals how long recovery takes.",
      "Results can be used to improve the disaster recovery plan.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is a separate copy of data used for recovery called?", accepted: ["backup", "back up"], answer: "Backup" },
  { id: "p2", prompt: "Which backup type copies all selected data?", accepted: ["full backup", "full"], answer: "Full backup" },
  { id: "p3", prompt: "Which backup type copies only data changed since the last backup?", accepted: ["incremental backup", "incremental"], answer: "Incremental backup" },
  { id: "p4", prompt: "Where should a copy be stored to reduce risk from fire or theft at the main site?", accepted: ["offsite", "off-site", "cloud", "remote location"], answer: "Offsite / cloud / remote location" },
  { id: "p5", prompt: "What plan describes how systems and services are restored after a major incident?", accepted: ["disaster recovery plan", "disaster recovery", "dr plan"], answer: "Disaster recovery plan" },
  { id: "p6", prompt: "What record shows who performed an action and when?", accepted: ["audit trail", "audit log", "log"], answer: "Audit trail / audit log" },
  { id: "p7", prompt: "What does RPO describe: acceptable data loss or restore time?", accepted: ["acceptable data loss", "data loss"], answer: "Acceptable data loss" },
  { id: "p8", prompt: "What does RTO describe: acceptable data loss or restore time?", accepted: ["restore time", "recovery time", "time to restore"], answer: "Restore/recovery time" },
  { id: "p9", prompt: "Does an audit trail restore deleted files by itself? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Name one reason backups should be tested.", accepted: ["corrupt", "corrupted", "usable", "restore works", "missing files", "recovery time", "verify"], answer: "To check backups are usable, not corrupted/missing, and that recovery time is acceptable" },
];

const mistakes = [
  {
    wrong: "A backup is useful even if it has never been restored.",
    fix: "A backup must be tested by restoring data. Otherwise the organisation may not know whether the backup is complete, uncorrupted or usable.",
  },
  {
    wrong: "An audit trail can recover deleted files.",
    fix: "An audit trail records actions and supports investigation. A backup is needed to restore the deleted data.",
  },
  {
    wrong: "Keeping a backup on the same server is enough.",
    fix: "A same-server copy can be lost in the same hardware failure, theft, fire or ransomware attack. At least one copy should be isolated or offsite.",
  },
  {
    wrong: "Incremental backup is always better than full backup.",
    fix: "Incremental backup is faster and smaller, but restore can be more complex because a full backup and later increments may be needed.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Describe two factors that should be considered when designing a backup strategy for a school database.",
    answer: "The backup frequency should match how often the data changes and how much data loss is acceptable. If the database is updated throughout the day, frequent backups reduce possible loss. The backup location should include an offsite or isolated copy so fire, theft or ransomware at the main site does not destroy every copy. The strategy should also include retention and testing restores.",
    marking: [
      { mark: "B1", text: "frequency considered" },
      { mark: "B1", text: "frequency linked to data changes or acceptable data loss/RPO" },
      { mark: "B1", text: "location/offsite/isolated backup considered" },
      { mark: "B1", text: "location linked to site disaster/ransomware/theft/hardware failure" },
    ],
    strict: [
      "Do not accept only 'make backups regularly' without scenario reason.",
      "Do not award offsite mark for a copy on the same server.",
      "Allow cloud storage if offsite/remote idea is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Compare full and incremental backups.",
    answer: "A full backup copies all selected data, so it usually takes more time and storage, but restoration is simpler because the full copy contains the complete dataset. An incremental backup copies only data changed since the previous backup, so it is faster and uses less storage. However, restoring may require the last full backup plus each later incremental backup, making recovery more complex if one part is missing or corrupted.",
    marking: [
      { mark: "B1", text: "full backup copies all selected data" },
      { mark: "B1", text: "full backup uses more time/storage or simpler restore" },
      { mark: "B1", text: "incremental backup copies changes since previous backup" },
      { mark: "B1", text: "incremental uses less time/storage" },
      { mark: "B1", text: "incremental restore complexity/needs chain/part missing risk" },
    ],
    strict: [
      "Do not accept incremental as copying all data.",
      "Do not award comparison marks for vague 'better' or 'faster' without which method.",
      "Allow changed since last backup for incremental.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain why a disaster recovery plan is needed after a major server failure.",
    answer: "A disaster recovery plan sets out the actions needed to restore systems and services after a major incident. It identifies critical systems, people responsible, communication steps and the order of recovery. It should include restoring data from backups and checking that restored data is complete and usable. It reduces downtime and supports availability because staff do not have to invent a response during the incident.",
    marking: [
      { mark: "B1", text: "DR plan restores systems/services after major incident" },
      { mark: "B1", text: "critical systems or recovery order identified" },
      { mark: "B1", text: "roles/responsibilities or communication described" },
      { mark: "B1", text: "restore from backup described" },
      { mark: "B1", text: "testing/checking restored data/system described" },
      { mark: "B1", text: "consequence linked to reduced downtime/availability/organised response" },
    ],
    strict: [
      "Do not accept only 'use a backup' as a complete disaster recovery plan.",
      "Do not award communication mark for vague 'tell people' without role/user/staff context.",
      "Allow alternative valid DR actions such as standby hardware or alternative site.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Describe what an audit trail may record and how it can be used after unauthorised changes to data.",
    answer: "An audit trail may record the user account, action performed, timestamp, device or IP address, and the data record affected. After unauthorised changes, it can show who changed the data and when the change occurred. This helps investigate the incident, identify whether an account was misused and provide evidence for accountability. It does not restore the original data by itself, so a backup may also be needed.",
    marking: [
      { mark: "B1", text: "valid recorded item such as user/account/action/timestamp/device/IP/record" },
      { mark: "B1", text: "second distinct recorded item" },
      { mark: "B1", text: "used to identify who/when/what changed" },
      { mark: "B1", text: "used for investigation/accountability/evidence/misuse detection" },
    ],
    strict: [
      "Do not accept audit trail as a copy of all files.",
      "Do not award both recorded-item marks for two wordings of time only.",
      "Allow audit log as audit trail.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A company is attacked by ransomware. Recommend backup and recovery measures.",
    answer: "The company should keep isolated or offsite backups so ransomware cannot encrypt every backup copy. Backups should be frequent enough to meet the acceptable data loss, and several versions should be retained so the company can restore a clean copy from before the infection. The restore process should be tested. The disaster recovery plan should isolate infected systems, restore data to clean systems, verify the restored data and communicate with users.",
    marking: [
      { mark: "B1", text: "isolated/offline/offsite backup recommended" },
      { mark: "B1", text: "reason linked to ransomware not reaching/encrypting all copies" },
      { mark: "B1", text: "frequency or RPO linked to acceptable data loss" },
      { mark: "B1", text: "retention/versioning to restore clean pre-infection copy" },
      { mark: "B1", text: "restore testing/verify restored data described" },
      { mark: "B1", text: "DR response action such as isolate infected systems/clean restore/communication" },
    ],
    strict: [
      "Do not accept paying the ransom as a recovery strategy.",
      "Do not award isolation mark for permanently connected backup drive.",
      "Allow immutable backup if isolation from ransomware is clear.",
      "Award each measure independently.",
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
    offsite: "Correct. A backup reachable by the same ransomware is not sufficiently isolated.",
    audit: "No. Audit trails help investigation, but they do not restore encrypted files.",
    validation: "No. Validation checks input rules; it does not protect backup copies from ransomware.",
    frequency: "No. Frequency matters, but connection and isolation matter in this scenario.",
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

function setupRpoTool() {
  const select = document.querySelector("#rpoInput");
  const result = document.querySelector("#rpoResult");
  const reason = document.querySelector("#rpoReason");
  function suggest() {
    const item = rpoMap[select.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Reasoning:</strong> ${item.reason}`;
  }
  select.addEventListener("change", suggest);
  document.querySelector("#rpoBtn").addEventListener("click", suggest);
  suggest();
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
  renderExample("ransomware");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input type="text" aria-label="Answer for ${item.id}" data-practice="${item.id}" />
        <span class="mark" id="${item.id}Mark">Not checked</span>
      </div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-practice]").forEach((input) => {
    input.addEventListener("input", () => {
      const item = practice.find((entry) => entry.id === input.dataset.practice);
      const mark = document.querySelector(`#${item.id}Mark`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      if (!value) {
        mark.textContent = "Not checked";
        mark.className = "mark";
        return;
      }
      mark.textContent = correct ? "Correct" : "Try again";
      mark.className = correct ? "mark correct" : "mark incorrect";
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
      <p class="wrong"><strong>Wrong:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
    </article>
  `).join("");
  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${item.title}</h3>
        <span>${item.marks}</span>
      </div>
      <p>${item.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <h4>CIE-style mark scheme</h4>
        <p><strong>Model answer:</strong> ${item.answer}</p>
        <ul>${item.marking.map((mark) => `<li><strong>${mark.mark}</strong> ${mark.text}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${item.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSimulator();
setupRpoTool();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
