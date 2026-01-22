import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  AboutIcon, 
  ActivitiesIcon, 
  PressIcon, 
  PartnersIcon, 
  ContactsIcon,
  ChevronDown,
  MenuIcon,
  CloseIcon
} from '../icons';
import Logo from '../../assets/images.png'

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);

  // Обработчик скролла с hide/show эффектом
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Эффект тени при скролле
      setIsScrolled(currentScrollY > 10);
      
      // Hide/show navbar при скролле
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Автоматическое закрытие dropdown при наведении
  const handleMouseEnter = (key) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Функция для преобразования ключей в пути
  const getSubmenuPath = (parentKey, subItemKey) => {
    // Убираем префикс родительского ключа и создаем путь
    const path = subItemKey.replace(`${parentKey}_`, '');
    return `/${parentKey}/${path}`;
  };

  // Структура меню
  const menuItems = [
    {
      key: 'about',
      label: t('nav.about'),
      icon: AboutIcon,
      path: '/about',
      submenu: [
        { key: 'about_history', label: t('nav.about_history'), path: '/about/history' },
        { key: 'about_mission', label: t('nav.about_mission'), path: '/about/mission' },
        { key: 'about_leadership', label: t('nav.about_leadership'), path: '/about/leadership' },
        { key: 'about_structure', label: t('nav.about_structure'), path: '/about/structure' },
        { key: 'about_facts', label: t('nav.about_facts'), path: '/about/facts' }
      ]
    },
    {
      key: 'activities',
      label: t('nav.activities'),
      icon: ActivitiesIcon,
      path: '/activities',
      submenu: [
        { key: 'activities_services', label: t('nav.activities_services'), path: '/activities/services' },
        { key: 'activities_production', label: t('nav.activities_production'), path: '/activities/production' },
        { key: 'activities_education', label: t('nav.activities_education'), path: '/activities/education' },
        { key: 'activities_culture_leisure', label: t('nav.activities_culture_leisure'), path: '/activities/culture-leisure' },
        { key: 'activities_sports', label: t('nav.activities_sports'), path: '/activities/sports' },
      ]
    },
    {
      key: 'press',
      label: t('nav.press'),
      icon: PressIcon,
      path: '/press',
      submenu: [
        { key: 'press_news', label: t('nav.press_news'), path: '/press/news' },
        { key: 'press_media', label: t('nav.press_media'), path: '/press/media' },
        { key: 'press_publications', label: t('nav.press_publications'), path: '/press/publications' },
        // { key: 'press_events', label: t('nav.press_events'), path: '/press/events' },
        // { key: 'press_releases', label: t('nav.press_releases'), path: '/press/releases' }
      ]
    },
    {
      key: 'partners',
      label: t('nav.partners'),
      icon: PartnersIcon,
      path: '/partners',
      submenu: [
        { key: 'partners_our', label: t('nav.partners_our'), path: '/partners/our' },
        { key: 'partners_international', label: t('nav.partners_international'), path: '/partners/international' },
        { key: 'partners_projects', label: t('nav.partners_projects'), path: '/partners/projects' },
        // { key: 'partners_conferences', label: t('nav.partners_conferences'), path: '/partners/conferences' },
        { key: 'partners_role', label: t('nav.partners_role'), path: '/partners/role' }
      ]
    },
    {
      key: 'contacts',
      label: t('nav.contacts'),
      icon: ContactsIcon,
      path: '/contacts',
      submenu: [
        { key: 'contacts_address', label: t('nav.contacts_address'), path: '/contacts/address' },
        { key: 'contacts_info', label: t('nav.contacts_info'), path: '/contacts/info' },
        // { key: 'contacts_social', label: t('nav.contacts_social'), path: '/contacts/social' },
        // { key: 'contacts_form', label: t('nav.contacts_form'), path: '/contacts/form' }
      ]
    }
  ];

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  const NavbarItem = ({ item }) => {
    const IconComponent = item.icon;
    
    if (item.submenu) {
      return (
        <div className="relative">
          <button
            onClick={() => toggleDropdown(item.key)}
            onMouseEnter={() => handleMouseEnter(item.key)}
            onMouseLeave={handleMouseLeave}
            className={`group flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeDropdown === item.key 
                ? 'bg-white/10 text-white backdrop-blur-sm' 
                : 'text-white/90 hover:text-white hover:bg-white/5'
            }`}
          >
            <IconComponent className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            <span>{item.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
              activeDropdown === item.key ? 'rotate-180' : ''
            }`} />
          </button>

          {activeDropdown === item.key && (
            <div 
              className="absolute left-0 mt-1 w-64 rounded-xl bg-white/95 backdrop-blur-lg shadow-2xl border border-white/20 z-50 animate-fadeIn"
              onMouseEnter={() => handleMouseEnter(item.key)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="p-2">
                {item.submenu.map((subItem, index) => (
                  <Link
                    key={subItem.key}
                    to={subItem.path}
                    onClick={closeAllDropdowns}
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-200 block">
                      {subItem.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        to={item.path}
        className="group flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200"
        onClick={closeAllDropdowns}
      >
        <IconComponent className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <nav 
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-blue-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-[56px]">
          {/* Логотип */}
          <div className="flex-shrink-0 flex items-center rounded-2xl">
            <Link 
              to="/" 
              className="group flex items-center space-x-3"
              onClick={closeAllDropdowns}
            >
              <div className="relative rounded-2xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <img src={Logo} alt="" className='w-full h-full rounded-xl object-cover' />
                </div>
                <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-lg sm:text-xl font-semibold leading-tight"> «Дордой»</span>
              </div>
            </Link>
          </div>

          {/* Десктопное меню */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <NavbarItem key={item.key} item={item} />
            ))}
          </div>

          {/* Правая часть - Language Switcher */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* Мобильное меню - кнопка */}
            <div className="lg:hidden flex items-center space-x-2">
              <div className="hidden sm:block">
                <LanguageSwitcher mobile={true} />
              </div>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white/90 hover:text-white p-3 rounded-lg hover:bg-white/5 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Мобильное меню */}
        {isOpen && (
          <div className="lg:hidden bg-slate-800/95 backdrop-blur-xl border-t border-white/10 rounded-b-2xl shadow-2xl animate-slideDown">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                
                return (
                  <div key={item.key} className="border-b border-white/10 last:border-b-0">
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.key)}
                          className={`w-full text-left px-4 py-4 rounded-lg text-base font-medium flex items-center justify-between transition-all duration-200 min-h-[48px] ${
                            activeDropdown === item.key 
                              ? 'bg-white/10 text-white' 
                              : 'text-white/90 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5" />
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.key ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {activeDropdown === item.key && (
                          <div className="ml-6 mt-1 mb-2 space-y-1 animate-fadeIn">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.key}
                                to={subItem.path}
                                onClick={closeAllDropdowns}
                                className="flex items-center px-4 py-3 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 min-h-[44px]"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeAllDropdowns}
                        className="block px-4 py-4 rounded-lg text-base font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center space-x-3 min-h-[48px]"
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
              
              {/* Language Switcher для мобильной версии */}
              <div className="pt-4 border-t border-white/10 lg:hidden">
                <div className="px-4">
                  <LanguageSwitcher mobile={true} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;