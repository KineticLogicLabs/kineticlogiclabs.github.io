import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ScrollVideoScrubberProps {
  videoUrl: string; // Kept for signature compatibility
  onViewProjects: () => void;
  onViewAbout: () => void;
}

// Custom text cipher scrambling animation component
interface ScrambledTextProps {
  text: string;
  active: boolean;
}

const TALL_SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%@$#&!?";
const SHORT_SCRAMBLE = "abcdefghijklmnopqrstuvwxyz~_=-*";

function getScrambledString(text: string, currentStep: number, maxSteps: number): string {
  const scrambleProbability = Math.max(0, 0.40 - (currentStep / maxSteps) * 0.40);
  const lettersInWord = new Set(text.toLowerCase().split(''));

  return text
    .split('')
    .map((char) => {
      if (char === ' ') return ' ';
      if (Math.random() < scrambleProbability) {
        const isTall = /[A-Z0-9]/.test(char);
        const pool = isTall ? TALL_SCRAMBLE : SHORT_SCRAMBLE;
        
        // Filter out any character that is one of the actual letters in the word/text
        const filtered = pool.split('').filter(c => {
          const lowerC = c.toLowerCase();
          return !lettersInWord.has(lowerC);
        });
        const finalPool = filtered.length > 0 ? filtered : pool.split('').filter(c => c.toLowerCase() !== char.toLowerCase());
        const finalChar = finalPool[Math.floor(Math.random() * finalPool.length)];
        return finalChar;
      }
      return char;
    })
    .join('');
}

function ScrambledText({ text, active }: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [prevActive, setPrevActive] = useState(false);
  const [prevText, setPrevText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const maxSteps = 12; // Balanced steps (between 8 and 16) for a tiny bit shorter animation

  // Adjust state immediately during render to prevent single-frame flickering
  if (active !== prevActive) {
    setPrevActive(active);
    if (active) {
      setDisplayText(getScrambledString(text, 0, maxSteps));
    } else {
      setDisplayText('');
    }
  }

  if (text !== prevText) {
    setPrevText(text);
    if (active) {
      setDisplayText(getScrambledString(text, 0, maxSteps));
    }
  }

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let step = 1;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (step >= maxSteps) {
        setDisplayText(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }

      setDisplayText(getScrambledString(text, step, maxSteps));
      step++;
    }, 45); // Snappy interval speed for a slightly shorter total animation duration

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, active]);

  if (!active) {
    return null;
  }

  const words = text.split(' ');
  const currentChars = displayText.split('');
  let charGlobalIndex = 0;

  return (
    <span className="inline-flex flex-wrap justify-center">
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const renderedWord = (
          <span className="inline-block whitespace-nowrap">
            {wordChars.map((origChar) => {
              const currIndex = charGlobalIndex++;
              const currChar = currentChars[currIndex] || origChar;

              return (
                <span key={currIndex} className="relative inline-block overflow-visible">
                  {/* Invisible original character reserves exact width */}
                  <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
                    {origChar}
                  </span>
                  {/* Absolute scrambled character centered in that exact width */}
                  <span className="absolute inset-0 flex items-center justify-center text-center">
                    {currChar}
                  </span>
                </span>
              );
            })}
          </span>
        );

        // Add a space index in the global counter for the space after this word
        charGlobalIndex++;

        return (
          <span key={wordIdx} className="inline-block">
            {renderedWord}
            {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}

// Ten high-quality architectural, 3D modeling, code, and design images from Unsplash
const SCATTERED_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    className: 'absolute top-[8%] left-[6%] w-[16vw] min-w-[120px] max-w-[280px] aspect-[4/3] rounded-xl border border-white/10 shadow-2xl object-cover hover:scale-105 transition-transform duration-500',
    rotation: -6,
    speed: 0.18,
  },
  {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    className: 'absolute top-[5%] right-[8%] w-[22vw] min-w-[150px] max-w-[360px] aspect-square rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-105 transition-transform duration-500',
    rotation: 8,
    speed: -0.22,
  },
  {
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    className: 'absolute top-[38%] left-[3%] w-[15vw] min-w-[110px] max-w-[250px] aspect-[16/10] rounded-lg border border-white/10 shadow-2xl object-cover hover:scale-105 transition-transform duration-500',
    rotation: 12,
    speed: 0.08,
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    className: 'absolute top-[34%] right-[4%] w-[18vw] min-w-[130px] max-w-[300px] aspect-[4/3] rounded-xl border border-white/10 shadow-2xl object-cover hover:scale-105 transition-transform duration-500',
    rotation: -4,
    speed: -0.12,
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    className: 'absolute bottom-[12%] left-[10%] w-[19vw] min-w-[140px] max-w-[320px] aspect-[3/4] rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-105 transition-transform duration-500',
    rotation: -8,
    speed: -0.15,
  },
  {
    url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
    className: 'absolute bottom-[8%] right-[12%] w-[16vw] min-w-[120px] max-w-[280px] aspect-square rounded-xl border border-white/10 shadow-2xl object-cover hover:scale-105 transition-transform duration-500',
    rotation: 10,
    speed: 0.25,
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    className: 'absolute top-[20%] left-[26%] w-[13vw] min-w-[100px] max-w-[220px] aspect-video rounded-lg border border-white/10 shadow-2xl object-cover hover:scale-105 transition-transform duration-500',
    rotation: 3,
    speed: 0.12,
  },
  {
    url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=800&auto=format&fit=crop',
    className: 'absolute bottom-[28%] right-[25%] w-[15vw] min-w-[110px] max-w-[240px] aspect-video rounded-xl border border-white/10 shadow-2xl object-cover hover:scale-105 transition-transform duration-500',
    rotation: -10,
    speed: -0.08,
  },
];

export default function ScrollVideoScrubber({ 
  onViewProjects, 
  onViewAbout 
}: ScrollVideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideRef = useRef(0);
  const lastScrollTime = useRef(0);

  const slideProgresses = [0.0, 0.35, 0.58, 0.83];

  useEffect(() => {
    // Quickly transition from black screen on load
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    let animationFrameId: number;
    let targetProgress = 0;
    let lastProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const currentScroll = -rect.top;
      const currentProg = Math.max(0, Math.min(1, currentScroll / scrollHeight));
      targetProgress = currentProg;

      // Sync active slide index if scrolled externally/manually without fighting active lock
      if (Date.now() - lastScrollTime.current > 1000) {
        let closestSlide = 0;
        let minDiff = Infinity;
        slideProgresses.forEach((p, idx) => {
          const diff = Math.abs(p - currentProg);
          if (diff < minDiff) {
            minDiff = diff;
            closestSlide = idx;
          }
        });
        currentSlideRef.current = closestSlide;
        setCurrentSlide(closestSlide);
      }
    };

    const updateProgressLoop = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(updateProgressLoop);
        return;
      }

      const diff = targetProgress - lastProgress;
      if (Math.abs(diff) > 0.0001) {
        lastProgress += diff * 0.15; // Smooth interpolation
      } else {
        lastProgress = targetProgress;
      }

      setProgress(lastProgress);
      animationFrameId = requestAnimationFrame(updateProgressLoop);
    };

    const smoothScrollTo = (targetY: number, duration: number) => {
      const startY = window.scrollY;
      const difference = targetY - startY;
      const startTime = performance.now();

      const easeInOutQuad = (t: number) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const prog = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, startY + difference * easeInOutQuad(prog));

        if (prog < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      const currentScrollY = window.scrollY;
      const lastSlideThreshold = slideProgresses[3] * scrollHeight;

      // If at the beginning of the scrubber and scrolling up, allow normal browser behavior
      if (currentScrollY <= 10 && e.deltaY < 0 && currentSlideRef.current === 0) {
        return;
      }

      // If we are past the slideshow and scrolling down, allow normal scrolling to continue
      if (currentScrollY > lastSlideThreshold + 100 && e.deltaY > 0) {
        return;
      }

      // If we are on the last slide or past it and scrolling down, let normal scroll continue down
      if (currentSlideRef.current === 3 && e.deltaY > 0) {
        return;
      }

      // Inside scrubber (or near/above last slide threshold when scrolling up)
      if (currentScrollY < lastSlideThreshold + 100) {
        e.preventDefault();

        const now = Date.now();
        if (now - lastScrollTime.current < 900) {
          return; // Prevents "scrolling too hard" jumping ahead multiple slides
        }

        let nextSlide = currentSlideRef.current;
        if (e.deltaY > 0) {
          if (currentSlideRef.current < 3) {
            nextSlide = currentSlideRef.current + 1;
          }
        } else if (e.deltaY < 0) {
          if (currentSlideRef.current > 0) {
            nextSlide = currentSlideRef.current - 1;
          }
        }

        if (nextSlide !== currentSlideRef.current) {
          lastScrollTime.current = now;
          currentSlideRef.current = nextSlide;
          setCurrentSlide(nextSlide);

          const targetScrollY = slideProgresses[nextSlide] * scrollHeight;
          smoothScrollTo(targetScrollY, 750);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;

      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      const currentScrollY = window.scrollY;
      const lastSlideThreshold = slideProgresses[3] * scrollHeight;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY; // positive = scroll down, negative = scroll up

      // Let natural scrolling happen at the beginning
      if (currentScrollY <= 10 && deltaY < 0 && currentSlideRef.current === 0) {
        return;
      }

      // If we are past the slideshow and scrolling down, allow normal scrolling to continue
      if (currentScrollY > lastSlideThreshold + 100 && deltaY > 0) {
        return;
      }

      // If we are on the last slide or past it and scrolling down, let normal scroll continue down
      if (currentSlideRef.current === 3 && deltaY > 0) {
        return;
      }

      if (currentScrollY < lastSlideThreshold + 100) {
        // Only trigger on clear vertical swipe gestures
        if (Math.abs(deltaY) > 35) {
          e.preventDefault();

          const now = Date.now();
          if (now - lastScrollTime.current < 900) {
            return;
          }

          let nextSlide = currentSlideRef.current;
          if (deltaY > 0) {
            if (currentSlideRef.current < 3) {
              nextSlide = currentSlideRef.current + 1;
            }
          } else {
            if (currentSlideRef.current > 0) {
              nextSlide = currentSlideRef.current - 1;
            }
          }

          if (nextSlide !== currentSlideRef.current) {
            lastScrollTime.current = now;
            currentSlideRef.current = nextSlide;
            setCurrentSlide(nextSlide);

            const targetScrollY = slideProgresses[nextSlide] * scrollHeight;
            smoothScrollTo(targetScrollY, 750);
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(updateProgressLoop);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Initial trigger
    handleScroll();

    return () => {
      clearTimeout(loadTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Opacity interpolation helper
  const getOpacity = (p: number, start: number, solidStart: number, solidEnd: number, end: number) => {
    if (p < start || p > end) return 0;
    if (p >= solidStart && p <= solidEnd) return 1;
    if (p > start && p < solidStart) {
      return (p - start) / (solidStart - start);
    }
    if (p > solidEnd && p < end) {
      return 1 - (p - solidEnd) / (end - solidEnd);
    }
    return 0;
  };

  // Text state calculations
  // 1. "Welcome" Text (progress 0.0 -> 0.20)
  const welcomeOpacity = getOpacity(progress, -0.1, 0, 0.16, 0.24);

  // 2. "Learn..." prefix displays when progress is between 0.25 and 0.95
  const learnPrefixOpacity = getOpacity(progress, 0.22, 0.28, 0.92, 0.98);

  // 3. Dynamic changing phrases opacities
  // Phrase A: "3D modeling and design in Fusion" (progress 0.25 -> 0.46)
  const phraseAOpacity = getOpacity(progress, 0.22, 0.28, 0.43, 0.48);
  
  // Phrase B: "3D Printing & Digital Fabrication" (progress 0.48 -> 0.69)
  const phraseBOpacity = getOpacity(progress, 0.45, 0.51, 0.66, 0.71);
  
  // Phrase C: "And more" (progress 0.71 -> 0.92)
  const phraseCOpacity = getOpacity(progress, 0.68, 0.74, 0.91, 0.97);

  const isPhraseAActive = phraseAOpacity > 0.01;
  const isPhraseBActive = phraseBOpacity > 0.01;
  const isPhraseCActive = phraseCOpacity > 0.01;

  // Background images remain fully visible as the user scrolls to keep the background from darkening
  const backgroundOpacity = 1.0;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-bone-light" 
      style={{ height: '360vh' }}
      id="scroll-welcome-hero-container"
    >
      {/* 1. INITIAL LOADING BLACK SCREEN OVERLAY */}
      <div 
        className={`fixed inset-0 bg-bone-light z-50 pointer-events-none transition-opacity duration-1000 ease-out ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden z-20 bg-bone-light flex items-center justify-center">
        {/* Subtle vignette over the space */}
        <div className="absolute inset-0 bg-radial-vignette opacity-70 z-10 pointer-events-none" />

        {/* 2. SCATTERED BACKGROUND IMAGES */}
        <div 
          className="absolute inset-0 z-0 select-none pointer-events-none transition-all duration-700"
          style={{ 
            opacity: isLoaded ? backgroundOpacity : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(1.05)'
          }}
        >
          {SCATTERED_IMAGES.map((img, index) => {
            // Parallax shift calculation
            const yOffset = progress * img.speed * 180;
            // Clean hover classes from outer container
            const outerClassName = img.className
              .replace('hover:scale-105', '')
              .replace('transition-transform', '')
              .replace('duration-500', '')
              .trim();
            return (
              <div
                key={index}
                className={outerClassName}
                style={{
                  transform: `translateY(${yOffset}px)`,
                  willChange: 'transform',
                }}
              >
                <img
                  src={img.url}
                  alt="Scattered background geometric visualization"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[inherit] transition-transform duration-500 hover:scale-110"
                  style={{
                    transform: `rotate(${img.rotation}deg)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 3. DYNAMIC SCROLL TEXT ENGINE */}
        <div className="relative z-30 max-w-6xl w-full px-6 flex flex-col items-center justify-center text-center">
          {/* Soft darker backdrop mask directly behind the text to enhance legibility against background images */}
          <div className="absolute w-[98%] max-w-5xl h-[370px] md:h-[470px] rounded-full bg-black/82 blur-[80px] pointer-events-none -z-10 select-none" />
          
          {/* Welcome Phase */}
          <div 
            style={{ 
              opacity: welcomeOpacity, 
              transform: `scale(${1 + progress * 0.15}) translateY(${progress * -30}px)`,
              display: welcomeOpacity > 0.01 ? 'block' : 'none'
            }}
            className="absolute transition-transform duration-100 ease-out"
          >
            <h1 className="text-7xl md:text-[9.5rem] lg:text-[10.5rem] font-sans font-bold tracking-[-0.045em] text-white leading-none drop-shadow-lg selection:bg-white/30">
              Welcome
            </h1>
            <p className="mt-4 text-sm md:text-lg font-mono text-white tracking-widest uppercase opacity-80">
              Scroll to Explore
            </p>
          </div>

          {/* Explore... Phase Container */}
          <div 
            style={{ 
              opacity: learnPrefixOpacity,
              display: learnPrefixOpacity > 0.01 ? 'flex' : 'none'
            }}
            className="flex flex-col items-center justify-center space-y-3 md:space-y-6 w-full"
          >
            {/* Steady "Explore..." Anchor */}
            <span className="text-2xl md:text-4xl font-mono text-white/60 tracking-widest uppercase font-bold">
              Explore...
            </span>

            {/* Dynamic changing words container */}
            <div className="relative w-full h-[180px] md:h-[220px] flex items-center justify-center">
              
              {/* Phrase A: "Cool Projects" */}
              <div 
                style={{ 
                  opacity: phraseAOpacity,
                  transform: `translateY(${(1 - phraseAOpacity) * 20}px)`,
                  display: phraseAOpacity > 0.01 ? 'block' : 'none'
                }}
                className="absolute w-full px-4 transition-all duration-300 ease-out"
              >
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-[-0.045em] leading-tight drop-shadow-md">
                  <ScrambledText text="Cool Projects" active={isPhraseAActive} />
                </h2>
              </div>

              {/* Phrase B: "Websites" */}
              <div 
                style={{ 
                  opacity: phraseBOpacity,
                  transform: `translateY(${(1 - phraseBOpacity) * 20}px)`,
                  display: phraseBOpacity > 0.01 ? 'block' : 'none'
                }}
                className="absolute w-full px-4 transition-all duration-300 ease-out"
              >
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-[-0.045em] leading-tight drop-shadow-md">
                  <ScrambledText text="Websites" active={isPhraseBActive} />
                </h2>
              </div>

              {/* Phrase C: "And More" */}
              <div 
                style={{ 
                  opacity: phraseCOpacity,
                  transform: `translateY(${(1 - phraseCOpacity) * 20}px)`,
                  display: phraseCOpacity > 0.01 ? 'block' : 'none'
                }}
                className="absolute w-full px-4 transition-all duration-300 ease-out"
              >
                <h2 className="text-4xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-[-0.045em] leading-tight drop-shadow-md">
                  <ScrambledText text="And More" active={isPhraseCActive} />
                </h2>
                
                {/* Visual action buttons showing up during the last section to prompt further exploration */}
                <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
                  <button
                    onClick={onViewProjects}
                    className="px-5 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border bg-accent-blue text-bone-light border-accent-blue/40 hover:bg-opacity-90 shadow-lg pointer-events-auto"
                  >
                    View Projects
                  </button>
                  <button
                    onClick={onViewAbout}
                    className="px-5 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-white backdrop-blur-md bg-white/15 border border-white/20 hover:border-white/40 hover:bg-white/25 transition-all duration-300 pointer-events-auto"
                  >
                    About Us
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
