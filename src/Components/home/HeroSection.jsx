import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './home.css'
function HeroSection() {
  return (
    <section className='hero_section align-items-center d-flex'>
        <Container>
            <Row>
                <Col lg={6} className='mb-5 mb-lg-0'>
                <div className='hero-content-container'>
                    <h1 className='text-white'>
                        Your Personalized Hair & Beauty Store
                    </h1>
                    <Link to='/' className='btn order_now'>Shop Now</Link>
                </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default HeroSection
