// Authored vector figure: the diagram describes an invented teaching case.
export const section7AcademicScene = {
  asset: 'assets/course-v3/section-7/reading-assistant-responsibility-academic.svg',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="850" viewBox="0 0 1440 850" role="img" aria-labelledby="title desc">
  <title id="title">A reading assistant: who has the evidence?</title>
  <desc id="desc">An invented reading error: a printed instruction says Do not enter, but the assistant speaks Do enter. A student hears fluent output and may be unable to check the page. The developer has recorded the failure. The teacher needs this evidence to decide how the tool should be used.</desc>
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10" fill="none" stroke="#44545d" stroke-width="1.5"/></marker></defs>
  <style>text{font-family:Arial,Helvetica,sans-serif;fill:#222b30} .heading{font-size:38px;font-weight:600} .label{font-size:30px;font-weight:600} .body{font-size:28px} .note{font-size:25px;fill:#53616a} .rule{stroke:#b8c0c5;stroke-width:1.5} .flow{fill:none;stroke:#44545d;stroke-width:2.5;marker-end:url(#arrow)}</style>
  <rect width="1440" height="850" fill="#fff"/>
  <text x="50" y="65" class="heading">A reading assistant: who has the evidence?</text>
  <text x="50" y="109" class="note">Invented case · The quality of the spoken voice does not establish that the words are correct.</text>
  <line x1="50" y1="138" x2="1390" y2="138" class="rule"/>

  <text x="60" y="205" class="label">Printed page</text>
  <path d="M60 235H430V405H60Z" fill="#fff" stroke="#87949c" stroke-width="1.5"/>
  <text x="85" y="286" class="note">Original instruction</text>
  <text x="85" y="351" font-size="34">“Do not enter”</text>

  <path d="M446 320H515" class="flow"/>
  <text x="535" y="205" class="label">Reading assistant</text>
  <path d="M535 235H905V405H535Z" fill="#f7f8f8" stroke="#87949c" stroke-width="1.5"/>
  <text x="560" y="286" class="note">Spoken output in this case</text>
  <text x="560" y="351" font-size="34">“Do enter”</text>

  <path d="M921 320H990" class="flow"/>
  <text x="1010" y="205" class="label">Student</text>
  <text x="1010" y="284" class="body">Hears fluent speech.</text>
  <text x="1010" y="330" class="body">May be unable to</text>
  <text x="1010" y="370" class="body">check the printed page.</text>

  <line x1="50" y1="452" x2="1390" y2="452" class="rule"/>
  <text x="60" y="507" class="label">Developer</text>
  <text x="60" y="555" class="body">Has recorded the failure.</text>
  <text x="60" y="599" class="body">Can investigate when</text>
  <text x="60" y="639" class="body">and why it happens.</text>

  <path d="M448 565H885" class="flow" stroke-dasharray="9 7"/>
  <text x="496" y="542" class="note">Evidence must reach</text>
  <text x="504" y="606" class="note">the decision maker</text>

  <text x="950" y="507" class="label">Teacher / school</text>
  <text x="950" y="555" class="body">Needs the failure evidence</text>
  <text x="950" y="599" class="body">to decide when the tool</text>
  <text x="950" y="639" class="body">can be relied on.</text>

  <line x1="50" y1="700" x2="1390" y2="700" class="rule"/>
  <text x="60" y="754" class="body">Discuss: who depends on the output, and who knows about the fault?</text>
  <text x="60" y="799" class="note">The example illustrates an information gap; it is not a measured result from a real product.</text>
</svg>`,
};
