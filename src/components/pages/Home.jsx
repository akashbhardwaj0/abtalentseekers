import React from 'react'
import HeroSection from '../HeroSection'
import CategoryCarousel from '../CategoryCarousel'
import LatestJobs from '../LatestJobs'
import Footer from '../shared/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'

function Home() {
   
  useGetAllJobs()
  return (
    
    <div>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    
    </div>
  )
}

export default Home