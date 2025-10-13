import { User } from '../models/user.models.js';

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({
      email,
      name,
      password,
      role: role,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User Not Found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User Not Found' });

    await user.deleteOne();
    res.status(200).json({ message: 'User succesfully deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getUsers, addUser, updateUser, deleteUser };
