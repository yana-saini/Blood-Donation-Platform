const Request = require('../models/Request');
const User = require('../models/User');
const { createNotification } = require('./notificationController');

// @route  POST /api/requests  (patient)
const createRequest = async (req, res) => {
  try {
    const { donorId, bloodGroup, message } = req.body;

    if (!bloodGroup) {
      return res.status(400).json({ message: 'Blood group is required' });
    }

    const request = await Request.create({
      patientId: req.user.id,
      donorId: donorId || null,
      bloodGroup,
      message,
      status: 'pending',
    });

    if (donorId) {
      await createNotification(
        donorId,
        `New blood request (${bloodGroup}) from a patient`,
        'request'
      );
    }

    res.status(201).json({ message: 'Request created', request });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create request', error: error.message });
  }
};

// @route  GET /api/requests/my  (protected)
const getMyRequests = async (req, res) => {
  try {
    const { role, id } = req.user;

    let requests;
    if (role === 'donor') {
      requests = await Request.findAll({
        where: { donorId: id },
        include: [{ model: User, as: 'patient', attributes: ['id', 'name', 'city', 'phone'] }],
        order: [['createdAt', 'DESC']],
      });
    } else {
      requests = await Request.findAll({
        where: { patientId: id },
        include: [{ model: User, as: 'donor', attributes: ['id', 'name', 'city', 'phone'] }],
        order: [['createdAt', 'DESC']],
      });
    }

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
  }
};

// @route  PUT /api/requests/:id/accept  (donor)
const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.donorId && request.donorId !== req.user.id) {
      return res.status(403).json({ message: 'This request is not assigned to you' });
    }

    request.donorId = req.user.id;
    request.status = 'accepted';
    await request.save();

    await createNotification(request.patientId, 'Your blood request was accepted', 'accepted');

    res.json({ message: 'Request accepted', request });
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept request', error: error.message });
  }
};

// @route  PUT /api/requests/:id/reject  (donor)
const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.donorId && request.donorId !== req.user.id) {
      return res.status(403).json({ message: 'This request is not assigned to you' });
    }

    request.status = 'rejected';
    await request.save();

    await createNotification(request.patientId, 'Your blood request was rejected', 'rejected');

    res.json({ message: 'Request rejected', request });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject request', error: error.message });
  }
};

// @route  GET /api/requests  (admin only)
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      include: [
        { model: User, as: 'patient', attributes: ['id', 'name', 'city'] },
        { model: User, as: 'donor', attributes: ['id', 'name', 'city'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  acceptRequest,
  rejectRequest,
  getAllRequests,
};