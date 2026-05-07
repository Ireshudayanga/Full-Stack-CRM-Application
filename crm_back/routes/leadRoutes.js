const express = require('express');
const { createLead, getLeads, getLeadById, updateLead, deleteLead, getDashboardAnalytics } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All lead routes are protected

router.get('/analytics', getDashboardAnalytics);
router.route('/')
  .post(createLead)
  .get(getLeads);

router.route('/:id')
  .get(getLeadById)
  .put(updateLead)
  .delete(deleteLead);

module.exports = router;
