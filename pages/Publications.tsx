
import React, { useState, useMemo } from 'react';
import { MOCK_PUBLICATIONS } from '../constants';
import { PublicationType } from '../types';

const Publications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<PublicationType | 'All'>('All');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  
  // Calculate unique metadata from MOCK_PUBLICATIONS
  const authors = useMemo(() => Array.from(new Set(MOCK_PUBLICATIONS.map(p => p.author))).sort(), []);
  const allKeywords = useMemo(() => Array.from(new Set(MOCK_PUBLICATIONS.flatMap(p => p.keywords))).sort(), []);
  const years = useMemo(() => Array.from(new Set(MOCK_PUBLICATIONS.map(p => new Date(p.date).getFullYear()))).sort((a, b) => b - a), []);

  const [yearRange, setYearRange] = useState<[number, number]>([Math.min(...years), Math.max(...years)]);

  const filtered = MOCK_PUBLICATIONS.filter(pub => {
    const pubYear = new Date(pub.date).getFullYear();
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pub.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = activeType === 'All' || pub.type === activeType;
    const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(pub.author);
    const matchesKeywords = selectedKeywords.length === 0 || selectedKeywords.some(k => pub.keywords.includes(k));
    const matchesYear = pubYear >= yearRange[0] && pubYear <= yearRange[1];

    return matchesSearch && matchesType && matchesAuthor && matchesKeywords && matchesYear;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setActiveType('All');
    setSelectedAuthors([]);
    setSelectedKeywords([]);
    setYearRange([Math.min(...years), Math.max(...years)]);
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors(prev => prev.includes(author) ? prev.filter(a => a !== author) : [...prev, author]);
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev => prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword]);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 animate-in slide-in-from-bottom-2 duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold serif-font text-slate-900 mb-4">Publication Repository</h1>
          <p className="text-slate-600 max-w-2xl">Refine your search through technical reports, peer-reviewed journals, and geological surveys of Eritrea.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filters</h3>
                <button 
                  onClick={resetFilters}
                  className="text-xs text-[#004A26] font-bold hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Publication Type */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3">Document Type</label>
                <div className="space-y-2">
                  {['All', ...Object.values(PublicationType)].map(type => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type as any)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        activeType === type ? 'bg-[#004A26] text-white font-semibold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author Filter */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3">Authors</label>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {authors.map(author => (
                    <label key={author} className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedAuthors.includes(author)}
                        onChange={() => toggleAuthor(author)}
                        className="w-4 h-4 rounded border-slate-300 text-[#004A26] focus:ring-[#004A26]" 
                      />
                      <span className={`text-sm ${selectedAuthors.includes(author) ? 'text-[#004A26] font-semibold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {author}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Year Range */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3">Publication Year</label>
                <div className="flex items-center space-x-2">
                  <select 
                    value={yearRange[0]} 
                    onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                    className="flex-grow bg-slate-50 border border-slate-200 rounded p-1 text-sm outline-none focus:ring-1 focus:ring-[#004A26]"
                  >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <span className="text-slate-400">to</span>
                  <select 
                    value={yearRange[1]} 
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                    className="flex-grow bg-slate-50 border border-slate-200 rounded p-1 text-sm outline-none focus:ring-1 focus:ring-[#004A26]"
                  >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Keyword Cloud */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Focus Keywords</label>
                <div className="flex flex-wrap gap-2">
                  {allKeywords.map(keyword => (
                    <button
                      key={keyword}
                      onClick={() => toggleKeyword(keyword)}
                      className={`text-[10px] px-2 py-1 rounded border transition-all ${
                        selectedKeywords.includes(keyword) 
                          ? 'bg-[#C9A227] text-white border-[#C9A227] shadow-sm' 
                          : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Widget */}
            <div className="bg-[#004A26] rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-bold mb-2">Need a specific DOI?</h4>
                <p className="text-xs opacity-70 mb-4">Contact our library department for inter-library loan requests.</p>
                <button className="text-xs font-bold text-[#C9A227] hover:underline">Request Document →</button>
              </div>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full"></div>
            </div>
          </aside>

          {/* Search Results */}
          <div className="flex-grow">
            <div className="mb-8 relative">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input 
                type="text" 
                placeholder="Search by title, abstract, or metadata..."
                className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl shadow-sm border border-slate-100 outline-none focus:ring-2 focus:ring-[#004A26] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
                <span>Showing {filtered.length} Results</span>
                <span>Sort by: Date (Newest)</span>
              </div>

              {filtered.length > 0 ? (
                filtered.map((pub) => (
                  <div key={pub.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="bg-slate-50 text-[#004A26] text-[10px] font-bold px-2 py-1 rounded-md uppercase border border-slate-200">
                          {pub.type}
                        </span>
                        <span className="text-slate-400 text-xs">{new Date(pub.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      {pub.doi && <span className="text-xs text-slate-400 font-mono hidden md:block">DOI: {pub.doi}</span>}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#004A26] transition-colors">{pub.title}</h3>
                    <p className="text-[#C9A227] font-semibold text-sm mb-4">{pub.author}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 italic line-clamp-3">"{pub.abstract}"</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {pub.keywords.map(k => (
                        <span key={k} className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-tighter">#{k}</span>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex space-x-6">
                        <button className="flex items-center space-x-2 text-[#004A26] font-bold text-sm hover:text-[#C9A227] transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                          <span>Full Text PDF</span>
                        </button>
                        <button className="flex items-center space-x-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          <span>Cite</span>
                        </button>
                      </div>
                      <button className="text-slate-400 text-sm hover:text-slate-600 font-medium">View References</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-1">No matching results</h3>
                  <p className="text-slate-400 mb-6">Try adjusting your filters or search keywords.</p>
                  <button 
                    onClick={resetFilters} 
                    className="px-6 py-2 bg-[#004A26] text-white font-bold rounded-lg shadow-md hover:bg-[#00381d] transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Publications;
