const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
  createRequest,
  getMyRequests,
  acceptRequest,
  rejectRequest,
  getAllRequests,
} = require('../controllers/requestController');

router.post('/', protect, authorize('patient'), createRequest);
router.get('/my', protect, getMyRequests);
router.put('/:id/accept', protect, authorize('donor'), acceptRequest);
router.put('/:id/reject', protect, authorize('donor'), rejectRequest);
router.get('/', protect, authorize('admin'), getAllRequests);

module.exports = router;