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
  const [selectedProgramId, setSelectedProgramId] = useState<string>('kll-101');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  // Synchronize state from hash on mount and on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const path = hash.slice(2);
        if (path.startsWith('courses/')) {
          const sub = path.slice(8);
          if (sub === 'kll-101' || sub === 'kll-102') {
            setActiveTab('courses');
            setActiveCourseId(sub);
            return;
          }
        }
        const validPages = ['about', 'courses', 'team', 'contact'];
        if (validPages.includes(path)) {
          setActiveTab(path);
          setActiveCourseId(null);
          return;
        }
      }
      setActiveTab('home');
      setActiveCourseId(null);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize hash from activeTab and activeCourseId state
  useEffect(() => {
    const currentHash = window.location.hash;
    if (activeTab === 'home') {
      if (currentHash !== '' && currentHash !== '#/') {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } else if (activeTab === 'courses' && activeCourseId) {
      const expectedHash = `#/${activeTab}/${activeCourseId}`;
      if (currentHash !== expectedHash) {
        window.location.hash = `/${activeTab}/${activeCourseId}`;
      }
    } else {
      const expectedHash = `#/${activeTab}`;
      if (currentHash !== expectedHash) {
        window.location.hash = `/${activeTab}`;
      }
    }
  }, [activeTab, activeCourseId]);

  const handleInquireClick = () => {
    setActiveTab('contact');
    window.scrollTo(0, 0);
  };

  const handleProgramSelect = (id: string) => {
    setSelectedProgramId(id);
    setActiveCourseId(id);
    setActiveTab('courses');
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
                onViewCourses={() => {
                  setActiveTab('courses');
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

          {activeTab === 'courses' && (
            <motion.div
              key={activeCourseId ? `course-detail-${activeCourseId}` : 'courses-list'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-12"
            >
              {!activeCourseId ? (
                <>
                  {/* Courses Header */}
                  <div className="space-y-2 pb-6 border-b border-accent-blue/10 text-left max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-charcoal tracking-tight">
                      Academic Courses
                    </h2>
                    <p className="font-sans text-[17px] font-bold text-charcoal-muted leading-relaxed">
                      View our courses and apply for enrollment below — all courses are completely free of charge
                    </p>
                  </div>

                  {/* Course Box */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="academic-courses-grid">
                    {programs.map((p) => (
                      <div
                        key={p.id}
                        className="bg-bone-warm border border-accent-blue/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-accent-blue/20 transition-all duration-300 shadow-sm"
                      >
                        {/* Visual accent top line */}
                        <div className="absolute top-0 left-0 right-0 h-[4px] bg-accent-blue/20 group-hover:bg-accent-blue transition-colors duration-300" />
                        
                        {/* Header elements of the course card */}
                        <div className="space-y-4 text-left">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] font-bold tracking-widest text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded border border-accent-blue/10">
                              {p.code}
                            </span>
                            <span className="font-mono text-[11px] text-charcoal-muted tracking-wide font-medium">
                              {p.duration}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-2xl md:text-3xl font-sans font-bold text-charcoal tracking-tight">
                              {p.title}
                            </h3>
                            <p className="font-sans text-xs italic text-charcoal-muted font-light leading-relaxed border-l-2 border-accent-blue/20 pl-3">
                              "{p.tagline}"
                            </p>
                          </div>

                          <p className="font-sans text-sm text-charcoal-light leading-relaxed pt-1">
                            {p.description}
                          </p>
                        </div>

                        {/* Modules Checklist */}
                        <div className="space-y-3 text-left">
                          <span className="text-[9px] font-mono text-accent-blue tracking-widest uppercase font-bold block">
                            CURRICULUM_SYLLABUS_MODULES:
                          </span>
                          <ul className="space-y-2.5 font-sans text-xs">
                            {p.curriculumSummary.map((item, index) => (
                              <li key={index} className="flex items-start gap-3 text-charcoal-light">
                                <span className="flex-shrink-0 h-5 w-5 rounded bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center font-mono text-[9px] text-accent-blue font-bold mt-0.5">
                                  0{index + 1}
                                </span>
                                <span className="leading-normal pt-0.5 font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Footer elements & Action */}
                        <div className="border-t border-accent-blue/10 pt-5 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-2">
                            <span className="text-[10px] font-mono text-charcoal-muted bg-bone-light/80 px-2.5 py-1 rounded-lg border border-accent-blue/5">
                              LEVEL: {p.level.toUpperCase()}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 font-bold uppercase tracking-wider">
                              Registration Active
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                setActiveCourseId(p.id);
                                window.scrollTo(0, 0);
                              }}
                              className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-accent-blue bg-accent-blue/5 hover:bg-accent-blue/10 border border-accent-blue/20 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProgramId(p.id);
                                handleInquireClick();
                              }}
                              className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-bone-light bg-accent-blue hover:bg-opacity-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Inquire</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (() => {
                const p = programs.find((prog) => prog.id === activeCourseId);
                if (!p) return null;
                const filteredProjects = studentProjects.filter((proj) => proj.programId === p.id);
                const syllabusItems = p.id === 'kll-101' ? [
                  { week: 'Weeks 01–03', title: 'Parametric Foundations', desc: 'Sketch constraints, dimensional spatial planes, dimensional alignment, and parametric sketching algebra.' },
                  { week: 'Weeks 04–06', title: 'Solid Assembly Mechanics', desc: 'Volumetric solid constructs, motion joints, rigid versus slider interfaces, and complex mechanical assembly linkages.' },
                  { week: 'Weeks 07–09', title: 'Surface Sculpting & T-Splines', desc: 'Curvature continuity, organic freeform sculpting, mesh subdivision, and polygonal topology optimization.' },
                  { week: 'Weeks 10–12', title: 'Fabrication & Simulation', desc: 'Physical fabrication pipelines, finite element stress testing, photorealistic rendering studio, and production export preparation.' }
                ] : [
                  { week: 'Session 1 (Morning)', title: 'Introduction & Interface', desc: 'Familiarization with Fusion UI, mouse navigation, units, grid snap, and setting up workspace preferences.' },
                  { week: 'Session 2 (Morning)', title: 'Sketching & Constraints', desc: 'Drafting 2D profiles with geometric relationships, defining parameters, and locking dimensions.' },
                  { week: 'Session 3 (Afternoon)', title: '3D Extrusions & Features', desc: 'Transforming 2D sketches into 3D solid geometries, utilizing fillets, chamfers, and shell modifiers.' },
                  { week: 'Session 4 (Afternoon)', title: 'Digital Export & Printing', desc: 'Analyzing models for 3D printing suitability, generating STL files, and basic slicing configuration.' }
                ];

                return (
                  <div className="space-y-12 text-left" id="course-details-subpage">
                    {/* Back Button & Path */}
                    <div className="flex items-center justify-between pb-4 border-b border-accent-blue/10">
                      <button
                        onClick={() => {
                          setActiveCourseId(null);
                          window.scrollTo(0, 0);
                        }}
                        className="group flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-accent-blue hover:text-charcoal transition-colors duration-300 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to All Courses</span>
                      </button>

                      <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-charcoal-muted">
                        <span>COURSES</span>
                        <span>/</span>
                        <span className="text-accent-blue font-bold">{p.code}</span>
                      </div>
                    </div>

                    {/* Course Hero Header Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] font-bold tracking-widest text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded border border-accent-blue/10">
                            {p.code}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 font-bold uppercase tracking-wider">
                            Active Registration
                          </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-charcoal tracking-tight leading-tight">
                          {p.title}
                        </h2>

                        <p className="font-sans text-sm italic text-charcoal-muted border-l-2 border-accent-blue/20 pl-3 leading-relaxed">
                          "{p.tagline}"
                        </p>

                        <p className="font-sans text-base text-charcoal-light leading-relaxed pt-2">
                          {p.description}
                        </p>
                      </div>

                      {/* Course Quick Info Panel */}
                      <div className="lg:col-span-4 bg-bone-warm border border-accent-blue/10 rounded-2xl p-6 space-y-6">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal border-b border-accent-blue/10 pb-3">
                          COURSE METRICS
                        </h4>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-charcoal">
                            <Clock className="w-5 h-5 text-accent-blue/80 shrink-0" />
                            <div>
                              <span className="text-[9px] font-mono text-charcoal-muted block uppercase font-bold leading-none mb-1">
                                DURATION
                              </span>
                              <span className="font-sans text-sm font-semibold">{p.duration}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-charcoal">
                            <Award className="w-5 h-5 text-accent-blue/80 shrink-0" />
                            <div>
                              <span className="text-[9px] font-mono text-charcoal-muted block uppercase font-bold leading-none mb-1">
                                LEVEL
                              </span>
                              <span className="font-sans text-sm font-semibold">{p.level}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-charcoal">
                            <Layers className="w-5 h-5 text-accent-blue/80 shrink-0" />
                            <div>
                              <span className="text-[9px] font-mono text-charcoal-muted block uppercase font-bold leading-none mb-1">
                                SYLLABUS UNITS
                              </span>
                              <span className="font-sans text-sm font-semibold">{p.curriculumSummary.length} Focus Modules</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedProgramId(p.id);
                            handleInquireClick();
                          }}
                          className="w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-bone-light bg-accent-blue hover:bg-opacity-95 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Inquire About Course</span>
                        </button>
                      </div>
                    </div>

                    {/* Detailed Curriculum Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-accent-blue/10">
                      <div className="lg:col-span-8 space-y-6">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-accent-blue tracking-widest uppercase font-bold block">
                            CURRICULUM_BLUEPRINT_BREAKDOWN:
                          </span>
                          <h3 className="text-2xl md:text-3xl font-sans font-bold text-charcoal tracking-tight">
                            Weekly Detailed Syllabus
                          </h3>
                        </div>

                        <div className="space-y-4 relative pl-6">
                          {/* Vertical timeline line */}
                          <div className="absolute left-[7px] top-4 bottom-4 w-[1px] bg-accent-blue/15" />

                          {syllabusItems.map((item, idx) => (
                            <div key={idx} className="bg-bone-warm border border-accent-blue/5 rounded-xl p-5 relative group">
                              <div className="absolute -left-[24px] top-7 h-3.5 w-3.5 rounded-full border-2 border-accent-blue bg-bone-light z-10" />
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-mono text-[10px] font-bold text-accent-blue tracking-wider uppercase bg-accent-blue/5 px-2 py-0.5 rounded border border-accent-blue/10">
                                    {item.week}
                                  </span>
                                </div>
                                <h4 className="text-lg font-sans font-bold text-charcoal">
                                  {item.title}
                                </h4>
                                <p className="font-sans text-sm text-charcoal-muted leading-relaxed font-light">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Course Features Sidebar */}
                      <div className="lg:col-span-4 space-y-6">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-accent-blue tracking-widest uppercase font-bold block">
                            BENEFITS_&_FEATURES:
                          </span>
                          <h3 className="text-xl font-sans font-bold text-charcoal tracking-tight">
                            Key Core Features
                          </h3>
                        </div>

                        <div className="space-y-3">
                          {p.features?.map((feat, fidx) => (
                            <div key={fidx} className="bg-bone-warm/65 border border-accent-blue/10 p-4 rounded-xl flex gap-3">
                              <span className="flex-shrink-0 h-5 w-5 rounded bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center font-mono text-[9px] text-accent-blue font-bold mt-0.5">
                                ✓
                              </span>
                              <span className="font-sans text-sm text-charcoal-muted font-medium">{feat}</span>
                            </div>
                          ))}
                          <div className="bg-bone-warm/65 border border-accent-blue/10 p-4 rounded-xl flex gap-3">
                            <span className="flex-shrink-0 h-5 w-5 rounded bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center font-mono text-[9px] text-accent-blue font-bold mt-0.5">
                              ✓
                            </span>
                            <span className="font-sans text-sm text-charcoal-muted font-medium">Lifetime access to research community archives</span>
                          </div>
                          <div className="bg-bone-warm/65 border border-accent-blue/10 p-4 rounded-xl flex gap-3">
                            <span className="flex-shrink-0 h-5 w-5 rounded bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center font-mono text-[9px] text-accent-blue font-bold mt-0.5">
                              ✓
                            </span>
                            <span className="font-sans text-sm text-charcoal-muted font-medium">Direct mentorship from core design faculty staff</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Featured Student Projects for this course */}
                    {filteredProjects.length > 0 && (
                      <div className="pt-10 border-t border-accent-blue/10 space-y-6">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-accent-blue tracking-widest uppercase font-bold block">
                            ACTIVE_RESEARCH_DEMOS:
                          </span>
                          <h3 className="text-2xl md:text-3xl font-sans font-bold text-charcoal tracking-tight">
                            Featured Student Projects
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredProjects.map((proj) => (
                            <div key={proj.id} className="bg-bone-warm border border-accent-blue/10 rounded-xl p-6 space-y-4 text-left hover:border-accent-blue/20 transition-all duration-300">
                              <div className="flex justify-between items-center">
                                <span className="font-mono text-[10px] text-accent-blue font-bold tracking-wider">
                                  BY: {proj.author.toUpperCase()}
                                </span>
                                <span className="font-mono text-[10px] text-charcoal-muted">
                                  {proj.date}
                                </span>
                              </div>
                              <h4 className="text-xl font-sans font-bold text-charcoal">
                                {proj.title}
                              </h4>
                              <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
                                {proj.description}
                              </p>
                              {proj.geometryType && (
                                <div className="pt-2 border-t border-accent-blue/5 flex items-center justify-between text-[10px] font-mono text-charcoal-muted">
                                  <span>GEOMETRY_TOPOLOGY:</span>
                                  <span className="text-accent-blue font-bold">{proj.geometryType}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
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
