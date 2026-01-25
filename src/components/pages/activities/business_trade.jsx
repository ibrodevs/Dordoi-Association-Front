import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  ArrowRightIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  BanknotesIcon,
  ComputerDesktopIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  PhotoIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

const ServicesSection = () => {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Основные направления услуг
  const serviceAreas = t('services.activities.directions.items', { returnObjects: true }).map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    icon: [TruckIcon, WrenchScrewdriverIcon, BanknotesIcon, HomeIcon, ComputerDesktopIcon, UserGroupIcon][index],
    gradient: ['from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-violet-500', 'from-orange-500 to-yellow-500', 'from-indigo-500 to-blue-500', 'from-pink-500 to-rose-500'][index],
    features: item.features
  }));

  // Преимущества для клиентов
  const benefits = t('services.activities.benefits.items', { returnObjects: true }).map((item, index) => ({
    icon: [ClockIcon, ShieldCheckIcon, CreditCardIcon, PhoneIcon][index],
    text: item.text,
    gradient: ['from-blue-400 to-blue-500', 'from-green-400 to-green-500', 'from-purple-400 to-purple-500', 'from-orange-400 to-orange-500'][index]
  }));

  // FAQ
  const faqs = t('services.activities.faq.items', { returnObjects: true }).map((item, index) => ({
    question: item.question,
    answer: item.answer,
    icon: [CogIcon, WrenchScrewdriverIcon, BanknotesIcon][index]
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(0,0,254,0.3)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.2)_0%,_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Анимированные частицы */}
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-20 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-1000" />
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
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              <CogIcon className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-blue-100">
                {t('services.activities.hero.badge')}
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {t('services.activities.hero.title').split(' — ')[0]} —{' '}
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                {t('services.activities.hero.title').split(' — ')[1]}
              </span>
            </motion.h1>
            
            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {t('services.activities.hero.subtitle')}
            </motion.p>
            
            {/* Краткое описание */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-blue-200/80 mb-10 max-w-3xl mx-auto"
            >
              {t('services.activities.hero.description')}
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* Блок "О сфере услуг" */}
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
                  <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    {t('services.activities.about.sectionTitle')}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  {t('services.activities.about.title').split(' — ')[0]} — <span className="text-blue-600">{t('services.activities.about.title').split(' — ')[1]}</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
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
              
              {/* Дополнительный блок */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
              >
                <p className="text-lg font-medium text-gray-800">
                  {t('services.activities.about.highlight')}
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
                    src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2126"
                    alt="Рабочие процессы и обслуживание клиентов"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg">Профессиональное обслуживание</p>
                    <p className="text-sm text-gray-200">Мастера за работой</p>
                  </div>
                </motion.div>
                
                {/* Второстепенные изображения */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2040"
                    alt="Сервисные точки"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Консультации</p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
                    alt="Техника и инструменты"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Современные технологии</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Основные направления услуг */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('services.activities.directions.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('services.activities.directions.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.id * 0.1 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <motion.div 
                      animate={{ 
                        scale: hoveredCard === service.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <ChevronRightIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
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

export default ServicesSection;