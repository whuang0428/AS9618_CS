
function renderStudentMarkPoints(question) {
  const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const guidance = (question.strict || []).join(" ");
  return `<div class="mark-scheme-table" role="table" aria-label="Mark scheme"><div class="mark-scheme-row mark-scheme-head" role="row"><strong role="columnheader">Answer</strong><strong role="columnheader">Guidance</strong><strong role="columnheader">Marks</strong></div>${question.marking.map((point, pointIndex) => `<div class="mark-scheme-row" role="row"><span role="cell">${escape(point.text)}</span><span role="cell">${pointIndex === 0 ? escape(guidance) : ""}</span><strong role="cell">1</strong></div>`).join("")}</div>`;
}
const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Describe how a vector graphic is encoded.",
    answer: "It is stored as a drawing list of drawing objects. Each object stores properties and software redraws the objects from those instructions.",
    marking: [
      { mark: "B1", text: "drawing list / list of objects" },
      { mark: "B1", text: "object properties such as coordinates, dimensions or colour" },
      { mark: "B1", text: "software redraws objects from the descriptions" },
    ],
    strict: [
      "Do not accept pixels as the primary vector representation.",
    ],
  },
  {
    title: "Question 2",
    marks: "2 marks",
    prompt: "State two properties that may be stored for a vector drawing object.",
    answer: "Any two of coordinates, dimensions, line colour, fill colour and line thickness.",
    marking: [
      { mark: "B1", text: "first valid property" },
      { mark: "B1", text: "second valid property" },
    ],
    strict: [
      "Do not award the object type itself as both properties.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "Explain why vector storage is suitable for a company logo used on a pen and a billboard.",
    answer: "A logo consists of geometric shapes. Vector objects can be scaled and redrawn at either size without pixelation.",
    marking: [
      { mark: "B1", text: "logo contains shapes / geometric objects" },
      { mark: "B1", text: "objects can be scaled or dimensions changed" },
      { mark: "B1", text: "redrawn without pixelation" },
    ],
    strict: [
      "The reason must be linked to the stated logo and scaling context.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "Explain why bitmap storage is normally more suitable than vector storage for a detailed photograph.",
    answer: "A photograph contains complex colour and texture at individual positions. A bitmap stores those pixel values directly; describing every detail as drawing objects would be inefficient.",
    marking: [
      { mark: "B1", text: "photograph has complex colour / texture" },
      { mark: "B1", text: "bitmap stores individual pixel values" },
      { mark: "B1", text: "drawing-object description would be inefficient or unsuitable" },
    ],
    strict: [
      "Do not accept only 'bitmap has better quality'.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A designer creates an icon from circles and rectangles. Explain how it is stored as a vector graphic and give one advantage when resized.",
    answer: "The file stores a drawing list containing circle and rectangle objects. Properties include coordinates, dimensions and colours. Software redraws the objects, so changing the geometry allows resizing without pixelation.",
    marking: [
      { mark: "B1", text: "drawing list / circle and rectangle objects" },
      { mark: "B1", text: "stores object properties" },
      { mark: "B1", text: "software redraws from descriptions" },
      { mark: "B1", text: "resizes without pixelation" },
    ],
    strict: [
      "Do not award a generic quality claim without object-based storage or scalability.",
    ],
  },
];
const escapeHtml=(value)=>String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
function markTable(question){return '<div class="mark-scheme-table" role="table" aria-label="Mark scheme"><div class="mark-scheme-row mark-scheme-head" role="row"><strong role="columnheader">Answer</strong><strong role="columnheader">Guidance</strong><strong role="columnheader">Marks</strong></div>'+question.marking.map((point,index)=>'<div class="mark-scheme-row" role="row"><span role="cell">'+escapeHtml(point.text)+'</span><span role="cell">'+(index===0?escapeHtml(question.strict.join(" ")):"")+'</span><strong role="cell">1</strong></div>').join("")+'</div>'}
document.querySelector("#examList").innerHTML=examQuestions.map((question,index)=>'<article class="exam-card"><div class="exam-head"><h3>'+escapeHtml(question.title)+'</h3><span>'+escapeHtml(question.marks)+'</span></div><p>'+escapeHtml(question.prompt)+'</p><details><summary>Show answer and MS</summary><p>'+escapeHtml(question.answer)+'</p>'+markTable(question)+'</details></article>').join("");
const shapes={circle:"OBJECT circle\ncentre = (105, 105)\nradius = 46\nfill = red\noutline = dark red",rectangle:"OBJECT rectangle\ntop-left = (190, 62)\nwidth = 105; height = 86\nfill = blue\noutline = navy"};
document.querySelectorAll("[data-shape]").forEach((button)=>button.addEventListener("click",()=>{document.querySelectorAll("[data-shape]").forEach((item)=>item.classList.remove("active"));button.classList.add("active");document.querySelector("#drawingList").textContent=shapes[button.dataset.shape]}));
document.querySelector('[data-shape="circle"]').classList.add("active");
document.querySelector("#printBtn").addEventListener("click",()=>window.print());
