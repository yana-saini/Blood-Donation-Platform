const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route  GET /api/users/me
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

// @route  PUT /api/users/me
const updateMyProfile = async (req, res) => {
  try {
    const { name, phone, bloodGroup, city, availability } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (bloodGroup !== undefined) user.bloodGroup = bloodGroup;
    if (city !== undefined) user.city = city;
    if (availability !== undefined) user.availability = availability;

    await user.save();

    const { password, ...userData } = user.toJSON();
    res.json({ message: 'Profile updated', user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

// @route  PUT /api/users/switch-role
// Lets a donor become a patient or a patient become a donor, using the SAME account.
// Returns a brand new JWT because the role is baked into the token.
const switchRole = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin accounts cannot switch roles' });
    }

    // Toggle: donor -> patient, patient -> donor
    user.role = user.role === 'donor' ? 'patient' : 'donor';
    await user.save();

    // Issue a fresh token so the new role takes effect immediately
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const { password, ...userData } = user.toJSON();

    res.json({
      message: `You are now registered as a ${user.role}`,
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to switch role', error: error.message });
  }
};

// @route  GET /api/users/donors?bloodGroup=O+&city=Mumbai
const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const where = { role: 'donor', availability: true };
    if (bloodGroup) where.bloodGroup = bloodGroup;
    if (city) where.city = { [Op.like]: `%${city}%` };

    const donors = await User.findAll({
      where,
      attributes: { exclude: ['password'] },
    });

    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search donors', error: error.message });
  }
};

// @route  GET /api/users  (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// @route  DELETE /api/users/:id  (admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  switchRole,
  searchDonors,
  getAllUsers,
  deleteUser,
};