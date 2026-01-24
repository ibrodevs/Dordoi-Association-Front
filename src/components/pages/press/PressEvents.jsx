import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PressBackground from '../../PressBackground';

const PressEvents = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Имитация загрузки данных
  useEffect(() => {
    if (isInView) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const events = {
    upcoming: [
      {
        id: 1,
        title: t('pressEvents.events.upcoming.0.title'),
        date: '2024-03-15',
        time: '10:00',
        endTime: '18:00',
        location: t('pressEvents.events.upcoming.0.location'),
        description: t('pressEvents.events.upcoming.0.description'),
        fullDescription: t('pressEvents.events.upcoming.0.fullDescription', 'Подробное описание мероприятия с деталями программы, спикерами и ожидаемыми результатами.'),
        type: 'conference',
        category: 'business',
        image: '/images/event1.jpg',
        program: [
          { time: '09:00 - 10:00', title: t('pressEvents.events.upcoming.0.program.0') },
          { time: '10:00 - 12:30', title: t('pressEvents.events.upcoming.0.program.1') },
          { time: '14:00 - 16:00', title: t('pressEvents.events.upcoming.0.program.2') }
        ],
        speakers: [
          { name: t('pressEvents.speakers.0.name'), position: t('pressEvents.speakers.0.position'), avatar: '/avatars/speaker1.jpg' },
          { name: t('pressEvents.speakers.1.name'), position: t('pressEvents.speakers.1.position'), avatar: '/avatars/speaker2.jpg' },
          { name: t('pressEvents.speakers.2.name'), position: t('pressEvents.speakers.2.position'), avatar: '/avatars/speaker3.jpg' }
        ],
        partners: [
          { name: t('pressEvents.partners.0'), logo: '/logos/partner1.png', tier: 'platinum' },
          { name: t('pressEvents.partners.1'), logo: '/logos/partner2.png', tier: 'gold' },
          { name: t('pressEvents.partners.2'), logo: '/logos/partner3.png', tier: 'silver' }
        ],
        registrationUrl: '#register',
        price: t('pressEvents.pricing.free'),
        seats: 250,
        registered: 187,
        tags: [t('pressEvents.tags.innovation'), t('pressEvents.tags.business'), t('pressEvents.tags.networking')],
        duration: '8 часов',
        language: t('pressEvents.languages.ru'),
        level: t('pressEvents.levels.intermediate')
      },
      {
        id: 2,
        title: t('pressEvents.events.upcoming.1.title'),
        date: '2024-03-20',
        time: '14:00',
        endTime: '18:00',
        location: t('pressEvents.events.upcoming.1.location'),
        description: t('pressEvents.events.upcoming.1.description'),
        fullDescription: t('pressEvents.events.upcoming.1.fullDescription', 'Практический семинар с реальными кейсами и индивидуальными консультациями.'),
        type: 'workshop',
        category: 'technology',
        image: '/images/event2.jpg',
        program: [
          { time: '14:00 - 15:30', title: t('pressEvents.events.upcoming.1.program.0') },
          { time: '15:30 - 17:00', title: t('pressEvents.events.upcoming.1.program.1') },
          { time: '17:00 - 18:00', title: t('pressEvents.events.upcoming.1.program.2') }
        ],
        speakers: [
          { name: t('pressEvents.speakers.3.name'), position: t('pressEvents.speakers.3.position'), avatar: '/avatars/speaker4.jpg' },
          { name: t('pressEvents.speakers.4.name'), position: t('pressEvents.speakers.4.position'), avatar: '/avatars/speaker5.jpg' }
        ],
        partners: [
          { name: t('pressEvents.partners.3'), logo: '/logos/partner4.png', tier: 'gold' },
          { name: t('pressEvents.partners.4'), logo: '/logos/partner5.png', tier: 'silver' }
        ],
        registrationUrl: '#register',
        price: t('pressEvents.pricing.paid'),
        priceAmount: '5000 сом',
        seats: 50,
        registered: 42,
        tags: [t('pressEvents.tags.digital'), t('pressEvents.tags.workshop'), t('pressEvents.tags.practical')],
        duration: '4 часа',
        language: t('pressEvents.languages.ru'),
        level: t('pressEvents.levels.beginner')
      },
      {
        id: 3,
        title: t('pressEvents.events.upcoming.2.title'),
        date: '2024-04-05',
        time: '09:00',
        endTime: '19:00',
        location: t('pressEvents.events.upcoming.2.location'),
        description: t('pressEvents.events.upcoming.2.description'),
        fullDescription: t('pressEvents.events.upcoming.2.fullDescription', 'Крупнейшая выставка промышленных достижений с участием международных компаний.'),
        type: 'exhibition',
        category: 'industry',
        image: '/images/event3.jpg',
        program: [
          { time: '09:00 - 11:00', title: t('pressEvents.events.upcoming.2.program.0') },
          { time: '11:00 - 18:00', title: t('pressEvents.events.upcoming.2.program.1') },
          { time: '16:00 - 17:00', title: t('pressEvents.events.upcoming.2.program.2') }
        ],
        speakers: [
          { name: t('pressEvents.speakers.5.name'), position: t('pressEvents.speakers.5.position'), avatar: '/avatars/speaker6.jpg' },
          { name: t('pressEvents.speakers.6.name'), position: t('pressEvents.speakers.6.position'), avatar: '/avatars/speaker7.jpg' }
        ],
        partners: [
          { name: t('pressEvents.partners.5'), logo: '/logos/partner6.png', tier: 'platinum' },
          { name: t('pressEvents.partners.6'), logo: '/logos/partner7.png', tier: 'gold' },
          { name: t('pressEvents.partners.7'), logo: '/logos/partner8.png', tier: 'silver' }
        ],
        registrationUrl: '#register',
        price: t('pressEvents.pricing.free'),
        seats: 1000,
        registered: 756,
        tags: [t('pressEvents.tags.industry'), t('pressEvents.tags.exhibition'), t('pressEvents.tags.innovation')],
        duration: '10 часов',
        language: t('pressEvents.languages.multi'),
        level: t('pressEvents.levels.all')
      },
      {
        id: 7,
        title: t('pressEvents.events.upcoming.3.title', 'Семинар по инвестициям в стартапы'),
        date: '2024-04-12',
        time: '11:00',
        endTime: '15:00',
        location: t('pressEvents.events.upcoming.3.location', 'г. Бишкек, Бизнес-инкубатор'),
        description: t('pressEvents.events.upcoming.3.description', 'Семинар для инвесторов и основателей стартапов о современных трендах венчурных инвестиций.'),
        type: 'seminar',
        category: 'investment',
        image: '/images/event7.jpg',
        program: [
          { time: '11:00 - 12:30', title: t('pressEvents.events.upcoming.3.program.0', 'Тренды венчурных инвестиций 2024') },
          { time: '12:30 - 14:00', title: t('pressEvents.events.upcoming.3.program.1', 'Кейсы успешных стартапов') },
          { time: '14:00 - 15:00', title: t('pressEvents.events.upcoming.3.program.2', 'Нетворкинг сессия') }
        ],
        speakers: [
          { name: t('pressEvents.speakers.7.name', 'Айгерим Токтосунова'), position: t('pressEvents.speakers.7.position', 'Управляющий партнер фонда'), avatar: '/avatars/speaker8.jpg' }
        ],
        partners: [
          { name: t('pressEvents.partners.8', 'Венчурный фонд'), logo: '/logos/partner9.png', tier: 'gold' }
        ],
        registrationUrl: '#register',
        price: t('pressEvents.pricing.paid'),
        priceAmount: '3000 сом',
        seats: 80,
        registered: 65,
        tags: [t('pressEvents.tags.investment'), t('pressEvents.tags.startup'), t('pressEvents.tags.finance')],
        duration: '4 часа',
        language: t('pressEvents.languages.ru'),
        level: t('pressEvents.levels.advanced')
      }
    ],
    archive: [
      {
        id: 4,
        title: t('pressEvents.events.archive.0.title'),
        date: '2024-01-20',
        time: '11:00',
        endTime: '17:00',
        location: t('pressEvents.events.archive.0.location'),
        description: t('pressEvents.events.archive.0.description'),
        fullDescription: t('pressEvents.events.archive.0.fullDescription', 'Международная конференция с участием экспертов из 15 стран.'),
        type: 'conference',
        category: 'sustainability',
        image: '/images/event4.jpg',
        program: [
          { time: '11:00 - 13:00', title: t('pressEvents.events.archive.0.program.0', 'Пленарное заседание') },
          { time: '14:00 - 16:00', title: t('pressEvents.events.archive.0.program.1', 'Панельные дискуссии') },
          { time: '16:00 - 17:00', title: t('pressEvents.events.archive.0.program.2', 'Подведение итогов') }
        ],
        speakers: [
          { name: t('pressEvents.speakers.8.name', 'Марс Сарыбаев'), position: t('pressEvents.speakers.8.position', 'Министр экологии'), avatar: '/avatars/speaker9.jpg' }
        ],
        partners: [
          { name: t('pressEvents.partners.0'), logo: '/logos/partner1.png', tier: 'platinum' },
          { name: t('pressEvents.partners.2'), logo: '/logos/partner3.png', tier: 'gold' }
        ],
        photos: ['/gallery/photo1.jpg', '/gallery/photo2.jpg', '/gallery/photo3.jpg'],
        materials: [
          { title: t('pressEvents.materials.presentation'), url: '#', type: 'pdf' },
          { title: t('pressEvents.materials.video'), url: '#', type: 'video' }
        ],
        attendees: 320,
        feedback: 4.8,
        tags: [t('pressEvents.tags.sustainability'), t('pressEvents.tags.environment'), t('pressEvents.tags.conference')]
      },
      {
        id: 5,
        title: t('pressEvents.events.archive.1.title'),
        date: '2023-12-15',
        time: '15:00',
        endTime: '18:00',
        location: t('pressEvents.events.archive.1.location'),
        description: t('pressEvents.events.archive.1.description'),
        fullDescription: t('pressEvents.events.archive.1.fullDescription', 'Практический семинар с индивидуальными консультациями.'),
        type: 'seminar',
        category: 'education',
        image: '/images/event5.jpg',
        program: [
          { time: '15:00 - 16:30', title: t('pressEvents.events.archive.1.program.0', 'Основы финансового планирования') },
          { time: '16:30 - 18:00', title: t('pressEvents.events.archive.1.program.1', 'Практические кейсы') }
        ],
        speakers: [
          { name: t('pressEvents.speakers.9.name', 'Алтынай Осмонова'), position: t('pressEvents.speakers.9.position', 'Финансовый консультант'), avatar: '/avatars/speaker10.jpg' }
        ],
        partners: [
          { name: t('pressEvents.partners.1'), logo: '/logos/partner2.png', tier: 'gold' },
          { name: t('pressEvents.partners.4'), logo: '/logos/partner5.png', tier: 'silver' }
        ],
        photos: ['/gallery/photo4.jpg', '/gallery/photo5.jpg'],
        materials: [
          { title: t('pressEvents.materials.presentation'), url: '#', type: 'pdf' }
        ],
        attendees: 85,
        feedback: 4.6,
        tags: [t('pressEvents.tags.finance'), t('pressEvents.tags.education'), t('pressEvents.tags.seminar')]
      },
      {
        id: 6,
        title: t('pressEvents.events.archive.2.title'),
        date: '2023-11-10',
        time: '10:00',
        endTime: '17:00',
        location: t('pressEvents.events.archive.2.location'),
        description: t('pressEvents.events.archive.2.description'),
        fullDescription: t('pressEvents.events.archive.2.fullDescription', 'Форум с участием региональных администраций и инвесторов.'),
        type: 'forum',
        category: 'regional',
        image: '/images/event6.jpg',
        program: [
          { time: '10:00 - 12:00', title: t('pressEvents.events.archive.2.program.0', 'Презентация региональных проектов') },
          { time: '13:00 - 15:00', title: t('pressEvents.events.archive.2.program.1', 'Инвестиционные сессии') },
          { time: '15:00 - 17:00', title: t('pressEvents.events.archive.2.program.2', 'Подписание соглашений') }
        ],
        speakers: [
          { name: t('pressEvents.speakers.10.name', 'Нурлан Токтомамбетов'), position: t('pressEvents.speakers.10.position', 'Глава региона'), avatar: '/avatars/speaker11.jpg' }
        ],
        partners: [
          { name: t('pressEvents.partners.3'), logo: '/logos/partner4.png', tier: 'platinum' },
          { name: t('pressEvents.partners.6'), logo: '/logos/partner7.png', tier: 'gold' }
        ],
        photos: ['/gallery/photo6.jpg', '/gallery/photo7.jpg', '/gallery/photo8.jpg'],
        materials: [
          { title: t('pressEvents.materials.presentation'), url: '#', type: 'pdf' },
          { title: t('pressEvents.materials.report'), url: '#', type: 'pdf' }
        ],
        attendees: 450,
        feedback: 4.9,
        tags: [t('pressEvents.tags.regional'), t('pressEvents.tags.investment'), t('pressEvents.tags.infrastructure')]
      }
    ]
  };

  // Фильтрация мероприятий
  const filteredEvents = events[activeTab]
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(event => filterType === 'all' || event.type === filterType)
    .slice(0, visibleCount);

  const eventTypes = [
    { key: 'all', label: t('pressEvents.filters.all') },
    { key: 'conference', label: t('pressEvents.eventTypes.conference') },
    { key: 'workshop', label: t('pressEvents.eventTypes.workshop') },
    { key: 'exhibition', label: t('pressEvents.eventTypes.exhibition') },
    { key: 'seminar', label: t('pressEvents.eventTypes.seminar') },
    { key: 'forum', label: t('pressEvents.eventTypes.forum') }
  ];

  // Анимации
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
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const skeletonVariants = {
    initial: { opacity: 0.3 },
    animate: { 
      opacity: 0.7,
      transition: { 
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Вспомогательные функции
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      conference: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
      workshop: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
      exhibition: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
      seminar: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600' },
      forum: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200', gradient: 'from-red-500 to-red-600' }
    };
    return colors[type] || colors.conference;
  };

  const getPartnerTierColor = (tier) => {
    const colors = {
      platinum: 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-800',
      gold: 'bg-gradient-to-r from-yellow-500 to-yellow-300 text-yellow-900',
      silver: 'bg-gradient-to-r from-gray-300 to-gray-200 text-gray-700'
    };
    return colors[tier] || colors.silver;
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const SkeletonLoader = () => (
    <motion.div
      variants={loadingVariants}
      initial="initial"
      animate="animate"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
    >
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          variants={skeletonVariants}
          className="bg-gray-200 rounded-2xl h-96 animate-pulse"
        />
      ))}
    </motion.div>
  );

  return (
    <PressBackground>
      <section ref={ref} className="relative py-20 bg-gradient-to-br from-slate-50 to-violet-50 overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 left-5 w-32 h-32 bg-violet-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-10 right-5 w-40 h-40 bg-pink-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-emerald-300 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-violet-200 shadow-sm mb-6"
          >
            <div className="w-2 h-2 bg-violet-500 rounded-full mr-2"></div>
            <span className="text-violet-700 text-sm font-semibold">{t('pressEvents.badge')}</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 to-violet-700 bg-clip-text text-transparent mb-6"
          >
            {t('pressEvents.title')}
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full mx-auto mb-6"
          ></motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('pressEvents.subtitle')}
          </motion.p>
        </motion.div>

        {/* Панель управления: табы, поиск, фильтры */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Табы */}
            <div className="flex flex-wrap gap-2">
              {['upcoming', 'archive'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setVisibleCount(6);
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(`pressEvents.tabs.${tab}`)}
                </motion.button>
              ))}
            </div>

            {/* Поиск */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('pressEvents.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Фильтры по типу */}
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <motion.button
                  key={type.key}
                  onClick={() => setFilterType(type.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterType === type.key
                      ? 'bg-violet-100 text-violet-700 border border-violet-200'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Статистика */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: t('pressEvents.stats.totalEvents'), value: '24' },
            { label: t('pressEvents.stats.participants'), value: '5,000+' },
            { label: t('pressEvents.stats.partners'), value: '50+' },
            { label: t('pressEvents.stats.cities'), value: '8' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white shadow-lg"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Сетка мероприятий */}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {filteredEvents.map((event) => {
                const typeColors = getEventTypeColor(event.type);
                const progress = (event.registered / event.seats) * 100;
                
                return (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    {/* Изображение мероприятия с градиентом */}
                    <div className="relative h-48 bg-gradient-to-br from-violet-100 to-pink-100 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Бэдж типа мероприятия */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${typeColors.bg} ${typeColors.text} ${typeColors.border} backdrop-blur-sm`}>
                          {t(`pressEvents.eventTypes.${event.type}`)}
                        </span>
                      </div>

                      {/* Дата мероприятия */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg">
                        <div className="text-lg font-bold text-slate-900">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-slate-600 uppercase font-semibold">
                          {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                        </div>
                      </div>

                      {/* Информация о регистрации */}
                      {activeTab === 'upcoming' && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex justify-between text-xs text-white mb-1">
                            <span>{t('pressEvents.registration.progress')}</span>
                            <span>{event.registered}/{event.seats}</span>
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <motion.div 
                              className={`h-2 rounded-full bg-gradient-to-r ${typeColors.gradient}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Контент карточки */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors duration-300 line-clamp-2">
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center text-slate-600 mb-2">
                        <svg className="w-4 h-4 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-sm">{event.location}</span>
                      </div>

                      <div className="flex items-center text-slate-600 mb-3">
                        <svg className="w-4 h-4 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{event.time} - {event.endTime}</span>
                      </div>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Теги */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>{event.duration}</span>
                          <span>•</span>
                          <span>{event.language}</span>
                        </div>
                        <motion.div
                          className="text-violet-600 hover:text-violet-700 font-semibold text-sm flex items-center"
                          whileHover={{ x: 3 }}
                        >
                          {activeTab === 'upcoming' ? t('pressEvents.actions.register') : t('pressEvents.actions.view')}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Сообщение если ничего не найдено */}
            {filteredEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {t('pressEvents.noEvents.title')}
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  {t('pressEvents.noEvents.description')}
                </p>
              </motion.div>
            )}

            {/* Кнопка загрузки еще */}
            {filteredEvents.length > 0 && visibleCount < events[activeTab].length && (
              <motion.div
                variants={itemVariants}
                className="text-center"
              >
                <motion.button
                  onClick={handleLoadMore}
                  className="bg-white border-2 border-violet-600 text-violet-600 px-8 py-3 rounded-xl font-semibold hover:bg-violet-600 hover:text-white transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{t('pressEvents.loadMore')}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Модальное окно с деталями мероприятия */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Шапка модального окна */}
                <div className="sticky top-0 bg-white border-b border-slate-200 z-10 rounded-t-3xl">
                  <div className="flex justify-between items-start p-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getEventTypeColor(selectedEvent.type).bg} ${getEventTypeColor(selectedEvent.type).text}`}>
                          {t(`pressEvents.eventTypes.${selectedEvent.type}`)}
                        </span>
                        {selectedEvent.price && (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700">
                            {selectedEvent.price} {selectedEvent.priceAmount && `• ${selectedEvent.priceAmount}`}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-3xl font-bold text-slate-900 mb-4 pr-8">
                        {selectedEvent.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-6 text-slate-600">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">{formatDate(selectedEvent.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{selectedEvent.time} - {selectedEvent.endTime}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span className="font-medium">{selectedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="text-slate-400 hover:text-slate-600 transition-colors duration-200 bg-slate-100 hover:bg-slate-200 rounded-xl p-2"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Контент модального окна */}
                <div className="p-8 space-y-8">
                  {/* Основная информация */}
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      {/* Описание */}
                      <div>
                        <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t('pressEvents.modal.description')}
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-lg">
                          {selectedEvent.fullDescription}
                        </p>
                      </div>

                      {/* Программа */}
                      {selectedEvent.program && (
                        <div>
                          <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {t('pressEvents.modal.program')}
                          </h4>
                          <div className="space-y-3">
                            {selectedEvent.program.map((item, index) => (
                              <div key={index} className="flex items-start p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                                <div className="w-20 flex-shrink-0 text-sm font-medium text-violet-600">
                                  {item.time}
                                </div>
                                <div className="text-slate-700">{item.title}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Спикеры */}
                      {selectedEvent.speakers && (
                        <div>
                          <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {t('pressEvents.modal.speakers')}
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {selectedEvent.speakers.map((speaker, index) => (
                              <div key={index} className="flex items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                                  {speaker.avatar ? (
                                    <img src={speaker.avatar} alt={speaker.name} className="w-12 h-12 rounded-full object-cover" />
                                  ) : (
                                    speaker.name.split(' ').map(n => n[0]).join('')
                                  )}
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900">{speaker.name}</div>
                                  <div className="text-sm text-slate-600">{speaker.position}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Боковая панель */}
                    <div className="space-y-6">
                      {/* Детали мероприятия */}
                      <div className="bg-slate-50 rounded-2xl p-6">
                        <h5 className="font-semibold text-slate-900 mb-4">{t('pressEvents.modal.eventDetails')}</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">{t('pressEvents.modal.duration')}</span>
                            <span className="font-medium text-slate-900">{selectedEvent.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{t('pressEvents.modal.language')}</span>
                            <span className="font-medium text-slate-900">{selectedEvent.language}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{t('pressEvents.modal.level')}</span>
                            <span className="font-medium text-slate-900">{selectedEvent.level}</span>
                          </div>
                          {selectedEvent.seats && (
                            <div className="flex justify-between">
                              <span className="text-slate-600">{t('pressEvents.modal.seats')}</span>
                              <span className="font-medium text-slate-900">{selectedEvent.seats}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Для архивных мероприятий */}
                      {activeTab === 'archive' && (
                        <>
                          {selectedEvent.attendees && (
                            <div className="bg-slate-50 rounded-2xl p-6">
                              <h5 className="font-semibold text-slate-900 mb-4">{t('pressEvents.modal.eventStats')}</h5>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">{t('pressEvents.modal.attendees')}</span>
                                  <span className="font-medium text-slate-900">{selectedEvent.attendees}</span>
                                </div>
                                {selectedEvent.feedback && (
                                  <div className="flex justify-between">
                                    <span className="text-slate-600">{t('pressEvents.modal.feedback')}</span>
                                    <span className="font-medium text-slate-900 flex items-center">
                                      {selectedEvent.feedback}/5
                                      <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {selectedEvent.materials && (
                            <div className="bg-slate-50 rounded-2xl p-6">
                              <h5 className="font-semibold text-slate-900 mb-4">{t('pressEvents.modal.materials')}</h5>
                              <div className="space-y-2">
                                {selectedEvent.materials.map((material, index) => (
                                  <a key={index} href={material.url} className="flex items-center p-3 bg-white rounded-lg hover:bg-slate-100 transition-colors duration-200 group">
                                    <svg className={`w-5 h-5 mr-3 ${
                                      material.type === 'pdf' ? 'text-red-500' : 
                                      material.type === 'video' ? 'text-blue-500' : 'text-slate-500'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-slate-700 group-hover:text-slate-900">{material.title}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Партнеры */}
                  {selectedEvent.partners && (
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {t('pressEvents.modal.partners')}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selectedEvent.partners.map((partner, index) => (
                          <div key={index} className={`flex items-center justify-center p-4 rounded-xl ${getPartnerTierColor(partner.tier)} font-semibold text-center min-h-[80px]`}>
                            {partner.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Фотографии для архивных мероприятий */}
                  {activeTab === 'archive' && selectedEvent.photos && (
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {t('pressEvents.modal.photos')}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedEvent.photos.map((photo, index) => (
                          <div key={index} className="aspect-square bg-gradient-to-br from-violet-100 to-pink-100 rounded-2xl flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                            <div className="text-center">
                              <svg className="w-12 h-12 text-violet-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-violet-600 text-sm font-medium">{t('pressEvents.modal.photo')} {index + 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Кнопка регистрации для предстоящих мероприятий */}
                  {activeTab === 'upcoming' && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-slate-200">
                      <div className="flex items-center space-x-4 text-slate-600">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{selectedEvent.registered} {t('pressEvents.modal.registered')}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>{selectedEvent.seats} {t('pressEvents.modal.seatsAvailable')}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <motion.button
                          className="border-2 border-violet-600 text-violet-600 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50 transition-colors duration-300 inline-flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <span>{t('pressEvents.modal.share')}</span>
                        </motion.button>
                        
                        <motion.button
                          className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{t('pressEvents.modal.registerButton')}</span>
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </PressBackground>
  );
};

export default PressEvents;