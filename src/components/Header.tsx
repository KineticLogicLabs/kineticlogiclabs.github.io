import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onInquireClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onInquireClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'team', label: 'OUR TEAM' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const searchItems = [
    {
      id: 'home',
      label: 'Home',
      subtitle: 'Overview, core themes, and laboratory intro',
      keywords: ['home', 'welcome', 'landing', 'main', 'kinetic', 'logic', 'labs'],
    },
    {
      id: 'about',
      label: 'About',
      subtitle: 'Meet Ziyao Xu, founder and executive lead',
      keywords: ['about', 'team', 'leadership', 'ziyao', 'xu', 'founder', 'members', 'people', 'staff'],
    },
    {
      id: 'projects',
      label: 'Projects',
      subtitle: 'Projects showcase',
      keywords: ['projects', 'work', 'builds', 'portfolio'],
    },
    {
      id: 'team',
      label: 'Our Team',
      subtitle: 'Academic timeline, research notebook, and labs syllabus',
      keywords: ['team', 'curriculum', 'syllabus', 'timeline', 'research', 'notebook', 'labs', 'methodology', 'philosophy', 'mission', 'story'],
    },
    {
      id: 'contact',
      label: 'Contact & Inquiry',
      subtitle: 'Admissions and program inquiry form',
      keywords: ['contact', 'inquiry', 'admissions', 'form', 'email', 'message', 'register'],
    },
  ];

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = trimmedQuery
    ? searchItems.filter(
        (item) =>
          item.label.toLowerCase().includes(trimmedQuery) ||
          item.subtitle.toLowerCase().includes(trimmedQuery) ||
          item.keywords.some((kw) => kw.includes(trimmedQuery))
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredItems.length > 0) {
      setActiveTab(filteredItems[0].id);
    } else {
      const query = searchQuery.toLowerCase();
      if (query.includes('project') || query.includes('work') || query.includes('build')) {
        setActiveTab('projects');
      } else if (query.includes('team') || query.includes('member') || query.includes('ziyao') || query.includes('people') || query.includes('staff')) {
        setActiveTab('about');
      } else if (query.includes('curriculum') || query.includes('syllabus') || query.includes('about') || query.includes('notebook') || query.includes('research') || query.includes('philosophy') || query.includes('mission') || query.includes('story')) {
        setActiveTab('team');
      } else if (query.includes('inquiry') || query.includes('admissions') || query.includes('contact') || query.includes('form')) {
        setActiveTab('contact');
      } else {
        setActiveTab('home');
      }
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <AnimatePresence>
        {!isSearchOpen && (
          <motion.header
            key="main-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-50 w-full navbar-frosted py-4 px-6 md:px-12"
            id="global-header"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
              {/* Brand Logo & Text Layout - Exactly like the image */}
              <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveTab('home')}>
              {/* Pointy-topped Hexagon Gear SVG Logo - Exact user-supplied SVG */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg 
                  id="Logo" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="120 120 760 760"
                  className="w-9 h-9 text-accent-blue"
                >
                  <polygon 
                    className="fill-none stroke-current"
                    strokeWidth="29" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="500 123.78 174.18 311.89 174.18 688.11 500 876.22 825.82 688.11 825.82 311.89 500 123.78"
                  />
                  <circle 
                    className="fill-none stroke-current"
                    strokeWidth="29" 
                    cx="500" 
                    cy="500" 
                    r="162.65"
                  />
                  <path 
                    className="fill-current stroke-none"
                    d="M753.03,448.91l-36.04-7.29c-3.87-.78-6.99-3.62-8.17-7.39-3.87-12.28-8.8-24.1-14.67-35.34-1.83-3.51-1.64-7.72.55-11.02l20.35-30.66c4.43-6.68,4.05-14.91-.92-19.88l-51.46-51.46c-4.97-4.97-13.2-5.35-19.88-.92l-30.66,20.35c-3.3,2.19-7.51,2.38-11.02.55-10.95-5.72-22.44-10.54-34.38-14.35-3.74-1.2-6.56-4.31-7.34-8.16l-8.3-41.03c-1.59-7.85-7.68-13.4-14.7-13.4h-72.78c-7.02,0-13.11,5.55-14.7,13.4l-8.3,41.03c-.78,3.85-3.6,6.96-7.34,8.16-11.94,3.81-23.43,8.63-34.38,14.35-3.51,1.83-7.72,1.64-11.02-.55l-30.66-20.35c-6.68-4.43-14.91-4.05-19.88.92l-51.46,51.46c-4.97,4.97-5.35,13.2-.92,19.88l20.35,30.66c2.19,3.3,2.38,7.51.55,11.02-5.87,11.24-10.8,23.06-14.67,35.34-1.18,3.77-4.3,6.61-8.17,7.39l-36.04,7.29c-7.85,1.59-13.41,7.68-13.41,14.7v72.78c0,7.02,5.56,13.11,13.41,14.7l36.04,7.29c3.87.78,6.99,3.62,8.17,7.39,3.87,12.28,8.8,24.1,14.67,35.34,1.83,3.51,1.64,7.72-.55,11.02l-20.35,30.66c-4.43,6.68-4.05,14.91.92,19.88l51.46,51.46c4.97,4.97,13.2,5.35,19.88.92l30.66-20.35c3.3-2.19,7.51-2.38,11.02-.55,11.24,5.87,23.06,10.8,35.34,14.67,3.77,1.18,6.61,4.3,7.39,8.17l7.29,36.04c1.59,7.85,7.68,13.41,14.7,13.41h72.78c7.02,0,13.11-5.56,14.7-13.41l7.29-36.04c.78-3.87,3.62-6.99,7.39-8.17,12.28-3.87,24.1-8.8,35.34-14.67,3.51-1.83,7.72-1.64,11.02.55l30.66,20.35c6.68,4.43,14.91,4.05,19.88-.92l51.46-51.46c4.97-4.97,5.35-13.2.92-19.88l-20.35-30.66c-2.19-3.3-2.38-7.51-.55-11.02,5.87-11.24,10.8-23.06,14.67-35.34,1.18-3.77,4.3-6.61,8.17-7.39l36.04-7.29c7.85-1.59,13.41-7.68,13.41-14.7v-72.78c0-7.02-5.56-13.11-13.41-14.7ZM500,662.65c-89.83,0-162.65-72.82-162.65-162.65s72.82-162.65,162.65-162.65,162.65,72.82,162.65,162.65-72.82,162.65-162.65,162.65Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col select-none leading-none">
                <span className="font-mono text-[13px] font-extrabold tracking-widest text-charcoal">KINETIC</span>
                <span className="font-mono text-[13px] font-extrabold tracking-widest text-charcoal">LOGIC LABS</span>
              </div>
            </div>

            {/* Navigation menu - exact uppercase with line indicator underneath, search and vertical line */}
            <div className="flex items-center gap-2">
              <nav className="hidden md:flex items-center gap-7 lg:gap-10 mr-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav-tab-${item.id}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        window.scrollTo(0, 0);
                      }}
                      className={`relative py-2 text-[11px] font-mono font-extrabold tracking-widest transition-all duration-300 ${
                        isActive ? 'text-accent-blue' : 'text-charcoal-light hover:text-accent-blue'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute left-0 right-0 bottom-0 h-[2.5px] bg-accent-blue rounded-full transition-all duration-300" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Vertical divider */}
              <div className="h-5 w-[1px] bg-accent-blue/25 mx-2 hidden md:block" />

              {/* Search button toggler */}
              <div className="relative flex items-center">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="text-charcoal-light hover:text-accent-blue transition-colors p-2 rounded-lg hover:bg-bone-warm/50" 
                  aria-label="Search site"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-charcoal-light hover:text-accent-blue p-2 rounded-lg hover:bg-bone-warm/50 focus:outline-none flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
                aria-label="Toggle navigation menu"
              >
                <span className={`w-5 h-0.5 bg-current transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
                <span className={`w-5 h-0.5 bg-current transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </button>
            </div>
          </div>
        </motion.header>
      )}

        {isSearchOpen && (
          <motion.div
            key="search-bar-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-4 left-0 right-0 px-6 md:px-12 flex justify-center z-50 pointer-events-none"
          >
            <div className="max-w-7xl w-full mx-auto relative flex flex-col gap-2 pointer-events-auto">
              <motion.form
                onSubmit={handleSearchSubmit}
                initial={{ opacity: 0, scaleX: 0.1, x: '35%' }}
                animate={{ opacity: 1, scaleX: 1, x: 0 }}
                exit={{ opacity: 0, scaleX: 0.1, x: '35%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                style={{ transformOrigin: 'right center' }}
                className="w-full navbar-frosted border border-accent-blue/30 rounded-full py-3 px-6 shadow-2xl flex items-center gap-3"
              >
                <Search className="w-5 h-5 text-accent-blue flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search pages..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-base md:text-sm font-mono border-none focus:outline-none text-charcoal placeholder-charcoal-light/60"
                  autoFocus
                />
                <button 
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-charcoal-light hover:text-accent-blue transition-colors p-1.5 rounded-full hover:bg-bone-warm/50 flex-shrink-0"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-xl mt-2 navbar-frosted border border-accent-blue/30 rounded-2xl shadow-2xl p-2 max-h-[350px] overflow-y-auto z-50 flex flex-col gap-1"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-accent-blue/70 uppercase border-b border-white/5">
                      Suggested Pages
                    </div>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            window.scrollTo(0, 0);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all flex items-center justify-between group"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="font-sans font-bold text-sm text-charcoal group-hover:text-white transition-colors">
                              {item.label}
                            </span>
                            <span className="font-sans text-xs text-charcoal-muted">
                              {item.subtitle}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-charcoal-muted group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center text-xs font-sans text-charcoal-muted">
                        No pages match your search
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    {/* Mobile responsive navigation panel - outside header to avoid backdrop-filter limitations */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 180 }}
          className="fixed inset-0 bg-bone-light/98 backdrop-blur-3xl px-8 pt-28 pb-8 flex flex-col justify-center gap-6 md:hidden z-40 shadow-2xl overflow-y-auto"
        >
          <div className="flex flex-col gap-5 max-w-md mx-auto w-full">
            {navItems.map((item, index) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`py-4 text-3xl font-sans font-bold tracking-tight text-left border-b border-white/5 transition-colors ${
                    isActive ? 'text-white border-l-4 border-white pl-4' : 'text-white/60 pl-4 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
}
