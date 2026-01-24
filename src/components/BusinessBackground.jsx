import React from 'react';

const BusinessBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Основной фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-slate-100/60"></div>
      
      {/* Геометрические элементы */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Большие декоративные круги */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/8 to-blue-500/4 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-500/6 to-indigo-500/3 rounded-full blur-xl"></div>
        
        {/* Диагональные полосы */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent transform rotate-12 opacity-50"></div>
          <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400/15 to-transparent transform -rotate-12 opacity-50"></div>
        </div>
        
        {/* Современные геометрические фигуры */}
        <div className="absolute top-1/4 right-1/4">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-500/5 border-l-4 border-blue-500/20 transform rotate-45"></div>
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-600/10 rounded-full"></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/4">
          <div className="w-16 h-16 border-2 border-blue-500/15 transform rotate-45">
            <div className="w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent"></div>
          </div>
        </div>
        
        {/* Тонкие линии сетки */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 gap-16 h-full w-full p-8">
            {Array.from({length: 48}).map((_, i) => (
              <div 
                key={i} 
                className="w-0.5 h-0.5 bg-blue-500/30 rounded-full"
              ></div>
            ))}
          </div>
        </div>
        
        {/* Волновой элемент снизу */}
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-40">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path 
              d="M0,80 Q400,20 800,80 T1200,80 L1200,120 L0,120 Z" 
              fill="url(#professionalGradient)"
            />
            <defs>
              <linearGradient id="professionalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.12)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Плавающий элемент в центре */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60">
          <div className="relative">
            <div className="w-32 h-32 border border-blue-500/10 transform rotate-45 animate-pulse">
              <div className="absolute inset-4 bg-gradient-to-br from-blue-500/5 to-transparent rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Содержимое */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BusinessBackground;