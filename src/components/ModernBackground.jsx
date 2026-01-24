import React from 'react';

const ModernBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Основной градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20"></div>
      
      {/* Геометрические элементы */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Большой круг сверху справа */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Средний круг слева */}
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-gradient-to-tr from-blue-400/8 to-blue-500/4 rounded-full blur-2xl"></div>
        
        {/* Маленькие декоративные элементы */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-blue-600/5 rounded-full blur-lg animate-pulse" style={{animationDuration: '4s'}}></div>
        
        {/* Диагональные линии */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent transform rotate-12"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400/8 to-transparent transform -rotate-12"></div>
        
        {/* Сетка точек */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-12 grid-rows-12 gap-8 h-full w-full p-8">
            {Array.from({length: 144}).map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 bg-blue-500/20 rounded-full"
                style={{
                  animationDelay: `${i * 0.02}s`,
                  animation: 'twinkle 4s infinite ease-in-out'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Волновые элементы */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-50">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path 
              d="M0,60 Q300,10 600,60 T1200,60 L1200,120 L0,120 Z" 
              fill="url(#blueGradient)"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.15)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Плавающие квадраты */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-500/5 border border-blue-500/10 transform rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600/5 border border-blue-600/10 transform rotate-45 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
          </div>
        </div>
      </div>
      
      {/* Содержимое страницы */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* CSS анимации */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ModernBackground;