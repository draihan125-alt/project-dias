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
app.get('/barang', (req, res) => {
  res.json([
    {
      id: 1,
      equipment: "Laptop",
      usb: "USB1",
      asset: "A001",
      location: "Room 1",
      condition: "Good",
      calibration: "Yes",
      date: "2026-01-01",
      status: "OK"
    },
    {
      id: 2,
      equipment: "Printer",
      usb: "USB2",
      asset: "A002",
      location: "Room 2",
      condition: "Good",
      calibration: "No",
      date: "2026-01-02",
      status: "NG"
    }
  ]);
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