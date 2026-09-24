// ============ Camada de dados (SQLite) ============
// Per-resource CRUD com versionamento (updated_at) e operações transacionais.
// Em caso de foguete, o estoque é validado e baixado dentro da própria
// transação de criação da entrega (atomicidade).
//
// Migração: se existir data/db.json (formato antigo) e o banco SQLite vazio,
// os dados são importados automaticamente.

const Database = require('better-sqlite3');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { SEED_EMPLOYEES, SEED_EPIS } = require('./seed');
const { hashPassword } = require('./crypto');

const DATA_DIR = process.env.DB_DIR || path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, process.env.DB_FILE || 'app.db');
const LEGACY_FILE = path.join(DATA_DIR, 'db.json');
const REAL_DATA_FILE = path.join(DATA_DIR, 'real-employees.json');

function ensureDir() { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); }

let db;
function init() {
  ensureDir();
  db = new Database(DB_FILE);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT 'colaborador',
      pass_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      matricula TEXT NOT NULL,
      cargo TEXT NOT NULL DEFAULT '',
      telefone TEXT NOT NULL DEFAULT '',
      admissao TEXT NOT NULL DEFAULT '',
      public_token TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS epis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      ca TEXT NOT NULL,
      ca_val TEXT NOT NULL DEFAULT '',
      tamanhos TEXT NOT NULL DEFAULT '[]',
      estoque TEXT NOT NULL DEFAULT '{}',
      renovacao_dias INTEGER NOT NULL DEFAULT 0,
      estoque_min INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      deleted INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS entregas (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      employee_id INTEGER NOT NULL,
      employee_name TEXT NOT NULL,
      matricula TEXT NOT NULL DEFAULT '',
      cargo TEXT NOT NULL DEFAULT '',
      admissao TEXT NOT NULL DEFAULT '',
      itens TEXT NOT NULL DEFAULT '[]',
      sig1 TEXT,
      sig2 TEXT,
      created_at TEXT NOT NULL,
      created_by INTEGER,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_entregas_employee ON entregas(employee_id);
    CREATE INDEX IF NOT EXISTS idx_entregas_data ON entregas(data);
    CREATE INDEX IF NOT EXISTS idx_epis_ca ON epis(ca);
  `);
  const employeeColumns = db.prepare('PRAGMA table_info(employees)').all();
  if (!employeeColumns.some(column => column.name === 'public_token')) db.exec('ALTER TABLE employees ADD COLUMN public_token TEXT NOT NULL DEFAULT ""');
  migrateOrSeed();
}

// ---------- mapeamento de linhas ----------
function e2o(r) { return r ? { id: r.id, nome: r.nome, matricula: r.matricula, cargo: r.cargo, telefone: r.telefone, admissao: r.admissao, publicToken: r.public_token || '', updatedAt: r.updated_at } : null; }
function ep2o(r) { return r ? { id: r.id, nome: r.nome, ca: r.ca, caVal: r.ca_val, tamanhos: JSON.parse(r.tamanhos || '[]'), estoque: JSON.parse(r.estoque || '{}'), renovacaoDias: r.renovacao_dias, estoqueMin: r.estoque_min, updatedAt: r.updated_at } : null; }
function en2o(r) { return r ? { id: r.id, data: r.data, employeeId: r.employee_id, employeeName: r.employee_name, matricula: r.matricula, cargo: r.cargo, admissao: r.admissao, itens: JSON.parse(r.itens || '[]'), sig1: r.sig1 || null, sig2: r.sig2 || null, createdAt: r.created_at, createdBy: r.created_by, updatedAt: r.updated_at } : null; }

function estoqueLimitado(epi) { return !!epi && !!epi.estoque && Object.keys(epi.estoque).length > 0; }

// ---------- migração / seed ----------
function migrateOrSeed() {
  const empCount = db.prepare('SELECT COUNT(*) c FROM employees WHERE deleted = 0').get().c;
  const legacy = fs.existsSync(LEGACY_FILE) ? JSON.parse(fs.readFileSync(LEGACY_FILE, 'utf8')) : null;
  const realData = fs.existsSync(REAL_DATA_FILE) ? JSON.parse(fs.readFileSync(REAL_DATA_FILE, 'utf8')) : null;

  if (empCount === 0 && realData && Array.isArray(realData.employees)) {
    // importa dados reais (excluído do git)
    const now = new Date().toISOString();
    const insE = db.prepare('INSERT INTO employees (nome, matricula, cargo, telefone, admissao, updated_at) VALUES (?,?,?,?,?,?)');
    const insP = db.prepare('INSERT INTO epis (nome, ca, ca_val, tamanhos, estoque, renovacao_dias, estoque_min, updated_at) VALUES (?,?,?,?,?,?,?,?)');
    const t = db.transaction(() => {
      realData.employees.forEach(e => { if (e && e.nome) insE.run(e.nome, String(e.matricula || ''), e.cargo || '', e.telefone || '', e.admissao || '', now); });
      (realData.epis || []).forEach(p => { if (p && p.nome) insP.run(p.nome, String(p.ca || ''), p.caVal || '', JSON.stringify(p.tamanhos || ['Único']), JSON.stringify(p.estoque || {}), p.renovacaoDias || 0, 0, now); });
    });
    t();
    ensureSeededUsers();
    console.log('[db] dados reais importados de real-employees.json (' + realData.employees.length + ' funcionários)');
  } else if (empCount === 0 && legacy && Array.isArray(legacy.employees)) {
    // importa do formato antigo
    const now = new Date().toISOString();
    const insE = db.prepare('INSERT INTO employees (nome, matricula, cargo, telefone, admissao, updated_at) VALUES (?,?,?,?,?,?)');
    const insP = db.prepare('INSERT INTO epis (nome, ca, ca_val, tamanhos, estoque, renovacao_dias, estoque_min, updated_at) VALUES (?,?,?,?,?,?,?,?)');
    const insD = db.prepare('INSERT INTO entregas (id, data, employee_id, employee_name, matricula, cargo, admissao, itens, sig1, sig2, created_at, created_by, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
    const t = db.transaction(() => {
      legacy.employees.forEach(e => { if (e && e.nome) insE.run(e.nome, String(e.matricula || ''), e.cargo || '', e.telefone || '', e.admissao || '', now); });
      legacy.epis.forEach(p => { if (p && p.nome) insP.run(p.nome, String(p.ca || ''), p.caVal || '', JSON.stringify(p.tamanhos || ['Único']), JSON.stringify(p.estoque || {}), p.renovacaoDias || 0, 0, now); });
      (legacy.entregas || []).forEach(d => { if (d && d.id) insD.run(d.id, d.data, d.employeeId || d.employee_id || 0, d.employeeName, d.matricula || '', d.cargo || '', d.admissao || '', JSON.stringify(d.itens || []), d.sig1 || null, d.sig2 || null, now, null, now); });
    });
    t();
    ensureSeededUsers();
    console.log('[db] dados antigos importados de db.json');
  } else if (empCount === 0 && !legacy) {
    seedNow();
  } else {
    ensureSeededUsers();
  }
}

function seedNow() {
  const now = new Date().toISOString();
  const insE = db.prepare('INSERT INTO employees (nome, matricula, cargo, telefone, admissao, updated_at) VALUES (?,?,?,?,?,?)');
  const insP = db.prepare('INSERT INTO epis (nome, ca, ca_val, tamanhos, estoque, renovacao_dias, estoque_min, updated_at) VALUES (?,?,?,?,?,?,?,?)');
  const t = db.transaction(() => {
    SEED_EMPLOYEES.forEach(e => insE.run(e.nome, String(e.matricula), e.cargo || '', e.telefone || '', e.admissao || '', now));
    SEED_EPIS.forEach(p => insP.run(p.nome, String(p.ca), p.caVal || '', JSON.stringify(p.tamanhos || ['Único']), JSON.stringify(p.estoque || {}), p.renovacaoDias || 0, 0, now));
  });
  t();
  ensureSeededUsers();
}

// ---------- usuários ----------
function ensureSeededUsers() {
  const c = db.prepare('SELECT COUNT(*) c FROM users').get().c;
  if (c > 0) return;
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.error('[FATAL] ADMIN_PASSWORD não definido. Crie server/.env com ADMIN_PASSWORD=sua_senha');
    process.exit(1);
  }
  const salt = require('crypto').randomBytes(16).toString('hex');
  const hash = hashPassword(password, salt);
  db.prepare('INSERT INTO users (username, name, role, pass_hash, created_at) VALUES (?,?,?,?,?)')
    .run('admin', 'Administrador', 'admin', salt + ':' + hash, new Date().toISOString());
  console.log('[db] usuário admin criado com sucesso');
}
function findUserByUsername(username) { return db.prepare('SELECT * FROM users WHERE username = ?').get(username); }
function findUserById(id) { return db.prepare('SELECT * FROM users WHERE id = ?').get(id); }

// ---------- sync ----------
function getSync() {
  return {
    employees: db.prepare('SELECT * FROM employees WHERE deleted = 0 ORDER BY id').all().map(e2o),
    epis: db.prepare('SELECT * FROM epis WHERE deleted = 0 ORDER BY id').all().map(ep2o),
    entregas: db.prepare('SELECT * FROM entregas ORDER BY data').all().map(en2o)
  };
}

// ---------- employees ----------
function listEmployees() { return db.prepare('SELECT * FROM employees WHERE deleted = 0 ORDER BY id').all().map(e2o); }
function getEmployee(id) { return e2o(db.prepare('SELECT * FROM employees WHERE id = ? AND deleted = 0').get(id)); }
function createEmployee(d) {
  const now = new Date().toISOString();
  const publicToken = d.publicToken || crypto.randomBytes(24).toString('hex');
  const info = db.prepare('INSERT INTO employees (nome, matricula, cargo, telefone, admissao, public_token, updated_at) VALUES (?,?,?,?,?,?,?)')
    .run(d.nome, d.matricula, d.cargo || '', d.telefone || '', d.admissao || '', publicToken, now);
  return { employee: getEmployee(info.lastInsertRowid), updatedAt: now };
}
function updateEmployee(id, d, baseVersion) {
  const cur = db.prepare('SELECT * FROM employees WHERE id = ? AND deleted = 0').get(id);
  if (!cur) return { error: 'not_found' };
  if (baseVersion && cur.updated_at !== baseVersion) return { error: 'conflict', current: e2o(cur) };
  const now = new Date().toISOString();
  db.prepare('UPDATE employees SET nome=?, matricula=?, cargo=?, telefone=?, admissao=?, updated_at=? WHERE id=?')
    .run(d.nome, d.matricula, d.cargo || '', d.telefone || '', d.admissao || '', now, id);
  return { employee: getEmployee(id), updatedAt: now };
}
function deleteEmployee(id) { const now = new Date().toISOString(); db.prepare('UPDATE employees SET deleted = 1, updated_at = ? WHERE id = ?').run(now, id); }

// ---------- epis ----------
function listEpis() { return db.prepare('SELECT * FROM epis WHERE deleted = 0 ORDER BY id').all().map(ep2o); }
function getEpi(id) { return ep2o(db.prepare('SELECT * FROM epis WHERE id = ? AND deleted = 0').get(id)); }
function createEpi(d) {
  const now = new Date().toISOString();
  const info = db.prepare('INSERT INTO epis (nome, ca, ca_val, tamanhos, estoque, renovacao_dias, estoque_min, updated_at) VALUES (?,?,?,?,?,?,?,?)')
    .run(d.nome, d.ca, d.caVal || '', JSON.stringify(d.tamanhos || ['Único']), JSON.stringify(d.estoque || {}), d.renovacaoDias || 0, d.estoqueMin || 0, now);
  return { epi: getEpi(info.lastInsertRowid), updatedAt: now };
}
function updateEpi(id, d, baseVersion) {
  const cur = db.prepare('SELECT * FROM epis WHERE id = ? AND deleted = 0').get(id);
  if (!cur) return { error: 'not_found' };
  if (baseVersion && cur.updated_at !== baseVersion) return { error: 'conflict', current: ep2o(cur) };
  const now = new Date().toISOString();
  db.prepare('UPDATE epis SET nome=?, ca=?, ca_val=?, tamanhos=?, estoque=?, renovacao_dias=?, estoque_min=?, updated_at=? WHERE id=?')
    .run(d.nome, d.ca, d.caVal || '', JSON.stringify(d.tamanhos || ['Único']), JSON.stringify(d.estoque || {}), d.renovacaoDias || 0, d.estoqueMin || 0, now, id);
  return { epi: getEpi(id), updatedAt: now };
}
function deleteEpi(id) { const now = new Date().toISOString(); db.prepare('UPDATE epis SET deleted = 1, updated_at = ? WHERE id = ?').run(now, id); }

// ---------- entregas ----------
function listEntregas() { return db.prepare('SELECT * FROM entregas ORDER BY data').all().map(en2o); }
function getEntrega(id) { return en2o(db.prepare('SELECT * FROM entregas WHERE id = ?').get(id)); }
function entregasByEmployee(employeeId) { return db.prepare('SELECT * FROM entregas WHERE employee_id = ? ORDER BY data').all(employeeId).map(en2o); }

// Cria uma entrega validando e baixando o estoque de forma atômica.
function createEntrega(delivery, userId) {
  const epis = db.prepare('SELECT * FROM epis WHERE deleted = 0').all().map(ep2o);
  const epiMap = new Map(epis.map(p => [p.id, p]));

  const createTx = db.transaction(() => {
    // validação e baixa de estoque
    for (const it of (delivery.itens || [])) {
      const epi = epiMap.get(Number(it.epiId));
      if (!epi) continue;
      if (!estoqueLimitado(epi)) continue;
      const qtd = epi.estoque[it.tam] || 0;
      if (qtd < it.qty) {
        throw Object.assign(new Error('estoque_insuficiente'), { estoque_insuficiente: true, epi: epi.nome });
      }
      epi.estoque[it.tam] = qtd - it.qty;
      db.prepare('UPDATE epis SET estoque = ?, updated_at = ? WHERE id = ?')
        .run(JSON.stringify(epi.estoque), new Date().toISOString(), epi.id);
    }

    const now = new Date().toISOString();
    const id = delivery.id || ('FICHA-' + now.replace(/\D/g, '').slice(0, 14) + '-' + Math.floor(Math.random() * 1000));
    db.prepare('INSERT INTO entregas (id, data, employee_id, employee_name, matricula, cargo, admissao, itens, sig1, sig2, created_at, created_by, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)')
      .run(id, delivery.data, delivery.employeeId, delivery.employeeName, delivery.matricula || '', delivery.cargo || '', delivery.admissao || '', JSON.stringify(delivery.itens || []), delivery.sig1 || null, delivery.sig2 || null, now, userId, now);
    return id;
  });

  let id;
  try { id = createTx(); } catch (err) { if (err.estoque_insuficiente) return { error: 'estoque_insuficiente', message: err.message, epi: err.epi }; throw err; }
  return { entrega: getEntrega(id) };
}

// Exclui uma entrega e devolve os itens ao estoque (transação atômica).
function deleteEntrega(d) {
  const tx = db.transaction(() => {
    for (const it of (d.itens || [])) {
      const cur = db.prepare('SELECT * FROM epis WHERE id = ?').get(it.epiId);
      if (!cur) continue;
      const epi = ep2o(cur);
      if (!estoqueLimitado(epi)) continue;
      epi.estoque[it.tam] = (epi.estoque[it.tam] || 0) + it.qty;
      db.prepare('UPDATE epis SET estoque = ?, updated_at = ? WHERE id = ?')
        .run(JSON.stringify(epi.estoque), new Date().toISOString(), it.epiId);
    }
    db.prepare('DELETE FROM entregas WHERE id = ?').run(d.id);
  });
  tx();
}

// ---------- relatórios ----------
function totalEstoque(epi) { return Object.values(epi.estoque || {}).reduce((a, b) => a + b, 0); }

function report({ from, to, epiId, employeeId }) {
  let sql = 'SELECT * FROM entregas WHERE 1=1';
  const params = [];
  if (from) { sql += ' AND data >= ?'; params.push(new Date(from).toISOString()); }
  if (to) { sql += ' AND data < ?'; params.push(new Date(new Date(to).getTime() + 86400000).toISOString()); }
  if (employeeId) { sql += ' AND employee_id = ?'; params.push(Number(employeeId)); }
  const entregas = db.prepare(sql).all(...params).map(en2o);
  const filtradas = epiId ? entregas.filter(d => (d.itens || []).some(i => Number(i.epiId) === Number(epiId))) : entregas;

  const byEpi = {};
  const byEmp = {};
  filtradas.forEach(d => {
    d.itens.forEach(it => {
      const k = String(it.epiId);
      byEpi[k] = byEpi[k] || { epiId: it.epiId, nome: it.nome, ca: it.ca || '', qty: 0, empCount: new Set(), last: d.data };
      byEpi[k].qty += it.qty; byEpi[k].empCount.add(d.employeeId);
      if (new Date(d.data) > new Date(byEpi[k].last)) byEpi[k].last = d.data;
    });
    byEmp[d.employeeId] = byEmp[d.employeeId] || { employeeId: d.employeeId, employeeName: d.employeeName, qty: 0, count: 0 };
    byEmp[d.employeeId].qty += d.itens.reduce((a, i) => a + i.qty, 0);
    byEmp[d.employeeId].count++;
  });
  const epiList = Object.values(byEpi).sort((a, b) => b.qty - a.qty).map(x => ({ ...x, empCount: x.empCount.size }));
  const empList = Object.values(byEmp).sort((a, b) => b.qty - a.qty);

  // vencimentos próximos (CA) e estoque baixo
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const caProximos = listEpis().filter(p => p.caVal).map(p => ({ id: p.id, nome: p.nome, ca: p.ca, caVal: p.caVal, dias: Math.ceil((new Date(p.caVal) - today) / 86400000) }))
    .filter(x => x.dias <= 90).sort((a, b) => a.dias - b.dias).map(x => ({ ...x, vencido: x.dias < 0 }));
  const baixoEstoque = listEpis().filter(p => estoqueLimitado(p) && p.estoqueMin > 0 && totalEstoque(p) <= p.estoqueMin)
    .map(p => ({ id: p.id, nome: p.nome, ca: p.ca, total: totalEstoque(p), estoqueMin: p.estoqueMin }));

  return {
    periodo: { from: from || null, to: to || null },
    totalEntregas: filtradas.length,
    totalItens: filtradas.reduce((a, d) => a + d.itens.reduce((b, i) => b + i.qty, 0), 0),
    byEpi: epiList, byEmp: empList, caProximos: caProximos, baixoEstoque: baixoEstoque
  };
}

// Merge (last-write-wins por updated_at) usado pelo PUT /api/state do frontend.
// - employees/epis: atualiza se o client for mais novo ou não existir; nunca
//   recria itens apagados (evita "ressurreição" de um dispositivo offline).
// - client.deleted: lista de IDs a excluir (soft delete) vinda do frontend.
// - entregas: insert se ainda não existir (append-only); delete para os IDs apagados.
function mergeState(client) {
  const now = new Date().toISOString();
  const c = client || {};

  const selE = db.prepare('SELECT * FROM employees WHERE id = ?');
  const selP = db.prepare('SELECT * FROM epis WHERE id = ?');
  const selD = db.prepare('SELECT id FROM entregas WHERE id = ?');

  const insE = db.prepare('INSERT INTO employees (id, nome, matricula, cargo, telefone, admissao, updated_at, deleted) VALUES (?,?,?,?,?,?,?,?)');
  const updE = db.prepare('UPDATE employees SET nome=?, matricula=?, cargo=?, telefone=?, admissao=?, updated_at=? WHERE id=?');
  const delE = db.prepare('UPDATE employees SET deleted=1, updated_at=? WHERE id=?');

  const insP = db.prepare('INSERT INTO epis (id, nome, ca, ca_val, tamanhos, estoque, renovacao_dias, estoque_min, updated_at, deleted) VALUES (?,?,?,?,?,?,?,?,?,?)');
  const updP = db.prepare('UPDATE epis SET nome=?, ca=?, ca_val=?, tamanhos=?, estoque=?, renovacao_dias=?, estoque_min=?, updated_at=? WHERE id=?');
  const delP = db.prepare('UPDATE epis SET deleted=1, updated_at=? WHERE id=?');

  const insD = db.prepare('INSERT OR IGNORE INTO entregas (id, data, employee_id, employee_name, matricula, cargo, admissao, itens, sig1, sig2, created_at, created_by, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
  const delD = db.prepare('DELETE FROM entregas WHERE id = ?');

  const tx = db.transaction(() => {
    for (const e of (c.employees || [])) {
      if (!e || !e.id) continue;
      const cur = selE.get(Number(e.id));
      const ts = e.updatedAt || now;
      if (!cur) insE.run(Number(e.id), e.nome, String(e.matricula || ''), e.cargo || '', e.telefone || '', e.admissao || '', ts, 0);
      else if (ts >= cur.updated_at) updE.run(e.nome, String(e.matricula || ''), e.cargo || '', e.telefone || '', e.admissao || '', ts, Number(e.id));
    }
    (c.deletedEmployees || []).forEach(id => { const r = selE.get(Number(id)); if (r && !r.deleted) delE.run(now, Number(id)); });

    for (const p of (c.epis || [])) {
      if (!p || !p.id) continue;
      const cur = selP.get(Number(p.id));
      const ts = p.updatedAt || now;
      if (!cur) insP.run(Number(p.id), p.nome, String(p.ca || ''), p.caVal || '', JSON.stringify(p.tamanhos || ['Único']), JSON.stringify(p.estoque || {}), p.renovacaoDias || 0, p.estoqueMin || 0, ts, 0);
      else if (ts >= cur.updated_at) updP.run(p.nome, String(p.ca || ''), p.caVal || '', JSON.stringify(p.tamanhos || ['Único']), JSON.stringify(p.estoque || {}), p.renovacaoDias || 0, p.estoqueMin || 0, ts, Number(p.id));
    }
    (c.deletedEpis || []).forEach(id => { const r = selP.get(Number(id)); if (r && !r.deleted) delP.run(now, Number(id)); });

    for (const d of (c.entregas || [])) {
      if (!d || !d.id) continue;
      if (!selD.get(d.id)) insD.run(d.id, d.data, d.employeeId || d.employee_id || 0, d.employeeName || '', d.matricula || '', d.cargo || '', d.admissao || '', JSON.stringify(d.itens || []), d.sig1 || null, d.sig2 || null, d.createdAt || now, d.createdBy || null, d.updatedAt || now);
    }
    (c.deletedEntregas || []).forEach(id => delD.run(id));
  });
  tx();
  return getSync();
}

// ---------- backup ----------
function backup() { return { geradoEm: new Date().toISOString(), ...getSync() }; }
function restore(data) {
  const now = new Date().toISOString();
  const insE = db.prepare('INSERT OR REPLACE INTO employees (id, nome, matricula, cargo, telefone, admissao, updated_at, deleted) VALUES (?,?,?,?,?,?,?,0)');
  const insP = db.prepare('INSERT OR REPLACE INTO epis (id, nome, ca, ca_val, tamanhos, estoque, renovacao_dias, estoque_min, updated_at, deleted) VALUES (?,?,?,?,?,?,?,?,?,0)');
  const insD = db.prepare('INSERT OR REPLACE INTO entregas (id, data, employee_id, employee_name, matricula, cargo, admissao, itens, sig1, sig2, created_at, created_by, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
  const t = db.transaction(() => {
    if (Array.isArray(data.employees)) data.employees.forEach(e => insE.run(e.id || undefined, e.nome, e.matricula, e.cargo || '', e.telefone || '', e.admissao || '', e.updatedAt || now));
    if (Array.isArray(data.epis)) data.epis.forEach(p => insP.run(p.id || undefined, p.nome, p.ca, p.caVal || '', JSON.stringify(p.tamanhos || []), JSON.stringify(p.estoque || {}), p.renovacaoDias || 0, p.estoqueMin || 0, p.updatedAt || now));
    if (Array.isArray(data.entregas)) data.entregas.forEach(d => insD.run(d.id, d.data, d.employeeId || 0, d.employeeName, d.matricula || '', d.cargo || '', d.admissao || '', JSON.stringify(d.itens || []), d.sig1 || null, d.sig2 || null, d.createdAt || now, d.createdBy || null, d.updatedAt || now));
  });
  t();
  return getSync();
}

module.exports = {
  init,
  findUserByUsername, findUserById,
  getSync, listEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee,
  listEpis, getEpi, createEpi, updateEpi, deleteEpi,
  listEntregas, getEntrega, entregasByEmployee, createEntrega, deleteEntrega,
  report, backup, restore, estoqueLimitado, totalEstoque, mergeState
};