// Exact diagrams for the booking examples; labels remain searchable SVG text.
const shell = (name, description, body, height = 680) => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="${height}" viewBox="0 0 1280 ${height}" role="img" aria-labelledby="title desc"><title id="title">${name}</title><desc id="desc">${description}</desc><defs><marker id="tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#176877"/></marker></defs><style>text{font-family:Arial,sans-serif;fill:#18323d}.title{font-size:32px;font-weight:700}.label{font-size:26px;font-weight:700}.body{font-size:24px}.note{font-size:22px;fill:#405c65}.box{fill:#edf5f5;stroke:#477784;stroke-width:2}.call{fill:none;stroke:#687d84;stroke-width:3}.data{fill:none;stroke:#176877;stroke-width:3;marker-end:url(#tip)}.state{fill:#fff;stroke:#176877;stroke-width:3}</style><rect width="1280" height="${height}" fill="#fbfcfc"/>${body}</svg>`;
const label = (x,y,value,cls='body',anchor='start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${value}</text>`;
const box = (x,y,w,h,cls='box')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="${cls}"/>`;
export function section12ClassroomFigures() {
  return {
    'booking-structure.svg': shell('One controller, three responsibilities', 'BookingController calls ReadBooking, CalculateCharge and DisplayCharge. ReadBooking supplies Seats and Price through reference parameters. CalculateCharge receives value copies and returns the total. DisplayCharge receives that total as Amount.',
      label(40,48,'One controller, three responsibilities','title')+
      box(410,90,460,110)+label(640,130,'BookingController','label','middle')+label(640,168,'Owns Seats, Price and Total','body','middle')+
      '<path class="call" d="M640 200 V250 M215 250 H1065 M215 250 V390 M640 250 V390 M1065 250 V390"/>'+
      '<path class="data" d="M165 370 V270"/>'+label(55,291,'Seats','body')+label(55,322,'Price','body')+label(50,355,'to caller','note')+
      '<path class="data" d="M530 270 V370 M750 370 V270"/>'+label(547,310,'in','body')+label(767,334,'Total','body')+
      '<path class="data" d="M1130 270 V370"/>'+label(915,297,'Total','body')+label(915,329,'as Amount','body')+
      box(35,390,360,185)+label(215,432,'ReadBooking','label','middle')+label(58,475,'BYREF Seats : INTEGER')+label(58,513,'BYREF Price : REAL')+label(58,552,'Reads the two input values','note')+
      box(460,390,360,185)+label(640,432,'CalculateCharge','label','middle')+label(483,475,'Quantity, PriceEach in')+label(483,513,'Returns a REAL product')+label(483,552,'Quantity × PriceEach','note')+
      box(885,390,360,185)+label(1065,432,'DisplayCharge','label','middle')+label(908,475,'BYVAL Amount : REAL')+label(908,513,'OUTPUT Amount')+label(908,552,'Displays the supplied total','note')+
      label(40,627,'Grey lines: which module calls which. Teal arrows: the direction of supplied data.','note')+
      label(40,659,'The parent code specifies read → calculate → display. Each child has one responsibility.','note'),700),
    'structure-couples.svg': shell('Read the symbols beside a module connection', 'An unfilled circle represents a data couple. A filled circle represents a control couple such as a Boolean value. A data couple with arrows in both directions shows input and updated output for a reference parameter.',
      label(40,48,'Read the symbols beside a module connection','title')+
      box(35,100,380,500)+box(450,100,380,500)+box(865,100,380,500)+
      label(225,145,'Data couple','label','middle')+
      '<path class="data" d="M225 202 V335"/><circle cx="225" cy="195" r="10" fill="#fff" stroke="#176877" stroke-width="3"/>'+
      label(250,260,'Seats','body')+label(60,392,'Unfilled circle','label')+label(60,439,'An INTEGER or REAL value')+label(60,479,'travels in the arrow direction.')+label(60,548,'Example: a quantity to use','note')+
      label(640,145,'Control couple','label','middle')+
      '<path class="data" d="M640 202 V335"/><circle cx="640" cy="195" r="10" fill="#176877"/>'+
      label(665,260,'Valid','body')+label(475,392,'Filled circle','label')+label(475,439,'A BOOLEAN value can guide')+label(475,479,'a decision in another module.')+label(475,548,'Example: TRUE or FALSE','note')+
      label(1055,145,'Reference parameter','label','middle')+
      '<path class="data" d="M1055 200 V335" marker-start="url(#tip)"/><circle cx="1055" cy="267" r="10" fill="#fff" stroke="#176877" stroke-width="3"/>'+
      label(1080,278,'Code','body')+label(890,392,'Two directions','label')+label(890,439,'The callee can read a value')+label(890,479,'and update the caller variable.')+label(890,548,'Example: BYREF Code','note')+
      label(40,647,'A separate hierarchy line identifies the caller and callee. Read the circle, label and arrow together.','note'),690),
    'booking-states.svg': shell('A booking changes state after an event', 'Initial state Draft. Submit with a valid request enters Pending; an invalid submit stays Draft. Pay in Pending enters Confirmed. Cancel in Pending or Confirmed returns to Draft. All other state-event pairs remain unchanged in this teaching model.',
      label(40,48,'A booking changes state after an event','title')+
      label(40,87,'Valid means (Seats >= 1) AND (Seats &lt;= Available). Available is fixed during this trace.','note')+
      '<circle cx="40" cy="280" r="9" fill="#18323d"/><path class="data" d="M55 280 H110"/>'+
      box(115,235,230,95,'state')+label(230,291,'Draft','label','middle')+
      box(530,235,230,95,'state')+label(645,291,'Pending','label','middle')+
      box(960,235,230,95,'state')+label(1075,291,'Confirmed','label','middle')+
      '<path class="data" d="M345 270 H530"/>'+label(437,217,'submit [Valid]','body','middle')+
      '<path class="data" d="M760 270 H960"/>'+label(860,247,'pay','body','middle')+
      '<path class="data" d="M170 235 C65 115 395 115 290 235"/>'+label(230,132,'submit [NOT Valid]','body','middle')+
      '<path class="data" d="M645 330 V415 H260 V330"/>'+label(450,404,'cancel','body','middle')+
      '<path class="data" d="M1075 330 V520 H180 V330"/>'+label(810,508,'cancel','body','middle')+
      label(40,591,'Begin at the filled dot. Use only a transition that leaves the current state.','note')+
      label(40,629,'Model rule: every other state/event pair leaves the state unchanged.','note'),675),
  };
}
