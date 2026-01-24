import React from 'react';

const PressBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Основной фоновый слой */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-slate-50/50 to-blue-50/40"></div>

      {/* Динамические элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Профессиональные геометрические элементы */}
        <div className="absolute top-1/4 left-1/5">
          <div className="relative group">
            <div className="w-32 h-20 bg-gradient-to-br from-slate-600/8 to-blue-700/6 border border-slate-600/20 transform rotate-2 transition-all duration-1000 ease-out">
              <div className="absolute inset-1 bg-gradient-to-tr from-slate-600/10 to-blue-600/8 border border-slate-500/15"></div>
              <div className="absolute inset-2 bg-white/30"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/4">
          <div className="relative">
            <div className="w-28 h-16 border-2 border-blue-600/20 rounded-sm transform -rotate-1 transition-all duration-700">
              <div className="w-full h-full bg-gradient-to-br from-blue-600/8 to-slate-700/6 rounded-sm"></div>
              <div className="absolute inset-1 border border-blue-500/15 rounded-sm"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-2/3 left-1/3">
          <div className="relative">
            <div className="w-24 h-12 bg-gradient-to-br from-slate-600/10 to-blue-700/8 rounded-sm border border-slate-600/25 transform rotate-1">
              <div className="absolute inset-1 bg-gradient-to-tr from-slate-600/15 to-blue-600/10 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Газетная сетка */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-24 grid-rows-16 gap-6 h-full w-full p-8">
            {Array.from({length: 384}).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-slate-600/40 rounded-full"
                style={{
                  animationDelay: `${(i * 0.005)}s`,
                  animation: 'pressTwinkle 12s infinite ease-in-out'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Медиа элементы */}
        <div className="absolute top-1/6 right-1/6">
          <div className="relative">
            <svg className="w-16 h-16 text-slate-600/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/6">
          <div className="relative">
            <svg className="w-14 h-14 text-blue-600/15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Типографские линии */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"></div>
          <div className="absolute top-2/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent"></div>
          <div className="absolute top-3/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600/25 to-transparent"></div>
          <div className="absolute top-4/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/15 to-transparent"></div>
        </div>

        {/* Вертикальные линии */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/6 w-px h-full bg-gradient-to-b from-transparent via-slate-600/20 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-600/15 to-transparent"></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-slate-600/25 to-transparent"></div>
        </div>

        {/* Профессиональные частицы */}
        <div className="absolute inset-0">
          {Array.from({length: 15}).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-slate-600/25 rounded-full animate-press-particle"
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

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes pressTwinkle {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        @keyframes press-particle {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-60px) translateX(30px) scale(1.5) rotate(180deg);
            opacity: 0.6;
          }
        }

        .animate-press-particle {
          animation: press-particle 18s linear infinite;
        }

        /* Респонсивность */
        @media (max-width: 768px) {
          .grid-cols-24 {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }

        @media (max-width: 1024px) {
          .grid-cols-24 {
            grid-template-columns: repeat(18, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default PressBackground;