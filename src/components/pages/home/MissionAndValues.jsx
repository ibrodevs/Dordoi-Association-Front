import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MissionAndValues = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const { t } = useTranslation();

  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('mission.values.0.title'),
      description: t('mission.values.0.description'),
      color: "blue"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: t('mission.values.1.title'),
      description: t('mission.values.1.description'),
      color: "purple"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t('mission.values.2.title'),
      description: t('mission.values.2.description'),
      color: "green"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t('mission.values.3.title'),
      description: t('mission.values.3.description'),
      color: "orange"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('mission.values.4.title'),
      description: t('mission.values.4.description'),
      color: "cyan"
    }
  ];

  const colorMap = {
    blue: { light: 'bg-blue-50', medium: 'bg-blue-100', dark: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
    purple: { light: 'bg-purple-50', medium: 'bg-purple-100', dark: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200' },
    green: { light: 'bg-green-50', medium: 'bg-green-100', dark: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' },
    orange: { light: 'bg-orange-50', medium: 'bg-orange-100', dark: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200' },
    cyan: { light: 'bg-cyan-50', medium: 'bg-cyan-100', dark: 'bg-cyan-500', text: 'text-cyan-600', border: 'border-cyan-200' }
  };

  // Автопереключение активной ценности
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [values.length, isHovered]);

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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Субтлный фон с градиентами */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-48 h-48 bg-blue-200 rounded-full blur-2xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-200 rounded-full blur-2xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-cyan-200 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6"
          >
            <span className="text-blue-600 text-sm font-semibold">{t('mission.badge')}</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            {t('mission.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {t('mission.titleHighlight')}
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t('mission.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Блок миссии */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div
              variants={cardVariants}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="flex items-center mb-8">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {t('mission.missionTitle')}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <motion.p 
                    className="text-lg text-slate-700 leading-relaxed"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="font-semibold text-blue-600">{t('mission.missionText.0.highlight')}</span>{t('mission.missionText.0.rest')}
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg text-slate-700 leading-relaxed"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                  >
                    {t('mission.missionText.1.prefix')}<span className="font-semibold text-blue-600">{t('mission.missionText.1.highlight')}</span>{t('mission.missionText.1.suffix')}
                  </motion.p>
                </div>

                {/* Декоративный элемент */}
                <motion.div 
                  className="absolute top-4 right-4 w-2 h-16 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"
                  animate={{ scaleY: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Дополнительная информация */}
            <motion.div
              variants={cardVariants}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{t('mission.strategy.title')}</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {t('mission.strategy.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Блок ценностей */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="text-center lg:text-left mb-8">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
              >
                {t('mission.valuesTitle')}
              </motion.h3>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-slate-600"
              >
                {t('mission.valuesSubtitle')}
              </motion.p>
            </div>

            <div className="grid gap-4">
              <AnimatePresence mode="wait">
                {values.map((value, index) => {
                  const colors = colorMap[value.color];
                  return (
                    <motion.div
                      key={value.title}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ 
                        opacity: activeValue === index ? 1 : 0.7,
                        x: 0,
                        scale: activeValue === index ? 1 : 0.98
                      }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`relative cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 ${
                        activeValue === index 
                          ? `${colors.light} ${colors.border} shadow-lg scale-105` 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      onMouseEnter={() => setActiveValue(index)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors duration-300 ${
                            activeValue === index ? colors.dark : colors.medium
                          }`}
                          animate={{
                            rotate: activeValue === index ? [0, -5, 5, 0] : 0
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className={`${activeValue === index ? 'text-white' : colors.text}`}>
                            {value.icon}
                          </div>
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                            activeValue === index ? colors.text : 'text-slate-700'
                          }`}>
                            {value.title}
                          </h4>
                          <p className={`leading-relaxed transition-colors duration-300 ${
                            activeValue === index ? 'text-slate-600' : 'text-slate-500'
                          }`}>
                            {value.description}
                          </p>
                        </div>
                        <motion.div
                          className={`w-2 h-2 rounded-full ${
                            activeValue === index ? colors.dark : 'bg-slate-300'
                          }`}
                          animate={{
                            scale: activeValue === index ? [1, 1.5, 1] : 1
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: activeValue === index ? Infinity : 0,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndValues;