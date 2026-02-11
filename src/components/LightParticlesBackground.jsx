import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const LightParticlesBackground = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const shouldAnimate = !prefersReducedMotion && !isMobile;

  // Generate stable random particles - reduced quantity for minimalism
  const particles = React.useMemo(() => {
    const count = shouldAnimate ? 14 : 6;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4, // Smaller: 4-10px
      duration: Math.random() * 15 + 20, // 20-35s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.2, // More subtle: 0.2-0.5
      blur: Math.random() * 4 + 2,
      color: ['#3b82f6', '#0ea5e9', '#6366f1'][Math.floor(Math.random() * 3)] // Solid colors
    }));
  }, [shouldAnimate]);

  // Subtle gradient particles
  const gradientParticles = React.useMemo(() => {
    const count = shouldAnimate ? 6 : 3;
    return Array.from({ length: count }).map((_, i) => ({
      id: `grad-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 80, // 80-200px
      opacity: Math.random() * 0.08 + 0.04, // Very subtle
      gradient: i % 3 === 0 
        ? 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
        : i % 3 === 1
        ? 'radial-gradient(circle, #6366f1 0%, transparent 70%)'
        : 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
    }));
  }, [shouldAnimate]);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Ultra subtle gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 z-0 pointer-events-none" />
      
      {/* Minimal grid with reduced visibility */}
      <div 
        className="absolute inset-0 opacity-[0.12] z-0 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(90deg, #94a3b8 0.5px, transparent 0.5px), linear-gradient(#94a3b8 0.5px, transparent 0.5px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Subtle noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Particles Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient blobs */}
        {gradientParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.gradient,
              opacity: particle.opacity,
              filter: shouldAnimate ? 'blur(20px)' : 'none',
              transform: 'translate3d(0,0,0)'
            }}
          />
        ))}
        
        {/* Minimal floating particles */}
        {particles.map((particle) => (
          shouldAnimate ? (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                filter: `blur(${particle.blur}px)`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay
              }}
            />
          ) : (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.opacity,
              }}
            />
          )
        ))}

        {/* Minimal animated shapes - fewer and more subtle */}
        {shouldAnimate ? (
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-[60px]"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ) : (
          <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full" />
        )}
        
        {shouldAnimate ? (
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-gradient-to-r from-sky-100/10 to-blue-100/10 rounded-full blur-[60px]"
            animate={{
              scale: [1, 1.15, 1],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        ) : (
          <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-gradient-to-r from-sky-100/10 to-blue-100/10 rounded-full" />
        )}

        {/* Subtle light beams */}
        <div className="absolute inset-0 overflow-hidden">
          {shouldAnimate ? (
            <motion.div 
              className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-200/20 to-transparent"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ) : (
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-200/20 to-transparent" />
          )}
          {shouldAnimate ? (
            <motion.div 
              className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-200/20 to-transparent"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          ) : (
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-indigo-200/20 to-transparent" />
          )}
        </div>
      </div>

      {/* Content with subtle backdrop blur */}
      <div className={`relative z-10 w-full h-full ${shouldAnimate ? 'backdrop-blur-[0.5px]' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default LightParticlesBackground;