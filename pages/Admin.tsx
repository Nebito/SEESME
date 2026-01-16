
import React, { useState, useMemo } from 'react';
import { PublicationType, User, UserRole, SEOMetadata } from '../types';
import { MOCK_PUBLICATIONS, MOCK_NEWS } from '../constants';
import { jsPDF } from 'jspdf';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'users' | 'reports' | 'seo'>('analytics');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [reportType, setReportType] = useState('System Audit');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Dr. Dawit G.', email: 'dawit.g@seesme.org', role: UserRole.ADMIN, joinedDate: '2023-01-10', lastLogin: '2 hours ago' },
    { id: '2', name: 'Saba T.', email: 'saba.t@geology.er', role: UserRole.EDITOR, joinedDate: '2023-05-15', lastLogin: '1 day ago' },
    { id: '3', name: 'Michael K.', email: 'mk@mining.com', role: UserRole.MEMBER, joinedDate: '2024-02-01', lastLogin: '5 mins ago' },
    { id: '4', name: 'Abeba H.', email: 'abeba.h@geoscience.edu', role: UserRole.GUEST, joinedDate: '2024-03-10', lastLogin: '1 week ago' },
  ]);

  const [seoList] = useState<SEOMetadata[]>([
    { page: 'home', title: 'SEESME | Official Home', description: 'Society of Eritrean Earth Scientists...', keywords: 'Eritrea, Geology, Mining' },
    { page: 'publications', title: 'Research & Publications', description: 'Geoscience repository of Eritrea...', keywords: 'DOI, Research, Earth Science' },
  ]);

  // Role Permissions Matrix Data
  const rolePermissions = [
    { role: UserRole.ADMIN, desc: 'Full system access, user management, and configuration.' },
    { role: UserRole.EDITOR, desc: 'Can add/edit publications, news, and resources.' },
    { role: UserRole.MEMBER, desc: 'Full access to repository downloads and career details.' },
    { role: UserRole.GUEST, desc: 'Read-only access to public pages and summaries.' },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(userSearchTerm.toLowerCase())
    );
  }, [users, userSearchTerm]);

  // Dynamic Analytics Calculation
  const statsSummary = useMemo(() => {
    const totalDownloads = MOCK_PUBLICATIONS.reduce((acc, curr) => acc + curr.downloads, 0);
    const pubCount = MOCK_PUBLICATIONS.length;
    const newsCount = MOCK_NEWS.length;

    return {
      totalDownloads,
      pubCount,
      newsCount,
      userCount: users.length,
      adminCount: users.filter(u => u.role === UserRole.ADMIN).length,
      memberCount: users.filter(u => u.role === UserRole.MEMBER).length
    };
  }, [users]);

  const stats = useMemo(() => [
    { label: 'Total Downloads', value: statsSummary.totalDownloads.toLocaleString(), trend: '+12%', color: 'text-emerald-500' },
    { label: 'Active Members', value: statsSummary.userCount.toString(), trend: '+5%', color: 'text-blue-500' },
    { label: 'Publications', value: statsSummary.pubCount.toString(), trend: 'Live', color: 'text-amber-500' },
    { label: 'News Articles', value: statsSummary.newsCount.toString(), trend: 'Updated', color: 'text-[#004A26]' },
  ], [statsSummary]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
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

  const handleInviteUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as UserRole,
      joinedDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
    };
    setUsers(prev => [...prev, newUser]);
    setIsInviteModalOpen(false);
    setStatusMsg(`Invitation sent to ${newUser.email}`);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const generatePDFReport = () => {
    setIsSubmitting(true);
    try {
      const doc = new jsPDF();
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();

      doc.setFillColor(0, 74, 38);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text('SEESME System Audit Report', 20, 25);
      doc.setFontSize(10);
      doc.text(`Generated on: ${date} at ${time}`, 150, 25);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.text('1. Executive Summary', 20, 55);
      doc.setFontSize(11);
      doc.text(`Total Publications in Repository: ${statsSummary.pubCount}`, 25, 65);
      doc.text(`Cumulative Resource Downloads: ${statsSummary.totalDownloads}`, 25, 72);
      doc.text(`Platform Registered Users: ${statsSummary.userCount}`, 25, 79);
      doc.text(`News and Media Items: ${statsSummary.newsCount}`, 25, 86);

      doc.setFontSize(16);
      doc.text('2. Membership Distribution', 20, 105);
      doc.setFontSize(11);
      doc.text(`Administrators: ${statsSummary.adminCount}`, 25, 115);
      doc.text(`Full Members: ${statsSummary.memberCount}`, 25, 122);
      
      doc.save(`SEESME_Audit_${new Date().toISOString().split('T')[0]}.pdf`);
      setStatusMsg("PDF Report generated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
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

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:border-[#C9A227] transition-all">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className={`text-[10px] font-bold ${stat.color}`}>{stat.trend}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-8">
              {/* Permissions Matrix Legend */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Permissions Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {rolePermissions.map((item) => (
                    <div key={item.role} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="inline-block px-2 py-1 rounded bg-[#004A26]/10 text-[#004A26] text-[10px] font-bold uppercase mb-2">{item.role}</span>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Directory */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="w-full md:w-96 relative">
                    <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                      type="text" 
                      placeholder="Search users by name or email..."
                      className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#004A26] outline-none"
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => setIsInviteModalOpen(true)}
                    className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-black transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Invite New User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs font-bold text-slate-400 uppercase bg-slate-50">
                      <tr>
                        <th className="px-8 py-4">Full Name</th>
                        <th className="px-8 py-4">Email</th>
                        <th className="px-8 py-4">Current Role</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6 text-sm font-bold text-slate-700">{user.name}</td>
                          <td className="px-8 py-6 text-sm text-slate-500">{user.email}</td>
                          <td className="px-8 py-6">
                            <select 
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                              className="bg-white border border-slate-200 rounded-lg text-xs font-bold px-3 py-1 outline-none focus:ring-2 focus:ring-[#004A26] transition-all"
                            >
                              {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                          </td>
                          <td className="px-8 py-6 text-right space-x-4">
                            <button className="text-xs font-bold text-[#C9A227] hover:underline">Edit</button>
                            <button onClick={() => handleRevoke(user.id)} className="text-xs font-bold text-red-500 hover:underline">Revoke</button>
                          </td>
                        </tr>
                      ))}
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-8 py-12 text-center text-slate-400 italic">No users found matching your search.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-12 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📄</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">Reporting Hub</h3>
                <p className="text-slate-500 mb-8">Generate official PDF summaries of platform usage and scientific impact.</p>
                
                <div className="bg-slate-50 p-6 rounded-2xl mb-8 text-left border border-slate-100">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Select Report Type</label>
                  <select 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#004A26] outline-none"
                  >
                    <option>System Audit</option>
                    <option>Scientific Impact Summary</option>
                    <option>Membership Growth Report</option>
                  </select>
                </div>

                <button 
                  onClick={generatePDFReport} 
                  disabled={isSubmitting} 
                  className="bg-[#004A26] text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all flex items-center justify-center mx-auto gap-3"
                >
                  {isSubmitting ? 'Generating...' : 'Generate Full PDF Report'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="grid grid-cols-1 gap-8">
              {seoList.map((seo, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800 capitalize">Route: /{seo.page === 'home' ? '' : seo.page}</h3>
                    <button onClick={() => setStatusMsg(`SEO for ${seo.page} updated.`)} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100">Save Changes</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" defaultValue={seo.title} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm" />
                    <textarea defaultValue={seo.description} rows={2} className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm" />
                  </div>
                </div>
              ))}
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

      {/* Invite User Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-6 serif-font">Invite New Member</h3>
            <form onSubmit={handleInviteUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                <input name="name" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#004A26] outline-none" placeholder="e.g. Dawit Michael" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                <input name="email" type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#004A26] outline-none" placeholder="name@domain.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Assign Role</label>
                <select name="role" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#004A26] outline-none">
                  {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setIsInviteModalOpen(false)} className="px-6 py-2 text-slate-400 font-bold hover:text-slate-600">Cancel</button>
                <button type="submit" className="px-8 py-2 bg-[#004A26] text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all">Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
