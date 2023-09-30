import React from 'react'
import Features from '../../components/Features'
import Hero from '../../components/Hero'
import { HeroDataProvider, FeaturesDataProvider } from '../../app/data/DataContext'

/**
 * Renders the Home page with Hero and Features components.
 * @returns {JSX.Element} The Home page JSX elements.
 */
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