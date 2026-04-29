const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API working, Database Connected' });
});

app.get('/students', async (req, res) => {
  const result = await pool.query('SELECT * FROM students');
  res.json(result.rows);
});

app.get('/departments', async (req, res) => {
  const result = await pool.query('SELECT * FROM departments');
  res.json(result.rows);
});

app.post('/students', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query('INSERT INTO students (student_name, age, dept_id) VALUES ($1, $2, $3) RETURNING *', [name, email]);
  res.json(result.rows[0]);
});

app.post('/departments', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query('INSERT INTO departments(dept_id, dept_name) VALUES ($1, $2) RETURNING *', [dept_id, dept_name]);
  res.json(result.rows[0]);
});