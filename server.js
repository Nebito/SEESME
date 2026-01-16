
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'seesme_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// GET all publications
app.get('/api/publications', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM publications ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new publication
app.post('/api/publications', async (req, res) => {
  const { title, author, abstract, type, keywords, date, doi, url, downloads } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO publications (title, author, abstract, type, keywords, date, doi, url, downloads) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, author, abstract, type, JSON.stringify(keywords), date, doi, url, downloads || 0]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// USER API
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, joined_date, last_login FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    res.status(200).json({ message: 'Role updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEO API
app.get('/api/seo', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM seo_settings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/seo/:page', async (req, res) => {
  const { page } = req.params;
  const { title, description, keywords } = req.body;
  try {
    await pool.query(
      'INSERT INTO seo_settings (page, title, description, keywords) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=?, description=?, keywords=?',
      [page, title, description, keywords, title, description, keywords]
    );
    res.status(200).json({ message: 'SEO updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
