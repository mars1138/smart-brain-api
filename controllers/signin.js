const handleSignin = (req, res, db, bcrypt) => {
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      console.log(data);
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      console.log(isValid);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            console.log('User: ', user);
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('Unable to get user!'));
      } else {
        res.status(400).json('Wrong credentials!');
      }
    })
    .catch(err => res.status(400).json('Wrong credentials!!!'));

  // TESTING
  // //   res.json('signing in...');
  // if (
  //   req.body.email === database.users[0].email &&
  //   req.body.password === database.users[0].password
  // ) {
  //   res.json(database.users[0]); // testing valid user data sent to front end
  // } else {
  //   res.status(400).json('error logging in...');
  // }
};

// CommonJS syntax;  for use with register syntax in server.js
module.exports = {
  handleSignin: handleSignin,
};
