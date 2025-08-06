import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'

function Creterias() {
  return (
    <section className='creterias'>
        <Container>
            <Row>
                <Col lg={4} className="p-1 p-md-4 mb-4 mb-lg-0">
                    <div className="card-body gap-3 justify-content-center d-flex">
                        <span className='card-icon-container'>
                            <i className="bi bi-truck"></i>
                        </span>
                        <div>
                            <span className="h5 mb-3 fw-bold">Fast & free Delivery</span>
                            <br/>
                            <small>On all orders over $50.00</small>
                        </div>
                    </div>
                </Col>
                <Col lg={4} className="p-1 p-md-4 mb-4 mb-lg-0">
                    <div className="card-body gap-3 justify-content-center d-flex">
                        <span className='card-icon-container'>
                            <i className="bi bi-heart"></i>

                        </span>
                        <div>
                            <span className="h5 mb-3 fw-bold">All Your Beauty Favourites</span>
                            <br/>
                            <small>1000s of products, 100s of brands</small>
                        </div>
                    </div>
                </Col>
                <Col lg={4} className="p-1 p-md-4 mb-4 mb-lg-0">
                    <div className="card-body gap-3 justify-content-center d-flex">
                        <span className='card-icon-container'>
                            <i className="bi bi-check-circle"></i>
                        </span>
                        <div>
                            <span className="h5 mb-3 fw-bold">Official Retailer</span>
                            <br/>
                            <small>100% genuine products</small>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Creterias
