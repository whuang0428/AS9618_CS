const scenarioMap = {
  publicRepo: {
    result: "Issue: public access is not the same as permission.",
    reason: "If no licence is visible, users should not assume they may copy, modify or redistribute the code. The owner may still hold copyright.",
    trap: "Do not say 'public repository means public domain' unless the work is explicitly released that way.",
  },
  stockPhoto: {
    result: "Issue: licence condition limits use.",
    reason: "Personal use only means commercial use is not permitted unless a different licence or permission is obtained.",
    trap: "Attribution alone does not override a non-commercial restriction.",
  },
  companyApp: {
    result: "Issue: ownership may belong to the employer.",
    reason: "Code written as part of paid employment may be owned by the company, depending on contract and law.",
    trap: "Do not assume the programmer personally owns all code they write at work.",
  },
  patentMethod: {
    result: "Issue: possible patent protection for an invention.",
    reason: "A new technical method may be patentable if it meets requirements such as novelty and inventive step.",
    trap: "Do not say every algorithm or software idea automatically receives a patent.",
  },
  library: {
    result: "Issue: licence compliance and attribution.",
    reason: "Open-source libraries can usually be used under conditions. If attribution is required, the developer must include it.",
    trap: "Open source does not mean no rules.",
  },
};

const useMap = {
  copyVariables: {
    result: "Not sound: likely infringement or plagiarism.",
    reason: "Changing variable names does not necessarily create original work. The copied structure, logic or expression may still be protected.",
  },
  readLicence: {
    result: "Sound if the licence conditions are actually followed.",
    reason: "A licence grants permission under stated conditions, such as attribution, source disclosure or limits on redistribution.",
  },
  buyOwnership: {
    result: "Not sound: a licence to use is not usually ownership of source code.",
    reason: "Buying software commonly grants permission to use it under terms; the copyright owner normally keeps ownership of the code.",
  },
  creditOnly: {
    result: "Not sound: attribution does not remove a non-commercial restriction.",
    reason: "If the licence blocks commercial use, giving credit is not enough unless separate permission is obtained.",
  },
};

const examples = {
  repo: {
    title: "Example 1: Public repository with no licence",
    problem: "A developer copies code from a public repository into a commercial product.",
    steps: [
      "The code being public does not automatically grant permission to reuse it.",
      "Copyright may still belong to the creator or organisation.",
      "The developer should check for a licence and follow its conditions.",
      "If no permission exists, using it may infringe copyright or create legal risk for the product.",
    ],
  },
  employee: {
    title: "Example 2: Employee code",
    problem: "A programmer writes code for an employer during paid work and later wants to sell the same code.",
    steps: [
      "Ownership may belong to the employer if the code was produced as part of the job.",
      "The employment contract may define who owns the intellectual property.",
      "Selling the same code elsewhere could breach contract or copyright.",
      "A good answer mentions ownership, permission and possible consequences.",
    ],
  },
  patent: {
    title: "Example 3: Patent protection",
    problem: "A startup develops a new technical process for compressing sensor data.",
    steps: [
      "If the method is new and inventive, the company may seek patent protection.",
      "A patent can prevent others from using the invention without permission for a limited time.",
      "The invention must normally be disclosed in the patent application.",
      "Not every software feature or ordinary idea is automatically patentable.",
    ],
  },
  licence: {
    title: "Example 4: Licence breach",
    problem: "A team uses a library that requires attribution, but removes all licence notices.",
    steps: [
      "The library may be open source, but licence conditions still apply.",
      "If attribution is required, removing notices breaches the licence.",
      "Consequences may include loss of permission to use the library or legal/reputational risk.",
      "The fix is to follow licence terms, include notices and document third-party components.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What term means creations of the mind that may be legally protected?", accepted: ["intellectual property", "ip"], answer: "Intellectual property / IP" },
  { id: "p2", prompt: "Which protection usually covers original source code expression?", accepted: ["copyright"], answer: "Copyright" },
  { id: "p3", prompt: "Which protection can cover a new technical invention for a limited time?", accepted: ["patent", "patents"], answer: "Patent" },
  { id: "p4", prompt: "What document or agreement grants permission to use software under conditions?", accepted: ["licence", "license"], answer: "Licence / license" },
  { id: "p5", prompt: "What term means using protected work without permission or outside conditions?", accepted: ["infringement", "copyright infringement", "licence breach", "license breach"], answer: "Infringement / licence breach" },
  { id: "p6", prompt: "What word means giving credit to the creator or source?", accepted: ["attribution", "credit", "citation"], answer: "Attribution / credit" },
  { id: "p7", prompt: "Does buying a software licence normally mean owning its source code? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p8", prompt: "Does public access automatically mean public domain? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "Name one restricted act under copyright.", accepted: ["copying", "distributing", "distribution", "adapting", "modifying", "redistributing", "selling"], answer: "Copying / distributing / adapting / modifying" },
  { id: "p10", prompt: "Name one possible consequence of licence breach.", accepted: ["legal action", "lawsuit", "damages", "loss of permission", "reputation", "reputational damage", "remove product"], answer: "Legal action / damages / loss of permission / reputational damage" },
];

const mistakes = [
  {
    wrong: "The code is public, so it has no owner.",
    fix: "Public access does not remove ownership. Copyright may still belong to the creator, and reuse depends on the licence or permission.",
  },
  {
    wrong: "Changing variable names makes copied code legal.",
    fix: "Changing names may not change the protected expression or structure enough. It can still infringe copyright or count as plagiarism.",
  },
  {
    wrong: "Open source means no copyright.",
    fix: "Open-source software is still copyrighted. The licence grants permissions under conditions such as attribution or sharing modifications.",
  },
  {
    wrong: "A patent protects any idea someone has.",
    fix: "A patent protects an invention that meets legal requirements, often including novelty and inventive step. Ordinary ideas are not automatically patented.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A company copies code from a public online repository into a commercial product. Discuss intellectual property issues that may arise.",
    answer: "The code may be protected by copyright even though it is publicly visible. The company should check whether the owner has provided a licence and whether commercial use, modification or redistribution is allowed. If no permission exists or licence terms are breached, the company may infringe copyright. This could lead to legal action, loss of permission to use the code, removal of the product or reputational damage. If the licence requires attribution, notices should be included.",
    marking: [
      { mark: "B1", text: "copyright/intellectual property protection of code identified" },
      { mark: "B1", text: "public access is not the same as permission" },
      { mark: "B1", text: "licence/permission should be checked" },
      { mark: "B1", text: "licence condition such as commercial use/modification/redistribution/attribution explained" },
      { mark: "B1", text: "infringement/licence breach identified" },
      { mark: "B1", text: "consequence such as legal action/damages/removal/reputation linked to scenario" },
    ],
    strict: [
      "Do not accept 'online means free to use'.",
      "Do not award licence-condition mark for only saying 'read the rules' without a condition.",
      "Allow license spelling.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain the difference between copyright and a patent in the context of Computer Science.",
    answer: "Copyright protects original expression, such as source code, documentation or graphics. It restricts acts such as copying, distributing or adapting the work without permission. A patent protects an invention or technical process for a limited time if requirements such as novelty are met. In Computer Science, a patent might relate to a new technical method, but not every algorithm or piece of code is automatically patentable.",
    marking: [
      { mark: "B1", text: "copyright protects original expression/source code/media" },
      { mark: "B1", text: "copyright restricts copying/distribution/adaptation without permission" },
      { mark: "B1", text: "patent protects invention/technical process" },
      { mark: "B1", text: "patent is limited time and/or requires novelty/inventive step" },
      { mark: "B1", text: "Computer Science context or limitation, such as not every code idea is patentable" },
    ],
    strict: [
      "Do not accept copyright as protecting an invention.",
      "Do not accept patent as automatic for any code.",
      "Allow examples of software-related inventions if the technical invention idea is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A student downloads a paid application. Explain why this does not usually mean the student owns the software's intellectual property.",
    answer: "Downloading or paying for an application usually gives the student a licence to use the software under terms. The copyright owner or software company normally keeps ownership of the source code and other intellectual property. The licence may restrict copying, modifying, reverse engineering or redistributing the application. If the student shares copies or claims the code as their own, this may breach the licence or infringe copyright.",
    marking: [
      { mark: "B1", text: "licence to use software identified" },
      { mark: "B1", text: "licence does not normally transfer ownership/source code rights" },
      { mark: "B1", text: "copyright/IP owner retains rights" },
      { mark: "B1", text: "restriction such as copying/modifying/redistributing/reverse engineering" },
      { mark: "B1", text: "consequence such as breach/infringement if restrictions are ignored" },
    ],
    strict: [
      "Do not accept 'paid means owned' as correct.",
      "Do not award restriction mark for vague 'cannot do bad things'.",
      "Allow EULA/terms as licence.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Describe ethical and legal reasons for respecting software licences.",
    answer: "Software licences state what users are allowed to do with the software, such as use, copy, modify or distribute it. Respecting licences recognises the rights of creators and organisations that invested time and money in development. It can protect revenue and encourage further innovation. Legally, breaching a licence may lead to loss of permission, legal action or damages. Ethically, following terms and giving attribution when required is fair to creators and users.",
    marking: [
      { mark: "B1", text: "licence defines permitted use/copying/modification/distribution" },
      { mark: "B1", text: "creator/owner rights recognised" },
      { mark: "B1", text: "investment/revenue/innovation consequence explained" },
      { mark: "B1", text: "legal consequence such as action/damages/loss of permission" },
      { mark: "B1", text: "ethical point such as fairness/attribution/respect for work" },
    ],
    strict: [
      "Do not award separate marks for repeating 'it is illegal' only.",
      "Do not accept vague 'respect' without linking to creators or conditions.",
      "Allow attribution as an ethical or licence compliance point.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A developer uses a third-party library that requires attribution. The final product removes all licence notices. Explain the issue and possible consequences.",
    answer: "The library may be used only under the conditions of its licence. If attribution or licence notices are required, removing them breaches the licence. The original library remains intellectual property owned by its creators or rights holders. The developer or company may lose permission to use the library, need to add notices or replace the library, and may face legal or reputational consequences. The correct action is to follow the licence terms and document third-party components.",
    marking: [
      { mark: "B1", text: "third-party library/licence condition identified" },
      { mark: "B1", text: "attribution/licence notice requirement explained" },
      { mark: "B1", text: "breach of licence or infringement identified" },
      { mark: "B1", text: "ownership/IP of original creators recognised" },
      { mark: "B1", text: "consequence such as loss of permission/legal action/replacement/reputational damage" },
      { mark: "B1", text: "remedy such as include attribution/notices or document components" },
    ],
    strict: [
      "Do not accept 'open source means no attribution needed'.",
      "Do not award breach mark if answer only says 'it is rude'.",
      "Allow copyright infringement if linked to licence breach.",
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
    licence: "Correct. Public visibility does not decide permission; the licence and assessment rules matter.",
    public: "No. Public repositories can still have owners and copyright protection.",
    rename: "No. Changing variable names does not automatically create original work.",
    private: "No. Public and private repositories can both have licences or copyright restrictions.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupMatcher() {
  const scenario = document.querySelector("#scenarioInput");
  const result = document.querySelector("#matchResult");
  const reason = document.querySelector("#matchReason");
  const trap = document.querySelector("#matchTrap");
  function match() {
    const item = scenarioMap[scenario.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Reasoning:</strong> ${item.reason}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  scenario.addEventListener("change", match);
  document.querySelector("#matchBtn").addEventListener("click", match);
  match();
}

function setupUseChecker() {
  const select = document.querySelector("#useInput");
  const result = document.querySelector("#useResult");
  const reason = document.querySelector("#useReason");
  function judge() {
    const item = useMap[select.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Why:</strong> ${item.reason}`;
  }
  select.addEventListener("change", judge);
  document.querySelector("#useBtn").addEventListener("click", judge);
  judge();
}

function renderExample(key) {
  const example = examples[key];
  const box = document.querySelector("#exampleBox");
  box.innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>${example.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("repo");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input type="text" id="${item.id}" autocomplete="off" placeholder="Type your answer" aria-label="${item.prompt}" />
        <span class="mark" id="${item.id}-mark">Not checked</span>
      </div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}-answer"><strong>Answer:</strong> ${item.answer}</div>
    </article>
  `).join("");

  practice.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    const mark = document.querySelector(`#${item.id}-mark`);
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value === normalise(answer) || value.includes(normalise(answer)));
      if (!value) {
        mark.textContent = "Not checked";
        mark.className = "mark";
      } else if (correct) {
        mark.textContent = "Correct";
        mark.className = "mark correct";
      } else {
        mark.textContent = "Try again";
        mark.className = "mark incorrect";
      }
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Weak answer:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-correction="${index}">Show correction</button>
      <div class="answer-panel" id="correction-${index}"><strong>Correction:</strong> ${item.fix}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-correction]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#correction-${button.dataset.correction}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${item.title}</h3>
        <span>${item.marks}</span>
      </div>
      <p>${item.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <h4>CIE-style mark scheme</h4>
        <p><strong>Indicative answer:</strong> ${item.answer}</p>
        <ul>${item.marking.map((mark) => `<li><strong>${mark.mark}</strong> ${mark.text}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${item.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupMatcher();
  setupUseChecker();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExam();
}

init();
