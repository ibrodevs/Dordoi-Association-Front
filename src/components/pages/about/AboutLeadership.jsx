import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../../api';

const AboutLeadership = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t, i18n } = useTranslation();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных из API
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await apiRequest(`about-us/leaders/?lang=${i18n.language}`);
        let leadersArray = [];
        if (data.results && Array.isArray(data.results)) {
          leadersArray = data.results;
        } else if (Array.isArray(data)) {
          leadersArray = data;
        } else {
          console.error('Unexpected API response structure:', data);
          setLeaders([]);
          return;
        }
        setLeaders(leadersArray);
      } catch (error) {
        console.error('Error fetching leaders:', error);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, [i18n.language]);

  // Генерация градиента на основе имени
  const generateGradient = (name) => {
    const colors = [
      'from-blue-500 via-purple-500 to-cyan-500',
      'from-emerald-500 via-teal-500 to-green-500',
      'from-orange-500 via-red-500 to-pink-500',
      'from-violet-500 via-purple-500 to-fuchsia-500',
      'from-amber-500 via-yellow-500 to-orange-500',
      'from-sky-500 via-blue-500 to-cyan-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  // Получение инициалов для аватара
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const stats = [
    { value: t('leadership.stats.experience.value'), label: t('leadership.stats.experience.label') },
    { value: t('leadership.stats.projects.value'), label: t('leadership.stats.projects.label') },
    { value: t('leadership.stats.teams.value'), label: t('leadership.stats.teams.label') },
    { value: t('leadership.stats.awards.value'), label: t('leadership.stats.awards.label') }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/files/leadership-list.pdf';
    link.download = 'leadership-list.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLeaderModal = (leader) => {
    setSelectedLeader(leader);
  };

  const closeLeaderModal = () => {
    setSelectedLeader(null);
  };

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Улучшенный анимированный фон */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full blur-3xl"
        />
      </div>

      {/* Декоративные сетки */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#000_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции с табами */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent"
          >
            {t('leadership.title')}
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-30 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mx-auto mb-8 shadow-lg"
          />

          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            {t('leadership.subtitle')}
          </motion.p>
        </motion.div>

        {/* Сетка карточек руководства */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}
          {!loading && (
            <>
              {/* Первые 2 карточки - вертикально */}
              {leaders.length > 0 && (
                <div className="flex flex-col gap-12 max-w-2xl mx-auto mb-8">
                  {leaders.slice(0, 2).map((leader, idx) => {
                    const index = idx;
                    return (
                      <motion.div
                        key={leader.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileHover="hover"
                        className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/60 overflow-hidden cursor-pointer"
                        onClick={() => openLeaderModal(leader)}
                      >
                        <div className="relative p-12">
                          <div className="flex flex-col lg:flex-row gap-12">
                            {/* Аватар руководителя с градиентом */}
                            <motion.div
                              className="flex-shrink-0 relative"
                              whileHover={{ scale: 1.05, rotate: 2 }}
                              transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            >
                              {leader.photo ? (
                                <img
                                  src={leader.photo}
                                  alt={leader.name}
                                  className="w-full h-48 rounded-3xl object-contain shadow-2xl group-hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-slate-50 to-slate-100"
                                />
                              ) : (
                                <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${generateGradient(leader.name)} relative overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500`}>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold tracking-wider">
                                      {getInitials(leader.name)}
                                    </span>
                                  </div>
                                  
                                  {/* Анимированные элементы */}
                                  <motion.div
                                    className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"
                                    animate={{ 
                                      scale: [1, 1.2, 1],
                                      rotate: [0, 180, 360]
                                    }}
                                    transition={{ 
                                      duration: 4, 
                                      repeat: Infinity, 
                                      ease: "easeInOut",
                                      delay: index * 0.5 
                                    }}
                                  />
                                  
                                  <motion.div
                                    className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full"
                                    animate={{ 
                                      scale: [1, 1.5, 1],
                                      opacity: [0.5, 0.8, 0.5]
                                    }}
                                    transition={{ 
                                      duration: 3, 
                                      repeat: Infinity,
                                      delay: index * 0.7 
                                    }}
                                  />
                                </div>
                              )}
                              
                              {/* Статус онлайн */}
                              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg">
                                <motion.div
                                  className="w-full h-full rounded-full bg-green-400"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                            </motion.div>

                            {/* Информация о руководителе */}
                            <div className="flex-1 min-w-0">
                              <motion.h3 
                                className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-500"
                                whileHover={{ x: 5 }}
                              >
                                {leader.name}
                              </motion.h3>
                              
                              <motion.p 
                                className="text-blue-600 font-semibold mb-4 inline-flex items-center px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 text-sm shadow-sm group-hover:shadow-md transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                                {leader.position}
                              </motion.p>

                              <motion.p 
                                className="text-slate-600 leading-relaxed mb-6 text-base font-light line-clamp-3"
                                whileHover={{ x: 3 }}
                              >
                                {leader.bio}
                              </motion.p>

                              {/* Ключевые достижения */}
                              {leader.achievements && leader.achievements.length > 0 && (
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-slate-900 flex items-center">
                                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {t('leadership.achievementsTitle')}
                                  </h4>
                                  <ul className="space-y-2">
                                    {leader.achievements.slice(0, 3).map((achievement, achievementIndex) => (
                                      <motion.li 
                                        key={achievementIndex}
                                        className="flex items-start text-sm text-slate-600 group/achievement"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + achievementIndex * 0.1 }}
                                        whileHover={{ x: 5 }}
                                      >
                                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover/achievement:scale-150 transition-transform duration-300" />
                                        <span className="font-medium">{achievement}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Индикатор клика */}
                          <motion.div 
                            className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-slate-500 text-sm font-medium"
                            whileHover={{ x: 5 }}
                          >
                            {t('leadership.viewDetails')}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.div>
                        </div>

                        {/* Градиентная полоса внизу */}
                        <motion.div 
                          className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-700 ease-out"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Остальные карточки - по 2 в ряд */}
              {leaders.length > 2 && (
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                  {leaders.slice(2).map((leader, idx) => {
                    const index = idx + 2;
                    return (
                <motion.div
                  key={leader.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/60 overflow-hidden cursor-pointer"
                  onClick={() => openLeaderModal(leader)}
                >
                  <div className="relative p-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                      {/* Аватар руководителя с градиентом */}
                      <motion.div
                        className="flex-shrink-0 relative"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        {leader.photo ? (
                          <img
                            src={leader.photo}
                            alt={leader.name}
                            className="w-full h-40 rounded-3xl object-contain shadow-2xl group-hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-slate-50 to-slate-100"
                          />
                        ) : (
                          <div className={`w-full h-40 rounded-3xl bg-gradient-to-br ${generateGradient(leader.name)} relative overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white text-4xl font-bold tracking-wider">
                                {getInitials(leader.name)}
                              </span>
                            </div>
                            
                            {/* Анимированные элементы */}
                            <motion.div
                              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360]
                              }}
                              transition={{ 
                                duration: 4, 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: index * 0.5 
                              }}
                            />
                            
                            <motion.div
                              className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0.8, 0.5]
                              }}
                              transition={{ 
                                duration: 3, 
                                repeat: Infinity,
                                delay: index * 0.7 
                              }}
                            />
                          </div>
                        )}
                        
                        {/* Статус онлайн */}
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg">
                          <motion.div
                            className="w-full h-full rounded-full bg-green-400"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>

                      {/* Информация о руководителе */}
                      <div className="flex-1 min-w-0">
                        <motion.h3 
                          className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-500"
                          whileHover={{ x: 5 }}
                        >
                          {leader.name}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-blue-600 font-semibold mb-4 inline-flex items-center px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 text-sm shadow-sm group-hover:shadow-md transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                          {leader.position}
                        </motion.p>

                        <motion.p 
                          className="text-slate-600 leading-relaxed mb-6 text-base font-light line-clamp-3"
                          whileHover={{ x: 3 }}
                        >
                          {leader.bio}
                        </motion.p>

                        {/* Ключевые достижения */}
                        {leader.achievements && leader.achievements.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-900 flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {t('leadership.achievementsTitle')}
                            </h4>
                            <ul className="space-y-2">
                              {leader.achievements.slice(0, 3).map((achievement, achievementIndex) => (
                                <motion.li 
                                  key={achievementIndex}
                                  className="flex items-start text-sm text-slate-600 group/achievement"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 + achievementIndex * 0.1 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover/achievement:scale-150 transition-transform duration-300" />
                                  <span className="font-medium">{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Индикатор клика */}
                    <motion.div 
                      className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-slate-500 text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      {t('leadership.viewDetails')}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Градиентная полоса внизу */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-700 ease-out"
                  />
                </motion.div>
                    );
                  })}
                </div>
              )}
            </>
          )}
          </motion.div>
      </div>

      {/* Модальное окно с детальной информацией */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLeaderModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-8">
                <button
                  onClick={closeLeaderModal}
                  className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <svg className="w-5 h-5 text-slate-600 group-hover:text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Фотография по центру сверху */}
                <div className="flex justify-center mb-8">
                  {selectedLeader.photo ? (
                    <img
                      src={selectedLeader.photo}
                      alt={selectedLeader.name}
                      className="w-full h-full rounded-3xl object-contain shadow-2xl"
                    />
                  ) : (
                    <div className={`w-full h-72 rounded-3xl bg-gradient-to-br ${generateGradient(selectedLeader.name)} relative overflow-hidden shadow-2xl`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-7xl font-bold tracking-wider">
                          {getInitials(selectedLeader.name)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Информация ниже */}
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedLeader.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg">{selectedLeader.position}</p>
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 text-center">
                    {selectedLeader.fullBio || selectedLeader.bio}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {selectedLeader.achievements && selectedLeader.achievements.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t('leadership.achievementsTitle')}
                        </h4>
                        <ul className="space-y-3">
                          {selectedLeader.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start text-slate-600">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedLeader.education && (
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {t('leadership.education')}
                        </h4>
                        <p className="text-slate-600">{selectedLeader.education}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutLeadership;