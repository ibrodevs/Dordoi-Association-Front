import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  CogIcon,
  TruckIcon,
  HomeIcon,
  UserGroupIcon,
  ClockIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  BanknotesIcon,
  ComputerDesktopIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  PhotoIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

const ServicesSection = () => {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Основные направления услуг
  const serviceAreas = [
    {
      id: 1,
      title: 'Логистические услуги',
      description: 'Доставка, складирование и транспортировка товаров по всей стране и за её пределы.',
      icon: TruckIcon,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Складские услуги',
        'Доставка по городу',
        'Международные перевозки',
        'Упаковка товаров'
      ]
    },
    {
      id: 2,
      title: 'Ремонт и сервис',
      description: 'Профессиональный ремонт техники, одежды, обуви и других товаров.',
      icon: WrenchScrewdriverIcon,
      gradient: 'from-green-500 to-emerald-500',
      features: [
        'Ремонт электроники',
        'Ателье и швейные услуги',
        'Ремонт обуви',
        'Техническое обслуживание'
      ]
    },
    {
      id: 3,
      title: 'Финансовые услуги',
      description: 'Банковские операции, денежные переводы и финансовое консультирование.',
      icon: BanknotesIcon,
      gradient: 'from-purple-500 to-violet-500',
      features: [
        'Денежные переводы',
        'Обмен валют',
        'Банковские услуги',
        'Кредитование'
      ]
    },
    {
      id: 4,
      title: 'Бытовые услуги',
      description: 'Парикмахерские, кафе, прачечные и другие услуги для повседневной жизни.',
      icon: HomeIcon,
      gradient: 'from-orange-500 to-yellow-500',
      features: [
        'Парикмахерские услуги',
        'Прачечная и химчистка',
        'Общественное питание',
        'Бытовые услуги'
      ]
    },
    {
      id: 5,
      title: 'Цифровые услуги',
      description: 'IT-поддержка, интернет-услуги, цифровые платформы и техническая помощь.',
      icon: ComputerDesktopIcon,
      gradient: 'from-indigo-500 to-blue-500',
      features: [
        'Интернет и Wi-Fi',
        'IT-поддержка',
        'Цифровые платежи',
        'Техническая помощь'
      ]
    },
    {
      id: 6,
      title: 'Консультационные услуги',
      description: 'Юридическая помощь, бизнес-консультации и профессиональная поддержка.',
      icon: UserGroupIcon,
      gradient: 'from-pink-500 to-rose-500',
      features: [
        'Юридические услуги',
        'Бизнес-консультации',
        'Бухгалтерские услуги',
        'Таможенные услуги'
      ]
    }
  ];

  // Преимущества для клиентов
  const benefits = [
    {
      icon: ClockIcon,
      text: 'Быстрое обслуживание',
      gradient: 'from-blue-400 to-blue-500'
    },
    {
      icon: ShieldCheckIcon,
      text: 'Гарантия качества',
      gradient: 'from-green-400 to-green-500'
    },
    {
      icon: CreditCardIcon,
      text: 'Доступные цены',
      gradient: 'from-purple-400 to-purple-500'
    },
    {
      icon: PhoneIcon,
      text: '24/7 поддержка',
      gradient: 'from-orange-400 to-orange-500'
    }
  ];

  // FAQ
  const faqs = [
    {
      question: 'Какие услуги доступны на рынке Дордой?',
      answer: 'На рынке представлен полный спектр услуг: от логистических и ремонтных до финансовых и консультационных. Это делает Дордой полноценным городом с собственной инфраструктурой.',
      icon: CogIcon
    },
    {
      question: 'Как работают сервисные центры?',
      answer: 'Сервисные центры работают ежедневно, предоставляя качественные услуги по ремонту и обслуживанию. Опытные мастера используют современное оборудование и гарантируют результат.',
      icon: WrenchScrewdriverIcon
    },
    {
      question: 'Доступны ли финансовые услуги?',
      answer: 'Да, на территории рынка работают банковские отделения, пункты обмена валют, денежных переводов и другие финансовые сервисы для удобства предпринимателей и покупателей.',
      icon: BanknotesIcon
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Фоновые элементы */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(0,0,254,0.3)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.2)_0%,_transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Анимированные частицы */}
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-20 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center text-white"
          >
            {/* Бейдж */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8 group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              <CogIcon className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-blue-100">
                Сфера услуг
              </span>
            </motion.div>
            
            {/* Заголовок */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Сфера услуг Дордой —{' '}
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                всё для бизнеса и жизни в одном месте
              </span>
            </motion.h1>
            
            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Рынок Дордой — это не только торговля, но и развитая экосистема услуг: от логистики и ремонта до финансовых, бытовых и профессиональных сервисов.
            </motion.p>
            
            {/* Краткое описание */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-blue-200/80 mb-10 max-w-3xl mx-auto"
            >
              Тысячи предпринимателей и клиентов ежедневно пользуются услугами, которые делают работу, покупки и жизнь удобнее.
            </motion.p>

            {/* CTA кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="font-semibold">Узнать больше</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold">
                Посмотреть направления услуг
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Блок "О сфере услуг" */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Текстовая часть */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    О РАЗДЕЛЕ
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Сфера услуг — <span className="text-blue-600">сердце повседневной жизни</span> Дордоя
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Сфера услуг на рынке Дордой — это одна из ключевых составляющих его устойчивого развития. Здесь сосредоточены сотни сервисов, которые ежедневно обслуживают предпринимателей, оптовых покупателей, сотрудников и гостей рынка.
                </p>
                
                <p>
                  Услуги Дордоя охватывают широкий спектр направлений — от логистических и складских решений до бытовых, финансовых и профессиональных сервисов. Благодаря этому рынок функционирует как самостоятельный город с собственной инфраструктурой и ритмом жизни.
                </p>
                
                <p>
                  Каждый сервис здесь ориентирован на скорость, доступность и практичность — именно те качества, которые особенно важны в условиях крупного торгового центра.
                </p>
              </div>
              
              {/* Дополнительный блок */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
              >
                <p className="text-lg font-medium text-gray-800">
                  Сфера услуг Дордоя постоянно развивается, адаптируясь к новым требованиям бизнеса и клиентов. Современные сервисы, цифровые решения и профессиональные специалисты помогают предпринимателям сосредоточиться на главном — развитии своего дела.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Изображения */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Основное изображение */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="col-span-2 relative group overflow-hidden rounded-3xl shadow-2xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2126"
                    alt="Рабочие процессы и обслуживание клиентов"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg">Профессиональное обслуживание</p>
                    <p className="text-sm text-gray-200">Мастера за работой</p>
                  </div>
                </motion.div>
                
                {/* Второстепенные изображения */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2040"
                    alt="Сервисные точки"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Консультации</p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
                    alt="Техника и инструменты"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Современные технологии</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Основные направления услуг */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Направления услуг
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Комплексное обслуживание для всех потребностей бизнеса и повседневной жизни
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.id * 0.1 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <motion.div 
                      animate={{ 
                        scale: hoveredCard === service.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <ChevronRightIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Преимущества наших услуг
            </h2>
            <p className="text-lg text-gray-600">
              Качество и надежность в каждой детали
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {benefit.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Часто задаваемые вопросы
            </h2>
            <p className="text-lg text-gray-600">
              Ответы на самые популярные вопросы о наших услугах
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-200 transition-all duration-300">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold text-gray-900 text-lg">
                          {faq.question}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: activeFaq === index ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"
                      >
                        <ChevronRightIcon className="w-5 h-5 text-blue-600" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 py-6 border-t border-gray-100 text-gray-700 leading-relaxed bg-gradient-to-b from-white to-gray-50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;