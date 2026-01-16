
import React, { useState } from 'react';
import { MOCK_RESOURCES } from '../constants';

const Resources: React.FC = () => {
  const [lang, setLang] = useState<'All' | 'English' | 'Tigrigna'>('All');
  const [downloading, setDownloading] = useState<string | null>(null);

  const filtered = MOCK_RESOURCES.filter(r => lang === 'All' || r.language === lang);

  const handleOpen = (id: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert('Resource opened successfully.');
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 animate-in slide-in-from-right-2 duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold serif-font text-slate-900 mb-4">Educational Resources</h1>
            <p className="text-slate-600 max-w-xl">A gateway for students, educators, and the general public to learn about Earth Sciences in Eritrea.</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            {['All', 'English', 'Tigrigna'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l as any)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  lang === l ? 'bg-[#004A26] text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((res) => (
            <div key={res.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 group">
              <div className="relative aspect-video bg-slate-100">
                <img src={res.thumbnailUrl} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#004A26] px-2 py-1 rounded uppercase tracking-tighter">{res.format}</span>
                  <span className="bg-[#C9A227] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">{res.language}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-[#004A26] transition-colors">{res.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{res.description}</p>
                <button 
                  onClick={() => handleOpen(res.id)}
                  disabled={downloading === res.id}
                  className={`w-full py-2 text-sm font-bold rounded-lg border transition-all flex items-center justify-center gap-2 ${
                    downloading === res.id ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-[#004A26] border-slate-100 hover:bg-[#004A26] hover:text-white'
                  }`}
                >
                  {downloading === res.id ? 'Loading...' : `Open ${res.format}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
