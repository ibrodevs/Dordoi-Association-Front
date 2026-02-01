import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';
import {
  CogIcon,
  TruckIcon,
  HomeIcon,
  UserGroupIcon,
  ClockIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  BanknotesIcon,
  ComputerDesktopIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  CameraIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldExclamationIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const [serviceAreas, setServiceAreas] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных из API
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Определяем язык для API запроса
        const apiLang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        
        // Получаем данные из API с учетом языка
        const response = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/about-us/structure/?lang=${apiLang}`);
        const data = await response.json();
        
        // Фильтруем организации, связанные со сферой услуг
        // Включаем несколько категорий, которые могут относиться к услугам в зависимости от языка
        const servicesCategories = {
          ru: ['Сферы услуг', 'Услуги', 'Медицина', 'Образование'],
          en: ['Services', 'Medicine', 'Education'],
          kg: ['Кызмат көрсөтүүлөр', 'Медицина', 'Билим берүү']
        };
        
        const currentLangCategories = servicesCategories[apiLang] || servicesCategories.ru;
        const servicesOrganizations = data.filter(org => 
          currentLangCategories.some(category => 
            org.category && org.category.includes(category)
          )
        );
        
        setServiceAreas(servicesOrganizations);
        
      } catch (error) {
        console.error('Error fetching services data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, [i18n.language]);

  // Отдельный useEffect для обновления преимуществ при смене языка
  useEffect(() => {
    const benefitsData = t('services.activities.benefits.items', { returnObjects: true }) || [];
    
    const formattedBenefits = benefitsData.map((item, index) => ({
      icon: [ClockIcon, ShieldCheckIcon, CreditCardIcon, PhoneIcon, UsersIcon, ShieldExclamationIcon][index] || CheckCircleIcon,
      text: item.text,
      gradient: [
        'from-blue-500 to-blue-600',
        'from-emerald-500 to-emerald-600',
        'from-violet-500 to-violet-600',
        'from-amber-500 to-amber-600',
        'from-rose-500 to-rose-600',
        'from-indigo-500 to-indigo-600'
      ][index]
    }));
    
    setBenefits(formattedBenefits);
  }, [i18n.language, t]);

  if (loading) {
    return (
      <>
        <SEO 
          title="Сфера услуг и торговля | Ассоциация Дордой"
          description="Торговля, логистика, безопасность и сфера услуг Ассоциации Дордой. Рынки, торговые центры, цифровые услуги и консалтинг. Комплексные решения для бизнеса."
          keywords="услуги Дордой, торговля, логистика, безопасность, консалтинг, цифровые услуги, Ассоциация Дордой деятельность"
        />
        <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="text-blue-600 text-sm font-semibold">{t('services.activities.hero.badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('services.activities.hero.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"></div>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
      </>
    );
  }

  return (
    <div className="relative">
      {/* Hero Banner Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(30,64,175,0.3)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.2)_0%,_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Бейдж */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 group"
            >
              <CogIcon className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-blue-100">
                {t('services.activities.hero.badge')}
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('services.activities.hero.title').split(' — ')[0]} —{' '}
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {t('services.activities.hero.title').split(' — ')[1]}
              </span>
            </h1>
            
            {/* Подзаголовок */}
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('services.activities.hero.subtitle')}
            </p>
            
            {/* Краткое описание */}
            <p className="text-lg text-blue-200/80 mb-12 max-w-3xl mx-auto">
              {t('services.activities.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Блок "О сфере услуг" */}
      <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Текстовая часть */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    {t('services.activities.about.sectionTitle')}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {t('services.activities.about.title').split(' — ')[0]} —{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {t('services.activities.about.title').split(' — ')[1]}
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  {t('services.activities.about.description1')}
                </p>
                
                <p>
                  {t('services.activities.about.description2')}
                </p>
                
                <p>
                  {t('services.activities.about.description3')}
                </p>
              </div>
            </div>
            
            {/* Изображения */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Основное изображение */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="col-span-2 relative group overflow-hidden rounded-2xl shadow-xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2126"
                    alt="Рабочие процессы и обслуживание клиентов"
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg">Профессиональное обслуживание</p>
                    <p className="text-sm text-slate-200">Мастера за работой</p>
                  </div>
                </motion.div>
                
                {/* Второстепенные изображения */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2040"
                    alt="Сервисные точки"
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
                    alt="Техника и инструменты"
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Основные направления услуг */}
      <section className="relative py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="text-blue-600 text-sm font-semibold">
                {t('services.activities.directions.badge')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('services.activities.directions.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6"></div>
            
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center mt-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 border border-red-200">
                <span className="text-red-600 text-sm font-semibold">
                  {t('common.error', 'Ошибка загрузки данных')}
                </span>
              </div>
            </div>
          )}

          {/* Карточки организаций сферы услуг */}
          {!error && serviceAreas.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceAreas.map((organization, index) => (
                <motion.div
                  key={organization.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col min-h-[500px]"
                >
                  {/* Логотип организации */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={organization.logo || '/placeholder-logo.png'}
                      alt={organization.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/placeholder-logo.png';
                      }}
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Название организации */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {organization.name}
                    </h3>

                    {/* Краткое описание (первые 150 символов) */}
                    <div 
                      className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow"
                      dangerouslySetInnerHTML={{
                        __html: organization.description 
                          ? organization.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                          : t('common.noDescription', 'Описание недоступно')
                      }}
                    />

                    {/* Контактная информация */}
                    {organization.address && (
                      <div className="flex items-center text-slate-500 text-sm mb-2">
                        <HomeIcon className="w-4 h-4 mr-2" />
                        <span className="line-clamp-1">{organization.address}</span>
                      </div>
                    )}

                    {organization.phone && (
                      <div className="flex items-center text-slate-500 text-sm mb-4">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        <span>{organization.phone}</span>
                      </div>
                    )}

                    {/* Кнопка "Подробнее" */}
                    <Link
                      to={`/about/structure/${organization.slug}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-auto"
                    >
                      {t('common.moreDetails', 'Подробнее')}
                      <ChevronRightIcon className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Показать сообщение, если нет данных */}
          {!loading && !error && serviceAreas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                {t('services.noOrganizations', 'На данный момент информация о организациях сферы услуг недоступна')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;