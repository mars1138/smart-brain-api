const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '987',
      has: '',
      email: 'john@gmail.com',
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  //   res.json('signing in...');
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in...');
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
  });

  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) res.status(400).json('no such user found...');
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user);
    }
  });

  if (!found) res.status(400).json('no such user found...');
});

// bcrypt.hash('bacon', null, null, function (err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare('bacon', hash, function (err, res) {
//   // res == true
// });
// bcrypt.compare('veggies', hash, function (err, res) {
//   // res = false
// });

// bcrypt.compare(
//   'apples',
//   '$2a$10$pJaoy77jDJc2h.VDAllOAemkpM2EmhwM7SmjNmw7npH38Fhx.i0sq',
//   function (err, res) {
//     console.log(res);
//   }
// );
// bcrypt.compare(
//   'veggies',
//   '$2a$10$pJaoy77jDJc2h.VDAllOAemkpM2EmhwM7SmjNmw7npH38Fhx.i0sq',
//   function (err, res) {
//     console.log(res);
//   }
// );

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});

// App layout
/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user object
/profile/:userId --> GET = user object
/image --> PUT = user object

*/
