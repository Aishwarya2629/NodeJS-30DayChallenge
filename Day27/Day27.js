const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const users = [
  { id: 1, username: 'admin', password: '123', role: 'admin' },
  { id: 2, username: 'user', password: '123', role: 'user' }
];

const JWT_SECRET = 'aishwarya';

function authenticateAndAuthorize(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      const user = users.find(u => u.id === decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      if (req.requiredRole && user.role !== req.requiredRole) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      req.user = user;
      next(); 
    });
  }


function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);
    res.json({ token });
  });
});

app.get('/protected-route', authenticateAndAuthorize, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.get('/admin-route', authenticateAndAuthorize, (req, res, next) => {
  req.requiredRole = 'admin';
  next();
}, (req, res) => {
  res.json({ message: 'This is an admin-only route' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});