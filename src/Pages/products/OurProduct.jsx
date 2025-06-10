import React from 'react'
import { useLocation } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './aiProduct.css'
import productImage from '../../assets/imgs/products/product.png'
function AIproducts() {
    const location = useLocation();
  const productData = location.state?.product;
// console.log(productData)

  return (
    <>
      <section className="hero-section">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="product-image">
                        <div className="product-placeholder">
                            <div className="text-center">
                                <i className="fas fa-leaf fa-3x mb-3"></i>
                                <div>Product Image</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="ps-lg-4">
                        <div className="rating-stars mb-2">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <span className="ms-2 text-white-50">(4.8/5 - 127 reviews)</span>
                        </div>
                        <h1 className="display-4 fw-bold mb-3">{productData?.name}</h1>
                        <p className="lead mb-4">{productData?.description}</p>
                        
                        <div className="mb-4">
                            <span className="badge hair-type-badge me-2">
                                <i className="fas fa-user-check me-1"></i>Curly Hair
                            </span>
                            <span className="badge hair-type-badge">
                                <i className="fas fa-user-check me-1"></i>Coily Hair
                            </span>
                        </div>
                        
                        <div className="price-section d-inline-block">
                            <h3 className="mb-0">$20-30</h3>
                            <small>Premium Natural Formula</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div className="container my-5">
        <div className="row">
            <div className="col-lg-8">
                <section className="mb-5">
                    <h2 className="section-title">Product Description</h2>
                    <p className="lead">{productData?.description}</p>
                </section>


                <section className="mb-5">
                    <h2 className="section-title">Key Ingredients</h2>
                    <div className="text-center">
                      {
                        productData?.attributes?.ingredients?.map((item,i)=>(
                          <span key={i} className="ingredient-badge">
                              <i className="fas fa-seedling me-2"></i>{item}
                          </span>
                        ))
                      }
                    </div>
                </section>


                <section className="mb-5">
                    <h2 className="section-title">Benefits</h2>
                    <div className="row">

                      {
                        productData?.benefits?.map((item,i)=>(
                          <div key={i} className="col-md-6 mb-3">
                            <div className="benefit-item">
                                <i className="fas fa-magic text-success me-2"></i>
                                <strong>{item}</strong>
                            </div>
                        </div>
                        ))
                      }
                      
                    </div>
                </section>

               


                <section className="mb-5">
                    <h2 className="section-title">Why This Product?</h2>
                    <div className="why-section">
                        <p className="mb-0">
                          {productData?.why}
                        </p>
                    </div>
                </section>
            </div>

            <div className="col-lg-4">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="feature-card text-center">
                            <div className="feature-icon mx-auto">
                                <i className="fas fa-leaf"></i>
                            </div>
                            <h5 className="fw-bold">100% {productData?.brand}</h5>
                            <p className="text-muted mb-0">Made with {productData?.brand} ingredients</p>
                        </div>
                    </div>
                    
                    
                    <div className="col-12 mb-4">
                        <div className="feature-card text-center">
                            <div className="feature-icon mx-auto">
                                <i className="fas fa-award"></i>
                            </div>
                            <h5 className="fw-bold">{productData?.category} Category</h5>
                            <p className="text-muted mb-0">Professional {productData?.category} solution</p>
                        </div>
                    </div>

                    {
                        productData?.attributes?.hairType?.length >0 &&
                        <section className="mb-5">
                            <h2 className="section-title">Hair Type</h2>
                            <div className="row">
                            {
                                productData?.attributes?.hairType?.map((item,i)=>(
                                <div key={i} className="col-md-6 mb-3">
                                    <div className="benefit-item">
                                        <i className="fas fa-magic text-success me-2"></i>
                                        <strong>{item}</strong>
                                    </div>
                                </div>
                                ))
                            }
                            </div>
                        </section>
                    }
                     

                    {
                        productData?.attributes?.skinType?.length >0 &&
                        <section className="mb-5">
                        
                            <h2 className="section-title">Skin Type</h2>
                            <div className="row">

                            {
                                productData?.attributes?.skinType?.map((item,i)=>(
                                <div key={i} className="col-md-6 mb-3">
                                    <div className="benefit-item">
                                        <i className="fas fa-magic text-success me-2"></i>
                                        <strong>{item}</strong>
                                    </div>
                                </div>
                                ))
                            }
                            
                            </div>
                        </section>
                    }
                

                
                </div>


            </div>
        </div>
    </div>




    </>
  )
}

export default AIproducts
