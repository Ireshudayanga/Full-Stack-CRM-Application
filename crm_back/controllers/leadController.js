const leadService = require('../services/leadService');

const createLead = async (req, res) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await leadService.getLeads();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    res.json(lead);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body);
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    await leadService.deleteLead(req.params.id);
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getDashboardAnalytics = async (req, res) => {
  try {
    const analytics = await leadService.getDashboardAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getDashboardAnalytics
};
