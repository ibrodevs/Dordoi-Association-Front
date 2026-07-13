<div align="center">

# Dordoi Association

### Multilingual digital platform for one of Kyrgyzstan's largest business associations

[![Live](https://img.shields.io/badge/Live-dordoi.info-1D4ED8?style=for-the-badge)](https://www.dordoi.info)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=111827)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Languages](https://img.shields.io/badge/languages-RU_%7C_KG_%7C_EN-22C55E?style=flat-square)

</div>

## Overview

This repository contains the public frontend for Dordoi Association. The platform presents the association's history, leadership, companies, services, production, education, sport, medicine, social initiatives, news, media, projects, and international partnerships.

The product is connected to a Django REST content backend so editorial teams can manage public information without code changes.

## Product capabilities

- Russian, Kyrgyz, and English interface
- Structured information about the association and its organizations
- Activity sections for business, production, education, sport, recreation, and medicine
- News, media galleries, publications, and detail pages
- Partner, project, and international cooperation sections
- Contact information and interactive map experiences
- Dynamic content from a REST API
- SEO metadata for public pages
- Responsive navigation and page layouts
- Motion, loading, and visual storytelling elements

## Technology

| Area | Technology |
|---|---|
| UI | React 19, Vite 7 |
| Routing | React Router |
| Styling | Tailwind CSS 4 and component-level styles |
| Localization | i18next |
| Data | REST API, Axios, Fetch |
| Motion & visual layers | Framer Motion, GSAP, Three.js |
| Maps | Leaflet and React Leaflet |
| Backend | Django REST Framework, PostgreSQL, S3-compatible media |

## Project structure

~~~text
src/
├── components/
│   ├── pages/          # public sections and detail pages
│   ├── Navbar/         # navigation and language switching
│   └── shared UI
├── api.js              # API configuration and request helpers
├── i18n.js             # localization setup
└── App.jsx             # routes and application composition
~~~

## Running locally

### Requirements

- Node.js 20 or newer
- npm

### Installation

~~~bash
npm install
npm run dev
~~~

### Environment

~~~env
VITE_API_URL=http://localhost:8000
~~~

If the variable is omitted, the frontend uses the configured production API.

## Quality checks

~~~bash
npm run lint
npm run build
~~~

## Related repository

[Dordoi Association backend](https://github.com/ibrodevs/Dordoi-Association-Back) — Django REST API, editorial administration, PostgreSQL data, and media storage.

## Deployment

The frontend is optimized as a Vite production build and can be deployed to Vercel or any static hosting provider. Client-side routes must be rewritten to index.html.

