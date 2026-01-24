import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../../api';

const StructurePreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const { t, i18n } = useTranslation();
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных дочерних компаний из API
  useEffect(() => {
    const fetchSubsidiaries = async () => {
      try {
        setLoading(true);
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        console.log('Fetching subsidiaries for language:', lang);
        const data = await apiRequest(`about-us/structure/?lang=${lang}`);
        console.log('API response:', data);
        // Сортируем по order и берем первые 3
        const sortedData = data.sort((a, b) => a.order - b.order);
        const firstThree = sortedData.slice(0, 3);
        console.log('First three subsidiaries:', firstThree);
        console.log('Subsidiary fields:', firstThree.map(s => ({ id: s.id, slug: s.slug, name: s.name })));
        setSubsidiaries(firstThree);
      } catch (error) {
        console.error('Error fetching subsidiaries:', error);
        setSubsidiaries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubsidiaries();
  }, [i18n.language]);

  return (
    <section ref={ref} className=" relative py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6"
          >
            <span className="text-blue-700 text-sm font-semibold">{t('structure.badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            {t('structure.title')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {t('structure.subtitle')}
          </motion.p>
        </motion.div>

        {/* Карточки подразделений */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading state
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`loading-${index}`}
                className="group"
              >
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-slate-200 rounded-2xl animate-pulse mb-6"></div>
                    <div className="h-6 bg-slate-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse mb-1"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-20"></div>
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : subsidiaries.length > 0 ? (
            subsidiaries.map((subsidiary, index) => (
              <div
                key={subsidiary.id || index}
                className="group"
              >
                <Link to={`/about/structure/${subsidiary.slug || subsidiary.id}`}>
                  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 hover:border-blue-300 flex flex-col min-h-[400px]">
                    {/* Фото */}
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img 
                        src={subsidiary.logo} 
                        alt={subsidiary.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Контент */}
                    <div className="relative p-6 flex-grow flex flex-col justify-between">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                        {subsidiary.name}
                      </h3>

                      {/* Кнопка "Подробнее" */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                          {t('structure.divisionDetails')}
                        </span>
                        <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            // No data state
            <div
              className="col-span-full text-center py-12"
            >
              <div className="text-slate-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-lg font-medium">{t('structure.noData')}</p>
                <p className="text-sm mt-2">{t('structure.noDataDescription')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Кнопка "Посмотреть все" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <Link
            to="/about/structure"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t('structure.subsidiaries.viewAll')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StructurePreview;