import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  AcademicCapIcon,
  GlobeAltIcon,
  BookOpenIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  StarIcon,
  LightBulbIcon,
  TrophyIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline';

const ActivitiesEducation = () => {
  const { t, i18n } = useTranslation();
  const [educationDirections, setEducationDirections] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных из API
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Определяем язык для API запроса
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        
        // Здесь можно добавить реальные API запросы
        // const data = await apiRequest(`education/?lang=${lang}`);
        
        // Временные данные из перевода
        const directions = t('education.activities.directions.items', { returnObjects: true });
        const benefitsData = t('education.activities.benefits.items', { returnObjects: true });
        
        const iconMap = {
          0: BuildingLibraryIcon,
          1: BeakerIcon,
          2: ComputerDesktopIcon,
          3: GlobeAltIcon,
          4: BookOpenIcon,
          5: UserGroupIcon
        };
        
        const gradientMap = [
          'from-blue-500 to-indigo-600',
          'from-emerald-500 to-green-600',
          'from-purple-500 to-violet-600',
          'from-amber-500 to-orange-600',
          'from-rose-500 to-pink-600',
          'from-teal-500 to-cyan-600'
        ];
        
        const formattedDirections = directions.map((item, index) => ({
          id: index + 1,
          title: item.title,
          description: item.description,
          icon: iconMap[index] || AcademicCapIcon,
          gradient: gradientMap[index] || 'from-blue-500 to-indigo-500',
          link: ['/', '/', '/', '/', '/', '/'][index],
          features: item.features || []
        }));
        
        const formattedBenefits = benefitsData.map((item, index) => ({
          icon: [StarIcon, TrophyIcon, GlobeAltIcon, UserGroupIcon, LightBulbIcon, AcademicCapIcon, ChartBarIcon, DocumentTextIcon][index],
          title: item.title,
          description: item.description,
          gradient: [
            'from-blue-500 to-blue-600',
            'from-amber-500 to-amber-600',
            'from-emerald-500 to-emerald-600',
            'from-violet-500 to-violet-600',
            'from-rose-500 to-rose-600',
            'from-indigo-500 to-indigo-600',
            'from-cyan-500 to-cyan-600',
            'from-purple-500 to-purple-600'
          ][index]
        }));
        
        // Статистика для hero секции
        const formattedStats = [
          { value: '100+', label: t('education.stats.programs') },
          { value: '50+', label: t('education.stats.teachers') },
          { value: '2000+', label: t('education.stats.students') },
          { value: '95%', label: t('education.stats.success') }
        ];
        
        setEducationDirections(formattedDirections);
        setBenefits(formattedBenefits);
        setStats(formattedStats);
        
      } catch (error) {
        console.error('Error fetching education data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, [i18n.language, t]);

  const handleDirectionClick = (link) => {
    if (link && link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      console.log('Internal link:', link);
    }
  };

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="text-blue-600 text-sm font-semibold">{t('education.activities.hero.badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('education.activities.hero.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6"></div>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative">
      {/* Hero Banner Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(59,130,246,0.2)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.15)_0%,_transparent_50%)]" />
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
              <AcademicCapIcon className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-blue-100">
                {t('education.activities.hero.badge')}
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('education.activities.hero.title').split(' — ')[0]} —{' '}
              <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                {t('education.activities.hero.title').split(' — ')[1]}
              </span>
            </h1>
            
            {/* Подзаголовок */}
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('education.activities.hero.subtitle')}
            </p>
            
            {/* Краткое описание */}
            <p className="text-lg text-slate-300/80 mb-12 max-w-3xl mx-auto">
              {t('education.activities.hero.description')}
            </p>

            
          </div>
        </div>
      </section>

      {/* Блок "О сфере образования" */}
      <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Текстовая часть */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    {t('education.activities.about.sectionTitle')}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {t('education.activities.about.title').split(' — ')[0]} —{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {t('education.activities.about.title').split(' — ')[1]}
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  {t('education.activities.about.description1')}
                </p>
                
                <p>
                  {t('education.activities.about.description2')}
                </p>
                
                <p>
                  {t('education.activities.about.description3')}
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
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070"
                    alt="Студенты на занятиях"
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg">Современные аудитории</p>
                    <p className="text-sm text-slate-200">Интерактивное обучение</p>
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
                    src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=2070"
                    alt="Лаборатории"
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
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070"
                    alt="Выпускники"
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Основные направления обучения */}
      <section className="relative py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="text-blue-600 text-sm font-semibold">
                {t('education.activities.directions.badge')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('education.activities.directions.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('education.activities.directions.subtitle')}
            </p>
          </div>

          {/* Сетка направлений */}
          <div className="grid md:grid-cols-2 gap-8">
            {educationDirections.map((direction) => {
              const Icon = direction.icon;
              return (
                <motion.div
                  key={direction.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: direction.id * 0.1 }}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-300/50 cursor-pointer"
                  onClick={() => handleDirectionClick(direction.link)}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-indigo-50/0 group-hover:from-blue-50/30 group-hover:to-indigo-50/30 transition-all duration-500 rounded-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${direction.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {direction.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {direction.description}
                    </p>
                    
                    {/* Features */}
                    {direction.features && direction.features.length > 0 && (
                      <div className="space-y-3 mb-8">
                        {direction.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.div>
              );
            })}
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

          {/* Преимущества образования */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {t('education.activities.benefits.title')}
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t('education.activities.benefits.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.slice(0, 8).map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group text-center bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          
        </div>
      </section>
    </div>
  );
};

export default ActivitiesEducation;