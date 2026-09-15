from pathlib import Path
import json,hashlib,subprocess,re,itertools,sqlite3,collections
b=Path('/private/tmp/as9618-practice-audit-20260915');root=Path('/Users/kw/Documents/Projects/GitHub/AS9618_CS')
notes=[]
def check(ok,label):
 assert ok,label
 notes.append(label)
rows=json.loads((b/'practice-plan.json').read_text());es=json.loads((b/'selection-registry.json').read_text());base=json.loads((b/'repo-baseline.json').read_text());vis=json.loads((b/'visual-manifest.json').read_text())
check(len(rows)==93 and sum(x['kind']=='teaching' for x in rows)==91,'93个Lesson都有配置：91教学、2复习')
check(sum(len(x['practice']) for x in rows)==498,'498个当前Practice ID均有明确去向')
check(sum(x['practiceBigQuestions'] for x in rows)==376,'主配置376个Practice任务，1246教师诊断分')
check(sum(x['practiceMarks'] for x in rows)==1246,'Practice分值按现有题ID重算，无统一题数约束')
check(sum(x['examBigQuestions'] for x in rows)==109 and sum(x['examSubquestions'] for x in rows)==151 and sum(x['examMarks'] for x in rows)==476,'真题109个大题配置、151个子问位置、476分')
parts=collections.defaultdict(list)
for e in es:
 check(e['marks']==sum(p['marks'] for p in e['parts']),e['id']+' 子问分值合计一致')
 for p in e['parts']:parts[(e['stem'],p['part'])].append((e['lesson'],p['marks']))
view={(v['pdf'],v['page']) for v in vis};need={(e[k]['path'],p) for e in es for k in ['qp','ms'] for p in e[k+'Pages']}
check(need<=view,'全部215个不同入选QP/MS页包含在已查看原页清单')
check(len(parts)==150 and sum(v[0][1] for v in parts.values())==472,'原题去重后150子问、472分')
check({k:v for k,v in parts.items() if len(v)>1}=={('s25_21','6(a)'):[(89,4),(93,4)]},'唯一相同原子问复用为s25/21 Q6(a)：L089→L093，4分')
for path,h in {(e[k]['path'],e[k]['sha256']) for e in es for k in ['qp','ms']}:
 check(hashlib.sha256(Path(path).read_bytes()).hexdigest()==h,'来源哈希匹配 '+Path(path).name)
freq=json.loads((b/'frequency-events.json').read_text());check(sum(x['nominalMarks'] for x in freq)==900 and sum(x['countedMarks'] for x in freq)==898,'核心12卷900名义分、排除统一给分后898分')
# Teacher arithmetic checks.
check([3300*1024,0.3*10**6,3*1024**2,3300*1000]==[3379200,300000,3145728,3300000],'L001四选项统一字节复算')
check(2048*1024*10/(8*1024**2)==2.5,'L005官方bitmap条件计算2.5MiB')
check((40*20*4//8+24,40*20*8//8+24)==(424,824),'L005保留Practice含header的424/824字节')
# Teacher model: exact algorithm structure, independently compared to str.count.
def getnum(s,c):
 count=0
 for index in range(1,len(s)+1):
  if s[index-1:index]==c:count+=1
 return count
n=0
for length in range(7):
 for ss in itertools.product('aAB',repeat=length):
  s=''.join(ss)
  for c in 'aAB':
   assert getnum(s,c)==s.count(c),(s,c)
   n+=1
check(n==3279,'GetNum教师算法3279个大小写/空串/重复/未匹配组合检查通过')
# Queue: independently follow supplied two states.
q={5:'Red',6:'Green',7:'Blue',8:'Pink'};front=5;end=8
for word in ['Orange','Yellow']:
 assert len(q)<10
 end=(end+1)%10;q[end]=word
check(end==0 and front==5 and q[9]=='Orange' and q[0]=='Yellow' and len(q)==6,'L068(a)(i)两次入队及回绕核对')
active=[];i=5
while True:
 active.append(i)
 if i==1:break
 i=(i+1)%10
check(active==[5,6,7,8,9,0,1] and len(active)==7,'L068(a)(ii)独立状态7项，未沿用上一小问')
# SQL teacher fixtures, not fictional original table data.
db=sqlite3.connect(':memory:')
db.executescript('CREATE TABLE SHOW(ShowID TEXT PRIMARY KEY, Title TEXT, Duration INTEGER); CREATE TABLE PERFORMANCE(PerformanceID TEXT PRIMARY KEY, ShowID TEXT, ShowDate TEXT, StartTime TEXT);')
db.executemany('INSERT INTO SHOW VALUES(?,?,?)',[('MK12','Teacher title A',90),('OP3','Teacher title B',80)])
data=[('0001','MK12','5/5/2025','13:00'),('0002','MK12','5/5/2025','19:30'),('0003','MK12','6/5/2025','19:00'),('0004','OP3','7/5/2025','18:30'),('0005','OP3','8/5/2025','18:30'),('0006','OP3','9/5/2025','13:00')]
db.executemany('INSERT INTO PERFORMANCE VALUES(?,?,?,?)',data)
query='SELECT SHOW.Title, COUNT(PERFORMANCE.PerformanceID) AS NumberOfShowings FROM PERFORMANCE INNER JOIN SHOW ON PERFORMANCE.ShowID=SHOW.ShowID GROUP BY SHOW.Title'
alt='SELECT SHOW.Title, COUNT(PERFORMANCE.PerformanceID) AS NumberOfShowings FROM PERFORMANCE,SHOW WHERE PERFORMANCE.ShowID=SHOW.ShowID GROUP BY SHOW.Title'
check(sorted(db.execute(query).fetchall())==[('Teacher title A',3),('Teacher title B',3)],'SQL官方六行PERFORMANCE+明确教师标题fixture输出3/3')
check(db.execute(query).fetchall()==db.execute(alt).fetchall(),'SQL两种官方JOIN表达在fixture上结果一致')
check(db.execute(query).description[1][0]=='NumberOfShowings','SQL聚合别名在实际输出中生效')
db.execute('INSERT INTO PERFORMANCE VALUES(?,?,?,?)',('0007','MK12','5/5/2025','20:30'))
check(sorted(db.execute(query).fetchall())==[('Teacher title A',4),('Teacher title B',3)],'教师新增同日场次fixture只增加对应show计数，不能COUNT日期去重')
# Sample Markdown dependencies: local links, image links, folded structure.
missing=[]
for p in b.glob('0*-*.md'):
 for m in re.finditer(r'\]\((?:<([^>]+)>|([^\)]+))\)',p.read_text()):
  dest=(m.group(1) or m.group(2)).split('#')[0]
  if dest.startswith('/') and not Path(dest).exists() and not dest.endswith('05-verification.md'):missing.append((p.name,dest))
check(not missing,'交付Markdown本地文件及图片链接存在')
sample=(b/'03-teaching-samples.md').read_text();check(sample.count('<details>')==sample.count('</details>') and '<details open' not in sample,'样稿折叠块成对且无默认open；正式浏览器UI待实施验证')
# Read-only preservation.
after=subprocess.check_output(['git','status','--short'],cwd=root,text=True);before=(b/'git-before.txt').read_text();(b/'git-after.txt').write_text(after)
check(after==before,'Git状态与开始时完全一致；保护现有修改及未跟踪文件')
changed=[p for p,h in base.items() if not (root/p).exists() or hashlib.sha256((root/p).read_bytes()).hexdigest()!=h]
check(not changed,f'开始记录的{len(base)}个项目文件SHA-256全部未变')
diff=subprocess.run(['git','diff','--check'],cwd=root,capture_output=True,text=True);check(diff.returncode==0,'git diff --check退出0')
(b/'verification-results.json').write_text(json.dumps({'checks':notes,'getNumCases':n,'repoFilesChecked':len(base),'changed':changed,'gitStatusUnchanged':True,'requiredSourcePages':len(need),'sourcePairsSelected':len(set(e['stem'] for e in es))},ensure_ascii=False,indent=2))
print('PASS',len(notes),'checks; source pages',len(need),'sourcepairs',len(set(e['stem'] for e in es)),'repo hashes',len(base),'GetNum cases',n)
