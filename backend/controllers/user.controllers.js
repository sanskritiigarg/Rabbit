import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  // Create a JWT payload
  const payload = { user: { _id: user._id, role: user.role } };

  // Sign and send token with user data
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '40h' });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'User already exists' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password should be atleast of 6 characters' });

    user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user);

    if (!token) throw new Error('Token generation failed');

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = generateToken(user);

    if (!token) throw new Error('Token generation failed');

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

export { registerUser, loginUser, getProfile };
