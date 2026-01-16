
import React, { useState } from 'react';
import { MOCK_CAREERS } from '../constants';

const Careers: React.FC = () => {
  const [activeType, setActiveType] = useState('All');

  const types = ['All', 'Scholarship', 'Internship', 'Fellowship', 'Call for Papers', 'Training'];
  const filtered = MOCK_CAREERS.filter(c => activeType === 'All' || c.type === activeType);

  return (
    <div className="bg-slate-50 min-h-screen py-16 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-12">
          <span className="text-[#C9A227] font-bold tracking-widest uppercase text-xs">Professional Development</span>
          <h1 className="text-4xl font-bold serif-font text-slate-900 mt-2 mb-4">Career & Training Board</h1>
          <p className="text-slate-600 max-w-2xl">Discover opportunities to grow your career and research portfolio within the geosciences sector in Eritrea and internationally.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Filter By Type</h3>
            <div className="flex flex-col space-y-2">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeType === t 
                      ? 'bg-white text-[#004A26] shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-12 bg-[#004A26] p-6 rounded-2xl text-white">
              <h4 className="font-bold text-sm mb-4">Post an Opportunity?</h4>
              <p className="text-xs opacity-70 mb-4 leading-relaxed">If you represent an organization looking for geoscience talent or hosting a conference.</p>
              <button className="w-full py-2 bg-[#C9A227] text-white text-xs font-bold rounded-lg hover:brightness-110">
                Submit Opportunity
              </button>
            </div>
          </aside>

          {/* Opportunity List */}
          <div className="flex-grow space-y-6">
            {filtered.map(job => (
              <div key={job.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-[#C9A227] transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold bg-[#C9A227]/10 text-[#C9A227] px-2 py-0.5 rounded uppercase mr-3">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-400">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                  <button className="text-slate-300 group-hover:text-[#C9A227]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-[#004A26] transition-colors mb-2">{job.title}</h2>
                <p className="text-[#004A26] font-semibold text-sm mb-4">{job.provider}</p>
                <div className="bg-slate-50 p-4 rounded-xl mb-6">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Eligibility</p>
                  <p className="text-sm text-slate-700">{job.eligibility}</p>
                </div>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed line-clamp-3">{job.description}</p>
                <button className="px-6 py-2 border-2 border-[#004A26] text-[#004A26] font-bold rounded-lg text-sm hover:bg-[#004A26] hover:text-white transition-all">
                  Apply Now / View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
