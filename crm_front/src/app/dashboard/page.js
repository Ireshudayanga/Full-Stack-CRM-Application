"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/analytics`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setAnalytics(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token, router]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (!analytics) return <div className="p-8 text-center text-red-500 font-medium">Failed to load analytics</div>;

  return (
    <div className="max-w-6xl mx-auto animation-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, <span className="font-medium text-slate-700">{user?.email}</span></p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h3 className="text-slate-500 text-sm font-semibold mb-2 relative z-10">Total Leads</h3>
          <p className="text-4xl font-extrabold text-slate-800 relative z-10">{analytics.total}</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h3 className="text-slate-500 text-sm font-semibold mb-2 relative z-10">New Leads</h3>
          <p className="text-4xl font-extrabold text-slate-800 relative z-10">{analytics.newLeads}</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h3 className="text-slate-500 text-sm font-semibold mb-2 relative z-10">Qualified</h3>
          <p className="text-4xl font-extrabold text-slate-800 relative z-10">{analytics.qualified}</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h3 className="text-slate-500 text-sm font-semibold mb-2 relative z-10">Won Leads</h3>
          <p className="text-4xl font-extrabold text-slate-800 relative z-10">{analytics.won}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h3 className="text-slate-500 text-sm font-semibold mb-2 relative z-10">Lost Leads</h3>
          <p className="text-4xl font-extrabold text-slate-800 relative z-10">{analytics.lost}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-slate-600 text-lg font-semibold">Pipeline Value</h3>
          </div>
          <p className="text-5xl font-extrabold tracking-tight text-slate-900">${analytics.totalDealValue.toLocaleString()}</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-200 transition-shadow flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-slate-300 text-lg font-semibold mb-2">Total Value Won</h3>
            <p className="text-5xl font-extrabold tracking-tight text-white">${analytics.totalWonDealValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
