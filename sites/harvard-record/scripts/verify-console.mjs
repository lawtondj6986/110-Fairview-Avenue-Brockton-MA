#!/usr/bin/env node
/**
 * Builds the verification console: one self-contained HTML file that a
 * maintainer opens in a browser on their own computer (it is never deployed).
 *
 *   node scripts/verify-console.mjs        writes docs/verification/console.html
 *
 * The console lists every source, ranked by how much rests on it, with the
 * ledger claims and site statements that depend on it. The maintainer opens
 * the original, marks each statement "matches" or "needs a change" (with a
 * note), and exports the answers as a JSON file. Then:
 *
 *   node scripts/apply-verification.mjs results.json          dry run: shows what would change
 *   node scripts/apply-verification.mjs results.json --write  records the check dates
 *
 * Answers are kept in the browser's local storage, so the work can be done
 * over several sittings. Nothing is sent anywhere.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectUses, statementKey } from './lib/site-uses.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const { sources } = await import('../src/data/sources.ts');
const { claims } = await import('../src/data/claims.ts');
const { ped, hms } = await import('../src/data/timelines.ts');
const { comparison } = await import('../src/data/comparison.ts');
const { named } = await import('../src/data/named.ts');

const uses = collectUses(root, { ped, hms, comparison });
const stateLabel = { intent: 'Stated intent', activity: 'Documented activity', verified: 'Verified implementation', none: 'Nothing on record' };
const peopleNames = named.filter((n) => n.role !== 'institution').flatMap((n) => n.name.split(' and ')).map((n) => n.trim().split(' ').pop());

/** The data the console works from. Also used by apply-verification.mjs to know what was expected. */
export function buildModel() {
  return Object.entries(sources).map(([id, s]) => {
    const mine = claims.filter((c) => c.sources.includes(id));
    const statements = (uses[id] ?? []).map((u) => ({ key: statementKey(u.text), where: u.where, text: u.text }));
    const text = [...mine.map((c) => c.claim), ...statements.map((x) => x.text)].join(' ');
    return {
      id, title: s.title, publisher: s.publisher, author: s.author ?? '', date: s.date ?? '', url: s.url ?? '', grade: s.grade,
      note: s.note ?? '', checked: s.checked ?? '',
      namesPeople: peopleNames.some((n) => new RegExp(`\\b${n}\\b`).test(text)),
      claims: mine.map((c) => ({ key: c.id, text: c.claim, state: stateLabel[c.state], grade: c.grade, caveat: c.caveat ?? '', also: c.sources.filter((x) => x !== id) })),
      statements,
      weight: mine.length * 3 + statements.length,
    };
  }).sort((a, b) => (Number(b.namesPeople) - Number(a.namesPeople)) || (b.weight - a.weight));
}

/** Item keys expected for each source: every claim id and every statement key. */
export function expectedKeys(model = buildModel()) {
  return Object.fromEntries(model.map((s) => [s.id, [...s.claims.map((c) => c.key), ...s.statements.map((x) => x.key)]]));
}

const CSS = `
:root{--ink:#22272e;--muted:#5a626d;--paper:#f8f6f1;--surface:#fff;--rule:#d8d3c7;--navy:#24395c;--accent:#86652a;--ok:#1f5c3a;--tint:#efece4}
*{box-sizing:border-box}body{margin:0;font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink);background:var(--paper)}
header{background:var(--navy);color:#fff;padding:1rem 1.25rem}header h1{margin:0;font-size:1.15rem}header p{margin:.25rem 0 0;font-size:.85rem;opacity:.9}
.bar{position:sticky;top:0;z-index:2;background:var(--surface);border-bottom:1px solid var(--rule);padding:.6rem 1.25rem;display:flex;flex-wrap:wrap;gap:.6rem 1rem;align-items:center;font-size:.9rem}
.bar input[type=text],.bar select{font:inherit;padding:.35rem .5rem;border:1px solid var(--rule);border-radius:4px}
button{font:inherit;font-weight:600;cursor:pointer;padding:.4rem .8rem;border-radius:4px;border:1px solid var(--navy);background:var(--navy);color:#fff}
button.ghost{background:transparent;color:var(--navy)}
main{display:grid;grid-template-columns:20rem minmax(0,1fr);min-height:80vh}
nav{border-right:1px solid var(--rule);background:var(--surface);overflow:auto;max-height:calc(100vh - 7rem);position:sticky;top:3.2rem}
nav button{display:block;width:100%;text-align:left;background:none;color:var(--ink);border:0;border-bottom:1px solid var(--rule);border-radius:0;font-weight:400;padding:.55rem .9rem;font-size:.85rem}
nav button[aria-current=true]{background:var(--tint);font-weight:600}
nav .meta{display:block;font-size:.72rem;color:var(--muted)}
.dot{display:inline-block;width:.6rem;height:.6rem;border-radius:50%;border:1.5px solid var(--muted);margin-right:.4rem;vertical-align:middle}
.dot.part{background:linear-gradient(90deg,var(--accent) 50%,transparent 50%);border-color:var(--accent)}.dot.done{background:var(--ok);border-color:var(--ok)}.dot.chg{background:var(--accent);border-color:var(--accent);border-radius:2px}
section{padding:1.25rem 1.5rem 4rem;max-width:60rem}
h2{margin:.2rem 0 .3rem;font-size:1.3rem}h3{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:1.6rem 0 .5rem}
.facts{font-size:.9rem;color:var(--muted)}.facts a{word-break:break-all}
.tag{display:inline-block;font-size:.72rem;font-weight:700;border:1px solid var(--ink);border-radius:3px;padding:0 .3rem;margin-right:.4rem}
.item{background:var(--surface);border:1px solid var(--rule);border-radius:4px;padding:.8rem 1rem;margin:.6rem 0}
.item.ok{border-left:4px solid var(--ok)}.item.change{border-left:4px solid var(--accent)}
.item blockquote{margin:.2rem 0 .5rem;padding:0;font-family:Georgia,serif;font-size:1.02rem}
.item .small{font-size:.8rem;color:var(--muted);margin:.15rem 0}
.choices{display:flex;flex-wrap:wrap;gap:.4rem 1.2rem;font-size:.9rem;margin-top:.4rem}
textarea{width:100%;font:inherit;font-size:.9rem;margin-top:.4rem;padding:.4rem;border:1px solid var(--rule);border-radius:4px;min-height:3.2rem}
.warn{background:#fff8e6;border:1px solid #e3cf9a;border-radius:4px;padding:.6rem .8rem;font-size:.88rem;margin:.6rem 0}
.gate label{display:block;margin:.3rem 0}
input[type=url]{width:100%;font:inherit;padding:.35rem .5rem;border:1px solid var(--rule);border-radius:4px}
@media(max-width:52rem){main{grid-template-columns:1fr}nav{position:static;max-height:14rem;border-right:0;border-bottom:1px solid var(--rule)}}
`;

const JS = `
const KEY='hprp-verify-v1';
let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
saved.sources=saved.sources||{};
const store=()=>{try{localStorage.setItem(KEY,JSON.stringify(saved))}catch(e){}};
const rec=id=>saved.sources[id]=saved.sources[id]||{items:{}};
const keysOf=s=>[...s.claims.map(c=>c.key),...s.statements.map(x=>x.key)];
function status(s){const r=saved.sources[s.id];if(s.checked&&!r)return'done';if(!r)return'open';const ks=keysOf(s);
  if(ks.some(k=>r.items[k]&&r.items[k].status==='change'))return'chg';
  const n=ks.filter(k=>r.items[k]&&r.items[k].status==='ok').length;
  if(n===ks.length&&r.linkOk)return'done';return n||r.linkOk?'part':'open';}
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let current=location.hash.slice(1)||MODEL[0].id, filter='all';
function renderNav(){const nav=document.querySelector('nav');nav.innerHTML='';
  let done=0;MODEL.forEach(s=>{const st=status(s);if(st==='done')done++;
    if(filter==='todo'&&st==='done')return;if(filter==='people'&&!s.namesPeople)return;if(filter==='chg'&&st!=='chg')return;
    const b=document.createElement('button');b.setAttribute('aria-current',s.id===current);
    b.innerHTML='<span class="dot '+(st==='open'?'':st)+'"></span>'+esc(s.id)+'<span class="meta">'+s.grade+' · '+s.claims.length+' claims · '+s.statements.length+' statements'+(s.namesPeople?' · names people':'')+'</span>';
    b.onclick=()=>{current=s.id;location.hash=s.id;render()};nav.appendChild(b)});
  document.getElementById('progress').textContent=done+' of '+MODEL.length+' sources complete';}
function item(s,it,kind){const r=rec(s.id);const cur=(r.items[it.key]||{status:'open',note:''});
  const d=document.createElement('div');d.className='item '+(cur.status==='open'?'':cur.status);
  const head=kind==='claim'?'<p class="small"><span class="tag">'+esc(it.key)+'</span>'+esc(it.state)+' · graded '+esc(it.grade)+(it.also.length?' · also rests on: '+esc(it.also.join(', ')):'')+'</p>':'<p class="small">'+esc(it.where)+'</p>';
  d.innerHTML=head+'<blockquote>'+esc(it.text)+'</blockquote>'+(it.caveat?'<p class="small">Caveat that must travel with it: '+esc(it.caveat)+'</p>':'')+
   '<div class="choices">'+[['open','Not checked yet'],['ok','Matches the original'],['change','Needs a change']].map(([v,l])=>'<label><input type="radio" name="'+s.id+'-'+it.key+'" value="'+v+'"'+(cur.status===v?' checked':'')+'> '+l+'</label>').join('')+'</div>'+
   '<textarea placeholder="Where in the document (page or section). If it needs a change: what the original actually says."'+'>'+esc(cur.note||'')+'</textarea>';
  d.querySelectorAll('input').forEach(i=>i.onchange=()=>{r.items[it.key]={status:i.value,note:d.querySelector('textarea').value};store();d.className='item '+(i.value==='open'?'':i.value);renderNav()});
  d.querySelector('textarea').oninput=e=>{r.items[it.key]={status:(r.items[it.key]||cur).status,note:e.target.value};store()};
  return d;}
function render(){renderNav();const s=MODEL.find(x=>x.id===current)||MODEL[0];const r=rec(s.id);const el=document.querySelector('section');
  el.innerHTML='<h2>'+esc(s.title)+'</h2><p class="facts"><span class="tag">'+s.grade+'</span>'+esc([s.publisher,s.author,s.date].filter(Boolean).join(' · '))+'<br>'+(s.url?'<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.url)+'</a>':'No link recorded')+'</p>'+
   (s.note?'<p class="facts">Note: '+esc(s.note)+'</p>':'')+(s.checked?'<p class="facts">Already recorded as checked on '+esc(s.checked)+'.</p>':'')+
   (s.namesPeople?'<div class="warn">Statements resting on this source name living people. Check the wording exactly, and check that any denial or response in the original is reflected on the site.</div>':'')+
   '<h3>Before you start</h3><div class="gate"><label><input type="checkbox" id="linkOk"'+(r.linkOk?' checked':'')+'> The link opens the publisher’s own copy, and its title, publisher and date match the register.</label>'+
   '<label>If the document has moved, its new address:<input type="url" id="newUrl" placeholder="https://" value="'+esc(r.newUrl||'')+'"></label></div>'+
   '<h3>Ledger claims resting on this source ('+s.claims.length+')</h3><div id="claims"></div><h3>Statements on the site that cite it ('+s.statements.length+')</h3><div id="stmts"></div>';
  el.querySelector('#linkOk').onchange=e=>{r.linkOk=e.target.checked;store();renderNav()};
  el.querySelector('#newUrl').oninput=e=>{r.newUrl=e.target.value.trim();store()};
  const c=el.querySelector('#claims');s.claims.length?s.claims.forEach(it=>c.appendChild(item(s,it,'claim'))):c.innerHTML='<p class="facts">None. Used for context or corroboration.</p>';
  const t=el.querySelector('#stmts');s.statements.length?s.statements.forEach(it=>t.appendChild(item(s,it,'stmt'))):t.innerHTML='<p class="facts">None in page text.</p>';
  window.scrollTo(0,0);}
document.getElementById('filter').onchange=e=>{filter=e.target.value;renderNav()};
document.getElementById('export').onclick=()=>{const who=document.getElementById('who').value.trim();
  const out={format:'hprp-verification-1',exportedAt:new Date().toISOString(),checkedBy:who,generatedFrom:GENERATED,sources:saved.sources};
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(out,null,2)],{type:'application/json'}));
  a.download='verification-'+new Date().toISOString().slice(0,10)+'.json';a.click();};
document.getElementById('import').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{const j=JSON.parse(t);if(j.sources){saved.sources=Object.assign(saved.sources,j.sources);store();render()}})};
document.getElementById('reset').onclick=()=>{if(confirm('Clear every answer saved in this browser?')){saved={sources:{}};store();render()}};
render();
`;

if (import.meta.url === `file://${process.argv[1]}`) {
  const model = buildModel();
  const generated = new Date().toISOString().slice(0, 10);
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Verification console</title><style>${CSS}</style></head>
<body>
<header><h1>Verification console</h1><p>Internal working tool. Not part of the published site. Your answers are saved in this browser only, until you export them.</p></header>
<div class="bar">
  <strong id="progress"></strong>
  <label>Show <select id="filter"><option value="all">all sources</option><option value="todo">not yet complete</option><option value="people">sources whose statements name people</option><option value="chg">sources needing a change</option></select></label>
  <label>Checked by <input type="text" id="who" placeholder="Your name"></label>
  <button id="export">Export results</button>
  <label class="ghost">Load earlier export <input type="file" id="import" accept="application/json"></label>
  <button class="ghost" id="reset">Clear</button>
</div>
<main><nav aria-label="Sources"></nav><section></section></main>
<script>const GENERATED=${JSON.stringify(generated)};const MODEL=${JSON.stringify(model).replace(/</g, '\\u003c')};${JS}</script>
</body></html>
`;
  const out = join(root, 'docs', 'verification');
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, 'console.html'), html);
  const items = model.reduce((n, s) => n + s.claims.length + s.statements.length, 0);
  console.log(`Verification console: ${model.length} sources, ${items} items -> docs/verification/console.html`);
}
