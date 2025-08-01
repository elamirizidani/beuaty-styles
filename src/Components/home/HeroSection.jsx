import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './home.css'
import { useMediaQuery } from 'react-responsive';
function HeroSection() {
    const isMediumUp = useMediaQuery({ minWidth: 768 });
  return (
    
    <section className='hero_section align-items-center d-flex' 
    style={isMediumUp ? { height: '750px' } : {}}>
        <Container>
            <Row>
                <Col lg={6} className='mb-5 mb-lg-0'>
                <div className='hero-content-container'>
                    <h1 className='text-white'>
                        Your Personalized Hair & Beauty Store
                    </h1>
                    <Link to='/shop' className='btn order_now'>Shop Now</Link>
                </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default HeroSection
