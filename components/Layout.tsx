
import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Publications', id: 'publications' },
    { label: 'News & Events', id: 'news' },
    { label: 'Resources', id: 'resources' },
    { label: 'Careers', id: 'careers' },
    { label: 'Admin', id: 'admin' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#004A26] text-white py-2 px-4 md:px-8 text-sm flex justify-between items-center">
        <span>Society of Eritrean Earth Scientists and Mining Engineers</span>
        <div className="hidden md:flex space-x-4">
          <button className="hover:underline">English</button>
          <span>|</span>
          <button className="hover:underline font-semibold">ትግርኛ</button>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-20">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setActiveTab('home')}>
            <img 
              src="logo.png" 
              alt="SEESME Logo" 
              className="w-14 h-14 object-contain"
              onError={(e) => {
                // Fallback if logo.png is not found in local context
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#004A26] uppercase leading-none">SEESME</h1>
              <p className="text-[10px] text-slate-500 uppercase font-medium mt-1">Eritrean Geoscience and Mining Engineering Hub</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-semibold transition-colors duration-200 uppercase tracking-wider ${
                    activeTab === item.id ? 'text-[#C9A227] border-b-2 border-[#C9A227]' : 'text-slate-600 hover:text-[#004A26]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-50 border-b border-slate-200">
            <ul className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left font-semibold ${
                      activeTab === item.id ? 'text-[#004A26]' : 'text-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 mb-6">
               <img src="logo.png" alt="SEESME" className="w-16 h-16 object-contain invert grayscale brightness-200" />
               <div>
                  <h3 className="text-white text-lg font-bold uppercase tracking-widest">SEESME</h3>
                  <p className="max-w-md text-sm leading-relaxed mt-2 opacity-70">
                    Advancing knowledge and practice in earth sciences, mining engineering, and related fields within Eritrea and the wider region.
                  </p>
               </div>
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              {['LinkedIn', 'Twitter', 'Facebook'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#C9A227] hover:text-white transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current opacity-20"></div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveTab('publications')} className="hover:text-white">Publications</button></li>
              <li><button onClick={() => setActiveTab('news')} className="hover:text-white">News & Events</button></li>
              <li><button onClick={() => setActiveTab('careers')} className="hover:text-white">Career Board</button></li>
              <li><button className="hover:text-white">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Asmara, Eritrea</li>
              <li>info@seesme.org</li>
              <li>+291 1 123 456</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-slate-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center opacity-40">
          <p>© {new Date().getFullYear()} Society of Eritrean Earth Scientists and Mining Engineers. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
