
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(bodyParser.json());

/* BEGIN - create routes here */

//* GET/users
app.get('/users', (req, res) => {
  res.json(users);
});

//* GET/users/1
app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(user => user._id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

//*POST/users
app.post('/users', (req, res) => {
  const newUser = {
    _id: users.length + 1,
    ...req.body,
    isActive: true
  };
  users.push(newUser);
  res.json(users[users.length - 1]);
});

//* PUT/users/1
app.put('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(user => user._id === userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.occupation = req.body.occupation || user.occupation;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

//* DELETE/users/1
app.delete('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(user => user._id === userId);
  if (user) {
    user.isActive = false;
    res.send('deleted');
  } else {
    res.status(404).send('User not found');
  }
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))