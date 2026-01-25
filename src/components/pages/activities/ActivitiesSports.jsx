import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Trophy, 
  Target, 
  Users, 
  Building, 
  Heart, 
  Award,
  Calendar,
  Star,
  ChevronRight,
  ExternalLink,
  Shield,
  Zap,
  PlayCircle,
  TrendingUp,
  Activity,
  Medal,
  Flame
} from 'lucide-react';

const ActivitiesSports = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [activeFaq, setActiveFaq] = useState(null);

  // Роль ФК "Дордой" в спортивной экосистеме
  const fcRoles = [
    {
      title: t('activities.sports.fcRoles.development'),
      icon: <Trophy className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: t('activities.sports.fcRoles.youthSupport'),
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: t('activities.sports.fcRoles.sportsCulture'),
      icon: <Medal className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: t('activities.sports.fcRoles.communityEngagement'),
      icon: <Heart className="w-6 h-6" />,
      color: "from-red-500 to-red-600"
    }
  ];

  // Массовый и любительский спорт
  const massivesSportActivities = [
    t('activities.sports.massiveSport.corporateTournaments'),
    t('activities.sports.massiveSport.amateurCompetitions'),
    t('activities.sports.massiveSport.sportsInitiatives'),
    t('activities.sports.massiveSport.healthyLifestyle')
  ];

  // Спортивные мероприятия
  const sportEvents = [
    {
      title: t('activities.sports.events.festivals'),
      icon: <Award className="w-6 h-6" />
    },
    {
      title: t('activities.sports.events.tournaments'),
      icon: <Trophy className="w-6 h-6" />
    },
    {
      title: t('activities.sports.events.friendlyMatches'),
      icon: <PlayCircle className="w-6 h-6" />
    },
    {
      title: t('activities.sports.events.corporateCompetitions'),
      icon: <Users className="w-6 h-6" />
    }
  ];

  // Ценности спортивного направления
  const sportValues = [
    {
      title: t('activities.sports.values.healthyLifestyle'),
      icon: <Heart className="w-6 h-6" />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: t('activities.sports.values.teamSpirit'),
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: t('activities.sports.values.discipline'),
      icon: <Shield className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: t('activities.sports.values.willToWin'),
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: t('activities.sports.values.sportsSupport'),
      icon: <Activity className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen bg-white overflow-hidden">
      {/* Hero Banner */}
      <div className="relative h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Floating orbs */}
          <motion.div 
            className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          
          {/* Geometric shapes */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-32 h-32 border border-blue-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-blue-300/20 rotate-45"
            animate={{ rotate: [45, 405] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 text-sm font-semibold">
              <Trophy className="w-4 h-4" />
              {t('activities.sports.hero.badge')}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {t('activities.sports.hero.title')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              {t('activities.sports.hero.titleHighlight')}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('activities.sports.hero.description')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>

      {/* About Us Section */}
      <div className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t('activities.sports.about.title')}
              </h2>
              
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed">
                  {t('activities.sports.about.description1')}
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  {t('activities.sports.about.description2')}
                </p>
              </div>
            </motion.div>

            {/* Image grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl aspect-square flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Trophy className="w-16 h-16 text-blue-600" />
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl aspect-square flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="w-16 h-16 text-green-600" />
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl aspect-square flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Target className="w-16 h-16 text-purple-600" />
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl aspect-square flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className="w-16 h-16 text-orange-600" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Профессиональный спорт: ФК "Дордой" */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-semibold mb-6">
                🟦 {t('activities.sports.professional.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('activities.sports.professional.title')}
              </h3>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  {t('activities.sports.professional.description1')}
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  {t('activities.sports.professional.description2')}
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://fc-dordoi.kg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    <span>{t('activities.sports.professional.clubWebsite')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="w-8 h-8" />
                    <h4 className="text-2xl font-bold">{t('activities.sports.professional.achievements')}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold mb-2">12+</div>
                      <div className="text-sm">{t('activities.sports.professional.championshipTitles')}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold mb-2">8+</div>
                      <div className="text-sm">{t('activities.sports.professional.countryCups')}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Роль ФК "Дордой" в спортивной экосистеме */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-600 text-sm font-semibold mb-6">
                🟦 {t('activities.sports.fcRole.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('activities.sports.fcRole.title')}
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {t('activities.sports.fcRole.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fcRoles.map((role, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mb-4 mx-auto text-white`}>
                    {role.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {role.title}
                  </h4>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-12 text-center">
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 max-w-3xl mx-auto">
                  {t('activities.sports.fcRole.successMessage')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Массовый и любительский спорт */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-purple-600 text-sm font-semibold mb-6">
                🟦 {t('activities.sports.massiveSport.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('activities.sports.massiveSport.title')}
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {t('activities.sports.massiveSport.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {massivesSportActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">{activity}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-12 text-center">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 border border-purple-100">
                <Activity className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <p className="text-gray-700 max-w-3xl mx-auto">
                  {t('activities.sports.massiveSport.conclusionMessage')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Спортивные мероприятия и инициативы */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-sm font-semibold mb-6">
                🟦 {t('activities.sports.events.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('activities.sports.events.title')}
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {t('activities.sports.events.description')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sportEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-200 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <div className="text-orange-600">
                      {event.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {event.title}
                  </h4>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-12 text-center">
              <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100">
                <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                <p className="text-gray-700 max-w-3xl mx-auto">
                  {t('activities.sports.events.conclusionMessage')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Ценности спортивного направления */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-32"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-semibold mb-6">
                🟦 {t('activities.sports.values.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('activities.sports.values.title')}
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {sportValues.map((value, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-4 mx-auto text-white`}>
                    {value.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {value.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Завершающий блок */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white shadow-2xl"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Flame className="w-10 h-10" />
                <h3 className="text-3xl md:text-4xl font-bold">
                  {t('activities.sports.conclusion.title')}
                </h3>
              </div>
              
              <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                {t('activities.sports.conclusion.description')}
              </p>
              
              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-blue-300" />
                  <span className="text-blue-100">{t('activities.sports.conclusion.achievements')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-300" />
                  <span className="text-blue-100">{t('activities.sports.conclusion.community')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-blue-300" />
                  <span className="text-blue-100">{t('activities.sports.conclusion.development')}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSports;