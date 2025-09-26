const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let users = []; // In-memory user store for demo

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: 'Username already exists.' });
  }
  users.push({ username, password, email: `${username}@example.com` });
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, message: 'Login successful.', user });
  } else {
    res.json({ success: false, message: 'Invalid credentials.' });
  }
});

app.get('/api/profile', (req, res) => {
  const { username } = req.query;
  const user = users.find(u => u.username === username);
  if (user) {
    res.json({ email: user.email, username: user.username });
  } else {
    res.status(404).json({ error: 'User not found.' });
  }
});

app.post('/api/logout', (req, res) => {
  res.json({ success: true });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
