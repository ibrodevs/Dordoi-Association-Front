import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../../api';
import AboutBackground from '../../AboutBackground';

const SubsidiaryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [subsidiary, setSubsidiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  // Функция для извлечения изображений из HTML контента
  const extractImagesFromContent = (htmlContent) => {
    if (!htmlContent) return [];
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = Array.from(doc.querySelectorAll('img'));
    
    return images
      .map(img => ({
        src: img.src
      }))
      .filter(img => img.src);
  };

  // Функция для удаления изображений из HTML контента с сохранением структуры
  const removeImagesFromContent = (htmlContent) => {
    if (!htmlContent) return htmlContent;
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Очищаем все изображения
    const images = doc.querySelectorAll('img');
    images.forEach(img => {
      // Удаляем тег img полностью
      img.remove();
    });
    
    // Очищаем пустые параграфы и дивы, которые остались от изображений
    const emptyElements = doc.querySelectorAll('p:empty, div:empty');
    emptyElements.forEach(el => {
      el.remove();
    });
    
    // Очищаем лишние переносы строк
    const bodyHtml = doc.body.innerHTML;
    
    // Убираем множественные <br> теги
    const cleanedHtml = bodyHtml
      .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '<br>')
      .replace(/<p>\s*<br>\s*<\/p>/gi, '')
      .replace(/<div>\s*<br>\s*<\/div>/gi, '')
      .trim();
    
    return cleanedHtml;
  };

  // Загрузка данных subsidiary из API
  useEffect(() => {
    const fetchSubsidiary = async () => {
      try {
        setLoading(true);
        setError(null);
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        console.log('Fetching subsidiary with slug:', slug, 'and lang:', lang);
        const data = await apiRequest(`about-us/structure/${encodeURIComponent(slug)}/?lang=${lang}`);
        console.log('Received data:', data);
        
        // Извлекаем изображения из описания
        const extractedImages = extractImagesFromContent(data.description);
        setGalleryImages(extractedImages);
        
        // Удаляем изображения из описания
        const cleanedDescription = removeImagesFromContent(data.description);
        
        setSubsidiary({
          ...data,
          description: cleanedDescription
        });
      } catch (err) {
        console.error('Error fetching subsidiary:', err);
        setError(t('structure.subsidiaries.error'));
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSubsidiary();
    }
  }, [slug, i18n.language]);

  // Модальное окно для полноэкранного просмотра изображений
  const ImageModal = () => {
    if (!selectedImage) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        onClick={() => setSelectedImage(null)}
      >
        <div className="relative max-w-7xl max-h-[90vh] mx-4">
          <button
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-center justify-center h-full">
            <motion.img
              key={selectedImage.src}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
          
          {(selectedImage.alt || selectedImage.title) && (
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-medium">{selectedImage.alt || selectedImage.title}</p>
            </div>
          )}
          
          {/* Навигация по галерее */}
          {galleryImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryImages.findIndex(img => img.src === selectedImage.src);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
                  setSelectedImage(galleryImages[prevIndex]);
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryImages.findIndex(img => img.src === selectedImage.src);
                  const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
                  setSelectedImage(galleryImages[nextIndex]);
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Индикатор */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.src}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(img);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      img.src === selectedImage.src 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !subsidiary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
            <div className="text-8xl font-bold text-slate-300 mb-4">404</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Компания не найдена</h1>
            <p className="text-slate-600 mb-8">
              {error || 'Информация о запрашиваемой компании не найдена.'}
            </p>
            <button
              onClick={() => navigate('/about/structure')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Вернуться к структуре
            </button>
          </div>
        </div>
      </div>
    );
  }

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <AboutBackground>
      <style jsx global>{`
        .ck-content {
          font-size: 1.125rem;
          line-height: 1.75;
          color: #334155;
        }
        
        .ck-content p {
          margin-bottom: 1.5rem;
          text-align: justify;
          text-justify: inter-word;
        }
        
        .ck-content p:last-child {
          margin-bottom: 0;
        }
        
        .ck-content strong, .ck-content b {
          font-weight: 700;
          color: #1e293b;
        }
        
        .ck-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .ck-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .ck-content ul, .ck-content ol {
          margin-top: 1rem;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .ck-content li {
          margin-bottom: 0.5rem;
        }
        
        .ck-content ul {
          list-style-type: disc;
        }
        
        .ck-content ol {
          list-style-type: decimal;
        }
        
        .ck-content a {
          color: #2563eb;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
          transition: color 0.2s ease;
        }
        
        .ck-content a:hover {
          color: #1d4ed8;
        }
        
        .ck-content blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #475569;
        }
        
        .image-removed-placeholder {
          display: none;
        }
        
        /* Убираем лишние отступы и переносы */
        .ck-content br + br {
          display: none;
        }
        
        .ck-content p:empty {
          display: none;
        }
      `}</style>
      
      <section className="relative py-12 md:py-20 bg-slate-50 min-h-screen">
        {/* Фоновые элементы */}
        <div className="absolute inset-0 opacity-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-200 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Кнопка назад */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8"
          >
            <button
              onClick={() => navigate('/about/structure')}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-slate-700 font-medium">{t('structure.subsidiaries.backToStructure')}</span>
            </button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Заголовок с логотипом */}
            <div className="relative h-[40vh] md:h-[45vh] bg-gradient-to-r from-blue-600 to-cyan-600 text-white overflow-hidden">
              <img
                src={subsidiary.logo}
                alt={subsidiary.name}
                className="absolute inset-0 w-full h-full object-cover scale-105 blur-[1px] opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-cyan-900/70"></div>
              
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="p-2 md:p-3 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <img
                    src={subsidiary.logo}
                    alt={subsidiary.name}
                    className="w-[50vw] md:w-[25vw] max-h-[70%] object-contain rounded-xl md:rounded-2xl bg-white p-4 md:p-6 drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 md:px-10 lg:px-12 py-8 md:py-12">
              {/* Заголовок компании */}
              <motion.div
                variants={itemVariants}
                className="mb-8 md:mb-10"
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  {subsidiary.name}
                </h1>
                {subsidiary.short_description && (
                  <p className="text-lg md:text-xl text-slate-600 mt-3 md:mt-4">
                    {subsidiary.short_description}
                  </p>
                )}
              </motion.div>

              {/* Галерея изображений (если есть) */}
              {galleryImages.length > 0 && (
                <motion.div
                  variants={galleryVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-10 md:mb-12"
                >
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      {t('structure.subsidiaries.gallery')}
                    </h2>
                    <span className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full">
                      {galleryImages.length} {t('structure.subsidiaries.photos')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {galleryImages.map((img, index) => (
                      <motion.div
                        key={img.src}
                        variants={imageVariants}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                      >
                        <div className="aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl md:rounded-2xl">
                          <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3">
                            <p className="text-white text-xs md:text-sm font-medium truncate">{img.alt}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                </motion.div>
              )}

              {/* Описание компании */}
              <motion.div
                variants={itemVariants}
                className="mb-10 md:mb-12"
              >
                <div className="ck-content description-content">
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: subsidiary.description }}
                  />
                </div>
              </motion.div>

              {/* Контактная информация */}
              {(subsidiary.address || subsidiary.contacts || subsidiary.email || subsidiary.phone) && (
                <motion.div
                  variants={itemVariants}
                  className="mb-10 md:mb-12"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8">{t('structure.subsidiaries.contacts')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {subsidiary.address && (
                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm md:text-base mb-1">{t('structure.subsidiaries.address')}</div>
                          <div className="text-slate-600 text-sm md:text-base">{subsidiary.address}</div>
                        </div>
                      </div>
                    )}
                    {subsidiary.email && (
                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm md:text-base mb-1">{t('structure.subsidiaries.email')}</div>
                          <div className="text-slate-600 text-sm md:text-base">{subsidiary.email}</div>
                        </div>
                      </div>
                    )}
                    {subsidiary.phone && (
                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm md:text-base mb-1">{t('structure.subsidiaries.phone')}</div>
                          <div className="text-slate-600 text-sm md:text-base">{subsidiary.phone}</div>
                        </div>
                      </div>
                    )}
                    {subsidiary.contacts && (
                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-200">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm md:text-base mb-1">{t('structure.subsidiaries.contactsField')}</div>
                          <div className="text-slate-600 text-sm md:text-base">{subsidiary.contacts}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Кнопки действий */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-6 md:pt-8 border-t border-slate-200"
              >
                {subsidiary.website && (
                  <a
                    href={subsidiary.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 shadow-md inline-flex items-center justify-center space-x-2 md:space-x-3 text-sm md:text-base"
                  >
                    <span>{t('structure.subsidiaries.website')}</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={() => navigate('/about/structure')}
                  className={`${subsidiary.website ? '' : 'flex-1'} px-6 md:px-8 py-3 md:py-4 bg-slate-100 text-slate-700 rounded-xl md:rounded-2xl font-semibold hover:bg-slate-200 transition-all duration-300 text-sm md:text-base`}
                >
                  {t('structure.subsidiaries.backToStructure')}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Модальное окно для просмотра изображений */}
      {selectedImage && <ImageModal />}
    </AboutBackground>
  );
};

export default SubsidiaryDetail;