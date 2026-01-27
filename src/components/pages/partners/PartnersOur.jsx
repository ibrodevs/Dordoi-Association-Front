import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BuildingIcon } from '../../icons';
import { apiRequest } from '../../../api';

const Partners = () => {
  
  const { t, i18n } = useTranslation();
  const [activePartner, setActivePartner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Загрузка данных партнеров из API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await apiRequest(`partners/?lang=${i18n.language}`);

        // Обработка данных партнеров
        const partnersArray = data.results || data || [];
        const transformedPartners = Array.isArray(partnersArray) ? partnersArray.map(partner => ({
          id: partner.id,
          name: partner.name_ru || partner.name_en || partner.name_kg || partner.name || 'Unknown Partner',
          logo: partner.logo || (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
          description: partner.description_ru || partner.description_en || partner.description_kg || partner.description || ''
        })) : [];

        setPartners(transformedPartners);
      } catch (err) {
        console.error('Error fetching partners:', err);
        console.warn('API недоступен, используются демо-данные. Запустите Django сервер для получения реальных данных.');

        // Fallback to static demo data
        setPartners([
          {
            id: 1,
            name: "Тех Корп",
            logo: (
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            ),
            description: "<p>Тех компания</p>"
          }
        ]);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (isVisible) {
      fetchPartners();
    }
  }, [isVisible, i18n.language]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-2 mb-4">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-yellow-400 text-sm font-medium">{t('partners.badge')}</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {t('partners.title')}
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
            {t('partners.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Левая часть - Компактный стек партнеров */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/10">
              <h3 className="text-base font-semibold text-white mb-4 text-center">
                {t('partners.ourPartners')}
              </h3>
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-3 animate-pulse">
                      <div className="h-4 bg-white/20 rounded mb-2"></div>
                      <div className="h-3 bg-white/10 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : error && partners.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-red-400 text-sm">
                    {t('partners.error.loading', 'Ошибка загрузки партнеров')}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {partners.map((partner, index) => (
                    <div
                      key={partner.id}
                      className={`relative p-3 rounded-xl cursor-pointer transition-all duration-300 transform border ${
                        activePartner === index
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg scale-102'
                          : 'bg-white/5 text-blue-200 border-white/10 hover:border-blue-400/30 hover:bg-white/10'
                      }`}
                      onClick={() => setActivePartner(index)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`text-xl transition-transform duration-300 ${
                          activePartner === index ? 'scale-110 rotate-12' : 'scale-100'
                        }`}>
                          {partner.logo && typeof partner.logo === 'string' && partner.logo.startsWith('http') ? (
                            <img src={partner.logo} alt={partner.name} className="w-12 h-12 rounded object-contain" />
                          ) : (
                            <BuildingIcon className="w-12 h-12" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-xs transition-colors duration-300 truncate ${
                            activePartner === index ? 'text-white' : 'text-blue-100'
                          }`}>
                            {partner.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Правая часть - Детальная информация */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="animate-pulse">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-white/20 rounded-2xl w-16 h-16"></div>
                    <div className="flex-1">
                      <div className="bg-white/20 rounded-lg h-8 w-64 mb-2"></div>
                      <div className="bg-white/20 rounded-lg h-4 w-96 mb-3"></div>
                      <div className="flex gap-2">
                        <div className="bg-white/20 rounded-lg h-6 w-32"></div>
                        <div className="bg-white/20 rounded-lg h-6 w-24"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 h-64"></div>
                    <div className="bg-white/5 rounded-xl p-4 h-64"></div>
                    <div className="bg-white/5 rounded-xl p-4 h-64"></div>
                  </div>
                </div>
              </div>
            ) : error && partners.length === 0 ? (
              <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {t('partners.error.title', 'Ошибка загрузки')}
                  </h3>
                  <p className="text-blue-200 max-w-md mx-auto mb-6">
                    {error || t('partners.error.description', 'Не удалось загрузить данные партнеров')}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    {t('partners.error.retry', 'Попробовать снова')}
                  </button>
                </div>
              </div>
            ) : partners.length > 0 && partners[activePartner] ? (
              <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Основная информация о партнере */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="text-5xl p-4 rounded-2xl">
                      {partners[activePartner].logo && typeof partners[activePartner].logo === 'string' && partners[activePartner].logo.startsWith('http') ? (
                        <img src={partners[activePartner].logo} alt={partners[activePartner].name} className="w-20 h-20 rounded-xl object-contain" />
                      ) : (
                        <BuildingIcon className="w-20 h-20" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {partners[activePartner].name}
                    </h3>
                  </div>
                </div>

                {/* Описание как HTML */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div 
                    className="text-blue-200 text-base leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: partners[activePartner].description }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;