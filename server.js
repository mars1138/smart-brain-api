const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// controllers:
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// TESTING;
// const db = knex({
//   client: `${process.env.DB_CLIENT}`,
//   connection: {
//     host: `${process.env.DB_HOST}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PASSWORD}`,
//     database: `${process.env.DB_NAME}`,
//   },
// });

// db.select('*')
//   .from('users')
//   .then((data) => console.log(data));

const app = express();
app.use(express.json());
app.use(cors());

// TESTING during initial setup
// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'John',
//       email: 'john@gmail.com',
//       password: 'cookies',
//       entries: 1,
//       joined: new Date(),
//     },
//     {
//       id: '124',
//       name: 'Sally',
//       email: 'sally@gmail.com',
//       password: 'bananas',
//       entries: 2,
//       joined: new Date(),
//     },
//   ],
//   login: [
//     {
//       id: '987',
//       has: '',
//       email: 'john@gmail.com',
//     },
//   ],
// };

app.get('/', (req, res) => {
  // res.send(database.users);
  res.send('Success!');
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// advanced function syntax
app.get('/profile/:id', profile.handleProfile(db));

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

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});

// App layout
/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user object
/profile/:userId --> GET = user object
/image --> PUT = user object

*/
