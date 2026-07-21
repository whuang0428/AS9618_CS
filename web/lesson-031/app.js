const scenarios = {
  laptop: {
    result: "Solid-state drive (SSD)",
    method: "An SSD is fast and has no moving parts, so it is suitable for quick startup and a portable laptop that may be knocked.",
  },
  backup: {
    result: "Magnetic tape",
    method: "Magnetic tape offers very high capacity and low cost for long-term sequential backup, though access is slower.",
  },
  archive: {
    result: "Optical disc or external archive storage",
    method: "Optical media can be useful for offline archive copies of finished data that is rarely changed, but capacity is lower than HDD/tape.",
  },
  desktop: {
    result: "Magnetic hard disk drive (HDD)",
    method: "An HDD gives high capacity at a low cost per GB, which suits large video files where top access speed is not the main requirement.",
  },
  camera: {
    result: "Solid-state memory card",
    method: "A memory card is small, removable and solid-state, making it suitable for portable cameras.",
  },
  software: {
    result: "Optical disc or read-only distribution medium",
    method: "Optical discs are cheap to duplicate and can distribute fixed content that users do not need to rewrite.",
  },
};

const examples = {
  laptop: {
    title: "Example 1: laptop storage",
    problem: "Recommend storage for a travelling student who needs fast startup and reliability when carrying the laptop.",
    steps: [
      "SSD is suitable because it has fast read/write access compared with an HDD.",
      "It has no moving parts, so it is more resistant to knocks while being carried.",
      "It is also quiet and uses relatively little power.",
      "Exam-ready answer: use an SSD because it is fast and durable for a portable laptop, although it may cost more per GB than an HDD.",
    ],
  },
  backup: {
    title: "Example 2: organisation backup",
    problem: "A company must keep very large backups for several years and access them only occasionally.",
    steps: [
      "Magnetic tape can be suitable because it has very high capacity.",
      "It is relatively low cost for storing large backup sets.",
      "Sequential access is slower, but this is acceptable when backups are rarely restored.",
      "Do not recommend RAM or cache; backups need non-volatile long-term storage.",
    ],
  },
  optical: {
    title: "Example 3: fixed content distribution",
    problem: "A small organisation distributes a fixed training video set that users do not need to edit.",
    steps: [
      "Optical discs can be cheap to produce and distribute.",
      "The data can be read many times and does not need frequent rewriting.",
      "They are portable and can be stored offline.",
      "However, capacity is limited and discs can be scratched, so the suitability depends on file size and handling.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which storage type uses magnetised areas, such as HDD or tape?", accepted: ["magnetic", "magnetic storage"], answer: "Magnetic storage" },
  { id: "p2", prompt: "Which storage type uses lasers to read discs?", accepted: ["optical", "optical storage"], answer: "Optical storage" },
  { id: "p3", prompt: "Which storage type has no moving parts and uses flash memory?", accepted: ["solid state", "solid-state", "solid state storage", "ssd", "flash"], answer: "Solid-state storage" },
  { id: "p4", prompt: "Is secondary storage volatile or non-volatile?", accepted: ["non volatile", "non-volatile", "nonvolatile"], answer: "Non-volatile" },
  { id: "p5", prompt: "Which medium is often suitable for huge low-cost sequential backups?", accepted: ["magnetic tape", "tape"], answer: "Magnetic tape" },
  { id: "p6", prompt: "Which is usually faster for a laptop OS drive: SSD or optical disc?", accepted: ["ssd"], answer: "SSD" },
  { id: "p7", prompt: "Name one example of optical storage.", accepted: ["cd", "dvd", "blu ray", "blu-ray", "bluray"], answer: "CD / DVD / Blu-ray" },
  { id: "p8", prompt: "Name one limitation of HDDs compared with SSDs.", accepted: ["slower", "moving parts", "less durable", "shock", "noise"], answer: "Slower / moving parts / less shock-resistant" },
  { id: "p9", prompt: "Name one advantage of HDDs compared with SSDs.", accepted: ["cheaper", "low cost", "higher capacity", "cost per gb", "capacity"], answer: "Lower cost per GB / high capacity" },
  { id: "p10", prompt: "Is cache a secondary storage medium? Answer yes or no.", accepted: ["no"], answer: "No" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Compare magnetic, optical and solid-state storage media.",
    answer: "Magnetic storage such as HDD or tape uses magnetised areas and can provide high capacity at low cost per GB, but HDDs have moving parts and tape has slow sequential access. Optical storage such as CD, DVD or Blu-ray is read using a laser and is cheap and portable for fixed content, but normally has lower capacity and slower access. Solid-state storage such as SSD or USB flash has no moving parts and is fast and durable, but often costs more per GB than HDD.",
    marking: [
      { mark: "B1", text: "magnetic example and valid characteristic" },
      { mark: "B1", text: "optical example and valid characteristic" },
      { mark: "B1", text: "solid-state example and valid characteristic" },
      { mark: "B1", text: "clear comparison of speed/capacity/cost/durability between at least two media" },
      { mark: "B1", text: "uses precise storage terminology rather than only product names" },
    ],
    strict: [
      "Do not award full credit for only listing HDD, DVD and SSD with no characteristics.",
      "Do not accept RAM/cache as secondary storage media.",
      "Allow flash memory, memory card or USB drive as solid-state examples.",
      "FT: award valid characteristic marks even if one example is weak, provided the medium is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A student carries a laptop to school every day. Explain why an SSD may be more suitable than an HDD.",
    answer: "An SSD has no moving parts, so it is more resistant to damage from knocks while the laptop is carried. It has faster access times than an HDD, so the laptop can start and load applications more quickly. It can also be quieter and use less power, which suits a portable device.",
    marking: [
      { mark: "B1", text: "SSD has no moving parts" },
      { mark: "B1", text: "linked to better durability/shock resistance in portable laptop" },
      { mark: "B1", text: "faster access/read-write/startup than HDD" },
      { mark: "B1", text: "links speed/power/noise advantage to laptop/student scenario" },
    ],
    strict: [
      "Do not accept only 'SSD is better' without reason.",
      "Do not require all advantages; any valid scenario-linked advantages may score.",
      "Allow note that SSD may cost more per GB as evaluation, but it is not required.",
      "FT: if candidate says flash storage, award where SSD role is clearly meant.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A company needs to keep very large backups that are rarely accessed. Explain why magnetic tape may be suitable.",
    answer: "Magnetic tape is suitable because it can store very large amounts of data at a relatively low cost. Backups are usually written and restored sequentially, so tape's slower sequential access may be acceptable. It is also suitable for long-term offline storage of backup copies.",
    marking: [
      { mark: "B1", text: "magnetic tape identified as secondary storage" },
      { mark: "B1", text: "high capacity / stores very large data sets" },
      { mark: "B1", text: "low cost per unit of storage / cost-effective backups" },
      { mark: "B1", text: "sequential/slower access acceptable because backups are rarely accessed" },
    ],
    strict: [
      "Do not accept tape as fastest access medium.",
      "Do not award backup marks for volatile storage such as RAM.",
      "Allow offline/archive security point if linked to backup scenario.",
      "FT: award capacity/cost marks for another magnetic medium only if the scenario reasoning is plausible.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain two limitations of optical storage compared with solid-state storage.",
    answer: "Optical storage normally has slower access speeds than solid-state storage because data is read from a spinning disc using a laser. Optical discs usually have lower capacity than modern SSDs or large flash drives. They can also be scratched or damaged, while solid-state storage has no exposed disc surface.",
    marking: [
      { mark: "B1", text: "optical is generally slower access than solid-state" },
      { mark: "B1", text: "explanation linked to laser/spinning disc/mechanical access" },
      { mark: "B1", text: "optical often has lower capacity than SSD/flash" },
      { mark: "B1", text: "damage/scratching limitation compared with solid-state durability" },
    ],
    strict: [
      "Do not accept two repeated points about speed as two separate limitations.",
      "Do not accept that optical discs are volatile.",
      "Allow limited rewrite capability if explained correctly for read-only/write-once discs.",
      "FT: award any two valid limitations with explanation where comparison is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A video editor needs storage for a large library of raw footage and a separate drive for active editing work. Recommend suitable storage for each and justify your choices.",
    answer: "A high-capacity HDD may be suitable for the raw footage library because it offers large capacity at lower cost per GB. An SSD is suitable for active editing work because it has faster access speeds, which helps load and write video files during editing. The answer depends on balancing capacity and cost for archive storage against speed for current work.",
    marking: [
      { mark: "B1", text: "suitable high-capacity storage for library, e.g. HDD" },
      { mark: "B1", text: "library justification linked to large capacity/low cost per GB" },
      { mark: "B1", text: "suitable fast storage for active editing, e.g. SSD" },
      { mark: "B1", text: "editing justification linked to faster read/write/access" },
      { mark: "B1", text: "clear trade-off between capacity/cost and speed in the scenario" },
    ],
    strict: [
      "Do not award full marks for recommending the same device twice without separate scenario reasons.",
      "Do not accept optical disc for active editing unless strongly justified for a special case.",
      "Allow external HDD/SSD if the characteristic and role are clear.",
      "FT: award trade-off marks for any coherent split between archive and active work.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-\s]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    hdd: "HDD: magnetic storage with high capacity and low cost per GB, useful for large file libraries.",
    ssd: "SSD: solid-state storage with no moving parts, fast access and better shock resistance for portable devices.",
    flash: "Flash drive: solid-state removable storage for moving files, but easy to lose and variable in quality.",
    disc: "Optical disc: laser-read removable media, useful for fixed content or archive copies, but slower and lower capacity.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupChoiceTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#componentResult");
  const method = document.querySelector("#componentMethod");
  function choose() {
    const item = scenarios[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", choose);
  document.querySelector("#chooseBtn").addEventListener("click", choose);
  choose();
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
  renderExample("laptop");
}

function setupAnswerToggles(scope = document) {
  scope.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible")
        ? button.textContent.replace("Show", "Hide")
        : button.textContent.replace("Hide", "Show");
    });
  });
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <div class="practice-item" id="${item.id}">
      <label>${index + 1}. ${item.prompt}</label>
      <div class="practice-row">
        <input type="text" aria-label="${item.prompt}" />
        <span class="mark" aria-live="polite"></span>
      </div>
      <button type="button" class="answer-toggle" data-answer="answer-${item.id}">Show answer</button>
      <div class="answer-panel" id="answer-${item.id}">${item.answer}</div>
    </div>
  `).join("");

  setupAnswerToggles(list);
}

function setupPractice() {
  document.querySelector("#checkPractice").addEventListener("click", () => {
    let correct = 0;
    practice.forEach((item) => {
      const container = document.querySelector(`#${item.id}`);
      const input = container.querySelector("input");
      const mark = container.querySelector(".mark");
      const response = normalise(input.value);
      const isCorrect = item.accepted.some((answer) => {
        const expected = normalise(answer);
        return response === expected || response.includes(expected);
      });
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For wrong answers, check medium, example device and scenario-linked characteristic.`;
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => {
    const msId = `ms-${index}`;
    return `
      <article class="exam-card">
        <div class="exam-head">
          <h3>${question.title}</h3>
          <span>${question.marks}</span>
        </div>
        <p>${question.prompt}</p>
        <button type="button" class="ms-toggle" data-ms="${msId}">Show MS</button>
        <div class="ms-panel" id="${msId}">
          <h4>CIE-style mark scheme</h4>
          <p><strong>Answer:</strong> ${question.answer}</p>
          <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
          <h4>Strict notes</h4>
          <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".ms-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.ms}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupChoiceTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
