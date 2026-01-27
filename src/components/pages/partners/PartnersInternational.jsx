import React, { useRef, useState, useEffect, Suspense, lazy, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

import 'leaflet/dist/leaflet.css';

// Add custom styles for markers
const markerStyles = `
  .custom-partner-marker {
    background: transparent !important;
    border: none !important;
  }
  .custom-partner-marker div {
    transition: transform 0.2s ease-in-out;
  }
  .custom-partner-marker:hover div {
    transform: scale(1.1);
  }
  .leaflet-popup-content-wrapper {
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  .leaflet-popup-tip {
    box-shadow: none;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = markerStyles;
  document.head.appendChild(styleSheet);
}

// Отдельный мемоизированный компонент карты
const MapComponent = React.memo(({ 
  isClient, 
  isLoading, 
  error, 
  partners, 
  hoveredPartner, 
  createPartnerMarker, 
  handlePartnerClick, 
  handlePartnerMouseOver, 
  handlePartnerMouseOut, 
  t 
}) => {
  if (!isClient) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('partnersInternational.mapLoading', 'Загрузка карты...')}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('partnersInternational.loading', 'Загрузка партнеров...')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[42.8746, 74.5698]}
        zoom={3}
        style={{ height: '500px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {partners.map((partner) => {
          const markerIcon = createPartnerMarker(partner, hoveredPartner === partner.id);
          
          if (!markerIcon) return null;
          
          return (
            <Marker
              key={partner.id}
              position={[parseFloat(partner.coord1), parseFloat(partner.coord2)]}
              icon={markerIcon}
              eventHandlers={{
                click: () => handlePartnerClick(partner),
                mouseover: () => handlePartnerMouseOver(partner.id),
                mouseout: handlePartnerMouseOut,
              }}
            >
              <Popup className="custom-popup">
                <div className="p-3 min-w-[280px]">
                  <div className="flex items-center mb-3">
                    {partner.logo && (
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-blue-200"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">
                        {partner.name}
                      </h3>
                      <div className="text-xs text-gray-600">
                        {t('partnersInternational.partnerBadge', 'Партнер ассоциации')}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div 
                      className="text-sm text-gray-700 line-clamp-3"
                      dangerouslySetInnerHTML={{ 
                        __html: partner.description?.length > 150 
                          ? partner.description.substring(0, 150) + '...' 
                          : partner.description 
                      }}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePartnerClick(partner)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                      {t('partnersInternational.moreDetails', 'Подробнее')}
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
});

const PartnersInternational = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const { t, i18n } = useTranslation(); // Добавляем i18n деструктуризацию
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [hoveredPartner, setHoveredPartner] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Мемоизированная функция создания маркера
  const createPartnerMarker = useCallback((partner, isHovered = false) => {
    const size = isHovered ? 45 : 40;

    if (typeof window !== 'undefined' && window.L) {
      return window.L.divIcon({
        className: 'custom-partner-marker',
        html: `<div style="
          background-color: #3B82F6;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
        ">
          ${partner.logo ? `<img src="${partner.logo}" alt="${partner.name}" style="width: ${size - 8}px; height: ${size - 8}px; border-radius: 50%; object-fit: cover;" />` : `<span style="font-size: ${size/3}px;">🏢</span>`}
        </div>`,
        iconSize: [size, size],
        iconAnchor: [size/2, size/2],
        popupAnchor: [0, -size/2]
      });
    }
    return null;
  }, []);

  // Мемоизированные обработчики событий
  const handlePartnerClick = useCallback((partner) => {
    setSelectedPartner(partner);
  }, []);

  const handlePartnerMouseOver = useCallback((partnerId) => {
    setHoveredPartner(partnerId);
  }, []);

  const handlePartnerMouseOut = useCallback(() => {
    setHoveredPartner(null);
  }, []);

  const closePartnerModal = useCallback(() => {
    setSelectedPartner(null);
  }, []);

  useEffect(() => {
    setIsClient(true);
    
    // Fix for default markers in react-leaflet
    if (typeof window !== 'undefined' && window.L) {
      delete window.L.Icon.Default.prototype._getIconUrl;
      window.L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  // Загрузка данных партнеров из API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Добавляем параметр языка в запрос
        const currentLang = i18n.language || 'ru';
        const response = await axios.get(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/partners/?lang=${currentLang}`);
        
        // Фильтруем партнеров, у которых есть координаты
        const partnersWithCoordinates = response.data.filter(partner => 
          partner.coord1 && partner.coord2 && 
          !isNaN(parseFloat(partner.coord1)) && !isNaN(parseFloat(partner.coord2))
        );
        
        setPartners(partnersWithCoordinates);
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError(t('partnersInternational.error.loading', 'Ошибка загрузки партнеров'));
      } finally {
        setIsLoading(false);
      }
    };

    if (isInView) {
      fetchPartners();
    }
  }, [isInView, i18n.language]); // Добавляем i18n.language как зависимость

  // Мемоизированные объекты анимации
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  const modalVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }), []);

  const floatingVariants = useMemo(() => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);

  return (
    <section ref={ref} className="relative py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      
      {/* Фоновые элементы */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-green-200 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-200 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6"
          >
            <span className="text-blue-600 text-sm font-semibold">{t('partnersInternational.badge')}</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            {t('partnersInternational.title')}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t('partnersInternational.titleHighlight')}
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('partnersInternational.subtitle')}
          </motion.p>
        </motion.div>

        {/* Карта партнеров */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <MapComponent
              isClient={isClient}
              isLoading={isLoading}
              error={error}
              partners={partners}
              hoveredPartner={hoveredPartner}
              createPartnerMarker={createPartnerMarker}
              handlePartnerClick={handlePartnerClick}
              handlePartnerMouseOver={handlePartnerMouseOver}
              handlePartnerMouseOut={handlePartnerMouseOut}
              t={t}
              key={i18n.language} // Добавляем ключ для принудительной перерисовки при смене языка
            />
          </div>
        </motion.div>
      </div>

      {/* Модальное окно с информацией о партнере */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePartnerModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                {/* Заголовок модального окна */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {selectedPartner.logo && (
                      <img 
                        src={selectedPartner.logo} 
                        alt={selectedPartner.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200"
                      />
                    )}
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">
                        {selectedPartner.name}
                      </h2>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                          {t('partnersInternational.partnerBadge', 'Партнер ассоциации')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={closePartnerModal}
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-300 p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Описание */}
                <motion.div
                  variants={itemVariants}
                  className="mb-6"
                >
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div 
                      className="text-slate-700 text-base leading-relaxed prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedPartner.description }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PartnersInternational;