import React from 'react'
import HeroSection from '../Components/home/HeroSection'
import Creterias from '../Components/home/Creterias'
import ShopByCategory from '../Components/home/ShopByCategory'
import PopularProducts from '../Components/home/PopularProducts'
import TipsRoutines from '../Components/home/TipsRoutines'
import CuratedKits from '../Components/home/CuratedKits'
import WithFullWidth from '../Components/home/WithFullWidth'
import RecomandedProducts from '../Components/home/RecomandedProducts'
import OutSideProduct from '../Components/home/OutSideProduct'
import { useAuthStore } from '../store/authStore'

function index() {
  // const { isLoggedIn } = useContext(AuthContext)
   const { isLoggedIn } = useAuthStore();
  return (
    <>
        <HeroSection/>
        <Creterias/>
        <ShopByCategory/>
        
        {
          isLoggedIn && <RecomandedProducts/>
        }
        <PopularProducts/>
        {
          isLoggedIn && <OutSideProduct/>
        }
        <WithFullWidth />
        <CuratedKits />
        <TipsRoutines />
    </>
  )
}

export default index
