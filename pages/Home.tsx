
import React from 'react';
import { MOCK_NEWS, MOCK_PUBLICATIONS } from '../constants';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-slate-900">
        <img 
          src="https://picsum.photos/seed/geology/1920/1080" 
          alt="Eritrean Landscapes" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
          <div className="max-w-2xl">
            <h2 className="text-[#C9A227] font-bold tracking-widest uppercase mb-4">Welcome to SEESME</h2>
            <h1 className="text-4xl md:text-6xl text-white serif-font font-bold mb-6 leading-tight">
              Advancing Earth Sciences and Mining Engineering in Eritrea
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              A community of professionals committed to research, knowledge sharing, and public education in geoscience and engineering.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setActiveTab('publications')}
                className="bg-[#C9A227] text-white px-8 py-4 rounded-md font-bold hover:bg-[#b08d20] transition-all"
              >
                Access Publications
              </button>
              <button 
                onClick={() => setActiveTab('careers')}
                className="bg-white/10 text-white backdrop-blur-md px-8 py-4 rounded-md font-bold hover:bg-white/20 transition-all border border-white/30"
              >
                Explore Careers
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Featured News / Updates */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#004A26] font-bold tracking-widest uppercase text-xs">Stay Updated</span>
            <h2 className="text-3xl font-bold serif-font mt-2">Latest Announcements</h2>
          </div>
          <button onClick={() => setActiveTab('news')} className="text-[#004A26] font-bold text-sm hover:underline mt-4 md:mt-0">
            View All News →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_NEWS.slice(0, 3).map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-4 aspect-video">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full uppercase font-bold tracking-tighter mb-2 inline-block">
                {item.category}
              </span>
              <h3 className="text-lg font-bold group-hover:text-[#004A26] transition-colors mb-2 leading-snug">{item.title}</h3>
              <p className="text-slate-600 text-sm line-clamp-2 mb-4">{item.excerpt}</p>
              <p className="text-slate-400 text-xs">{new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action: Knowledge Repository */}
      <section className="bg-[#004A26] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl serif-font font-bold mb-6">Centralized Geoscience Knowledge Base</h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              We host over 500+ technical reports, journal articles, and geological maps specifically focused on the Eritrean terrain. Access the full repository for free as a member.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-[#C9A227] pl-4">
                <div className="text-3xl font-bold">150+</div>
                <div className="text-xs uppercase text-white/60 tracking-widest">Journal Papers</div>
              </div>
              <div className="border-l-2 border-[#C9A227] pl-4">
                <div className="text-3xl font-bold">2.5k</div>
                <div className="text-xs uppercase text-white/60 tracking-widest">Active Members</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">Featured Publication</h3>
            {MOCK_PUBLICATIONS[0] && (
              <>
                <h4 className="text-lg text-[#C9A227] font-semibold mb-2">{MOCK_PUBLICATIONS[0].title}</h4>
                <p className="text-sm text-white/70 mb-6 italic">{MOCK_PUBLICATIONS[0].author} ({new Date(MOCK_PUBLICATIONS[0].date).getFullYear()})</p>
                <button 
                  onClick={() => setActiveTab('publications')}
                  className="w-full py-3 bg-white text-[#004A26] font-bold rounded hover:bg-slate-100 transition-colors"
                >
                  Download Technical Report
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Career Section Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-slate-200">
          <div className="mb-8 md:mb-0 md:max-w-xl">
            <h2 className="text-2xl font-bold serif-font mb-4">Empowering the next generation of engineers</h2>
            <p className="text-slate-600">Explore scholarship opportunities, fellowships, and job calls within the Eritrean mining sector.</p>
          </div>
          <button 
            onClick={() => setActiveTab('careers')}
            className="px-8 py-4 bg-[#C9A227] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Visit Career Board
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
