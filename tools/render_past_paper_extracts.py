#!/usr/bin/env python3
"""Render registered, unaltered PDF regions; preserve source identity and crop bounds."""
from pathlib import Path
import argparse,hashlib,json
import pdfplumber

ROOT=Path(__file__).resolve().parents[1]
ARCHIVE=ROOT/'docs/practice-past-paper-review-20260915'

def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()

def main():
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--source-dir',type=Path,default=Path('/Users/kw/Documents/Teaching/AS CS 9618/past-papers'))
 args=parser.parse_args()
 selections=json.loads((ARCHIVE/'selection-registry.json').read_text())
 extracts=json.loads((ROOT/'scripts/past-paper-extracts.json').read_text())
 out=ROOT/'web/assets/past-paper-questions';out.mkdir(parents=True,exist_ok=True)
 sources={p.name:p for p in args.source_dir.rglob('*.pdf')}
 rendered=[]
 for e in selections:
  if e['id'] not in extracts:raise ValueError(f"Missing crop specification: {e['id']}")
  item={k:e[k] for k in ['id','lesson','syllabusCode','year','series','component','parts','marks','syllabusMapping']}
  item['sourceType']='past-paper'
  item['originalReview']='2026-09-15; approved selection register'
  spec={k:extracts[e['id']][k] for k in ('qp','ms','insert') if k in extracts[e['id']]}
  spec_hash=hashlib.sha256(json.dumps(spec,sort_keys=True,separators=(',',':')).encode()).hexdigest()
  review=extracts[e['id']].get('review',{})
  item['extractReview']=review if review.get('cropSpecSha256')==spec_hash else {'status':'pending','cropSpecSha256':spec_hash}
  for kind in ['qp','ms']:
   source=sources[e[kind]['filename']]
   if digest(source)!=e[kind]['sha256']:raise ValueError(f'Changed original: {source}')
   item[kind]={'filename':source.name,'sha256':digest(source),'extracts':[]}
   with pdfplumber.open(source) as pdf:
    for index,region in enumerate(extracts[e['id']][kind],1):
     n,top,bottom,*horizontal=region
     p=pdf.pages[n-1]
     left,right=horizontal or [45,p.width-35]
     bbox=(left,top,right,bottom)
     if not (0<=left<right<=p.width and 0<=top<bottom<=p.height):raise ValueError((e['id'],kind,bbox))
     cuts=[c for c in p.chars if c.get('upright',True) and c['text'].strip() and left<c['x0']<right and (c['top']<top<c['bottom'] or c['top']<bottom<c['bottom'])]
     cuts += [c for c in p.chars if c.get('upright',True) and c['text'].strip() and top<c['top']<bottom and (c['x0']<left<c['x1'] or c['x0']<right<c['x1'])]
     if cuts:raise ValueError(f"Crop intersects text: {e['id']} {kind} {n} {''.join(c['text'] for c in cuts)}")
     cropped=p.crop(bbox)
     name=f"{e['id'].lower()}-{kind}-{index}.png"
     image=cropped.to_image(resolution=144).original
     image.save(out/name)
     item[kind]['extracts'].append({'asset':'/assets/past-paper-questions/'+name,'page':n,'bbox':list(bbox),'width':image.width,'height':image.height,'sha256':digest(out/name)})
  item['inserts']=[]
  for filename, n, top, bottom in extracts[e['id']].get('insert',[]):
   reference=next(r for r in e['inserts'] if r['path']==filename)
   source=ARCHIVE/filename
   if digest(source)!=reference['sha256']:raise ValueError(f'Changed insert: {source}')
   with pdfplumber.open(source) as pdf:
    p=pdf.pages[n-1];bbox=(45,top,p.width-35,bottom)
    cuts=[c for c in p.chars if c.get('upright',True) and c['text'].strip() and 45<c['x0']<p.width-35 and (c['top']<top<c['bottom'] or c['top']<bottom<c['bottom'])]
    cuts += [c for c in p.chars if c.get('upright',True) and c['text'].strip() and top<c['top']<bottom and (c['x0']<bbox[0]<c['x1'] or c['x0']<bbox[2]<c['x1'])]
    if cuts:raise ValueError(f'Insert crop intersects text: {filename} {n} {cuts}')
    name=f'{source.stem}-p{n}-{top}-{bottom}.png'
    im=p.crop(bbox).to_image(resolution=144).original;im.save(out/name)
    item['inserts'].append({'filename':filename,'sourceSha256':digest(source),'sourceURL':reference['sourceURL'],'page':n,'bbox':list(bbox),'asset':'/assets/past-paper-questions/'+name,'width':im.width,'height':im.height,'sha256':digest(out/name)})
  rendered.append(item)
 (ROOT/'scripts/past-paper-source-manifest.json').write_text(json.dumps({'schemaVersion':1,'questions':rendered},ensure_ascii=False,indent=2)+'\n')
 verified=sum(item['extractReview'].get('status')=='verified' for item in rendered)
 print(f'Rendered {len(rendered)} question groups; {verified} reviewed, {len(rendered)-verified} require visual review.')

if __name__=='__main__':main()
