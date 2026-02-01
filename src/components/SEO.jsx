import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * SEO Component - Универсальный компонент для SEO оптимизации всех страниц
 * Использование:
 * <SEO 
 *   title="Заголовок страницы"
 *   description="Описание страницы"
 *   keywords="ключевые слова"
 *   ogImage="/path-to-image.jpg"
 *   article={true} // для новостей/статей
 * />
 */
const SEO = ({ 
  title, 
  description, 
  keywords = '', 
  ogImage = '/logodor.png',
  ogType = 'website',
  article = false,
  publishedTime = null,
  author = 'Ассоциация Дордой',
  canonical = null
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const baseUrl = 'https://www.dordoi.info';
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : baseUrl);
  
  // Базовые ключевые слова для всех страниц (SEO усиление)
  const baseKeywords = 'Дордой, Dordoi, базар Дордой, Ассоциация Дордой, ФК Дордой, Dordoi FC, бизнес Кыргызстан, предпринимательство Кыргызстан, торговля Бишкек, Кыргызстан, Бишкек, Центральная Азия, dordoy, dordoi association';
  const fullKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords;
  
  // Формируем полный заголовок
  const fullTitle = title 
    ? `${title} | Дордой — Ассоциация развития бизнеса Кыргызстана`
    : 'Дордой — Ассоциация развития бизнеса и предпринимательства Кыргызстана | Dordoi Association';
  
  // Формируем полное описание
  const fullDescription = description || 
    'Ассоциация Дордой — крупнейшая бизнес-ассоциация Кыргызстана. 35 лет развития торговли, образования, медицины, спорта и культуры. Базар Дордой, ФК Дордой, социальные проекты. Лидер предпринимательства в Центральной Азии.';
  
  // URL изображения
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  // Структурированные данные Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ассоциация Дордой",
    "alternateName": ["Dordoi Association", "Дордой", "Dordoy"],
    "url": baseUrl,
    "logo": `${baseUrl}/logodor.png`,
    "description": fullDescription,
    "foundingDate": "1991-12",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Бишкек",
      "addressRegion": "Чуйская область",
      "addressCountry": "KG"
    },
    "sameAs": [
      "https://www.facebook.com/dordoi",
      "https://www.instagram.com/dordoi",
      "https://twitter.com/dordoi"
    ]
  };
  
  // Структурированные данные для статей/новостей
  const articleSchema = article && publishedTime ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "datePublished": publishedTime,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ассоциация Дордой",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logodor.png`
      }
    }
  } : null;
  
  // Хлебные крошки (BreadcrumbList)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": baseUrl
    }]
  };

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <html lang={currentLang} />
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Ассоциация Дордой" />
      <meta property="og:locale" content={currentLang === 'ru' ? 'ru_RU' : currentLang === 'ky' ? 'ky_KG' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Article specific meta tags */}
      {article && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Новости" />
        </>
      )}
      
      {/* Alternate language URLs */}
      <link rel="alternate" hreflang="ru" href={`${baseUrl}/ru${window.location.pathname}`} />
      <link rel="alternate" hreflang="ky" href={`${baseUrl}/kg${window.location.pathname}`} />
      <link rel="alternate" hreflang="en" href={`${baseUrl}/en${window.location.pathname}`} />
      <link rel="alternate" hreflang="x-default" href={`${baseUrl}${window.location.pathname}`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
