"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import LeadModal from '../../components/LeadModal';

export default function Leads() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);

  const fetchLeads = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setCurrentLead(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lead) => {
    setCurrentLead(lead);
    setIsModalOpen(true);
  };

  const statusColors = {
    'New': 'bg-blue-50 text-blue-700 border-blue-200',
    'Contacted': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Qualified': 'bg-purple-50 text-purple-700 border-purple-200',
    'Proposal Sent': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Won': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Lost': 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <>
      <div className="max-w-7xl mx-auto animation-fade-in">
        <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Leads</h1>
          <p className="text-slate-500 mt-1">Manage your active sales pipeline.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-slate-800 hover:shadow-md transform hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Lead
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="p-5 pl-6">Contact</th>
                <th className="p-5">Details</th>
                <th className="p-5">Source & Owner</th>
                <th className="p-5">Status</th>
                <th className="p-5">Deal Value</th>
                <th className="p-5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map(lead => (
                <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-5 pl-6">
                    <div className="font-bold text-slate-900">{lead.name}</div>
                    <div className="text-sm text-slate-500 font-medium">{lead.companyName}</div>
                  </td>
                  <td className="p-5">
                    <div className="text-sm text-slate-700">{lead.email}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{lead.phone}</div>
                  </td>
                  <td className="p-5">
                    <div className="text-sm font-medium text-slate-700">{lead.source}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {lead.salesperson}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${statusColors[lead.status] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-slate-800">
                      ${lead.dealValue.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-5 pr-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(lead)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(lead._id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">No leads found</h3>
                    <p className="text-slate-500">Get started by creating a new lead.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      {isModalOpen && (
        <LeadModal 
          lead={currentLead} 
          onClose={() => setIsModalOpen(false)} 
          onSave={() => {
            setIsModalOpen(false);
            fetchLeads();
          }} 
        />
      )}
    </>
  );
}
