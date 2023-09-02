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
    connectionString: `${process.env.DB_URL}`,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();
app.use(express.json());
app.use(cors());

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
