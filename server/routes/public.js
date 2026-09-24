const express = require('express');
const crypto = require('crypto');
const db = require('../db');

const router = express.Router();
router.get('/employee/:id', (req, res) => {
  const token = String(req.query.token || '');
  const emp = db.getEmployee(req.params.id);
  if (!emp || !emp.publicToken || !token || token.length !== emp.publicToken.length || !crypto.timingSafeEqual(Buffer.from(token), Buffer.from(emp.publicToken))) return res.status(404).json({ error: 'Ficha não encontrada' });
  const entregas = db.entregasByEmployee(emp.id).map(d => ({
    id: d.id, data: d.data, itens: d.itens,
    employeeName: d.employeeName, matricula: d.matricula,
    cargo: d.cargo, admissao: d.admissao
  }));
  res.json({ employee: emp, entregas });
});

module.exports = router;