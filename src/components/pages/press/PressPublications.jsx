import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../../api';
import PressBackground from '../../PressBackground';

const PressPublications = () => {
  const { t, i18n } = useTranslation();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка публикаций из API
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Определяем язык для API запроса
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        const data = await apiRequest(`presscentre/publications/?lang=${lang}`);
        
        const publicationsArray = Array.isArray(data) ? data : data.results || [];
        setPublications(publicationsArray);
      } catch (error) {
        console.error('Error fetching publications:', error);
        setError(error.message);
        // Fallback данные на случай ошибки
        setPublications([
          {
            id: 1,
            title: t('publications.items.annual_report.title'),
            link: '/publications/annual-report'
          },
          {
            id: 2,
            title: t('publications.items.financial_statements.title'),
            link: '/publications/financial-statements'
          },
          {
            id: 3,
            title: t('publications.items.sustainability_report.title'),
            link: '/publications/sustainability-report'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [i18n.language, t]);

  const handlePublicationClick = (link) => {
    if (link && link.startsWith('http')) {
      // Внешняя ссылка - открываем в новой вкладке
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      // Внутренняя ссылка - можно добавить навигацию если нужно
      console.log('Internal link:', link);
    }
  };

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="text-blue-600 text-sm font-semibold">{t('publications.badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('publications.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"></div>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <PressBackground>
      <section className="relative py-20 ">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <span className="text-blue-600 text-sm font-semibold">{t('publications.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            {t('publications.title')}
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"></div>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('publications.subtitle')}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 border border-red-200">
              <span className="text-red-600 text-sm font-semibold">
                {t('common.error', 'Ошибка загрузки данных')}
              </span>
            </div>
          </div>
        )}

        {/* Publications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication) => (
            <div
              key={publication.id}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-300/50 cursor-pointer"
              onClick={() => handlePublicationClick(publication.link)}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-cyan-50/0 group-hover:from-blue-50/30 group-hover:to-cyan-50/30 transition-all duration-500 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative p-8">

                {/* Photo */}
                {publication.photo && (
                  <div className="mb-6">
                    <div className="w-full aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center overflow-hidden">
                      <img 
                        src={publication.photo} 
                        alt={publication.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                  {publication.title}
                </h3>

                {/* Description */}
                {publication.description && (
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {publication.description}
                  </p>
                )}

                {/* Action button */}
                <div className="flex items-center justify-between">
                  <div className="flex-1"></div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors duration-300">
                      {publication.link && publication.link.startsWith('http') 
                        ? t('publications.openLink', 'Открыть ссылку')
                        : t('publications.readMore')
                      }
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <svg className="w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </PressBackground>
  );
};

export default PressPublications;
