

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  MagnifyingGlassIcon
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
  const [loading, setLoading] = useState(false);

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

      {/* Основные направления */}
      <section className="relative py-20 bg-gradient-to-b from-white to-red-50">
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
                {t('medicine.lead.title')}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('medicine.lead.description')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Medicine;