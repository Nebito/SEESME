
import React from 'react';
import { MOCK_NEWS } from '../constants';

const News: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16 animate-in slide-in-from-top-2 duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-16">
          <h1 className="text-4xl font-bold serif-font text-slate-900 mb-4">News & Announcements</h1>
          <p className="text-slate-600 max-w-xl">Stay updated with the latest events, achievements, and regulatory changes in the Eritrean mining and earth science sectors.</p>
        </header>

        {/* Featured Big News */}
        <div className="mb-20">
          <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl group">
            <img src={MOCK_NEWS[0].imageUrl} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-10 left-10 max-w-2xl">
              <span className="bg-[#C9A227] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Featured Update</span>
              <h2 className="text-3xl md:text-4xl text-white font-bold mb-4">{MOCK_NEWS[0].title}</h2>
              <p className="text-slate-200 text-lg mb-6 line-clamp-2">{MOCK_NEWS[0].excerpt}</p>
              <button className="px-8 py-3 bg-white text-[#004A26] font-bold rounded-lg hover:bg-slate-100 transition-colors">Read Full Article</button>
            </div>
          </div>
        </div>

        {/* Archive List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {MOCK_NEWS.map(news => (
            <div key={news.id} className="flex flex-col md:flex-row gap-6 group cursor-pointer">
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
                <p className="text-slate-500 text-sm line-clamp-3 mb-4">{news.excerpt}</p>
                <button className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#C9A227] transition-colors">Read More →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Callout */}
        <div className="mt-32 bg-slate-50 rounded-3xl p-10 md:p-20 text-center border border-slate-100">
          <h2 className="text-3xl font-bold serif-font text-slate-800 mb-6">Subscribe to our Quarterly Newsletter</h2>
          <p className="text-slate-500 mb-10 max-w-lg mx-auto">Get curated research summaries, career alerts, and conference news directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#004A26] outline-none"
            />
            <button className="px-8 py-4 bg-[#004A26] text-white font-bold rounded-xl shadow-lg hover:bg-[#00381d] transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
