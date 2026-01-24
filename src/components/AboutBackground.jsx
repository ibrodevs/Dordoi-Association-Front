import React from 'react';

const AboutBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-slate-50 overflow-hidden">
      {/* Основной фоновый слой */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-blue-50/30 to-indigo-50/40"></div>
      
      {/* Динамические элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Большие плавающие сферы */}
        <div className="absolute -top-32 -right-32 w-80 h-80 opacity-50">
          <div className="relative w-full h-full animate-slow-float">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/12 to-indigo-700/8 rounded-full blur-3xl"></div>
            <div className="absolute top-8 left-8 w-64 h-64 bg-gradient-to-tr from-cyan-600/10 to-blue-600/6 rounded-full blur-2xl"></div>
            <div className="absolute top-16 left-16 w-48 h-48 bg-gradient-to-bl from-indigo-600/8 to-slate-600/4 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="absolute top-1/2 -left-24 w-64 h-64 opacity-40">
          <div className="relative w-full h-full animate-slow-pulse">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-600/6 rounded-full blur-2xl"></div>
            <div className="absolute top-6 left-6 w-52 h-52 bg-gradient-to-br from-indigo-600/8 to-blue-700/5 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 opacity-35">
          <div className="relative w-full h-full animate-slow-spin">
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/8 to-blue-500/5 rounded-full blur-xl"></div>
          </div>
        </div>
        
        {/* Профессиональная сетка */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-20 grid-rows-12 gap-8 h-full w-full p-6">
            {Array.from({length: 240}).map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 bg-blue-600/40 rounded-full"
                style={{
                  animationDelay: `${(i * 0.008)}s`,
                  animation: 'corporateTwinkle 8s infinite ease-in-out'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Динамические SVG линии */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="aboutGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(37, 99, 235, 0)">
                  <animate attributeName="stop-opacity" values="0;0.3;0" dur="6s" repeatCount="indefinite"/>
                </stop>
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)">
                  <animate attributeName="stop-opacity" values="0.2;0.4;0.2" dur="6s" repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)">
                  <animate attributeName="stop-opacity" values="0;0.25;0" dur="6s" repeatCount="indefinite"/>
                </stop>
              </linearGradient>
              
              <linearGradient id="aboutGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)">
                  <animate attributeName="stop-opacity" values="0;0.25;0" dur="8s" repeatCount="indefinite" begin="2s"/>
                </stop>
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.18)">
                  <animate attributeName="stop-opacity" values="0.18;0.35;0.18" dur="8s" repeatCount="indefinite" begin="2s"/>
                </stop>
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)">
                  <animate attributeName="stop-opacity" values="0;0.2;0" dur="8s" repeatCount="indefinite" begin="2s"/>
                </stop>
              </linearGradient>
              
              <filter id="aboutGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path d="M0,450 Q350,250 700,450 T1400,450" 
                  stroke="url(#aboutGrad1)" 
                  strokeWidth="2" 
                  fill="none" 
                  filter="url(#aboutGlow)">
              <animate attributeName="d" 
                       values="M0,450 Q350,250 700,450 T1400,450;M0,450 Q350,350 700,450 T1400,450;M0,450 Q350,250 700,450 T1400,450" 
                       dur="12s" 
                       repeatCount="indefinite"/>
            </path>
            
            <path d="M0,350 Q450,550 900,350 T1400,350" 
                  stroke="url(#aboutGrad2)" 
                  strokeWidth="1.5" 
                  fill="none" 
                  filter="url(#aboutGlow)">
              <animate attributeName="d" 
                       values="M0,350 Q450,550 900,350 T1400,350;M0,350 Q450,150 900,350 T1400,350;M0,350 Q450,550 900,350 T1400,350" 
                       dur="14s" 
                       repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        {/* Корпоративные геометрические элементы */}
        <div className="absolute top-1/5 right-1/4">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600/12 to-indigo-700/8 border border-blue-600/20 transform rotate-45 transition-all duration-1000 ease-out animate-slow-pulse">
              <div className="absolute inset-3 bg-gradient-to-tr from-blue-600/15 to-cyan-600/10 border border-blue-500/25"></div>
              <div className="absolute inset-6 bg-gradient-to-bl from-white/20 to-transparent"></div>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600/30 rounded-full animate-ping"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/5">
          <div className="relative">
            <div className="w-20 h-20 border-2 border-indigo-600/25 rounded-xl transform rotate-12 transition-all duration-700 animate-slow-float">
              <div className="w-full h-full bg-gradient-to-br from-indigo-600/12 to-blue-700/8 rounded-lg"></div>
              <div className="absolute inset-2 border border-indigo-500/20 rounded-md"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-2/3 right-1/3">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-600/12 to-blue-700/8 rounded-full border border-cyan-600/25 animate-slow-pulse" style={{animationDelay: '2s'}}>
              <div className="absolute inset-2 bg-gradient-to-tr from-cyan-600/18 to-blue-600/12 rounded-full"></div>
              <div className="absolute inset-4 bg-white/25 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Диагональные профессиональные линии */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/5 w-px h-full bg-gradient-to-b from-transparent via-blue-600/30 to-transparent transform rotate-8"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-600/25 to-transparent transform -rotate-6"></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-600/20 to-transparent transform rotate-4"></div>
        </div>
        
        {/* Корпоративные волны */}
        <div className="absolute bottom-0 left-0 right-0 h-40 opacity-60">
          <svg viewBox="0 0 1400 160" className="w-full h-full">
            <defs>
              <linearGradient id="aboutWave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(37, 99, 235, 0.12)"/>
                <stop offset="25%" stopColor="rgba(59, 130, 246, 0.18)"/>
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.15)"/>
                <stop offset="75%" stopColor="rgba(129, 140, 248, 0.20)"/>
                <stop offset="100%" stopColor="rgba(37, 99, 235, 0.12)"/>
              </linearGradient>
              <linearGradient id="aboutWave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.08)"/>
                <stop offset="33%" stopColor="rgba(59, 130, 246, 0.14)"/>
                <stop offset="66%" stopColor="rgba(37, 99, 235, 0.16)"/>
                <stop offset="100%" stopColor="rgba(129, 140, 248, 0.10)"/>
              </linearGradient>
            </defs>
            
            <path d="M0,80 Q200,40 400,80 T800,80 Q1000,60 1200,80 T1400,80 L1400,160 L0,160 Z" 
                  fill="url(#aboutWave1)">
              <animate attributeName="d" 
                       values="M0,80 Q200,40 400,80 T800,80 Q1000,60 1200,80 T1400,80 L1400,160 L0,160 Z;M0,80 Q200,100 400,80 T800,80 Q1000,120 1200,80 T1400,80 L1400,160 L0,160 Z;M0,80 Q200,40 400,80 T800,80 Q1000,60 1200,80 T1400,80 L1400,160 L0,160 Z" 
                       dur="16s" 
                       repeatCount="indefinite"/>
            </path>
            
            <path d="M0,120 Q300,80 600,120 T1400,120 L1400,160 L0,160 Z" 
                  fill="url(#aboutWave2)">
              <animate attributeName="d" 
                       values="M0,120 Q300,80 600,120 T1400,120 L1400,160 L0,160 Z;M0,120 Q300,140 600,120 T1400,120 L1400,160 L0,160 Z;M0,120 Q300,80 600,120 T1400,120 L1400,160 L0,160 Z" 
                       dur="20s" 
                       repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        {/* Профессиональные частицы */}
        <div className="absolute inset-0">
          {Array.from({length: 18}).map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-600/30 rounded-full animate-corporate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${18 + Math.random() * 12}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Содержимое */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* CSS анимации */}
      <style jsx>{`
        @keyframes corporateTwinkle {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1); 
          }
          25% { 
            opacity: 0.8; 
            transform: scale(1.3); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.6); 
          }
          75% { 
            opacity: 0.7; 
            transform: scale(1.2); 
          }
        }
        
        @keyframes slow-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(1deg); 
          }
          50% { 
            transform: translateY(-10px) translateX(-5px) rotate(-0.5deg); 
          }
          75% { 
            transform: translateY(15px) translateX(-8px) rotate(1.2deg); 
          }
        }
        
        @keyframes slow-spin {
          from { 
            transform: rotate(0deg); 
          }
          to { 
            transform: rotate(360deg); 
          }
        }
        
        @keyframes slow-pulse {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1); 
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.3);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05); 
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
          }
        }
        
        @keyframes corporate-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% { 
            transform: translateY(-80px) translateX(40px) scale(1.8) rotate(180deg);
            opacity: 0.9;
          }
        }
        
        .animate-slow-float {
          animation: slow-float 14s ease-in-out infinite;
        }
        
        .animate-slow-spin {
          animation: slow-spin 25s linear infinite;
        }
        
        .animate-slow-pulse {
          animation: slow-pulse 4s ease-in-out infinite;
        }
        
        .animate-corporate-particle {
          animation: corporate-particle 20s linear infinite;
        }
        
        /* Респонсивность */
        @media (max-width: 768px) {
          .grid-cols-20 {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }
        
        @media (max-width: 1024px) {
          .grid-cols-20 {
            grid-template-columns: repeat(16, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default AboutBackground;