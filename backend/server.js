const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'arem_db',
  password: '111',
  port: 5433,
});

// ✅ GET DATA
app.get('/barang', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipments');
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error server');
  }
});

// ✅ POST DATA
app.post('/barang', async (req, res) => {
  const { equipment, usb, asset, location, condition, calibration, date, status } = req.body;

  try {
   await pool.query(
  'INSERT INTO equipments (equipment, usb, asset, location, condition, calibration, date, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
  [equipment, usb, asset, location, condition, calibration, date, status]
);

    res.json({ message: 'Data berhasil ditambah' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error insert');
  }
});

// ✅ PORT UNTUK DEPLOY
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});