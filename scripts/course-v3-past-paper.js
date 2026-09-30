// Print state is temporary; closing the dialog restores classroom visibility and answer states.
(() => {
 const controls=document.querySelector('.exam-print-controls');
 if(!controls)return;
 let snapshot=null;
 let mode='questions';
 function prepare(){
  if(snapshot)return;
  const details=[...document.querySelectorAll('.lesson-stage details, .s5-teaching details, .s5-exam-challenge details')];
  snapshot={details:details.map(el=>[el,el.open]),attribute:document.body.getAttribute('data-exam-print')};
  document.body.dataset.examPrint=mode;
  details.forEach(el=>{el.open=el.classList.contains('optional-practice') || mode==='answers';});
 }
 function restore(){
  if(!snapshot)return;
  snapshot.details.forEach(([el,open])=>{el.open=open;});
  if(snapshot.attribute===null)document.body.removeAttribute('data-exam-print');else document.body.setAttribute('data-exam-print',snapshot.attribute);
  snapshot=null;mode='questions';
 }
 window.addEventListener('beforeprint',prepare);
 window.addEventListener('afterprint',restore);
 controls.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
  mode=button.dataset.printExam;prepare();
  try{window.print();}finally{restore();}
 }));
 controls.hidden=false;
})();
