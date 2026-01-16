
import React, { useState } from 'react';
import { MOCK_RESOURCES } from '../constants';

const Resources: React.FC = () => {
  const [lang, setLang] = useState<'All' | 'English' | 'Tigrigna'>('All');

  const filtered = MOCK_RESOURCES.filter(r => lang === 'All' || r.language === lang);

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
              <div className="relative aspect-video">
                <img src={res.thumbnailUrl} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#004A26] px-2 py-1 rounded uppercase tracking-tighter">
                    {res.format}
                  </span>
                  <span className="bg-[#C9A227] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                    {res.language}
                  </span>
                </div>
                {res.format === 'Video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#004A26] text-white rounded-full flex items-center justify-center pl-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4.516 3.248a.5.5 0 00-.766.424v12.656a.5.5 0 00.766.424l11.724-6.328a.5.5 0 000-.848L4.516 3.248z"></path></svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-[#004A26] transition-colors">{res.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">{res.description}</p>
                <button className="w-full py-2 bg-slate-50 text-[#004A26] text-sm font-bold rounded-lg border border-slate-100 hover:bg-[#004A26] hover:text-white transition-all">
                  Open Resource
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Section */}
        <div className="mt-24 bg-[#C9A227] rounded-3xl p-8 md:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl serif-font font-bold mb-6">Want to learn more?</h2>
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              Our AI-powered GeoAssistant is available to answer any questions you have about geological formations in Eritrea, mining history, or scholarship programs.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold">AI</div>
              <div>
                <p className="font-bold">Chat with GeoAssistant</p>
                <p className="text-sm opacity-70">Click the green bubble in the bottom right corner.</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-sm italic opacity-80 mb-4">"Explain the significance of the Danakil Depression for geothermal energy in Tigrigna..."</p>
                <div className="h-4 w-full bg-white/20 rounded-full mb-2"></div>
                <div className="h-4 w-3/4 bg-white/20 rounded-full"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
