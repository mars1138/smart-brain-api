const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: `${process.env.API_KEY}`,
});

const handleApiCall = (req, res) => {
  app.models
    .predict('face-detection', req.body.input)
    .then((data) => {
      console.log('Clarifai data: ', data);
      return res.json(data);
    })
    .catch((err) => res.status(400).json('Unable to work with API...'));
};

const handleImage = (req, res, db) => {
  console.log('req.body: ', req.body);
  const { id } = req.body;

  // can use .increment function instead of doing a Select
  db('users2')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('unable to get entries!'));

  // TESTING:
  // let found = false;
  // database.users.forEach(user => {
  //   if (user.id === id) {
  //     found = true;
  //     user.entries++;
  //     return res.json(user.entries);
  //   }
  // });
  // if (!found) res.status(400).json('no such user found...');
};

// CommonJS syntax;  for use with register syntax in server.js
module.exports = {
  handleImage,
  handleApiCall,
};
