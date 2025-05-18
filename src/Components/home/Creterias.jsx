import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'

function Creterias() {
  return (
    <section className='creterias'>
        <Container>
            <Row>
                <Col lg={4} className="p-1 p-md-4 mb-4 mb-lg-0">
                    <div className="card-body gap-2 justify-content-center d-flex">
                        <span className='card-icon-container'>
                            <i className="bi bi-truck"></i>
                        </span>
                        <div>
                            <span className="h5 mb-3">Fast & free Delivery</span>
                            <p>On all orders over $50.00</p>
                        </div>
                    </div>
                </Col>
                <Col lg={4} className="p-1 p-md-4 mb-4 mb-lg-0">
                    <div className="card-body gap-2 justify-content-center d-flex">
                        <span className='card-icon-container'>
                            <i className="bi bi-truck"></i>
                        </span>
                        <div>
                            <span className="h5 mb-3">All Your Beauty Favourites</span>
                            <p>1000s of products, 100s of brands</p>
                        </div>
                    </div>
                </Col>
                <Col lg={4} className="p-1 p-md-4 mb-4 mb-lg-0">
                    <div className="card-body gap-2 justify-content-center d-flex">
                        <span className='card-icon-container'>
                            <i className="bi bi-truck"></i>
                        </span>
                        <div>
                            <span className="h5 mb-3">Official Retailer</span>
                            <p>100% genuine products</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Creterias
