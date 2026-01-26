import React from 'react'
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
import PremiumCorporateBackground from '../../PremiumCorporateBackground'
function HomePage() {
  return (
    <PremiumCorporateBackground>
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
    </PremiumCorporateBackground>
  )
}

export default HomePage