const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'patient_id',
    references: { model: User, key: 'id' },
  },
  donorId: {
    type: DataTypes.INTEGER,
    allowNull: true, // may be unassigned until a donor accepts
    field: 'donor_id',
    references: { model: User, key: 'id' },
  },
  bloodGroup: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: false,
    field: 'blood_group',
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  tableName: 'requests',
  timestamps: true,
});

// Relationships (foreign keys)
User.hasMany(Request, { foreignKey: 'patientId', as: 'sentRequests' });
User.hasMany(Request, { foreignKey: 'donorId', as: 'receivedRequests' });
Request.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });
Request.belongsTo(User, { foreignKey: 'donorId', as: 'donor' });

module.exports = Request;
