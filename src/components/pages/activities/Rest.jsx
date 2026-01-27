

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  HomeModernIcon
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon
} from '@heroicons/react/24/solid';

const Rest = () => {
  const { t } = useTranslation();
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);

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

      {/* Основные направления */}
      <section className="relative py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Заголовок секции */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t('culture_leisure.mainDirections')}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                {t('culture_leisure.mainDirectionsDescription')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Rest;