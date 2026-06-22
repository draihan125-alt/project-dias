const pool = require('../config/db');

// ✅ CREATE
const create = async (req, res) => {
  try {
    const {
      equipment,
      uob,
      asset,
      location,
      condition,
      calibration,
      date,
      status,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO improvements
      (equipment, uob, asset, location, condition, calibration, date, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [equipment, uob, asset, location, condition, calibration, date, status]
    );

    res.json({
      status: 'success',
      message: 'Data created',
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'error',
      message: 'Create failed',
    });
  }
};

// ✅ GET ALL
const getAll = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM improvements ORDER BY id DESC'
    );

    res.json({
      status: 'success',
      message: 'Data found',
      data: {
        total: result.rows.length,
        rows: result.rows,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error' });
  }
};

// ✅ DELETE
const remove = async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM improvements WHERE id=$1', [id]);

  res.json({
    status: 'success',
    message: 'Deleted',
  });
};

// ✅ UPDATE
const update = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      equipment,
      uob,
      asset,
      location,
      condition,
      calibration,
      date,
      status,
    } = req.body;

    const result = await pool.query(
      `UPDATE improvements SET
      equipment=$1,
      uob=$2,
      asset=$3,
      location=$4,
      condition=$5,
      calibration=$6,
      date=$7,
      status=$8
      WHERE id=$9
      RETURNING *`,
      [
        equipment,
        uob,
        asset,
        location,
        condition,
        calibration,
        date,
        status,
        id,
      ]
    );

    res.json({
      status: 'success',
      message: 'Updated',
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 'error' });
  }
};

module.exports = {
  create,
  getAll,
  remove,
  update,
};
