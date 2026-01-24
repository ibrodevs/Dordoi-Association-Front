import React from 'react';

const PremiumCorporateBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Основной профессиональный градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/80 to-blue-200/60"></div>
      
      {/* Дополнительный слой для усиления видимости */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/30 to-indigo-100/40"></div>
      
      {/* Премиум элементы */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Элегантные плавающие формы */}
        <div className="absolute -top-64 -right-64 w-128 h-128 opacity-60">
          <div className="relative w-full h-full animate-premium-rotate">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 to-indigo-700/12 rounded-full blur-3xl"></div>
            <div className="absolute top-16 left-16 w-96 h-96 bg-gradient-to-tr from-cyan-600/12 to-blue-600/8 rounded-full blur-2xl"></div>
            <div className="absolute top-32 left-32 w-64 h-64 bg-gradient-to-bl from-indigo-600/10 to-slate-600/6 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="absolute top-1/3 -left-48 w-96 h-96 opacity-55">
          <div className="relative w-full h-full animate-premium-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 to-cyan-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-12 left-12 w-72 h-72 bg-gradient-to-br from-indigo-600/12 to-blue-700/8 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        {/* Профессиональная сетка */}
        <div className="absolute inset-0 opacity-35">
          <div className="grid grid-cols-24 grid-rows-16 gap-6 h-full w-full p-4">
            {Array.from({length: 384}).map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 bg-blue-600/60 rounded-full"
                style={{
                  animationDelay: `${(i * 0.005)}s`,
                  animation: 'professionalPulse 12s infinite ease-in-out',
                  opacity: Math.random() > 0.7 ? 1 : 0.5
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Динамические профессиональные линии */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="premiumGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(37, 99, 235, 0)">
                  <animate attributeName="stop-opacity" values="0;0.4;0" dur="8s" repeatCount="indefinite"/>
                </stop>
                <stop offset="30%" stopColor="rgba(59, 130, 246, 0.25)">
                  <animate attributeName="stop-opacity" values="0.25;0.5;0.25" dur="8s" repeatCount="indefinite"/>
                </stop>
                <stop offset="70%" stopColor="rgba(99, 102, 241, 0.22)">
                  <animate attributeName="stop-opacity" values="0.22;0.45;0.22" dur="8s" repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor="rgba(129, 140, 248, 0)">
                  <animate attributeName="stop-opacity" values="0;0.35;0" dur="8s" repeatCount="indefinite"/>
                </stop>
              </linearGradient>
              
              <linearGradient id="premiumGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)">
                  <animate attributeName="stop-opacity" values="0;0.35;0" dur="10s" repeatCount="indefinite" begin="3s"/>
                </stop>
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.25)">
                  <animate attributeName="stop-opacity" values="0.25;0.5;0.25" dur="10s" repeatCount="indefinite" begin="3s"/>
                </stop>
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)">
                  <animate attributeName="stop-opacity" values="0;0.3;0" dur="10s" repeatCount="indefinite" begin="3s"/>
                </stop>
              </linearGradient>
              
              <filter id="premiumGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path d="M0,500 Q400,300 800,500 T1600,500" 
                  stroke="url(#premiumGrad1)" 
                  strokeWidth="2.5" 
                  fill="none" 
                  filter="url(#premiumGlow)">
              <animate attributeName="d" 
                       values="M0,500 Q400,300 800,500 T1600,500;M0,500 Q400,400 800,500 T1600,500;M0,500 Q400,300 800,500 T1600,500" 
                       dur="14s" 
                       repeatCount="indefinite"/>
            </path>
            
            <path d="M0,400 Q500,600 1000,400 T1600,400" 
                  stroke="url(#premiumGrad2)" 
                  strokeWidth="2" 
                  fill="none" 
                  filter="url(#premiumGlow)">
              <animate attributeName="d" 
                       values="M0,400 Q500,600 1000,400 T1600,400;M0,400 Q500,200 1000,400 T1600,400;M0,400 Q500,600 1000,400 T1600,400" 
                       dur="16s" 
                       repeatCount="indefinite"/>
            </path>
            
            <path d="M0,300 Q300,100 600,300 Q900,500 1200,300 T1600,300" 
                  stroke="url(#premiumGrad1)" 
                  strokeWidth="1.5" 
                  fill="none" 
                  opacity="0.6">
              <animate attributeName="d" 
                       values="M0,300 Q300,100 600,300 Q900,500 1200,300 T1600,300;M0,300 Q300,500 600,300 Q900,100 1200,300 T1600,300;M0,300 Q300,100 600,300 Q900,500 1200,300 T1600,300" 
                       dur="18s" 
                       repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        {/* Элегантные геометрические элементы */}
        <div className="absolute top-1/6 right-1/5">
          <div className="relative group">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600/15 to-indigo-700/12 border border-blue-600/25 transform rotate-45 transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-90 animate-premium-pulse">
              <div className="absolute inset-4 bg-gradient-to-tr from-blue-600/20 to-cyan-600/15 border border-blue-500/30"></div>
              <div className="absolute inset-8 bg-gradient-to-bl from-white/20 to-transparent"></div>
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-600/40 rounded-full animate-ping"></div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-indigo-600/25 to-purple-600/18 border border-indigo-500/35 rounded-lg animate-bounce" style={{animationDuration: '4s'}}></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/6">
          <div className="relative group">
            <div className="w-28 h-28 border-3 border-indigo-600/35 rounded-2xl transform rotate-12 transition-all duration-700 group-hover:rotate-45 group-hover:scale-105 animate-premium-float">
              <div className="w-full h-full bg-gradient-to-br from-indigo-600/18 to-blue-700/15 rounded-xl"></div>
              <div className="absolute inset-3 border-2 border-indigo-500/25 rounded-lg"></div>
              <div className="absolute inset-6 bg-gradient-to-tr from-white/25 to-transparent rounded-md"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-3/5 right-1/3">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-600/18 to-blue-700/15 rounded-full border-2 border-cyan-600/35 transition-all duration-500 group-hover:scale-125 animate-premium-pulse" style={{animationDelay: '2s'}}>
              <div className="absolute inset-3 bg-gradient-to-tr from-cyan-600/25 to-blue-600/20 rounded-full"></div>
              <div className="absolute inset-6 bg-white/30 rounded-full"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-blue-600/35 to-transparent rounded-full animate-ping" style={{animationDuration: '6s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Премиум диагональные элементы */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-1/5 w-px h-full bg-gradient-to-b from-transparent via-blue-600/40 to-transparent transform rotate-12"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-600/35 to-transparent transform -rotate-12"></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-600/30 to-transparent transform rotate-6"></div>
        </div>
        
        {/* Многослойные премиум волны */}
        <div className="absolute bottom-0 left-0 right-0 h-56">
          <svg viewBox="0 0 1600 240" className="absolute bottom-0 w-full h-full opacity-70">
            <defs>
              <linearGradient id="premiumWave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(37, 99, 235, 0.15)"/>
                <stop offset="20%" stopColor="rgba(59, 130, 246, 0.25)"/>
                <stop offset="40%" stopColor="rgba(99, 102, 241, 0.22)"/>
                <stop offset="60%" stopColor="rgba(129, 140, 248, 0.28)"/>
                <stop offset="80%" stopColor="rgba(59, 130, 246, 0.24)"/>
                <stop offset="100%" stopColor="rgba(37, 99, 235, 0.15)"/>
              </linearGradient>
              <linearGradient id="premiumWave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.12)"/>
                <stop offset="25%" stopColor="rgba(59, 130, 246, 0.20)"/>
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.25)"/>
                <stop offset="75%" stopColor="rgba(129, 140, 248, 0.18)"/>
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0.15)"/>
              </linearGradient>
              <linearGradient id="premiumWave3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(129, 140, 248, 0.08)"/>
                <stop offset="33%" stopColor="rgba(99, 102, 241, 0.15)"/>
                <stop offset="66%" stopColor="rgba(59, 130, 246, 0.18)"/>
                <stop offset="100%" stopColor="rgba(37, 99, 235, 0.12)"/>
              </linearGradient>
            </defs>
            
            <path d="M0,120 Q200,60 400,120 T800,120 Q1000,80 1200,120 T1600,120 L1600,240 L0,240 Z" 
                  fill="url(#premiumWave1)">
              <animate attributeName="d" 
                       values="M0,120 Q200,60 400,120 T800,120 Q1000,80 1200,120 T1600,120 L1600,240 L0,240 Z;M0,120 Q200,100 400,120 T800,120 Q1000,140 1200,120 T1600,120 L1600,240 L0,240 Z;M0,120 Q200,60 400,120 T800,120 Q1000,80 1200,120 T1600,120 L1600,240 L0,240 Z" 
                       dur="20s" 
                       repeatCount="indefinite"/>
            </path>
            
            <path d="M0,160 Q400,100 800,160 T1600,160 L1600,240 L0,240 Z" 
                  fill="url(#premiumWave2)">
              <animate attributeName="d" 
                       values="M0,160 Q400,100 800,160 T1600,160 L1600,240 L0,240 Z;M0,160 Q400,200 800,160 T1600,160 L1600,240 L0,240 Z;M0,160 Q400,100 800,160 T1600,160 L1600,240 L0,240 Z" 
                       dur="24s" 
                       repeatCount="indefinite"/>
            </path>
            
            <path d="M0,200 Q300,140 600,200 T1200,200 T1600,200 L1600,240 L0,240 Z" 
                  fill="url(#premiumWave3)">
              <animate attributeName="d" 
                       values="M0,200 Q300,140 600,200 T1200,200 T1600,200 L1600,240 L0,240 Z;M0,200 Q300,220 600,200 T1200,200 T1600,200 L1600,240 L0,240 Z;M0,200 Q300,140 600,200 T1200,200 T1600,200 L1600,240 L0,240 Z" 
                       dur="28s" 
                       repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        {/* Премиум частицы */}
        <div className="absolute inset-0">
          {Array.from({length: 25}).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-600/40 rounded-full animate-premium-particle shadow-lg shadow-blue-500/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${20 + Math.random() * 15}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Содержимое */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Премиум CSS анимации */}
      <style jsx>{`
        @keyframes professionalPulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          20% { 
            opacity: 0.7; 
            transform: scale(1.3); 
          }
          40% { 
            opacity: 1; 
            transform: scale(1.8); 
          }
          60% { 
            opacity: 0.8; 
            transform: scale(1.5); 
          }
          80% { 
            opacity: 0.5; 
            transform: scale(1.2); 
          }
        }
        
        @keyframes premium-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-25px) translateX(15px) rotate(1deg) scale(1.02); 
          }
          50% { 
            transform: translateY(-15px) translateX(-10px) rotate(-0.5deg) scale(1.05); 
          }
          75% { 
            transform: translateY(20px) translateX(-15px) rotate(1.5deg) scale(1.03); 
          }
        }
        
        @keyframes premium-rotate {
          from { 
            transform: rotate(0deg) scale(1); 
          }
          to { 
            transform: rotate(360deg) scale(1.02); 
          }
        }
        
        @keyframes premium-pulse {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1); 
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.3);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.08); 
            box-shadow: 0 0 0 15px rgba(37, 99, 235, 0);
          }
        }
        
        @keyframes premium-particle {
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
            transform: translateY(-120px) translateX(60px) scale(2) rotate(180deg);
            opacity: 0.9;
          }
        }
        
        .animate-premium-float {
          animation: premium-float 16s ease-in-out infinite;
        }
        
        .animate-premium-rotate {
          animation: premium-rotate 30s linear infinite;
        }
        
        .animate-premium-pulse {
          animation: premium-pulse 5s ease-in-out infinite;
        }
        
        .animate-premium-particle {
          animation: premium-particle 25s linear infinite;
        }
        
        .w-128 { width: 32rem; }
        .h-128 { height: 32rem; }
        .border-3 { border-width: 3px; }
        
        /* Премиум hover эффекты */
        .group:hover .animate-premium-pulse {
          animation-duration: 2.5s;
        }
        
        .group:hover .animate-premium-float {
          animation-duration: 8s;
        }
        
        /* Респонсивность */
        @media (max-width: 1024px) {
          .grid-cols-24 {
            grid-template-columns: repeat(16, minmax(0, 1fr));
          }
        }
        
        @media (max-width: 768px) {
          .grid-cols-24 {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumCorporateBackground;