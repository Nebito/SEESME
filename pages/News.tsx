
import React, { useState } from 'react';
import { MOCK_NEWS } from '../constants';
import { NewsItem } from '../types';

const News: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_NEWS.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen py-16 animate-in slide-in-from-top-2 duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-bold serif-font text-slate-900 mb-4">News & Announcements</h1>
            <p className="text-slate-600 max-w-xl">Stay updated with the latest events and achievements in the Eritrean geosciences sector.</p>
          </div>
          <div className="w-full md:w-80 relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Search news..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#004A26] outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Featured Section */}
        {filtered.length > 0 && searchTerm === '' && (
          <div className="mb-20">
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setSelectedArticle(filtered[0])}>
              <img src={filtered[0].imageUrl} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 max-w-2xl">
                <span className="bg-[#C9A227] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Featured Update</span>
                <h2 className="text-3xl md:text-4xl text-white font-bold mb-4">{filtered[0].title}</h2>
                <p className="text-slate-200 text-lg mb-6 line-clamp-2">{filtered[0].excerpt}</p>
                <button className="px-8 py-3 bg-white text-[#004A26] font-bold rounded-lg hover:bg-slate-100 transition-colors">Read Full Article</button>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filtered.map(news => (
            <div key={news.id} className="flex flex-col md:flex-row gap-6 group cursor-pointer" onClick={() => setSelectedArticle(news)}>
              <div className="md:w-48 h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
                <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-[10px] text-[#004A26] font-bold uppercase tracking-tighter">{news.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-400">{new Date(news.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#004A26] transition-colors mb-3 leading-snug">{news.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4">{news.excerpt}</p>
                <button className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#C9A227] transition-colors">Read More →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Callout */}
        <div className="mt-32 bg-slate-50 rounded-3xl p-10 md:p-20 text-center border border-slate-100">
          <h2 className="text-3xl font-bold serif-font text-slate-800 mb-6">Subscribe to our Newsroom</h2>
          <p className="text-slate-500 mb-10 max-w-lg mx-auto">Get quarterly summaries of research achievements and industry news delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input type="email" placeholder="Email address" required className="flex-grow px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#004A26] outline-none" />
            <button type="submit" className="px-8 py-4 bg-[#004A26] text-white font-bold rounded-xl shadow-lg">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-64 md:h-80">
              <img src={selectedArticle.imageUrl} className="w-full h-full object-cover" alt={selectedArticle.title} />
              <button onClick={() => setSelectedArticle(null)} className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">✕</button>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-[#C9A227] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{selectedArticle.category}</span>
                <span className="text-slate-400 text-sm font-medium">{new Date(selectedArticle.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 serif-font">{selectedArticle.title}</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                <p className="text-xl font-medium text-slate-800 italic">"{selectedArticle.excerpt}"</p>
                <p>{selectedArticle.content}</p>
                <p>Additional sample content for simulation: Eritrean earth sciences have seen a significant transformation in recent years. SEESME remains at the forefront of this evolution, facilitating technical workshops and international collaborations that bring world-class mining standards to local exploration districts.</p>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                <div className="flex space-x-4">
                  <button className="text-slate-400 hover:text-[#004A26] transition-colors"><div className="w-5 h-5 bg-current rounded-sm"></div></button>
                  <button className="text-slate-400 hover:text-[#004A26] transition-colors"><div className="w-5 h-5 bg-current rounded-sm"></div></button>
                </div>
                <button onClick={() => setSelectedArticle(null)} className="px-8 py-2 bg-[#004A26] text-white font-bold rounded-lg shadow-lg">Close Article</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
