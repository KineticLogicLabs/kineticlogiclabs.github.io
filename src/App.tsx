import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Fingerprint, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Mail,
  Cpu,
  Layers,
  Compass,
  Clock,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';

import BackgroundGrid from './components/BackgroundGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import InquiryForm from './components/InquiryForm';
import OurTeam from './components/OurTeam';
import ScrollVideoScrubber from './components/ScrollVideoScrubber';

import pencilCaseVideo from './pencil_case_video.mp4';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Synchronize state from hash on mount and on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const path = hash.slice(2);
        const validPages = ['about', 'projects', 'repository', 'contact'];
        if (validPages.includes(path)) {
          setActiveTab(path);
          return;
        }
      }
      setActiveTab('home');
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize hash from activeTab state
  useEffect(() => {
    const currentHash = window.location.hash;
    if (activeTab === 'home') {
      if (currentHash !== '' && currentHash !== '#/') {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      const expectedHash = `#/${activeTab}`;
      if (currentHash !== expectedHash) {
        window.location.hash = `/${activeTab}`;
      }
    }
  }, [activeTab]);

  const handleInquireClick = () => {
    setActiveTab('contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen text-charcoal flex flex-col font-sans antialiased bg-bone-light" id="app-root-container">
      {/* 1. Animated background grid lines & coordinates indicator */}
      <BackgroundGrid />

      {/* 2. Glassmorphic main navigation header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onInquireClick={handleInquireClick} 
      />

      {/* 3. Main layout stage */}
      <main className={`flex-1 relative z-10 ${activeTab !== 'home' ? 'pt-[76px]' : ''}`}>
        
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {/* FULL-WIDTH IMMERSIVE VIDEO HERO & SCRUBBER */}
              <ScrollVideoScrubber 
                videoUrl={pencilCaseVideo} 
                onViewProjects={() => {
                  setActiveTab('projects');
                  window.scrollTo(0, 0);
                }}
                onViewAbout={() => {
                  setActiveTab('about');
                  window.scrollTo(0, 0);
                }}
              />

              {/* REST OF HOME PAGE CONTENT */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                {/* Spotlight Team Block */}
                <section>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-bone-warm p-8 rounded-2xl border border-accent-blue/10">
                    <div className="space-y-1 max-w-2xl text-left">
                      <h4 className="text-3xl md:text-4xl font-sans font-bold text-charcoal">Meet the Core Research Faculty</h4>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('about');
                        window.scrollTo(0, 0);
                      }}
                      className="whitespace-nowrap px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-bone-light bg-accent-blue hover:bg-opacity-95 transition-all duration-300 flex items-center gap-2"
                    >
                      <span>Meet the Team</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-10 min-h-[60vh]"
            >
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-8"
            >
              <OurTeam />
            </motion.div>
          )}

          {activeTab === 'repository' && (
            <motion.div
              key="repository-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-10 min-h-[60vh]"
            >
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="max-w-6xl mx-auto py-8 px-4 md:px-8 space-y-10"
            >
              {/* Short Header & Explanatory Message */}
              <div className="space-y-2 pb-6 border-b border-accent-blue/10 text-left">
                <h2 className="text-5xl md:text-6xl font-sans font-bold text-charcoal tracking-tight leading-tight">
                  Contact
                </h2>
                <p className="font-sans text-[17px] font-bold text-charcoal-muted">
                  Any questions or feedback? Contact us below or send an email.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Inquiry Form Card */}
                <div className="lg:col-span-7">
                  <InquiryForm />
                </div>

                {/* Right Column: Contact Information Section */}
                <div className="lg:col-span-5 pt-4 lg:pt-0 space-y-6">
                  <div>
                    <h3 className="font-mono text-lg font-bold tracking-wider text-charcoal uppercase">
                      CONTACT INFORMATION
                    </h3>
                    <div className="h-[1px] w-full bg-accent-blue/15 mt-3" />
                  </div>

                  <div className="flex items-center gap-5">
                    {/* Icon Card Box */}
                    <div className="h-14 w-14 glass-sheet rounded-lg flex items-center justify-center shadow-sm">
                      <Mail className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-charcoal-muted tracking-widest uppercase block mb-1 font-semibold">
                        EMAIL ADDRESS
                      </span>
                      <a 
                        href="mailto:kineticlogiclabs@gmail.com" 
                        className="font-mono text-sm md:text-base font-bold text-charcoal hover:text-accent-blue transition-colors"
                      >
                        kineticlogiclabs@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* 4. Modular Curated Academic Footer matching image precisely in light theme */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
