import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../../api';
import ScrollToTop from '../../ScrollToTop';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);


  // Прокрутка к верху при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Отслеживание прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Загрузка деталей проекта
  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Получаем проект по ID
        const response = await apiRequest(`partners/projects/${id}/?lang=${i18n.language}`);
        
        console.log('API Response:', response); // Для отладки
        
        let projectItem;
        // Обработка ответа API
        if (response.id) {
          projectItem = response;
        } else {
          throw new Error('Некорректный формат данных');
        }

        if (!projectItem) {
          throw new Error('Проект не найден');
        }

        // Формируем массив изображений
        const galleryImages = [];
        
        // Основное изображение проекта всегда первое
        if (projectItem.image) {
          galleryImages.push(projectItem.image);
        }
        
        // Обработка photos
        if (projectItem.photos && Array.isArray(projectItem.photos)) {
          projectItem.photos.forEach((photo) => {
            if (photo.image && photo.image !== projectItem.image) {
              galleryImages.push(photo.image);
            }
          });
        }
        
        projectItem.images_url = galleryImages;
        
        setProjectData(projectItem);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Ошибка загрузки проекта');
        // Используем fallback данные
        setProjectData(getFallbackData());
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetail();
    } else {
      setError('ID проекта не указан');
      setLoading(false);
    }
  }, [id, i18n.language]);



  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShare = async () => {
    if (!projectData) return;

    const shareData = {
      title: projectData.title,
      text: projectData.description || projectData.short_description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(t('newsDetail.share.copied'));
      }
    } catch (err) {
      console.log(t('newsDetail.share.error'), err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('projectDetail.date.unknown');
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Базовый URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://dordoi-backend-f6584db3b47e.herokuapp.com";
    return `${API_BASE_URL}${imagePath}`;
  };

  const getImagesArray = (data) => {
    if (!data) return [];
    
    if (data.images_url && Array.isArray(data.images_url)) {
      return data.images_url;
    }
    
    if (data.image) {
      return [data.image];
    }
    
    return [];
  };

  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    const images = getImagesArray(projectData);
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  }, [projectData]);

  const prevImage = useCallback(() => {
    const images = getImagesArray(projectData);
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  }, [projectData]);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, prevImage, nextImage]);

  const getPhotoLabel = (count) => {
    if (count === 1) return t('projectDetail.photos.single');
    if (i18n.language === 'ru') {
      return count < 5 ? t('projectDetail.photos.few') : t('projectDetail.photos.many');
    }
    return t('projectDetail.photos.many');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-blue-600 text-lg font-medium">{t('projectDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (error && !projectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('projectDetail.error.title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || t('projectDetail.error.message')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/partners/projects')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold"
            >
              {t('projectDetail.error.backToProjects')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all duration-300 font-semibold"
            >
              {t('projectDetail.error.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const data = projectData || getFallbackData();
  const images = getImagesArray(data);

  // Получаем контент для отображения
  const getContent = () => {
    if (data.description) return data.description;
    if (data.short_description) return data.short_description;
    return t('projectDetail.content.fallback');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="min-h-screen bg-white">{/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-30"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/partners/projects')}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('projectDetail.navigation.backToProjects')}</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>{t('projectDetail.navigation.share')}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={getImageUrl(images[0])}
                  alt={data.title}
                  className={`w-full h-96 object-cover transition-all duration-500 hover:scale-105 ${
                    imageLoaded[0] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(0)}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-r from-blue-50 to-cyan-50 flex items-center justify-center">
                        <svg class="w-24 h-24 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    `;
                  }}
                />
              </div>
              {!imageLoaded[0] && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white">
                    <span className="inline-block px-4 py-2 bg-blue-600 rounded-full text-sm font-semibold mb-3">
                      {t('projectDetail.badge')}
                    </span>
                    <h1 className="text-4xl font-bold leading-tight mb-3">{data.title}</h1>
                    {images.length > 1 && (
                      <p className="text-blue-100 text-lg opacity-90">
                        {images.length} {getPhotoLabel(images.length)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Meta Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6 mb-8 text-gray-600 bg-white/50 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(data.created_at || data.published_at)}</span>
            </div>
          </motion.div>

          {/* Gallery */}
          {images.length > 1 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('projectDetail.gallery.title')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.slice(1).map((image, index) => (
                  <motion.div
                    key={index + 1}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group aspect-square"
                    onClick={() => openLightbox(index + 1)}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${data.title} ${index + 2}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onLoad={() => handleImageLoad(index + 1)}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-r from-blue-50 to-cyan-50 flex items-center justify-center">
                            <svg class="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}



          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="prose prose-lg max-w-none bg-white rounded-3xl p-8 shadow-xl mb-12"
          >
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-4 bg-blue-50 py-4 rounded-r-lg">
              {data.short_description || data.description || getContent()}
            </p>

            <div className="space-y-6 text-gray-600 leading-8">
              {data.description && data.description !== data.short_description && (
                <div className="text-gray-700 whitespace-pre-line">
                  {data.description}
                </div>
              )}
            </div>
          </motion.div>


        </motion.article>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors duration-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative bg-black rounded-lg overflow-hidden">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={getImageUrl(images[currentImageIndex])}
                  alt={`${data.title} ${currentImageIndex + 1}`}
                  className="w-full max-h-[80vh] object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-black">
                        <svg class="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    `;
                  }}
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-blue-600 w-8'
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <ScrollToTop />
    </div>
    </div>
  );
};


export default ProjectDetail;