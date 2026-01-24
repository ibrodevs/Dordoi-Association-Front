import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AboutBackground from '../../AboutBackground';

const AboutMission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t } = useTranslation();
  const [expandedCard, setExpandedCard] = useState(null);

  // Расширенные данные о ценностях с дополнительной информацией
  const values = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: t('missionAbout.values.0.title'),
      description: t('missionAbout.values.0.description'),
      detailed: t('missionAbout.values.0.detailed'),
      color: "blue",
      stats: t('missionAbout.values.0.stats'),
      features: t('missionAbout.values.0.features', { returnObjects: true })
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t('missionAbout.values.1.title'),
      description: t('missionAbout.values.1.description'),
      detailed: t('missionAbout.values.1.detailed'),
      color: "purple",
      stats: t('missionAbout.values.1.stats'),
      features: t('missionAbout.values.1.features', { returnObjects: true })
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t('missionAbout.values.2.title'),
      description: t('missionAbout.values.2.description'),
      detailed: t('missionAbout.values.2.detailed'),
      color: "green",
      stats: t('missionAbout.values.2.stats'),
      features: t('missionAbout.values.2.features', { returnObjects: true })
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('missionAbout.values.3.title'),
      description: t('missionAbout.values.3.description'),
      detailed: t('missionAbout.values.3.detailed'),
      color: "orange",
      stats: t('missionAbout.values.3.stats'),
      features: t('missionAbout.values.3.features', { returnObjects: true })
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: t('missionAbout.values.4.title'),
      description: t('missionAbout.values.4.description'),
      detailed: t('missionAbout.values.4.detailed'),
      color: "cyan",
      stats: t('missionAbout.values.4.stats'),
      features: t('missionAbout.values.4.features', { returnObjects: true })
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t('missionAbout.values.5.title'),
      description: t('missionAbout.values.5.description'),
      detailed: t('missionAbout.values.5.detailed'),
      color: "indigo",
      stats: t('missionAbout.values.5.stats'),
      features: t('missionAbout.values.5.features', { returnObjects: true })
    }
  ];

  const colorMap = {
    blue: { 
      light: 'bg-blue-50', 
      medium: 'bg-blue-100', 
      dark: 'bg-blue-500', 
      text: 'text-blue-600', 
      border: 'border-blue-200',
      gradient: 'from-blue-400 to-blue-600',
      hover: 'hover:from-blue-500 hover:to-blue-700'
    },
    purple: { 
      light: 'bg-purple-50', 
      medium: 'bg-purple-100', 
      dark: 'bg-purple-500', 
      text: 'text-purple-600', 
      border: 'border-purple-200',
      gradient: 'from-purple-400 to-purple-600',
      hover: 'hover:from-purple-500 hover:to-purple-700'
    },
    green: { 
      light: 'bg-green-50', 
      medium: 'bg-green-100', 
      dark: 'bg-green-500', 
      text: 'text-green-600', 
      border: 'border-green-200',
      gradient: 'from-green-400 to-green-600',
      hover: 'hover:from-green-500 hover:to-green-700'
    },
    orange: { 
      light: 'bg-orange-50', 
      medium: 'bg-orange-100', 
      dark: 'bg-orange-500', 
      text: 'text-orange-600', 
      border: 'border-orange-200',
      gradient: 'from-orange-400 to-orange-600',
      hover: 'hover:from-orange-500 hover:to-orange-700'
    },
    cyan: { 
      light: 'bg-cyan-50', 
      medium: 'bg-cyan-100', 
      dark: 'bg-cyan-500', 
      text: 'text-cyan-600', 
      border: 'border-cyan-200',
      gradient: 'from-cyan-400 to-cyan-600',
      hover: 'hover:from-cyan-500 hover:to-cyan-700'
    },
    indigo: { 
      light: 'bg-indigo-50', 
      medium: 'bg-indigo-100', 
      dark: 'bg-indigo-500', 
      text: 'text-indigo-600', 
      border: 'border-indigo-200',
      gradient: 'from-indigo-400 to-indigo-600',
      hover: 'hover:from-indigo-500 hover:to-indigo-700'
    }
  };

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 30 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    expanded: {
      scale: 1.02,
      transition: {
        duration: 0.4
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Обработчики для карточек
  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <AboutBackground>
      <section ref={ref} className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Улучшенные фоновые элементы */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 left-10 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl sm:blur-4xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-10 right-10 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-300 to-green-300 rounded-full blur-3xl sm:blur-4xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute top-1/2 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-green-300 to-purple-300 rounded-full blur-3xl sm:blur-4xl"
        />
        
        {/* Анимированные частицы */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: i * 0.5 }}
            className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции с улучшенной анимацией */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 mb-6 sm:mb-8 shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-blue-600 text-sm sm:text-base font-semibold">
              {t('missionAbout.badge')}
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 sm:mb-8"
          >
            {t('missionAbout.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              {t('missionAbout.titleHighlight')}
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            {t('missionAbout.subtitle')}
          </motion.p>
        </motion.div>

        {/* Основная миссия с улучшенным дизайном */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.div
            variants={cardVariants}
            className="relative group cursor-pointer"
            whileHover="hover"
          >
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl hover:shadow-3xl transition-all duration-500 max-w-5xl mx-auto overflow-hidden">
              {/* Декоративный фон */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-200 rounded-full translate-y-32 -translate-x-32"></div>
              </div>
              
              <div className="relative flex flex-col lg:flex-row items-center text-center lg:text-left">
                <motion.div 
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 lg:mb-0 lg:mr-8 shadow-xl flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {t('missionAbout.missionTitle')}
                  </h3>
                  <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed mb-6">
                    {t('missionAbout.missionStatement')}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    {t('missionAbout.missionHighlights', { returnObjects: true }).map((highlight, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Анимированные декоративные элементы */}
              <motion.div 
                className="absolute top-6 right-6 w-3 h-16 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-6 left-6 w-3 h-16 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Карточки ценностей с расширенной функциональностью */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 lg:mb-24"
        >
          {values.map((value, index) => {
            const colors = colorMap[value.color];
            const isExpanded = expandedCard === index;
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                className="group cursor-pointer"
                whileHover="hover"
                animate={isExpanded ? "expanded" : "visible"}
                onClick={() => handleCardClick(index)}
              >
                <div className={`relative h-full rounded-2xl p-6 sm:p-8 border-2 ${colors.border} ${colors.light} hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                  {/* Фоновый градиент при ховере */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${colors.medium} group-hover:bg-gradient-to-br ${colors.gradient}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`${colors.text} group-hover:text-white transition-colors duration-300`}>
                          {value.icon}
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`text-xl sm:text-2xl font-bold mb-3 ${colors.text} group-hover:text-opacity-100 transition-colors duration-300`}>
                        {value.title}
                      </h4>
                      <p className="text-slate-600 text-base leading-relaxed mb-4">
                        {value.description}
                      </p>
                    </div>
                  </div>

                  {/* Индикатор активности */}
                  <motion.div
                    className={`absolute bottom-4 right-4 w-3 h-3 ${colors.dark} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    animate={{
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Дополнительная информация с вкладками */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('missionAbout.commitment.title')}
              </h3>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
                {t('missionAbout.commitment.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t('missionAbout.commitment.items', { returnObjects: true }).map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </AboutBackground>
  );
};

export default AboutMission;