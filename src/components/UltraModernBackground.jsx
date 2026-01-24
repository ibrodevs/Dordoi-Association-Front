import React from 'react';

const UltraModernBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Основной градиентный слой */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-indigo-100/30"></div>
      
      {/* Динамические элементы */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Большие плавающие сферы */}
        <div className="absolute -top-48 -right-48 w-96 h-96 opacity-60">
          <div className="relative w-full h-full animate-slow-spin">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/12 to-indigo-600/8 rounded-full blur-3xl"></div>
            <div className="absolute top-12 left-12 w-72 h-72 bg-gradient-to-tr from-cyan-500/10 to-blue-500/6 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-24 left-24 w-48 h-48 bg-gradient-to-bl from-indigo-500/8 to-purple-500/4 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="absolute top-1/2 -left-32 w-80 h-80 opacity-50">
          <div className="relative w-full h-full animate-slow-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-cyan-500/6 rounded-full blur-2xl"></div>
            <div className="absolute top-8 left-8 w-64 h-64 bg-gradient-to-br from-indigo-500/8 to-blue-600/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-40">
          <div className="relative w-full h-full animate-slow-spin" style={{animationDirection: 'reverse', animationDelay: '3s'}}>
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/8 to-blue-500/5 rounded-full blur-xl"></div>
          </div>
        </div>
        
        {/* Динамические линии и волны */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="dynamicGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0)">
                  <animate attributeName="stop-opacity" values="0;0.2;0" dur="6s" repeatCount="indefinite"/>
                </stop>
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.15)">
                  <animate attributeName="stop-opacity" values="0.15;0.3;0.15" dur="6s" repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)">
                  <animate attributeName="stop-opacity" values="0;0.2;0" dur="6s" repeatCount="indefinite"/>
                </stop>
              </linearGradient>
              
              <linearGradient id="dynamicGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)">
                  <animate attributeName="stop-opacity" values="0;0.18;0" dur="8s" repeatCount="indefinite" begin="2s"/>
                </stop>
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.12)">
                  <animate attributeName="stop-opacity" values="0.12;0.25;0.12" dur="8s" repeatCount="indefinite" begin="2s"/>
                </stop>
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)">
                  <animate attributeName="stop-opacity" values="0;0.18;0" dur="8s" repeatCount="indefinite" begin="2s"/>
                </stop>
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path d="M0,450 Q350,250 700,450 T1400,450" 
                  stroke="url(#dynamicGradient1)" 
                  strokeWidth="3" 
                  fill="none" 
                  filter="url(#glow)">
              <animate attributeName="d" 
                       values="M0,450 Q350,250 700,450 T1400,450;M0,450 Q350,350 700,450 T1400,450;M0,450 Q350,250 700,450 T1400,450" 
                       dur="10s" 
                       repeatCount="indefinite"/>
            </path>
            
            <path d="M0,350 Q450,550 900,350 T1400,350" 
                  stroke="url(#dynamicGradient2)" 
                  strokeWidth="2" 
                  fill="none" 
                  filter="url(#glow)">
              <animate attributeName="d" 
                       values="M0,350 Q450,550 900,350 T1400,350;M0,350 Q450,150 900,350 T1400,350;M0,350 Q450,550 900,350 T1400,350" 
                       dur="12s" 
                       repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        {/* Интерактивные геометрические фигуры */}
        <div className="absolute top-1/5 right-1/4">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-600/8 border border-blue-500/20 transform rotate-45 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-90 animate-slow-pulse">
              <div className="absolute inset-3 bg-gradient-to-tr from-blue-500/15 to-cyan-500/10 rounded-sm"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600/20 rounded-full animate-ping"></div>
            </div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-br from-indigo-500/15 to-purple-500/10 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/5">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 border-2 border-indigo-500/25 rounded-lg transform rotate-12 transition-all duration-500 group-hover:rotate-45 group-hover:scale-105 animate-slow-float">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500/12 to-blue-500/8 rounded-md"></div>
              <div className="absolute inset-2 border border-indigo-400/20 rounded-sm animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-2/3 right-1/3">
          <div className="relative group">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/12 to-blue-500/8 rounded-full border border-cyan-500/25 transition-all duration-500 group-hover:scale-125 animate-slow-pulse">
              <div className="absolute inset-2 bg-gradient-to-tr from-cyan-500/18 to-blue-500/12 rounded-full"></div>
              <div className="absolute inset-4 bg-white/20 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Продвинутая интерактивная сетка */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-20 grid-rows-12 gap-8 h-full w-full p-8">
            {Array.from({length: 240}).map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 bg-blue-500/30 rounded-full transition-all duration-300 hover:bg-blue-500/60 hover:scale-150"
                style={{
                  animationDelay: `${(i * 0.008)}s`,
                  animation: 'advancedTwinkle 8s infinite ease-in-out'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Многослойные волны */}
        <div className="absolute bottom-0 left-0 right-0 h-48">
          <svg viewBox="0 0 1400 200" className="absolute bottom-0 w-full h-full opacity-40">
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)"/>
                <stop offset="25%" stopColor="rgba(37, 99, 235, 0.15)"/>
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.12)"/>
                <stop offset="75%" stopColor="rgba(59, 130, 246, 0.18)"/>
                <stop offset="100%" stopColor="rgba(37, 99, 235, 0.08)"/>
              </linearGradient>
              <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.06)"/>
                <stop offset="33%" stopColor="rgba(59, 130, 246, 0.12)"/>
                <stop offset="66%" stopColor="rgba(37, 99, 235, 0.15)"/>
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.08)"/>
              </linearGradient>
            </defs>
            
            <path d="M0,100 Q200,40 400,100 T800,100 Q1000,60 1200,100 T1400,100 L1400,200 L0,200 Z" 
                  fill="url(#waveGrad1)">
              <animate attributeName="d" 
                       values="M0,100 Q200,40 400,100 T800,100 Q1000,60 1200,100 T1400,100 L1400,200 L0,200 Z;M0,100 Q200,80 400,100 T800,100 Q1000,120 1200,100 T1400,100 L1400,200 L0,200 Z;M0,100 Q200,40 400,100 T800,100 Q1000,60 1200,100 T1400,100 L1400,200 L0,200 Z" 
                       dur="15s" 
                       repeatCount="indefinite"/>
            </path>
            
            <path d="M0,140 Q350,80 700,140 T1400,140 L1400,200 L0,200 Z" 
                  fill="url(#waveGrad2)">
              <animate attributeName="d" 
                       values="M0,140 Q350,80 700,140 T1400,140 L1400,200 L0,200 Z;M0,140 Q350,180 700,140 T1400,140 L1400,200 L0,200 Z;M0,140 Q350,80 700,140 T1400,140 L1400,200 L0,200 Z" 
                       dur="18s" 
                       repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        {/* Плавающие частицы */}
        <div className="absolute inset-0">
          {Array.from({length: 15}).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Содержимое */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Расширенные CSS анимации */}
      <style jsx>{`
        @keyframes advancedTwinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1) rotate(0deg); 
            filter: brightness(1);
          }
          25% { 
            opacity: 0.8; 
            transform: scale(1.5) rotate(90deg); 
            filter: brightness(1.5);
          }
          50% { 
            opacity: 1; 
            transform: scale(2) rotate(180deg); 
            filter: brightness(2);
          }
          75% { 
            opacity: 0.8; 
            transform: scale(1.5) rotate(270deg); 
            filter: brightness(1.5);
          }
        }
        
        @keyframes slow-float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(1deg); }
          50% { transform: translateY(-10px) translateX(-5px) rotate(-0.5deg); }
          75% { transform: translateY(15px) translateX(-10px) rotate(1.5deg); }
        }
        
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slow-pulse {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1); 
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05); 
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% { 
            transform: translateY(-100px) translateX(50px) scale(1.5);
            opacity: 0.8;
          }
        }
        
        .animate-slow-float {
          animation: slow-float 12s ease-in-out infinite;
        }
        
        .animate-slow-spin {
          animation: slow-spin 25s linear infinite;
        }
        
        .animate-slow-pulse {
          animation: slow-pulse 4s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 20s linear infinite;
        }
        
        /* Hover эффекты */
        .group:hover .animate-slow-pulse {
          animation-duration: 2s;
        }
        
        /* Респонсивность */
        @media (max-width: 768px) {
          .grid-cols-20 {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default UltraModernBackground;