import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../../SEO';
import AboutBackground from '../../AboutBackground';

const AboutHistory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t, i18n } = useTranslation();
  const [activeYear, setActiveYear] = useState(0);
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  // Загрузка данных истории из API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        const response = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/about-us/history/?lang=${lang}`);
        const data = await response.json();
        
        // Сортируем по order
        const sortedData = data.sort((a, b) => a.order - b.order);
        setHistoryItems(sortedData);
        
        // Инициализируем состояния загрузки изображений
        const loadingStates = {};
        sortedData.forEach(item => {
          if (item.image) {
            loadingStates[item.id] = true;
          }
        });
        setImageLoadingStates(loadingStates);
      } catch (error) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [i18n.language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <SEO 
        title="История Ассоциации Дордой"
        description="35 лет истории Ассоциации Дордой: от основания базара в 1991 году до крупнейшей бизнес-ассоциации Кыргызстана. Этапы развития, достижения и вклад в экономику страны."
        keywords="история Дордой, базар Дордой история, Ассоциация Дордой 35 лет, основание Дордой 1991, развитие Дордой, история предпринимательства Кыргызстан"
      />
      <AboutBackground>
        <section ref={ref} className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 opacity-3 sm:opacity-5">
        <motion.div
          className="absolute top-4 left-4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-200 rounded-full blur-2xl sm:blur-3xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-4 right-4 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-200 rounded-full blur-2xl sm:blur-3xl"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-blue-50 border border-blue-200 mb-4 sm:mb-6"
          >
            <span className="text-blue-600 text-xs sm:text-sm font-semibold">{t('history.badge')}</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6"
          >
            {t('history.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {t('history.titleHighlight')}
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            {t('history.subtitle')}
          </motion.p>
        </motion.div>

        {/* История - непрерывный текст с фотографиями */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-slate-600">Загрузка истории...</span>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6 sm:space-y-8"
            >
              {historyItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  {/* Текстовый абзац */}
                  <motion.p
                    variants={itemVariants}
                    className="text-slate-700 leading-relaxed text-base sm:text-lg text-justify"
                  >
                    {item.description}
                  </motion.p>

                  {/* Фотография после абзаца, если есть */}
                  {item.image && (
                    <motion.div
                      variants={itemVariants}
                      className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl my-6 sm:my-8 bg-gray-100"
                    >
                      {/* Загрузка */}
                      {imageLoadingStates[item.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                      
                      <img
                        src={item.image}
                        alt={`История ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          setImageLoadingStates(prev => ({ ...prev, [item.id]: false }));
                          e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="mt-2 text-sm">Изображение недоступно</p></div>';
                        }}
                        onLoad={() => {
                          setImageLoadingStates(prev => ({ ...prev, [item.id]: false }));
                        }}
                      />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </div>

        {/* Индикатор прогресса */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-8 sm:mt-12 lg:mt-16"
        >
          <div className="inline-flex items-center space-x-3 sm:space-x-4 bg-slate-50 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-700 text-sm sm:text-base font-medium">{t('history.timelineContinues')}</span>
            </div>
            <motion.div
              className="w-0.5 h-4 sm:h-6 bg-slate-300 rounded-full"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-slate-600 text-sm sm:text-base">{t('history.futureAhead')}</span>
          </div>
        </motion.div>
      </div>
    </section>
    </AboutBackground>
    </>
  );
};

export default AboutHistory;