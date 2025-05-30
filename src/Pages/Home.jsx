import React from 'react'
import HeroSection from '../Components/home/HeroSection'
import Creterias from '../Components/home/Creterias'
import ShopByCategory from '../Components/home/ShopByCategory'
import PopularProducts from '../Components/home/PopularProducts'
import TipsRoutines from '../Components/home/TipsRoutines'
import CuratedKits from '../Components/home/CuratedKits'
import WithFullWidth from '../Components/home/WithFullWidth'



function index() {
  return (
    <>
        <HeroSection/>
        <Creterias/>
        <ShopByCategory/>
        <PopularProducts/>
        <WithFullWidth />
        <CuratedKits />
        <TipsRoutines />
        

    </>
  )
}

export default index
