"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LeadModal({ lead, onClose, onSave }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    source: 'Website',
    salesperson: '',
    status: 'New',
    dealValue: 0
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        companyName: lead.companyName,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        salesperson: lead.salesperson,
        status: lead.status,
        dealValue: lead.dealValue
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'dealValue' ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = lead 
      ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads/${lead._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads`;
    
    const method = lead ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        onSave();
      } else {
        alert('Failed to save lead');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/40 backdrop-blur-sm animation-fade-in">
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
        <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 border border-slate-100 transform transition-all relative">
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{lead ? 'Edit Lead' : 'Add New Lead'}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contact Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" placeholder="Acme Corp" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" placeholder="jane@acme.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Lead Source</label>
              <select name="source" value={formData.source} onChange={handleChange} 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                <option value="Website">Website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Salesperson</label>
              <input type="text" name="salesperson" value={formData.salesperson} onChange={handleChange} required 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" placeholder="Sales Rep Name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deal Value ($)</label>
              <input type="number" name="dealValue" value={formData.dealValue} onChange={handleChange} required min="0" 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} 
              className="px-5 py-2.5 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors">
              Cancel
            </button>
            <button type="submit" 
              className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all">
              {lead ? 'Update Lead' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
