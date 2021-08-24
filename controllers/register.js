const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json('Unable to register!'));

  // return db('users')
  //   .returning('*')
  //   .insert({
  //     email: email,
  //     name: name,
  //     joined: new Date(),
  //   })
  //   .then(user => {
  //     res.json(user[0]); // make sure we are not potentially returning an array
  //   })

  // bcrypt.hash(password, null, null, function (err, hash) {
  //   console.log(hash);
  // });

  // TESTING:
  // database.users.push({
  //   id: '125',
  //   name: name,
  //   email: email,
  //   entries: 0,
  //   joined: new Date(),
  // });
  // res.json(database.users[database.users.length - 1]);
};

// CommonJS syntax;  for use with register syntax in server.js
module.exports = {
  handleRegister: handleRegister,
};
