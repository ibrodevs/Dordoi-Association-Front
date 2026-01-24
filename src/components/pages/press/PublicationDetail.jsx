import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PressBackground from '../../PressBackground';

const PublicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPublications, setRelatedPublications] = useState([]);

  // Загрузка данных публикации из API
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setLoading(true);
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        const response = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/presscentre/publications/${id}/?lang=${lang}`);
        if (response.ok) {
          const data = await response.json();
          setPublication(data);
        } else {
          // Если публикация не найдена, перенаправляем на страницу публикаций
          navigate('/press/publications');
        }
      } catch (error) {
        console.error('Error fetching publication:', error);
        navigate('/press/publications');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPublication();
    }
    window.scrollTo(0, 0);
  }, [id, i18n.language, navigate]);

  // Загрузка связанных публикаций
  useEffect(() => {
    const fetchRelatedPublications = async () => {
      try {
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        const response = await fetch(`https://dordoi-backend-f6584db3b47e.herokuapp.com/api/presscentre/publications/?lang=${lang}&limit=3`);
        const data = await response.json();
        // Исключаем текущую публикацию из связанных
        const filtered = data.filter(pub => pub.id !== parseInt(id));
        setRelatedPublications(filtered.slice(0, 3));
      } catch (error) {
        console.error('Error fetching related publications:', error);
      }
    };

    if (publication) {
      fetchRelatedPublications();
    }
  }, [publication, id, i18n.language]);

  const handleDownload = (downloadUrl, title) => {
    console.log('Downloading:', downloadUrl);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
            <div className="text-8xl font-bold text-slate-300 mb-4">404</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">{t('publications.notFound')}</h1>
            <p className="text-slate-600 mb-8">
              {t('publications.notFoundDescription')}
            </p>
            <button
              onClick={() => navigate('/press/publications')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-block"
            >
              {t('publications.backToPublications')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PressBackground>
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            y: [0, -15, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-10 left-5 w-32 h-32 bg-blue-200 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="absolute bottom-10 right-5 w-40 h-40 bg-cyan-200 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-indigo-200 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/press/publications')}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">{t('common.back')}</span>
          </button>
        </motion.div>

        {/* Breadcrumb */}
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-slate-600">
            <button
              onClick={() => navigate('/press')}
              className="hover:text-blue-600 transition-colors"
            >
              {t('nav.press')}
            </button>
            <span>/</span>
            <button
              onClick={() => navigate('/press/publications')}
              className="hover:text-blue-600 transition-colors"
            >
              {t('publications.title')}
            </button>
            <span>/</span>
            <span className="text-slate-900 font-medium">{publication.title}</span>
          </nav>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8"
          >
            <span className="text-blue-600 text-sm font-semibold">{t('publications.badge')}</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8"
          >
            {publication.title}
          </motion.h1>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-8"
          ></motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-12 mb-12"
          >
            {/* Description */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('publications.details.description')}</h3>
              <p className="text-slate-700 leading-relaxed text-lg">{publication.description}</p>
            </div>

            {/* Date */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t('publications.details.date')}</h3>
              <p className="text-slate-600 text-lg">{new Date(publication.published_at).toLocaleDateString()}</p>
            </div>

            {/* Author */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t('publications.details.author')}</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-slate-700 font-medium text-lg">{publication.author}</span>
              </div>
            </div>

            {/* Download PDF */}
            <div className="text-center pt-8 border-t border-slate-200">
              <motion.button
                onClick={() => handleDownload(publication.pdf_file, publication.title)}
                className="bg-blue-600 text-white px-10 py-5 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center justify-center space-x-4 text-xl shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{t('publications.downloadPDF')}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </PressBackground>
  );
};

export default PublicationDetail;