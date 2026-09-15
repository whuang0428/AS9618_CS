// Editable teacher diagrams; never substitutes for the separately reproduced official page.
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function teachingDiagram(name, id) {
 const arrow=`${id}-arrow`;
 const text=(x,y,s,size=18)=>`<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" dominant-baseline="middle">${esc(s)}</text>`;
 const rect=(x,y,w,h,s,kind='process')=>`${kind==='decision'?`<path d="M${x},${y-h/2} L${x+w/2},${y} L${x},${y+h/2} L${x-w/2},${y} Z"/>`:kind==='input'?`<path d="M${x-w/2+18},${y-h/2} h${w} l-18,${h} h-${w} Z"/>`:`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="${kind==='end'?h/2:0}"/>`}${text(x,y,s)}`;
 const path=(d,head=true)=>`<path class="connector" d="${d}"${head?` marker-end="url(#${arrow})"`:''}/>`;
 let content='',height=900,description='';
 if(name==='review-star'){
  height=470;description='A central switch connects individually to four computers, a server, two printers and a router. The router connects to the internet.';
  content=path('M130,105 L450,235',false)+path('M340,105 L450,235',false)+path('M560,105 L450,235',false)+path('M770,105 L450,235',false)+path('M130,365 L450,235',false)+path('M340,365 L450,235',false)+path('M560,365 L450,235',false)+path('M770,365 L450,235',false)+path('M770,390 V440 H565',false);
  for(const [x,y,s] of [[130,80,'Computer 1'],[340,80,'Computer 2'],[560,80,'Computer 3'],[770,80,'Computer 4'],[450,235,'Switch'],[130,365,'Server'],[340,365,'Printer 1'],[560,365,'Printer 2'],[770,365,'Router'],[485,440,'Internet']])content+=rect(x,y,155,48,s);
 } else if(name==='review-er'){
  height=420;description='CUSTOMER, PRODUCT and STAFF each have a one-to-many relationship with COMPLAINT.';
  content=path('M170,110 V215 H390 V285',false)+path('M450,110 V285',false)+path('M730,110 V215 H510 V285',false);
  for(const [x,label] of [[170,'CUSTOMER'],[450,'PRODUCT'],[730,'STAFF']])content+=rect(x,80,180,60,label)+text(x+20,143,'1');
  content+=text(360,256,'many')+text(482,235,'many')+text(535,256,'many')+rect(450,315,210,60,'COMPLAINT');
 } else if(name==='sentinel-flow'){
  description='Initialise total. Read until the first 27. Then read and sum values until zero, excluding both sentinels. Output total.';
  content=path('M400,78 V108')+path('M400,152 V198')+path('M400,242 V285')+path('M400,355 V408')+path('M290,320 H100 V220 H280')+text(230,301,'NO')+text(435,379,'YES')+path('M400,452 V495')+path('M400,565 V608')+text(435,584,'NO')+path('M510,530 H745 V765 H535')+text(565,511,'YES')+path('M400,652 V685 H130 V430 H280')+path('M400,787 V837');
  content+=rect(400,55,135,46,'START','end')+rect(400,130,190,44,'Set Total to 0')+rect(400,220,240,44,'INPUT Value','input')+rect(400,320,220,70,'Value = 27?','decision')+rect(400,430,240,44,'INPUT Value','input')+rect(400,530,220,70,'Value = 0?','decision')+rect(400,630,250,44,'Total ← Total + Value')+rect(400,765,250,44,'OUTPUT Total','input')+rect(400,860,135,46,'END','end');
 } else if(name==='reverse-array-flow'){
  height=1110;description='Input 100 values using indices 1 to 100, then output elements using indices 100 down to 1.';
  content=path('M430,68 V113')+path('M430,157 V215')+path('M430,285 V333')+text(466,304,'YES')+path('M430,377 V443')+path('M430,487 V520 H100 V250 H300')+path('M560,250 H795 V585 H540')+text(606,230,'NO')+path('M430,607 V663')+path('M430,707 V763')+path('M430,807 V865')+path('M310,900 H170 V685 H260')+text(242,878,'YES')+path('M430,935 V1027')+text(465,973,'NO');
  content+=rect(430,45,135,46,'START','end')+rect(430,135,220,44,'Set Index to 1')+rect(430,250,260,70,'Index <= 100?','decision')+rect(430,355,340,44,'INPUT Number[Index]','input')+rect(430,465,260,44,'Index ← Index + 1')+rect(430,585,220,44,'Set Index to 100')+rect(430,685,340,44,'OUTPUT Number[Index]','input')+rect(430,785,260,44,'Index ← Index - 1')+rect(430,900,240,70,'Index >= 1?','decision')+rect(430,1050,135,46,'END','end');
 } else if(name==='bounded-input-flow'){
  height=830;description='Read real values into at most 20 elements. Check 99.9 before storing and end after the twentieth stored value.';
  content=path('M410,68 V98')+path('M410,142 V193')+path('M410,237 V295')+path('M410,365 V408')+text(447,384,'NO')+path('M535,330 H770 V740 H480')+text(590,310,'YES')+path('M410,452 V493')+path('M410,537 V590')+path('M410,660 V717')+text(450,687,'YES')+path('M290,625 H105 V215 H275')+text(235,605,'NO');
  content+=rect(410,45,135,46,'START','end')+rect(410,120,220,44,'Set Index to 1')+rect(410,215,270,44,'INPUT Value','input')+rect(410,330,250,70,'Value = 99.9?','decision')+rect(410,430,280,44,'Data[Index] ← Value')+rect(410,515,260,44,'Index ← Index + 1')+rect(410,625,240,70,'Index > 20?','decision')+rect(410,740,135,46,'END','end');
 } else if(name==='pin-states'){
  height=520;description='S1 to S2 on Input PIN; S2 loops on Re-input PIN and displays error; Cancel returns to S1; Valid PIN reaches S4 and enables payment; Too many tries reaches S3 and blocks account.';
  const circle=(x,y,label)=>`<circle cx="${x}" cy="${y}" r="36"/>${text(x,y,label)}`;
  content=path('M50,270 H110')+text(68,245,'START',15)+path('M180,252 L405,190')+text(263,194,'Input PIN')+path('M405,215 Q285,350 180,290')+text(285,340,'Cancel | Re-prompt',16)+path('M425,146 C320,30 575,30 465,146')+text(445,34,'Re-input PIN | Display error',16)+path('M477,203 L735,160')+text(664,102,'Valid PIN | Enable payment',16)+path('M470,225 L735,399')+text(710,290,'Too many tries | Block Account',16);
  content+=circle(145,270,'S1')+circle(440,180,'S2')+circle(770,155,'S4')+circle(770,420,'S3');
 } else if(name==='module-structure'){
  height=660;description='Module-A selects Module-X, Module-Z or Module-Y. Module-X calls Reset with a reference parameter. Module-Y calls Restore. Empty circles denote data; filled circles denote Boolean control.';
  const couple=(x,y1,y2,label,control=false,both=false,labelX=x+38)=>`<circle cx="${x}" cy="${y1}" r="6" style="fill:${control?'#132b40':'#fff'}"/>${path(`M${x},${y1+Math.sign(y2-y1)*7} V${y2}`)}${both?path(`M${x},${y1-7} V${y1-46}`):''}${text(labelX,(y1+y2)/2,label,15)}`;
  content=path('M450,88 V130',false)+path('M420,155 L150,330',false)+path('M450,180 V330',false)+path('M480,155 L750,330',false)+path('M150,390 V540',false)+path('M750,390 V540',false);
  content+=rect(450,60,190,56,'Module-A')+rect(450,155,66,50,'','decision')+rect(150,360,180,60,'Module-X')+rect(450,360,180,60,'Module-Z')+rect(750,360,180,60,'Module-Y')+rect(150,570,180,60,'Reset')+rect(750,570,180,60,'Restore');
  content+=couple(130,222,308,'T1')+couple(220,191,278,'S2')+couple(409,234,308,'SA',false,false,375)+couple(490,306,227,'return')+couple(657,218,303,'RA')+couple(730,218,303,'RB',true)+couple(815,306,218,'return',true)+couple(115,464,524,'Code',false,true,78)+couple(697,434,522,'OldCode',false,false,647)+couple(820,522,434,'return',true);
  content+=text(450,637,'○ data value     ● Boolean control value',16);
 } else throw new Error(`Unknown teacher diagram: ${name}`);
 return `<div class="exam-diagram-scroll" tabindex="0" role="region" aria-label="Teacher diagram"><svg id="${id}-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">Teacher solution diagram</title><desc id="${id}-desc">${esc(description)}</desc><defs><marker id="${arrow}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrow-tip" d="M0,0 L10,5 L0,10 Z" fill="#132b40"/></marker></defs><style>#${id}-svg text{font-family:Arial,sans-serif;fill:#132b40;stroke:none}#${id}-svg :is(rect,circle,path:not(.connector):not(.arrow-tip)){stroke:#132b40;stroke-width:2;fill:white}#${id}-svg .connector{fill:none;stroke:#132b40;stroke-width:2}</style>${content}</svg></div>`;
}
