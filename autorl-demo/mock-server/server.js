const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Simple in-memory toggle for which mobile mock to serve
let activeVariant = 'mobile1';

app.get('/api/variant', (req, res) => {
  res.json({ variant: activeVariant });
});

app.post('/api/variant', (req, res) => {
  const v = req.body && req.body.variant;
  if (v === 'mobile1' || v === 'mobile2') {
    activeVariant = v;
    return res.json({ ok: true, variant: activeVariant });
  }
  res.status(400).json({ ok: false, error: 'invalid variant' });
});

// Serve the existing mock pages under /mock/mobile
app.get('/mock/mobile', (req, res) => {
  const file = activeVariant === 'mobile2' ? 'mobile2.html' : 'mobile1.html';
  res.sendFile(path.resolve(__dirname, '../backend/mock_pages', file));
});

// Simple API endpoints for products, transactions, bookings
const db = require('./db.json');

app.get('/api/products', (req, res) => res.json(db.products));
app.get('/api/products/:id', (req, res) => {
  const p = db.products.find(x => x.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: 'not found' });
  res.json(p);
});

app.get('/api/transactions', (req, res) => res.json(db.transactions));
app.post('/api/transactions', (req, res) => {
  const t = { id: db.transactions.length + 1, ...req.body };
  db.transactions.push(t);
  res.status(201).json(t);
});

app.get('/api/bookings', (req, res) => res.json(db.bookings));
app.post('/api/bookings', (req, res) => {
  const b = { id: db.bookings.length + 1, ...req.body };
  db.bookings.push(b);
  res.status(201).json(b);
});

app.listen(PORT, () => console.log(`Mock server running on http://localhost:${PORT}`));
