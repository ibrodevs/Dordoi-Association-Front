import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../../api';
import AboutBackground from '../../AboutBackground';

const AboutFacts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t, i18n } = useTranslation();
  const [activeFact, setActiveFact] = useState(null);
  const [counterValues, setCounterValues] = useState({});
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFact, setExpandedFact] = useState(null);
  const [modalFact, setModalFact] = useState(null)
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

  // Загрузка данных из API
  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const data = await apiRequest(`about-us/facts/?lang=${i18n.language}`);
        let factsArray = [];
        if (data.results && Array.isArray(data.results)) {
          factsArray = data.results;
        } else if (Array.isArray(data)) {
          factsArray = data;
        } else {
          console.error('Unexpected API response structure:', data);
          setFacts([]);
          return;
        }
        const enrichedFacts = factsArray.map(fact => ({
          ...fact,
          ...factMapping[fact.id]
        }));
        setFacts(enrichedFacts);
      } catch (error) {
        console.error('Error fetching facts:', error);
        setFacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacts();
  }, [i18n.language]);

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
      y: 60, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      scale: 0.9, 
      opacity: 0,
      rotateX: -15
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
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

  const handleDownloadBrochure = () => {
    // Логика скачивания брошюры
    console.log('Download brochure');
  };

  return (
    <AboutBackground>
      <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Улучшенные декоративные элементы фона */}
      <div className="absolute inset-0 opacity-15">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-5% w-40 h-40 bg-blue-200 rounded-full blur-4xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-20 right-5% w-48 h-48 bg-cyan-200 rounded-full blur-4xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-1/3 left-1/3 w-32 h-32 bg-purple-200 rounded-full blur-4xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 3 }}
          className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-emerald-200 rounded-full blur-4xl"
        />
      </div>

      {/* Анимированный градиентный фон */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
          animate={{
            background: [
              'linear-gradient(45deg, #60a5fa, #8b5cf6, #06b6d4)',
              'linear-gradient(135deg, #8b5cf6, #06b6d4, #60a5fa)',
              'linear-gradient(225deg, #06b6d4, #60a5fa, #8b5cf6)',
              'linear-gradient(315deg, #60a5fa, #8b5cf6, #06b6d4)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-lg mb-8"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
              {t('facts.badge')}
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
              {t('facts.title')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {t('facts.titleHighlight')}
            </span>
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center space-x-4 mb-8"
          >
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            <div className="w-6 h-6 rounded-full border-4 border-blue-200 animate-pulse"></div>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            {t('facts.subtitle')}
          </motion.p>
        </motion.div>

        {/* Карточки с фактами */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20"
          >
            {facts.map((fact, index) => {
              const colors = colorMap['blue'];
              
              return (
                <motion.div
                  key={fact.id}
                  variants={cardVariants}
                  className="group relative"
                  whileHover="hover"
                  layout
                >
                  <motion.div
                    className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 ${colors.border} shadow-2xl shadow-${fact.color}-500/10 hover:shadow-${fact.color}-500/20 transition-all duration-500 h-full flex flex-col overflow-hidden`}
                  >
                    {/* Акцентная градиентная полоса */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient}`}></div>
                    
                    {/* Декоративный уголок */}
                    <div className={`absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 ${colors.border} rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    {fact.photo && (
                      <div className="relative mb-6 overflow-hidden rounded-2xl">
                        <img
                          src={fact.photo}
                          alt={fact.title}
                          className="w-full h-78 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* затемняющий градиент для читаемости */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-2xl font-bold mb-3 ${colors.text}`}>
                        {fact.title}
                      </h3>
                      
                      
                    </div>
                    
                    <p className="mt-3 text-slate-600 text-lg leading-relaxed line-clamp-4">
                      {fact.description}
                    </p>

                    <button
                      onClick={() => setModalFact(fact)}
                      className="mt-4 self-start text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                    >
                      {t('facts.readMore')}
                    </button>


                    


                    {/* Декоративный элемент при наведении */}
                    <motion.div
                      className={`absolute -bottom-12 -right-12 w-24 h-24 ${colors.light} rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

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
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xl"
      >
        ✕
      </button>

      {/* Фото */}
      {modalFact.photo && (
        <div className="overflow-hidden rounded-t-3xl">
          <img
            src={modalFact.photo}
            alt={modalFact.title}
            className="w-full h-124 object-cover"
          />
        </div>
      )}

      {/* Контент */}
      <div className="p-8">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">
          {modalFact.title}
        </h3>

        <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
          {modalFact.description}
        </p>
      </div>
    </motion.div>
  </motion.div>
)}

    </section>
    </AboutBackground>
  );
};

export default AboutFacts;