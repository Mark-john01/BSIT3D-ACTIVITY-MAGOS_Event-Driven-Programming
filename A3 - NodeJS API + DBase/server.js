const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_activity3d'
});

app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tbl_users');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/users/:username', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM tbl_users WHERE fld_username = ?',
      [req.params.username]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/messages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tbl_messages');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/messages/:username', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM tbl_messages WHERE fld_username = ?',
      [req.params.username]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});