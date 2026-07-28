/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export default function BackgroundGrid() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate metrics between 0.000 and 1.000
      const xNorm = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1);
      const yNorm = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
      setCoords({ x: xNorm, y: yNorm });
    };

    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base warm background */}
      <div className="absolute inset-0 bg-bone-light" id="bg-canvas-container" />
      
      {/* Major Technical Grid */}
      <div className="absolute inset-0 grid-lines opacity-75" />


    </div>
  );
}
