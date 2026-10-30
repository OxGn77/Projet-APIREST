const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model.js');

exports.login = async (req, res) => {
    let user = await User.findOne({ where :{ username: req.body.username }});
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const valid = await argon2.verify(user.password, req.body.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    
    return res.status(200).json({
      token: token,
      user: {
        id: user.id,
        username: user.username
        }})
    }

exports.register = async (req, res) => {
    let user = await User.findOne({ 
        where :{ username: req.body.username } });
    if (user) {
        return res.status(400).json({ message: 'Username already used' });
    }
    const hash = await argon2.hash(req.body.password, {
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 5,
    });

     const newUser = await User.create({
        username: req.body.username,
        password: hash
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET 
    );

    return res.status(201).json({
      token: token,
      user: {
        id: newUser.id,
        username: newUser.username
        }})

}

exports.me = async (req, res) => {
  try {
    
    const user = await User.findByPk(req.payload.userId, {
      attributes: ['id', 'username']
    });

   
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json({
      id: user.id,
      username: user.username
    });

  } catch (e) {
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
exports.logout = async (req, res) => {
    res.json({ message: 'Logged out' });
}
