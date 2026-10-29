// ===================== HELPERS =====================
const $=id=>document.getElementById(id);
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'');
function parseAns(rest){ const parts=String(rest).split('/').map(x=>x.trim()).filter(Boolean); return {label:parts[0]||'?',keys:parts.map(norm)}; }
function parseItems(q){
  if(q.layout==='jeop'){ const out=[]; (q.cats||[]).forEach((cat,c)=>cat.cells.forEach((x,r)=>out.push({label:x.label,keys:x.keys,clue:x.clue,cat:cat.title,v:x.v,c,r}))); return out; }
  if(q.layout==='table'){ const out=[]; (q.rows||[]).forEach((row,r)=>{ row.slice(1).forEach((cell,c)=>{ out.push({...parseAns(cell),clue:row[0]+' '+(q.cols[c]||''),r,c}); }); }); return out; }
  return (q.items||[]).map(line=>{ let clue=''; let rest=line; const p=line.indexOf('|'); if(p>-1){ clue=line.slice(0,p).trim(); rest=line.slice(p+1); } return {clue,...parseAns(rest)}; });
}
function quizSize(q){ if(q.layout==='jeop') return (q.cats||[]).reduce((n,c)=>n+c.cells.length,0); return q.layout==='table' ? (q.rows||[]).reduce((n,r)=>n+r.length-1,0) : (q.items||[]).length; }
function quizPayload(q){ return {id:q.id,title:q.title,desc:q.desc||'',layout:q.layout||'list',items:q.items||null,cols:q.cols||null,rows:q.rows||null,cats:q.cats||null}; }
const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function saveCustom(){ try{ localStorage.setItem('hv_custom',JSON.stringify(QUIZZES.filter(q=>q.custom))); }catch(e){} }
let toastT; function toast(m){ let t=document.querySelector('.toast'); if(!t){ t=document.createElement('div'); t.className='toast'; document.body.appendChild(t);} t.textContent=m; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2600); }
const rid=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36);

// ===================== ACCOUNTS / ELO (Supabase) =====================
const CFG=window.HV_CONFIG||{};
const sb = (CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY && window.supabase) ? window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY) : null;
let me=null; // {id, username, elo, wins, losses, draws}

async function loadMe(){
  if(!sb) return;
  const {data:{session}}=await sb.auth.getSession();
  if(!session){ me=null; renderMe(); return; }
  const {data}=await sb.from('profiles').select('*').eq('id',session.user.id).maybeSingle();
  if(!data){ // profile missing (e.g. signup before confirm) -> create from metadata
    const uname=(session.user.user_metadata?.username||'player').toLowerCase();
    await sb.from('profiles').insert({id:session.user.id,username:uname}).select().maybeSingle();
    const r=await sb.from('profiles').select('*').eq('id',session.user.id).maybeSingle(); me=r.data||null;
  } else me=data;
  renderMe();
}
function renderMe(){
  $('meBox').hidden=!me; $('guestBox').hidden=!!me;
  if(!sb){ $('guestHint').textContent='Ranked mode is off (no database connected).'; $('btnOpenAuth').hidden=true; }
  if(me){ $('meUser').textContent=me.username; $('meAv').textContent=(me.username||'?')[0].toUpperCase(); $('meElo').textContent=me.elo; $('meRec').textContent=`${me.wins}W · ${me.losses}L · ${me.draws}D`;
    if(!$('myName').value.trim()){ $('myName').value=me.username; } }
  loadLeaderboard(); loadHistory(); setStartable();
}
async function loadLeaderboard(){
  if(!sb){ $('lbBody').textContent='Connect a database to turn on rankings.'; return; }
  const {data,error}=await sb.from('profiles').select('id,username,elo,wins,losses,draws').order('elo',{ascending:false}).limit(25);
  if(error||!data){ $('lbBody').textContent='Leaderboard unavailable.'; return; }
  if(!data.length){ $('lbBody').textContent='Nobody ranked yet. Be first.'; return; }
  let html='<div class="lbh"><span>#</span><span>Player</span><span>W-L</span><span>Elo</span></div>';
  data.forEach((p,i)=>{ html+=`<div class="lbr ${me&&p.id===me.id?'me':''}"><span class="r">${i+1}</span><span class="u" title="${esc(p.username)}">${esc(p.username)}</span><span class="wl">${p.wins}-${p.losses}</span><span class="e">${p.elo}</span></div>`; });
  $('lbBody').innerHTML=html;
}
async function loadHistory(){
  if(!sb||!me){ $('histBody').textContent='Sign in to track your games.'; return; }
  const {data}=await sb.from('matches').select('*').eq('applied',true).or(`a.eq.${me.id},b.eq.${me.id}`).order('created_at',{ascending:false}).limit(8);
  if(!data||!data.length){ $('histBody').textContent='No ranked games yet.'; return; }
  const ids=[...new Set(data.flatMap(m=>[m.a,m.b]))];
  const {data:profs}=await sb.from('profiles').select('id,username').in('id',ids);
  const name=id=>(profs||[]).find(p=>p.id===id)?.username||'?';
  $('histBody').innerHTML='<div class="hist">'+data.map(m=>{
    const isA=m.a===me.id; const my=isA?m.a_score:m.b_score, th=isA?m.b_score:m.a_score; const d=(isA?m.a_elo_after-m.a_elo_before:m.b_elo_after-m.b_elo_before);
    const res=my>th?'W':my<th?'L':'D';
    return `<div><span>${esc(m.quiz)} vs ${esc(name(isA?m.b:m.a))}</span><span><b class="${res==='W'?'w':res==='L'?'l':''}">${res} ${my}-${th}</b> <span style="color:var(--muted)">${d>=0?'+':''}${d}</span></span></div>`;
  }).join('')+'</div>';
}
// auth modal
let authMode='in';
function setAuthMode(m){ authMode=m; $('tabIn').classList.toggle('on',m==='in'); $('tabUp').classList.toggle('on',m==='up'); $('lblUser').hidden=m!=='up'; $('btnAuthGo').textContent=m==='in'?'Sign in':'Create account'; $('auErr').textContent=''; }
$('tabIn').onclick=()=>setAuthMode('in'); $('tabUp').onclick=()=>setAuthMode('up');
$('btnOpenAuth').onclick=()=>{ $('authModal').hidden=false; $('auEmail').focus(); };
$('btnCloseAuth').onclick=()=>$('authModal').hidden=true;
$('authModal').addEventListener('click',e=>{ if(e.target===$('authModal')) $('authModal').hidden=true; });
$('btnAuthGo').onclick=async()=>{
  if(!sb) return; const email=$('auEmail').value.trim(), pass=$('auPass').value; $('auErr').textContent='';
  try{
    if(authMode==='up'){
      const uname=$('auUser').value.trim().toLowerCase();
      if(!/^[a-z0-9_]{3,16}$/.test(uname)){ $('auErr').textContent='Username: 3–16 letters, numbers or _'; return; }
      const {data:taken}=await sb.from('profiles').select('id').eq('username',uname).maybeSingle();
      if(taken){ $('auErr').textContent='That username is taken.'; return; }
      const {data,error}=await sb.auth.signUp({email,password:pass,options:{data:{username:uname}}});
      if(error) throw error;
      if(!data.session){ $('auErr').textContent='Check your email to confirm, then sign in.'; return; }
      await sb.from('profiles').insert({id:data.user.id,username:uname});
    } else {
      const {error}=await sb.auth.signInWithPassword({email,password:pass}); if(error) throw error;
    }
    $('authModal').hidden=true; await loadMe(); toast(`Signed in as ${me?.username||'player'}.`); announce();
  }catch(e){ $('auErr').textContent=e.message||'Something went wrong.'; }
};
$('btnSignOut').onclick=async()=>{ if(sb) await sb.auth.signOut(); me=null; renderMe(); announce(); };
function announce(){ if(typeof send==='function'&&conn&&conn.open){ nameOK(); send(hello()); } }
// live leaderboard: realtime (if the profiles table is in the supabase_realtime publication) + polling fallback
if(sb){ try{ sb.channel('lb').on('postgres_changes',{event:'*',schema:'public',table:'profiles'},()=>{ loadLeaderboard(); if(me) loadMe(); }).subscribe(); }catch(e){} setInterval(()=>{ if(document.visibilityState==='visible'){ loadLeaderboard(); } },15000); }
[$('auEmail'),$('auPass'),$('auUser')].forEach(i=>i.onkeydown=e=>{ if(e.key==='Enter') $('btnAuthGo').click(); });

// ===================== STATE =====================
let mode='none'; // 'host' | 'guest' | 'local'
let peer=null, conn=null, roomCode='', myName='', theirName='', theirUid=null, theirElo=null;
let selected=QUIZZES[0].id;
let wantRanked=true;
let game=null;

// ===================== LOBBY =====================
const TIMES=[30,60,90,120,180,240,300,360,420,480,600,720,900];
function fillTimes(def){ const s=$('timeSel'); s.innerHTML=''; TIMES.forEach(t=>{ const o=document.createElement('option'); o.value=t; o.textContent=fmt(t); s.appendChild(o); }); s.value=TIMES.includes(def)?def:300; }
let libCat='All', libQ='';
const RANKED=new Set(['top30','21k','30k','steals','blocks','assists','rebounds','threes','tripdub','games','playoff-pts','allstar13','fifty-pt']);
const JEOP_CATS=['champs','mvp-year','fmvp-year','draft1','roy','scoring-year','runnerup','reb-year','ast-year','arenas','abbr','franchise-scorers','mip','lakers-retired','celtics-retired','states','dunk','threept','nicknames','countries','lottery-2025','awards-2025','awards-2024','awards-2023'];
let gtype='race';
const GT_DEFAULT_T={race:null,feud:180,jeop:600};
function setGtype(g){ gtype=g; document.querySelectorAll('#gtypes .gt').forEach(b=>b.classList.toggle('on',b.dataset.g===g));
  $('quizPick').hidden=(g==='jeop'); $('jeopNote').hidden=(g!=='jeop');
  if(g==='feud'&&!RANKED.has(selected)){ selected='top30'; }
  const q=QUIZZES.find(x=>x.id===selected); fillTimes(GT_DEFAULT_T[g]||(q&&q.t)||300); renderLib(); }
document.querySelectorAll('#gtypes .gt').forEach(b=>b.onclick=()=>setGtype(b.dataset.g));
const CATS=['All','Teams','Champions','Awards','Records','Draft','Tables','Lists','Mine'];
function renderChips(){ $('libChips').innerHTML=CATS.map(c=>`<button type="button" class="${libCat===c?'on':''}" data-c="${c}">${c}</button>`).join('');
  $('libChips').querySelectorAll('button').forEach(b=>b.onclick=()=>{ libCat=b.dataset.c; renderLib(); }); }
function renderLib(){
  const lib=$('lib'); lib.innerHTML=''; renderChips();
  const q0=libQ.toLowerCase();
  const list=QUIZZES.filter(q=>(gtype!=='feud'||RANKED.has(q.id))&&(libCat==='All'||(libCat==='Mine'?q.custom:(q.cat||'Lists')===libCat)) && (!q0||(q.title+' '+(q.desc||'')).toLowerCase().includes(q0)));
  $('libCount').textContent=list.length+' / '+QUIZZES.length;
  list.forEach(q=>{ const b=document.createElement('button'); b.className='q'+(q.id===selected?' on':''); b.type='button';
    const cat=q.cat||(q.custom?'Mine':'Lists'); b.dataset.cat=cat;
    b.innerHTML=`<span class="n">${esc(q.title)}</span><span class="d">${esc(q.desc||'')}</span><small><span class="cat">${esc(cat)}</span><span>·</span><span>${quizSize(q)} ${q.layout==='jeop'?'clues':'answers'}</span><span>·</span><span>${fmt(q.t||300)}</span></small>`;
    b.onclick=()=>{ selected=q.id; fillTimes(q.t||300); renderLib(); }; lib.appendChild(b); });
  const sel=QUIZZES.find(q=>q.id===selected); $('selDesc').textContent=sel?(sel.desc||sel.title):'';
}
$('libSearch').oninput=e=>{ libQ=e.target.value; renderLib(); };
$('btnPractice').onclick=()=>{ beginGame({quiz:pickQuiz(),dur:+$('timeSel').value,online:false,solo:true,gmode:gtype}); };
function pickQuiz(){ return gtype==='jeop'?buildJeop():QUIZZES.find(q=>q.id===selected); }
try{ $('myName').value=localStorage.getItem('hv_name')||''; }catch(e){}
$('myName').oninput=()=>{ try{localStorage.setItem('hv_name',$('myName').value);}catch(e){} };
$('btnAddCustom').onclick=()=>{
  const title=$('customTitle').value.trim(), lines=L($('customList').value);
  if(!title||lines.length<2){ toast('Give it a title and at least 2 answers.'); return; }
  const id='custom_'+Date.now().toString(36); QUIZZES.push({id,title,items:lines,custom:true,t:300,cat:'Mine',desc:'Your own quiz: '+title,layout:lines.some(l=>l.includes('|'))?'clued':'list'}); saveCustom(); selected=id; renderLib(); fillTimes(300);
  $('customTitle').value=''; $('customList').value=''; toast('Added.');
};
function canRank(){ return !!(sb && me && theirUid && conn && conn.open); }
function ranked(){ return canRank() && wantRanked; }
function renderMode(){
  const can=canRank();
  $('modeRanked').disabled=!can; $('modeRanked').classList.toggle('on',can&&wantRanked); $('modeCasual').classList.toggle('on',!(can&&wantRanked));
  $('modeHint').textContent = mode==='local' ? 'Split-screen is always unranked.'
    : !sb ? 'Ranked needs a database connected.'
    : !me ? 'Sign in to play ranked.'
    : !(conn&&conn.open) ? 'Ranked is available once an opponent joins.'
    : !theirUid ? `${theirName} is not signed in, so this game is unranked.`
    : wantRanked ? `Ranked: ${me.elo} vs ${theirElo??'?'}. Elo moves for both players.` : 'Unranked: just for fun, nothing changes.';
}
$('modeRanked').onclick=()=>{ wantRanked=true; renderMode(); setStartable(); };
$('modeCasual').onclick=()=>{ wantRanked=false; renderMode(); setStartable(); };
function setStartable(){
  const connected = conn && conn.open;
  const ok = mode==='local' || (mode==='host' && connected);
  $('btnStart').disabled=!ok;
  renderMode();
  const rk = connected ? (ranked() ? ' Ranked.' : ' Unranked.') : '';
  $('startHint').textContent = mode==='local' ? 'Both players type on this screen. Unranked.' :
    mode==='host' ? (connected ? `${theirName} is in. Tip off when ready.${rk}` : 'Waiting for your opponent to join…') :
    mode==='guest' ? (connected ? `Connected to ${theirName}. They pick the quiz and tip off.${rk}` : 'Connecting…') :
    'Host a game, join with a code, or use split-screen.';
}
$('btnLocal').onclick=()=>{ teardownNet(); mode='local'; $('roomBox').hidden=true; setStartable(); };

// ===================== NETWORK (Supabase Realtime: works through any firewall/NAT) =====================
const myPid=rid();
let chan=null, joinTimer=null, theirPid=null;
function netAvailable(){ return !!sb; }
function teardownNet(){ if(joinTimer){ clearTimeout(joinTimer); joinTimer=null; } if(chan){ try{ sb.removeChannel(chan); }catch(e){} } chan=null; conn=null; theirPid=null; roomCode=''; theirUid=null; theirElo=null; if(mode!=='local') mode='none';
  $('roomBox').hidden=true; $('netStatus').textContent=netAvailable()?'Ready to host or join.':'Online play unavailable (no database connected). Split-screen works.'; setStartable(); }
function hello(){ return {t:'hello',name:myName,uid:me?.id||null,elo:me?.elo??null,uname:me?.username||null}; }
function rawSend(payload){ if(!chan) return; try{ const p=chan.send({type:'broadcast',event:'msg',payload}); if(p&&p.catch) p.catch(()=>{}); }catch(e){} }
function sendTo(pid,m){ rawSend({...m,from:myPid,to:pid||null}); }
function send(m){ if(conn&&conn.open&&theirPid) sendTo(theirPid,m); }
function openChannel(code,onReady){
  chan=sb.channel('hv-'+code.toLowerCase(),{config:{broadcast:{self:false,ack:false},presence:{key:myPid}}});
  chan.on('broadcast',{event:'msg'},({payload})=>onNet(payload));
  chan.on('presence',{event:'leave'},({leftPresences})=>{ if(theirPid&&(leftPresences||[]).some(p=>p.pid===theirPid)) onOppLeft(); });
  chan.subscribe(async status=>{
    if(status==='SUBSCRIBED'){ try{ await chan.track({pid:myPid,role:mode}); }catch(e){} onReady(); }
    else if(status==='CHANNEL_ERROR'||status==='TIMED_OUT'){ $('netStatus').textContent='Connection issue: '+status.toLowerCase().replace('_',' ')+'. Try again.'; }
  });
}
function onOppLeft(){ toast('Opponent disconnected.'); if(game&&!game.ended){ game.theirDone=true; checkEnd(); } conn=null; theirPid=null;
  if(mode==='host'){ $('peerLine').textContent='Opponent left. Waiting for someone to join…'; setStartable(); }
  else if(!(game&&!game.ended)) teardownNet(); else setStartable(); }
function onNet(p){
  if(!p||typeof p!=='object'||p.from===myPid) return;
  if(p.to&&p.to!==myPid) return;
  if(mode==='host'){
    if(p.t==='hello'){ if(theirPid&&theirPid!==p.from){ sendTo(p.from,{t:'full'}); return; } if(!theirPid){ theirPid=p.from; conn={open:true}; sendTo(theirPid,hello()); $('netStatus').innerHTML=`Hosting as <b>${esc(myName)}</b>.`; } onData(p); return; }
    if(p.from!==theirPid) return; onData(p); return;
  }
  if(mode==='guest'){
    if(p.t==='full'){ toast('That room already has two players.'); teardownNet(); return; }
    if(p.t==='hello'&&!theirPid){ theirPid=p.from; conn={open:true}; if(joinTimer){ clearTimeout(joinTimer); joinTimer=null; } $('netStatus').innerHTML=`Connected as <b>${esc(myName)}</b>.`; onData(p); setStartable(); return; }
    if(p.from!==theirPid) return; onData(p);
  }
}
function onData(m){
  if(!m||typeof m!=='object') return;
  switch(m.t){
    case 'hello': theirName=String(m.name||'Opponent').slice(0,18)||'Opponent'; theirUid=typeof m.uid==='string'?m.uid:null; theirElo=Number.isFinite(+m.elo)?+m.elo:null;
      $('peerLine').innerHTML=`<span class="pill on">${esc(theirName)} joined</span> ${theirUid?`<span class="pill gold">${esc(m.uname||'')} · ${theirElo??'?'} Elo</span>`:'<span class="pill">not signed in · unranked</span>'}`; setStartable(); break;
    case 'start': if(mode!=='guest') return; { const q=m.quiz; if(!q||typeof q!=='object') return;
      const quiz={id:String(q.id||'remote'),title:String(q.title||'Quiz').slice(0,80),desc:String(q.desc||'').slice(0,300),layout:['list','clued','table','jeop'].includes(q.layout)?q.layout:'list'};
      if(quiz.layout==='jeop'){ if(!Array.isArray(q.cats)) return; quiz.cats=q.cats.slice(0,6).map(c=>({title:String(c.title||'').slice(0,60),cells:(Array.isArray(c.cells)?c.cells:[]).slice(0,6).map(x=>({clue:String(x.clue||''),label:String(x.label||''),keys:(Array.isArray(x.keys)?x.keys:[]).map(String),v:+x.v||0}))})); }
      else if(quiz.layout==='table'){ if(!Array.isArray(q.rows)||!Array.isArray(q.cols)) return; quiz.cols=q.cols.slice(0,12).map(String); quiz.rows=q.rows.slice(0,200).map(r=>(Array.isArray(r)?r:[]).slice(0,13).map(String)); }
      else { if(!Array.isArray(q.items)) return; quiz.items=q.items.slice(0,2000).map(String); }
      beginGame({quiz,dur:Math.min(3600,Math.max(10,+m.dur||300)),online:true,matchId:String(m.matchId||rid()),rankedGame:!!m.ranked&&canRank(),gmode:['race','feud','jeop'].includes(m.gmode)?m.gmode:'race'}); } break;
    case 'score': if(game){ game.theirScore=Math.max(0,Math.min(game.items.length,+m.n||0)); game.theirDone=!!m.done; if(Array.isArray(m.f)) game.theirFound=new Set(m.f.map(x=>+x).filter(x=>x>=0&&x<game.items.length)); renderThem(); checkEnd(); } break;
    case 'giveup': if(game){ game.theirDone=true; if(game.mode==='race') game.theirScore=Math.max(0,+m.n||0); renderThem(); checkEnd(); } break;
    case 'rematch': if(mode==='guest') toast(`${theirName} wants a rematch.`); break;
    case 'claim': if(mode==='host'&&game&&!game.ended) claim(+m.i,2); break;
    case 'pick': if(mode==='host'&&game&&!game.ended&&game.mode==='jeop'&&game.turn===2) doPick(+m.i); break;
    case 'state': if(mode==='guest'&&game&&!game.ended) applyState(m); break;
  }
}
function nameOK(){ myName=($('myName').value.trim()||me?.username||'Player').slice(0,18); return true; }
$('btnHost').onclick=()=>{
  if(!netAvailable()){ toast('Online play unavailable. Use split-screen.'); return; }
  nameOK(); teardownNet(); mode='host';
  const abc='ABCDEFGHJKLMNPQRSTUVWXYZ'; roomCode=''; for(let i=0;i<4;i++) roomCode+=abc[Math.floor(Math.random()*abc.length)];
  $('netStatus').textContent='Opening room…';
  openChannel(roomCode,()=>{ $('roomBox').hidden=false; $('roomCode').textContent=roomCode; $('peerLine').textContent='Waiting for an opponent to join…'; $('netStatus').innerHTML=`Hosting as <b>${esc(myName)}</b>.`; setStartable(); });
};
function joinGame(code){
  if(!netAvailable()){ toast('Online play unavailable. Use split-screen.'); return; }
  code=String(code||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,4); if(code.length<4){ toast('Enter the 4-letter code.'); return; }
  nameOK(); teardownNet(); mode='guest'; roomCode=code; $('netStatus').textContent='Joining '+code+'…';
  openChannel(code,()=>{
    $('roomBox').hidden=false; $('roomCode').textContent=code; $('peerLine').textContent='Connecting…';
    let tries=0; const knock=()=>{ if(theirPid||mode!=='guest') return; sendTo(null,hello()); tries++; if(tries<8) joinTimer=setTimeout(knock,1200); else { toast('No game with that code. Ask the host to check it is still open.'); teardownNet(); } };
    knock();
  });
}
$('btnJoin').onclick=()=>joinGame($('joinCode').value);
$('joinCode').onkeydown=e=>{ if(e.key==='Enter') joinGame($('joinCode').value); };
$('btnLeave').onclick=teardownNet;
$('btnCopy').onclick=()=>{ const u=new URL(location.href); u.hash='join-'+roomCode; const t=u.toString(); navigator.clipboard?.writeText(t).then(()=>toast('Invite link copied.')).catch(()=>toast('Copy failed. Code: '+roomCode)); };
window.addEventListener('beforeunload',()=>{ if(chan){ try{ chan.untrack(); }catch(e){} } });

// ===================== GAME =====================
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function buildJeop(){
  const pool=shuffle(JEOP_CATS.map(id=>QUIZZES.find(q=>q.id===id)).filter(q=>q&&q.layout==='clued'&&parseItems(q).length>=5)).slice(0,5);
  const cats=pool.map(q=>{ const its=shuffle(parseItems(q)).slice(0,5); return {title:q.title,cells:its.map((it,i)=>({clue:it.clue,label:it.label,keys:it.keys,v:(i+1)*200}))}; });
  return {id:'jeop',title:'Jeopardy',desc:'Pick a square. Both of you see the clue; first correct answer takes the points. Whoever scores picks next.',layout:'jeop',cats};
}
$('btnStart').onclick=()=>{
  const quiz=pickQuiz(); const dur=+$('timeSel').value;
  if(mode==='host'){ const matchId=rid(); const rk=ranked(); send({t:'start',quiz:quizPayload(quiz),dur,matchId,ranked:rk,gmode:gtype}); beginGame({quiz,dur,online:true,matchId,rankedGame:rk,gmode:gtype}); }
  else beginGame({quiz,dur,online:false,gmode:gtype});
};
function amAuthority(){ return !game.online||mode==='host'; }
function beginGame(o){
  if(game?.timerId) clearInterval(game.timerId); if(game?.revealT) clearTimeout(game.revealT);
  const gm=o.gmode||(o.quiz.layout==='jeop'?'jeop':'race');
  game={...o, mode:gm, items:parseItems(o.quiz), found:new Set(), theirFound:new Set(), theirScore:0, done:false, theirDone:false, ended:false, startAt:Date.now()+3000, eloBefore:me?.elo??null,
        owner:[], phase:'board', pick:-1, turn:1, clueEnds:0, last:null};
  game.owner=game.items.map(()=>0);
  if(gm==='feud'){ const N=game.items.length; game.items.forEach((it,i)=>it.v=N-i); }
  const single=gm!=='race';
  $('lobby').hidden=true; $('results').hidden=true; $('arena').hidden=false;
  $('arenaQuiz').textContent=`${gm==='jeop'?'Jeopardy':gm==='feud'?'Top-'+game.items.length+' Feud: '+game.quiz.title:game.quiz.title} · ${game.items.length} ${gm==='jeop'?'clues':'answers'}`;
  $('arenaDesc').textContent=gm==='feud'?`Ranked list. #1 is worth ${game.items.length} points, #${game.items.length} is worth 1. Only the first player to type an answer gets it.`:(game.quiz.desc||'');
  $('arenaMode').textContent=game.solo?'Practice · solo · unranked':game.online?`Room ${roomCode} · ${game.rankedGame?'ranked':'unranked'}`:'Split screen · unranked';
  $('youName').textContent=game.solo?(me?.username||myName||'You'):game.online?myName:'Player 1'; $('themName').textContent=game.online?theirName:'Player 2';
  $('youSub').textContent=game.rankedGame?`${me.elo} Elo`:'you'; $('themSub').textContent=game.rankedGame?`${theirElo??'?'} Elo`:(game.online?'opponent':'');
  $('themInput').hidden=game.online||game.solo||single; $('themAnswers').hidden=game.solo||single; $('oppBig').hidden=!(game.online&&gm==='race'); $('themLast').hidden=game.online||game.solo||single;
  $('themPanel').hidden=!!game.solo||single; $('arena').classList.toggle('solo',!!game.solo||single); document.querySelector('.board .side.r').style.visibility=game.solo?'hidden':'';
  $('btnGiveUp').textContent=game.solo?'Give up (reveal answers)':'Give up';
  $('youInput').value=''; $('themInput').value=''; $('youLast').textContent=''; $('themLast').textContent=''; $('oppCount').textContent='0';
  $('youInput').placeholder=gm==='jeop'?'Type your answer when a clue is up…':'Type an answer…';
  $('youInput').disabled=true; $('themInput').disabled=true;
  render(); game.timerId=setInterval(tick,200); tick();
}
function tick(){
  if(!game||game.ended) return; const now=Date.now();
  if(now<game.startAt){ $('clock').textContent='0:0'+Math.ceil((game.startAt-now)/1000); $('clock').classList.remove('low'); return; }
  if($('youInput').disabled&&!game.done){ $('youInput').disabled=false; $('themInput').disabled=false; $('youInput').focus(); }
  const left=Math.max(0,Math.ceil((game.startAt+game.dur*1000-now)/1000));
  $('clock').textContent=fmt(left); $('clock').classList.toggle('low',left<=15);
  if(game.mode==='jeop'&&game.phase==='clue'){ const cl=Math.max(0,Math.ceil((game.clueEnds-now)/1000)); const el=$('clueLeft'); if(el) el.textContent=cl+'s'; if(amAuthority()&&cl<=0) resolveClue(game.pick,3); }
  if(left<=0) endGame('time');
}
// ---------- scoring ----------
function pts(who){ const g=game; if(!g) return 0;
  if(g.mode==='race') return who===1?g.found.size:(g.online?g.theirScore:g.theirFound.size);
  let s=0; g.owner.forEach((o,i)=>{ if(o===who) s+=(g.items[i].v||0); }); return s; }
// ---------- boards ----------
function tileHTML(it,got,cls,hide){ return `<div class="tile ${cls}">${it.clue?`<span class="c">${esc(it.clue)}</span>`:''}<span class="a">${got&&!hide?esc(it.label):'&nbsp;'}</span></div>`; }
// show(i) -> 'got' | 'missed' | 'shadow' | '' ; reveal=true shows labels for missed too; shadow = colored, no text
function boardHTML(show,reveal){
  const q=game.quiz, items=game.items;
  const vis=(st)=>st==='got'||(reveal&&st==='missed');
  const cell=(i)=>{ const st=show(i); return `<td class="a ${st}">${vis(st)?esc(items[i].label):'&nbsp;'}</td>`; };
  if(q.layout==='table'){
    let idx=0; let h='<div class="sq"><table><tr><th></th>'+q.cols.map(c=>`<th>${esc(c)}</th>`).join('')+'</tr>';
    q.rows.forEach(r=>{ h+=`<tr><td class="k">${esc(r[0])}</td>`; for(let c=1;c<r.length;c++){ h+=cell(idx++); } h+='</tr>'; });
    return h+'</table></div>';
  }
  if(q.layout==='clued'){
    const per=Math.max(8,Math.ceil(items.length/Math.max(1,Math.min(6,Math.ceil(items.length/14)))));
    let h='<div class="sq cols">';
    for(let s=0;s<items.length;s+=per){ h+='<div class="grp"><table>'; for(let i=s;i<Math.min(items.length,s+per);i++){ h+=`<tr><td class="k">${esc(items[i].clue)}</td>${cell(i)}</tr>`; } h+='</table></div>'; }
    return h+'</div>';
  }
  return '<div class="answers">'+items.map((it,i)=>{ const st=show(i); return tileHTML(it,vis(st),st,false); }).join('')+'</div>';
}
function feudHTML(reveal){
  const g=game; return '<div class="feud">'+g.items.map((it,i)=>{ const o=g.owner[i]; const show=o===1||o===2||reveal;
    return `<div class="fr o${o}"><span class="rk">#${i+1}</span><span class="fa">${show?esc(it.label):'&nbsp;'}</span><span class="fv">${it.v}</span></div>`; }).join('')+'</div>';
}
function jeopHTML(reveal){
  const g=game, q=g.quiz; const myTurn=g.phase==='board'&&!g.ended&&((amAuthority()&&g.turn===1)||(!amAuthority()&&g.turn===2)||g.solo||!g.online);
  let h='';
  if(g.phase!=='board'&&g.pick>=0){ const it=g.items[g.pick]; const o=g.owner[g.pick];
    h+=`<div class="cluebox ${g.phase}"><div class="eyebrow">${esc(it.cat)} · ${it.v}</div><div class="cluetext">${esc(it.clue)}</div>`+
       (g.phase==='clue'?`<div class="hint">First correct answer wins · <b id="clueLeft"></b></div>`:
        `<div class="hint">${o===3?'Time! The answer was':o===1?($('youName').textContent+' got it:'):($('themName').textContent+' got it:')} <b class="ans">${esc(it.label)}</b></div>`)+'</div>';
  } else if(!g.ended){ h+=`<div class="cluebox idle"><div class="hint">${myTurn?'Your pick — choose a square.':(g.online?`${$('themName').textContent} is picking…`:'Pick a square.')}</div></div>`; }
  h+='<div class="jb"><table><tr>'+q.cats.map(c=>`<th>${esc(c.title)}</th>`).join('')+'</tr>';
  for(let r=0;r<5;r++){ h+='<tr>'; q.cats.forEach((c,ci)=>{ const i=ci*5+r; const it=g.items[i]; if(!it){ h+='<td></td>'; return; } const o=g.owner[i];
    if(o===0&&!reveal) h+=`<td><button type="button" class="jcell${myTurn?'':' off'}" data-i="${i}">${it.v}</button></td>`;
    else h+=`<td class="jd o${o}"><span class="k">${esc(it.clue)}</span><span>${esc(it.label)}</span></td>`; }); h+='</tr>'; }
  return h+'</table></div>';
}
function render(){
  const g=game; if(!g) return;
  $('youPts').textContent=pts(1); $('themPts').textContent=pts(2);
  const tot=g.mode==='race'?g.items.length:g.items.reduce((n,it)=>n+(it.v||0),0);
  $('youBar').style.width=(100*pts(1)/tot)+'%'; $('themBar').style.width=(100*pts(2)/tot)+'%';
  if(g.mode==='race'){
    $('youAnswers').innerHTML=boardHTML(i=>g.found.has(i)?'got':'',false);
    if(g.online){ const s=g.theirScore; const c=$('oppCount'); if(c.textContent!==String(s)){ c.textContent=s; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
      $('themAnswers').innerHTML=boardHTML(i=>g.theirFound.has(i)?'shadow':'',false); }
    else if(!g.solo) $('themAnswers').innerHTML=boardHTML(i=>g.theirFound.has(i)?'got':'',false);
  } else if(g.mode==='feud'){ $('youAnswers').innerHTML=feudHTML(false); }
  else { $('youAnswers').innerHTML=jeopHTML(false); $('youAnswers').querySelectorAll('.jcell:not(.off)').forEach(b=>b.onclick=()=>pickCell(+b.dataset.i)); }
}
function renderYou(){ render(); } function renderThem(){ render(); }
// ---------- actions ----------
function tryMatch(input,who){
  const v=norm(input.value); if(!v) return; const g=game;
  if(g.mode==='race'){
    const set=who==='you'?g.found:g.theirFound; let hit=null,n=0;
    for(let i=0;i<g.items.length;i++){ if(set.has(i)) continue; if(g.items[i].keys.includes(v)){ set.add(i); hit=g.items[i].label; n++; } }
    if(!hit) return; flash(input); const msg='✓ '+hit+(n>1?` (×${n})`:'');
    if(who==='you'){ $('youLast').textContent=msg; render(); if(g.online) sendScore(); } else { $('themLast').textContent=msg; render(); }
    checkEnd(); return;
  }
  if(g.mode==='feud'){ const i=g.items.findIndex((it,k)=>g.owner[k]===0&&it.keys.includes(v)); if(i<0) return; flash(input); claim(i,who==='you'?1:2); return; }
  if(g.mode==='jeop'){ if(g.phase!=='clue'||g.pick<0) return; if(!g.items[g.pick].keys.includes(v)) return; flash(input); claim(g.pick,who==='you'?1:2); }
}
function flash(input){ input.value=''; input.classList.add('flash'); setTimeout(()=>input.classList.remove('flash'),250); }
function sendScore(){ send({t:'score',n:game.found.size,done:game.found.size===game.items.length,f:[...game.found]}); }
function claim(i,who){
  const g=game; if(!g||g.ended||!(i>=0&&i<g.items.length)) return;
  if(!amAuthority()&&who===1){ send({t:'claim',i}); $('youLast').textContent='✓ '+g.items[i].label+' — sent…'; return; }
  if(g.owner[i]!==0){ if(who===1) $('youLast').textContent='✗ '+g.items[i].label+' was already taken.'; return; }
  g.owner[i]=who; const line='✓ '+g.items[i].label+' (+'+g.items[i].v+')'; if(who===1) $('youLast').textContent=line; else if(!g.online) $('themLast').textContent=line;
  if(g.mode==='jeop') resolveClue(i,who); else { render(); broadcastState(); checkEnd(); }
}
function pickCell(i){ const g=game; if(!g||g.ended||g.mode!=='jeop'||g.phase!=='board'||g.owner[i]!==0) return;
  if(amAuthority()){ if(g.online&&g.turn!==1) return; doPick(i); } else { if(g.turn!==2) return; send({t:'pick',i}); } }
function doPick(i){ const g=game; if(g.phase!=='board'||g.owner[i]!==0) return; g.pick=i; g.phase='clue'; g.clueEnds=Date.now()+20000; $('youInput').value=''; $('youInput').focus(); render(); broadcastState(); }
function resolveClue(i,who){ const g=game; if(g.phase!=='clue') return; g.owner[i]=who; g.phase='reveal'; if(who===1||who===2) g.turn=who; render(); broadcastState();
  g.revealT=setTimeout(()=>{ if(!game||game.ended) return; game.phase='board'; game.pick=-1; render(); broadcastState(); checkEnd(); },2400); }
function broadcastState(){ const g=game; if(!g.online||mode!=='host') return; send({t:'state',owner:g.owner,phase:g.phase,pick:g.pick,turn:g.turn,left:Math.max(0,g.clueEnds-Date.now())}); }
function applyState(m){ const g=game; if(!Array.isArray(m.owner)||m.owner.length!==g.items.length) return;
  const prevPhase=g.phase; g.owner=m.owner.map(x=>+x||0); g.phase=['board','clue','reveal'].includes(m.phase)?m.phase:'board'; g.pick=+m.pick; g.turn=+m.turn===2?2:1; g.clueEnds=Date.now()+(+m.left||0);
  if(g.phase==='clue'&&prevPhase!=='clue'){ $('youInput').value=''; $('youInput').focus(); }
  render(); checkEnd(); }
$('youInput').addEventListener('input',e=>{ if(game&&!game.ended&&!game.done) tryMatch(e.target,'you'); });
$('themInput').addEventListener('input',e=>{ if(game&&!game.ended&&!game.online) tryMatch(e.target,'them'); });
function checkEnd(){
  if(!game||game.ended) return; const g=game;
  if(g.mode!=='race'){ const all=g.owner.every(o=>o!==0); if(all&&g.phase==='board'){ if(amAuthority()) endGame('clear'); else if(!g.online) endGame('clear'); } if(g.online&&g.done&&g.theirDone) endGame('both'); return; }
  const meDone=g.done||g.found.size===g.items.length;
  const them=g.online?g.theirDone:(g.theirFound.size===g.items.length);
  if(g.solo){ if(meDone) endGame('clear'); return; }
  if(!g.online){ if(meDone||them) endGame('clear'); return; }
  if(meDone&&them) endGame('both');
}
$('btnGiveUp').onclick=()=>{ if(!game||game.ended) return; game.done=true; $('youInput').disabled=true;
  if(game.online){ send({t:'giveup',n:pts(1)}); $('youLast').textContent='You stopped. Waiting for '+theirName+'…'; checkEnd(); }
  else endGame('giveup'); };
async function endGame(reason){
  if(!game||game.ended) return; game.ended=true; clearInterval(game.timerId); if(game.revealT) clearTimeout(game.revealT);
  const you=pts(1), them=pts(2);
  const yn=$('youName').textContent, tn=$('themName').textContent;
  $('arena').hidden=true; $('results').hidden=false;
  $('resQuiz').textContent=(game.mode==='jeop'?'Jeopardy':game.mode==='feud'?'Feud · '+game.quiz.title:game.quiz.title)+(game.rankedGame?' · ranked':'');
  $('resYou').textContent=you; $('resThem').textContent=them; $('resYouName').textContent=yn; $('resThemName').textContent=tn;
  const v=$('verdict'); v.className='';
  const tot=game.mode==='race'?game.items.length:game.items.reduce((n,it)=>n+(it.v||0),0);
  if(game.solo){ const pct=Math.round(100*you/tot); v.textContent=you===tot?'Perfect!':pct>=80?'Great run':pct>=50?'Solid':'Keep studying'; v.classList.add('home');
    $('resThem').parentElement.style.visibility='hidden'; $('resDetail').textContent=(reason==='time'?'Buzzer. ':'')+`${you} of ${tot} (${pct}%). Practice mode, unranked.`; }
  else { $('resThem').parentElement.style.visibility=''; v.textContent= you>them?`${yn} wins`: them>you?`${tn} wins`:'Draw'; if(you>them) v.classList.add('home'); if(them>you) v.classList.add('away');
    $('resDetail').textContent=(reason==='time'?'Buzzer. ':'')+`${you} to ${them}${game.mode==='race'?`, out of ${tot}`:' points'}.`; }
  $('resAnswers').innerHTML=game.mode==='race'?boardHTML(i=>game.found.has(i)?'got':'missed',true):game.mode==='feud'?feudHTML(true):jeopHTML(true);
  $('resKey').textContent=game.mode==='race'?'Blue: you got it. Red: you missed it.':'Blue: yours. Red: theirs. Grey: nobody.';
  if(game.online&&!game.done) send(game.mode==='race'?{t:'score',n:you,done:true,f:[...game.found]}:{t:'giveup',n:you});
  $('resElo').hidden=true; $('resEloHint').textContent='';
  if(game.rankedGame && sb && me && theirUid){ reportMatch(game.matchId, game.quiz.title, theirUid, you, them); }
  else if(game.online && sb && !game.rankedGame){ $('resEloHint').textContent='Unranked game. Both players must be signed in for Elo.'; }
}
async function reportMatch(matchId, quiz, opp, my, their){
  $('resEloHint').textContent='Reporting result…';
  let tries=0;
  const poll=async()=>{
    tries++;
    const {data,error}=await sb.rpc('report_match',{p_match:matchId,p_quiz:quiz,p_opp:opp,p_my:my,p_their:their});
    if(error){ $('resEloHint').textContent='Could not report: '+error.message; return; }
    const m=Array.isArray(data)?data[0]:data;
    if(m&&m.applied){
      const isA=m.a===me.id; const before=isA?m.a_elo_before:m.b_elo_before, after=isA?m.a_elo_after:m.b_elo_after; const d=after-before;
      const el=$('resElo'); el.hidden=false; el.textContent=`${d>=0?'+':''}${d} Elo → ${after}`; el.className='elochg '+(d>0?'up':d<0?'down':'');
      $('resEloHint').textContent=`Rated against ${theirName} (${isA?m.b_elo_before:m.a_elo_before}).`;
      await loadMe(); announce(); return;
    }
    if(m&&m.conflict){ $('resEloHint').textContent='Scores reported by the two players did not match. Game not rated.'; return; }
    if(tries<12){ $('resEloHint').textContent='Waiting for opponent to confirm the score…'; setTimeout(poll,2500); }
    else $('resEloHint').textContent='Opponent never confirmed. It will rate when they do.';
  };
  poll();
}
$('btnBack').onclick=()=>{ $('results').hidden=true; $('lobby').hidden=false; game=null; setStartable(); };
$('btnRematch').onclick=()=>{ if(game&&game.solo){ const gm=game.mode; const q=gm==='jeop'?buildJeop():(QUIZZES.find(x=>x.id===game.quiz.id)||game.quiz); const d=game.dur; game=null; beginGame({quiz:q,dur:d,online:false,solo:true,gmode:gm}); return; }
  $('results').hidden=true; $('lobby').hidden=false; game=null; if(mode==='guest') send({t:'rematch'}); setStartable(); $('btnStart').focus(); };

// ===================== BOOT =====================
fillTimes(QUIZZES[0].t); renderLib(); setStartable(); renderMe(); loadMe(); $('footLine').textContent=`Hoop Versus · ${QUIZZES.length} NBA quizzes · 3 game modes · Elo ranked`;
$('netStatus').textContent = netAvailable() ? 'Ready to host or join.' : 'Online play unavailable (no database connected). Split-screen works.';
const h=location.hash.match(/^#join-([A-Za-z0-9]{4})$/); if(h){ $('joinCode').value=h[1].toUpperCase(); setTimeout(()=>joinGame(h[1]),300); }
