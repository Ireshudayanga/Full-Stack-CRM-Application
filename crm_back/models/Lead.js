const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  source: { 
    type: String, 
    required: true,
    enum: ['Website', 'LinkedIn', 'Referral', 'Other']
  },
  salesperson: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
    default: 'New'
  },
  dealValue: { type: Number, required: true, default: 0 },
  notes: [{
    content: { type: String, required: true },
    createdBy: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
