// ===================== HELPERS =====================
const $=id=>document.getElementById(id);
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'');
function parseAns(rest){ const parts=String(rest).split('/').map(x=>x.trim()).filter(Boolean); return {label:parts[0]||'?',keys:parts.map(norm)}; }
function parseItems(q){
  if(q.layout==='table'){ const out=[]; (q.rows||[]).forEach((row,r)=>{ row.slice(1).forEach((cell,c)=>{ out.push({...parseAns(cell),clue:row[0]+' '+(q.cols[c]||''),r,c}); }); }); return out; }
  return (q.items||[]).map(line=>{ let clue=''; let rest=line; const p=line.indexOf('|'); if(p>-1){ clue=line.slice(0,p).trim(); rest=line.slice(p+1); } return {clue,...parseAns(rest)}; });
}
function quizSize(q){ return q.layout==='table' ? (q.rows||[]).reduce((n,r)=>n+r.length-1,0) : (q.items||[]).length; }
function quizPayload(q){ return {id:q.id,title:q.title,desc:q.desc||'',layout:q.layout||'list',items:q.items||null,cols:q.cols||null,rows:q.rows||null}; }
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
  if(me){ $('meUser').textContent=me.username; $('meElo').textContent=me.elo; $('meRec').textContent=`${me.wins}W · ${me.losses}L · ${me.draws}D`;
    if(!$('myName').value.trim()){ $('myName').value=me.username; } }
  loadLeaderboard(); loadHistory(); setStartable();
}
async function loadLeaderboard(){
  if(!sb){ $('lbBody').textContent='Connect a database to turn on rankings.'; return; }
  const {data,error}=await sb.from('profiles').select('id,username,elo,wins,losses,draws').order('elo',{ascending:false}).limit(25);
  if(error||!data){ $('lbBody').textContent='Leaderboard unavailable.'; return; }
  if(!data.length){ $('lbBody').textContent='Nobody ranked yet. Be first.'; return; }
  let html='<table class="lbt"><tr><th>#</th><th>Player</th><th>W-L</th><th style="text-align:right">Elo</th></tr>';
  data.forEach((p,i)=>{ html+=`<tr class="${me&&p.id===me.id?'me':''}"><td class="r">${i+1}</td><td class="u">${esc(p.username)}</td><td class="r">${p.wins}-${p.losses}</td><td class="e">${p.elo}</td></tr>`; });
  $('lbBody').innerHTML=html+'</table>';
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
    $('authModal').hidden=true; await loadMe(); toast(`Signed in as ${me?.username||'player'}.`);
  }catch(e){ $('auErr').textContent=e.message||'Something went wrong.'; }
};
$('btnSignOut').onclick=async()=>{ if(sb) await sb.auth.signOut(); me=null; renderMe(); };
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
const CATS=['All','Teams','Champions','Awards','Records','Draft','Tables','Lists','Mine'];
function renderChips(){ $('libChips').innerHTML=CATS.map(c=>`<button type="button" class="${libCat===c?'on':''}" data-c="${c}">${c}</button>`).join('');
  $('libChips').querySelectorAll('button').forEach(b=>b.onclick=()=>{ libCat=b.dataset.c; renderLib(); }); }
function renderLib(){
  const lib=$('lib'); lib.innerHTML=''; renderChips();
  const q0=libQ.toLowerCase();
  const list=QUIZZES.filter(q=>(libCat==='All'||(libCat==='Mine'?q.custom:(q.cat||'Lists')===libCat)) && (!q0||(q.title+' '+(q.desc||'')).toLowerCase().includes(q0)));
  $('libCount').textContent=list.length+' / '+QUIZZES.length;
  list.forEach(q=>{ const b=document.createElement('button'); b.className='q'+(q.id===selected?' on':''); b.type='button';
    b.innerHTML=`<span class="n">${esc(q.title)}</span><span class="d">${esc(q.desc||'')}</span><small>${quizSize(q)} answers · ${fmt(q.t||300)} · ${esc(q.cat||(q.custom?'Mine':'Lists'))}</small>`;
    b.onclick=()=>{ selected=q.id; fillTimes(q.t||300); renderLib(); }; lib.appendChild(b); });
  const sel=QUIZZES.find(q=>q.id===selected); $('selDesc').textContent=sel?(sel.desc||sel.title):'';
}
$('libSearch').oninput=e=>{ libQ=e.target.value; renderLib(); };
$('btnPractice').onclick=()=>{ const quiz=QUIZZES.find(q=>q.id===selected); beginGame({quiz,dur:+$('timeSel').value,online:false,solo:true}); };
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
      const quiz={id:String(q.id||'remote'),title:String(q.title||'Quiz').slice(0,80),desc:String(q.desc||'').slice(0,300),layout:['list','clued','table'].includes(q.layout)?q.layout:'list'};
      if(quiz.layout==='table'){ if(!Array.isArray(q.rows)||!Array.isArray(q.cols)) return; quiz.cols=q.cols.slice(0,12).map(String); quiz.rows=q.rows.slice(0,200).map(r=>(Array.isArray(r)?r:[]).slice(0,13).map(String)); }
      else { if(!Array.isArray(q.items)) return; quiz.items=q.items.slice(0,2000).map(String); }
      beginGame({quiz,dur:Math.min(3600,Math.max(10,+m.dur||300)),online:true,matchId:String(m.matchId||rid()),rankedGame:!!m.ranked&&canRank()}); } break;
    case 'score': if(game){ game.theirScore=Math.max(0,Math.min(game.items.length,+m.n||0)); game.theirDone=!!m.done; renderThem(); checkEnd(); } break;
    case 'giveup': if(game){ game.theirDone=true; game.theirScore=Math.max(0,+m.n||0); renderThem(); checkEnd(); } break;
    case 'rematch': if(mode==='guest') toast(`${theirName} wants a rematch.`); break;
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
$('btnStart').onclick=()=>{
  const quiz=QUIZZES.find(q=>q.id===selected); const dur=+$('timeSel').value;
  if(mode==='host'){ const matchId=rid(); const rk=ranked(); send({t:'start',quiz:quizPayload(quiz),dur,matchId,ranked:rk}); beginGame({quiz,dur,online:true,matchId,rankedGame:rk}); }
  else beginGame({quiz,dur,online:false});
};
function beginGame(o){
  if(game?.timerId) clearInterval(game.timerId);
  game={...o, items:parseItems(o.quiz), found:new Set(), theirFound:new Set(), theirScore:0, done:false, theirDone:false, ended:false, startAt:Date.now()+3000, eloBefore:me?.elo??null};
  $('lobby').hidden=true; $('results').hidden=true; $('arena').hidden=false;
  $('arenaQuiz').textContent=`${game.quiz.title} · ${game.items.length} answers`;
  $('arenaDesc').textContent=game.quiz.desc||'';
  $('arenaMode').textContent=game.solo?'Practice · solo · unranked':game.online?`Room ${roomCode} · ${game.rankedGame?'ranked':'unranked'}`:'Split screen · unranked';
  $('youName').textContent=game.solo?(me?.username||myName||'You'):game.online?myName:'Player 1'; $('themName').textContent=game.online?theirName:'Player 2';
  $('youSub').textContent=game.rankedGame?`${me.elo} Elo`:'you'; $('themSub').textContent=game.rankedGame?`${theirElo??'?'} Elo`:(game.online?'opponent':'');
  $('themInput').hidden=game.online||game.solo; $('themAnswers').hidden=game.online||game.solo; $('oppBig').hidden=!game.online; $('themLast').hidden=game.online||game.solo;
  $('themPanel').hidden=!!game.solo; $('arena').classList.toggle('solo',!!game.solo); document.querySelector('.board .side.r').style.visibility=game.solo?'hidden':'';
  $('btnGiveUp').textContent=game.solo?'Give up (reveal answers)':'Give up';
  $('youInput').value=''; $('themInput').value=''; $('youLast').textContent=''; $('themLast').textContent=''; $('oppCount').textContent='0';
  $('youInput').disabled=true; $('themInput').disabled=true;
  renderYou(); renderThem();
  game.timerId=setInterval(tick,200); tick();
}
function tick(){
  if(!game||game.ended) return; const now=Date.now();
  if(now<game.startAt){ $('clock').textContent='0:0'+Math.ceil((game.startAt-now)/1000); $('clock').classList.remove('low'); return; }
  if($('youInput').disabled&&!game.done){ $('youInput').disabled=false; $('themInput').disabled=false; $('youInput').focus(); }
  const left=Math.max(0,Math.ceil((game.startAt+game.dur*1000-now)/1000));
  $('clock').textContent=fmt(left); $('clock').classList.toggle('low',left<=15);
  if(left<=0) endGame('time');
}
function tileHTML(it,got,cls){ return `<div class="tile ${cls}">${it.clue?`<span class="c">${esc(it.clue)}</span>`:''}<span class="a">${got?esc(it.label):'&nbsp;'}</span></div>`; }
// Render an answer board. show(i) -> 'got' | 'missed' | '' ; reveal=true shows labels for missed too
function boardHTML(show,reveal){
  const q=game.quiz, items=game.items;
  const cell=(i)=>{ const st=show(i); const vis=st==='got'||(reveal&&st==='missed'); return `<td class="a ${st}">${vis?esc(items[i].label):'&nbsp;'}</td>`; };
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
  return '<div class="answers">'+items.map((it,i)=>{ const st=show(i); return tileHTML(it,st==='got'||(reveal&&st==='missed'),st); }).join('')+'</div>';
}
function tryMatch(input,who){
  const v=norm(input.value); if(!v) return;
  const set=who==='you'?game.found:game.theirFound;
  let hit=null, n=0;
  for(let i=0;i<game.items.length;i++){ if(set.has(i)) continue; if(game.items[i].keys.includes(v)){ set.add(i); hit=game.items[i].label; n++; } }
  if(!hit) return;
  input.value=''; input.classList.add('flash'); setTimeout(()=>input.classList.remove('flash'),250);
  const msg='✓ '+hit+(n>1?` (×${n})`:'');
  if(who==='you'){ $('youLast').textContent=msg; renderYou(); if(game.online) send({t:'score',n:game.found.size,done:game.found.size===game.items.length}); }
  else { $('themLast').textContent=msg; renderThem(); }
  checkEnd();
}
$('youInput').addEventListener('input',e=>{ if(game&&!game.ended&&!game.done) tryMatch(e.target,'you'); });
$('themInput').addEventListener('input',e=>{ if(game&&!game.ended&&!game.online) tryMatch(e.target,'them'); });
function renderYou(){
  $('youPts').textContent=game.found.size; $('youBar').style.width=(100*game.found.size/game.items.length)+'%';
  $('youAnswers').innerHTML=boardHTML(i=>game.found.has(i)?'got':'',false);
}
function renderThem(){
  const s=game.online?game.theirScore:game.theirFound.size;
  $('themPts').textContent=s; $('themBar').style.width=(100*s/game.items.length)+'%';
  if(game.online){
    const c=$('oppCount'); if(c.textContent!==String(s)){ c.textContent=s; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
  } else {
    if(!game.solo) $('themAnswers').innerHTML=boardHTML(i=>game.theirFound.has(i)?'got':'',false);
  }
}
function checkEnd(){
  if(!game||game.ended) return;
  const meDone=game.done||game.found.size===game.items.length;
  const them=game.online?game.theirDone:(game.theirFound.size===game.items.length);
  if(game.solo){ if(meDone) endGame('clear'); return; }
  if(!game.online){ if(meDone||them) endGame('clear'); return; }
  if(meDone&&them) endGame('both');
}
$('btnGiveUp').onclick=()=>{ if(!game||game.ended) return; game.done=true; $('youInput').disabled=true;
  if(game.online){ send({t:'giveup',n:game.found.size}); $('youLast').textContent='You stopped. Waiting for '+theirName+'…'; checkEnd(); }
  else endGame('giveup'); };
async function endGame(reason){
  if(!game||game.ended) return; game.ended=true; clearInterval(game.timerId);
  const you=game.found.size, them=game.online?game.theirScore:game.theirFound.size;
  const yn=$('youName').textContent, tn=$('themName').textContent;
  $('arena').hidden=true; $('results').hidden=false;
  $('resQuiz').textContent=game.quiz.title+(game.rankedGame?' · ranked':''); $('resYou').textContent=you; $('resThem').textContent=them;
  $('resYouName').textContent=yn; $('resThemName').textContent=tn;
  const v=$('verdict'); v.className='';
  if(game.solo){ const pct=Math.round(100*you/game.items.length); v.textContent=you===game.items.length?'Perfect!':pct>=80?'Great run':pct>=50?'Solid':'Keep studying'; v.classList.add('home');
    $('resThem').parentElement.style.visibility='hidden'; $('resDetail').textContent=(reason==='time'?'Buzzer. ':'')+`${you} of ${game.items.length} (${pct}%). Practice mode, unranked.`; }
  else { $('resThem').parentElement.style.visibility=''; v.textContent= you>them?`${yn} wins`: them>you?`${tn} wins`:'Draw'; if(you>them) v.classList.add('home'); if(them>you) v.classList.add('away');
    $('resDetail').textContent=(reason==='time'?'Buzzer. ':'')+`${you} to ${them}, out of ${game.items.length}.`; }
  $('resAnswers').innerHTML=boardHTML(i=>game.found.has(i)?'got':'missed',true);
  if(game.online&&!game.done) send({t:'score',n:you,done:true});
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
      await loadMe(); return;
    }
    if(m&&m.conflict){ $('resEloHint').textContent='Scores reported by the two players did not match. Game not rated.'; return; }
    if(tries<12){ $('resEloHint').textContent='Waiting for opponent to confirm the score…'; setTimeout(poll,2500); }
    else $('resEloHint').textContent='Opponent never confirmed. It will rate when they do.';
  };
  poll();
}
$('btnBack').onclick=()=>{ $('results').hidden=true; $('lobby').hidden=false; game=null; setStartable(); };
$('btnRematch').onclick=()=>{ if(game&&game.solo){ const q=QUIZZES.find(x=>x.id===game.quiz.id)||game.quiz; const d=game.dur; game=null; beginGame({quiz:q,dur:d,online:false,solo:true}); return; }
  $('results').hidden=true; $('lobby').hidden=false; game=null; if(mode==='guest') send({t:'rematch'}); setStartable(); $('btnStart').focus(); };

// ===================== BOOT =====================
fillTimes(QUIZZES[0].t); renderLib(); setStartable(); renderMe(); loadMe();
$('netStatus').textContent = netAvailable() ? 'Ready to host or join.' : 'Online play unavailable (no database connected). Split-screen works.';
const h=location.hash.match(/^#join-([A-Za-z0-9]{4})$/); if(h){ $('joinCode').value=h[1].toUpperCase(); setTimeout(()=>joinGame(h[1]),300); }
