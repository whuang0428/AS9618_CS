const tasks = {
  web: {
    result: "HTTP",
    method: "HTTP is used for transferring ordinary web pages and web resources between browser and web server.",
  },
  secure: {
    result: "HTTPS",
    method: "HTTPS is the secure version of HTTP and encrypts web communication, useful for login details, payments and forms.",
  },
  file: {
    result: "FTP",
    method: "FTP is used to transfer files between a client and a server, such as uploads or downloads from a file server.",
  },
  sendmail: {
    result: "SMTP",
    method: "SMTP is used to send email from a client to a mail server and between mail servers.",
  },
  downloadmail: {
    result: "POP3",
    method: "POP3 is used to download email from a mail server to a client, often for local storage on one device.",
  },
  syncmail: {
    result: "IMAP",
    method: "IMAP is used to access and synchronise mailbox contents stored on a mail server across multiple devices.",
  },
};

const examples = {
  web: {
    title: "Example 1: secure web form",
    problem: "A user enters payment details on a shopping website.",
    steps: [
      "The task involves web communication between browser and server.",
      "The data is sensitive, so encryption is needed.",
      "HTTPS is suitable because it provides secure encrypted web communication.",
      "Do not say HTTPS is chosen because it is simply 'faster'.",
    ],
  },
  email: {
    title: "Example 2: email journey",
    problem: "A user sends an email, then reads it on a laptop and phone.",
    steps: [
      "SMTP is used to send the email to a mail server.",
      "SMTP may also be used between mail servers.",
      "IMAP is suitable for reading the mailbox on multiple devices.",
      "IMAP keeps messages and folders on the server so devices can stay synchronised.",
    ],
  },
  files: {
    title: "Example 3: file transfer",
    problem: "A student uploads a website project to a school file server.",
    steps: [
      "The task is transferring files between client and server.",
      "FTP is the relevant file transfer protocol.",
      "HTTP/HTTPS are for web page/resource transfer, not the best generic answer for this scenario.",
      "A strong answer states both the protocol and the context.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which protocol is used to transfer ordinary web pages?", accepted: ["http"], answer: "HTTP" },
  { id: "p2", prompt: "Which protocol is used for secure encrypted web communication?", accepted: ["https"], answer: "HTTPS" },
  { id: "p3", prompt: "Which protocol is used to transfer files between client and server?", accepted: ["ftp"], answer: "FTP" },
  { id: "p4", prompt: "Which protocol is used to send email?", accepted: ["smtp"], answer: "SMTP" },
  { id: "p5", prompt: "Which protocol downloads email from a mail server to a client?", accepted: ["pop3", "pop"], answer: "POP3" },
  { id: "p6", prompt: "Which protocol keeps email synchronised across multiple devices?", accepted: ["imap"], answer: "IMAP" },
  { id: "p7", prompt: "For online banking login, HTTP or HTTPS?", accepted: ["https"], answer: "HTTPS" },
  { id: "p8", prompt: "For uploading website files to a server, which protocol is most relevant here?", accepted: ["ftp"], answer: "FTP" },
  { id: "p9", prompt: "Does SMTP retrieve email from the server? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "What does the S in HTTPS indicate in exam context?", accepted: ["secure", "security"], answer: "Secure" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A user logs in to an online banking website. Explain why HTTPS is more suitable than HTTP.",
    answer: "Both HTTP and HTTPS can be used for web communication, but HTTPS provides a secure encrypted connection. This helps protect sensitive data such as usernames, passwords and banking details while it is transmitted between the browser and web server.",
    marking: [
      { mark: "B1", text: "HTTP/HTTPS are used for web communication / web pages" },
      { mark: "B1", text: "HTTPS is secure / encrypted compared with HTTP" },
      { mark: "B1", text: "protects sensitive data in transit" },
      { mark: "B1", text: "links to banking/login details scenario" },
    ],
    strict: [
      "Do not accept only 'HTTPS is safer' without encryption/security detail.",
      "Do not accept 'HTTPS is faster'.",
      "Do not require detailed TLS/SSL explanation at this level.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Match FTP, SMTP, POP3 and IMAP to their email/file-transfer contexts, then distinguish sending email from receiving or accessing email.",
    answer: "FTP is used for file transfer between a client and server. SMTP is used to send email. POP3 is used to download email from a mail server to a client. IMAP is used to access and synchronise email stored on a mail server across multiple devices.",
    marking: [
      { mark: "B1", text: "FTP matched to file transfer" },
      { mark: "B1", text: "SMTP matched to sending email" },
      { mark: "B1", text: "POP3 matched to downloading/retrieving email to client" },
      { mark: "B1", text: "IMAP matched to accessing/synchronising server mailbox" },
      { mark: "B1", text: "clear distinction between sending email and receiving/accessing email" },
    ],
    strict: [
      "Do not award SMTP for receiving email.",
      "Do not award FTP for general web browsing.",
      "Expansion of acronyms alone is insufficient without use/context.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why IMAP may be preferred to POP3 for a user who reads email on a phone, tablet and laptop.",
    answer: "IMAP stores and manages the mailbox on the mail server, so messages and folders can be synchronised across devices. If the user reads, deletes or moves a message on one device, the change can be reflected on the others. POP3 typically downloads messages to a client and is less suitable for keeping multiple devices synchronised.",
    marking: [
      { mark: "B1", text: "IMAP keeps/accesses mail on the server" },
      { mark: "B1", text: "messages/folders can be synchronised across devices" },
      { mark: "B1", text: "changes on one device can appear on other devices" },
      { mark: "B1", text: "POP3 downloads messages to client / less suitable for synchronisation" },
    ],
    strict: [
      "Do not accept only 'IMAP is newer/better'.",
      "Do not say POP3 sends email.",
      "Allow POP3 server-retention settings only if the synchronisation limitation is still explained.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A student uploads a folder of website files to a school server. Identify a suitable protocol and justify the choice.",
    answer: "FTP is suitable because it is used to transfer files between a client and a server. The student's computer acts as the client and uploads website files to the school server.",
    marking: [
      { mark: "B1", text: "identifies FTP" },
      { mark: "B1", text: "FTP used for file transfer" },
      { mark: "B1", text: "mentions client-server transfer/upload" },
      { mark: "B1", text: "links to website files/school server scenario" },
    ],
    strict: [
      "Do not accept HTTP/HTTPS unless framed as web resource request rather than file upload.",
      "Do not award only for expanding FTP.",
      "Allow secure variants only if FTP/file transfer role is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Describe the roles of SMTP, POP3 and IMAP when a user sends email and accesses email from a mail server.",
    answer: "SMTP is used to send the email from the user's email client to a mail server and may be used between mail servers. To retrieve/access email, the client may use POP3 to download messages to the device or IMAP to access and synchronise messages stored on the server.",
    marking: [
      { mark: "B1", text: "SMTP used to send email from client to mail server" },
      { mark: "B1", text: "SMTP may be used between mail servers" },
      { mark: "B1", text: "POP3 used to download/retrieve email to client" },
      { mark: "B1", text: "IMAP used to access/synchronise email on server" },
      { mark: "B1", text: "clear separation between sending and retrieving/accessing mail" },
    ],
    strict: [
      "Do not award POP3/IMAP for sending email.",
      "Do not award SMTP for reading/downloading email.",
      "Do not require both POP3 and IMAP in a real system, but both must be described if asked.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = button.dataset.hook === "smtpimap"
        ? "Correct. SMTP sends email; IMAP is suitable for synchronised mailbox access across devices."
        : "Not quite. Separate the email sending protocol from the mailbox access protocol.";
    });
  });
}

function setupProtocolTool() {
  const select = document.querySelector("#taskInput");
  const result = document.querySelector("#protocolResult");
  const method = document.querySelector("#protocolMethod");
  function choose() {
    const item = tasks[select.value];
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
  renderExample("web");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Match protocol names to jobs, not just acronyms.`;
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
  setupProtocolTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
