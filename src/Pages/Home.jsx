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
import SectionContainer from '../Components/reUsable/SectionContainer'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductSlider from '../Components/home/ProductSlider'
import { useMediaQuery } from 'react-responsive';
function index() {
  // const { isLoggedIn } = useContext(AuthContext)
   const { isLoggedIn,user } = useAuthStore();
  //  console.log(user)

  const isMediumUp = useMediaQuery({ minWidth: 768 });

  return (
    <>
{
  isLoggedIn?
  <SectionContainer background={"#BE8F45"}>
      <Row>
        <Col lg={5} className='mb-5 mb-lg-0 d-flex flex-column justify-content-center' style={isMediumUp ? { paddingLeft: '10dvw' } : {}}>
                    <h1 className='text-white'>
                        Welcome back, {user?.name} 😊
                    </h1>
                    <p className='text-light'>
                      We’ve picked out a few things just for you — based on your preferences.
                    </p>
                    <Link to='/shop' className='btn order_now'>Shop Now</Link>
        </Col>
        <Col md={7}>
        <ProductSlider/>
        </Col>
      </Row>
    </SectionContainer>
    :
<HeroSection/>
}
    

        
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
