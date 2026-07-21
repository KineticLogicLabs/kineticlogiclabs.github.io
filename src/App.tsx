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
import ProgramCard from './components/ProgramCard';
import InquiryForm from './components/InquiryForm';
import OurTeam from './components/OurTeam';
import ScrollVideoScrubber from './components/ScrollVideoScrubber';

import { programs, studentProjects } from './data';
import pencilCaseVideo from './pencil_case_video.mp4';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Synchronize state from hash on mount and on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const path = hash.slice(2);
        const validPages = ['about', 'projects', 'team', 'contact'];
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

  const handleProgramSelect = (_id: string) => {
    setActiveTab('projects');
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
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
                {/* PROGRAMS SECTION */}
                <section className="space-y-10 pt-4">
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-4xl md:text-5xl font-sans font-bold text-charcoal tracking-tight">
                      Educational Programs
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto" id="programs-grid-panel">
                    {programs.map((prog) => (
                      <ProgramCard 
                        key={prog.id} 
                        program={prog} 
                        onSelect={handleProgramSelect} 
                      />
                    ))}
                  </div>
                </section>

                {/* Spotlight Team Block */}
                <section className="pt-8 border-t border-accent-blue/15">
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

          {activeTab === 'team' && (
            <motion.div
              key="team-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-20"
            >
              {/* Main Mission Statement Section */}
              <div className="space-y-6 text-left max-w-4xl" id="about-mission">
                <h2 className="text-4xl md:text-6xl font-sans font-bold text-charcoal tracking-tight leading-tight md:leading-[1.15]">
                  We believe young engineers deserve the tools and education to match their potential.
                </h2>
                <div className="h-[2px] w-24 bg-accent-blue/40 mt-4" />
              </div>

              {/* Story section with gorgeous image & text */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-story">
                <div className="lg:col-span-6 space-y-6 text-left">
                  <h3 className="text-2xl md:text-3.5xl font-sans font-bold text-charcoal tracking-tight">
                    Bridging computational intelligence with physical craftsmanship.
                  </h3>
                  <div className="space-y-4 text-charcoal-light font-sans text-base leading-relaxed font-light">
                    <p>
                      Kinetic Logic Labs began as an experimental research collective seeking to unite programmatic thinking with tactile materials. Traditionally, parametric engineering, industrial design, and full-stack software development were treated as separate disciplines. Designers sketched static visuals, engineers analyzed mechanical constraints, and developers coded in isolated sandboxes.
                    </p>
                    <p>
                      We asked a fundamental question: <strong className="text-charcoal font-medium">What if these pipelines merged?</strong> What if we could craft real-world physical structures with the parametric fluidity of algorithms, and compile modern visual systems using the generative acceleration of AI models?
                    </p>
                    <p>
                      Our curriculum is the answer to that question. We don't just teach software or tools; we teach a unified methodology of computational form, logic, and materials.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group border border-accent-blue/10">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
                    alt="Precision engineering design workspace with hands-on fabrication"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute bottom-5 left-5 text-left text-bone-light font-mono text-[10px] tracking-widest uppercase">
                    EST_2024 // ACTIVE_RESEARCH_LAB
                  </div>
                </div>
              </div>

              {/* Value Pillars / Philosophy Sections with staggered imagery */}
              <div className="space-y-16 pt-12 border-t border-accent-blue/10" id="about-philosophy">
                <div className="text-left space-y-2">
                  <span className="text-[10px] font-mono text-accent-blue tracking-widest font-bold uppercase block">
                    OUR_PHILOSOPHY:
                  </span>
                  <h3 className="text-3xl md:text-4xl font-sans font-bold text-charcoal tracking-tight">
                    How We Think, Design, and Create
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Pillar 1 */}
                  <div className="space-y-4 text-left group">
                    <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-accent-blue/5 shadow-sm relative">
                      <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" 
                        alt="Parametric geometry and mesh grid visualization" 
                        className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-accent-blue text-bone-light font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        01 / FORM
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-accent-blue">
                      <Compass className="w-5 h-5" />
                      <h4 className="text-lg font-sans font-bold text-charcoal tracking-tight">
                        Computational Precision
                      </h4>
                    </div>
                    <p className="font-sans text-sm text-charcoal-muted leading-relaxed font-light">
                      Every project starts with absolute mathematical rules. By mapping parametric sketches and geometric constraints, we produce forms that are naturally beautiful, structurally stable, and highly adaptable.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="space-y-4 text-left group">
                    <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-accent-blue/5 shadow-sm relative">
                      <img 
                        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop" 
                        alt="Tactile fabrication modeling tools and machinery" 
                        className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-accent-blue text-bone-light font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        02 / MATTER
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-accent-blue">
                      <Layers className="w-5 h-5" />
                      <h4 className="text-lg font-sans font-bold text-charcoal tracking-tight">
                        Tactile Craftsmanship
                      </h4>
                    </div>
                    <p className="font-sans text-sm text-charcoal-muted leading-relaxed font-light">
                      The digital pixel is only a medium. We translate virtual models into raw physical materials—metal, polymer, and wood—testing weight, friction, torque, and tactile satisfaction under real-world pressures.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="space-y-4 text-left group">
                    <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-accent-blue/5 shadow-sm relative">
                      <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
                        alt="Modern studio collaborative environment" 
                        className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-accent-blue text-bone-light font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        03 / MIND
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-accent-blue">
                      <Cpu className="w-5 h-5" />
                      <h4 className="text-lg font-sans font-bold text-charcoal tracking-tight">
                        Generative Intelligence
                      </h4>
                    </div>
                    <p className="font-sans text-sm text-charcoal-muted leading-relaxed font-light">
                      The future belongs to those who collaborate with AI. We teach students to co-create with advanced neural model systems, using interactive feedback loops to accelerate design processes and code deployment.
                    </p>
                  </div>
                </div>
              </div>
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
