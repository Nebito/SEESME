
import React, { useState } from 'react';
import { MOCK_CAREERS } from '../constants';

const Careers: React.FC = () => {
  const [activeType, setActiveType] = useState('All');
  const [isApplying, setIsApplying] = useState<string | null>(null);

  const types = ['All', 'Scholarship', 'Internship', 'Fellowship', 'Call for Papers', 'Training'];
  const filtered = MOCK_CAREERS.filter(c => activeType === 'All' || c.type === activeType);

  return (
    <div className="bg-slate-50 min-h-screen py-16 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-12">
          <span className="text-[#C9A227] font-bold tracking-widest uppercase text-xs">Professional Development</span>
          <h1 className="text-4xl font-bold serif-font text-slate-900 mt-2 mb-4">Career & Training Board</h1>
          <p className="text-slate-600 max-w-2xl">Discover opportunities to grow your career and research portfolio within the geosciences sector in Eritrea.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 flex-shrink-0">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Filter By Type</h3>
            <div className="flex flex-col space-y-2">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeType === t ? 'bg-white text-[#004A26] shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-12 bg-[#004A26] p-6 rounded-2xl text-white">
              <h4 className="font-bold text-sm mb-4">Post an Opportunity?</h4>
              <button onClick={() => alert('Feature coming soon: Organization Portal')} className="w-full py-2 bg-[#C9A227] text-white text-xs font-bold rounded-lg hover:brightness-110">Submit Opportunity</button>
            </div>
          </aside>

          <div className="flex-grow space-y-6">
            {filtered.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-[#C9A227] transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold bg-[#C9A227]/10 text-[#C9A227] px-2 py-0.5 rounded uppercase mr-3">{job.type}</span>
                    <span className="text-xs text-slate-400">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-[#004A26] transition-colors mb-2">{job.title}</h2>
                <p className="text-[#004A26] font-semibold text-sm mb-4">{job.provider}</p>
                <p className="text-slate-600 text-sm mb-8 line-clamp-3">{job.description}</p>
                <button 
                  onClick={() => setIsApplying(job.id)}
                  className="px-6 py-2 border-2 border-[#004A26] text-[#004A26] font-bold rounded-lg text-sm hover:bg-[#004A26] hover:text-white transition-all"
                >
                  Apply Now / View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isApplying && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
            <h3 className="text-xl font-bold text-[#004A26] mb-2 uppercase tracking-widest text-xs">Application Form</h3>
            <h4 className="text-lg font-bold text-slate-900 mb-6">{MOCK_CAREERS.find(c => c.id === isApplying)?.title}</h4>
            <form onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully!'); setIsApplying(null); }} className="space-y-4">
              <input type="text" placeholder="Full Name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" />
              <input type="email" placeholder="Email Address" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm" />
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 text-sm cursor-pointer hover:border-[#004A26] transition-colors">
                Click to Upload CV (PDF/DOCX)
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => setIsApplying(null)} className="px-6 py-2 text-slate-400 font-bold">Cancel</button>
                <button type="submit" className="px-8 py-2 bg-[#004A26] text-white font-bold rounded-lg shadow-lg">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
