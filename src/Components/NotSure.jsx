import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useAuthStore } from '../store/authStore';
import leftbgImage from '../assets/imgs/leftbg.webp'
import { Link } from 'react-router-dom';

function NotSure() {
    const { isLoggedIn,changeShowProfile } = useAuthStore();
  return (
    <Row className='pt-4'>
                <Col lg={6} className='left-container'
                 style={{
                    backgroundImage: `url(${leftbgImage})`,
                    backgroundRepeat: 'no-repeat',                            
                    backgroundSize: 'cover',                                 
                    backgroundPosition: 'center center', 
                }}
                >
                </Col>
                 <Col lg={6} className='right-container'> 
                   <div className='right-inner-wrapper'>
                      <h2 className="title-text text-black">
                             Not Sure What to Choose?
                      </h2>
                      <span className='text-center'>Tell us about your hair type, skin needs, and grooming goals and we’ll show you exactly what fits you best.</span>
                      {
                        isLoggedIn ? 
                        <Link onClick={()=>changeShowProfile()} className='btn order_now curated-btn'>Create My Beauty Profile</Link>
                        :
                        <Link to='/login' className='btn order_now curated-btn'>Create My Beauty Profile</Link>
                      }
                      
                      <font color='#FF6A00'>Takes less than a minute</font>
                   </div>
                    
                </Col>
              </Row>
  )
}

export default NotSure
