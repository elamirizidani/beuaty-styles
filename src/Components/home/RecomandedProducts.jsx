import React, { useEffect,useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TitleStyled from '../reUsable/TitleStyled'
import { Link } from 'react-router-dom'
import productImage from '../../assets/imgs/products/product.png'
import SectionContainer from '../reUsable/SectionContainer'

import { fetchData } from '../../../utilty/data/api';
import { useAuthStore } from '../../store/authStore'




function RecomandedProducts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recomandedsData,setRecomandedData] = useState([])
 const { addToCart } = useAuthStore();

    useEffect(() => {
    (async () => {
        setLoading(true)
        try {
        const res = await fetchData('recommendations/content-based');
        // console.log(res.recommendedProducts);
        setRecomandedData(res.recommendedProducts);
        } catch (err) {
        console.error('Error fetching data:', err);
        }
        finally{
            setLoading(false)
        }
    })();
    }, []);


    


  return (
    <>
    <SectionContainer>
        <Container>
            <Row className='justify-content-between'>
                <Col lg={6}><TitleStyled title={'Recomanded Products'}/></Col>
                <Col lg={6} className='d-flex justify-content-end'><Link to='/' className='btn order_now'>Browse All Products</Link></Col>
            </Row>
            <Row className='py-4'>

{loading ? (
            <Col className='text-center py-5'>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Finding perfect products for you...</p>
            </Col>
          ) : error ? (
            <Col className='text-center py-5'>
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </Col>
          ) : (
            recomandedsData?.map((product, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <div className="card border-0 h-100">
                  <Link
                                                to={`/Product`}
                                                state={{ product }}
                                            >
                  <img 
                    src={productImage} 
                    className="card-img-top" 
                    alt={product.name}
                    onError={(e) => {e.target.src = '/default-product-image.jpg'}}
                  />
                  </Link>
                  <div className="card-body p-0 d-flex flex-column">
                    <div className='p-3 flex-grow-1'>
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      {product.price && <p className="card-text fw-bold">${product.price}</p>}
                      <p className="card-text small text-muted">
                        <strong>Why it's for you:</strong> {product.description}
                      </p>
                    </div>
                    {/* <Link to={`/product/${product.id}`} style={{width:'100%'}} className='btn order_now border-0 rounded-0 d-flex justify-content-center'>
                      Add to Bag
                    </Link> */}
                    <Link onClick={()=>addToCart(product._id,1)} style={{width:'100%'}} className='btn order_now border-0 rounded-0 d-flex justify-content-center align-items-center gap-2'>
                    <i className="bi bi-handbag" style={{fontSize:'24px'}}></i>
                                          Add to Bag
                                        </Link>
                  </div>
                </div>
              </Col>
            ))
          )}
          
          {!loading && !error && recomandedsData.length === 0 && (
            <Col className='text-center py-5'>
              <p>No product recommendations available at this time.</p>
            </Col>
          )}


            </Row>
        </Container>
    </SectionContainer>

    </>
  )
}

export default RecomandedProducts


