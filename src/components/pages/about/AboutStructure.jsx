import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../api';
import AboutBackground from '../../AboutBackground';

const AboutStructure = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeDivision, setActiveDivision] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Отслеживание видимости для запуска анимации один раз
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Загрузка данных дочерних компаний из API
  useEffect(() => {
    const fetchSubsidiaries = async () => {
      try {
        setLoading(true);
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        console.log('Current i18n.language:', i18n.language, 'Using lang param:', lang);
        console.log('Fetching subsidiaries with lang:', lang);
        const data = await apiRequest(`about-us/structure/?lang=${lang}`);
        console.log('Received subsidiaries:', data);
        // Сортируем по order и фильтруем неактивные
        const sortedData = data.sort((a, b) => a.order - b.order);
        const inactiveSubsidiaries = sortedData.filter(sub => !sub.is_active);
        setSubsidiaries(inactiveSubsidiaries);
      } catch (error) {
        console.error('Error fetching subsidiaries:', error);
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchSubsidiaries();
  }, [i18n.language]);

  const divisions = [
    { 
      id: 'trade',
      name: t('structure.divisions.trade.name'),
      description: t('structure.divisions.trade.description'),
      detailed: t('structure.divisions.trade.detailed'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'blue',
      stats: t('structure.divisions.trade.stats'),
      achievements: t('structure.divisions.trade.achievements', { returnObjects: true }),
      team: t('structure.divisions.trade.team')
    },
    { 
      id: 'logistics',
      name: t('structure.divisions.logistics.name'),
      description: t('structure.divisions.logistics.description'),
      detailed: t('structure.divisions.logistics.detailed'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'cyan',
      stats: t('structure.divisions.logistics.stats'),
      achievements: t('structure.divisions.logistics.achievements', { returnObjects: true }),
      team: t('structure.divisions.logistics.team')
    },
    { 
      id: 'finance',
      name: t('structure.divisions.finance.name'),
      description: t('structure.divisions.finance.description'),
      detailed: t('structure.divisions.finance.detailed'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green',
      stats: t('structure.divisions.finance.stats'),
      achievements: t('structure.divisions.finance.achievements', { returnObjects: true }),
      team: t('structure.divisions.finance.team')
    },
    { 
      id: 'education',
      name: t('structure.divisions.education.name'),
      description: t('structure.divisions.education.description'),
      detailed: t('structure.divisions.education.detailed'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      color: 'orange',
      stats: t('structure.divisions.education.stats'),
      achievements: t('structure.divisions.education.achievements', { returnObjects: true }),
      team: t('structure.divisions.education.team')
    },
    { 
      id: 'medicine',
      name: t('structure.divisions.medicine.name'),
      description: t('structure.divisions.medicine.description'),
      detailed: t('structure.divisions.medicine.detailed'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: 'red',
      stats: t('structure.divisions.medicine.stats'),
      achievements: t('structure.divisions.medicine.achievements', { returnObjects: true }),
      team: t('structure.divisions.medicine.team')
    },
    { 
      id: 'sport',
      name: t('structure.divisions.sport.name'),
      description: t('structure.divisions.sport.description'),
      detailed: t('structure.divisions.sport.detailed'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'purple',
      stats: t('structure.divisions.sport.stats'),
      achievements: t('structure.divisions.sport.achievements', { returnObjects: true }),
      team: t('structure.divisions.sport.team')
    },
    { 
      id: 'culture',
      name: t('structure.divisions.culture.name'),
      description: t('structure.divisions.culture.description'),
      detailed: t('structure.divisions.culture.detailed'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'yellow',
      stats: t('structure.divisions.culture.stats'),
      achievements: t('structure.divisions.culture.achievements', { returnObjects: true }),
      team: t('structure.divisions.culture.team')
    }
  ];

  const colorMap = {
    blue: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-600', 
      border: 'border-blue-200', 
      dark: 'bg-blue-600',
      gradient: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50'
    },
    cyan: { 
      bg: 'bg-cyan-100', 
      text: 'text-cyan-600', 
      border: 'border-cyan-200', 
      dark: 'bg-cyan-600',
      gradient: 'from-cyan-500 to-cyan-600',
      light: 'bg-cyan-50'
    },
    green: { 
      bg: 'bg-green-100', 
      text: 'text-green-600', 
      border: 'border-green-200', 
      dark: 'bg-green-600',
      gradient: 'from-green-500 to-green-600',
      light: 'bg-green-50'
    },
    orange: { 
      bg: 'bg-orange-100', 
      text: 'text-orange-600', 
      border: 'border-orange-200', 
      dark: 'bg-orange-600',
      gradient: 'from-orange-500 to-orange-600',
      light: 'bg-orange-50'
    },
    red: { 
      bg: 'bg-red-100', 
      text: 'text-red-600', 
      border: 'border-red-200', 
      dark: 'bg-red-600',
      gradient: 'from-red-500 to-red-600',
      light: 'bg-red-50'
    },
    purple: { 
      bg: 'bg-purple-100', 
      text: 'text-purple-600', 
      border: 'border-purple-200', 
      dark: 'bg-purple-600',
      gradient: 'from-purple-500 to-purple-600',
      light: 'bg-purple-50'
    },
    yellow: { 
      bg: 'bg-yellow-100', 
      text: 'text-yellow-600', 
      border: 'border-yellow-200', 
      dark: 'bg-yellow-600',
      gradient: 'from-yellow-500 to-yellow-600',
      light: 'bg-yellow-50'
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 40,
      rotateY: -15
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const treeVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }
    }
  };

  const detailVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -25, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AboutBackground>
      <section ref={ref} className="relative py-20 overflow-hidden min-h-screen">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Верхняя часть */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 left-10 w-64 h-64 bg-slate-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
          className="absolute top-20 right-20 w-72 h-72 bg-gray-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-32 left-1/3 w-56 h-56 bg-slate-400 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
          className="absolute top-48 right-1/3 w-68 h-68 bg-gray-400 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute top-16 left-1/2 w-60 h-60 bg-slate-300 rounded-full blur-3xl"
        />
        
        {/* Средняя часть */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2.5 }}
          className="absolute top-[40%] left-1/4 w-80 h-80 bg-gray-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 3 }}
          className="absolute top-[50%] right-1/4 w-60 h-60 bg-slate-400 rounded-full blur-3xl"
        />
        
        {/* Средне-нижняя часть */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute top-[70%] left-1/3 w-72 h-72 bg-gray-400 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 5 }}
          className="absolute top-[80%] right-10 w-64 h-64 bg-slate-300 rounded-full blur-3xl"
        />
        
        {/* Нижняя часть */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 6 }}
          className="absolute bottom-10 left-20 w-80 h-80 bg-gray-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 7 }}
          className="absolute bottom-32 right-1/3 w-56 h-56 bg-slate-400 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6"
          >
            <span className="text-slate-600 text-sm font-semibold">{t('structure.badge')}</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            {t('structure.title')}
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"
          ></motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t('structure.subtitle')}
          </motion.p>
        </motion.div>

        {/* Детали выбранного подразделения */}
        <AnimatePresence>
          {selectedDivision && (
            <motion.div
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-16"
            >
              {divisions.map((division) => {
                if (division.id !== selectedDivision) return null;
                const colors = colorMap[division.color];
                
                return (
                  <div key={division.id} className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 border border-slate-200 shadow-2xl">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Левая колонка - основная информация */}
                      <div className="lg:w-2/3">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center`}>
                              <div className={colors.text}>
                                {division.icon}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                                {division.name}
                              </h3>
                              <p className="text-lg text-slate-600">
                                {division.description}
                              </p>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => setSelectedDivision(null)}
                            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </motion.button>
                        </div>

                        <p className="text-slate-700 text-lg leading-relaxed mb-8">
                          {division.detailed}
                        </p>

                        {/* Достижения */}
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-slate-900 mb-4">
                            {t('structure.achievements')}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {division.achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200"
                              >
                                <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span className="text-slate-700">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Правая колонка - статистика и команда */}
                      <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                          <h4 className="text-xl font-bold text-slate-900 mb-6">
                            {t('structure.divisionDetails')}
                          </h4>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm text-slate-500 mb-1">
                                {t('structure.teamSize')}
                              </div>
                              <div className="text-lg font-semibold text-slate-900">
                                {division.team}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-slate-500 mb-1">
                                {t('structure.performance')}
                              </div>
                              <div className="text-lg font-semibold text-slate-900">
                                {division.stats}
                              </div>
                            </div>

                            <motion.button
                              className={`w-full mt-6 py-3 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {t('structure.buttons.contactDivision')}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Дочерние компании */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          className="rounded-3xl p-8 md:p-12"
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-slate-600">{t('structure.subsidiaries.loading')}</span>
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={hasAnimated && !loading ? "visible" : "hidden"}
            >
              {subsidiaries.map((subsidiary, index) => (
                <motion.div
                  key={subsidiary.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-slate-200 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col"
                >
                  {/* Фоновый градиент при ховере */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  <div className="relative z-10 flex flex-col flex-grow">
                    {/* Фото компании */}
                    <div className="mb-6">
                      <div className="w-full aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden">
                        <img 
                          src={subsidiary.logo} 
                          alt={subsidiary.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                    </div>
                    
                    {/* Контент */}
                    <div className="text-center flex-grow flex flex-col justify-between">
                      <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                        {subsidiary.name}
                      </h4>
                      
                      {/* Кнопка */}
                      <motion.button
                        onClick={() => navigate(`/about/structure/${subsidiary.slug}`, { state: { subsidiary } })}
                        className="w-full px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md mt-auto text-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{t('structure.subsidiaries.learnMore')}</span>
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Декоративный элемент */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
    </AboutBackground>
  );
};

export default AboutStructure;