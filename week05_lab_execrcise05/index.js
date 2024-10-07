const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();

app.use(express.json());

router.get('/home', (req, res) => {
  res.send('This is home router');
});

router.get('/profile', (req, res) => {
  res.send('This is profile router');
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: false,
      message: 'Username and password are required',
    });
  }

  const userFilePath = path.join(__dirname, 'user.json');

  fs.readFile(userFilePath, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      return next(parseErr);
    }

    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.json({
        status: false,
        message: 'User Name is invalid',
      });
    }

    if (user.password !== password) {
      return res.json({
        status: false,
        message: 'Password is invalid',
      });
    }

    res.json({
      status: true,
      message: 'User Is valid',
    });
  });
});

router.get('/logout', (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).send('Username is required');
  }

  res.send(`<b>${username} successfully logout.</b>`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

app.use('/', router);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log('Web Server is listening at port ' + PORT);
});
