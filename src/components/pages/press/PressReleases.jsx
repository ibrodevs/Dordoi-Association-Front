import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DocumentIcon, DownloadIcon, HardDriveIcon, GlobeIcon, NewspaperIcon, ChartIcon, DollarSignIcon, TrendingUpIcon, LeafIcon, StarIcon } from '../../icons';
import PressBackground from '../../PressBackground';

const PressReleases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  // Имитация загрузки данных
  useEffect(() => {
    if (isInView) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const documents = [
    {
      id: 1,
      type: 'press-release',
      title: t('pressReleases.documents.0.title'),
      date: t('pressReleases.documents.0.date'),
      size: '2.4 MB',
      category: 'official',
      year: '2024',
      url: '#',
      description: t('pressReleases.documents.0.description'),
      pages: 12,
      downloads: 1247,
      language: t('pressReleases.languages.ru'),
      tags: [t('pressReleases.tags.official'), t('pressReleases.tags.logistics')],
      featured: true,
      preview: t('pressReleases.documents.0.preview', 'Полный текст пресс-релиза о запуске нового логистического центра с деталями проекта и цитатами руководства.'),
      related: [2, 3]
    },
    {
      id: 2,
      type: 'annual-report',
      title: t('pressReleases.documents.1.title'),
      date: t('pressReleases.documents.1.date'),
      size: '15.8 MB',
      category: 'financial',
      year: '2023',
      url: '#',
      description: t('pressReleases.documents.1.description'),
      pages: 156,
      downloads: 2893,
      language: t('pressReleases.languages.multi'),
      tags: [t('pressReleases.tags.financial'), t('pressReleases.tags.annual')],
      featured: true,
      preview: t('pressReleases.documents.1.preview', 'Комплексный отчет о деятельности компании за 2023 год с финансовыми показателями и стратегическими инициативами.'),
      related: [1, 4]
    },
    {
      id: 3,
      type: 'financial',
      title: t('pressReleases.documents.2.title'),
      date: t('pressReleases.documents.2.date'),
      size: '3.2 MB',
      category: 'financial',
      year: '2024',
      url: '#',
      description: t('pressReleases.documents.2.description'),
      pages: 24,
      downloads: 876,
      language: t('pressReleases.languages.ru'),
      tags: [t('pressReleases.tags.financial'), t('pressReleases.tags.quarterly')],
      featured: false,
      preview: t('pressReleases.documents.2.preview', 'Детальная финансовая отчетность за первый квартал 2024 года с анализом ключевых показателей эффективности.'),
      related: [1, 5]
    },
    {
      id: 4,
      type: 'presentation',
      title: t('pressReleases.documents.3.title'),
      date: t('pressReleases.documents.3.date'),
      size: '8.7 MB',
      category: 'investment',
      year: '2024',
      url: '#',
      description: t('pressReleases.documents.3.description'),
      pages: 42,
      downloads: 1543,
      language: t('pressReleases.languages.en'),
      tags: [t('pressReleases.tags.investment'), t('pressReleases.tags.strategy')],
      featured: true,
      preview: t('pressReleases.documents.3.preview', 'Стратегическая презентация для инвесторов с обзором текущих проектов и планов развития компании на ближайшие годы.'),
      related: [2, 6]
    },
    {
      id: 5,
      type: 'press-release',
      title: t('pressReleases.documents.4.title'),
      date: t('pressReleases.documents.4.date'),
      size: '1.9 MB',
      category: 'official',
      year: '2023',
      url: '#',
      description: t('pressReleases.documents.4.description'),
      pages: 8,
      downloads: 654,
      language: t('pressReleases.languages.ru'),
      tags: [t('pressReleases.tags.official'), t('pressReleases.tags.partnership')],
      featured: false,
      preview: t('pressReleases.documents.4.preview', 'Информация о подписании меморандума о сотрудничестве в области образования и научных исследований.'),
      related: [3, 7]
    },
    {
      id: 6,
      type: 'annual-report',
      title: t('pressReleases.documents.5.title'),
      date: t('pressReleases.documents.5.date'),
      size: '12.3 MB',
      category: 'financial',
      year: '2022',
      url: '#',
      description: t('pressReleases.documents.5.description'),
      pages: 142,
      downloads: 1987,
      language: t('pressReleases.languages.multi'),
      tags: [t('pressReleases.tags.financial'), t('pressReleases.tags.annual')],
      featured: false,
      preview: t('pressReleases.documents.5.preview', 'Годовой отчет о деятельности компании за 2022 год с финансовой отчетностью и обзором достижений.'),
      related: [4, 8]
    },
    {
      id: 7,
      type: 'financial',
      title: t('pressReleases.documents.6.title'),
      date: t('pressReleases.documents.6.date'),
      size: '2.8 MB',
      category: 'financial',
      year: '2023',
      url: '#',
      description: t('pressReleases.documents.6.description'),
      pages: 28,
      downloads: 732,
      language: t('pressReleases.languages.ru'),
      tags: [t('pressReleases.tags.financial'), t('pressReleases.tags.quarterly')],
      featured: false,
      preview: t('pressReleases.documents.6.preview', 'Финансовая отчетность за четвертый квартал 2023 года с итогами годовой деятельности.'),
      related: [5, 8]
    },
    {
      id: 8,
      type: 'presentation',
      title: t('pressReleases.documents.7.title'),
      date: t('pressReleases.documents.7.date'),
      size: '6.5 MB',
      category: 'investment',
      year: '2023',
      url: '#',
      description: t('pressReleases.documents.7.description'),
      pages: 38,
      downloads: 1123,
      language: t('pressReleases.languages.en'),
      tags: [t('pressReleases.tags.investment'), t('pressReleases.tags.strategy')],
      featured: false,
      preview: t('pressReleases.documents.7.preview', 'Презентационный материал для потенциальных инвесторов с анализом рынка и перспектив развития.'),
      related: [6, 7]
    },
    {
      id: 9,
      type: 'sustainability',
      title: t('pressReleases.documents.8.title', 'Отчет об устойчивом развитии 2023'),
      date: '18.03.2024',
      size: '9.2 MB',
      category: 'sustainability',
      year: '2024',
      url: '#',
      description: t('pressReleases.documents.8.description', 'Комплексный отчет о реализации экологических и социальных инициатив компании'),
      pages: 68,
      downloads: 892,
      language: t('pressReleases.languages.multi'),
      tags: [t('pressReleases.tags.sustainability'), t('pressReleases.tags.esg')],
      featured: true,
      preview: t('pressReleases.documents.8.preview', 'Подробный отчет о достижениях в области устойчивого развития, экологических инициативах и социальной ответственности.'),
      related: [2, 4]
    }
  ];

  const filters = [
    { id: 'all', name: t('pressReleases.filters.all'), color: 'gray', icon: <DocumentIcon className="w-5 h-5" /> },
    { id: 'press-release', name: t('pressReleases.filters.pressReleases'), color: 'blue', icon: <NewspaperIcon className="w-5 h-5" /> },
    { id: 'annual-report', name: t('pressReleases.filters.annualReports'), color: 'green', icon: <ChartIcon className="w-5 h-5" /> },
    { id: 'financial', name: t('pressReleases.filters.financial'), color: 'orange', icon: <DollarSignIcon className="w-5 h-5" /> },
    { id: 'presentation', name: t('pressReleases.filters.presentations'), color: 'purple', icon: <TrendingUpIcon className="w-5 h-5" /> },
    { id: 'sustainability', name: t('pressReleases.filters.sustainability'), color: 'emerald', icon: <LeafIcon className="w-5 h-5" /> }
  ];

  const years = ['2024', '2023', '2022', '2021'];
  const sortOptions = [
    { id: 'date', name: t('pressReleases.sort.date') },
    { id: 'title', name: t('pressReleases.sort.title') },
    { id: 'size', name: t('pressReleases.sort.size') },
    { id: 'downloads', name: t('pressReleases.sort.popularity') }
  ];

  const colorMap = {
    gray: { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-50', border: 'border-gray-200', gradient: 'from-gray-500 to-gray-600' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200', gradient: 'from-emerald-500 to-emerald-600' }
  };

  const typeIcons = {
    'press-release': <NewspaperIcon className="w-5 h-5" />,
    'annual-report': <ChartIcon className="w-5 h-5" />,
    'financial': <DollarSignIcon className="w-5 h-5" />,
    'presentation': <TrendingUpIcon className="w-5 h-5" />,
    'sustainability': <LeafIcon className="w-5 h-5" />
  };

  const typeColors = {
    'press-release': 'blue',
    'annual-report': 'green',
    'financial': 'orange',
    'presentation': 'purple',
    'sustainability': 'emerald'
  };

  // Фильтрация и сортировка документов
  const filteredDocuments = documents
    .filter(doc => {
      const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
      const matchesYear = selectedYear === 'all' || doc.year === selectedYear;
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesYear && matchesSearch;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date.split('.').reverse().join('-'));
          bValue = new Date(b.date.split('.').reverse().join('-'));
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'size':
          aValue = parseFloat(a.size);
          bValue = parseFloat(b.size);
          break;
        case 'downloads':
          aValue = a.downloads;
          bValue = b.downloads;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    })
    .slice(0, visibleCount);

  const featuredDocuments = documents.filter(doc => doc.featured);
  const relatedDocuments = selectedDocument ? 
    documents.filter(doc => selectedDocument.related?.includes(doc.id)) : [];

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Анимации
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

  const SkeletonLoader = () => (
    <motion.div
      variants={loadingVariants}
      initial="initial"
      animate="animate"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    >
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          variants={skeletonVariants}
          className="bg-gray-200 rounded-2xl h-80 animate-pulse"
        />
      ))}
    </motion.div>
  );

  const DocumentStats = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
    >
      {[
        { label: t('pressReleases.stats.totalDocuments'), value: documents.length, icon: <DocumentIcon className="w-8 h-8" /> },
        { label: t('pressReleases.stats.totalDownloads'), value: documents.reduce((sum, doc) => sum + doc.downloads, 0), icon: <DownloadIcon className="w-8 h-8" /> },
        { label: t('pressReleases.stats.avgSize'), value: '4.2 MB', icon: <HardDriveIcon className="w-8 h-8" /> },
        { label: t('pressReleases.stats.languages'), value: '3', icon: <GlobeIcon className="w-8 h-8" /> }
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white shadow-lg"
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
          </div>
          <div className="text-slate-600 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <PressBackground>
      <section ref={ref} className="relative py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 left-5 w-32 h-32 bg-blue-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-10 right-5 w-40 h-40 bg-purple-300 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-green-300 rounded-full blur-3xl"
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-sm mb-6"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-blue-700 text-sm font-semibold">{t('pressReleases.badge')}</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent mb-6"
          >
            {t('pressReleases.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('pressReleases.titleHighlight')}
            </span>
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"
          ></motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('pressReleases.subtitle')}
          </motion.p>
        </motion.div>

        {/* Статистика */}
        <DocumentStats />

        {/* Панель управления: поиск, фильтры, сортировка */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Поиск */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('pressReleases.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Сортировка */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              
              <motion.button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Фильтры */}
          <div className="mt-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Фильтры по типу */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">{t('pressReleases.filters.type')}</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const colors = colorMap[filter.color];
                    const isActive = activeFilter === filter.id;
                    
                    return (
                      <motion.button
                        key={filter.id}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                          isActive
                            ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg`
                            : `${colors.light} ${colors.text} border ${colors.border} hover:shadow-md`
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveFilter(filter.id);
                          setVisibleCount(9);
                        }}
                      >
                        <span className="text-lg">{filter.icon}</span>
                        <span>{filter.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Фильтр по годам */}
              <div className="lg:w-48">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">{t('pressReleases.filters.year')}</h3>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setVisibleCount(9);
                  }}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                >
                  <option value="all">{t('pressReleases.filters.allYears')}</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Информация о результатах */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-slate-600">
              {t('pressReleases.results.showing')} <strong>{filteredDocuments.length}</strong> {t('pressReleases.results.of')} <strong>{documents.length}</strong> {t('pressReleases.results.documents')}
            </span>
          </motion.div>
        </motion.div>

        {/* Рекомендуемые документы */}
        {featuredDocuments.length > 0 && activeFilter === 'all' && searchTerm === '' && selectedYear === 'all' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-12"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
              {t('pressReleases.featured')}
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredDocuments.slice(0, 2).map((doc) => {
                const typeColor = typeColors[doc.type];
                const colors = colorMap[typeColor];
                
                return (
                  <motion.div
                    key={doc.id}
                    variants={cardVariants}
                    className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                    whileHover="hover"
                    onClick={() => setSelectedDocument(doc)}
                  >
                    <div className="p-8">
                      <div className="flex items-start space-x-6 mb-6">
                        <div className={`flex-shrink-0 w-16 h-16 ${colors.light} rounded-2xl flex items-center justify-center group-hover:${colors.bg} transition-colors duration-300`}>
                          <span className="text-2xl group-hover:text-white transition-colors duration-300">
                            {typeIcons[doc.type]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${colors.light} ${colors.text}`}>
                              {filters.find(f => f.id === doc.type)?.name}
                            </span>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                              <StarIcon className="w-4 h-4 mr-1" /> {t('pressReleases.featuredBadge')}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                            {doc.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-slate-500">
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.pages} {t('pressReleases.pages')}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {doc.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-slate-500 text-sm">
                          <div className="flex items-center space-x-1">
                            <DownloadIcon className="w-4 h-4" />
                            <span>{formatNumber(doc.downloads)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GlobeIcon className="w-4 h-4" />
                            <span>{doc.language}</span>
                          </div>
                        </div>
                        
                        <motion.button
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                        >
                          <span>{t('pressReleases.viewDetails')}</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Сетка документов */}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredDocuments.map((doc) => {
                const typeColor = typeColors[doc.type];
                const colors = colorMap[typeColor];
                
                return (
                  <motion.div
                    key={doc.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedDocument(doc)}
                  >
                    <div className="p-6">
                      {/* Заголовок и иконка */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`flex-shrink-0 w-12 h-12 ${colors.light} rounded-xl flex items-center justify-center group-hover:${colors.bg} transition-colors duration-300`}>
                          <span className="text-xl group-hover:text-white transition-colors duration-300">
                            {typeIcons[doc.type]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                            {doc.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-slate-500">
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>

                      {/* Описание */}
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                        {doc.description}
                      </p>

                      {/* Теги */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {doc.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-lg text-xs bg-slate-100 text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Мета-информация */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 text-slate-500 text-sm">
                          <div className="flex items-center space-x-1">
                            <DocumentIcon className="w-4 h-4" />
                            <span>{doc.pages}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DownloadIcon className="w-4 h-4" />
                            <span>{formatNumber(doc.downloads)}</span>
                          </div>
                        </div>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.light} ${colors.text}`}>
                          {filters.find(f => f.id === doc.type)?.name}
                        </span>
                      </div>

                      {/* Кнопка скачивания */}
                      <motion.a
                        href={doc.url}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-300 group/download"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{t('pressReleases.download')}</span>
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Сообщение, если ничего не найдено */}
            {filteredDocuments.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  {t('pressReleases.noResults.title')}
                </h3>
                <p className="text-slate-600 max-w-md mx-auto mb-6">
                  {t('pressReleases.noResults.description')}
                </p>
                <motion.button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                    setSelectedYear('all');
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('pressReleases.noResults.reset')}
                </motion.button>
              </motion.div>
            )}

            {/* Кнопка загрузки еще */}
            {filteredDocuments.length > 0 && visibleCount < documents.length && (
              <motion.div
                variants={itemVariants}
                className="text-center mt-12"
              >
                <motion.button
                  onClick={handleLoadMore}
                  className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{t('pressReleases.loadMore')}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Модальное окно с деталями документа */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDocument(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Шапка модального окна */}
                <div className="sticky top-0 bg-white border-b border-slate-200 z-10 rounded-t-3xl">
                  <div className="flex justify-between items-start p-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
                          colorMap[typeColors[selectedDocument.type]].light
                        } ${
                          colorMap[typeColors[selectedDocument.type]].text
                        }`}>
                          <span className="mr-2">{typeIcons[selectedDocument.type]}</span>
                          {filters.find(f => f.id === selectedDocument.type)?.name}
                        </span>
                        {selectedDocument.featured && (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                            <StarIcon className="w-4 h-4 mr-1" /> {t('pressReleases.featuredBadge')}
                          </span>
                        )}
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600">
                          {selectedDocument.date}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl font-bold text-slate-900 mb-4 pr-8">
                        {selectedDocument.title}
                      </h2>
                    </div>
                    
                    <button
                      onClick={() => setSelectedDocument(null)}
                      className="text-slate-400 hover:text-slate-600 transition-colors duration-300 bg-slate-100 hover:bg-slate-200 rounded-xl p-2"
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
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">{t('pressReleases.modal.description')}</h3>
                        <p className="text-slate-600 leading-relaxed">
                          {selectedDocument.description}
                        </p>
                      </div>

                      {/* Предпросмотр */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">{t('pressReleases.modal.preview')}</h3>
                        <p className="text-slate-600 leading-relaxed">
                          {selectedDocument.preview}
                        </p>
                      </div>

                      {/* Теги */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">{t('pressReleases.modal.tags')}</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedDocument.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 text-blue-600 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Детали документа */}
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">{t('pressReleases.modal.details')}</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-slate-600">{t('pressReleases.modal.size')}</span>
                            <span className="font-medium text-slate-900">{selectedDocument.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{t('pressReleases.modal.pages')}</span>
                            <span className="font-medium text-slate-900">{selectedDocument.pages}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{t('pressReleases.modal.language')}</span>
                            <span className="font-medium text-slate-900">{selectedDocument.language}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{t('pressReleases.modal.downloads')}</span>
                            <span className="font-medium text-slate-900">{formatNumber(selectedDocument.downloads)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">{t('pressReleases.modal.year')}</span>
                            <span className="font-medium text-slate-900">{selectedDocument.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Действия */}
                      <div className="space-y-3">
                        <motion.a
                          href={selectedDocument.url}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{t('pressReleases.modal.download')}</span>
                        </motion.a>
                        
                        <motion.button
                          className="w-full border-2 border-slate-300 text-slate-700 font-medium py-4 px-6 rounded-xl flex items-center justify-center space-x-3 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <span>{t('pressReleases.modal.share')}</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Похожие документы */}
                  {relatedDocuments.length > 0 && (
                    <div className="pt-8 border-t border-slate-200">
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('pressReleases.related')}</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {relatedDocuments.map((doc) => (
                          <motion.div
                            key={doc.id}
                            className="flex items-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300 cursor-pointer group"
                            whileHover={{ x: 5 }}
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <div className={`w-12 h-12 ${colorMap[typeColors[doc.type]].light} rounded-lg flex items-center justify-center text-xl mr-4 group-hover:${colorMap[typeColors[doc.type]].bg} transition-colors duration-300`}>
                              <span className="group-hover:text-white transition-colors duration-300">
                                {typeIcons[doc.type]}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                {doc.title}
                              </h4>
                              <p className="text-sm text-slate-600 mt-1">{doc.date} • {doc.size}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA секция */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mt-20"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-200 relative overflow-hidden">
          {/* Фоновые элементы */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-10 right-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl"
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 2 }}
              className="absolute bottom-10 left-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            variants={itemVariants}
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg relative z-10"
          >
            <span className="text-white text-3xl">📞</span>
          </motion.div>
          
          <motion.h3 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 relative z-10"
          >
            {t('pressReleases.cta.title')}
          </motion.h3>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed relative z-10"
          >
            {t('pressReleases.cta.subtitle')}
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
          >
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('pressReleases.cta.buttons.interview')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.button>

            <motion.button
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 inline-flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('pressReleases.cta.buttons.contact')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Контактная информация */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-blue-200 relative z-10"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-600">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="font-semibold">{t('pressReleases.contact.phone')}</div>
                  <div className="text-sm">+996 (312) 123-456</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-semibold">{t('pressReleases.contact.email')}</div>
                  <div className="text-sm">press@dordoi.kg</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-semibold">{t('pressReleases.contact.hours')}</div>
                  <div className="text-sm">{t('pressReleases.contact.hoursDetail')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
    </PressBackground>
  );
};

export default PressReleases;