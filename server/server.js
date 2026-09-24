// ============ Servidor do App de EPI ============
// Serve o index.html (front atual) e expõe a API REST.
//
// Como rodar:
//   cd server
//   npm install
//   cp .env.example .env   (defina ADMIN_PASSWORD)
//   npm start

require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const backup = require('./backup');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:' + PORT;

db.init();
backup.start();

const app = express();
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(self)');
  next();
});
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

// API
app.use('/api', require('./routes/api'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/epis', require('./routes/epis'));
app.use('/api/entregas', require('./routes/entregas'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/public', require('./routes/public'));

const publicRoot = path.join(__dirname, '..');
const publicFiles = new Set(['index.html', 'app.js', 'domain.js', 'styles.css', 'ficha.html', 'sw.js', 'logo.png', 'manifest.webmanifest', 'firebase-config.js']);
app.get('*', (req, res, next) => {
  const file = req.path === '/' ? 'index.html' : req.path.replace(/^\//, '');
  if (!publicFiles.has(file)) return next();
  res.sendFile(path.join(publicRoot, file));
});

// Rotas não encontradas na API
app.use('/api', (req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

// Tratamento de erros (sempre JSON)
app.use((err, req, res, _next) => {
  console.error('[erro]', err.message);
  if (err.estoque_insuficiente) res.status(409).json({ error: 'Estoque insuficiente' });
  else res.status(500).json({ error: 'Erro interno' });
});

app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const nets = os.networkInterfaces();
  let lanIP = 'localhost';
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) { lanIP = net.address; break; }
    }
  }
  console.log('==============================================');
  console.log('  App EPI · servidor rodando');
  console.log('  Local:   http://localhost:' + PORT);
  console.log('  Rede:    http://' + lanIP + ':' + PORT);
  console.log('==============================================');
});
