// ==================== CONFIGURAÇÃO (essência da ficha) ====================
    const EMPRESA = 'SondaGuard';
    const SETOR = 'Operacional';

    const TERMO = 'Declaro que assumo total responsabilidade pela guarda e conservação do equipamento de proteção individual abaixo descrito, e que recebi orientação sobre o seu uso correto, comprometendo-me a: Utilizá-lo obrigatoriamente durante as minhas atividades na Cia; ser responsável pela sua guarda e conservação; obrigando-me a comunicar ao meu líder imediato qualquer avaria ou dano que o mesmo venha a sofrer; restitui-lo ao setor de EPI, quando solicitado; devolvê-lo ao RH por ocasião do meu desligamento da empresa; responsabilizando-me pelo ressarcimento do valor correspondente, em caso de perda ou extravio; restituição do valor de uso e formação das medidas de segurança e saúde no trabalho, quando determinado; reposição do material, nos casos de utilização e finalidade de uso; a empresa deverá advertir imediatamente o empregado quando determinado que o colaborador assumiu o uso ou a troca.';

    const LEIS = 'Ciente da Lei 623, § 1º, inciso I, do artigo 158 da CLT, que dispõe sobre a obrigação do empregado de utilizar o EPI fornecido pela empresa, sujeito às penalidades previstas em lei (NR-1, subitem 1.8.11).';

    const REASONS = ['Admissão', 'Troca por Desgaste', 'Troca por Vencimento', 'Perda/Extravio', 'Danos por Acidente'];

    const LOGO_B64 = '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';
    function setLogo() {
      const img = document.getElementById('logo');
      if (img) { img.src = 'logo.png'; img.onerror = function () { img.onerror = null; img.src = 'data:image/png;base64,' + LOGO_B64; }; }
    }

    // ==================== ESTADO ====================
    const LS_KEY = 'epi_app_v7';
    const PEND_KEY = 'epi_pending_v1';
    const SEED_VER_KEY = 'epi_seed_ver';
    const SEED_VER = 3; // bump para forçar reseed quando o seed mudar
    let state = { employees: [], epis: [], entregas: [], cart: [], cur: {}, sig1: null, sig2: null, itemSigs: [], notifications: [] };
    let counters = { emp: 1, epi: 1 };
    let syncStatus = 'idle'; // idle | syncing | ok | error | offline
    let _wasSeeded = false;

    // ====== Backend (API) — desabilitado para GitHub Pages + Firebase ======
    const USE_API = false;
    const API_BASE = '';
    let curScreen = 'home';
    let _pushTimer = null;
    let db, auth, fbUser;
    let _listenersAttached = false;

    function load() {
      try { const s = JSON.parse(localStorage.getItem(LS_KEY)); if (s) state = s; } catch (e) { }
      const savedVer = Number(localStorage.getItem(SEED_VER_KEY)) || 0;
      if (!localStorage.getItem(LS_KEY) || savedVer < SEED_VER) {
        _wasSeeded = true;
        const entregasAntigas = state.entregas || [];
        seed();
        state.entregas = entregasAntigas;
        save();
        try { localStorage.setItem(SEED_VER_KEY, String(SEED_VER)); } catch (e) { }
      }
      recomputeCounters();
      migrateNumericEpiNames();
      cleanupEmptyEpis();
    }
    function migrateNumericEpiNames() {
      var numericOnly = state.epis.filter(function(e) { return /^\d+$/.test((e.nome || '').trim()); });
      if (numericOnly.length > 0) {
        state.epis = state.epis.filter(function(e) { return !/^\d+$/.test((e.nome || '').trim()); });
        numericOnly.forEach(function(epi) { addPending('epi', 'delete', { id: epi.id }); });
        save();
        recomputeCounters();
        addNotification('warning', 'EPI(s) com nome numérico removidos (' + numericOnly.length + '). Reimporte a planilha.', 'cleanup');
      }
    }
    function cleanupEmptyEpis() {
      var empty = state.epis.filter(function(e) { return !(e.nome || '').trim(); });
      if (empty.length > 0) {
        state.epis = state.epis.filter(function(e) { return !!(e.nome || '').trim(); });
        empty.forEach(function(epi) { addPending('epi', 'delete', { id: epi.id }); });
        save();
        recomputeCounters();
        addNotification('warning', 'EPI(s) sem nome removidos (' + empty.length + ').', 'cleanup');
      }
    }
    function isInvalidEpi(e) {
      var nome = (e.nome || '').trim();
      return !nome || /^\d+$/.test(nome);
    }
    async function cleanupEpisFromFirestore(snap) {
      var invalidIds = snap.docs
        .filter(function(d) { return isInvalidEpi(d.data()); })
        .map(function(d) { return d.ref; });
      if (invalidIds.length > 0) {
        var batch = db.batch();
        invalidIds.forEach(function(ref) { batch.delete(ref); });
        try { await batch.commit(); } catch (e) { console.error('[FB] cleanup delete error:', e); }
        addNotification('warning', invalidIds.length + ' EPI(s) inválidos removidos do servidor.', 'cleanup');
      }
      state.epis = snap.docs
        .filter(function(d) { return !isInvalidEpi(d.data()); })
        .map(function(d) { return ({ id: Number(d.id), ...d.data() }); });
    }
    function loadPending() {
      try { return JSON.parse(localStorage.getItem(PEND_KEY)) || []; } catch (e) { return []; }
    }
    function savePending(p) { try { localStorage.setItem(PEND_KEY, JSON.stringify(p)); } catch (e) { } }
    async function processPending() {
      if (!db) return;
      const p = loadPending();
      if (!p.length) return;
      const ops = [];
      p.forEach(({ type, action, data }) => {
        if (type === 'employee') {
          const ref = db.collection('employees').doc(String(data.id));
          if (action === 'delete') ops.push({ ref, type: 'delete' });
          else ops.push({ ref, data: { ...data, updatedAt: new Date().toISOString() } });
        }
        if (type === 'epi') {
          const ref = db.collection('epis').doc(String(data.id));
          if (action === 'delete') ops.push({ ref, type: 'delete' });
          else ops.push({ ref, data: { ...data, updatedAt: new Date().toISOString() } });
        }
        if (type === 'entrega') {
          const ref = db.collection('entregas').doc(String(data.id));
          if (action === 'delete') ops.push({ ref, type: 'delete' });
          else ops.push({ ref, data: { ...data } });
        }
      });
      if (ops.length > 0) {
        for (let i = 0; i < ops.length; i += 500) {
          const batch = db.batch();
          ops.slice(i, i + 500).forEach(op => {
            if (op.type === 'delete') batch.delete(op.ref);
            else batch.set(op.ref, op.data);
          });
          await batch.commit();
        }
      }
      savePending([]);
      updateSyncBadge();
    }
    function addPending(type, action, data) {
      const p = loadPending();
      p.push({ type, action, data, ts: Date.now() });
      savePending(p);
      updateSyncBadge();
    }
    function save() {
      try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { showToast('⚠️ Armazenamento cheio — exporte um backup (JSON)'); }
      processPending();
      if (db) { console.log('[FB] save() → pushToFirebase, employees:', state.employees.length); pushToFirebase(); }
    }
    function recomputeCounters() {
      counters.emp = state.employees.reduce((m, e) => Math.max(m, e.id || 0), 0) + 1;
      counters.epi = state.epis.reduce((m, e) => Math.max(m, e.id || 0), 0) + 1;
    }
    function addNotification(type, msg, tag) {
      state.notifications = state.notifications || [];
      state.notifications.push({ type, msg, tag, ts: Date.now(), unread: true });
      save();
      updateNotifBadge();
    }
    function updateNotifBadge() {
      var count = (state.notifications || []).filter(function(n) { return n.unread; }).length;
      var b = document.getElementById('notifCount');
      if (!b) return;
      if (count > 0) {
        b.textContent = count > 99 ? '99+' : count;
        b.style.display = 'flex';
      } else {
        b.style.display = 'none';
      }
    }
    function renderNotifications() {
      var notif = state.notifications || [];
      var container = document.getElementById('notifList');
      if (!container) return;
      if (notif.length === 0) {
        container.innerHTML = '<p class="empty">Nenhuma notificação.</p>';
        return;
      }
      container.innerHTML = notif.slice().reverse().map(function(n) {
        return '<div class="card static" style="border-left:3px solid ' + (n.type === 'warning' ? '#d97706' : n.type === 'danger' ? '#dc2626' : '#16a34a') + ';">' +
          '<div style="display:flex;justify-content:space-between;align-items:start;">' +
          '<div><div style="font-size:12px;color:var(--gray);font-weight:600;">' + fmtDateTime(new Date(n.ts)) + '</div>' +
          '<div style="font-size:13px;margin-top:4px;">' + esc(n.msg) + '</div></div>' +
          '<div style="font-size:11px;color:var(--gray);">' + esc(n.tag || '') + '</div>' +
          '</div></div>';
      }).join('');
      notif.forEach(function(n) { n.unread = false; });
      save();
      updateNotifBadge();
    }
    function seed() {
      state = {
        employees: [
          { id: 1, nome: 'ADRIANO DE OLIVEIRA BIULA', matricula: '418611', cargo: 'TECNICO DE AUTOMACAO INDUSTRIAL SÊNIOR', admissao: '', telefone: '' },
          { id: 2, nome: 'ANA SARAH VIEIRA DAMASCENO', matricula: '421274', cargo: 'ASSISTENTE ADMINISTRATIVO', admissao: '', telefone: '' },
          { id: 3, nome: 'DANIEL XAVIER OLIVEIRA DOS SANTOS', matricula: '419531', cargo: 'TECNICO DE AUTOMACAO INDUSTRIAL SÊNIOR', admissao: '', telefone: '' },
          { id: 4, nome: 'EDERSON FRAZÃO DO NASCIMENTO', matricula: '410686', cargo: 'ANALISTA DE REDES JR II', admissao: '', telefone: '' },
          { id: 5, nome: 'ERICK CLEITON DA MATTA', matricula: '401032', cargo: 'ANALISTA DE REDE SENIOR II', admissao: '', telefone: '' },
          { id: 6, nome: 'ERISVALDO DOS SANTOS GOMES', matricula: '412100', cargo: 'TECNICO DE TELECOMUNICAÇÕES', admissao: '', telefone: '' },
          { id: 7, nome: 'GABRIEL GARCIA DE SOUZA', matricula: '418833', cargo: 'TECNICO DE CABEAMENTO', admissao: '', telefone: '' },
          { id: 8, nome: 'GABRIEL OLIVEIRA DA SILVA', matricula: '420444', cargo: 'ANALISTA DE REDES JR II', admissao: '', telefone: '' },
          { id: 9, nome: 'GILBERTO FREITAS DE ALMEIDA', matricula: '370822', cargo: 'TÉCNICO DE REDE DE TELECOMUNICAÇÕES JR II', admissao: '', telefone: '' },
          { id: 10, nome: 'JEANDERSON RAUL MEDEIROS DA COSTA', matricula: '402789', cargo: 'TÉCNICO DE FIBRA ÓPTICA', admissao: '', telefone: '' },
          { id: 11, nome: 'JOÃO PAULO TAVARES DEMETRIO', matricula: '410687', cargo: 'TÉCNICO DE FIBRA ÓTICA', admissao: '', telefone: '' },
          { id: 12, nome: 'JONATHA COSTA DE ALMEIDA', matricula: '419534', cargo: 'TECNICO DE AUTOMAÇÃO INDUSTRIAL PLENO', admissao: '', telefone: '' },
          { id: 13, nome: 'JOSUE MARIANO GOMES JUNIOR', matricula: '419366', cargo: 'TÉCNICO DE AUTOMAÇÃO INDUSTRIAL SÊNIOR', admissao: '', telefone: '' },
          { id: 14, nome: 'JANE MEIRE LEITE LIMA', matricula: '', cargo: 'ASSISTENTE ADMINISTRATIVO', admissao: '', telefone: '' },
          { id: 15, nome: 'KELLYANE DA SILVA MELO', matricula: '418279', cargo: 'ANALISTA DE REDES JR II', admissao: '', telefone: '' },
          { id: 16, nome: 'LENO OSÓRIO SOUSA DIAS', matricula: '409868', cargo: 'TECNICO DE AUTOMAÇÃO INDUSTRIAL', admissao: '', telefone: '' },
          { id: 17, nome: 'LUCAS DA CRUZ SILVA', matricula: '412568', cargo: 'TÉCNICO DE AUTOMAÇÃO INDUSTRIAL PLENO', admissao: '', telefone: '' },
          { id: 18, nome: 'MARILENE DE SOUZA CARVALHO', matricula: '370955', cargo: 'LÍDER OPERACIONAL', admissao: '', telefone: '' },
          { id: 19, nome: 'MATEUS CARDOSO DA SILVA', matricula: '420353', cargo: 'ANALISTA DE REDES SR II', admissao: '', telefone: '' },
          { id: 20, nome: 'MELQUISEDEC EMERSON SOUSA RESENDE', matricula: '409869', cargo: 'TÉCNICO DE AUTOMAÇÃO INDUSTRIAL PLENO', admissao: '', telefone: '' },
          { id: 21, nome: 'MATHEUS SANTOS CAMPOS', matricula: '421444', cargo: 'TECNICO DE AUTOMACAO INDUSTRIAL PLENO', admissao: '', telefone: '' },
          { id: 22, nome: 'MARCOS DALLIF OLIVEIRA DOS SANTOS FURTADO', matricula: '419292', cargo: 'TECNICO EM SEGURANÇA DO TRABALHO', admissao: '', telefone: '' },
          { id: 23, nome: 'PAULO DAVI MONTEIRO', matricula: '420624', cargo: 'ASSISTENTE ADMINISTRATIVO 1A', admissao: '', telefone: '' },
          { id: 24, nome: 'RAIMUNDO CHARLES MARTINS DE SOUSA', matricula: '408537', cargo: 'COORDENADOR DE TI', admissao: '', telefone: '' },
          { id: 25, nome: 'RAMIRO LOPES DE SOUZA', matricula: '', cargo: 'TECNICO DE CABEAMENTO', admissao: '', telefone: '' },
          { id: 26, nome: 'RENATO PEREIRA RAMALHO', matricula: '416193', cargo: 'TÉCNICO DE FIBRA ÓTICA', admissao: '', telefone: '' },
          { id: 27, nome: 'RONALD LUIZ DE SOUZA DA SILVA CORREA', matricula: '419872', cargo: 'TECNICO DE FIBRA OPTICA', admissao: '', telefone: '' },
          { id: 28, nome: 'ROSIVALDO DE OLIVEIRA CORREA', matricula: '412380', cargo: 'TÉCNICO DE FIBRA ÓTICA', admissao: '', telefone: '' },
          { id: 29, nome: 'SILVIA LETICIA ALEXANDRINO DE SOUZA', matricula: '411010', cargo: 'ASSISTENTE ADMINISTRATIVO 1A', admissao: '', telefone: '' },
          { id: 30, nome: 'THAMIRES LAYLA MATOS CARDOSO', matricula: '419887', cargo: 'ASSISTENTE ADMINISTRATIVO 1A', admissao: '', telefone: '' },
          { id: 31, nome: 'WALDECYR CYCERO MACQUADE FERREIRA SOUZA', matricula: '409873', cargo: 'ANALISTA DE REDE SR II', admissao: '', telefone: '' },
          { id: 32, nome: 'WILLIAN FERNANDO DOS SANTOS', matricula: '418572', cargo: 'TECNICO DE AUTOMACAO INDUSTRIAL SÊNIOR', admissao: '', telefone: '' },
          { id: 33, nome: 'WUEDER TRINDADE ALHO', matricula: '418106', cargo: 'ANALISTA DE REDE SENIOR', admissao: '', telefone: '' }
        ], epis: [
          { id: 1, nome: 'Capacete de Segurança Classe B 3M', ca: '12345', caVal: '2028-06-30', tamanhos: ['Único'], estoque: { 'Único': 30 } },
          { id: 2, nome: 'Abafador Concha Acuplastic 3M', ca: '34567', caVal: '2027-12-15', tamanhos: ['Único'], estoque: { 'Único': 30 } },
          { id: 3, nome: 'Óculos de Segurança Lente Incolor', ca: '45678', caVal: '2027-11-05', tamanhos: ['Único'], estoque: { 'Único': 50 } },
          { id: 4, nome: 'Botina Manobreira Metatarso Composite', ca: '56789', caVal: '2027-09-20', tamanhos: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'], estoque: { '36': 3, '37': 4, '38': 5, '39': 6, '40': 7, '41': 6, '42': 5, '43': 4, '44': 3, '45': 2 } },
          { id: 5, nome: 'Camisa Retardante a Chamas ATPV', ca: '67890', caVal: '2027-08-22', tamanhos: ['P', 'M', 'G', 'GG', 'XG'], estoque: { P: 10, M: 15, G: 12, GG: 8, XG: 5 } },
          { id: 6, nome: 'Calça Retardante a Chamas ATPV', ca: '78901', caVal: '2027-08-22', tamanhos: ['P', 'M', 'G', 'GG', 'XG'], estoque: { P: 10, M: 15, G: 12, GG: 8, XG: 5 } },
          { id: 7, nome: 'Luva Anti-corte EPI', ca: '89012', caVal: '2028-04-18', tamanhos: ['P', 'M', 'G', 'GG'], estoque: { P: 20, M: 25, G: 20, GG: 10 } },
          { id: 8, nome: 'Luva Anti-impacto', ca: '90123', caVal: '2028-03-10', tamanhos: ['P', 'M', 'G', 'GG'], estoque: { P: 10, M: 12, G: 10, GG: 6 } },
          { id: 9, nome: 'Touca Balaclava Hercules', ca: '90234', caVal: '2028-05-01', tamanhos: ['Único'], estoque: { 'Único': 20 } }
        ], entregas: [], cart: [], cur: {}, sig1: null, sig2: null, itemSigs: [], notifications: []
      };
      save();
    }
    // ==================== FIREBASE ====================
    function initFirebase() {
      if (typeof firebase === 'undefined' || !firebaseConfig || firebaseConfig.apiKey === 'COLE_AQUI') {
        console.warn('Firebase não configurado — usando modo offline');
        return false;
      }
      firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      db = firebase.firestore();
      return true;
    }
    async function connectFirebase() {
      if (!auth) { console.warn('[FB] auth não disponível'); return false; }
      try {
        console.log('[FB] Conectando...');
        await auth.signInAnonymously();
        fbUser = auth.currentUser;
        console.log('[FB] Auth OK, uid:', fbUser.uid);
        if (_wasSeeded) {
          console.log('[FB] Seed detectado — puxando dados do Firebase (sem sobrescrever)');
          await listenFirebasePull();
        } else {
          console.log('[FB] State employees:', state.employees.length);
          await pushToFirebaseNow();
          console.log('[FB] Push OK');
          await cleanStaleDocs();
          console.log('[FB] Clean OK');
          listenFirebase();
        }
        console.log('[FB] Listeners OK — sincronização ativa');
        return true;
      } catch (e) {
        console.error('[FB] Falha:', e);
        return false;
      }
    }
    async function cleanStaleDocs() {
      if (!db) return;
      const localIds = new Set(state.employees.map(e => String(e.id)));
      const snap = await db.collection('employees').get();
      const batch = db.batch();
      let count = 0;
      snap.docs.forEach(d => {
        if (!localIds.has(d.id)) { batch.delete(d.ref); count++; }
      });
      if (count > 0) await batch.commit();
    }
    function listenFirebase() {
      if (_listenersAttached) return;
      _listenersAttached = true;
      db.collection('employees').onSnapshot(snap => {
        state.employees = snap.docs.map(d => ({ id: Number(d.id), ...d.data() }));
        recomputeCounters();
        try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { }
        if (curScreen) go(curScreen);
      });
      db.collection('epis').onSnapshot(snap => {
        cleanupEpisFromFirestore(snap).then(() => {
          recomputeCounters();
          try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { }
          if (curScreen === 'epis' || curScreen === 'selectepi') go(curScreen);
        });
      });
      db.collection('entregas').onSnapshot(snap => {
        state.entregas = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { }
        if (curScreen === 'history' || curScreen === 'employee' || curScreen === 'empview' || curScreen === 'dashboard' || curScreen === 'delivered' || curScreen === 'report') go(curScreen);
      });
      syncStatus = 'ok';
      updateSyncBadge();
    }
    async function listenFirebasePull() {
      if (_listenersAttached) return;
      _listenersAttached = true;
      try {
        const empSnap = await db.collection('employees').get();
        const epiSnap = await db.collection('epis').get();
        const entSnap = await db.collection('entregas').get();
        const fbEmps = empSnap.docs.map(d => ({ id: Number(d.id), ...d.data() }));
        const fbEpis = epiSnap.docs.map(d => ({ id: Number(d.id), ...d.data() }));
        const fbEnts = entSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (fbEmps.length > 0) state.employees = fbEmps;
        if (fbEpis.length > 0) state.epis = fbEpis;
        if (fbEnts.length > 0) state.entregas = fbEnts;
        recomputeCounters();
        try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { }
        if (fbEmps.length === 0 && fbEpis.length === 0) {
          console.log('[FB] Firebase vazio — fazendo push do seed local');
          await pushToFirebaseNow();
        }
        db.collection('employees').onSnapshot(snap => {
          state.employees = snap.docs.map(d => ({ id: Number(d.id), ...d.data() }));
          recomputeCounters();
          try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { }
          if (curScreen) go(curScreen);
        });
      db.collection('epis').onSnapshot(snap => {
        cleanupEpisFromFirestore(snap).then(() => {
          recomputeCounters();
          try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { }
          if (curScreen === 'epis' || curScreen === 'selectepi') go(curScreen);
        });
      });
      db.collection('entregas').onSnapshot(snap => {
        state.entregas = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { }
        if (curScreen === 'history' || curScreen === 'employee' || curScreen === 'empview' || curScreen === 'dashboard' || curScreen === 'delivered' || curScreen === 'report') go(curScreen);
      });
      syncStatus = 'ok';
      updateSyncBadge();
      updateNotifBadge();
      go(curScreen);
      } catch (e) {
        console.error('[FB] Pull error:', e);
        syncStatus = 'error';
        updateSyncBadge();
      }
    }
    async function pushToFirebaseNow() {
      if (!db) { console.warn('[FB] db não disponível'); return; }
      try {
        const ops = [];
        state.employees.forEach(e => {
          const ref = db.collection('employees').doc(String(e.id));
          ops.push({ ref, data: { id: e.id, nome: e.nome, matricula: e.matricula, cargo: e.cargo || '', telefone: e.telefone || '', admissao: e.admissao || '', updatedAt: e.updatedAt || new Date().toISOString() } });
        });
        state.epis.forEach(p => {
          const ref = db.collection('epis').doc(String(p.id));
          ops.push({ ref, data: { id: p.id, nome: p.nome, fabricante: p.fabricante || '', ca: p.ca, caVal: p.caVal || '', tamanhos: p.tamanhos || ['Único'], estoque: p.estoque || {}, renovacaoDias: p.renovacaoDias || 0, estoqueMin: p.estoqueMin || 0, updatedAt: p.updatedAt || new Date().toISOString() } });
        });
        state.entregas.forEach(d => {
          const ref = db.collection('entregas').doc(d.id);
          ops.push({ ref, data: d });
        });
        for (let i = 0; i < ops.length; i += 500) {
          const batch = db.batch();
          ops.slice(i, i + 500).forEach(op => batch.set(op.ref, op.data));
          await batch.commit();
        }
        syncStatus = 'ok';
        updateSyncBadge();
      } catch (e) {
        console.error('[FB] push error:', e);
        syncStatus = 'offline';
        updateSyncBadge();
      }
    }
    function pushToFirebase() {
      if (!db) return;
      clearTimeout(_pushTimer);
      _pushTimer = setTimeout(() => pushToFirebaseNow(), 300);
    }
    function isAdmin() { return true; }
    async function syncEmpPublic(id) {
      if (!db) { go('home'); showToast('❌ Firebase não configurado'); return; }
      try {
        const empDoc = await db.collection('employees').doc(String(id)).get();
        if (!empDoc.exists) { go('home'); showToast('❌ Colaborador não encontrado'); return; }
        const emp = { id: Number(empDoc.id), ...empDoc.data() };
        const entregasSnap = await db.collection('entregas').where('employeeId', '==', Number(id)).get();
        state.cur.emp = emp;
        state._empPublic = entregasSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        go('empview');
      } catch (e) { go('home'); showToast('❌ Erro ao buscar dados'); }
    }

    // ==================== UTILS ====================
    function go(id) {
      curScreen = id;
      if (document.documentElement.classList.contains('kiosk')) {
        if (_kioskHistory[_kioskHistory.length - 1] !== id) _kioskHistory.push(id);
        if (_kioskHistory.length > 20) _kioskHistory.shift();
      }
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      if (id === 'home') renderHome();
      if (id === 'search') renderSearch('');
      if (id === 'employee') renderEmployee();
      if (id === 'empview') renderEmpView();
      if (id === 'selectepi') renderEPIs('');
      if (id === 'signature') renderSig();
      if (id === 'history') renderHistory('');
      if (id === 'delivered') renderDelivered('');
      if (id === 'employees') renderEmps('');
      if (id === 'epis') renderEpiMgmt('');
      if (id === 'recover') { document.getElementById('recoverPwd').value = ''; document.getElementById('recoverAuth').style.display = ''; document.getElementById('recoverContent').style.display = 'none'; }
      if (id === 'report') { if (!document.getElementById('reportFrom').value) { const d = new Date(); d.setDate(1); document.getElementById('reportFrom').value = d.toISOString().slice(0, 10); document.getElementById('reportTo').value = new Date().toISOString().slice(0, 10); } renderReport(); }
      if (id === 'devolution') renderDevolution();
      if (id === 'dashboard') renderDashboard();
      if (id === 'notifications') renderNotifications();
      ['home', 'history', 'employees', 'epis'].forEach(s => {
        const el = document.getElementById('nv-' + s);
        if (el) el.classList.toggle('active', s === id);
      });
      updateKioskUI();
      window.scrollTo(0, 0);
    }
    function showToast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(showToast._t); showToast._t = setTimeout(() => t.classList.remove('show'), 3000); }
    function updateSyncBadge() {
      const b = document.getElementById('syncBadge');
      if (!b) return;
      const pending = loadPending();
      const map = { idle: '', syncing: '🔄 Sincronizando...', ok: '', error: '⚠️ Erro ao sincronizar', offline: '📡 Offline — dados salvos local' };
      let txt = map[syncStatus] || '';
      if (pending.length && syncStatus !== 'syncing') txt = '⏳ ' + pending.length + ' pendente(s)';
      b.textContent = txt;
      b.className = 'sync-badge' + (syncStatus === 'error' || syncStatus === 'offline' ? ' sync-warn' : syncStatus === 'ok' && !pending.length ? ' sync-ok' : '');
    }
    function esc(s) { const d = document.createElement('div'); d.textContent = (s == null ? '' : String(s)); return d.innerHTML; }
    function fmtDate(s) { if (!s) return ''; try { return new Date(s).toLocaleDateString('pt-BR'); } catch (e) { return s; } }
    function fmtDateTime(s) { if (!s) return ''; try { return new Date(s).toLocaleString('pt-BR'); } catch (e) { return s; } }
    function parseDate(s) { if (!s) return null; const m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/); if (m) return new Date(+m[1], +m[2] - 1, +m[3]); const d = new Date(s); return isNaN(d.getTime()) ? null : d; }
    function todayStart() { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
    function isCAVencido(e) { const v = parseDate(e.caVal); return v && v < todayStart(); }
    function caDias(e) { const v = parseDate(e.caVal); if (!v) return null; return Math.ceil((v - todayStart()) / 86400000); }
    function estoqueLimitado(e) { return !!(e && e.estoque && Object.keys(e.estoque).length); }
    function stockLim(e, t) { return estoqueLimitado(e) ? ((e.estoque[t] || 0)) : Infinity; }

    const MOON_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const SUN_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    function setThemeIcon(dark) {
      const svg = dark ? SUN_SVG : MOON_SVG;
      const btn = document.getElementById('themeBtn');
      if (btn) btn.innerHTML = svg;
      const kb = document.getElementById('kioskThemeBtn');
      if (kb) kb.innerHTML = svg;
    }
    function toggleDark() {
      const html = document.documentElement; const on = html.classList.toggle('dark');
      localStorage.setItem('epi_dark', on ? '1' : '0');
      setThemeIcon(on);
    }
    (function () { const dark = localStorage.getItem('epi_dark') === '1'; if (dark) { document.documentElement.classList.add('dark'); } setThemeIcon(dark); })();

    // ==================== VERIFICATION GATE — DELETE ====================
    const TRASH_SVG = '<svg class="del-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32S433.7 32 416 32H320l-7.2-14.3C307.4 6.8 300.3 0 291.2 0H156.8c-9.1 0-16.2 6.8-18.4 14.1zM96 416c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V192H96V416zm176-44.8c0-8.5-6.9-15.2-15.2-15.2H223.2c-8.5 0-15.2 6.7-15.2 15.2V384h32v-12.8z"/></svg>';
    function confirmDelete(msg) {
      const pwd = prompt('Digite a senha para excluir:');
      if (pwd !== '2121') { showToast('❌ Senha incorreta'); return false; }
      if (!confirm(msg)) return false;
      return true;
    }

    // ==================== HOME ====================
    function renderHome() {
      const today = new Date().toDateString();
      const todayD = state.entregas.filter(d => new Date(d.data).toDateString() === today);
      document.getElementById('stToday').textContent = todayD.length;
      document.getElementById('stTotal').textContent = state.entregas.length;
      document.getElementById('stEmp').textContent = state.employees.length;
      document.getElementById('stEpi').textContent = state.epis.length;

      const alerts = [];
      state.epis.forEach(e => {
        if (isCAVencido(e)) alerts.push({ t: 'danger', msg: `🚫 CA VENCIDO: ${esc(e.nome)} (CA ${esc(e.ca)})` });
        else if (caDias(e) != null && caDias(e) <= 90) alerts.push({ t: 'warning', msg: `⚠️ CA de ${esc(e.nome)} vence em ${caDias(e)} dias` });
      });
      state.epis.forEach(e => {
        const total = Object.values(e.estoque || {}).reduce((a, b) => a + b, 0);
        if (estoqueLimitado(e) && total === 0) alerts.push({ t: 'danger', msg: `🚫 Sem estoque: ${esc(e.nome)}` });
        else if (estoqueLimitado(e) && e.estoqueMin && total > 0 && total <= e.estoqueMin) alerts.push({ t: 'warning', msg: `⚠️ Estoque baixo: ${esc(e.nome)} — ${total} un. (mín: ${e.estoqueMin})` });
      });
      const notifCount = (state.notifications || []).filter(function(n) { return n.unread; }).length;
      const el = document.getElementById('homeAlerts');
      if (alerts.length === 0 && notifCount === 0) {
        el.innerHTML = '<div class="alert alert-success">✅ Tudo sob controle!</div>';
      } else if (alerts.length === 0 && notifCount > 0) {
        el.innerHTML = '<div class="alert alert-info" style="cursor:pointer;" onclick="go(\'notifications\')"><span onclick="event.stopPropagation()">🔔 ' + notifCount + ' notificação(ões) não lidas — clique para ver →</span></div>';
      } else {
        el.innerHTML = '<div class="alert alert-warning" style="font-size:12px;">' + alerts.length + ' alerta(s) de EPI(s). <span style="color:var(--color-brand);cursor:pointer;" onclick="go(\'notifications\')">Ver detalhes →</span></div>';
      }
    }

    // ==================== BUSCA ====================
    function renderSearch(q) {
      q = (q || '').toLowerCase();
      const r = state.employees.filter(e => e.nome.toLowerCase().includes(q) || e.matricula.includes(q) || (e.telefone || '').includes(q));
      document.getElementById('searchResults').innerHTML = r.map(e => `
    <div class="card" onclick="selectEmp(${e.id})">
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="avatar" style="width:40px;height:40px;font-size:16px;">${esc(e.nome.charAt(0))}</div>
        <div style="flex:1;">
          <div style="font-weight:600;">${esc(e.nome)}</div>
          <div style="color:var(--gray);font-size:12px;">Mat: ${esc(e.matricula)} | ${esc(e.cargo || '-')}</div>
        </div>
        <span class="badge badge-info">${state.entregas.filter(d => d.employeeId === e.id).length} entregas</span>
      </div>
    </div>`).join('') || '<p class="empty">Nenhum colaborador encontrado</p>';
    }

    function selectEmp(id) {
      state.cur.emp = state.employees.find(e => e.id === id);
      state.cart = [];
      state.sig1 = state.sig2 = null;
      state.itemSigs = [];
      go('employee');
    }

    // ==================== FUNCIONÁRIO ====================
    function renderEmployee() {
      const e = state.cur.emp;
      const entregas = state.entregas.filter(d => d.employeeId === e.id);
      const hoje = new Date().toDateString();
      const entregueHoje = entregas.filter(d => new Date(d.data).toDateString() === hoje).length;

      document.getElementById('empInfo').innerHTML = `
    <div class="card static" style="margin-top:12px;">
      <div style="display:flex;gap:14px;align-items:center;">
        <div class="avatar">${esc(e.nome.charAt(0))}</div>
        <div style="flex:1;">
          <div style="font-size:17px;font-weight:700;">${esc(e.nome)}</div>
          <div style="color:var(--gray);font-size:13px;">Mat: ${esc(e.matricula)} | Cargo: ${esc(e.cargo || '-')}</div>
          <div style="color:var(--gray);font-size:12px;">Admissão: ${fmtDate(e.admissao)} · ${entregas.length} entregas totais · ${entregueHoje} hoje</div>
        </div>
        <button class="btn btn-warning small" onclick="openQR(${e.id})" title="QR Code da ficha">🔳 QR</button>
      </div>
    </div>`;

      const alerts = [];
      entregas.forEach(d => {
        d.itens.forEach(it => {
          const epi = state.epis.find(x => x.id === it.epiId);
          const dias = epi ? caDias(epi) : null;
          if (dias != null && dias <= 0) alerts.push({ t: 'danger', msg: `🚫 CA do EPI entregue vencido: ${esc(it.nome)}` });
        });
      });
      state.epis.forEach(ep => {
        if (isDueRenewal(ep.id)) {
          const d = renovacaoDueDate(ep.id);
          alerts.push({ t: 'warning', msg: `♻️ Renovar: ${esc(ep.nome)} (venc. ${fmtDate(d)})` });
        }
      });
      document.getElementById('empAlerts').innerHTML = alerts.length
        ? alerts.map(a => `<div class="alert alert-${a.t}">${a.msg}</div>`).join('')
        : '';

      document.getElementById('empDelivered').innerHTML = empDeliveredHTML(state.entregas.filter(d => d.employeeId === e.id));

      renderCart(); updateFinish();
    }

    function renderCart() {
      document.getElementById('cart').innerHTML = state.cart.map((it, i) => `
    <div class="item-row"><div>
      <div style="font-weight:600;">${it.qty}x ${esc(it.nome)}</div>
      <div style="font-size:12px;color:var(--gray);">Tam ${esc(it.tam)} | ${esc(it.motivo)}</div>
    </div><button class="btn btn-danger small" onclick="removeItem(${i})">✕</button></div>`).join('') || '<p class="empty">Nenhum EPI adicionado</p>';
    }
    function updateFinish() {
      const b = document.getElementById('btnFinish');
      const qty = state.cart.reduce((a, i) => a + i.qty, 0);
      b.disabled = state.cart.length === 0;
      b.textContent = `FINALIZAR (${qty} ${qty === 1 ? 'item' : 'itens'})`;
    }
    function removeItem(i) { state.cart.splice(i, 1); renderCart(); updateFinish(); }

    // ==================== EPIs ====================
    function renderEPIs(q) {
      q = (q || '').toLowerCase();
      const r = state.epis.filter(e => e.nome.toLowerCase().includes(q) || e.ca.includes(q));
      document.getElementById('epiList').innerHTML = r.map(e => {
      const venc = isCAVencido(e);
      const total = Object.values(e.estoque || {}).reduce((a, b) => a + b, 0);
      const estLabel = estoqueLimitado(e) ? total : '∞';
        return `
    <div class="card ${venc ? '' : 'static'}" ${venc ? '' : 'onclick="pickEPI(' + e.id + ')"'}>
      <div style="display:flex;justify-content:space-between;align-items:start;">
        <div>
          <div style="font-weight:600;">${esc(e.nome)}</div>
           <div style="font-size:12px;color:var(--gray);">${e.fabricante ? esc(e.fabricante) + ' | ' : ''}CA: ${esc(e.ca)} | Tam: ${e.tamanhos.join(', ')} | Est: ${estLabel}</div>
          ${venc ? '<div style="font-size:12px;color:var(--red);font-weight:600;margin-top:4px;">🚫 CA VENCIDO — entrega bloqueada</div>'
            : e.caVal ? `<div style="font-size:12px;color:var(--green);margin-top:4px;">✓ CA válido até ${fmtDate(e.caVal)}</div>` : ''}
        </div>
      </div>
    </div>`;
      }).join('') || '<p class="empty">Nenhum EPI encontrado</p>';
    }

    function lastDeliveryDate(epiId) {
      const emp = state.cur.emp;
      if (!emp) return null;
      const last = state.entregas
        .filter(d => d.employeeId === emp.id && d.itens.some(i => i.epiId === epiId))
        .sort((a, b) => new Date(b.data) - new Date(a.data))[0];
      return last ? new Date(last.data) : null;
    }
    function isDueRenewal(epiId) {
      const epi = state.epis.find(x => x.id === epiId);
      if (!epi || !epi.renovacaoDias) return false;
      const last = lastDeliveryDate(epiId);
      if (!last) return false;
      return Math.floor((new Date() - last) / 86400000) >= epi.renovacaoDias;
    }
    function renovacaoDueDate(epiId) {
      const epi = state.epis.find(x => x.id === epiId);
      const last = lastDeliveryDate(epiId);
      if (!epi || !last || !epi.renovacaoDias) return null;
      const due = new Date(last);
      due.setDate(due.getDate() + epi.renovacaoDias);
      return due;
    }
    function pickEPI(id) {
      const epi = state.epis.find(e => e.id === id);
      if (isCAVencido(epi)) { showToast('🚫 CA vencido — entrega bloqueada'); return; }
      state.cur.epi = epi; state.cur.tam = null;
      document.getElementById('cfgName').textContent = epi.nome;
      document.getElementById('sizeGrid').innerHTML = epi.tamanhos.map(t => {
        const lim = stockLim(epi, t);
        const disabled = lim === 0 ? 'disabled style="opacity:.35"' : '';
        const label = lim === Infinity ? '∞' : lim;
        return `<button class="size-btn" onclick="pickSize('${t}',this)" ${disabled}>${t}<br><span style="font-size:10px;font-weight:400;">(${label})</span></button>`;
      }).join('');
      bindReasons();
      const dueRenew = isDueRenewal(id);
      document.querySelectorAll('#reasonGroup .radio-option').forEach(o => {
        const want = dueRenew ? 'Troca por Vencimento' : 'Troca por Desgaste';
        const on = o.querySelector('input').value === want;
        o.querySelector('input').checked = on;
        o.classList.toggle('selected', on);
      });
      if (dueRenew) showToast('♻️ Renovação vencida — motivo sugerido');
      go('configitem');
    }
    function pickSize(t, btn) { document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); state.cur.tam = t; }
    function changeQty(d) { const i = document.getElementById('qty'); const v = (parseInt(i.value) || 1) + d; if (v >= 1) i.value = v; }
    function bindReasons() { document.querySelectorAll('#reasonGroup .radio-option').forEach(o => o.onclick = () => { document.querySelectorAll('#reasonGroup .radio-option').forEach(x => x.classList.remove('selected')); o.classList.add('selected'); o.querySelector('input').checked = true; }); }
    function addItem() {
      if (!state.cur.tam) { showToast('⚠️ Selecione o tamanho'); return; }
      const epi = state.cur.epi;
      const qty = parseInt(document.getElementById('qty').value) || 1;
      if (stockLim(epi, state.cur.tam) < qty) { showToast('🚫 Estoque insuficiente'); return; }
      const reasonEl = document.querySelector('input[name="reason"]:checked');
      state.cart.push({ epiId: epi.id, nome: epi.nome, ca: epi.ca, tam: state.cur.tam, qty, motivo: reasonEl ? reasonEl.value : 'Troca por Desgaste', obs: document.getElementById('obs').value });
      save(); showToast('✅ Item adicionado'); go('employee');
    }

    // ==================== ASSINATURA ====================

    function renderSig() {
      const e = state.cur.emp;
      state.itemSigs = state.itemSigs || state.cart.map(() => null);
      while (state.itemSigs.length < state.cart.length) state.itemSigs.push(null);

      const dateInput = document.getElementById('deliveryDate');
      if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().slice(0, 10);
      }

      document.getElementById('sigSummary').innerHTML = `
    <div class="card static" style="font-size:13px;">
      <div><strong>👤 ${esc(e.nome)}</strong> — Mat: ${esc(e.matricula)}</div>
      <div style="color:var(--gray);">📅 ${new Date().toLocaleString('pt-BR')}</div>
      <div style="color:var(--gray);">💼 Cargo: ${esc(e.cargo || '-')}</div>
    </div>
    <div class="alert alert-warning" style="font-size:12px;">Assine cada EPI individualmente para confirmar o recebimento.</div>`;

      const container = document.getElementById('itemSigsContainer');
      container.innerHTML = state.cart.map((it, i) => `
    <div class="card static" style="margin-bottom:10px;">
      <div style="font-weight:600;font-size:13px;margin-bottom:4px;">Assinatura para: ${it.qty}x ${esc(it.nome)} (${esc(it.tam)})</div>
      <canvas id="signatureCanvas_item_${i}" style="width:100%;height:80px;border:1px solid var(--border);border-radius:8px;touch-action:none;"></canvas>
      <input type="text" id="sigText_item_${i}" placeholder="Ou digite seu nome aqui..." oninput="renderSigTextItem(${i})"
        style="margin:6px 0;width:100%;font-family:'Brush Script MT','Segoe Script',cursive;font-size:18px;">
      <button class="btn btn-secondary small" onclick="clearSigItem(${i})">🗑 Limpar</button>
    </div>`).join('');

      for (let i = 0; i < state.cart.length; i++) {
        setupCanvasItem(i);
        if (state.itemSigs[i]) {
          const c = document.getElementById('signatureCanvas_item_' + i);
          const img = new Image();
          img.onload = () => { const ctx = c.getContext('2d'); const dpr = window.devicePixelRatio || 1; ctx.drawImage(img, 0, 0, c.width / dpr, c.height / dpr); };
          img.src = state.itemSigs[i];
        }
      }

      setupCanvas(2);
      const txtInput = document.getElementById('sigText2');
      if (state.sig2) {
        const c = document.getElementById('signatureCanvas2');
        const img = new Image();
        img.onload = () => { const ctx = c.getContext('2d'); const dpr = window.devicePixelRatio || 1; ctx.drawImage(img, 0, 0, c.width / dpr, c.height / dpr); };
        img.src = state.sig2;
      } else {
        if (txtInput) txtInput.value = '';
      }
      checkConfirm();
    }

    function setupCanvasItem(idx) {
      const c = document.getElementById('signatureCanvas_item_' + idx);
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dw = Math.round(rect.width) || 400;
      const dh = Math.round(rect.height) || 80;
      const dpr = window.devicePixelRatio || 1;
      c.width = dw * dpr; c.height = dh * dpr;
      c.style.width = dw + 'px'; c.style.height = dh + 'px';
      const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
      ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
      let drawing = false;
      function pos(e) { const r = c.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return [t.clientX - r.left, t.clientY - r.top]; }
      function start(e) { drawing = true; document.getElementById('sigText_item_' + idx).value = ''; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); }
      function move(e) { if (!drawing) return; const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); state.itemSigs[idx] = c.toDataURL(); checkConfirm(); }
      function end() { drawing = false; }
      c.onmousedown = start; c.onmousemove = move; c.onmouseup = end; c.onmouseleave = end;
      c.ontouchstart = e => { e.preventDefault(); start(e); };
      c.ontouchmove = e => { e.preventDefault(); move(e); };
      c.ontouchend = e => { e.preventDefault(); end(); };
    }
    function clearSigItem(idx) {
      const c = document.getElementById('signatureCanvas_item_' + idx);
      if (!c) return;
      const ctx = c.getContext('2d'); const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, c.width / dpr, c.height / dpr);
      state.itemSigs[idx] = null;
      document.getElementById('sigText_item_' + idx).value = '';
      checkConfirm();
    }
    function renderSigTextItem(idx) {
      const input = document.getElementById('sigText_item_' + idx);
      const txt = input.value.trim();
      const c = document.getElementById('signatureCanvas_item_' + idx);
      if (!c) return;
      const ctx = c.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const dw = c.width / dpr, dh = c.height / dpr;
      ctx.clearRect(0, 0, dw, dh);
      if (!txt) { state.itemSigs[idx] = null; checkConfirm(); return; }
      const fontSize = Math.max(16, Math.min(36, dw / txt.length * 1.2));
      ctx.font = fontSize + 'px "Brush Script MT", "Segoe Script", cursive';
      ctx.fillStyle = '#1e3a8a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(txt, dw / 2, dh / 2);
      state.itemSigs[idx] = c.toDataURL();
      checkConfirm();
    }

    function setupCanvas(n) {
      const c = document.getElementById('signatureCanvas' + (n === 1 ? '' : '2'));
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const dw = Math.round(rect.width) || 400;
      const dh = Math.round(rect.height) || 120;
      const dpr = window.devicePixelRatio || 1;
      c.width = dw * dpr; c.height = dh * dpr;
      c.style.width = dw + 'px'; c.style.height = dh + 'px';
      const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
      ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
      let drawing = false;
      function pos(e) { const r = c.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return [t.clientX - r.left, t.clientY - r.top]; }
      function start(e) { drawing = true; document.getElementById('sigText' + n).value = ''; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); }
      function move(e) { if (!drawing) return; const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); state['sig' + n] = c.toDataURL(); checkConfirm(); }
      function end() { drawing = false; }
      c.onmousedown = start; c.onmousemove = move; c.onmouseup = end; c.onmouseleave = end;
      c.ontouchstart = e => { e.preventDefault(); start(e); };
      c.ontouchmove = e => { e.preventDefault(); move(e); };
      c.ontouchend = e => { e.preventDefault(); end(); };
    }
    function clearSigN(n) { const c = document.getElementById('signatureCanvas' + (n === 1 ? '' : '2')); if (!c) return; const ctx = c.getContext('2d'); const dpr = window.devicePixelRatio || 1; ctx.clearRect(0, 0, c.width / dpr, c.height / dpr); state['sig' + n] = null; document.getElementById('sigText' + n).value = ''; checkConfirm(); }
    function renderSigText(n) {
      const input = document.getElementById('sigText' + n);
      const txt = input.value.trim();
      const c = document.getElementById('signatureCanvas' + (n === 1 ? '' : '2'));
      if (!c) return;
      const ctx = c.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const dw = c.width / dpr, dh = c.height / dpr;
      ctx.clearRect(0, 0, dw, dh);
      if (!txt) { state['sig' + n] = null; checkConfirm(); return; }
      const fontSize = Math.max(20, Math.min(48, dw / txt.length * 1.2));
      ctx.font = fontSize + 'px "Brush Script MT", "Segoe Script", cursive';
      ctx.fillStyle = '#1e3a8a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(txt, dw / 2, dh / 2);
      state['sig' + n] = c.toDataURL();
      checkConfirm();
    }
    function checkConfirm() {
      const allItemsSigned = state.cart.length > 0 && state.cart.every((_, i) => !!state.itemSigs[i]);
      document.getElementById('btnConfirm').disabled = !(allItemsSigned && state.sig2);
    }
    function confirmLeaveSig() {
      const hasAnySig = state.sig2 || state.itemSigs.some(s => !!s);
      if (hasAnySig && !confirm('Você tem assinaturas pendentes. Deseja sair e perder as assinaturas?')) return;
      if (hasAnySig) { state.sig2 = null; state.itemSigs = state.cart.map(() => null); }
      go('employee');
    }

    function confirmDelivery() {
      // validação de estoque no momento da confirmação
      for (const it of state.cart) {
        const epi = state.epis.find(x => x.id === it.epiId);
        if (stockLim(epi, it.tam) < it.qty) { showToast('🚫 Estoque insuficiente: ' + it.nome); return; }
      }
      const dateInput = document.getElementById('deliveryDate');
      const dataStr = dateInput && dateInput.value ? dateInput.value : new Date().toISOString().slice(0, 10);
      const data = new Date(dataStr + 'T12:00:00').toISOString();
      const delivery = {
        id: 'FICHA-' + Date.now(),
        data,
        employeeId: state.cur.emp.id,
        employeeName: state.cur.emp.nome,
        matricula: state.cur.emp.matricula,
        cargo: state.cur.emp.cargo,
        admissao: state.cur.emp.admissao,
        itens: state.cart.map(it => ({ ...it })),
        sig1: state.itemSigs.slice(),
        sig2: state.sig2,
        itemSigs: state.itemSigs.slice()
      };
      // baixa no estoque
      const _now = new Date().toISOString();
      state.cart.forEach(it => {
        const epi = state.epis.find(x => x.id === it.epiId);
        if (estoqueLimitado(epi)) { epi.estoque[it.tam] = (epi.estoque[it.tam] || 0) - it.qty; epi.updatedAt = _now; }
      });
      delivery.createdAt = _now; delivery.updatedAt = _now;
      state.entregas.push(delivery);
      state.lastDelivery = delivery;
      state.cart = [];
      state.itemSigs = [];
      addPending('entrega', 'upsert', { ...delivery });
      save();
      document.getElementById('deliveryId').textContent = 'ID: ' + delivery.id;
      go('success'); showToast('✅ Entrega registrada!');
    }
    function newDelivery() { state.cur.emp = null; state.cart = []; state.sig1 = state.sig2 = null; state.itemSigs = []; go('home'); }

    // ==================== HISTÓRICO ====================
    function renderHistory(q) {
      q = (q || '').toLowerCase();
      const list = [...state.entregas].reverse().filter(d => d.employeeName.toLowerCase().includes(q));
      const admin = isAdmin();
      const totalItensGeral = list.reduce((a, d) => a + d.itens.reduce((b, i) => b + i.qty, 0), 0);
      const totaisHtml = `<div class="card static" style="display:flex;justify-content:space-around;text-align:center;padding:12px;">
        <div><b style="color:var(--color-brand);font-size:20px;">${list.length}</b><div style="font-size:11px;color:var(--gray);">Entregas</div></div>
        <div><b style="color:var(--color-brand);font-size:20px;">${totalItensGeral}</b><div style="font-size:11px;color:var(--gray);">Itens</div></div>
        <div><b style="color:var(--color-brand);font-size:20px;">${new Set(list.map(d => d.employeeId)).size}</b><div style="font-size:11px;color:var(--gray);">Colaboradores</div></div>
      </div>`;
      document.getElementById('histList').innerHTML = totaisHtml + (list.length ? list.map(d => {
        const totalItens = d.itens.reduce((a, i) => a + i.qty, 0);
        return `
    <div class="card static">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-weight:600;">👤 ${esc(d.employeeName)} <span class="badge badge-info">${esc(d.matricula)}</span></div>
          <div style="font-size:12px;color:var(--gray);">📅 ${fmtDateTime(d.data)} · ${totalItens} itens</div>
          <div style="font-size:12px;color:var(--gray);">${d.itens.map(i => `${i.qty}x ${esc(i.nome)}`).join(' · ')}</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          ${admin ? `<button class="delete-btn" onclick="delEntrega('${d.id}')" title="Excluir">${TRASH_SVG}</button>` : ''}
          <button class="btn btn-primary small" onclick="viewDelivery('${d.id}')">📄 Ficha</button>
        </div>
      </div>
    </div>`;
      }).join('') : '<p class="empty">Nenhuma entrega registrada</p>');
    }

    function viewDelivery(id) {
      state.lastDelivery = state.entregas.find(d => d.id === id);
      if (state.lastDelivery) generatePDF();
    }
    function checkPassword() {
      const pwd = prompt('Digite a senha para excluir:');
      return pwd === '2121';
    }
    function delEntrega(id) {
      if (!isAdmin()) { showToast('❌ Apenas administradores podem excluir entregas'); return; }
      if (!confirmDelete('Excluir esta entrega? O estoque será devolvido.')) return;
      const d = state.entregas.find(x => x.id === id);
      if (d) {
        const _now = new Date().toISOString();
        (d.itens || []).forEach(it => {
          const epi = state.epis.find(x => x.id === it.epiId);
          if (epi && epi.estoque && epi.estoque[it.tam] !== undefined) {
            epi.estoque[it.tam] = (epi.estoque[it.tam] || 0) + it.qty;
            epi.updatedAt = _now;
          }
        });
        state.deletedEntregas = state.deletedEntregas || [];
        state.deletedEntregas.push({ ...d });
      }
      state.entregas = state.entregas.filter(x => x.id !== id);
      addPending('entrega', 'delete', { id });
      save();
      renderHistory('');
      showToast('🗑 Entrega excluída');
    }

    // ==================== EPIs ENTREGUES ====================
    function empDeliveredHTML(entregas) {
      const agg = {};
      (entregas || []).forEach(d => {
        d.itens.forEach(it => {
          if (!agg[it.epiId]) agg[it.epiId] = { nome: it.nome, ca: it.ca, qty: 0, last: d.data };
          agg[it.epiId].qty += it.qty;
          if (!agg[it.epiId].last || new Date(d.data) > new Date(agg[it.epiId].last)) agg[it.epiId].last = d.data;
        });
      });
      const list = Object.values(agg).sort((a, b) => b.qty - a.qty);
      if (!list.length) return '<p class="empty">Nenhum EPI entregue para este colaborador.</p>';
      return list.map(a => `
    <div class="item-row" style="font-size:13px;">
      <div><div style="font-weight:600;">${a.qty}x ${esc(a.nome)}</div>
      <div style="font-size:11px;color:var(--gray);">CA: ${esc(a.ca || '-')} · último: ${fmtDate(a.last)}</div></div>
    </div>`).join('');
    }

    function renderDelivered(q) {
      q = (q || '').toLowerCase();
      const agg = {};
      state.entregas.forEach(d => {
        d.itens.forEach(it => {
          if (!agg[it.epiId]) agg[it.epiId] = { epiId: it.epiId, nome: it.nome, ca: it.ca, qty: 0, empCount: new Set(), recentes: [] };
          agg[it.epiId].qty += it.qty;
          agg[it.epiId].empCount.add(d.employeeId);
          agg[it.epiId].recentes.push({ data: d.data, employeeName: d.employeeName, qty: it.qty, tam: it.tam, motivo: it.motivo });
        });
      });
      const list = Object.values(agg).filter(a => a.nome.toLowerCase().includes(q));
      list.sort((a, b) => b.qty - a.qty);
      document.getElementById('deliveredList').innerHTML = list.length ? list.map(a => `
    <div class="card static">
      <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
        <div style="font-weight:600;">${esc(a.nome)}</div>
        <span class="badge badge-info">${a.qty}x</span>
      </div>
      <div style="font-size:12px;color:var(--gray);margin:4px 0;">CA: ${esc(a.ca || '-')} · ${a.empCount.size} colaborador(es)</div>
      <div style="font-size:12px;color:var(--gray);">${a.recentes.slice(-3).map(en => `${en.qty}x ${esc(en.employeeName)} (${esc(en.tam)}) — ${fmtDate(en.data)}`).join('<br>')}</div>
    </div>`).join('') : '<p class="empty">Nenhum EPI entregue</p>';
    }

    // ==================== GERENCIAR ====================
    function renderEmps(q) {
      q = (q || '').toLowerCase();
      const r = state.employees.filter(e => e.nome.toLowerCase().includes(q) || e.matricula.includes(q));
      document.getElementById('empMgmt').innerHTML = r.map(e => `
    <div class="card static"><div style="display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-weight:600;">${esc(e.nome)}</div>
      <div style="font-size:12px;color:var(--gray);">Mat: ${esc(e.matricula)} | Cargo: ${esc(e.cargo || '-')}</div></div>
      <div style="display:flex;gap:6px;align-items:center;">
        <button class="btn btn-warning small" onclick="openQR(${e.id})" title="QR Code">🔳</button>
        <button class="btn btn-primary small" onclick="editEmp(${e.id})">✏️</button>
        <button class="delete-btn" onclick="delEmp(${e.id})" title="Excluir">${TRASH_SVG}</button>
      </div></div></div>`).join('') || '<p class="empty">Nenhum funcionário</p>';
    }
    function clearEmpForm() { ['empId', 'fNome', 'fMatricula', 'fCargo', 'fTelefone'].forEach(k => document.getElementById(k).value = ''); document.getElementById('fAdmissao').value = ''; document.getElementById('empTitle').textContent = '➕ Novo Funcionário'; }
    function editEmp(id) { const e = state.employees.find(x => x.id === id); document.getElementById('empId').value = e.id; document.getElementById('fNome').value = e.nome; document.getElementById('fMatricula').value = e.matricula; document.getElementById('fCargo').value = e.cargo || ''; document.getElementById('fTelefone').value = e.telefone || ''; document.getElementById('fAdmissao').value = e.admissao || ''; document.getElementById('empTitle').textContent = '✏️ Editar'; go('addemp'); }
    function delEmp(id) { if (!confirmDelete('Excluir este funcionário?')) return; const emp = state.employees.find(e => e.id === id); state.deletedEmployees = state.deletedEmployees || []; if (emp) state.deletedEmployees.push({ ...emp }); state.employees = state.employees.filter(e => e.id !== id); addPending('employee', 'delete', { id }); save(); renderEmps(''); showToast('🗑 Funcionário excluído'); }
    function saveEmp() {
      const id = document.getElementById('empId').value;
      const nome = document.getElementById('fNome').value.trim(), matricula = document.getElementById('fMatricula').value.trim();
      if (!nome || !matricula) { showToast('⚠️ Nome e matrícula obrigatórios'); return; }
      const exists = state.employees.find(e => e.matricula === matricula && String(e.id) !== id);
      if (exists) { showToast('⚠️ Matrícula já cadastrada'); return; }
      const data = { nome, matricula, cargo: document.getElementById('fCargo').value.trim() || 'Operacional', telefone: document.getElementById('fTelefone').value.trim(), admissao: document.getElementById('fAdmissao').value, updatedAt: new Date().toISOString() };
      let emp;
      if (id) { emp = state.employees.find(x => x.id == id); Object.assign(emp, data); }
      else { emp = { id: counters.emp++, ...data }; state.employees.push(emp); }
      addPending('employee', 'upsert', { ...emp });
      save(); go('employees'); renderEmps('');
    }

    function renderEpiMgmt(q) {
      q = (q || '').toLowerCase();
      const r = state.epis.filter(e => e.nome.toLowerCase().includes(q) || e.ca.includes(q));
      document.getElementById('epiMgmt').innerHTML = r.map(e => {
      const total = Object.values(e.estoque || {}).reduce((a, b) => a + b, 0);
      const venc = isCAVencido(e);
      const estLabel = estoqueLimitado(e) ? total : '∞';
        return `
    <div class="card static"><div style="display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-weight:600;">${esc(e.nome)} ${venc ? '<span class="badge badge-danger">CA vencido</span>' : ''}</div>
      <div style="font-size:12px;color:var(--gray);">CA: ${esc(e.ca)} | ${e.fabricante ? 'Fab: ' + esc(e.fabricante) + ' | ' : ''}Estoque: ${estLabel} | Válido: ${fmtDate(e.caVal) || '-'}</div></div>
      <div style="display:flex;gap:6px;align-items:center;">
        <button class="btn btn-primary small" onclick="editEpi(${e.id})">✏️</button>
        <button class="delete-btn" onclick="delEpi(${e.id})" title="Excluir">${TRASH_SVG}</button>
      </div></div></div>`;
      }).join('') || '<p class="empty">Nenhum EPI</p>';
    }
    function clearEpiForm() { ['epiId', 'eNome', 'eFabricante', 'eCA', 'eEstoque', 'eRenov', 'eEstoqueMin'].forEach(k => document.getElementById(k).value = ''); document.getElementById('eCAVal').value = ''; document.getElementById('eTamanhos').value = ''; document.getElementById('epiTitle').textContent = '➕ Novo EPI'; }
    function editEpi(id) { const e = state.epis.find(x => x.id === id); document.getElementById('epiId').value = e.id; document.getElementById('eNome').value = e.nome; document.getElementById('eFabricante').value = e.fabricante || ''; document.getElementById('eCA').value = e.ca; document.getElementById('eCAVal').value = e.caVal || ''; document.getElementById('eTamanhos').value = (e.tamanhos || []).join(', '); document.getElementById('eEstoque').value = Object.entries(e.estoque || {}).map(([t, n]) => t + '=' + n).join(', '); document.getElementById('eRenov').value = e.renovacaoDias || ''; document.getElementById('eEstoqueMin').value = e.estoqueMin || ''; document.getElementById('epiTitle').textContent = '✏️ Editar'; go('addepi'); }
    function delEpi(id) { if (!confirmDelete('Excluir este EPI?')) return; const epi = state.epis.find(e => e.id === id); state.deletedEpis = state.deletedEpis || []; if (epi) state.deletedEpis.push({ ...epi }); state.epis = state.epis.filter(e => e.id !== id); addPending('epi', 'delete', { id }); save(); renderEpiMgmt(''); showToast('🗑 EPI excluído'); }
    function parseEstoque(str) {
      const out = {};
      (str || '').split(',').forEach(p => {
        const [k, v] = p.split('=').map(s => s.trim());
        if (k && v) out[k] = parseInt(v) || 0;
      });
      return out;
    }
    function saveEpi() {
      const id = document.getElementById('epiId').value;
      const nome = document.getElementById('eNome').value.trim(), fabricante = document.getElementById('eFabricante').value.trim(), ca = document.getElementById('eCA').value.trim();
      if (!nome || !ca) { showToast('⚠️ Nome e CA obrigatórios'); return; }
      const tamanhos = (document.getElementById('eTamanhos').value || 'Único').split(',').map(t => t.trim()).filter(Boolean);
      const caVal = document.getElementById('eCAVal').value;
      const estoque = parseEstoque(document.getElementById('eEstoque').value);
      const renovacaoDias = parseInt(document.getElementById('eRenov').value) || 0;
      const estoqueMin = parseInt(document.getElementById('eEstoqueMin').value) || 0;
      const updatedAt = new Date().toISOString();
      let epi;
      if (id) { epi = state.epis.find(x => x.id == id); epi.nome = nome; epi.fabricante = fabricante; epi.ca = ca; epi.caVal = caVal; epi.tamanhos = tamanhos; epi.estoque = estoque; epi.renovacaoDias = renovacaoDias; epi.estoqueMin = estoqueMin; epi.updatedAt = updatedAt; }
      else { epi = { id: counters.epi++, nome, fabricante, ca, caVal, tamanhos, estoque, renovacaoDias, estoqueMin, updatedAt }; state.epis.push(epi); }
      addPending('epi', 'upsert', { ...epi });
      save(); go('epis'); renderEpiMgmt('');
    }

    // ==================== BACKUP / RESTORE ====================
    function exportData() {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'backup_epi_' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      showToast('✅ Backup exportado');
    }
    function importData(ev) {
      const f = ev.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(r.result);
          if (!data || !Array.isArray(data.employees) || !Array.isArray(data.epis)) { showToast('❌ Arquivo inválido'); return; }
          state = {
            employees: data.employees || [],
            epis: data.epis || [],
            entregas: data.entregas || [],
            cart: [],
            cur: {},
            sig1: null,
            sig2: null,
            itemSigs: [],
            notifications: state.notifications || []
          };
          save();
          recomputeCounters();
          showToast('✅ Backup restaurado');
          go('home');
        } catch (err) { showToast('❌ Não foi possível ler o arquivo'); }
      };
      r.readAsText(f);
      ev.target.value = '';
    }

    // ==================== RECUPERAÇÃO DE ITENS EXCLUÍDOS ====================
    function authRecover() {
      const pwd = document.getElementById('recoverPwd').value;
      if (pwd !== '2121') { showToast('❌ Senha incorreta'); return; }
      document.getElementById('recoverAuth').style.display = 'none';
      document.getElementById('recoverContent').style.display = '';
      renderRecover();
    }
    function renderRecover() {
      const delEmps = state.deletedEmployees || [];
      const delEpis = state.deletedEpis || [];
      const delEntregas = state.deletedEntregas || [];

      document.getElementById('recoverEmps').innerHTML = delEmps.length
        ? delEmps.map((e, i) => `
    <div class="card static"><div style="display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-weight:600;">${esc(e.nome)}</div>
      <div style="font-size:12px;color:var(--gray);">Mat: ${esc(e.matricula)} | Cargo: ${esc(e.cargo || '-')}</div></div>
      <button class="btn btn-success small" onclick="restoreEmp(${i})">♻️ Restaurar</button>
    </div></div>`).join('')
        : '<p class="empty">Nenhum funcionário excluído</p>';

      document.getElementById('recoverEpis').innerHTML = delEpis.length
        ? delEpis.map((e, i) => `
    <div class="card static"><div style="display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-weight:600;">${esc(e.nome)}</div>
      <div style="font-size:12px;color:var(--gray);">CA: ${esc(e.ca)} | Válido: ${fmtDate(e.caVal) || '-'}</div></div>
      <button class="btn btn-success small" onclick="restoreEpi(${i})">♻️ Restaurar</button>
    </div></div>`).join('')
        : '<p class="empty">Nenhum EPI excluído</p>';

      document.getElementById('recoverEntregas').innerHTML = delEntregas.length
        ? delEntregas.map((d, i) => `
    <div class="card static"><div style="display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-weight:600;">👤 ${esc(d.employeeName)}</div>
      <div style="font-size:12px;color:var(--gray);">📅 ${fmtDateTime(d.data)} · ${(d.itens || []).length} item(s)</div></div>
      <button class="btn btn-success small" onclick="restoreEntrega(${i})">♻️ Restaurar</button>
    </div></div>`).join('')
        : '<p class="empty">Nenhuma entrega excluída</p>';
    }
    function restoreEmp(i) {
      const del = state.deletedEmployees;
      if (!del || !del[i]) return;
      const emp = del.splice(i, 1)[0];
      state.employees.push(emp);
      addPending('employee', 'upsert', { ...emp });
      save();
      recomputeCounters();
      renderRecover();
      showToast('✅ Funcionário restaurado: ' + emp.nome);
    }
    function restoreEpi(i) {
      const del = state.deletedEpis;
      if (!del || !del[i]) return;
      const epi = del.splice(i, 1)[0];
      state.epis.push(epi);
      addPending('epi', 'upsert', { ...epi });
      save();
      recomputeCounters();
      renderRecover();
      showToast('✅ EPI restaurado: ' + epi.nome);
    }
    function restoreEntrega(i) {
      const del = state.deletedEntregas;
      if (!del || !del[i]) return;
      const d = del.splice(i, 1)[0];
      state.entregas.push(d);
      addPending('entrega', 'upsert', { ...d });
      save();
      renderRecover();
      showToast('✅ Entrega restaurada de ' + d.employeeName);
    }

    // ==================== RELATÓRIO CONSOLIDADO (Item 1) ====================
    let _reportData = [];
    function renderReport() {
      const from = document.getElementById('reportFrom').value;
      const to = document.getElementById('reportTo').value;
      let list = [...state.entregas];
      if (from) list = list.filter(d => d.data >= from);
      if (to) list = list.filter(d => d.data <= to + 'T23:59:59');
      _reportData = list;

      const totalItens = list.reduce((a, d) => a + d.itens.reduce((b, i) => b + i.qty, 0), 0);
      const totalEntregas = list.length;
      const uniqueEmps = new Set(list.map(d => d.employeeId)).size;
      const uniqueEpis = new Set(list.flatMap(d => d.itens.map(i => i.epiId))).size;

      document.getElementById('reportSummary').innerHTML = `
    <div class="card static" style="display:flex;justify-content:space-around;text-align:center;padding:14px;">
      <div><b style="font-size:20px;color:var(--color-brand);">${totalEntregas}</b><div style="font-size:10px;color:var(--gray);">ENTREGAS</div></div>
      <div><b style="font-size:20px;color:var(--color-brand);">${totalItens}</b><div style="font-size:10px;color:var(--gray);">ITENS</div></div>
      <div><b style="font-size:20px;color:var(--color-brand);">${uniqueEmps}</b><div style="font-size:10px;color:var(--gray);">COLAB.</div></div>
      <div><b style="font-size:20px;color:var(--color-brand);">${uniqueEpis}</b><div style="font-size:10px;color:var(--gray);">EPIs</div></div>
    </div>`;

      document.getElementById('reportList').innerHTML = list.length ? list.map(d => {
        const total = d.itens.reduce((a, i) => a + i.qty, 0);
        return `<div class="card static">
      <div style="font-weight:600;font-size:13px;">👤 ${esc(d.employeeName)} <span class="badge badge-info">${esc(d.matricula)}</span></div>
      <div style="font-size:11px;color:var(--gray);">📅 ${fmtDateTime(d.data)} · ${total} itens</div>
      <div style="font-size:11px;color:var(--gray);">${d.itens.map(i => `${i.qty}x ${esc(i.nome)} (${esc(i.tam)})`).join(' · ')}</div>
    </div>`;
      }).join('') : '<p class="empty">Nenhuma entrega no período</p>';
    }
    function exportReportPDF() {
      if (!_reportData.length) { showToast('⚠️ Nenhum dado para exportar'); return; }
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');
      const pw = 210, ml = 12;
      doc.setFillColor(79, 70, 229); doc.rect(0, 0, pw, 18, 'F');
      doc.setTextColor(255, 255, 255); doc.setFontSize(11); doc.setFont('helvetica', 'bold');
      doc.text('RELATÓRIO CONSOLIDADO DE EPIs', pw / 2, 7, { align: 'center' });
      doc.setFontSize(7); doc.setFont('helvetica', 'normal');
      const from = document.getElementById('reportFrom').value || 'Inicio';
      const to = document.getElementById('reportTo').value || 'Fim';
      doc.text('Período: ' + from + ' a ' + to + ' | Total: ' + _reportData.length + ' entregas', pw / 2, 13, { align: 'center' });
      doc.setTextColor(0, 0, 0);
      let y = 24;
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      doc.text('DATA', ml, y); doc.text('COLABORADOR', ml + 28, y); doc.text('MAT.', ml + 90, y); doc.text('ITENS', ml + 110, y); doc.text('EPIs ENTREGUES', ml + 125, y);
      doc.line(ml, y + 1, pw - 12, y + 1); y += 5;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
      _reportData.forEach(d => {
        if (y > 275) { doc.addPage(); y = 20; }
        const itens = d.itens.map(i => i.qty + 'x ' + i.nome).join(', ');
        doc.text(fmtDate(d.data), ml, y);
        doc.text((d.employeeName || '').substring(0, 30), ml + 28, y);
        doc.text(d.matricula || '-', ml + 90, y);
        doc.text(String(d.itens.reduce((a, i) => a + i.qty, 0)), ml + 110, y);
        const lines = doc.splitTextToSize(itens, 60);
        doc.text(lines[0] || '-', ml + 125, y);
        y += Math.max(4, lines.length * 3.5) + 1;
      });
      doc.save('Relatorio_EPI_' + from + '_' + to + '.pdf');
      showToast('📄 Relatório exportado!');
    }

    // ==================== DEVOLUÇÃO DE EPI (Item 3) ====================
    let _devEmp = null;
    let _devItens = [];
    function renderDevolution() {
      document.getElementById('devEmpInfo').innerHTML = '';
      document.getElementById('devEpiList').innerHTML = '';
      document.getElementById('devForm').style.display = 'none';
      _devEmp = null; _devItens = [];
      const container = document.getElementById('devEpiList');
      container.innerHTML = '<div class="search-box"><div class="search-bar"><input type="text" id="devSearch" placeholder="Buscar colaborador..." oninput="searchDevEmp(this.value)" autocomplete="off"><div class="search-icon"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div></div><div class="glow"></div></div><div id="devResults"></div>';
    }
    function searchDevEmp(q) {
      q = (q || '').toLowerCase();
      const r = state.employees.filter(e => e.nome.toLowerCase().includes(q) || e.matricula.includes(q));
      document.getElementById('devResults').innerHTML = r.map(e => {
        const entregas = state.entregas.filter(d => d.employeeId === e.id);
        const epiCount = entregas.reduce((a, d) => a + d.itens.length, 0);
        return `<div class="card" onclick="selectDevEmp(${e.id})">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div><div style="font-weight:600;">${esc(e.nome)}</div>
        <div style="font-size:11px;color:var(--gray);">Mat: ${esc(e.matricula)} · ${epiCount} EPIs</div></div>
        <span class="badge badge-info">→</span>
      </div>
    </div>`;
      }).join('') || '<p class="empty">Nenhum colaborador</p>';
    }
    function selectDevEmp(id) {
      _devEmp = state.employees.find(e => e.id === id);
      _devItens = [];
      const entregas = state.entregas.filter(d => d.employeeId === id);
      const agg = {};
      entregas.forEach(d => {
        d.itens.forEach(it => {
          if (!agg[it.epiId]) agg[it.epiId] = { ...it, qty: 0 };
          agg[it.epiId].qty += it.qty;
        });
      });
      const epiList = Object.values(agg).filter(a => a.qty > 0);
      document.getElementById('devEmpInfo').innerHTML = `
    <div class="card static">
      <div style="font-weight:600;">👤 ${esc(_devEmp.nome)}</div>
      <div style="font-size:11px;color:var(--gray);">Mat: ${esc(_devEmp.matricula)}</div>
    </div>`;
      document.getElementById('devEpiList').innerHTML = epiList.length
        ? epiList.map((it, i) => '<div class="card static" id="devItem' + i + '" onclick="toggleDevItem(' + i + ')" style="cursor:pointer;">'
          + '<div style="display:flex;justify-content:space-between;align-items:center;">'
          + '<div><div style="font-weight:600;">' + it.qty + 'x ' + esc(it.nome) + '</div>'
          + '<div style="font-size:11px;color:var(--gray);">CA: ' + esc(it.ca) + ' · Tam: ' + esc(it.tam) + '</div></div>'
          + '<span class="badge" id="devBadge' + i + '">Selecionar</span>'
          + '</div></div>').join('')
        + '<button class="btn btn-success" id="btnDevConfirm" onclick="showDevForm()" disabled style="margin-top:8px;">📥 DEVOLVER SELECIONADOS</button>'
        : '<p class="empty">Nenhum EPI para devolver</p>';
      document.getElementById('devForm').style.display = 'none';
      _devItens = epiList.map(() => false);
    }
    function toggleDevItem(i) {
      _devItens[i] = !_devItens[i];
      const el = document.getElementById('devItem' + i);
      const badge = document.getElementById('devBadge' + i);
      if (_devItens[i]) { el.style.borderColor = 'var(--color-success)'; el.style.background = '#f0fdf4'; badge.textContent = '✓ Selecionado'; badge.className = 'badge badge-ok'; }
      else { el.style.borderColor = ''; el.style.background = ''; badge.textContent = 'Selecionar'; badge.className = 'badge'; }
      document.getElementById('btnDevConfirm').disabled = !_devItens.some(x => x);
    }
    function showDevForm() {
      if (!_devItens.some(x => x)) return;
      document.getElementById('devForm').style.display = '';
      document.querySelectorAll('#devReasonGroup .radio-option').forEach(o => o.onclick = () => { document.querySelectorAll('#devReasonGroup .radio-option').forEach(x => x.classList.remove('selected')); o.classList.add('selected'); o.querySelector('input').checked = true; });
    }
    function confirmDevolution() {
      if (!_devEmp || !_devItens.some(x => x)) return;
      const reason = document.querySelector('input[name="devReason"]:checked').value;
      const obs = document.getElementById('devObs').value;
      const agg = {};
      state.entregas.filter(d => d.employeeId === _devEmp.id).forEach(d => {
        d.itens.forEach(it => {
          if (!agg[it.epiId]) agg[it.epiId] = { ...it, qty: 0, entregaIds: [] };
          agg[it.epiId].qty += it.qty;
          agg[it.epiId].entregaIds.push(d.id);
        });
      });
      const epiList = Object.values(agg);
      const selected = epiList.filter((_, i) => _devItens[i]);
      selected.forEach(it => {
        const epi = state.epis.find(x => x.id === it.epiId);
        if (epi && epi.estoque && epi.estoque[it.tam] !== undefined) {
          epi.estoque[it.tam] = (epi.estoque[it.tam] || 0) + it.qty;
          epi.updatedAt = new Date().toISOString();
        }
      });
      const devEntrega = {
        id: 'DEV-' + Date.now(),
        data: new Date().toISOString(),
        employeeId: _devEmp.id,
        employeeName: _devEmp.nome,
        matricula: _devEmp.matricula,
        cargo: _devEmp.cargo,
        admissao: _devEmp.admissao,
        itens: selected.map(it => ({ epiId: it.epiId, nome: it.nome, ca: it.ca, tam: it.tam, qty: it.qty, motivo: 'Devolução - ' + reason, obs })),
        sig1: null, sig2: null, itemSigs: [],
        tipo: 'devolucao',
        motivo: reason
      };
      devEntrega.createdAt = new Date().toISOString();
      devEntrega.updatedAt = new Date().toISOString();
      state.entregas.push(devEntrega);
      addPending('entrega', 'upsert', { ...devEntrega });
      save();
      showToast('✅ Devolução registrada: ' + selected.length + ' EPI(s)');
      go('home');
    }

    // ==================== DASHBOARD COM GRÁFICOS (Item 6) ====================
    function renderDashboard() {
      const entregas = state.entregas;
      const canvas = document.getElementById('chartCanvas');
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr; canvas.height = 220 * dpr;
      canvas.style.width = rect.width + 'px'; canvas.style.height = '220px';
      ctx.scale(dpr, dpr);
      const w = rect.width, h = 220;

      const months = {};
      entregas.forEach(d => {
        const m = d.data ? d.data.substring(0, 7) : 'Sem data';
        months[m] = (months[m] || 0) + d.itens.reduce((a, i) => a + i.qty, 0);
      });
      const labels = Object.keys(months).sort().slice(-6);
      const values = labels.map(l => months[l]);
      const maxVal = Math.max(...values, 1);

      ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#334155'; ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText('Entregas por mês', 12, 20);

      const chartTop = 32, chartBottom = h - 30, chartLeft = 36, chartRight = w - 12;
      const barW = Math.min(36, (chartRight - chartLeft) / labels.length - 8);

      ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 0.5;
      for (let i = 0; i <= 4; i++) {
        const y = chartTop + (chartBottom - chartTop) * (1 - i / 4);
        ctx.beginPath(); ctx.moveTo(chartLeft, y); ctx.lineTo(chartRight, y); ctx.stroke();
        ctx.fillStyle = '#94a3b8'; ctx.font = '9px Inter, sans-serif';
        ctx.fillText(String(Math.round(maxVal * i / 4)), 4, y + 3);
      }

      labels.forEach((l, i) => {
        const x = chartLeft + i * ((chartRight - chartLeft) / labels.length) + ((chartRight - chartLeft) / labels.length - barW) / 2;
        const barH = (values[i] / maxVal) * (chartBottom - chartTop);
        const grad = ctx.createLinearGradient(x, chartBottom - barH, x, chartBottom);
        grad.addColorStop(0, '#818cf8'); grad.addColorStop(1, '#6366f1');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, chartBottom - barH, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
        ctx.fillStyle = '#334155'; ctx.font = '8px Inter, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(l.substring(5), x + barW / 2, chartBottom + 12);
        ctx.fillText(String(values[i]), x + barW / 2, chartBottom - barH - 4);
      });
      ctx.textAlign = 'start';

      const epiAgg = {};
      entregas.forEach(d => d.itens.forEach(it => { epiAgg[it.nome] = (epiAgg[it.nome] || 0) + it.qty; }));
      const topEpis = Object.entries(epiAgg).sort((a, b) => b[1] - a[1]).slice(0, 5);
      document.getElementById('dashTopEpis').innerHTML = topEpis.length ? topEpis.map(function(item, i) {
        return '<div class="item-row"><span style="font-weight:600;font-size:13px;">' + (i + 1) + '. ' + esc(item[0]) + '</span><span class="badge badge-info">' + item[1] + 'x</span></div>';
      }).join('') : '<p class="empty">Sem dados</p>';

      const empAgg = {};
      entregas.forEach(function(d) { empAgg[d.employeeName] = (empAgg[d.employeeName] || 0) + d.itens.reduce(function(a, i) { return a + i.qty; }, 0); });
      const topEmps = Object.entries(empAgg).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 5);
      document.getElementById('dashTopEmps').innerHTML = topEmps.length ? topEmps.map(function(item, i) {
        return '<div class="item-row"><span style="font-weight:600;font-size:13px;">' + (i + 1) + '. ' + esc(item[0]) + '</span><span class="badge badge-info">' + item[1] + ' EPIs</span></div>';
      }).join('') : '<p class="empty">Sem dados</p>';
    }

    // ==================== MODO KIOSK (Item 8) ====================
    let _kioskHistory = ['home'];
    function toggleKiosk() {
      document.documentElement.classList.toggle('kiosk');
      const isKiosk = document.documentElement.classList.contains('kiosk');
      showToast(isKiosk ? '🖥️ Modo Kiosk ativado (ESC para sair)' : '🖥️ Modo Kiosk desativado');
      updateKioskUI();
    }
    function kioskGoBack() {
      if (_kioskHistory.length > 1) { _kioskHistory.pop(); go(_kioskHistory[_kioskHistory.length - 1]); }
      else { go('home'); }
    }
    function updateKioskUI() {
      const isKiosk = document.documentElement.classList.contains('kiosk');
      const backBtn = document.getElementById('kioskBack');
      if (backBtn) backBtn.classList.toggle('kiosk-home', curScreen === 'home');
      const navMap = { home: 'kn-home', history: 'kn-history', employees: 'kn-employees', epis: 'kn-epis' };
      document.querySelectorAll('.kiosk-nav button').forEach(b => b.classList.remove('active'));
      const active = document.getElementById(navMap[curScreen]);
      if (active) active.classList.add('active');
    }

    // ==================== MIGRAÇÃO EXCEL (Item 11) ====================
    function importExcel(ev) {
      const f = ev.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = async function(e) {
        try {
          if (typeof XLSX === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
            script.onload = () => processExcel(e.target.result, f.name);
            document.head.appendChild(script);
          } else { processExcel(e.target.result, f.name); }
        } catch (err) { showToast('❌ Erro ao ler planilha'); }
      };
      reader.readAsArrayBuffer(f);
      ev.target.value = '';
    }
    function processExcel(data, filename) {
      const wb = XLSX.read(data, { type: 'array' });
      if (!wb.SheetNames.length) { showToast('⚠️ Planilha vazia'); return; }
      let importedEpis = 0, linkedPeriodicidades = 0, importedEmployees = 0;
      function excelDateToISO(val) {
        if (!val) return '';
        if (typeof val === 'number') { var d = new Date((val - 25569) * 86400000); return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0]; }
        var s = String(val).trim();
        if (!s || s.toUpperCase() === 'NA') return '';
        var d2 = new Date(s);
        return isNaN(d2.getTime()) ? s : d2.toISOString().split('T')[0];
      }
      var estoqueSheetName = wb.SheetNames.find(function(n) { return n.toUpperCase().replace(/\s+/g,' ').includes('ESTOQUE') && n.toUpperCase().replace(/\s+/g,' ').includes('CA'); });
      if (estoqueSheetName) {
        var wsEst = wb.Sheets[estoqueSheetName];
        var rowsEst = XLSX.utils.sheet_to_json(wsEst, { header: 1 });
        var caGroups = {};
        for (var i = 5; i < rowsEst.length; i++) {
          var row = rowsEst[i]; if (!row || row.length < 8) continue;
          var descricao = String(row[1] || '').trim();
          if (!descricao) continue;
          var fabricante = String(row[2] || '').trim();
          var caRaw = String(row[7] || '').trim();
          var vencimento = excelDateToISO(row[9]);
          var qtdEstoque = parseInt(row[4]) || 0;
          var estoqueMinVal = parseInt(row[5]) || 0;
          if (!caRaw || caRaw.toUpperCase() === 'NA') continue;
          if (/[a-z]/i.test(caRaw)) continue;
          var caNum = caRaw.replace(/[^\d]/g, '');
          if (!caNum) continue;
          var tamanho = 'Único';
          var sizeMatch = descricao.match(/(?:^|[\s-])[Nn][ºo°]\.?\s*\.?\s*([A-Za-z0-9]+)/);
          if (sizeMatch) { tamanho = sizeMatch[1]; }
          if (!caGroups[caNum]) {
            var nomeLimpo = descricao.replace(/(?:^|[\s-])[Nn][ºo°]\.?\s*\.?\s*[A-Za-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
            caGroups[caNum] = { nome: nomeLimpo, fabricante: fabricante, ca: caNum, caVal: vencimento.toUpperCase() !== 'NA' ? vencimento : '', tamanhos: [], estoque: {}, estoqueMin: estoqueMinVal };
          }
          var g = caGroups[caNum];
          if (g.tamanhos.indexOf(tamanho) === -1) g.tamanhos.push(tamanho);
          g.estoque[tamanho] = (g.estoque[tamanho] || 0) + qtdEstoque;
          if (estoqueMinVal > g.estoqueMin) g.estoqueMin = estoqueMinVal;
        }
        var importedCAKeys = Object.keys(caGroups);
        importedCAKeys.forEach(function(caKey) {
          var grp = caGroups[caKey];
          var existing = state.epis.find(function(e) { return e.ca === caKey; });
          if (existing) {
            existing.nome = grp.nome || existing.nome;
            existing.fabricante = grp.fabricante || existing.fabricante;
            existing.caVal = grp.caVal || existing.caVal;
            if (grp.tamanhos.length) existing.tamanhos = grp.tamanhos;
            if (Object.keys(grp.estoque).length) existing.estoque = grp.estoque;
            if (grp.estoqueMin) existing.estoqueMin = grp.estoqueMin;
            existing.updatedAt = new Date().toISOString();
            addPending('epi', 'upsert', Object.assign({}, existing));
          } else {
            var epi = { id: counters.epi++, nome: grp.nome, fabricante: grp.fabricante, ca: caKey, caVal: grp.caVal, tamanhos: grp.tamanhos, estoque: grp.estoque, renovacaoDias: 0, estoqueMin: grp.estoqueMin, updatedAt: new Date().toISOString() };
            state.epis.push(epi);
            addPending('epi', 'upsert', Object.assign({}, epi));
          }
          importedEpis++;
        });
      }
      var periodSheetName = wb.SheetNames.find(function(n) { return n.toUpperCase().includes('PERIODICIDADE'); });
      if (periodSheetName) {
        var wsPer = wb.Sheets[periodSheetName];
        var rowsPer = XLSX.utils.sheet_to_json(wsPer, { header: 1 });
        var periodicidades = [];
        for (var j = 9; j < rowsPer.length; j++) {
          var rPer = rowsPer[j]; if (!rPer || rPer.length < 5) continue;
          var descPer = String(rPer[1] || '').trim();
          var mediaPer = String(rPer[3] || '').trim();
          if (!descPer || !mediaPer) continue;
          var pm = mediaPer.match(/(\d+)\s*(DIA|DIAS|MÊS|MESES|ANO|ANOS)/i);
          if (!pm) continue;
          var pNum = parseInt(pm[1]);
          var pUnit = pm[2].toUpperCase();
          var pDays = 0;
          if (pUnit === 'DIA' || pUnit === 'DIAS') pDays = pNum;
          else if (pUnit === 'MÊS' || pUnit === 'MESES') pDays = pNum * 30;
          else if (pUnit === 'ANO' || pUnit === 'ANOS') pDays = pNum * 365;
          if (pDays > 0) periodicidades.push({ desc: descPer.toLowerCase(), days: pDays });
        }
        if (periodicidades.length) {
          var epiSearchPool = importedCAKeys && importedCAKeys.length ? state.epis.filter(function(e) { return importedCAKeys.indexOf(e.ca) !== -1; }) : state.epis;
          epiSearchPool.forEach(function(epi) {
            if (epi.renovacaoDias && epi.renovacaoDias > 0) return;
            var epiWords = (epi.nome || '').toLowerCase().split(/[\s\-/]+/).filter(function(w) { return w.length > 3; });
            if (!epiWords.length) return;
            var best = null, bestScore = 0;
            for (var p = 0; p < periodicidades.length; p++) {
              var per = periodicidades[p];
              var score = 0;
              epiWords.forEach(function(w) { if (per.desc.indexOf(w) !== -1) score++; });
              var isValid = score >= 2 || per.desc.indexOf(epiWords[0]) !== -1;
              if (isValid && score > bestScore) { bestScore = score; best = per; }
            }
            if (best) {
              epi.renovacaoDias = best.days;
              epi.updatedAt = new Date().toISOString();
              addPending('epi', 'upsert', Object.assign({}, epi));
              linkedPeriodicidades++;
            }
          });
        }
      }
      var wsFirst = wb.Sheets[wb.SheetNames[0]];
      var rowsFirst = XLSX.utils.sheet_to_json(wsFirst);
      if (rowsFirst.length) {
        rowsFirst.forEach(function(r) {
          var nome = r['NOME'] || r['nome'] || r['Nome'] || r['COLABORADOR'] || '';
          var matricula = String(r['MATRICULA'] || r['matricula'] || r['Matrícula'] || r['MAT'] || '');
          if (!nome || !matricula) return;
          var exists = state.employees.find(function(e) { return e.matricula === matricula; });
          if (!exists) {
            state.employees.push({ id: counters.emp++, nome: nome.toUpperCase().trim(), matricula, cargo: r['CARGO'] || r['cargo'] || 'Operacional', admissao: r['ADMISSAO'] || r['admissao'] || '', telefone: r['TELEFONE'] || r['telefone'] || '' });
            importedEmployees++;
          }
        });
      }
      if (importedEpis > 0 || importedEmployees > 0) { save(); recomputeCounters(); }
      showToast('✅ ' + importedEpis + ' EPIs importados, ' + linkedPeriodicidades + ' periodicidades vinculadas, ' + importedEmployees + ' colaboradores importados');
    }

    // ==================== QR CODE / FICHA DO COLABORADOR ====================
    function empQRUrl(e) {
      const base = location.href.split('#')[0].split('?')[0].replace(/index\.html$/, '').replace(/\/$/, '/');
      return base + 'ficha.html?emp=' + e.id;
    }
    function openQR(id) {
      const e = state.employees.find(x => x.id === id);
      if (!e) return;
      const url = empQRUrl(e);
      document.getElementById('qrName').textContent = e.nome;
      document.getElementById('qrMat').textContent = 'Mat: ' + e.matricula;
      const inp = document.getElementById('qrUrl'); inp.value = url;
      inp.onclick = function () { this.select(); try { document.execCommand('copy'); } catch (err) { } this.style.borderColor = 'var(--color-success)'; this.style.background = '#f0fdf4'; showToast('🔗 Link copiado!'); setTimeout(() => { this.style.borderColor = ''; this.style.background = ''; }, 1500); };
      const wrap = document.getElementById('qrBox'); wrap.innerHTML = '';
      try { new QRCode(wrap, { text: url, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.H }); }
      catch (err) { wrap.innerHTML = '<p class="empty">Falha ao gerar QR (sem internet).<br>Link: ' + esc(url) + '</p>'; }
      document.getElementById('qrModal').classList.add('show');
    }
    function closeQR() { document.getElementById('qrModal').classList.remove('show'); }

    // ==================== LEITOR DE QR CODE ====================
    let _scanStream = null, _scanTimer = null;
    function startScan() {
      const video = document.getElementById('scannerVideo');
      const status = document.getElementById('scanStatus');
      document.getElementById('scanModal').classList.add('show');
      status.textContent = 'Iniciando câmera…';
      video.srcObject = null;
      if (!('BarcodeDetector' in window)) {
        status.textContent = 'Este navegador não suporta leitura de QR na câmera.';
        return;
      }
      const detector = new BarcodeDetector({ formats: ['qr_code'] });
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
        _scanStream = stream; video.srcObject = stream;
        status.textContent = 'Aponte para o QR Code…';
        _scanTimer = setInterval(async () => {
          try {
            const codes = await detector.detect(video);
            if (codes && codes.length) {
              const text = codes[0].rawValue;
              stopScan();
              handleScanned(text);
              status.textContent = '';
            }
          } catch (err) { }
        }, 400);
      }).catch(() => { status.textContent = 'Sem permissão de câmera. Abra o link do QR no navegador.'; });
    }
    function stopScan() {
      if (_scanTimer) { clearInterval(_scanTimer); _scanTimer = null; }
      document.getElementById('scanModal').classList.remove('show');
      if (_scanStream) { _scanStream.getTracks().forEach(t => t.stop()); _scanStream = null; }
      const v = document.getElementById('scannerVideo'); if (v) v.srcObject = null;
    }
    function handleScanned(text) {
      let id = 0;
      try { id = parseInt(new URL(text).searchParams.get('emp') || '0', 10); } catch (err) { }
      if (!id) { id = parseInt(text, 10) || 0; }
      const e = state.employees.find(x => x.id === id);
      if (e) {
        state.cur.emp = e;
        state.cart = [];
        go('empview');
        showToast('✅ ' + e.nome);
      }
      else if (id && USE_API) { state.cur.emp = { id, nome: 'Carregando...', matricula: '' }; state.cart = []; go('empview'); syncEmpPublic(id); }
      else showToast('❌ Colaborador não encontrado no QR');
    }

    function renderEmpView() {
      const e = state.cur.emp;
      document.getElementById('empViewInfo').innerHTML = `
    <div class="card static" style="margin-top:12px;">
      <div style="display:flex;gap:14px;align-items:center;">
        <div class="avatar">${esc(e.nome.charAt(0))}</div>
        <div style="flex:1;">
          <div style="font-size:17px;font-weight:700;">${esc(e.nome)}</div>
          <div style="color:var(--gray);font-size:13px;">Mat: ${esc(e.matricula)} | Cargo: ${esc(e.cargo || '-')}</div>
          <div style="color:var(--gray);font-size:12px;">Admissão: ${fmtDate(e.admissao)}</div>
        </div>
      </div>
    </div>`;
      const list = (state._empPublic || state.entregas.filter(d => d.employeeId === e.id)).slice().reverse();
      document.getElementById('empDelivered2').innerHTML = empDeliveredHTML(state._empPublic || state.entregas.filter(d => d.employeeId === e.id));
      document.getElementById('empViewHistory').innerHTML = list.length ? list.map(d => {
        const total = d.itens.reduce((a, i) => a + i.qty, 0);
        return `
    <div class="card static">
      <div style="font-weight:600;">📅 ${fmtDateTime(d.data)} <span class="badge badge-info">${total} ${total === 1 ? 'item' : 'itens'}</span></div>
      <div style="font-size:12px;color:var(--gray);margin:6px 0;">${d.itens.map(i => `${i.qty}x ${esc(i.nome)} (${esc(i.tam)}) — ${esc(i.motivo)}`).join('<br>')}</div>
      <div style="display:flex;gap:6px;">
        <button class="btn btn-primary small" onclick="viewDelivery('${d.id}')">📄 Baixar Ficha</button>
        <button class="btn btn-success small" onclick="viewDeliveryWA('${d.id}')">📤 WhatsApp</button>
      </div>
    </div>`;
      }).join('') : '<p class="empty">Nenhuma entrega de EPI registrada para este colaborador.</p>';
    }
    function viewDeliveryWA(id) {
      state.lastDelivery = state.entregas.find(d => d.id === id);
      if (state.lastDelivery) sendWhatsApp();
    }

    // ==================== PDF ====================
    function generatePDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');
      const d = state.lastDelivery;
      if (!d) { showToast('❌ Entrega não encontrada'); return; }
      const e = d;
      const pw = 210, ph = 297;
      const ml = 12, mr = pw - 12;
      const now = new Date();
      const dataFmt = String(now.getDate()).padStart(2, '0') + '/' + String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear();

      function drawPageHeader(pageNum, total) {
        doc.setFillColor(30, 58, 138);
        doc.rect(0, 0, pw, 22, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11); doc.setFont('helvetica', 'bold');
        doc.text('FICHA DE CONTROLE DE EPI', pw / 2, 7, { align: 'center' });
        doc.setFontSize(7); doc.setFont('helvetica', 'normal');
        doc.text('SondaGuard', pw / 2, 12, { align: 'center' });
        doc.setFontSize(6);
        doc.text('Elaborador: Rafael Almeida', pw / 2, 16.5, { align: 'center' });
        doc.text('Aprovador: Alica Dayane Araujo Abreu', pw / 2, 20, { align: 'center' });
        doc.setFontSize(6.5);
        doc.text('Data: ' + dataFmt, 5, 7);
        doc.text('Revisão: 02', 5, 11);
        doc.text('Nº Contrato: 5900123734', 5, 15);
        doc.setTextColor(0, 0, 0);
      }

      function drawTerm(y) {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
        doc.text('TERMO DE RESPONSABILIDADE', ml, y); y += 5;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
        const termo = 'Declaro para os devidos fins, que ficarei responsável por todos os materiais e equipamentos de proteção individual – E.P.I.s recebidos neste ato pela SondaGuard, bem como fui capacitado e orientado nos procedimentos práticos de utilização e benefícios a minha saúde e integridade física. Portanto obrigo-me a usa-los para a finalidade a que se destinam, responsabilizando-me ainda por sua guarda e conservação, comunicando à empresa qualquer alteração que torne impróprio o seu uso, conforme o que determina a N.R.-6.7.1 da portaria 3214 da CLT. Declaro ainda que, em caso de danos, perda ou extravio, por negligência de minha parte, ficarei obrigado a pagá-los, tendo em vista pertencerem ao patrimônio desta Empresa e terem finalidade única e exclusiva de prestar segurança e bem estar dos funcionários.';
        let lines = doc.splitTextToSize(termo, pw - 24);
        doc.text(lines, ml, y); y += lines.length * 3; y += 6;
        doc.setFontSize(7);
        doc.text('Assinatura do Funcionário: _______________________________________________', ml, y); y += 8;
        return y;
      }

      function drawEmployeeInfo(y) {
        const rowH = 5.5;
        // Row 1: NOME | DATA DE ADMISSÃO | C.B.O
        doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
        doc.text('NOME:', ml, y);
        doc.setFont('helvetica', 'normal'); doc.text(e.employeeName || '-', ml + 18, y);
        doc.setFont('helvetica', 'bold'); doc.text('DATA DE ADMISSÃO:', 115, y);
        doc.setFont('helvetica', 'normal'); doc.text(fmtDate(e.admissao) || '-', 148, y);
        doc.setFont('helvetica', 'bold'); doc.text('C.B.O:', 175, y);
        doc.setFont('helvetica', 'normal'); doc.text(e.cargo || '-', 188, y);
        doc.line(ml, y + 1.5, mr, y + 1.5); y += rowH;

        // Row 2: FUNÇÃO | DATA DE DEMISSÃO
        doc.setFont('helvetica', 'bold'); doc.text('FUNÇÃO:', ml, y);
        doc.setFont('helvetica', 'normal'); doc.text(e.cargo || '-', ml + 18, y);
        doc.setFont('helvetica', 'bold'); doc.text('DATA DE DEMISSÃO:', 115, y);
        doc.setFont('helvetica', 'normal'); doc.text('(___/___/______)', 148, y);
        doc.line(ml, y + 1.5, mr, y + 1.5); y += rowH;

        // Row 3: MATRÍCULA | SETOR | UNIDADE / OBRA | CONTRATO
        doc.setFont('helvetica', 'bold'); doc.text('MATRÍCULA:', ml, y);
        doc.setFont('helvetica', 'normal'); doc.text(e.matricula || '-', ml + 22, y);
        doc.setFont('helvetica', 'bold'); doc.text('SETOR:', 65, y);
        doc.setFont('helvetica', 'normal'); doc.text(SETOR, 80, y);
        doc.setFont('helvetica', 'bold'); doc.text('UNIDADE / OBRA:', 115, y);
        doc.setFont('helvetica', 'normal'); doc.text('-', 145, y);
        doc.setFont('helvetica', 'bold'); doc.text('CONTRATO:', 165, y);
        doc.setFont('helvetica', 'normal'); doc.text('5900123734', 185, y);
        doc.line(ml, y + 1.5, mr, y + 1.5); y += rowH;
        return y;
      }

      function drawTableHeader(y) {
        const headerH = 10;
        const cols = [
          { label: 'QT.', x: ml, w: 7 },
          { label: 'DESCRIÇÃO DO EQUIPAMENTO', x: ml + 7, w: 51 },
          { label: 'Nº C.A', x: ml + 58, w: 15 },
          { label: 'QTD', x: ml + 73, w: 8 },
          { label: 'TAM.', x: ml + 81, w: 12 },
          { label: 'DATA DE\nRECEBIMENTO', x: ml + 93, w: 20 },
          { label: 'ASSINATURA\nDO FUNCIONÁRIO', x: ml + 113, w: 27 },
          { label: 'DATA DE\nDEVOLUÇÃO', x: ml + 140, w: 18 },
          { label: 'QTD', x: ml + 158, w: 8 },
          { label: 'MOTIVO\nSUBSTITUIÇÃO', x: ml + 166, w: 18 },
          { label: 'Obs.', x: ml + 184, w: 10 }
        ];
        doc.setTextColor(0, 0, 0);
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.3);
        doc.setFontSize(5.5); doc.setFont('helvetica', 'bold');
        cols.forEach(c => {
          doc.rect(c.x, y, c.w, headerH, 'D');
          const lines = c.label.split('\n');
          lines.forEach((l, i) => doc.text(l, c.x + 1, y + 3 + i * 2.8));
        });
        doc.setLineWidth(0.2);
        return { y: y + headerH, cols };
      }

      function drawTableRows(y, cols, items) {
        const rowH = 7;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
        const itemSigs = d.itemSigs || (Array.isArray(d.sig1) ? d.sig1 : []);
        items.forEach((it, idx) => {
          if (y + rowH > ph - 30) { doc.addPage(); drawPageHeader(2, 2); y = 28; const h = drawTableHeader(y); y = h.y; }
          for (let c = 0; c < cols.length; c++) doc.rect(cols[c].x, y, cols[c].w, rowH);
          doc.text(String(idx + 1), cols[0].x + 1.5, y + 5);
          doc.text(it.nome || '-', cols[1].x + 1, y + 5);
          doc.text(it.ca || '-', cols[2].x + 1, y + 5);
          doc.text(String(it.qty || ''), cols[3].x + 1.5, y + 5);
          doc.text(it.tam || '-', cols[4].x + 1, y + 5);
          doc.text(fmtDate(it.dataReceb || d.data), cols[5].x + 1, y + 5);
          if (itemSigs[idx]) {
            try { doc.addImage(itemSigs[idx], 'PNG', cols[6].x + 1, y + 0.5, cols[6].w - 2, rowH - 1); } catch (err) { doc.text('-', cols[6].x + 8, y + 5); }
          } else {
            doc.text('-', cols[6].x + 8, y + 5);
          }
          doc.text('-', cols[7].x + 6, y + 5);
          doc.text('-', cols[8].x + 1.5, y + 5);
          doc.text(it.motivo || '-', cols[9].x + 1, y + 5);
          doc.text(it.obs || '-', cols[10].x + 1, y + 5);
          y += rowH;
        });
        // Fill remaining empty rows
        const remaining = Math.max(0, 10 - items.length);
        for (let i = 0; i < remaining; i++) {
          if (y + rowH > ph - 30) break;
          cols.forEach(c => doc.rect(c.x, y, c.w, rowH));
          doc.text(String(items.length + i + 1), cols[0].x + 1.5, y + 5);
          y += rowH;
        }
        return y;
      }

      function drawSignatures(y) {
        const hasItemSigs = d.itemSigs && d.itemSigs.length > 0;
        const hasLegacySig1 = d.sig1 && typeof d.sig1 === 'string';

        if (hasLegacySig1 && !hasItemSigs) {
          doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
          doc.text('Assinatura do Colaborador:', ml, y);
          try { doc.addImage(d.sig1, 'PNG', ml, y + 2, 50, 15); } catch (err) { }
          doc.line(ml, y + 20, ml + 70, y + 20);
          doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
          doc.text(e.employeeName || '', ml, y + 24);
          y += 30;
        }

        doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
        doc.text('Assinatura do Responsável pela Entrega (SESMT):', ml, y);
        if (d.sig2) { try { doc.addImage(d.sig2, 'PNG', ml, y + 2, 50, 15); } catch (err) { } }
        doc.line(ml, y + 20, ml + 70, y + 20);
        doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
        doc.text('Responsável', ml, y + 24);

        const y3 = y + 32;
        doc.setFont('helvetica', 'bold'); doc.setFontSize(7);
        doc.text('Local: ', ml, y3);
        doc.setFont('helvetica', 'normal'); doc.text('Parauapebas, PA', ml + 14, y3);
        doc.setFont('helvetica', 'bold'); doc.text('Data: ', ml + 60, y3);
        doc.setFont('helvetica', 'normal'); doc.text(fmtDateTime(d.data), ml + 72, y3);
        return y3 + 8;
      }

      // === PAGE 1: FICHA DE CONTROLE DE EPI ===
      drawPageHeader();
      let y = 28;
      y = drawTerm(y);
      y = drawEmployeeInfo(y);
      y += 2;
      const tbl = drawTableHeader(y);
      y = tbl.y;
      y = drawTableRows(y, tbl.cols, d.itens || []);
      y += 6;
      y = drawSignatures(y);

      const nomeArq = 'Ficha_EPI_' + (e.employeeName || '').replace(/\s/g, '_') + '_' + d.id + '.pdf';
      doc.save(nomeArq);
      showToast('📄 PDF gerado!');
    }

    // ==================== WHATSAPP ====================
    function sendWhatsApp() {
      const d = state.lastDelivery;
      const emp = state.employees.find(x => x.id === d.employeeId);
      const tel = (emp && emp.telefone) ? emp.telefone.replace(/\D/g, '') : '';
      if (tel.length < 10) { showToast('📱 Colaborador sem telefone cadastrado'); return; }
      const texto = 'Ficha de Entrega de EPI\n' + EMPRESA + '\n' +
        'Colaborador: ' + d.employeeName + ' (Mat: ' + d.matricula + ')\n' +
        'Data: ' + fmtDateTime(d.data) + '\n\n' +
        d.itens.map(i => '• ' + i.qty + 'x ' + i.nome + ' (' + i.tam + ') — ' + i.motivo).join('\n');
      window.open('https://wa.me/55' + tel + '?text=' + encodeURIComponent(texto), '_blank');
    }

    // ==================== INIT ====================
    load();
    setLogo();
    updateSyncBadge();
    updateNotifBadge();
    const fbReady = initFirebase();
    (function () {
      const qp = new URLSearchParams(location.search);
      const empId = parseInt(qp.get('emp') || '0', 10);
      if (empId) {
        if (fbReady && db) {
          connectFirebase().then(() => syncEmpPublic(empId));
        } else {
          const e = state.employees.find(x => x.id === empId);
          if (e) { state.cur.emp = e; state.cart = []; go('empview'); }
          else { go('home'); showToast('❌ Colaborador não encontrado'); }
        }
      } else {
        if (fbReady && db) {
          connectFirebase().then(() => go('home'));
        } else {
          go('home');
        }
      }
    })();

    // ESC para sair do modo kiosk (Item 8)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.documentElement.classList.contains('kiosk')) {
        toggleKiosk();
      }
    });
