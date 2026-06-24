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
// ✅ TAMBAH DI SINI (JANGAN DI ATAS, JANGAN DI BAWAH LISTEN)
app.post('/equipments', async (req, res) => {
  const {
    equipment,
    asset,
    location,
    condition,
    calibration,
    date_in,
    date_out,
    status
  } = req.body;

  try {
await pool.query(
  `INSERT INTO equipments 
  (equipment, asset, location, condition, calibration, date_in, date_out, status)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
  [equipment, asset, location, condition, calibration, date_in, date_out, status]
);

    res.send("✅ Data masuk");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error");
  }
});

// ✅ JANGAN UBAH INI
app.listen(3000, '0.0.0.0', () => {
  console.log('Server jalan di 3000');
});
