import React from 'react'
import HeroSection from '../Components/home/HeroSection'
import Creterias from '../Components/home/Creterias'
import ShopByCategory from '../Components/home/ShopByCategory'
import PopularProducts from '../Components/home/PopularProducts'

function index() {
  return (
    <>
        <HeroSection/>
        <Creterias/>
        <ShopByCategory/>
        <PopularProducts/>
    </>
  )
}

export default index
