const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
  getMyProfile,
  updateMyProfile,
  switchRole,
  searchDonors,
  getAllUsers,
  deleteUser,
} = require('../controllers/userController');

router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);
router.put('/switch-role', protect, authorize('donor', 'patient'), switchRole);
router.get('/donors', protect, authorize('patient', 'admin'), searchDonors);
router.get('/', protect, authorize('admin'), getAllUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;