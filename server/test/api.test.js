// Testes de integração da API (node:test + fetch nativo).
// Executar a partir de server/:   npm test
// Usa um banco SQLite temporário isolado para não tocar nos dados reais.

const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PORT = 3999;
const BASE = 'http://localhost:' + PORT;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'epi-test-'));
const TEST_PASSWORD = 'TestPassword123!';

let child;
let token = '';
let epiId = null;
let empId = null;
let empPublicToken = '';

function req(method, url, body, headers = {}) {
  const opts = { method, headers: { ...headers } };
  if (body !== undefined) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
  return fetch(BASE + url, opts).then(async r => ({ status: r.status, json: await r.json().catch(() => ({})) }));
}

function auth(method, url, body) { return req(method, url, body, { Authorization: 'Bearer ' + token }); }

before(async () => {
  child = spawn(process.execPath, ['server.js'], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT), DB_DIR: TMP, BACKUP_INTERVAL_MIN: '99999', ADMIN_PASSWORD: TEST_PASSWORD },
    stdio: 'pipe'
  });
  // aguarda o servidor responder
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(BASE + '/api/health'); if (r.ok) return; } catch { }
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error('Servidor de teste não iniciou');
});

after(async () => {
  if (child) { child.kill(); await new Promise(resolve => child.once('exit', resolve)); }
  for (let i = 0; i < 10; i++) {
    try { fs.rmSync(TMP, { recursive: true, force: true }); return; } catch { await new Promise(r => setTimeout(r, 100)); }
  }
});

test('health público', async () => {
  const r = await req('GET', '/api/health');
  assert.equal(r.status, 200);
  assert.equal(r.json.ok, true);
});

test('sem token -> 401', async () => {
  const r = await req('GET', '/api/employees');
  assert.equal(r.status, 401);
});

test('login senha errada -> 401', async () => {
  const r = await req('POST', '/api/auth/login', { username: 'admin', password: 'errada' });
  assert.equal(r.status, 401);
});

test('login correto', async () => {
  const r = await req('POST', '/api/auth/login', { username: 'admin', password: TEST_PASSWORD });
  assert.equal(r.status, 200);
  token = r.json.token;
  assert.ok(token);
});

test('sync retorna dados seed', async () => {
  const r = await auth('GET', '/api/sync');
  assert.equal(r.status, 200);
  assert.ok(r.json.employees.length > 0);
  assert.ok(r.json.epis.length > 0);
});

test('cria colaborador com nome/matrícula', async () => {
  const r = await auth('POST', '/api/employees', { nome: 'TESTE FUNCIONARIO', matricula: '777777' });
  assert.equal(r.status, 201);
  empId = r.json.employee.id;
  empPublicToken = r.json.employee.publicToken;
  assert.ok(empId);
});

test('matrícula duplicada -> 409', async () => {
  const r = await auth('POST', '/api/employees', { nome: 'OUTRO', matricula: '777777' });
  assert.equal(r.status, 409);
});

test('cria EPI', async () => {
  const r = await auth('POST', '/api/epis', { nome: 'LUVA TESTE', ca: '55555', estoque: { M: 3 } });
  assert.equal(r.status, 201);
  epiId = r.json.epi.id;
  assert.ok(epiId);
});

test('entrega baixa estoque atomicamente', async () => {
  const r = await auth('POST', '/api/entregas', {
    employeeId: empId, data: new Date().toISOString(),
    itens: [{ epiId, tam: 'M', qty: 1, nome: 'LUVA TESTE', ca: '55555' }],
    sig1: 'A', sig2: 'B'
  });
  assert.equal(r.status, 201);
  const e = await auth('GET', '/api/epis');
  const epi = e.json.find(p => p.id === epiId);
  assert.equal(epi.estoque.M, 2);
});

test('estoque insuficiente -> 409 e mantém estoque', async () => {
  const r = await auth('POST', '/api/entregas', {
    employeeId: empId, data: new Date().toISOString(),
    itens: [{ epiId, tam: 'M', qty: 999, nome: 'LUVA TESTE', ca: '55555' }]
  });
  assert.equal(r.status, 409);
  const e = await auth('GET', '/api/epis');
  assert.equal(e.json.find(p => p.id === epiId).estoque.M, 2);
});

test('excluir entrega devolve estoque', async () => {
  const l = await auth('GET', '/api/entregas?employeeId=' + empId);
  const d = l.json.find(x => x.itens.some(i => i.epiId === epiId));
  const r = await auth('DELETE', '/api/entregas/' + d.id);
  assert.equal(r.status, 200);
  const e = await auth('GET', '/api/epis');
  assert.equal(e.json.find(p => p.id === epiId).estoque.M, 3);
});

test('relatório agrega dados', async () => {
  const r = await auth('GET', '/api/reports');
  assert.equal(r.status, 200);
  assert.ok(Array.isArray(r.json.byEpi));
});

test('export CSV', async () => {
  const res = await fetch(BASE + '/api/reports/export?format=csv', { headers: { Authorization: 'Bearer ' + token } });
  assert.equal(res.status, 200);
  const txt = await res.text();
  assert.match(txt, /EPI/);
});

test('rota pública exige token', async () => {
  const semToken = await req('GET', '/api/public/employee/' + empId);
  assert.equal(semToken.status, 404);
  const r = await req('GET', '/api/public/employee/' + empId + '?token=' + encodeURIComponent(empPublicToken));
  assert.equal(r.status, 200);
  assert.equal(r.json.employee.id, empId);
});

test('arquivos sensíveis não são servidos pelo backend', async () => {
  const r = await fetch(BASE + '/server/.env');
  assert.equal(r.status, 404);
});

test('service worker é servido pelo backend', async () => {
  const r = await fetch(BASE + '/sw.js');
  assert.equal(r.status, 200);
});

// ========== NOVOS TESTES ==========

test('atualiza colaborador (PUT)', async () => {
  const r = await auth('PUT', '/api/employees/' + empId, { nome: 'TESTE ATUALIZADO', matricula: '777777', cargo: 'NOVO CARGO' });
  assert.equal(r.status, 200);
  assert.equal(r.json.employee.nome, 'TESTE ATUALIZADO');
  assert.equal(r.json.employee.cargo, 'NOVO CARGO');
});

test('atualizar colaborador inexistente -> 404', async () => {
  const r = await auth('PUT', '/api/employees/99999', { nome: 'X', matricula: '99999' });
  assert.equal(r.status, 404);
});

test('atualizar colaborador com matrícula duplicada -> 409', async () => {
  await auth('POST', '/api/employees', { nome: 'PARA DUPLICAR', matricula: '888888' });
  const r = await auth('PUT', '/api/employees/' + empId, { nome: 'TENTATIVA', matricula: '888888' });
  assert.equal(r.status, 409);
});

test('excluir colaborador (DELETE)', async () => {
  const r = await auth('DELETE', '/api/employees/' + empId);
  assert.equal(r.status, 200);
  assert.equal(r.json.ok, true);
  const list = await auth('GET', '/api/employees');
  assert.ok(!list.json.find(e => e.id === empId));
});

test('atualiza EPI (PUT)', async () => {
  const r = await auth('PUT', '/api/epis/' + epiId, { nome: 'LUVA ATUALIZADA', ca: '55555', estoque: { M: 10 } });
  assert.equal(r.status, 200);
  assert.equal(r.json.epi.nome, 'LUVA ATUALIZADA');
  assert.equal(r.json.epi.estoque.M, 10);
});

test('atualizar EPI inexistente -> 404', async () => {
  const r = await auth('PUT', '/api/epis/99999', { nome: 'X', ca: '99999' });
  assert.equal(r.status, 404);
});

test('atualizar EPI com CA duplicado -> 409', async () => {
  await auth('POST', '/api/epis', { nome: 'CA DUPLICADO', ca: '66666' });
  const r = await auth('PUT', '/api/epis/' + epiId, { nome: 'TENTATIVA', ca: '66666' });
  assert.equal(r.status, 409);
});

test('excluir EPI (DELETE)', async () => {
  const r = await auth('DELETE', '/api/epis/' + epiId);
  assert.equal(r.status, 200);
  assert.equal(r.json.ok, true);
  const list = await auth('GET', '/api/epis');
  assert.ok(!list.json.find(e => e.id === epiId));
});

test('logout invalida token', async () => {
  const loginR = await req('POST', '/api/auth/login', { username: 'admin', password: TEST_PASSWORD });
  const tempToken = loginR.json.token;
  const r = await req('POST', '/api/auth/logout', undefined, { Authorization: 'Bearer ' + tempToken });
  assert.equal(r.status, 200);
  const check = await req('GET', '/api/employees', undefined, { Authorization: 'Bearer ' + tempToken });
  assert.equal(check.status, 401);
});

test('rate limit: 5 logins errados -> 429', async () => {
  for (let i = 0; i < 5; i++) {
    await req('POST', '/api/auth/login', { username: 'admin', password: 'wrong' + i });
  }
  const r = await req('POST', '/api/auth/login', { username: 'admin', password: 'wrong' });
  assert.equal(r.status, 429);
});

test('campos obrigatórios: criar employee sem nome -> 400', async () => {
  const r = await auth('POST', '/api/employees', { matricula: '99999' });
  assert.equal(r.status, 400);
});

test('campos obrigatórios: criar epi sem CA -> 400', async () => {
  const r = await auth('POST', '/api/epis', { nome: 'SEM CA' });
  assert.equal(r.status, 400);
});

test('rota inexistente -> 404', async () => {
  const r = await auth('GET', '/api/rotaqueexiste');
  assert.equal(r.status, 404);
});