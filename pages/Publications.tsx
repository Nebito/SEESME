
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MOCK_PUBLICATIONS } from '../constants';
import { PublicationType, Publication } from '../types';
import { apiService } from '../services/apiService';

const Publications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<PublicationType | 'All'>('All');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isAuthorDropdownOpen, setIsAuthorDropdownOpen] = useState(false);
  const [modalData, setModalData] = useState<{ type: 'cite' | 'refs', pub: Publication } | null>(null);
  const authorDropdownRef = useRef<HTMLDivElement>(null);
  
  const [publications, setPublications] = useState<Publication[]>(MOCK_PUBLICATIONS);

  const authors = useMemo(() => Array.from(new Set(publications.map(p => p.author))).sort(), [publications]);
  const allKeywords = useMemo(() => Array.from(new Set(publications.flatMap(p => p.keywords))).sort(), [publications]);
  const years = useMemo(() => Array.from(new Set(publications.map(p => new Date(p.date).getFullYear()))).sort((a, b) => b - a), [publications]);

  const [yearRange, setYearRange] = useState<[number, number]>([
    years.length > 0 ? Math.min(...years) : 1900, 
    years.length > 0 ? Math.max(...years) : new Date().getFullYear()
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authorDropdownRef.current && !authorDropdownRef.current.contains(event.target as Node)) {
        setIsAuthorDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = publications.filter(pub => {
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
    if (years.length > 0) {
      setYearRange([Math.min(...years), Math.max(...years)]);
    }
  };

  const handleDownload = async (pubId: string) => {
    setPublications(prev => prev.map(p => p.id === pubId ? { ...p, downloads: p.downloads + 1 } : p));
    try {
      await apiService.trackDownload(pubId);
      alert('Secure download initiated...');
    } catch (err) {
      console.error(err);
    }
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
                <button onClick={resetFilters} className="text-xs text-[#004A26] font-bold hover:underline">Clear All</button>
              </div>

              {/* Author Multi-Select Dropdown */}
              <div className="mb-8 relative" ref={authorDropdownRef}>
                <label className="block text-sm font-bold text-slate-700 mb-3">Filter by Author</label>
                <button
                  onClick={() => setIsAuthorDropdownOpen(!isAuthorDropdownOpen)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-left flex justify-between items-center"
                >
                  <span className="truncate text-slate-600">
                    {selectedAuthors.length === 0 ? 'Select Authors...' : `${selectedAuthors.length} Selected`}
                  </span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${isAuthorDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isAuthorDropdownOpen && (
                  <div className="absolute z-30 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl p-2 max-h-60 overflow-y-auto">
                    {authors.map(author => (
                      <label key={author} className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-slate-50">
                        <input 
                          type="checkbox" 
                          checked={selectedAuthors.includes(author)}
                          onChange={() => setSelectedAuthors(prev => prev.includes(author) ? prev.filter(a => a !== author) : [...prev, author])}
                          className="rounded border-slate-300 text-[#004A26] focus:ring-[#004A26]" 
                        />
                        <span className="text-sm text-slate-600">{author}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Document Type */}
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

              {/* Keyword Cloud */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Focus Keywords</label>
                <div className="flex flex-wrap gap-2">
                  {allKeywords.map(keyword => (
                    <button
                      key={keyword}
                      onClick={() => setSelectedKeywords(prev => prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword])}
                      className={`text-[10px] px-2 py-1 rounded border transition-all ${
                        selectedKeywords.includes(keyword) ? 'bg-[#C9A227] text-white border-[#C9A227]' : 'bg-white text-slate-400 border-slate-200'
                      }`}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Search Results */}
          <div className="flex-grow">
            <div className="mb-8 relative">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input 
                type="text" 
                placeholder="Search repository..."
                className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl shadow-sm border border-slate-100 focus:ring-2 focus:ring-[#004A26] outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-6">
              {filtered.map((pub) => (
                <div key={pub.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-slate-50 text-[#004A26] text-[10px] font-bold px-2 py-1 rounded-md uppercase border border-slate-200">{pub.type}</span>
                    <div className="flex items-center space-x-4 text-slate-400">
                       <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>
                          <span className="text-[10px] font-bold">{pub.downloads}</span>
                       </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pub.title}</h3>
                  <p className="text-[#C9A227] font-semibold text-sm mb-4">{pub.author}</p>
                  <p className="text-slate-500 text-sm italic mb-6">"{pub.abstract}"</p>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex space-x-6">
                      <button onClick={() => handleDownload(pub.id)} className="flex items-center space-x-2 text-[#004A26] font-bold text-sm hover:text-[#C9A227] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        <span>PDF</span>
                      </button>
                      <button onClick={() => setModalData({type: 'cite', pub})} className="flex items-center space-x-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span>Cite</span>
                      </button>
                    </div>
                    <button onClick={() => setModalData({type: 'refs', pub})} className="text-slate-400 text-sm hover:text-slate-600 font-medium">View References</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalData && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">{modalData.type === 'cite' ? 'Generate Citation' : 'Publication References'}</h3>
            <div className="bg-slate-50 p-6 rounded-2xl mb-6 text-sm text-slate-600 font-mono">
              {modalData.type === 'cite' ? (
                `@article{seesme_${modalData.pub.id},\n  title={${modalData.pub.title}},\n  author={${modalData.pub.author}},\n  year={${new Date(modalData.pub.date).getFullYear()}},\n  journal={SEESME Repository}\n}`
              ) : (
                <ul className="space-y-4">
                  <li>1. Eritrea Geological Survey. (2015). Strategic Minerals Atlas.</li>
                  <li>2. Tekle, B. (2020). Nubian Shield Metallogeny.</li>
                  <li>3. UNESCO Geoscience Report #412.</li>
                </ul>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setModalData(null)} className="px-6 py-2 text-slate-400 font-bold hover:text-slate-600">Close</button>
              <button onClick={() => { navigator.clipboard.writeText('Citation copied'); alert('Copied to clipboard'); }} className="px-6 py-2 bg-[#004A26] text-white font-bold rounded-lg shadow-lg">Copy to Clipboard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Publications;
