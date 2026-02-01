import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { t, i18n } = useTranslation();

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        
        // Fetch banners
        const bannersResponse = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/banners/?lang=${lang}`);
        const bannersData = await bannersResponse.json();
        const bannerSlides = bannersData.map(banner => ({
          id: `banner-${banner.id}`,
          title: banner.title,
          subtitle: banner.idea,
          description: banner.desctip,
          buttonText: banner.link_url ? t('hero.bannerButton') : null,
          buttonLink: banner.link_url,
          image: banner.image,
          overlay: "bg-blue-900/70"
        }));
        
        // Fetch fact_banners
        const factBannersResponse = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/about-us/fact_banners/?lang=${lang}`);
        const factBannersData = await factBannersResponse.json();
        const filteredFactBanners = factBannersData.filter(banner => banner.is_banner);
        const factBannerSlides = filteredFactBanners.map(banner => ({
          id: `fact-${banner.id}`,
          title: banner.title,
          subtitle: banner.details,
          description: banner.description,
          buttonText: banner.link_url ? t('hero.bannerButton') : null,
          buttonLink: banner.link_url,
          image: banner.photo,
          overlay: "bg-blue-900/70"
        }));
        
        // Fetch news-banners
        const newsBannersResponse = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/presscentre/news-banners/?lang=${lang}`);
        const newsBannersData = await newsBannersResponse.json();
        const filteredNewsBanners = newsBannersData.filter(banner => banner.is_banner);
        const newsBannerSlides = filteredNewsBanners.map(banner => ({
          id: `news-${banner.id}`,
          title: banner.title,
          subtitle: banner.short_description,
          description: '',
          buttonText: t('hero.bannerButton'),
          buttonLink: `/press/news/${banner.id}`,
          image: banner.image,
          overlay: "bg-blue-900/70"
        }));
        
        // Combine slides
        const allSlides = [...bannerSlides, ...factBannerSlides, ...newsBannerSlides];
        setSlides(allSlides);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, [i18n.language, t]);

  // Автопереключение слайдов
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative h-screen md:h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Слайды */}
      {slides.map((slide, index) => {
        const buttonElement = slide.buttonLink ? (
          slide.buttonLink.startsWith('http') ? (
            <a
              href={slide.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 md:mt-6 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300"
            >
              {slide.buttonText}
            </a>
          ) : (
            <Link
              to={slide.buttonLink}
              className="inline-block mt-4 md:mt-6 px-6 py-2 md:px-8 md:py-3 text-sm md:text-base bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300"
            >
              {slide.buttonText}
            </Link>
          )
        ) : null;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 transform translate-x-0'
                : 'opacity-0 transform translate-x-full'
            }`}
          >
            {/* Фоновое изображение */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Затемнение */}
            <div className={`absolute inset-0 ${slide.overlay}`} />
            
            {/* Контент */}
            <div className="relative h-full flex items-end pb-20 md:pb-24 lg:pb-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl md:max-w-2xl lg:max-w-4xl">
                  <div className="w-fit bg-slate-900/50 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border border-white/10 space-y-3 transition-all duration-300 hover:bg-slate-900/60 shadow-lg pr-8 md:pr-12">
                    {/* Заголовок */}
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight shadow-sm">
                      {slide.title}
                    </h1>
                    
                    {/* Подзаголовок */}
                    <p className="text-xs sm:text-sm md:text-base text-yellow-300 font-medium leading-snug shadow-sm line-clamp-3">
                      {slide.subtitle}
                    </p>
                    
                    {/* Кнопка */}
                    <div className="pt-1">
                       {buttonElement}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Навигационные стрелки */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={t('hero.previousSlide')}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={t('hero.nextSlide')}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={t('hero.goToSlide', { number: index + 1 })}
          />
        ))}
      </div>

      {/* Градиент снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-slate-900/50 to-transparent" />
    </div>
  );
};

export default HeroSlider;