import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  SparklesIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
  LightBulbIcon,
  StarIcon,
  HeartIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const ProductionSection = () => {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Основные направления производства
  const productionAreas = t('production.activities.directions.items', { returnObjects: true }).map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    icon: [ScissorsIcon, SwatchIcon, CubeIcon, TruckIcon, BuildingOffice2Icon, ShieldCheckIcon][index],
    gradient: ['from-purple-500 to-violet-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-yellow-500', 'from-red-500 to-pink-500', 'from-indigo-500 to-purple-500'][index],
    features: item.features
  }));

  // Ценности производства
  const values = t('production.activities.values.items', { returnObjects: true }).map((item, index) => ({
    icon: [LightBulbIcon, StarIcon, HeartIcon, UsersIcon][index],
    title: item.title,
    description: item.description
  }));

  // Статистика
  const stats = t('production.activities.stats.items', { returnObjects: true }).map((item, index) => ({
    value: item.value,
    label: item.label,
    icon: [BuildingOffice2Icon, UsersIcon, Cog6ToothIcon, ClockIcon][index]
  }));

  // FAQ
  const faqs = t('production.activities.faq.items', { returnObjects: true }).map((item, index) => ({
    question: item.question,
    answer: item.answer,
    icon: [Cog6ToothIcon, ShieldCheckIcon, BanknotesIcon][index]
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(79,70,229,0.3)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(168,85,247,0.2)_0%,_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Анимированные частицы */}
          <div className="absolute top-1/4 right-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          <div className="absolute top-3/4 left-20 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center text-white"
          >
            {/* Бейдж */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8 group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              <Cog6ToothIcon className="w-4 h-4 text-indigo-300" />
              <span className="text-sm font-semibold text-indigo-100">
                {t('production.activities.hero.badge')}
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {t('production.activities.hero.title').split(' — ')[0]} —{' '}
              <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                {t('production.activities.hero.title').split(' — ')[1]}
              </span>
            </motion.h1>
            
            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {t('production.activities.hero.subtitle')}
            </motion.p>
            
            {/* Краткое описание */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-indigo-200/80 mb-10 max-w-3xl mx-auto"
            >
              {t('production.activities.hero.description')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Блок "О производстве" */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Текстовая часть */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
                  <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                    {t('production.activities.about.sectionTitle')}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  {t('production.activities.about.title').split(' — ')[0]} — <span className="text-indigo-600">{t('production.activities.about.title').split(' — ')[1]}</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
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
              
              {/* Дополнительный блок */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
              >
                <p className="text-lg font-medium text-gray-800">
                  {t('production.activities.about.highlight')}
                </p>
              </motion.div>
            </motion.div>
            
            {/* Изображения */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Основное изображение */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="col-span-2 relative group overflow-hidden rounded-3xl shadow-2xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1565377962779-0c06e4e2a1c4?q=80&w=2070"
                    alt="Производственные цеха"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg">Современное производство</p>
                    <p className="text-sm text-gray-200">Швейные цеха в работе</p>
                  </div>
                </motion.div>
                
                {/* Второстепенные изображения */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070"
                    alt="Рабочие за станками"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Мастерство</p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2070"
                    alt="Готовая продукция"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Качество</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Основные направления производства */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('production.activities.directions.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('production.activities.directions.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productionAreas.map((area) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: area.id * 0.1 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setHoveredCard(area.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <motion.div 
                      animate={{ 
                        scale: hoveredCard === area.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 bg-gradient-to-br ${area.gradient} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                      {area.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {area.description}
                    </p>
                    
                    <div className="space-y-3">
                      {area.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <ChevronRightIcon className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductionSection;