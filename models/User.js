const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // stored as bcrypt hash, never plain text
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bloodGroup: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: true,
    field: 'blood_group',
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('donor', 'patient', 'admin'),
    allowNull: false,
    defaultValue: 'patient',
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // only relevant for donors
  },
}, {
  tableName: 'users',
  timestamps: true, // adds createdAt, updatedAt automatically
});

module.exports = User;
