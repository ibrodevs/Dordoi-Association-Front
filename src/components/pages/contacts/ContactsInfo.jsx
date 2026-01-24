import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ContactsInfo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [contacts, setContacts] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Определяем параметр языка для API
        let langParam = 'ru'; // по умолчанию русский
        if (i18n.language === 'en') {
          langParam = 'en';
        } else if (i18n.language === 'kg') {
          langParam = 'kg';
        }

        const response = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/about-us/structure/?lang=${langParam}`);
        const data = await response.json();
        const departmentsData = data.map((structure, index) => ({
          id: structure.id,
          name: structure.name,
          description: structure.address,
          detailed: structure.address,
          icon: (
            <img src={structure.logo} alt={structure.name} className="w-full h-full object-cover" />
          ),
          contacts: [
            structure.email && {
              type: 'email',
              value: structure.email,
              label: t('contactsInfo.types.email'),
              action: 'email'
            },
            structure.phone && {
              type: 'phone',
              value: structure.phone,
              label: t('contactsInfo.types.phone'),
              action: 'phone'
            },
            structure.address && {
              type: 'location',
              value: structure.address,
              label: t('contactsInfo.types.address'),
              action: 'info'
            }
          ].filter(Boolean),
          color: ['blue', 'green', 'purple', 'orange', 'red', 'cyan'][index % 6],
          socialLinks: []
        }));
        setContacts(departmentsData);
        if (departmentsData.length > 0) {
          setActiveDepartment(departmentsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [i18n.language, t]);

  const colorMap = {
    blue: { 
      light: 'bg-blue-50', 
      dark: 'bg-blue-600', 
      text: 'text-blue-600', 
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: { 
      light: 'bg-green-50', 
      dark: 'bg-green-600', 
      text: 'text-green-600', 
      border: 'border-green-200',
      gradient: 'from-green-500 to-green-600'
    },
    purple: { 
      light: 'bg-purple-50', 
      dark: 'bg-purple-600', 
      text: 'text-purple-600', 
      border: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-600'
    },
    orange: { 
      light: 'bg-orange-50', 
      dark: 'bg-orange-600', 
      text: 'text-orange-600', 
      border: 'border-orange-200',
      gradient: 'from-orange-500 to-orange-600'
    },
    red: { 
      light: 'bg-red-50', 
      dark: 'bg-red-600', 
      text: 'text-red-600', 
      border: 'border-red-200',
      gradient: 'from-red-500 to-red-600'
    },
    cyan: { 
      light: 'bg-cyan-50', 
      dark: 'bg-cyan-600', 
      text: 'text-cyan-600', 
      border: 'border-cyan-200',
      gradient: 'from-cyan-500 to-cyan-600'
    }
  };

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
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
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

  const activeDepartmentData = contacts.find(dept => dept.id === activeDepartment);

  const handleContactAction = (contact) => {
    switch (contact.action) {
      case 'email':
        window.open(`mailto:${contact.value}`);
        break;
      case 'phone':
        window.open(`tel:${contact.value}`);
        break;
      case 'website':
        window.open(contact.value, '_blank');
        break;
      case 'map':
        // In a real app, this would open a map
        console.log('Opening map for:', contact.value);
        break;
      default:
        break;
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'hours':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'location':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'emergency':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'website':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'email':
      case 'phone':
      case 'website':
      case 'map':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes premium-rotate {
          0%, 100% { 
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.05);
          }
          50% {
            transform: rotate(180deg) scale(0.95);
          }
          75% {
            transform: rotate(270deg) scale(1.08);
          }
        }

        @keyframes premium-float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(2deg);
          }
          66% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }

        @keyframes premium-pulse {
          0%, 100% { 
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes professionalPulse {
          0%, 100% { 
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-premium-rotate {
          animation: premium-rotate 30s linear infinite;
        }

        .animate-premium-float {
          animation: premium-float 15s ease-in-out infinite;
        }

        .animate-premium-pulse {
          animation: premium-pulse 8s ease-in-out infinite;
        }
      `}</style>
      <section ref={ref} className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        {/* Основной профессиональный градиент */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/80 to-blue-200/60"></div>
        
        {/* Дополнительный слой для усиления видимости */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/30 to-indigo-100/40"></div>
        
        {/* Премиум элементы */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Элегантные плавающие формы */}
          <div className="absolute -top-64 -right-64 w-128 h-128 opacity-60">
            <div className="relative w-full h-full animate-premium-rotate">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 to-indigo-700/12 rounded-full blur-3xl"></div>
              <div className="absolute top-16 left-16 w-96 h-96 bg-gradient-to-tr from-cyan-600/12 to-blue-600/8 rounded-full blur-2xl"></div>
              <div className="absolute top-32 left-32 w-64 h-64 bg-gradient-to-bl from-indigo-600/10 to-slate-600/6 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <div className="absolute top-1/3 -left-48 w-96 h-96 opacity-55">
            <div className="relative w-full h-full animate-premium-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 to-cyan-600/10 rounded-full blur-3xl"></div>
              <div className="absolute top-12 left-12 w-72 h-72 bg-gradient-to-br from-indigo-600/12 to-blue-700/8 rounded-full blur-2xl"></div>
            </div>
          </div>
          
          {/* Элегантные геометрические элементы */}
          <div className="absolute top-1/6 right-1/5">
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600/15 to-indigo-700/12 border border-blue-600/25 transform rotate-45 transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-90 animate-premium-pulse">
                <div className="absolute inset-4 bg-gradient-to-tr from-blue-600/20 to-cyan-600/15 border border-blue-500/30"></div>
                <div className="absolute inset-8 bg-gradient-to-bl from-white/20 to-transparent"></div>
              </div>
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-600/40 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/6">
            <div className="relative group">
              <div className="w-28 h-28 border-3 border-indigo-600/35 rounded-2xl transform rotate-12 transition-all duration-700 group-hover:rotate-45 group-hover:scale-105 animate-premium-float">
                <div className="w-full h-full bg-gradient-to-br from-indigo-600/18 to-blue-700/15 rounded-xl"></div>
                <div className="absolute inset-3 border-2 border-indigo-500/25 rounded-lg"></div>
                <div className="absolute inset-6 bg-gradient-to-tr from-white/25 to-transparent rounded-md"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-3/5 right-1/3">
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-600/18 to-blue-700/15 rounded-full border-2 border-cyan-600/35 transition-all duration-500 group-hover:scale-125 animate-premium-pulse" style={{animationDelay: '2s'}}>
                <div className="absolute inset-3 bg-gradient-to-tr from-cyan-600/25 to-blue-600/20 rounded-full"></div>
                <div className="absolute inset-6 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Динамические профессиональные линии */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="premiumGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(37, 99, 235, 0)">
                    <animate attributeName="stop-opacity" values="0;0.4;0" dur="8s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="30%" stopColor="rgba(59, 130, 246, 0.25)">
                    <animate attributeName="stop-opacity" values="0.25;0.5;0.25" dur="8s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="70%" stopColor="rgba(99, 102, 241, 0.22)">
                    <animate attributeName="stop-opacity" values="0.22;0.45;0.22" dur="8s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="100%" stopColor="rgba(129, 140, 248, 0)">
                    <animate attributeName="stop-opacity" values="0;0.35;0" dur="8s" repeatCount="indefinite"/>
                  </stop>
                </linearGradient>
                
                <filter id="premiumGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <path d="M0,500 Q400,300 800,500 T1600,500" 
                    stroke="url(#premiumGrad1)" 
                    strokeWidth="2.5" 
                    fill="none" 
                    filter="url(#premiumGlow)">
                <animate attributeName="d" 
                         values="M0,500 Q400,300 800,500 T1600,500;M0,500 Q400,400 800,500 T1600,500;M0,500 Q400,300 800,500 T1600,500" 
                         dur="14s" 
                         repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <span className="text-blue-600 text-sm font-semibold">{t('contactsInfo.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            {t('contactsInfo.title')}
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6">
          </div>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('contactsInfo.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Список отделов */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl p-6 shadow-2xl border border-slate-200/50 backdrop-blur-sm bg-white/80">
              
              <div 
                className="space-y-4 max-h-[48rem] overflow-y-auto pr-2 hide-scrollbar"
              >
              {contacts.map((contact, index) => {
                const colors = colorMap[contact.color];
                return (
                  <button
                    key={contact.id}
                    onClick={() => setActiveDepartment(contact.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden ${
                      activeDepartment === contact.id
                        ? `${colors.border} bg-gradient-to-r ${colors.gradient} shadow-lg shadow-${colors.text.replace('text-', '')}-200/30 border-transparent`
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/30'
                    }`}
                  >
                    <div className="relative flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden ${
                        activeDepartment === contact.id ? 'bg-white/30 backdrop-blur-sm' : `${colors.light} group-hover:${colors.dark} transition-colors duration-300`
                      }`}>
                        <div className={`${activeDepartment === contact.id ? 'text-white' : `${colors.text} group-hover:text-white`} w-14 h-14 flex items-center justify-center transition-all duration-300 relative z-10`}>
                          {contact.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-bold mb-1 transition-colors duration-300 ${
                          activeDepartment === contact.id ? 'text-white' : 'text-slate-900 group-hover:text-slate-800'
                        }`}>
                          {contact.name}
                        </h3>
                        <p className={`text-sm transition-colors duration-300 ${
                          activeDepartment === contact.id ? 'text-white/80' : 'text-slate-500 group-hover:text-slate-600'
                        }`}>
                          {contact.description ? contact.description.slice(0, 50) + '...' : t('contactsInfo.tapForDetails')}
                        </p>
                      </div>
                      
                      {/* Индикатор активности */}
                      <div className={`flex-shrink-0 transition-all duration-300 ${
                        activeDepartment === contact.id ? 'text-white' : 'text-slate-300 group-hover:text-slate-400'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            </div>
          </div>

          {/* Детали выбранного отдела */}
          <div className="lg:col-span-3">
            {activeDepartmentData && (
              <div
                key={activeDepartmentData.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-2xl overflow-hidden"
              >

                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-full max-w-4xl mx-auto mb-6">
                      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-100 to-slate-200">
                        {activeDepartmentData.icon}
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                      {activeDepartmentData.name}
                    </h3>
                  </div>

                  {/* Контактная информация */}
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-6">
                      {t('contactsInfo.contactInformation')}
                    </h4>
                    
                    <div className="space-y-4 mb-8">
                      {activeDepartmentData.contacts.map((contact, index) => (
                        <div
                          key={index}
                          className={`flex items-start space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            contact.action !== 'info' 
                              ? 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100' 
                              : 'border-slate-200 bg-slate-50'
                          }`}
                          onClick={() => contact.action !== 'info' && handleContactAction(contact)}
                        >
                          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                            contact.action !== 'info' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {getContactIcon(contact.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-slate-900 mb-1">
                              {contact.label}
                            </h5>
                            <p className={`text-sm ${
                              contact.action !== 'info' 
                                ? 'text-blue-600 font-medium' 
                                : 'text-slate-600'
                            }`}>
                              {contact.value}
                            </p>
                          </div>
                          
                          {contact.action !== 'info' && (
                            <div className="flex-shrink-0 flex items-center space-x-2">
                              {getActionIcon(contact.action)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Премиум волны внизу */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <svg viewBox="0 0 1600 120" className="absolute bottom-0 w-full h-full opacity-60">
            <defs>
              <linearGradient id="contactWave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(37, 99, 235, 0.15)"/>
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.25)"/>
                <stop offset="100%" stopColor="rgba(37, 99, 235, 0.15)"/>
              </linearGradient>
            </defs>
            
            <path d="M0,60 Q400,20 800,60 T1600,60 L1600,120 L0,120 Z" 
                  fill="url(#contactWave1)">
              <animate attributeName="d" 
                       values="M0,60 Q400,20 800,60 T1600,60 L1600,120 L0,120 Z;M0,60 Q400,80 800,60 T1600,60 L1600,120 L0,120 Z;M0,60 Q400,20 800,60 T1600,60 L1600,120 L0,120 Z" 
                       dur="15s" 
                       repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactsInfo;