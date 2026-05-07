const Lead = require('../models/Lead');

const createLead = async (data) => {
  const lead = new Lead(data);
  return await lead.save();
};

const getLeads = async () => {
  return await Lead.find().sort({ createdAt: -1 });
};

const getLeadById = async (id) => {
  const lead = await Lead.findById(id);
  if (!lead) throw new Error('Lead not found');
  return lead;
};

const updateLead = async (id, data) => {
  const lead = await Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!lead) throw new Error('Lead not found');
  return lead;
};

const deleteLead = async (id) => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) throw new Error('Lead not found');
  return lead;
};

const getDashboardAnalytics = async () => {
  const leads = await Lead.find();
  
  let total = leads.length;
  let newLeads = 0;
  let qualified = 0;
  let won = 0;
  let lost = 0;
  let totalDealValue = 0;
  let totalWonDealValue = 0;

  leads.forEach(lead => {
    totalDealValue += lead.dealValue;
    if (lead.status === 'New') newLeads++;
    if (lead.status === 'Qualified') qualified++;
    if (lead.status === 'Won') {
      won++;
      totalWonDealValue += lead.dealValue;
    }
    if (lead.status === 'Lost') lost++;
  });

  return {
    total,
    newLeads,
    qualified,
    won,
    lost,
    totalDealValue,
    totalWonDealValue
  };
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getDashboardAnalytics
};
