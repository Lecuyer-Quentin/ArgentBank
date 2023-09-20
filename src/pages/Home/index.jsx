import React from 'react'
import Features from '../../components/Features'
import Hero from '../../components/Hero'
import { HeroDataProvider, FeaturesDataProvider } from '../../features/data/DataContext'

const Home = () => {
  return (
    <>
      <HeroDataProvider>
        <Hero />
      </HeroDataProvider>
      
      <FeaturesDataProvider>
        <Features /> 
      </FeaturesDataProvider>
    </>
  )
}

export default Home