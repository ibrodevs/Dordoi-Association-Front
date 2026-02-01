

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../../SEO';
import {
  HeartIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  TruckIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  CheckCircleIcon,
  ChartBarIcon,
  StarIcon,
  ArrowRightIcon,
  PlusIcon,
  XMarkIcon,
  BeakerIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/react/24/solid';

const Medicine = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('centers');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка медицинских организаций из API
  useEffect(() => {
    const fetchMedicalOrganizations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Определяем язык для API запроса
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        
        // Загружаем организации из API
        const response = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/about-us/structure/?lang=${lang}`);
        const apiData = await response.json();
        
        // Определяем категории медицины для разных языков
        const medicalCategories = {
          ru: ['Медицина'],
          en: ['Healthcare'],
          kg: ['Саламаттык сактоо']
        };
        
        // Фильтруем медицинские организации
        const medicalOrgs = apiData.filter(org => 
          medicalCategories[lang]?.includes(org.category)
        );
        
        setOrganizations(medicalOrgs);
        
      } catch (error) {
        console.error('Error fetching medical organizations:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalOrganizations();
  }, [i18n.language]);

  const tabs = [
    { id: 'centers', label: t('medicine.tabs.centers'), icon: BuildingOffice2Icon },
    { id: 'pandemic', label: t('medicine.tabs.pandemic'), icon: ShieldCheckIcon },
    { id: 'social', label: t('medicine.tabs.social'), icon: UserGroupIcon },
    { id: 'research', label: t('medicine.tabs.research'), icon: BeakerIcon }
  ];

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

  const centers = t('medicine.centers', { returnObjects: true });
  const pandemicActions = t('medicine.pandemic.actions', { returnObjects: true });
  const socialPrograms = t('medicine.socialPrograms', { returnObjects: true });
  const leadStats = t('medicine.lead.stats', { returnObjects: true });

  return (
    <>
      <SEO 
        title="Медицина и здравоохранение | Ассоциация Дордой"
        description="Медицинские проекты Ассоциации Дордой: Dordoi Ophthalmic Service, клиники, социальные программы. Вклад в борьбу с пандемией и здоровье нации."
        keywords="медицина Дордой, Dordoi Ophthalmic Service, здравоохранение, офтальмология, социальные проекты, клиника Дордой"
      />
      <div className="relative">
      {/* Hero Banner Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-900 via-pink-900 to-red-800 overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(244,63,94,0.2)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.15)_0%,_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent" />
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
              <HeartIcon className="w-5 h-5 text-red-300" />
              <span className="text-sm font-semibold text-red-100">
                {t('medicine.badge')}
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {t('medicine.title')}{' '}
              <span className="bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                {t('medicine.titleHighlight')}
              </span>
            </motion.h1>
            
            {/* Подзаголовок */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-red-200 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              {t('medicine.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Медицинские организации */}
      <section className="relative py-20 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-6">
              <HeartIcon className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 text-sm font-semibold">
                {i18n.language === 'en' ? 'Our Medical Institutions' : 
                 i18n.language === 'kg' ? 'Биздин медициналык мекемелер' : 
                 'Наши медицинские учреждения'}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {i18n.language === 'en' ? 'Medical Organizations' : 
               i18n.language === 'kg' ? 'Медициналык уюмдар' : 
               'Организации медицинской сферы'}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {i18n.language === 'en' ? 'Medical institutions and healthcare organizations that are part of the Dordoi Association' : 
               i18n.language === 'kg' ? '"Дордой" Ассоциациясынын курамына кирген медициналык мекемелер жана саламаттык сактоо уюмдары' : 
               'Медицинские учреждения и организации здравоохранения, входящие в состав Ассоциации "Дордой"'}
            </p>
          </div>

          {/* Сетка организаций */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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
                    className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200/60 hover:border-red-300/50"
                  >
                    <div className="flex-1 flex flex-col p-8">
                      {/* Логотип организации */}
                      {org.logo ? (
                        <div className="mb-6 h-40 overflow-hidden rounded-xl">
                          <img
                            src={org.logo}
                            alt={org.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          {/* Fallback иконка */}
                          <div className="hidden w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                            <HeartIcon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                      ) : (
                        /* Иконка */
                        <div className="mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                            <HeartIcon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                      )}
                      
                      {/* Название */}
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors duration-300 leading-tight line-clamp-2 min-h-[3.5rem]">
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
                      <div className="mt-6">
                        <div className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:-translate-y-1 group-hover:from-red-600 group-hover:to-pink-700">
                          <span>
                            {i18n.language === 'en' ? 'Learn More' : 
                             i18n.language === 'kg' ? 'Толугураак' : 
                             'Подробнее'}
                          </span>
                          <ArrowUpRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Нижняя акцентная линия */}
                    <div className="h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-slate-50 border border-slate-200">
                <HeartIcon className="w-5 h-5 text-slate-400 mr-2" />
                <span className="text-slate-600 font-medium">
                  {t('common.noOrganizationsMedical', 'Медицинские организации не найдены')}
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

export default Medicine;