const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { name, email, picture, token } = req.body;

  let user = new User({ name, email, picture, tokens: [token] });
  if (req.user) {
    user = req.user;
    user.tokens.push(token);
  }

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRETKEY);
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Some error occured' });
  }
}

const getUser = (req, res) => {
  const { name, email, picture } = req.user;

  try {
    res.send({ name, email, picture });
  } catch (error) {
    res.status(500).send({ error: 'Some error occured' });
  }
}

module.exports = { createUser, getUser };