import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CameraIcon, TrophyIcon, GlobeIcon, HandshakeIcon, BriefcaseIcon } from '../../icons';
import { apiRequest } from '../../../api';
import PressBackground from '../../PressBackground';

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загрузка данных галереи или новости из API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        
        // Проверяем, является ли ID новостью
        if (id && id.startsWith('news-')) {
          // Загружаем данные конкретной новости
          const newsId = id.replace('news-', '');
          const newsData = await apiRequest(`presscentre/news/${newsId}/?lang=${lang}`);
          
          // Создаем галерею из изображения новости
          // Если у новости есть дополнительные изображения, добавляем их
          const images = [];
          
          // Основное изображение новости
          if (newsData.image) {
            images.push({
              id: newsData.id,
              src: newsData.image,
              thumbnail: newsData.image,
              title: newsData.title,
              description: newsData.short_description || newsData.description?.substring(0, 200) + '...' || '',
              date: new Date(newsData.published_at || newsData.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'kg' ? 'ky' : 'ru-RU'),
              photographer: 'Dordoi Association',
              tags: ['новость'],
              resolution: '1920x1080',
              size: '2.5 MB',
              license: 'Editorial Use'
            });
          }
          
          // Дополнительные изображения из поля photos
          if (newsData.photos && Array.isArray(newsData.photos)) {
            newsData.photos.forEach((photo, index) => {
              images.push({
                id: photo.id,
                src: photo.image,
                thumbnail: photo.image,
                title: `${newsData.title} - Фото ${index + 1}`,
                description: newsData.short_description || '',
                date: new Date(newsData.published_at || newsData.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'kg' ? 'ky' : 'ru-RU'),
                photographer: 'Dordoi Association',
                tags: ['новость'],
                resolution: '1920x1080',
                size: '2.5 MB',
                license: 'Editorial Use'
              });
            });
          }
          
          const transformedGallery = {
            id: `news-${newsData.id}`,
            title: newsData.title,
            category: newsData.category?.id?.toString() || 'news',
            categoryName: 'Новости',
            images: images
          };
          
          setGallery(transformedGallery);
        } else {
          // Загружаем обычную галерею
          const data = await apiRequest(`gallery/galleries/${id}/?language=${lang}`);
          
          // Преобразуем данные для компонента
          const transformedGallery = {
            id: data.id,
            title: data[`title_${lang}`] || data.title_ru,
            category: data.category.id.toString(),
            categoryName: data.category[`name_${lang}`] || data.category.name_ru,
            images: data.photos.map((photo, index) => ({
              id: photo.id,
              src: photo.image,
              thumbnail: photo.image,
              title: `Фото ${index + 1}`,
              description: '',
              date: new Date().toLocaleDateString(),
              photographer: 'Dordoi Association',
              tags: [],
              resolution: '4000x3000',
              size: '8.0 MB',
              license: 'Editorial Use'
            }))
          };
          
          setGallery(transformedGallery);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback для демонстрации
        setGallery({
          id: 1,
          title: t('media.galleries.anniversary.title'),
          category: 'anniversary',
          categoryName: 'Юбилей',
          images: [
            {
              id: 1,
              src: '/api/placeholder/1200/800',
              thumbnail: '/api/placeholder/300/200',
              title: t('media.galleries.anniversary.images.0.title'),
              description: t('media.galleries.anniversary.images.0.description'),
              date: '15.01.2024',
              photographer: t('media.galleries.anniversary.images.0.photographer'),
              tags: ['юбилей', 'торжество', 'награждение'],
              resolution: '4000x3000',
              size: '8.2 MB',
              license: 'Editorial Use'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, i18n.language, t]);

  // Данные галерей (в реальном приложении будут приходить из API)
  const galleries = [
    {
      id: 1,
      title: t('media.galleries.anniversary.title'),
      description: t('media.galleries.anniversary.description'),
      category: 'anniversary',
      year: '2024',
      coverImage: '/api/placeholder/600/400',
      images: [
        {
          id: 1,
          src: '/api/placeholder/1200/800',
          thumbnail: '/api/placeholder/300/200',
          title: t('media.galleries.anniversary.images.0.title'),
          description: t('media.galleries.anniversary.images.0.description'),
          date: '15.01.2024',
          photographer: t('media.galleries.anniversary.images.0.photographer'),
          tags: ['юбилей', 'торжество', 'награждение'],
          resolution: '4000x3000',
          size: '8.2 MB',
          license: 'Editorial Use'
        },
        {
          id: 2,
          src: '/api/placeholder/1200/800',
          thumbnail: '/api/placeholder/300/200',
          title: t('media.galleries.anniversary.images.1.title'),
          description: t('media.galleries.anniversary.images.1.description'),
          date: '15.01.2024',
          photographer: t('media.galleries.anniversary.images.1.photographer'),
          tags: ['ветераны', 'награды'],
          resolution: '4000x3000',
          size: '7.8 MB',
          license: 'Editorial Use'
        }
      ]
    },
    {
      id: 2,
      title: t('media.galleries.sports.title'),
      description: t('media.galleries.sports.description'),
      category: 'sports',
      year: '2024',
      coverImage: '/api/placeholder/600/400',
      images: [
        {
          id: 1,
          src: '/api/placeholder/1200/800',
          thumbnail: '/api/placeholder/300/200',
          title: t('media.galleries.sports.images.0.title'),
          description: t('media.galleries.sports.images.0.description'),
          date: '10.02.2024',
          photographer: t('media.galleries.sports.images.0.photographer'),
          tags: ['футбол', 'чемпионат'],
          resolution: '4000x3000',
          size: '9.1 MB',
          license: 'Editorial Use'
        }
      ]
    },
    {
      id: 3,
      title: t('media.galleries.international.title'),
      description: t('media.galleries.international.description'),
      category: 'international',
      year: '2023',
      coverImage: '/api/placeholder/600/400',
      images: [
        {
          id: 1,
          src: '/api/placeholder/1200/800',
          thumbnail: '/api/placeholder/300/200',
          title: t('media.galleries.international.images.0.title'),
          description: t('media.galleries.international.images.0.description'),
          date: '05.11.2023',
          photographer: t('media.galleries.international.images.0.photographer'),
          tags: ['меморандум', 'партнерство'],
          resolution: '4000x3000',
          size: '8.5 MB',
          license: 'Editorial Use'
        }
      ]
    },
    {
      id: 4,
      title: t('media.galleries.social.title'),
      description: t('media.galleries.social.description'),
      category: 'social',
      year: '2023',
      coverImage: '/api/placeholder/600/400',
      images: [
        {
          id: 1,
          src: '/api/placeholder/1200/800',
          thumbnail: '/api/placeholder/300/200',
          title: t('media.galleries.social.images.0.title'),
          description: t('media.galleries.social.images.0.description'),
          date: '20.09.2023',
          photographer: t('media.galleries.social.images.0.photographer'),
          tags: ['благотворительность', 'дети'],
          resolution: '4000x3000',
          size: '7.2 MB',
          license: 'Editorial Use'
        }
      ]
    },
    {
      id: 5,
      title: t('media.galleries.business.title'),
      description: t('media.galleries.business.description'),
      category: 'business',
      year: '2024',
      coverImage: '/api/placeholder/600/400',
      images: []
    }
  ];

  const categories = [
    { id: 'all', label: t('media.categories.all'), icon: <CameraIcon className="w-5 h-5" /> },
    { id: 'anniversary', label: t('media.categories.anniversary'), icon: <TrophyIcon className="w-5 h-5" /> },
    { id: 'sports', label: t('media.categories.sports'), icon: <TrophyIcon className="w-5 h-5" /> },
    { id: 'international', label: t('media.categories.international'), icon: <GlobeIcon className="w-5 h-5" /> },
    { id: 'social', label: t('media.categories.social'), icon: <HandshakeIcon className="w-5 h-5" /> },
    { id: 'business', label: t('media.categories.business'), icon: <BriefcaseIcon className="w-5 h-5" /> }
  ];

  const categoryIcons = {
    anniversary: <TrophyIcon className="w-6 h-6" />,
    sports: <TrophyIcon className="w-6 h-6" />,
    international: <GlobeIcon className="w-6 h-6" />,
    social: <HandshakeIcon className="w-6 h-6" />,
    business: <BriefcaseIcon className="w-6 h-6" />
  };

  const openLightbox = (imageIndex = 0) => {
    setSelectedImage(gallery);
    setLightboxIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setLightboxIndex(0);
  };

  const nextImage = () => {
    if (selectedImage && selectedImage.images && selectedImage.images.length > 0) {
      setLightboxIndex((prev) =>
        prev < selectedImage.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedImage && selectedImage.images.length > 0) {
      setLightboxIndex((prev) =>
        prev > 0 ? prev - 1 : selectedImage.images.length - 1
      );
    }
  };

  const handleShare = () => {
    if (gallery && navigator.share) {
      navigator.share({
        title: gallery.title,
        text: `Галерея: ${gallery.title}`,
        url: window.location.href,
      });
    } else if (gallery) {
      navigator.clipboard.writeText(window.location.href);
      alert(t('media.linkCopied'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Загрузка галереи...</p>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
            <div className="text-8xl font-bold text-slate-300 mb-4">404</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Галерея не найдена</h1>
            <p className="text-slate-600 mb-8">
              Запрашиваемая галерея не существует.
            </p>
            <button
              onClick={() => navigate('/press/media')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Вернуться к галереям
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PressBackground>
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Кнопка назад */}
        <motion.button
          onClick={() => navigate('/press/media')}
          className="mb-8 flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{t('common.back')}</span>
        </motion.button>

        {/* Заголовок галереи */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {gallery.title}
          </h1>
        </motion.div>

        {/* Сетка изображений */}
        {gallery.images.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {gallery.images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100">
                  <img
                    src={image.thumbnail}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v0" />
                      </svg>
                      <span className="text-blue-600 font-semibold text-sm">{t('media.viewImage')}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <span className="text-4xl text-white">📷</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {t('media.noImages')}
            </h3>
            <p className="text-slate-600">
              {t('media.noImagesDescription')}
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-200 z-10"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Изображение */}
              <div className="relative flex items-center justify-center w-full h-full">
                <img
                  src={selectedImage.images[lightboxIndex]?.src}
                  alt={selectedImage.images[lightboxIndex]?.title}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Кнопки навигации */}
                {selectedImage.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white"
                    >
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white"
                    >
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Миниатюры */}
                {selectedImage.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedImage.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setLightboxIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          lightboxIndex === index ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </PressBackground>
  );
};

export default GalleryDetail;