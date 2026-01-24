import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
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

  const advantages = [
    {
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      text: t('about.advantages.0'),
      bgColor: 'bg-blue-100'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      text: t('about.advantages.1'),
      bgColor: 'bg-cyan-100'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      text: t('about.advantages.2'),
      bgColor: 'bg-green-100'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: t('about.advantages.3'),
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <section ref={ref} className="relative py-20  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Левая часть - Изображение */}
          <motion.div
            variants={imageVariants}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              {/* Основное изображение */}
              <motion.div
                className="aspect-[4/5] bg-transparent relative overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                {/* Изображение */}
                <img
                  src="/Лого35.jpg"
                  alt="Dordoi Association Logo"
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Декоративные элементы */}
                <motion.div
                  className="absolute top-6 right-6 w-4 h-16 bg-yellow-400 rounded-full"
                  animate={{ scaleY: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-6 left-6 w-6 h-6 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>
              
              {/* Акцентный элемент */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl rotate-12 opacity-90"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-xl rotate-45 opacity-80"></div>
            </div>

            {/* Плавающие статистики */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200"
              initial={{ scale: 0, rotate: -10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
              transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{t('about.stats.projects')}</div>
                <div className="text-sm text-slate-600">{t('about.stats.projectsLabel')}</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200"
              initial={{ scale: 0, rotate: 10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 10 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{t('about.stats.specialists')}</div>
                <div className="text-sm text-slate-600">{t('about.stats.specialistsLabel')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Правая часть - Текст */}
          <motion.div
            variants={textVariants}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200"
              >
                <span className="text-blue-600 text-sm font-semibold">{t('about.badge')}</span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900"
              >
                {t('about.title')}
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              ></motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <motion.p
                className="text-lg md:text-xl text-slate-700 leading-relaxed"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="font-semibold text-blue-600">{t('about.description.0.highlight')}</span>{t('about.description.0.rest')}
              </motion.p>

              <motion.p
                className="text-lg text-slate-600 leading-relaxed"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
              >
                {t('about.description.1.prefix')}<span className="font-semibold text-blue-600">{t('about.description.1.highlight')}</span>{t('about.description.1.suffix')}
              </motion.p>
            </motion.div>

            {/* Ключевые преимущества */}
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-4 pt-4"
            >
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, delay: index * 0.1 }}
                >
                  <div className={`flex-shrink-0 w-10 h-10 ${advantage.bgColor} rounded-lg flex items-center justify-center`}>
                    {advantage.icon}
                  </div>
                  <span className="text-slate-700 font-medium">{advantage.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;