(function(){
const D=window.APP_DATA,$=document.getElementById("app");
const S=JSON.parse(localStorage.getItem("wash")||"{}");const save=()=>localStorage.setItem("wash",JSON.stringify(S));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
let selTarget=null,timer=null;
function go(h){location.hash=h}
function render(){
  clearInterval(timer);
  const r=(location.hash||"#home").slice(1);
  ({home,check,guide,care}[r]||home)();
  window.scrollTo(0,0);
}
const back=()=>`<button class="nav" onclick="location.hash='#home'">← 처음으로</button>`;
function home(){
  $.innerHTML=`<h1>${D.tagline}</h1><p class="sub">나는 어디에 가까울까요?</p>
  ${D.types.map(t=>`<button data-t="${t.id}"><b>${t.label}</b></button>`).join("")}
  <p class="small">${D.typeNote}</p>
  <h2>오늘의 개운 한마디</h2><button id="ad" class="ghost">${D.adButton}</button><p class="small mock"><b>시안 표시(실제 광고 아님)</b> · 광고 자리표시 버튼이며 SDK는 연결되어 있지 않아요.</p><div id="daily" class="small"></div>
  <p class="small">광고는 선택이에요. 모든 기능은 광고 없이 쓸 수 있어요.</p>
  <p class="small preview">미리보기용 시안, 앱인토스 배포본 아님</p>`;
  $.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{
    const t=D.types.find(x=>x.id===b.dataset.t);S.type=t.id;save();S.line=t.line;go("#"+t.go)});
  // 실제 광고 SDK 연결 전 자리표시. 광고 시청 완료 콜백에서만 문구를 보여준다.
  document.getElementById("ad").onclick=()=>{document.getElementById("daily").textContent=pick(D.dailyLines)};
}
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const dayStr=o=>{const d=new Date();d.setDate(d.getDate()-o);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
function streak(){const ds=S.days||[];let o=ds.includes(dayStr(0))?0:1,n=0;while(ds.includes(dayStr(o))){n++;o++}return n}
function check(){
  const c=D.check,ty=D.types.find(t=>t.id===S.type);
  $.innerHTML=`${back()}<h1>${c.title}</h1><p class="sub">${esc((ty&&ty.line)||"")}</p>
  <button id="y" class="primary"></button><button id="n">${c.no}</button><div id="r" class="card" hidden></div>
  <div class="card" id="sk"></div><button class="ghost" id="g" hidden>순서 보기</button>`;
  const yb=document.getElementById("y"),rr=document.getElementById("r"),gg=document.getElementById("g");
  function paint(){const on=(S.days||[]).includes(today());yb.textContent=on?"✔ "+c.yes+" (누르면 취소)":c.yes;yb.setAttribute("aria-pressed",on);
    const k=streak();document.getElementById("sk").innerHTML=`<b id="streak">${k}일 연속</b> <span class="small">${k?"이어 가고 있어요!":"오늘부터 시작해 봐요."}</span>`}
  const show=(m,g)=>{rr.hidden=false;rr.textContent=pick(m);gg.hidden=!g};
  yb.onclick=()=>{S.days=S.days||[];const t=today(),i=S.days.indexOf(t);
    if(i>=0){S.days.splice(i,1);rr.hidden=true}else{S.days.push(t);show(c.yesReply,false)}save();paint()};
  document.getElementById("n").onclick=()=>show(c.noReply,true);
  gg.onclick=()=>go("#guide");paint();
}
function guide(){
  const g=D.guide,done=S.done&&S.done.date===today()?S.done:{date:today()};S.done=done;
  $.innerHTML=`${back()}<h1>${g.title}</h1><p class="sub">${g.intro}</p>
  <div class="card">${g.steps.map((s,i)=>`<label class="step"><input type="checkbox" data-i="${i}" ${done[i]?"checked":""}> <span>${s}</span></label>`).join("")}</div>
  <div class="card"><b>내가 정하는 시간</b> <span class="small">(건강 기준이 아니라 나와의 약속이에요)</span>
  <div class="timer" id="tm">${String(g.timerDefaultMinutes).padStart(2,"0")}:00</div>
  <button class="primary" id="st">시작</button><button id="nx" disabled>다음</button><button id="en" disabled>종료</button></div>
  <div id="fin" class="card" hidden>${g.done}</div>`;
  const boxes=Array.from($.querySelectorAll("[data-i]")),tmEl=document.getElementById("tm"),stB=document.getElementById("st"),nxB=document.getElementById("nx"),enB=document.getElementById("en"),fin=document.getElementById("fin");
  const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
  const all=()=>fin.hidden=!boxes.every(x=>x.checked);
  boxes.forEach(x=>x.onchange=()=>{S.done[x.dataset.i]=x.checked;save();all()});all();
  let left=0,running=false;
  function stop(label){clearInterval(timer);running=false;stB.textContent="시작";stB.disabled=false;nxB.disabled=true;enB.disabled=true;tmEl.textContent=label||fmt(g.timerDefaultMinutes*60)}
  stB.onclick=()=>{left=g.timerDefaultMinutes*60;running=true;stB.disabled=true;nxB.disabled=false;enB.disabled=false;tmEl.textContent=fmt(left);
    timer=setInterval(()=>{left--;tmEl.textContent=fmt(left);if(left<=0)stop("끝!")},1000)};
  nxB.onclick=()=>{const nb=boxes.find(x=>!x.checked);if(nb){nb.checked=true;S.done[nb.dataset.i]=true;save();all()}};
  enB.onclick=()=>stop();
}
function list(a){return a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}
function care(){
  const c=D.care,sec=c.sections;
  $.innerHTML=`${back()}<h1>${c.title}</h1><p class="sub">${c.body}</p>
  <div class="grid">${c.targets.map(t=>`<button data-id="${t.id}">${t.emoji} ${t.label}${t.ready?"":'<span class="badge">준비 중</span>'}</button>`).join("")}</div>
  <button class="primary" id="go" ${selTarget?"":"disabled"}>${c.button}</button><div id="out"></div>
  <div class="disclaimer" id="dis">${D.disclaimer}</div>`;
  const out=document.getElementById("out");
  function view(){
    const t=c.targets.find(x=>x.id===selTarget);if(!t){out.innerHTML="";return}
    document.getElementById("dis").textContent=t.pet?D.disclaimerPet:D.disclaimer;
    if(!t.ready){out.innerHTML=`<div class="card"><b>${t.label}</b> 안내는 준비 중이에요. 조금만 기다려 주세요.${t.needsHelpLine?`<p><b>${D.helpLine}</b></p>`:""}</div>`;return}
    const nums=Object.values(c.numbers).map(n=>`<li>${n.label}: ${n.value?esc(n.value):'<span class="slot">수치 자리(출처 확인 후 입력)</span>'}</li>`).join("");
    out.innerHTML=`<p class="sub">${esc(t.intro)}</p>
    <div class="card"><b>${sec.prep}</b>${list(t.prep)}</div>
    <div class="card"><b>${sec.steps}</b><ol>${t.steps.slice(0,5).map(x=>`<li>${esc(x)}</li>`).join("")}</ol><ul>${nums}</ul></div>
    <div class="card"><b>${sec.caution}</b>${list(t.caution)}${t.needsHelpLine?`<p><b>${D.helpLine}</b></p>`:""}</div>
    <div class="card"><b>${sec.after}</b>${list(t.after)}</div>`;
  }
  $.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>{selTarget=b.dataset.id;go_.disabled=false;$.querySelectorAll("[data-id]").forEach(x=>x.style.outline=x===b?"2px solid #2f80ed":"");out.innerHTML="";const sel=c.targets.find(x=>x.id===selTarget);document.getElementById("dis").textContent=sel.pet?D.disclaimerPet:D.disclaimer});
  const go_=document.getElementById("go");go_.onclick=view;
}
window.addEventListener("hashchange",render);render();
})();
