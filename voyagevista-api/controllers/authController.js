const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // Destructuring fields from request body
    const { name, lastname, email, password } = req.body;
    
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      lastname,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // After saving, exclude the password from the user data to be returned
    const userToReturn = await User.findById(user.id).select('-password');

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: userToReturn });  // Return user data alongside the token
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and exclude the password from the returned document
    let user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    // Note: You'll need to retrieve the user with the password to verify it.
    const userWithPassword = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, userWithPassword.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });  // Return user data alongside the token
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.editUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body; // Destructure the new role from the request body

    // Validate role
    if (role !== 'admin' && role !== 'simple') {
      return res.status(400).json({ msg: 'Invalid role' });
    }

    // Find the user and update the role
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({ msg: 'User role updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
