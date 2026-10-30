const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model.js');

exports.login = async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const valid = await argon2.verify(user.password, req.body.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}

exports.register = async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).json({ message: 'Username already used' });
    }
    const hash = await argon2.hash(req.body.password, {
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 5,
    });

}
