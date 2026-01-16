
import React, { useState, useEffect } from 'react';
import { PublicationType, User, UserRole, SEOMetadata } from '../types';
import { apiService } from '../services/apiService';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'users' | 'reports' | 'seo'>('analytics');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Dr. Dawit G.', email: 'dawit.g@seesme.org', role: UserRole.ADMIN, joinedDate: '2023-01-10', lastLogin: '2 hours ago' },
    { id: '2', name: 'Saba T.', email: 'saba.t@geology.er', role: UserRole.EDITOR, joinedDate: '2023-05-15', lastLogin: '1 day ago' },
    { id: '3', name: 'Michael K.', email: 'mk@mining.com', role: UserRole.MEMBER, joinedDate: '2024-02-01', lastLogin: '5 mins ago' },
  ]);

  const [seoList, setSeoList] = useState<SEOMetadata[]>([
    { page: 'home', title: 'SEESME | Official Home', description: 'Society of Eritrean Earth Scientists...', keywords: 'Eritrea, Geology, Mining' },
    { page: 'publications', title: 'Research & Publications', description: 'Geoscience repository of Eritrea...', keywords: 'DOI, Research, Earth Science' },
  ]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setStatusMsg(`User role updated to ${newRole}`);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleRevoke = (userId: string) => {
    if(window.confirm("Are you sure you want to revoke access?")) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setStatusMsg("Access revoked for user.");
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const updateSEO = (page: string) => {
    setStatusMsg(`SEO metadata updated for ${page}`);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const generateReport = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('PDF Report "SEESME_Annual_2024.pdf" has been generated.');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#004A26] rounded-3xl p-10 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-6 serif-font">Control Center</h1>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'analytics', label: 'Analytics', icon: '📊' },
                { id: 'content', label: 'Content', icon: '📝' },
                { id: 'users', label: 'Users', icon: '👥' },
                { id: 'reports', label: 'Reports', icon: '📁' },
                { id: 'seo', label: 'SEO', icon: '🌐' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#C9A227] text-white' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {statusMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-between text-sm animate-in slide-in-from-top-2">
            <span className="font-semibold">{statusMsg}</span>
            <button onClick={() => setStatusMsg('')}>✕</button>
          </div>
        )}

        <div className="transition-all duration-300">
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Total Downloads', value: '4,829', trend: '+12%', color: 'text-emerald-500' },
                { label: 'Active Members', value: '1,240', trend: '+5%', color: 'text-blue-500' },
                { label: 'Citations', value: '892', trend: '+24%', color: 'text-amber-500' },
                { label: 'Page Views', value: '45.2k', trend: '+8%', color: 'text-[#004A26]' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:border-[#C9A227] transition-all">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className={`text-[10px] font-bold ${stat.color}`}>{stat.trend} from last month</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">User Permissions Directory</h3>
                <button onClick={() => alert('Add User Dialog Opening...')} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold">Add New User</button>
              </div>
              <table className="w-full text-left">
                <thead className="text-xs font-bold text-slate-400 uppercase bg-slate-50">
                  <tr>
                    <th className="px-8 py-4">User</th>
                    <th className="px-8 py-4">Current Role</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6 text-sm font-bold text-slate-700">{user.name}</td>
                      <td className="px-8 py-6">
                        <select 
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                          className="bg-white border border-slate-200 rounded-lg text-xs font-bold px-3 py-1"
                        >
                          {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                        </select>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => handleRevoke(user.id)} className="text-xs font-bold text-red-500 hover:underline">Revoke Access</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-bottom-4">
              {seoList.map((seo, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800 capitalize">Route: /{seo.page === 'home' ? '' : seo.page}</h3>
                    <button onClick={() => updateSEO(seo.page)} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100">Update Settings</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" defaultValue={seo.title} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm" />
                    <textarea defaultValue={seo.description} rows={2} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-slate-300">
              <h3 className="text-xl font-bold text-slate-400 mb-4 uppercase tracking-widest text-xs">Reporting Hub</h3>
              <button onClick={generateReport} disabled={isSubmitting} className="bg-[#004A26] text-white px-10 py-3 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all">
                {isSubmitting ? 'Processing...' : 'Run Annual Audit'}
              </button>
            </div>
          )}

          {activeTab === 'content' && (
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-3xl mx-auto">
               <h3 className="text-xl font-bold mb-6">Add New Publication</h3>
               <form onSubmit={(e) => {e.preventDefault(); alert('Publication saved.');}} className="space-y-4">
                  <input type="text" placeholder="Title" required className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" />
                  <input type="text" placeholder="Author" required className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" />
                  <textarea placeholder="Abstract" rows={4} required className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" />
                  <button type="submit" className="w-full py-4 bg-[#004A26] text-white font-bold rounded-2xl">Save to Database</button>
               </form>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
