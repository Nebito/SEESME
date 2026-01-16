
import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#004A26] rounded-3xl p-10 text-white mb-12 shadow-xl overflow-hidden relative">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">Administrator Control Panel</h1>
            <p className="opacity-80 max-w-2xl">Manage content modules, moderate member contributions, and monitor site analytics. Role: <span className="text-[#C9A227] font-bold">System Administrator</span></p>
          </div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Publications', value: '542', icon: '📄' },
            { label: 'Pending Articles', value: '12', icon: '⏳' },
            { label: 'New Members (Monthly)', value: '+48', icon: '👤' },
            { label: 'Resource Downloads', value: '1.2k', icon: '⬇️' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content Management Sections */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 uppercase text-sm tracking-widest">Active Content Modules</h3>
                <button className="text-xs text-[#004A26] font-bold hover:underline">Customize Dashboard</button>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Publications & Reports', count: 542, color: 'bg-emerald-50 text-emerald-600' },
                  { name: 'News & Announcements', count: 128, color: 'bg-blue-50 text-blue-600' },
                  { name: 'Featured Articles', count: 85, color: 'bg-amber-50 text-amber-600' },
                  { name: 'Career Opportunities', count: 12, color: 'bg-purple-50 text-purple-600' },
                ].map((mod, i) => (
                  <div key={i} className={`p-4 rounded-xl ${mod.color} flex justify-between items-center cursor-pointer hover:brightness-95 transition-all`}>
                    <div>
                      <h4 className="font-bold text-sm">{mod.name}</h4>
                      <p className="text-[10px] opacity-80 uppercase tracking-widest">{mod.count} Items Total</p>
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 uppercase text-sm tracking-widest mb-6">Recent Activity Logs</h3>
              <div className="space-y-4">
                {[
                  { user: 'Admin_Tewelde', action: 'Uploaded Publication #1042', time: '12 mins ago' },
                  { user: 'Editor_Saba', action: 'Approved News Article "2025 Conference"', time: '1 hour ago' },
                  { user: 'System', action: 'Weekly Database Backup Successful', time: '3 hours ago' },
                  { user: 'Admin_Tewelde', action: 'Updated Career Post "Hydrology Fellowship"', time: '5 hours ago' },
                ].map((act, i) => (
                  <div key={i} className="flex items-start space-x-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {act.user[0]}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-slate-700">
                        <span className="font-bold">{act.user}</span> {act.action}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
             <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-amber-800 font-bold text-sm mb-4">System Notifications</h3>
                <div className="space-y-3">
                  <div className="text-xs text-amber-700 bg-white p-3 rounded-lg border border-amber-100">
                    <strong>Critical:</strong> Security patch v2.4 pending installation.
                  </div>
                  <div className="text-xs text-amber-700 bg-white p-3 rounded-lg border border-amber-100">
                    Storage capacity reaching 85% limit (42.5GB used).
                  </div>
                </div>
                <button className="w-full mt-6 py-2 bg-amber-800 text-white text-xs font-bold rounded-lg">Review System Status</button>
             </div>

             <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-sm mb-4 tracking-widest uppercase">Admin Quick Tools</h3>
                <ul className="space-y-3 text-xs">
                  <li><button className="hover:text-[#C9A227] transition-colors">Generate Annual Report PDF</button></li>
                  <li><button className="hover:text-[#C9A227] transition-colors">Manage User Permissions</button></li>
                  <li><button className="hover:text-[#C9A227] transition-colors">SEO Metadata Editor</button></li>
                  <li><button className="hover:text-[#C9A227] transition-colors">Clear System Cache</button></li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
