// ✅ IMPORT
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// ✅ APP
const app = express();
app.use(cors());
app.use(express.json());

// ✅ DATABASE
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'arem_db',
 password: '111',
  port: 5433,
});
pool.connect()
  .then(() => {
    console.log('✅ Database connect');
  })
  .catch(err => {
    console.error('❌ Database error:', err);
  });
``
console.log('✅ ROUTE EQUIPMENTS TERLOAD');
app.get('/', (req, res) => {
  res.send('SERVER HIDUP ✅');
});
// ✅ ROUTE HARUS DI ATAS
app.get('/equipments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipments');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'gagal ambil data' });
  }
});

// ✅ BARU LISTEN PALING BAWAH
app.listen(3000, '0.0.0.0', () => {
  console.log('Server jalan di 3000');
});

