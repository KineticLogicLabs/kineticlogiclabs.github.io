import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Award, Compass, ChevronLeft, ChevronRight } from 'lucide-react';

import ziyaoPhoto from '../ziyao_photo.jpeg';
import pencilBoxClosed from '../pencil_box_closed.jpeg';
import pencilCaseOpen from '../pencil_case_open.jpeg';
import pencilCaseVideoNew from '../pencil_case_3_top_half_1.mp4';
import nsoAwardsPhoto from '../so_remote_sensing.jpeg';

interface TeamSlide {
  id: number;
  label: string;
  icon: React.ReactNode;
  title: string;
  paragraph: string;
  mediaType: 'image' | 'video' | 'custom';
  mediaSrc: string;
}

interface CarouselVideoProps {
  src: string;
  onLoadedMetadata: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
}

function CarouselVideo({ src, onLoadedMetadata }: CarouselVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      
      const attemptPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Playback block or autoplay failed:', err);
          });
        }
      };

      attemptPlay();

      // Listen to standard media events to play
      video.addEventListener('loadedmetadata', attemptPlay);
      video.addEventListener('loadeddata', attemptPlay);
      video.addEventListener('canplay', attemptPlay);
      video.addEventListener('canplaythrough', attemptPlay);

      // Programmatic loop fallback: if the browser pauses the video or fails to start, 
      // check and resume play periodically.
      const intervalId = setInterval(() => {
        if (video.paused) {
          video.play().catch(() => {});
        }
      }, 300);

      return () => {
        video.removeEventListener('loadedmetadata', attemptPlay);
        video.removeEventListener('loadeddata', attemptPlay);
        video.removeEventListener('canplay', attemptPlay);
        video.removeEventListener('canplaythrough', attemptPlay);
        clearInterval(intervalId);
      };
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={true}
      loop={true}
      muted={true}
      playsInline={true}
      controls={false}
      onLoadedMetadata={onLoadedMetadata}
      className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
    />
  );
}

function CadPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next/right, -1 for prev/left
  const [videoDuration, setVideoDuration] = useState(15000); // 15 seconds default fallback
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const portfolioItems = [
    { type: 'image', src: pencilBoxClosed, alt: 'Pencil Box Closed', duration: 3000 },
    { type: 'image', src: pencilCaseOpen, alt: 'Pencil Box Open', duration: 3000 },
    { type: 'video', src: pencilCaseVideoNew, alt: '3D Printing Process' }
  ];

  const currentItem = portfolioItems[currentIndex];
  const currentDuration = currentItem.type === 'image' ? (currentItem.duration || 3000) : videoDuration;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const startTimer = () => {
    stopTimer();
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1));
    }, currentDuration);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [currentIndex, currentDuration]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopTimer();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopTimer();
    setDirection(1);
    setCurrentIndex((prev) => (prev === portfolioItems.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    stopTimer();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const duration = e.currentTarget.duration;
    if (duration && !isNaN(duration)) {
      // Add a small buffer (e.g., 200ms) to ensure video completion
      setVideoDuration((duration * 1000) + 200);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Media Display Container */}
      <div className="relative w-full aspect-[16/10] lg:h-[58vh] lg:aspect-auto flex items-center justify-center overflow-hidden p-0 select-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 }
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
              />
            ) : (
              <CarouselVideo
                src={currentItem.src}
                onLoadedMetadata={handleVideoLoadedMetadata}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controller Controls */}
      <div className="flex items-center gap-6 mt-1 text-white/50">
        <button
          onClick={handlePrev}
          className="p-1 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
          aria-label="Previous item"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {portfolioItems.map((_, index) => {
            const isActive = index === currentIndex;
            const itemDuration = portfolioItems[index].type === 'image' ? 3000 : videoDuration;
            return (
              <button
                key={index}
                onClick={(e) => handleSelect(index, e)}
                className="group focus:outline-none py-2 cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className="h-[3px] w-12 bg-white/10 rounded-full overflow-hidden relative">
                  {isActive ? (
                    <motion.div
                      key={`${currentIndex}-${itemDuration}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: itemDuration / 1000, ease: 'linear' }}
                      className="absolute left-0 top-0 h-full bg-white rounded-full"
                    />
                  ) : (
                    <div className="h-full w-0 bg-transparent" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="p-1 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
          aria-label="Next item"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function OurTeam() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const isScrollingRef = React.useRef<boolean>(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const slides: TeamSlide[] = [
    {
      id: 0,
      label: 'FOUNDATION',
      icon: <Compass className="w-4 h-4 text-white/80" />,
      title: 'Founder & Executive Lead',
      paragraph: "Hi, my name’s Ziyao and I’m a freshman at Eastlake High School. I enjoy many activities in STEM and engineering including 3D design and CAD.",
      mediaType: 'image',
      mediaSrc: ziyaoPhoto
    },
    {
      id: 1,
      label: 'CHAMPIONSHIP',
      icon: <Trophy className="w-4 h-4 text-white/80" />,
      title: 'Science Olympiad National Gold',
      paragraph: "I also participate in Science Olympiad, where I achieved 1st place at Nationals for Remote Sensing, as well as 6th place in the nation for Mission Possible.",
      mediaType: 'image',
      mediaSrc: nsoAwardsPhoto
    },
    {
      id: 2,
      label: '3D INNOVATION',
      icon: <Award className="w-4 h-4 text-white/80" />,
      title: 'CAD Modeling',
      paragraph: "In my free time, I enjoy designing 3D models in Fusion and 3D printing, using my CAD skills to create functional items.",
      mediaType: 'custom',
      mediaSrc: 'cad-portfolio'
    }
  ];

  // Wait for parent entrance animation to complete before starting scroll observers
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Center-distance scroll listener: calculates which block is closest to the middle of the screen
  useEffect(() => {
    if (!isReady) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const targets = document.querySelectorAll('.scrolly-text-block');
      let minDistance = Infinity;
      let closestIndex = 0;
      const viewportCenter = window.innerHeight / 2;

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          const indexAttr = target.getAttribute('data-index');
          if (indexAttr !== null) {
            closestIndex = parseInt(indexAttr, 10);
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load to set active state based on current viewport
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isReady]);

  const scrollToSection = (index: number) => {
    const element = document.querySelector(`[data-index="${index}"]`);
    if (element) {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      
      // Instantly synchronize index on tap
      setActiveIndex(index);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  return (
    <div className="pt-8 md:pt-24 pb-8 text-left" id="our-team-section">
      {/* Intro Header */}
      <div className="max-w-4xl space-y-2">
        <div className="space-y-1">
          <div className="text-2xl md:text-4xl font-sans font-bold text-white/80 tracking-tight">
            Founder and Executive Lead
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tighter leading-none">
            Ziyao Xu
          </h2>
        </div>
      </div>

      {/* Mobile Inline Layout (lg:hidden) */}
      <div className="block lg:hidden space-y-12 mt-4">
        {slides.map((slide) => (
          <div key={slide.id} className="space-y-4">
            {/* Slide Narrative */}
            <div className="space-y-3">
              <h3 className="text-2xl font-sans font-bold text-white tracking-tight leading-tight">
                {slide.title}
              </h3>
              <p className="font-sans text-lg text-white/90 leading-relaxed font-light tracking-tight">
                {slide.paragraph}
              </p>
            </div>
            
            {/* Slide Media */}
            <div className="w-full flex justify-center py-2">
              {slide.mediaType === 'custom' ? (
                <CadPortfolio />
              ) : slide.mediaSrc ? (
                slide.mediaType === 'image' ? (
                  <img
                    src={slide.mediaSrc}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full h-auto object-contain rounded-2xl shadow-xl border-0"
                  />
                ) : (
                  <video
                    src={slide.mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-w-full h-auto object-contain rounded-2xl shadow-xl border-0"
                  />
                )
              ) : (
                <div className="w-full aspect-video rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-white/30 bg-white/5 p-8 text-center">
                  <Trophy className="w-8 h-8 mb-2 text-white/20" />
                  <span className="text-sm font-mono tracking-tight uppercase">Media Pending</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Desktop Scrollytelling Section (hidden lg:grid) */}
      <div className="hidden lg:grid grid-cols-12 gap-16 items-start mt-4">
        
        {/* Left Side: Scrolling Narrative Content */}
        <div className="lg:col-span-7 space-y-0">
          {slides.map((slide, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={slide.id}
                data-index={idx}
                onClick={() => scrollToSection(idx)}
                className="scrolly-text-block min-h-[65vh] flex flex-col justify-center py-24 cursor-pointer group/block transition-all duration-500 ease-out"
              >
                {/* Text Content block */}
                <div 
                  className={`space-y-6 transition-all duration-500 transform ${
                    isActive 
                      ? 'opacity-100 translate-x-0 scale-100' 
                      : 'opacity-20 -translate-x-2 scale-[0.98]'
                  }`}
                >
                  {/* High Impact Big Heading */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                    {slide.title}
                  </h3>

                  {/* Giant, premium typography paragraph */}
                  <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 leading-snug font-light tracking-tight">
                    {slide.paragraph}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Sticky Visual Container */}
        <div className="lg:col-span-5 w-full sticky top-28 z-20 h-[65vh] py-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Render slides media assets as absolute stack */}
            {slides.map((slide, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isActive 
                      ? 'opacity-100 scale-100 pointer-events-auto z-10' 
                      : 'opacity-0 scale-95 pointer-events-none z-0'
                  }`}
                >
                  {slide.mediaType === 'custom' ? (
                    <CadPortfolio />
                  ) : slide.mediaSrc ? (
                    slide.mediaType === 'image' ? (
                      <img
                        src={slide.mediaSrc}
                        alt={slide.title}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl shadow-xl border-0"
                      />
                    ) : (
                      <video
                        src={slide.mediaSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl shadow-xl border-0"
                      />
                    )
                  ) : (
                    <div className="w-full aspect-video rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-white/30 bg-white/5 p-8 text-center">
                      <Trophy className="w-8 h-8 mb-2 text-white/20" />
                      <span className="text-sm font-mono tracking-tight uppercase">Media Pending</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
