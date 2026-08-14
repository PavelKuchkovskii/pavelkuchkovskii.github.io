const APP_VERSION = '1.0.0';
const DB_NAME = 'form90';
const DB_VERSION = 1;
const ACCENT = '#10a37f';

const defaultSettings = {
  id: 'user', age: 33, heightCm: 186, startWeightKg: 82, goalWeightKg: 90,
  waistCm: null, startDate: new Date().toISOString().slice(0,10), preferredDays: [1,3,5],
  currentWeek: 1, currentWorkout: 'A', units: 'kg', timerSound: true,
  timerVibration: true, onboardingDone: false, schemaVersion: 1
};

const exercises = {
  hack: { name: 'Hack squat / присед в Смите', muscle: 'Квадрицепсы', loadMode: 'external', rest: 150, step: 5, tip: 'Контролируй глубину, не отрывай таз и пятки.' },
  bench: { name: 'Жим штанги лёжа', muscle: 'Грудь', loadMode: 'external', rest: 90, step: 2.5, tip: 'Лопатки сведены, стопы устойчивы, без технического отказа.' },
  chestRow: { name: 'Тяга с упором грудью', muscle: 'Спина', loadMode: 'external', rest: 90, step: 2.5, tip: 'Не отрывай грудь от опоры, тяни локтями назад.' },
  legCurlSit: { name: 'Сгибание ног сидя', muscle: 'Бицепс бедра', loadMode: 'external', rest: 75, step: 5, tip: 'Сохраняй таз прижатым, контролируй негатив.' },
  lateralCable: { name: 'Отведение руки в сторону на блоке', muscle: 'Средняя дельта', loadMode: 'external', rest: 75, step: 1, tip: 'Не пожимай плечом; веди локтем в сторону.' },
  inclineCurl: { name: 'Сгибание рук с гантелями на наклонной', muscle: 'Бицепс', loadMode: 'dumbbell', rest: 75, step: 2, tip: 'Плечо остаётся позади корпуса, без раскачки.' },
  tricepsPush: { name: 'Разгибание рук с канатом', muscle: 'Трицепс', loadMode: 'external', rest: 75, step: 2.5, tip: 'Локти фиксированы у корпуса.' },
  cableCrunch: { name: 'Скручивания на верхнем блоке', muscle: 'Пресс', loadMode: 'external', rest: 60, step: 2.5, tip: 'Сближай рёбра и таз, не просто наклоняй корпус.' },
  calfStand: { name: 'Подъём на носки стоя', muscle: 'Икры', loadMode: 'external', rest: 60, step: 5, tip: 'Пауза в растяжении и полное сокращение.' },
  rdl: { name: 'Румынская тяга со штангой', muscle: 'Задняя цепь', loadMode: 'external', rest: 150, step: 5, tip: 'Таз назад, штанга близко к ногам, спина нейтральна.' },
  inclinePress: { name: 'Жим гантелей 20–30°', muscle: 'Верх груди', loadMode: 'dumbbell', rest: 90, step: 2, tip: 'Низкий наклон сохраняет акцент на верхе груди.' },
  pullup: { name: 'Подтягивания нейтральным хватом / верхняя тяга', muscle: 'Широчайшие', loadMode: 'body', rest: 90, step: 2.5, tip: 'Без раскачки. При 10 чистых повторах добавляй вес.' },
  legPress: { name: 'Жим ногами', muscle: 'Квадрицепсы', loadMode: 'external', rest: 120, step: 5, tip: 'Не отрывай таз от спинки, контролируй нижнюю точку.' },
  lateral: { name: 'Разведения на среднюю дельту', muscle: 'Средняя дельта', loadMode: 'dumbbell', rest: 75, step: 2, tip: 'Держи постоянное напряжение, не читингуй корпусом.' },
  reverseFly: { name: 'Обратная бабочка', muscle: 'Задняя дельта', loadMode: 'external', rest: 75, step: 2.5, tip: 'Локти слегка согнуты, работай задней дельтой.' },
  preacher: { name: 'Сгибание рук на скамье Скотта', muscle: 'Бицепс', loadMode: 'external', rest: 75, step: 2.5, tip: 'Не отрывай плечо от опоры.' },
  overheadTri: { name: 'Разгибание рук над головой на блоке', muscle: 'Трицепс', loadMode: 'external', rest: 75, step: 2.5, tip: 'Полное растяжение длинной головки трицепса.' },
  hangingLeg: { name: 'Подъём коленей / прямых ног в висе', muscle: 'Пресс', loadMode: 'bodyOnly', rest: 60, step: 0, tip: 'Подкручивай таз вверху, исключи раскачку.' },
  bulgarian: { name: 'Болгарский присед в Смите', muscle: 'Ноги', loadMode: 'external', rest: 120, step: 5, tip: 'Повторы считаются на каждую ногу.' },
  dips: { name: 'Отжимания на брусьях', muscle: 'Грудь / трицепс', loadMode: 'body', rest: 90, step: 2.5, tip: 'Небольшой наклон корпуса, комфортная глубина.' },
  lowRow: { name: 'Горизонтальная тяга узким нейтральным хватом', muscle: 'Широчайшие', loadMode: 'external', rest: 90, step: 2.5, tip: 'Тяни к нижней части живота, локти близко к корпусу.' },
  legCurl: { name: 'Сгибание ног лёжа', muscle: 'Бицепс бедра', loadMode: 'external', rest: 75, step: 2.5, tip: 'Не отрывай таз, медленно опускай вес.' },
  hammer: { name: 'Сгибание рук молотком', muscle: 'Бицепс / брахиалис', loadMode: 'dumbbell', rest: 75, step: 2, tip: 'Нейтральный хват, без раскачки.' },
  abWheel: { name: 'Ролик для пресса с колен', muscle: 'Пресс', loadMode: 'bodyOnly', rest: 60, step: 0, tip: 'Не проваливай поясницу, держи рёбра опущенными.' },
  calfSit: { name: 'Подъём на носки сидя', muscle: 'Икры', loadMode: 'external', rest: 60, step: 5, tip: 'Полная амплитуда и пауза наверху.' }
};

const baseWorkouts = {
  A: [
    ['1','hack',3,6,10,150], ['2A','bench',3,6,10,90], ['2B','chestRow',3,8,12,90],
    ['3A','legCurlSit',2,10,15,75], ['3B','lateralCable',3,12,20,75],
    ['4A','inclineCurl',2,8,12,75], ['4B','tricepsPush',2,10,15,75],
    ['5A','cableCrunch',2,10,15,60], ['5B','calfStand',2,10,20,60]
  ],
  B: [
    ['1','rdl',3,6,10,150], ['2A','inclinePress',3,8,12,90], ['2B','pullup',3,6,10,90],
    ['3','legPress',3,10,15,120], ['4A','lateral',2,12,20,75], ['4B','reverseFly',2,12,20,75],
    ['5A','preacher',2,8,12,75], ['5B','overheadTri',2,10,15,75], ['6','hangingLeg',2,8,15,60]
  ],
  C: [
    ['1','bulgarian',2,8,12,120], ['2A','dips',3,6,10,90], ['2B','lowRow',3,8,12,90],
    ['3A','legCurl',2,10,15,75], ['3B','lateralCable',3,12,20,75],
    ['4A','hammer',2,8,12,75], ['4B','overheadTri',2,10,15,75],
    ['5A','abWheel',2,6,12,60], ['5B','calfSit',2,12,20,60]
  ]
};

function workoutFor(week, code) {
  const isDeload = week === 8 || week === 16;
  return baseWorkouts[code].map((row, index) => {
    let [block,id,sets,min,max,rest] = row;
    if (week === 1) sets = index < 3 ? 2 : 1;
    else if (week === 2) sets = 2;
    if (week >= 9 && week <= 15 && code === 'A' && id === 'bench') sets = 4;
    if (week >= 9 && week <= 15 && code === 'B' && id === 'pullup') sets = 4;
    if (week >= 13 && week <= 15) {
      if (['hack','rdl'].includes(id)) { min = 5; max = 8; }
      if (id === 'bench') { min = 5; max = 8; }
      if (id === 'inclinePress') { min = 6; max = 10; }
      if (id === 'pullup') { min = 5; max = 8; }
      if (id === 'dips') { min = 5; max = 8; }
      if (['chestRow','lowRow'].includes(id)) { min = 6; max = 10; }
      if (id === 'legPress') { min = 8; max = 12; }
    }
    if (isDeload) sets = Math.max(1, Math.ceil(sets / 2));
    const targetRir = isDeload ? '4+' : week === 1 ? '4+' : week === 2 ? '3' : week <= 4 ? '2-3' : '1-2';
    return { block, id, sets, min, max, rest, targetRir, ...exercises[id] };
  });
}

function phaseForWeek(week) {
  if (week <= 4) return 'Возвращение после перерыва';
  if (week <= 7) return 'Базовая гипертрофия';
  if (week === 8) return 'Разгрузка';
  if (week <= 12) return 'Специализация груди и спины';
  if (week <= 15) return 'Рост рабочих весов';
  return 'Разгрузка и оценка';
}

function esc(s='') { return String(s).replace(/[&<>'\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c])); }
function fmtDate(v) { if (!v) return '—'; return new Intl.DateTimeFormat('ru-RU',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(v)); }
function todayISO() { return new Date().toISOString().slice(0,10); }
function uid() { return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function clamp(n,a,b){ return Math.max(a,Math.min(b,n)); }
function fmtDuration(sec){ const m=Math.floor(sec/60); const s=Math.floor(sec%60); return `${m}:${String(s).padStart(2,'0')}`; }

let db;
let state = { settings: {...defaultSettings}, route: 'today', activeSession: null, timer: null, timerEndsAt: 0, workoutTicker: null };

function openDB() {
  return new Promise((resolve,reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const d = req.result;
      if (!d.objectStoreNames.contains('settings')) d.createObjectStore('settings',{keyPath:'id'});
      if (!d.objectStoreNames.contains('sessions')) { const s=d.createObjectStore('sessions',{keyPath:'id'}); s.createIndex('completedAt','completedAt'); }
      if (!d.objectStoreNames.contains('metrics')) { const s=d.createObjectStore('metrics',{keyPath:'id'}); s.createIndex('date','date'); }
      if (!d.objectStoreNames.contains('drafts')) d.createObjectStore('drafts',{keyPath:'id'});
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idb(store, mode='readonly') { return db.transaction(store,mode).objectStore(store); }
function getOne(store,key) { return new Promise((res,rej)=>{ const r=idb(store).get(key); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); }); }
function putOne(store,val) { return new Promise((res,rej)=>{ const r=idb(store,'readwrite').put(val); r.onsuccess=()=>res(val); r.onerror=()=>rej(r.error); }); }
function delOne(store,key) { return new Promise((res,rej)=>{ const r=idb(store,'readwrite').delete(key); r.onsuccess=()=>res(); r.onerror=()=>rej(r.error); }); }
function getAll(store) { return new Promise((res,rej)=>{ const r=idb(store).getAll(); r.onsuccess=()=>res(r.result||[]); r.onerror=()=>rej(r.error); }); }
function clearStore(store) { return new Promise((res,rej)=>{ const r=idb(store,'readwrite').clear(); r.onsuccess=()=>res(); r.onerror=()=>rej(r.error); }); }

async function saveSettings() { await putOne('settings', state.settings); }

function icon(name) {
  const map = { today:'⌂', program:'▤', progress:'↗', more:'•••', history:'↺', settings:'⚙', play:'▶', back:'‹', check:'✓', plus:'＋', download:'⇩', upload:'⇧' };
  return `<span aria-hidden="true">${map[name]||'•'}</span>`;
}

function nav() {
  const items = [['today','Сегодня','today'],['program','Программа','program'],['progress','Прогресс','progress'],['more','Ещё','more']];
  return `<nav class="bottom-nav">${items.map(([r,l,i])=>`<button class="nav-item ${state.route===r?'active':''}" data-route="${r}"><span class="nav-icon">${icon(i)}</span><span>${l}</span></button>`).join('')}</nav>`;
}
function sidebar() {
  const items=[['today','Сегодня'],['program','Программа'],['history','История'],['progress','Прогресс'],['settings','Настройки']];
  return `<aside class="sidebar"><div class="brand"><div class="brand-mark">90</div>Form90</div><div class="side-nav">${items.map(([r,l])=>`<button class="side-link ${state.route===r?'active':''}" data-route="${r}">${l}</button>`).join('')}</div><div class="side-foot">Локальные данные · v${APP_VERSION}</div></aside>`;
}

function shell(content) { return `<div class="app-shell">${sidebar()}<main class="main">${content}</main>${nav()}</div>`; }

async function render() {
  if (state.route === 'workout' && state.activeSession) return renderWorkout();
  const app=document.getElementById('app');
  let html='';
  if(state.route==='today') html=await pageToday();
  else if(state.route==='program') html=await pageProgram();
  else if(state.route==='progress') html=await pageProgress();
  else if(state.route==='history') html=await pageHistory();
  else if(state.route==='settings') html=await pageSettings();
  else html=await pageMore();
  app.innerHTML=shell(html);
  bindGlobal();
}

async function pageToday() {
  const sessions=(await getAll('sessions')).filter(s=>s.status==='completed').sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt));
  const metrics=(await getAll('metrics')).sort((a,b)=>new Date(a.date)-new Date(b.date));
  const lastMetric=metrics.at(-1);
  const latestWeight=lastMetric?.weightKg ?? state.settings.startWeightKg;
  const progress=clamp((latestWeight-state.settings.startWeightKg)/(state.settings.goalWeightKg-state.settings.startWeightKg)*100,0,100);
  const doneThisWeek=sessions.filter(s=>s.programWeek===state.settings.currentWeek).length;
  const recent=sessions[0];
  const deload=[8,16].includes(state.settings.currentWeek);
  return `
    <div class="page-head"><div><div class="kicker">16 недель · Full Body</div><h1 class="page-title">Сегодня</h1><p class="page-subtitle">Неделя ${state.settings.currentWeek} · ${phaseForWeek(state.settings.currentWeek)}</p></div><button class="icon-btn" data-route="settings" aria-label="Настройки">${icon('settings')}</button></div>
    ${deload?`<div class="card warn row between"><div><b>Разгрузочная неделя</b><div class="small muted">Меньше подходов, RIR 4+, без гонки за весами.</div></div><span class="pill orange">DELOAD</span></div>`:''}
    <div class="card hero">
      <div><div class="kicker">Следующая тренировка</div><div class="row" style="margin-top:8px"><div class="next-workout">${state.settings.currentWorkout}</div><div><b>Full Body ${state.settings.currentWorkout}</b><div class="phase">Цель: ≤ 60 минут</div></div></div></div>
      <div class="hero-actions"><button class="btn primary block" id="startWorkout">${icon('play')} Начать тренировку</button><button class="btn" id="quickMetric">Вес</button></div>
    </div>
    <div class="grid-3">
      <div class="card metric"><div class="label">Текущий вес</div><div class="value">${latestWeight.toFixed(1)} <span class="small muted">кг</span></div><div class="small muted">Цель ${state.settings.goalWeightKg} кг</div></div>
      <div class="card metric"><div class="label">Талия</div><div class="value">${lastMetric?.waistCm?lastMetric.waistCm.toFixed(1):'—'} <span class="small muted">см</span></div><div class="small muted">Контроль качества набора</div></div>
      <div class="card metric"><div class="label">Эта неделя</div><div class="value">${doneThisWeek}<span class="small muted"> / 3</span></div><div class="small muted">тренировок завершено</div></div>
    </div>
    <div class="card"><div class="row between"><div><h3 class="card-title">Путь к 90 кг</h3><div class="small muted">${(latestWeight-state.settings.startWeightKg).toFixed(1)} кг из ${(state.settings.goalWeightKg-state.settings.startWeightKg).toFixed(1)} кг</div></div><b>${Math.round(progress)}%</b></div><div class="progress-track" style="margin-top:12px"><div class="progress-fill" style="width:${progress}%"></div></div></div>
    <div class="grid-2">
      <div class="card"><div class="row between"><h3 class="card-title">Последняя тренировка</h3><button class="btn sm ghost" data-route="history">История</button></div>${recent?`<div style="margin-top:10px"><b>Full Body ${recent.workoutCode}</b> · ${fmtDate(recent.completedAt)}<div class="small muted">${Math.round((new Date(recent.completedAt)-new Date(recent.startedAt))/60000)} мин · ${recent.exercises.reduce((a,e)=>a+e.sets.filter(s=>s.completed).length,0)} подходов</div></div>`:`<div class="empty">Пока нет завершённых тренировок.</div>`}</div>
      <div class="card"><h3 class="card-title">Фокус формы</h3><div class="small muted" style="line-height:1.55">Грудь и спина — 10 прямых подходов в неделю с 9-й недели. Средняя дельта — приоритет визуальной ширины плеч. Пресс — 6 тяжёлых подходов в неделю.</div></div>
    </div>`;
}

async function pageProgram() {
  const w=state.settings.currentWeek;
  const selected=Number(sessionStorage.getItem('programWeek')||w);
  const cards=['A','B','C'].map(code=>{
    const list=workoutFor(selected,code);
    return `<div class="card"><div class="row between"><div><span class="pill green">${code}</span><h3 class="card-title" style="margin-top:8px">Full Body ${code}</h3></div><span class="small muted">${list.reduce((a,e)=>a+e.sets,0)} подходов</span></div><div class="exercise-list" style="margin-top:12px">${list.map(e=>`<div class="exercise-card"><div class="row"><span class="exercise-block">${e.block}</span><div class="grow"><div class="exercise-name">${e.name}</div><div class="exercise-meta">${e.sets}×${e.min}–${e.max} · RIR ${e.targetRir}</div></div></div></div>`).join('')}</div></div>`;
  }).join('');
  return `<div class="page-head"><div><h1 class="page-title">Программа</h1><p class="page-subtitle">Выбери неделю и посмотри точный объём A/B/C.</p></div></div>
  <div class="card"><div class="row between"><div><div class="kicker">Неделя ${selected}</div><h3 class="card-title">${phaseForWeek(selected)}</h3></div>${[8,16].includes(selected)?'<span class="pill orange">Разгрузка</span>':''}</div><div class="week-grid" style="margin-top:14px">${Array.from({length:16},(_,i)=>i+1).map(n=>`<button class="week-chip ${n===selected?'active':''} ${[8,16].includes(n)?'deload':''}" data-week="${n}">${n}</button>`).join('')}</div></div><div class="stack" style="margin-top:14px">${cards}</div>`;
}

function svgLineChart(points, valueKey, unit, goal=null) {
  if(points.length<2) return `<div class="chart-empty">Добавь минимум 2 измерения</div>`;
  const W=720,H=220,p=28; const vals=points.map(x=>Number(x[valueKey])).filter(Number.isFinite); if(!vals.length) return `<div class="chart-empty">Нет данных</div>`;
  let min=Math.min(...vals), max=Math.max(...vals); if(goal!=null){ min=Math.min(min,goal); max=Math.max(max,goal); }
  if(min===max){min-=1;max+=1;} const range=max-min;
  const coords=points.map((d,i)=>({x:p+i*(W-2*p)/Math.max(1,points.length-1),y:H-p-(Number(d[valueKey])-min)/range*(H-2*p)})).filter(c=>Number.isFinite(c.y));
  const poly=coords.map(c=>`${c.x},${c.y}`).join(' ');
  const goalY=goal!=null?H-p-(goal-min)/range*(H-2*p):null;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="График ${unit}"><line x1="${p}" y1="${p}" x2="${p}" y2="${H-p}" stroke="#e5e7eb"/><line x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}" stroke="#e5e7eb"/>${goalY!=null?`<line x1="${p}" y1="${goalY}" x2="${W-p}" y2="${goalY}" stroke="#b54708" stroke-dasharray="6 6"/><text x="${W-p}" y="${goalY-5}" text-anchor="end" fill="#b54708" font-size="11">цель ${goal} ${unit}</text>`:''}<polyline fill="none" stroke="${ACCENT}" stroke-width="3" points="${poly}" stroke-linecap="round" stroke-linejoin="round"/>${coords.map((c,i)=>`<circle cx="${c.x}" cy="${c.y}" r="4" fill="${ACCENT}"><title>${points[i][valueKey]} ${unit} · ${points[i].date}</title></circle>`).join('')}<text x="${p}" y="16" fill="#6b7280" font-size="11">${max.toFixed(1)} ${unit}</text><text x="${p}" y="${H-4}" fill="#6b7280" font-size="11">${min.toFixed(1)} ${unit}</text></svg>`;
}

async function pageProgress() {
  const metrics=(await getAll('metrics')).sort((a,b)=>new Date(a.date)-new Date(b.date));
  const sessions=(await getAll('sessions')).filter(s=>s.status==='completed').sort((a,b)=>new Date(a.completedAt)-new Date(b.completedAt));
  const weightPoints=metrics.filter(m=>Number.isFinite(m.weightKg));
  const waistPoints=metrics.filter(m=>Number.isFinite(m.waistCm));
  const last=weightPoints.at(-1);
  const best={};
  sessions.forEach(s=>s.exercises.forEach(e=>e.sets.filter(x=>x.completed).forEach(set=>{
    const score=Number(set.weightKg||set.additionalWeightKg||0); if(!best[e.exerciseId] || score>best[e.exerciseId].weight) best[e.exerciseId]={weight:score,reps:set.reps,date:s.completedAt};
  })));
  return `<div class="page-head"><div><h1 class="page-title">Прогресс</h1><p class="page-subtitle">Вес, талия и силовые показатели.</p></div><button class="btn" id="quickMetric">+ Измерение</button></div>
    <div class="grid-3"><div class="card metric"><div class="label">Вес</div><div class="value">${last?last.weightKg.toFixed(1):state.settings.startWeightKg.toFixed(1)} <span class="small muted">кг</span></div></div><div class="card metric"><div class="label">Тренировки</div><div class="value">${sessions.length}</div></div><div class="card metric"><div class="label">Текущая неделя</div><div class="value">${state.settings.currentWeek}<span class="small muted"> / 16</span></div></div></div>
    <div class="grid-2"><div class="card"><h3 class="card-title">Масса тела</h3><div class="small muted">Цель — медленный набор 0,1–0,2 кг/нед.</div>${svgLineChart(weightPoints.slice(-24),'weightKg','кг',state.settings.goalWeightKg)}</div><div class="card"><h3 class="card-title">Талия</h3><div class="small muted">Следи, чтобы талия росла существенно медленнее веса.</div>${svgLineChart(waistPoints.slice(-24),'waistCm','см')}</div></div>
    <div class="card"><div class="row between"><h3 class="card-title">Лучшие рабочие веса</h3><span class="pill">рабочие подходы</span></div>${Object.keys(best).length?`<div class="table-wrap" style="margin-top:12px"><table><thead><tr><th>Упражнение</th><th>Вес</th><th>Повторы</th><th>Дата</th></tr></thead><tbody>${Object.entries(best).sort((a,b)=>b[1].weight-a[1].weight).slice(0,12).map(([id,v])=>`<tr><td>${esc(exercises[id]?.name||id)}</td><td>${v.weight} кг</td><td>${v.reps}</td><td>${fmtDate(v.date)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">Рекорды появятся после тренировок.</div>'}</div>`;
}

async function pageHistory() {
  const sessions=(await getAll('sessions')).sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt));
  return `<div class="page-head"><div><h1 class="page-title">История</h1><p class="page-subtitle">Все завершённые и незавершённые тренировки.</p></div></div>${sessions.length?`<div class="stack">${sessions.map(s=>`<div class="card"><div class="row between"><div><span class="pill ${s.status==='completed'?'green':''}">${s.status==='completed'?'Завершено':'Черновик'}</span><h3 class="card-title" style="margin-top:8px">Full Body ${s.workoutCode} · неделя ${s.programWeek}</h3><div class="small muted">${fmtDate(s.startedAt)}${s.completedAt?` · ${Math.round((new Date(s.completedAt)-new Date(s.startedAt))/60000)} мин`:''}</div></div><button class="btn sm danger" data-delete-session="${s.id}">Удалить</button></div><div class="divider"></div><div class="small muted">${s.exercises.map(e=>`${esc(exercises[e.exerciseId]?.name||e.exerciseId)}: ${e.sets.filter(x=>x.completed).length} подх.`).join(' · ')}</div></div>`).join('')}</div>`:'<div class="card empty">История пока пуста.</div>'}`;
}

async function pageSettings() {
  const s=state.settings;
  return `<div class="page-head"><div><h1 class="page-title">Настройки</h1><p class="page-subtitle">Параметры программы и резервное копирование.</p></div></div>
    <div class="card"><h3 class="card-title">Профиль</h3><div class="field-row" style="margin-top:12px"><div class="field"><label>Возраст</label><input class="input" id="setAge" inputmode="numeric" value="${s.age}"></div><div class="field"><label>Рост, см</label><input class="input" id="setHeight" inputmode="decimal" value="${s.heightCm}"></div><div class="field"><label>Стартовый вес, кг</label><input class="input" id="setStartWeight" inputmode="decimal" value="${s.startWeightKg}"></div><div class="field"><label>Цель, кг</label><input class="input" id="setGoalWeight" inputmode="decimal" value="${s.goalWeightKg}"></div></div><button class="btn primary" id="saveProfile" style="margin-top:12px">Сохранить</button></div>
    <div class="card"><h3 class="card-title">Текущая позиция</h3><div class="field-row" style="margin-top:12px"><div class="field"><label>Неделя</label><select class="select" id="setWeek">${Array.from({length:16},(_,i)=>i+1).map(n=>`<option ${n===s.currentWeek?'selected':''}>${n}</option>`).join('')}</select></div><div class="field"><label>Следующая тренировка</label><select class="select" id="setWorkout">${['A','B','C'].map(x=>`<option ${x===s.currentWorkout?'selected':''}>${x}</option>`).join('')}</select></div></div><button class="btn" id="savePosition" style="margin-top:12px">Обновить позицию</button></div>
    <div class="card"><h3 class="card-title">Данные</h3><p class="small muted">Все записи хранятся локально в браузере. Экспортируй резервную копию перед сменой устройства.</p><div class="row wrap"><button class="btn" id="exportJson">${icon('download')} JSON</button><button class="btn" id="exportCsv">${icon('download')} CSV</button><label class="btn">${icon('upload')} Импорт JSON<input id="importJson" type="file" accept="application/json" hidden></label></div></div>
    <div class="card danger"><h3 class="card-title">Сброс</h3><p class="small muted">Удалит тренировки, измерения и вернёт программу на первую неделю.</p><button class="btn danger" id="resetAll">Удалить все данные</button></div>`;
}

async function pageMore(){
  return `<div class="page-head"><div><h1 class="page-title">Ещё</h1><p class="page-subtitle">История, настройки и резервные копии.</p></div></div><div class="stack"><button class="card row between" style="width:100%;text-align:left" data-route="history"><div><b>История тренировок</b><div class="small muted">Подходы, веса и заметки</div></div><span>›</span></button><button class="card row between" style="width:100%;text-align:left" data-route="settings"><div><b>Настройки</b><div class="small muted">Профиль, программа, экспорт</div></div><span>›</span></button><div class="card soft"><b>Form90 v${APP_VERSION}</b><div class="small muted" style="margin-top:6px">Локальное приложение. Данные не отправляются на сервер.</div></div></div>`;
}

async function lastExercisePerformance(exerciseId) {
  const sessions=(await getAll('sessions')).filter(s=>s.status==='completed').sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt));
  for(const s of sessions){ const ex=s.exercises.find(e=>e.exerciseId===exerciseId); if(ex){ return {session:s, ex}; } }
  return null;
}

async function startWorkout() {
  const oldDraft=await getOne('drafts','active');
  if(oldDraft){ state.activeSession=oldDraft.session; state.route='workout'; location.hash='#workout'; return render(); }
  const code=state.settings.currentWorkout, week=state.settings.currentWeek;
  const template=workoutFor(week,code);
  const bodyMetric=(await getAll('metrics')).sort((a,b)=>new Date(a.date)-new Date(b.date)).at(-1);
  const session={ id:uid(), workoutCode:code, programWeek:week, startedAt:new Date().toISOString(), completedAt:null,status:'active',bodyWeightKg:bodyMetric?.weightKg||state.settings.startWeightKg,notes:'', exercises:[] };
  for(const e of template){
    const prev=await lastExercisePerformance(e.id);
    const prevSets=prev?.ex.sets.filter(s=>s.completed&&s.setType==='working')||[];
    const defaultWeight=prevSets[0]?.weightKg ?? 0;
    session.exercises.push({ exerciseId:e.id, block:e.block, target:{sets:e.sets,min:e.min,max:e.max,rir:e.targetRir,rest:e.rest}, notes:'', skipped:false, sets:Array.from({length:e.sets},(_,i)=>({id:uid(),setNumber:i+1,setType:'working',weightKg:defaultWeight,additionalWeightKg:e.loadMode==='body'?(prevSets[0]?.additionalWeightKg||0):null,bodyWeightKg:e.loadMode==='body'?session.bodyWeightKg:null,reps:'',rir:'',completed:false,completedAt:null})) });
  }
  state.activeSession=session; await putOne('drafts',{id:'active',session}); state.route='workout'; location.hash='#workout'; render();
}

function weightLabel(ex,set){
  const mode=exercises[ex.exerciseId].loadMode;
  if(mode==='body') return `${set.bodyWeightKg||state.activeSession.bodyWeightKg} + ${set.additionalWeightKg||0}`;
  if(mode==='bodyOnly') return 'вес тела';
  return `${set.weightKg||0}`;
}

async function previousText(exId){
  const p=await lastExercisePerformance(exId); if(!p) return 'Ранее не выполнялось';
  const e=p.ex; const sets=e.sets.filter(s=>s.completed&&s.setType==='working');
  return sets.length?`В прошлый раз: ${sets.map(s=>`${weightLabel(e,s)} кг × ${s.reps}`).join(' · ')}`:'Ранее не выполнялось';
}

async function renderWorkout(){
  const s=state.activeSession; const elapsed=Math.max(0,Math.floor((Date.now()-new Date(s.startedAt))/1000));
  const cls=elapsed>=3600?'over':elapsed>=3000?'warn':'';
  const prevs={}; for(const e of s.exercises) prevs[e.exerciseId]=await previousText(e.exerciseId);
  const completedSets=s.exercises.reduce((a,e)=>a+e.sets.filter(x=>x.completed).length,0); const totalSets=s.exercises.reduce((a,e)=>a+e.sets.length,0);
  document.getElementById('app').innerHTML=`<div class="workout-shell"><header class="workout-top"><div class="workout-top-inner"><button class="icon-btn" id="leaveWorkout" aria-label="Выйти">${icon('back')}</button><div><b>Full Body ${s.workoutCode}</b><div class="small muted">Неделя ${s.programWeek} · ${completedSets}/${totalSets} подходов</div></div><div class="workout-clock ${cls}" id="workoutClock">${fmtDuration(elapsed)}</div></div></header><main class="workout-main">${elapsed>=3000?`<div class="card ${elapsed>=3600?'danger':'warn'}"><b>${elapsed>=3600?'60 минут достигнуты':'Осталось меньше 10 минут'}</b><div class="small muted">Заверши текущий блок и не жертвуй техникой ради таймера.</div></div>`:''}${s.exercises.map((e,ei)=>{ const def=exercises[e.exerciseId]; return `<section class="exercise-work-card" data-ex-index="${ei}"><div class="exercise-work-head"><div class="row between"><div class="grow"><div class="row"><span class="exercise-block">${e.block}</span><span class="pill">${def.muscle}</span></div><div class="exercise-name" style="margin-top:7px">${def.name}</div><div class="exercise-meta">${e.target.sets}×${e.target.min}–${e.target.max} · RIR ${e.target.rir} · отдых ${e.target.rest} сек</div></div><button class="btn sm ghost" data-skip-ex="${ei}">${e.skipped?'Вернуть':'Пропустить'}</button></div><div class="small muted" style="margin-top:8px">${def.tip}</div></div><div class="exercise-work-body"> <div class="previous">${esc(prevs[e.exerciseId])}</div><div class="set-head"><span>№</span><span>${def.loadMode==='dumbbell'?'кг/гант.':def.loadMode==='body'?'доп. кг':'вес'}</span><span>повт.</span><span>RIR</span><span></span></div>${e.sets.map((set,si)=>`<div class="set-row ${set.completed?'completed':''}" data-set-row><div class="set-num">${si+1}</div>${def.loadMode==='bodyOnly'?`<input class="set-input" value="BW" disabled>`:`<input class="set-input" inputmode="decimal" data-set-field="weight" data-ei="${ei}" data-si="${si}" value="${def.loadMode==='body'?set.additionalWeightKg??0:set.weightKg??0}" aria-label="Вес">`}<input class="set-input" inputmode="numeric" data-set-field="reps" data-ei="${ei}" data-si="${si}" value="${set.reps}" placeholder="${e.target.min}-${e.target.max}" aria-label="Повторы"><select class="set-input" data-set-field="rir" data-ei="${ei}" data-si="${si}" aria-label="RIR"><option value="">—</option>${['0','1','2','3','4+'].map(v=>`<option ${String(set.rir)===v?'selected':''}>${v}</option>`).join('')}</select><button class="set-done ${set.completed?'checked':''}" data-complete-set="${ei}:${si}" aria-label="Завершить подход">${icon('check')}</button></div>`).join('')}<button class="btn sm" data-add-warmup="${ei}">+ Разминочный подход</button></div></section>`; }).join('')}</main><footer class="workout-bottom"><div class="workout-bottom-inner"><div class="timer-strip" id="restStrip"><span>${state.timerEndsAt>Date.now()?`Отдых <b id="restTime">${Math.ceil((state.timerEndsAt-Date.now())/1000)} сек</b>`:'Таймер отдыха готов'}</span><span><button class="btn sm ghost" id="minusRest">−15</button><button class="btn sm ghost" id="plusRest">+15</button></span></div><button class="btn primary" id="finishWorkout">Завершить</button></div></footer></div>`;
  bindWorkout(); startWorkoutTicker(); startRestTicker();
}

function parseNum(v){ const n=Number(String(v).replace(',','.')); return Number.isFinite(n)?n:0; }
async function saveDraft(){ if(state.activeSession) await putOne('drafts',{id:'active',session:state.activeSession}); }

function bindWorkout(){
  document.getElementById('leaveWorkout').onclick=async()=>{ await saveDraft(); state.route='today'; state.activeSession=null; location.hash='#today'; render(); };
  document.querySelectorAll('[data-set-field]').forEach(el=>el.onchange=async()=>{
    const ei=Number(el.dataset.ei),si=Number(el.dataset.si),field=el.dataset.setField; const set=state.activeSession.exercises[ei].sets[si];
    if(field==='reps') set.reps=Math.max(0,Math.round(parseNum(el.value)));
    else if(field==='rir') set.rir=el.value;
    else { const mode=exercises[state.activeSession.exercises[ei].exerciseId].loadMode; if(mode==='body') set.additionalWeightKg=parseNum(el.value); else set.weightKg=parseNum(el.value); }
    await saveDraft();
  });
  document.querySelectorAll('[data-complete-set]').forEach(btn=>btn.onclick=async()=>{
    const [ei,si]=btn.dataset.completeSet.split(':').map(Number); const ex=state.activeSession.exercises[ei],set=ex.sets[si];
    if(!set.reps){ toast('Укажи количество повторений'); return; }
    set.completed=!set.completed; set.completedAt=set.completed?new Date().toISOString():null; await saveDraft();
    if(set.completed){ state.timerEndsAt=Date.now()+ex.target.rest*1000; if(state.settings.timerVibration&&navigator.vibrate) navigator.vibrate(40); }
    renderWorkout();
  });
  document.querySelectorAll('[data-skip-ex]').forEach(btn=>btn.onclick=async()=>{ const e=state.activeSession.exercises[Number(btn.dataset.skipEx)]; e.skipped=!e.skipped; await saveDraft(); renderWorkout(); });
  document.querySelectorAll('[data-add-warmup]').forEach(btn=>btn.onclick=async()=>{
    const ei=Number(btn.dataset.addWarmup),ex=state.activeSession.exercises[ei]; const n=ex.sets.filter(s=>s.setType==='warmup').length+1;
    ex.sets.unshift({id:uid(),setNumber:`W${n}`,setType:'warmup',weightKg:0,additionalWeightKg:0,bodyWeightKg:state.activeSession.bodyWeightKg,reps:'',rir:'',completed:false,completedAt:null}); await saveDraft(); renderWorkout();
  });
  document.getElementById('plusRest').onclick=()=>{state.timerEndsAt=Math.max(Date.now(),state.timerEndsAt)+15000; startRestTicker();};
  document.getElementById('minusRest').onclick=()=>{state.timerEndsAt=Math.max(Date.now(),state.timerEndsAt-15000); startRestTicker();};
  document.getElementById('finishWorkout').onclick=finishWorkout;
}

function startWorkoutTicker(){ clearInterval(state.workoutTicker); state.workoutTicker=setInterval(()=>{ const el=document.getElementById('workoutClock'); if(!el||!state.activeSession)return; const sec=Math.floor((Date.now()-new Date(state.activeSession.startedAt))/1000); el.textContent=fmtDuration(sec); el.className='workout-clock '+(sec>=3600?'over':sec>=3000?'warn':''); },1000); }
function startRestTicker(){ if(state.timer)clearInterval(state.timer); state.timer=setInterval(()=>{ const el=document.getElementById('restTime'); if(!el){ if(state.timerEndsAt<=Date.now())clearInterval(state.timer); return; } const left=Math.ceil((state.timerEndsAt-Date.now())/1000); el.textContent=`${Math.max(0,left)} сек`; if(left<=0){ clearInterval(state.timer); state.timerEndsAt=0; if(state.settings.timerVibration&&navigator.vibrate)navigator.vibrate([120,80,120]); toast('Отдых завершён'); } },500); }

async function finishWorkout(){
  const s=state.activeSession; const incomplete=s.exercises.reduce((a,e)=>a+e.sets.filter(x=>x.setType==='working'&&!x.completed).length,0);
  if(incomplete && !confirm(`Осталось незавершённых подходов: ${incomplete}. Всё равно завершить?`)) return;
  s.status='completed'; s.completedAt=new Date().toISOString(); await putOne('sessions',s); await delOne('drafts','active');
  if(s.workoutCode==='A') state.settings.currentWorkout='B'; else if(s.workoutCode==='B') state.settings.currentWorkout='C'; else { state.settings.currentWorkout='A'; state.settings.currentWeek=Math.min(16,state.settings.currentWeek+1); }
  await saveSettings(); state.activeSession=null; clearInterval(state.workoutTicker); state.route='today'; location.hash='#today'; await render(); toast('Тренировка сохранена');
}

function modal(html){ const d=document.createElement('div'); d.className='modal-backdrop'; d.innerHTML=`<div class="modal">${html}</div>`; d.onclick=e=>{if(e.target===d)d.remove();}; document.body.appendChild(d); return d; }
function toast(text){ const old=document.querySelector('.toast'); if(old)old.remove(); const t=document.createElement('div');t.className='toast';t.textContent=text;document.body.appendChild(t);setTimeout(()=>t.remove(),2200); }

async function openMetricModal(){
  const metrics=await getAll('metrics'); const last=metrics.sort((a,b)=>new Date(a.date)-new Date(b.date)).at(-1);
  const m=modal(`<h2>Измерение</h2><p class="muted small">Лучше вносить утром в одинаковых условиях.</p><div class="field-row"><div class="field"><label>Дата</label><input class="input" type="date" id="mDate" value="${todayISO()}"></div><div class="field"><label>Вес, кг</label><input class="input" inputmode="decimal" id="mWeight" value="${last?.weightKg||state.settings.startWeightKg}"></div><div class="field"><label>Талия, см</label><input class="input" inputmode="decimal" id="mWaist" value="${last?.waistCm||''}" placeholder="необязательно"></div></div><div class="modal-actions"><button class="btn" id="mCancel">Отмена</button><button class="btn primary" id="mSave">Сохранить</button></div>`);
  m.querySelector('#mCancel').onclick=()=>m.remove();
  m.querySelector('#mSave').onclick=async()=>{ const weight=parseNum(m.querySelector('#mWeight').value); if(weight<30||weight>300){toast('Проверь вес');return;} const waistText=m.querySelector('#mWaist').value; await putOne('metrics',{id:uid(),date:m.querySelector('#mDate').value,weightKg:weight,waistCm:waistText?parseNum(waistText):null}); m.remove(); render(); toast('Измерение сохранено'); };
}

async function exportJson(){ const data={version:APP_VERSION,schemaVersion:1,exportedAt:new Date().toISOString(),settings:state.settings,sessions:await getAll('sessions'),metrics:await getAll('metrics')}; downloadBlob(`form90-backup-${todayISO()}.json`,JSON.stringify(data,null,2),'application/json'); }
async function exportCsv(){ const sessions=await getAll('sessions'); const rows=[['date','week','workout','exercise','set','weightKg','additionalWeightKg','bodyWeightKg','reps','rir']]; sessions.forEach(s=>s.exercises.forEach(e=>e.sets.filter(x=>x.completed).forEach(set=>rows.push([s.completedAt||s.startedAt,s.programWeek,s.workoutCode,exercises[e.exerciseId]?.name||e.exerciseId,set.setNumber,set.weightKg??'',set.additionalWeightKg??'',set.bodyWeightKg??'',set.reps,set.rir])))); const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n'); downloadBlob(`form90-workouts-${todayISO()}.csv`,csv,'text/csv;charset=utf-8'); }
function downloadBlob(name,text,type){ const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000); }

async function importJson(file){
  try{ const data=JSON.parse(await file.text()); if(!data.settings||!Array.isArray(data.sessions)||!Array.isArray(data.metrics)) throw new Error('format'); if(!confirm(`Импортировать ${data.sessions.length} тренировок и ${data.metrics.length} измерений? Текущие данные будут заменены.`))return; await clearStore('sessions');await clearStore('metrics');await clearStore('drafts'); state.settings={...defaultSettings,...data.settings,onboardingDone:true}; await saveSettings(); for(const x of data.sessions)await putOne('sessions',x); for(const x of data.metrics)await putOne('metrics',x); toast('Импорт завершён');render(); }
  catch(e){ toast('Не удалось импортировать файл'); }
}

function bindGlobal(){
  document.querySelectorAll('[data-route]').forEach(el=>el.onclick=()=>{state.route=el.dataset.route;location.hash=`#${state.route}`;render();});
  document.querySelectorAll('[data-week]').forEach(el=>el.onclick=()=>{sessionStorage.setItem('programWeek',el.dataset.week);render();});
  const start=document.getElementById('startWorkout'); if(start)start.onclick=startWorkout;
  document.querySelectorAll('#quickMetric').forEach(x=>x.onclick=openMetricModal);
  document.querySelectorAll('[data-delete-session]').forEach(b=>b.onclick=async()=>{if(confirm('Удалить эту тренировку?')){await delOne('sessions',b.dataset.deleteSession);render();}});
  const saveProfile=document.getElementById('saveProfile'); if(saveProfile)saveProfile.onclick=async()=>{ state.settings.age=parseNum(document.getElementById('setAge').value);state.settings.heightCm=parseNum(document.getElementById('setHeight').value);state.settings.startWeightKg=parseNum(document.getElementById('setStartWeight').value);state.settings.goalWeightKg=parseNum(document.getElementById('setGoalWeight').value);await saveSettings();toast('Настройки сохранены');render(); };
  const savePosition=document.getElementById('savePosition'); if(savePosition)savePosition.onclick=async()=>{state.settings.currentWeek=Number(document.getElementById('setWeek').value);state.settings.currentWorkout=document.getElementById('setWorkout').value;await saveSettings();toast('Позиция обновлена');render();};
  const ej=document.getElementById('exportJson');if(ej)ej.onclick=exportJson; const ec=document.getElementById('exportCsv');if(ec)ec.onclick=exportCsv;
  const ij=document.getElementById('importJson');if(ij)ij.onchange=e=>e.target.files[0]&&importJson(e.target.files[0]);
  const ra=document.getElementById('resetAll');if(ra)ra.onclick=async()=>{if(confirm('Удалить все тренировки и измерения? Это действие необратимо.')){await clearStore('sessions');await clearStore('metrics');await clearStore('drafts');state.settings={...defaultSettings,onboardingDone:true};await saveSettings();render();toast('Данные удалены');}};
}

async function showOnboarding(){
  const m=modal(`<div class="kicker">Form90</div><h2>Настроим программу</h2><p class="muted">Три Full Body тренировки по 60 минут. Данные останутся только на этом устройстве.</p><div class="field-row"><div class="field"><label>Возраст</label><input class="input" id="oAge" inputmode="numeric" value="33"></div><div class="field"><label>Рост, см</label><input class="input" id="oHeight" inputmode="decimal" value="186"></div><div class="field"><label>Вес, кг</label><input class="input" id="oWeight" inputmode="decimal" value="82"></div><div class="field"><label>Цель, кг</label><input class="input" id="oGoal" inputmode="decimal" value="90"></div></div><div class="field" style="margin-top:10px"><label>Дата старта</label><input class="input" type="date" id="oDate" value="${todayISO()}"></div><button class="btn primary block" id="oStart" style="margin-top:16px">Начать программу</button>`);
  m.querySelector('#oStart').onclick=async()=>{ state.settings={...defaultSettings,age:parseNum(m.querySelector('#oAge').value),heightCm:parseNum(m.querySelector('#oHeight').value),startWeightKg:parseNum(m.querySelector('#oWeight').value),goalWeightKg:parseNum(m.querySelector('#oGoal').value),startDate:m.querySelector('#oDate').value,onboardingDone:true}; await saveSettings(); await putOne('metrics',{id:uid(),date:state.settings.startDate,weightKg:state.settings.startWeightKg,waistCm:null}); m.remove();render(); };
}

async function init(){
  try{ db=await openDB(); const saved=await getOne('settings','user'); if(saved)state.settings={...defaultSettings,...saved}; else await saveSettings();
    const draft=await getOne('drafts','active');
    const hash=location.hash.replace('#',''); state.route=['today','program','progress','history','settings','more','workout'].includes(hash)?hash:'today';
    if(state.route==='workout'&&draft)state.activeSession=draft.session; else if(state.route==='workout')state.route='today';
    await render(); if(!state.settings.onboardingDone)showOnboarding();
    if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
    window.addEventListener('hashchange',()=>{ const r=location.hash.replace('#',''); if(['today','program','progress','history','settings','more'].includes(r)){state.route=r;render();} });
    document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden')saveDraft(); });
  }catch(err){ console.error(err); document.getElementById('app').innerHTML='<div class="main"><div class="card danger"><h1>Не удалось открыть локальное хранилище</h1><p>Проверь настройки браузера и разрешение на хранение данных.</p></div></div>'; }
}

init();
