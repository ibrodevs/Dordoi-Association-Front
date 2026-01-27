import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Cog6ToothIcon,
  BuildingOffice2Icon,
  UsersIcon,
  TruckIcon,
  ScissorsIcon,
  SwatchIcon,
  CubeIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
  LightBulbIcon,
  StarIcon,
  HeartIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BeakerIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const ProductionSection = () => {
  const { t, i18n } = useTranslation();
  const [productionAreas, setProductionAreas] = useState([]);
  const [values, setValues] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных из API
  useEffect(() => {
    const fetchProductionData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Определяем язык для API запроса
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        
        // Здесь можно добавить реальные API запросы
        // const data = await apiRequest(`production/?lang=${lang}`);
        
        // Временные данные из перевода
        const directions = t('production.activities.directions.items', { returnObjects: true });
        const valuesData = t('production.activities.values.items', { returnObjects: true });
        const statsData = t('production.activities.stats.items', { returnObjects: true });
        
        const iconMap = {
          0: ScissorsIcon,
          1: SwatchIcon,
          2: CubeIcon,
          3: TruckIcon,
          4: BuildingOffice2Icon,
          5: ShieldCheckIcon,
          6: BeakerIcon,
          7: CogIcon
        };
        
        const gradientMap = [
          'from-violet-500 to-purple-600',
          'from-blue-500 to-cyan-600',
          'from-emerald-500 to-green-600',
          'from-amber-500 to-orange-600',
          'from-rose-500 to-pink-600',
          'from-indigo-500 to-blue-600',
          'from-teal-500 to-emerald-600',
          'from-fuchsia-500 to-purple-600'
        ];
        
        const formattedProduction = directions.map((item, index) => ({
          id: index + 1,
          title: item.title,
          description: item.description,
          icon: iconMap[index] || Cog6ToothIcon,
          gradient: gradientMap[index] || 'from-blue-500 to-cyan-500',
          features: item.features || []
        }));
        
        const formattedValues = valuesData.map((item, index) => ({
          icon: [LightBulbIcon, StarIcon, HeartIcon, UsersIcon, ShieldCheckIcon, DocumentTextIcon][index] || StarIcon,
          title: item.title,
          description: item.description,
          gradient: [
            'from-violet-500 to-purple-500',
            'from-amber-500 to-orange-500',
            'from-rose-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-emerald-500 to-green-500',
            'from-indigo-500 to-blue-500'
          ][index]
        }));
        
        const formattedStats = statsData.map((item, index) => ({
          value: item.value,
          label: item.label,
          icon: [BuildingOffice2Icon, UsersIcon, Cog6ToothIcon, ClockIcon, ArrowTrendingUpIcon, ChartBarIcon][index],
          gradient: [
            'from-violet-500/20 to-violet-600/20',
            'from-blue-500/20 to-blue-600/20',
            'from-emerald-500/20 to-emerald-600/20',
            'from-amber-500/20 to-amber-600/20',
            'from-rose-500/20 to-rose-600/20',
            'from-indigo-500/20 to-indigo-600/20'
          ][index]
        }));
        
        setProductionAreas(formattedProduction);
        setValues(formattedValues);
        setStats(formattedStats);
        
      } catch (error) {
        console.error('Error fetching production data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductionData();
  }, [i18n.language, t]);

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
              <span className="text-indigo-600 text-sm font-semibold">{t('production.activities.hero.badge')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('production.activities.hero.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative">
      {/* Hero Banner Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(99,102,241,0.2)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(139,92,246,0.15)_0%,_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
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
              <Cog6ToothIcon className="w-5 h-5 text-violet-300" />
              <span className="text-sm font-semibold text-violet-100">
                {t('production.activities.hero.badge')}
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('production.activities.hero.title').split(' — ')[0]} —{' '}
              <span className="bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                {t('production.activities.hero.title').split(' — ')[1]}
              </span>
            </h1>
            
            {/* Подзаголовок */}
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('production.activities.hero.subtitle')}
            </p>
            
            {/* Краткое описание */}
            <p className="text-lg text-slate-300/80 mb-12 max-w-3xl mx-auto">
              {t('production.activities.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Блок "О производстве" */}
      <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Текстовая часть */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-violet-600 to-purple-600 rounded-full" />
                  <span className="text-sm font-semibold text-violet-600 uppercase tracking-wider">
                    {t('production.activities.about.sectionTitle')}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {t('production.activities.about.title').split(' — ')[0]} —{' '}
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    {t('production.activities.about.title').split(' — ')[1]}
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  {t('production.activities.about.description1')}
                </p>
                
                <p>
                  {t('production.activities.about.description2')}
                </p>
                
                <p>
                  {t('production.activities.about.description3')}
                </p>
              </div>
              
              {/* Ценности */}
              <div className="grid grid-cols-2 gap-4">
                {values.slice(0, 4).map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${value.gradient}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{value.title}</span>
                    </motion.div>
                  );
                })}
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
                    src="https://images.unsplash.com/photo-1565377962779-0c06e4e2a1c4?q=80&w=2070"
                    alt="Производственные цеха"
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg">Современное производство</p>
                    <p className="text-sm text-slate-200">Швейные цеха в работе</p>
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
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070"
                    alt="Рабочие за станками"
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
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2070"
                    alt="Готовая продукция"
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Основные направления производства */}
      <section className="relative py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-50 border border-violet-200 mb-6">
              <span className="text-violet-600 text-sm font-semibold">
                {t('production.activities.directions.badge')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t('production.activities.directions.title')}
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('production.activities.directions.subtitle')}
            </p>
          </div>

          {/* Сетка направлений */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productionAreas.map((area) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: area.id * 0.1 }}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-300/50"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 via-transparent to-purple-50/0 group-hover:from-violet-50/30 group-hover:to-purple-50/30 transition-all duration-500 rounded-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-violet-600 transition-colors duration-300 leading-tight">
                      {area.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {area.description}
                    </p>
                    
                    {/* Features */}
                    {area.features && area.features.length > 0 && (
                      <div className="space-y-3 mb-8">
                        {area.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
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

          {/* Ценности компании */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {t('production.activities.values.title')}
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t('production.activities.values.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-violet-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${value.gradient} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {value.description}
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

export default ProductionSection;