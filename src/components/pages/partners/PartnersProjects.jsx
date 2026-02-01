import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../api';

const PartnersProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных проектов
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiRequest(`partners/projects/?lang=${i18n.language}`);
        
        console.log('API Response:', response);
        
        let projectsData;
        if (response.results && Array.isArray(response.results)) {
          projectsData = response.results;
        } else if (Array.isArray(response)) {
          projectsData = response;
        } else {
          projectsData = [];
        }

        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Ошибка загрузки проектов');
        // Fallback пустой массив
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  const stats = [
    { value: projects.length.toString(), label: t('partnersProjects.stats.totalProjects') },
    { value: t('partnersProjects.stats.countries'), label: t('partnersProjects.stats.partnerCountries') },
    { value: t('partnersProjects.stats.jobsCreated'), label: t('partnersProjects.stats.jobsLabel') },
    { value: t('partnersProjects.stats.successRate'), label: t('partnersProjects.stats.successLabel') }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return t('partnersProjects.date.unknown');
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const handleProjectClick = (project) => {
    navigate(`/partners/projects/${project.id}`);
  };

  const filteredProjects = projects;

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
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 bg-white overflow-hidden">
      {/* Enhanced background with gradients */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 left-5 w-32 h-32 bg-amber-200 rounded-full blur-2xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-10 right-5 w-40 h-40 bg-emerald-200 rounded-full blur-2xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-200 rounded-full blur-2xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
          className="absolute top-2/3 left-1/4 w-28 h-28 bg-purple-200 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200 mb-6"
          >
            <span className="text-amber-600 text-sm font-semibold">{t('partnersProjects.badge')}</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            {t('partnersProjects.title')}
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full mx-auto mb-6"
          ></motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('partnersProjects.subtitle')}
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">{t('partnersProjects.loading')}</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('partnersProjects.error.title')}</h3>
            <p className="text-slate-600">{t('partnersProjects.error.message')}</p>
          </motion.div>
        )}



        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group cursor-pointer"
                    whileHover={{ y: -5 }}
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.image && (
                      <div className="relative h-48 bg-slate-100">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-white bg-opacity-90 text-slate-700 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                            {formatDate(project.published_at || project.created_at)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Project Header */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h4>
                      
                      <motion.p 
                        className="text-slate-600 leading-relaxed text-sm line-clamp-3 mb-4"
                        whileHover={{ x: 3 }}
                      >
                        {project.short_description || project.description?.substring(0, 150) + '...'}
                      </motion.p>

                      <div className="flex items-center justify-between">
                        <span className="text-amber-600 font-semibold text-sm">
                          {t('partnersProjects.project.more')}
                        </span>
                        {project.photos && project.photos.length > 0 && (
                          <span className="text-slate-400 text-xs flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            +{project.photos.length}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Accent Element */}
                    <div className="h-1 bg-gradient-to-r from-amber-500 to-emerald-500 w-full"></div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t('partnersProjects.noProjects.title')}</h3>
                  <p className="text-slate-600">{t('partnersProjects.noProjects.message')}</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PartnersProjects;