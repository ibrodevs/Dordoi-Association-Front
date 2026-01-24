import React from 'react';

const CreativeBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Основной градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40"></div>
      
      {/* Креативные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Большие абстрактные формы */}
        <div className="absolute -top-32 -right-32 w-96 h-96">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-8 left-8 w-80 h-80 bg-gradient-to-br from-indigo-500/8 to-blue-500/4 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        <div className="absolute top-1/3 -left-24 w-80 h-80">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/8 to-cyan-500/4 rounded-full blur-2xl"></div>
            <div className="absolute top-4 left-4 w-64 h-64 bg-gradient-to-tr from-blue-500/6 to-indigo-500/3 transform rotate-12 rounded-full blur-xl"></div>
          </div>
        </div>
        
        {/* Динамические линии */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.15)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.12)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
              </linearGradient>
            </defs>
            
            <path d="M0,400 Q300,200 600,400 T1200,400" stroke="url(#lineGradient1)" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M0,300 Q400,500 800,300 T1200,300" stroke="url(#lineGradient2)" strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>
        </div>
        
        {/* Плавающие геометрические фигуры */}
        <div className="absolute top-1/4 right-1/5">
          <div className="relative animate-float">
            <div className="w-20 h-20 bg-blue-500/8 border border-blue-500/20 transform rotate-45">
              <div className="absolute inset-2 bg-gradient-to-br from-blue-500/10 to-transparent rounded-sm"></div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600/15 rounded-full animate-ping"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/5">
          <div className="relative animate-float" style={{animationDelay: '2s'}}>
            <div className="w-16 h-16 border-2 border-indigo-500/20 rounded-lg transform rotate-12">
              <div className="w-full h-full bg-gradient-to-tr from-indigo-500/8 to-blue-500/4 rounded-md"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-2/3 right-1/3">
          <div className="relative animate-float" style={{animationDelay: '4s'}}>
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <div className="absolute inset-1 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Интерактивная сетка точек */}
        <div className="absolute inset-0 opacity-40">
          <div className="grid grid-cols-16 grid-rows-10 gap-12 h-full w-full p-8">
            {Array.from({length: 160}).map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 bg-blue-500/25 rounded-full hover:bg-blue-500/50 transition-colors duration-300"
                style={{
                  animationDelay: `${i * 0.01}s`,
                  animation: 'twinkle 6s infinite ease-in-out'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Декоративные волны */}
        <div className="absolute bottom-0 left-0 right-0 h-40 opacity-50">
          <svg viewBox="0 0 1200 160" className="w-full h-full">
            <path 
              d="M0,80 Q200,20 400,80 T800,80 Q1000,40 1200,80 L1200,160 L0,160 Z" 
              fill="url(#waveGradient)"
            />
            <path 
              d="M0,120 Q300,60 600,120 T1200,120 L1200,160 L0,160 Z" 
              fill="url(#waveGradient2)"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.15)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0.08)" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.06)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.12)" />
                <stop offset="100%" stopColor="rgba(37, 99, 235, 0.06)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Содержимое */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Анимации */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(8px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CreativeBackground;