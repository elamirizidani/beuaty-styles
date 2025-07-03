import React,{useEffect,useState} from 'react'
import { fetchData } from '../../../utilty/data/api';
import SectionContainer from '../reUsable/SectionContainer'
import TitleStyled from '../reUsable/TitleStyled'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

function OutSideProduct() {

    const [loadingNotIn, setLoadingNotIn] = useState(true);
    const [error, setError] = useState(null);
    const [recomandedsDataNotIn,setRecomandedDataNotIn] = useState([])

    useEffect(() => {
    (async () => {
        setLoadingNotIn(true)
        try {
        const res = await fetchData('recommendations/suggest-new-products');
        // console.log(res.suggestedProducts);
        setRecomandedDataNotIn(res.suggestedProducts);
        } catch (err) {
        console.error('Error fetching data:', err);
        }
        finally{
            setLoadingNotIn(false)
        }
    })();
    }, []);

  return (
    
    <SectionContainer>
        <Container>
            <Row className='justify-content-between'>
                <Col lg={6}><TitleStyled title={'AI generated Products'}/></Col>
                {/* <Col lg={6} className='d-flex justify-content-end'><Link to='/' className='btn order_now'>Browse All Products</Link></Col> */}
            </Row>
            <Row className='py-4'>

        {loadingNotIn ? (
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
            recomandedsDataNotIn?.map((product, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <div className="card  h-100">
                  {/* <img 
                    src={productImage} 
                    className="card-img-top" 
                    alt={product.name}
                    onError={(e) => {e.target.src = '/default-product-image.jpg'}}
                  /> */}
                  <div className="card-body p-0 d-flex flex-column">
                    <div className='p-3 flex-grow-1'>
                      <h4 className="card-title">{product.name}</h4>
                      <p className="card-text" 
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                            }}
                            >{product.description}</p>
                      <p className="card-text small text-muted" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                            }}>
                        <strong>Why it's for you:</strong> {product.why}
                      </p>
                      {product.priceRange && <p className="card-text fw-bold">{product.priceRange}</p>}
                    </div>
                    <Link to={`/AIproducts`}
                        state={{ product }} 
                        style={{width:'100%'}} className='btn order_now border-0 rounded-0 d-flex justify-content-center'>

                      View Product
                    </Link>
                  </div>
                </div>
              </Col>
            ))
          )}

          {!loadingNotIn && !error && recomandedsDataNotIn.length === 0 && (
            <Col className='text-center py-5'>
              <p>No product recommendations available at this time.</p>
            </Col>
          )}

            </Row>
        </Container>
    </SectionContainer>
  )
}

export default OutSideProduct
