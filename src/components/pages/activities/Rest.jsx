

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  SparklesIcon,
  HeartIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  MapPinIcon,
  CalendarDaysIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  XMarkIcon,
  CameraIcon,
  MegaphoneIcon,
  HomeModernIcon,
  HomeIcon,
  PhoneIcon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon
} from '@heroicons/react/24/solid';

const Rest = () => {
  const { t, i18n } = useTranslation();
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка организаций отдыха из API
  useEffect(() => {
    const fetchLeisureOrganizations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Определяем язык для API запроса
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        
        // Загружаем организации из API
        const response = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/about-us/structure/?lang=${lang}`);
        const apiData = await response.json();
        
        // Определяем категории отдыха для разных языков
        const leisureCategories = {
          ru: ['Отдых', 'Культура'],
          en: ['Leisure', 'Culture'],
          kg: ['Эс алуу', 'Маданият']
        };
        
        // Фильтруем организации отдыха
        const leisureOrgs = apiData.filter(org => 
          leisureCategories[lang]?.includes(org.category)
        );
        
        setOrganizations(leisureOrgs);
        
      } catch (error) {
        console.error('Error fetching leisure organizations:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeisureOrganizations();
  }, [i18n.language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Данные из переводов с проверкой на массивы
  const directionsData = t('culture_leisure.directions', { returnObjects: true });
  const directions = Array.isArray(directionsData) ? directionsData : [];
  
  const activitiesData = t('culture_leisure.activities', { returnObjects: true });
  const activities = activitiesData && typeof activitiesData === 'object' ? activitiesData : {};
  
  const impactsData = t('culture_leisure.impacts', { returnObjects: true });
  const impacts = Array.isArray(impactsData) ? impactsData : [];
  
  const benefitsData = t('culture_leisure.benefits', { returnObjects: true });
  const benefits = benefitsData && typeof benefitsData === 'object' ? benefitsData : {};

  // Иконки для направлений
  const activityIcons = {
    events: CalendarDaysIcon,
    traditions: PaintBrushIcon,
    spaces: MapPinIcon,
    entertainment: BuildingStorefrontIcon
  };

  const activityColors = {
    events: 'purple',
    traditions: 'amber',
    spaces: 'green',
    entertainment: 'blue'
  };

  const benefitIcons = {
    visitors: UserGroupIcon,
    artists: MusicalNoteIcon,
    partners: GlobeAltIcon
  };

  return (
    <div className="relative">
      {/* Hero Banner Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(147,51,234,0.2)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(219,39,119,0.15)_0%,_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Бейдж */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
            >
              <SparklesIcon className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-purple-100">
                {t('culture_leisure.hero.badge')}
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                {t('culture_leisure.hero.title')}
              </span>
            </motion.h1>
            
            {/* Подзаголовок */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {t('culture_leisure.subtitle')}
            </motion.p>

            {/* Описание */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-purple-300/80 mb-12 max-w-5xl mx-auto leading-relaxed"
            >
              {t('culture_leisure.intro')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Организации сферы отдыха */}
      <section className="relative py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-6">
              <SparklesIcon className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-purple-600 text-sm font-semibold">
                {i18n.language === 'en' ? 'Our Leisure Organizations' : 
                 i18n.language === 'kg' ? 'Биздин эс алуу уюмдары' : 
                 'Наши организации отдыха'}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {i18n.language === 'en' ? 'Leisure & Culture Organizations' : 
               i18n.language === 'kg' ? 'Эс алуу жана маданият уюмдары' : 
               'Организации отдыха и культуры'}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {i18n.language === 'en' ? 'Entertainment, leisure and cultural organizations that are part of the Dordoi Association' : 
               i18n.language === 'kg' ? '"Дордой" Ассоциациясынын курамына кирген көңүл ачуу, эс алуу жана маданий уюмдар' : 
               'Развлекательные, досуговые и культурные организации, входящие в состав Ассоциации "Дордой"'}
            </p>
          </div>

          {/* Сетка организаций */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : organizations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {organizations.map((org) => (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="group h-full"
                >
                  <Link
                    to={`/about/structure/${org.slug}`}
                    className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200/60 hover:border-purple-300/50"
                  >
                    <div className="flex-1 flex flex-col p-8">
                      {/* Иконка */}
                      <div className="mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                          <SparklesIcon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Название */}
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors duration-300 leading-tight line-clamp-2 min-h-[3.5rem]">
                        {org.name}
                      </h3>
                      
                      {/* Контактная информация */}
                      <div className="space-y-3 text-sm text-slate-600 flex-1">
                        {org.address && (
                          <div className="flex items-start gap-3">
                            <HomeIcon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">{org.address}</span>
                          </div>
                        )}
                        
                        {org.phone && (
                          <div className="flex items-center gap-3">
                            <PhoneIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span>{org.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Кнопка перехода */}
                      <div className="mt-6 flex items-center text-purple-600 font-semibold text-sm group-hover:text-purple-700 transition-colors duration-300">
                        <span>
                          {i18n.language === 'en' ? 'Learn More' : 
                           i18n.language === 'kg' ? 'Толугураак' : 
                           'Подробнее'}
                        </span>
                        <ArrowUpRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Нижняя акцентная линия */}
                    <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-slate-50 border border-slate-200">
                <SparklesIcon className="w-5 h-5 text-slate-400 mr-2" />
                <span className="text-slate-600 font-medium">
                  {t('common.noOrganizationsLeisure', 'Организации сферы отдыха не найдены')}
                </span>
              </div>
            </div>
          )}

          {/* Сообщение об ошибке */}
          {error && (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-50 border border-red-200">
                <span className="text-red-600 font-medium">
                  {t('common.error', 'Ошибка загрузки данных')}: {error}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rest;