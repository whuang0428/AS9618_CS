// Reproducible concept diagrams; no model architecture or measured AI performance is implied.
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text = (x,y,value,size=25) => `<text x="${x}" y="${y}" font-size="${size}">${esc(value)}</text>`;
const box = (x,y,w,h,title,lines=[]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="#edf6f8" stroke="#4c7185" stroke-width="2"/>${text(x+18,y+36,title,26)}${lines.map((line,i)=>text(x+18,y+74+i*32,line,24)).join('')}`;
const arrow = (from,to,path) => `<path data-from="${from}" data-to="${to}" d="${path}" fill="none" stroke="#14747b" stroke-width="3" marker-end="url(#arrow)"/>`;
const svg = (title,height,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="${height}" viewBox="0 0 1120 ${height}" role="img"><title>${esc(title)}</title><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#14747b"/></marker></defs><style>text{font-family:Arial,sans-serif;fill:#142b45}</style><rect width="1120" height="${height}" fill="white"/>${text(30,48,title,30)}${body}</svg>`;
const definitions = {
  learning: {name:'learning-and-inference',title:'Data-driven AI: learning and later inference',facts:[
    'Learning stage: examples of past pump measurements and known outcomes are used to fit a model. A separate held-out set is used to test its predictions against known outcomes.',
    'Use stage: new pump measurements and the resulting model are used together to infer a fault-risk output. The future outcome of the new case is not supplied as an input.',
    'A technician checks the prediction and decides whether maintenance is needed. A prediction is not a confirmed fault.',
    'This is one data-driven approach. Rule-based AI instead applies expert-written knowledge; not all AI learns from examples.',
  ],image:()=>svg('Data-driven AI: learning and later inference',690,
    text(30,100,'1 · LEARNING AND CHECKING',22)+
    box(30,130,310,140,'Past examples',['Measurements +','known outcomes'])+
    arrow('past-examples','learning','M340 200H405')+
    box(405,130,310,140,'Learning procedure',['Adjust a model to','patterns in examples'])+
    arrow('learning','model','M715 200H780')+
    box(780,130,310,140,'Resulting model',['Test on separate','known-outcome cases'])+
    text(30,334,'2 · USING THE MODEL ON A NEW CASE',22)+
    box(30,375,310,140,'New measurements',['Vibration + temperature','Future fault unknown'])+
    arrow('new-input','inference','M340 445H405')+
    box(405,375,310,140,'Inference',['Apply the model','Estimate fault risk'])+
    arrow('model','inference','M935 270V350H560V375')+
    arrow('inference','human-decision','M715 445H780')+
    box(780,375,310,140,'Use the output',['Technician inspects','and plans maintenance'])+
    text(30,579,'A new prediction can be wrong. Test and monitor the system in its intended setting.',23)+
    text(30,628,'Scope: one data-driven approach; rule-based AI can use expert-written knowledge.',23))},
  reading: {name:'image-to-translated-speech',title:'Follow the information from a label to spoken words',facts:[
    'A camera captures a label as an image made of pixels. The image is not yet a sequence of recognised text characters.',
    'OCR locates characters and converts their visual patterns to text. Language processing uses word and context information to interpret that text; translation produces text in the chosen language.',
    'Text-to-speech generates an audio waveform for the translated text, and a speaker produces sound for the user.',
    'In the worked example, Sortie becomes recognised French text, is translated as Exit, and is spoken in English.',
    'An OCR error can propagate into an incorrect translation and spoken message. Check the captured image and recognised text before relying on uncertain output.',
    'This is a conceptual information flow. A real product may combine stages; speech-to-text is a different direction of conversion.',
  ],image:()=>svg('Follow the information from a label to spoken words',865,
    text(30,100,'ILLUSTRATIVE INPUT: a clear French label reading Sortie; output language: English',23)+
    box(30,140,310,155,'1 · Camera image',['Pixels showing Sortie','No text recognised yet'])+
    arrow('image','ocr','M340 218H405')+
    box(405,140,310,155,'2 · OCR',['Locate character shapes','Produce text: Sortie'])+
    arrow('ocr','language','M715 218H780')+
    box(780,140,310,155,'3 · Language processing',['Interpret the word','using language/context'])+
    arrow('language','translation','M935 295V385')+
    box(780,385,310,155,'4 · Translation',['French → English','Target text: Exit'])+
    arrow('translation','tts','M780 463H715')+
    box(405,385,310,155,'5 · Text-to-speech',['Text Exit → waveform','Represent spoken words'])+
    arrow('tts','speaker','M405 463H340')+
    box(30,385,310,155,'6 · Speaker / user',['Waveform → sound','The user hears Exit'])+
    box(30,610,1060,140,'Check an uncertain result before use',[
      'Blurred image → wrong recognised word → wrong translation → wrong spoken message.',
      'Retake the image or verify the text; fluent speech does not prove correct recognition.',
    ])+
    text(30,811,'Conceptual flow: stages may be combined in a product. Text-to-speech is not speech-to-text.',23))},
};
export const section7DiagramFiles = Object.freeze(Object.fromEntries(Object.values(definitions).map(d=>[`${d.name}.svg`,d.image()])));
export const section7ExactVisuals = Object.freeze(Object.fromEntries(Object.entries(definitions).map(([key,d])=>[key,{
  type:'reviewed-visual',layout:'mechanism',asset:`/assets/course-v3/section-7/${d.name}.svg`,title:d.title,
  alt:d.facts.join(' '),facts:d.facts,caption:d.facts.at(-1),review:'reviewed',preserveText:true,
}])));
