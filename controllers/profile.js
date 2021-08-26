// advanced function syntax
const handleProfile = db => (req, res) => {
  console.log('req.params: ', req.params);
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({
      id,
    })
    .then(user => {
      console.log(user);
      if (user.length) res.json(user[0]);
      else res.status(400).json('User Not Found!');
    })
    .catch(err => res.status(400).json('Error getting user!'));

  // TESTING:

  // database.users.forEach(user => {
  //   if (user.id === id) {
  //     found = true;
  //     return res.json(user);
  //   }
  // });
  // if (!found) res.status(400).json('no such user found...');
};

// CommonJS syntax;  for use with register syntax in server.js
module.exports = {
  handleProfile,
};
