import React from 'react'
import SEO from '../../SEO'
import HeroSlider from './HeroSlider'
import MissionAndValues from './MissionAndValues'
import AboutSection from './AboutSection'
import AchievementsSection from './AchievementsSection'
import ActivitiesSection from './ActivitiesSection'
import NewsAndEventsSection from './NewsAndEventsSection'
import InternationalPartnersSection from './InternationalPartnersSection'
import PartnersSection from './PartnersSection'
import StructurePreview from './StructurePreview'
import HomeFacts from './HomeFacts'
import LightParticlesBackground from '../../LightParticlesBackground'

function HomePage() {
  return (
    <>
      <SEO 
        title="Главная"
        description="Ассоциация Дордой — крупнейшая бизнес-ассоциация Кыргызстана с 35-летней историей. Развитие торговли, образования, спорта, медицины и культуры. Базар Дордой, ФК Дордой, социальные проекты и международное сотрудничество."
        keywords="Дордой главная, Ассоциация Дордой официальный сайт, базар Дордой Бишкек, ФК Дордой футбольный клуб, бизнес Кыргызстан, предпринимательство, торговый комплекс Центральная Азия"
      />

          <HeroSlider />
          <AboutSection />
          <NewsAndEventsSection />
          <HomeFacts />
          <StructurePreview />
          <MissionAndValues />
          {/* <AchievementsSection /> */}
          {/* <ActivitiesSection /> */}
          <PartnersSection />
          {/* <InternationalPartnersSection /> */}

    </>
  )
}

export default HomePage