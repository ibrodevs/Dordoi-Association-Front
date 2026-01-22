import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../../api';

const HomeFacts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t, i18n } = useTranslation();
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalFact, setModalFact] = useState(null);

  // Маппинг ID фактов к дополнительным данным
  const factMapping = {
    1: { // forbes
      numericValue: 30,
      suffix: '+',
      color: 'blue',
      duration: 3000
    },
    2: { // smokeless
      numericValue: 15,
      suffix: '%',
      color: 'green',
      duration: 2500
    },
    3: { // tax
      numericValue: 2.5,
      suffix: 'B',
      color: 'orange',
      duration: 3500
    },
    4: { // export
      numericValue: 50,
      suffix: '+',
      color: 'purple',
      duration: 3000
    },
    5: { // employment
      numericValue: 10000,
      suffix: '+',
      color: 'cyan',
      duration: 4000
    },
    6: { // infrastructure
      numericValue: 25,
      suffix: '+',
      color: 'red',
      duration: 3000
    }
  };

  const colorMap = {
    blue: { 
      light: 'bg-blue-50', 
      medium: 'bg-blue-100', 
      dark: 'bg-blue-600', 
      text: 'text-blue-600', 
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-cyan-500',
      hover: 'hover:from-blue-600 hover:to-cyan-600'
    },
    green: { 
      light: 'bg-green-50', 
      medium: 'bg-green-100', 
      dark: 'bg-green-600', 
      text: 'text-green-600', 
      border: 'border-green-200',
      gradient: 'from-green-500 to-emerald-500',
      hover: 'hover:from-green-600 hover:to-emerald-600'
    },
    orange: { 
      light: 'bg-orange-50', 
      medium: 'bg-orange-100', 
      dark: 'bg-orange-600', 
      text: 'text-orange-600', 
      border: 'border-orange-200',
      gradient: 'from-orange-500 to-amber-500',
      hover: 'hover:from-orange-600 hover:to-amber-600'
    },
    purple: { 
      light: 'bg-purple-50', 
      medium: 'bg-purple-100', 
      dark: 'bg-purple-600', 
      text: 'text-purple-600', 
      border: 'border-purple-200',
      gradient: 'from-purple-500 to-violet-500',
      hover: 'hover:from-purple-600 hover:to-violet-600'
    },
    cyan: { 
      light: 'bg-cyan-50', 
      medium: 'bg-cyan-100', 
      dark: 'bg-cyan-600', 
      text: 'text-cyan-600', 
      border: 'border-cyan-200',
      gradient: 'from-cyan-500 to-sky-500',
      hover: 'hover:from-cyan-600 hover:to-sky-600'
    },
    red: { 
      light: 'bg-red-50', 
      medium: 'bg-red-100', 
      dark: 'bg-red-600', 
      text: 'text-red-600', 
      border: 'border-red-200',
      gradient: 'from-red-500 to-rose-500',
      hover: 'hover:from-red-600 hover:to-rose-600'
    }
  };

  // Загрузка данных из API
  useEffect(() => {
    const fetchFacts = async () => {
      try {
        setLoading(true);
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        const data = await apiRequest(`about-us/facts/?lang=${lang}`);
        
        let factsArray = [];
        if (data.results && Array.isArray(data.results)) {
          factsArray = data.results;
        } else if (Array.isArray(data)) {
          factsArray = data;
        } else {
          console.error('Unexpected API response structure:', data);
          factsArray = [];
        }
        
        // Sort by ID to get latest (assuming higher ID = newer)
        const sortedFacts = factsArray.sort((a, b) => b.id - a.id);
        
        // Take first 3 and enrich with mapping data
        const latestFacts = sortedFacts.slice(0, 3).map(fact => ({
          ...fact,
          ...factMapping[fact.id],
          path: '/about/facts'
        }));
        
        setFacts(latestFacts);
      } catch (error) {
        console.error('Error fetching facts:', error);
        // Fallback data
        setFacts([
          {
            id: 1,
            title: t('facts.fallback.title1', 'Компания в рейтинге Forbes'),
            description: t('facts.fallback.desc1', 'Дордой входит в рейтинги Forbes как одна из ведущих компаний Центральной Азии'),
            color: 'blue',
            numericValue: 30,
            suffix: '+',
            photo: null,
            path: '/about/facts'
          },
          {
            id: 2,
            title: t('facts.fallback.title2', 'Бездымные технологии'),
            description: t('facts.fallback.desc2', 'Внедрение современных экологичных технологий на производстве'),
            color: 'green',
            numericValue: 15,
            suffix: '%',
            photo: null,
            path: '/about/facts'
          },
          {
            id: 3,
            title: t('facts.fallback.title3', 'Налоговые отчисления'),
            description: t('facts.fallback.desc3', 'Ежегодные налоговые отчисления в государственный бюджет'),
            color: 'orange',
            numericValue: 2.5,
            suffix: 'B',
            photo: null,
            path: '/about/facts'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacts();
  }, [i18n.language, t]);

  // Анимация счетчика
  const Counter = ({ value, duration, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (isInView && !isVisible) {
        setIsVisible(true);
        let start = 0;
        const end = typeof value === 'number' ? value : parseFloat(value);
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [isInView, isVisible, value, duration]);

    if (typeof value !== 'number' && isNaN(parseFloat(value))) {
      return <span>{value}</span>;
    }

    return (
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Math.floor(count).toLocaleString()}{suffix}
      </motion.span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 30, 
      opacity: 0, 
      scale: 0.95 
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 bg-white overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-blue-200 shadow-sm mb-6"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-600 text-sm font-semibold">
              {t('facts.badge', 'Факты о нас')}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            {t('facts.title', 'Факты о Дордой')}
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">
              {t('facts.subtitleHighlight', 'В цифрах и достижениях')}
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-8"
          />

          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('facts.subtitle', 'Ключевые показатели и достижения нашей компании за годы работы')}
          </motion.p>
        </motion.div>

        {/* Сетка фактов */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loading ? "loading" : "facts"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={cardVariants}
                  exit="exit"
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 animate-pulse"
                >
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-slate-200 rounded mb-4"></div>
                    <div className="h-20 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              facts.map((fact) => {
                const colors = colorMap[fact.color] || colorMap.blue;
                
                return (
                  <motion.div
                    key={fact.id}
                    variants={cardVariants}
                    exit="exit"
                    className="group relative"
                    whileHover="hover"
                  >
                    <motion.div
                      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 ${colors.border} overflow-hidden h-full flex flex-col`}
                      variants={cardVariants}
                      whileHover={{ y: -8 }}
                    >
                      {/* Изображение */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                        {fact.photo ? (
                          <img
                            src={fact.photo}
                            alt={fact.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center`}>
                            <motion.div
                              className="text-white text-5xl font-bold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Counter 
                                value={fact.numericValue} 
                                duration={fact.duration || 3000} 
                                suffix={fact.suffix} 
                              />
                            </motion.div>
                          </div>
                        )}
                        
                        {/* Градиентный оверлей */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Контент */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Заголовок */}
                        <h3 className={`text-xl font-bold ${colors.text} mb-3 leading-tight group-hover:text-blue-800 transition-colors duration-300`}>
                          {fact.title}
                        </h3>

                        {/* Описание */}
                        <p className="text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                          {fact.description}
                        </p>

                        {/* Кнопка подробнее */}
                        <div className="pt-4 border-t border-slate-100">
                          <button
                            onClick={() => setModalFact(fact)}
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
                          >
                            <span>{t('facts.learnMore', 'Подробнее')}</span>
                            <motion.svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </motion.svg>
                          </button>
                        </div>
                      </div>

                      {/* Акцентный элемент при наведении */}
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Кнопка "Все факты" */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <Link
            to="/about/facts"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            <span>{t('facts.viewAll', 'Все факты')}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Модальное окно для факта */}
      {modalFact && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalFact(null)}
        >
          <motion.div
            className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => setModalFact(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xl z-10"
            >
              ✕
            </button>

            {/* Фото */}
            {modalFact.photo && (
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={modalFact.photo}
                  alt={modalFact.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Контент */}
            <div className="p-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                {modalFact.title}
              </h3>

              {modalFact.numericValue && (
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    <Counter 
                      value={modalFact.numericValue} 
                      duration={modalFact.duration || 3000} 
                      suffix={modalFact.suffix} 
                    />
                  </div>
                  <p className="text-slate-600">
                    {t('facts.numericValue', 'Ключевой показатель')}
                  </p>
                </div>
              )}

              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                {modalFact.description}
              </p>
            </div>

            {/* Кнопка закрытия внизу */}
            <div className="p-6 border-t border-slate-200">
              <button
                onClick={() => setModalFact(null)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold"
              >
                {t('facts.close', 'Закрыть')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HomeFacts;