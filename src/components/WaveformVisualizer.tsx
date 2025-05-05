import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  darkMode: boolean;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const barCount = 32;
    const bars: HTMLDivElement[] = [];
    
    // Create bars
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = `waveform-bar ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`;
      bar.style.height = '3px';
      bar.style.width = '3px';
      bar.style.margin = '0 2px';
      bar.style.borderRadius = '1px';
      bar.style.transition = 'height 0.1s ease';
      container.appendChild(bar);
      bars.push(bar);
    }
    
    // Animate bars
    const animate = () => {
      bars.forEach(bar => {
        const height = Math.floor(Math.random() * 30) + 3;
        bar.style.height = `${height}px`;
      });
    };
    
    const interval = setInterval(animate, 100);
    
    return () => {
      clearInterval(interval);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [darkMode]);
  
  return (
    <div 
      ref={containerRef} 
      className="flex items-center justify-center h-10"
      style={{ minWidth: '200px' }}
    ></div>
  );
};

export default WaveformVisualizer;