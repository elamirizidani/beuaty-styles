import React, { useContext, useEffect,useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TitleStyled from '../reUsable/TitleStyled'
import { Link } from 'react-router-dom'
import productImage from '../../assets/imgs/products/product.png'
import SectionContainer from '../reUsable/SectionContainer'
import { fetchData } from '../../../utilty/data/api';
import { AuthContext } from '../../MainLayout/AuthContext'
import { useAuthStore } from '../../store/authStore'

function PopularProducts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart,isLoggedIn } = useAuthStore();

const [productsData,setProductsData] = useState([])


    useEffect(() => {
    (async () => {
        setLoading(true)
        try {
        const res = await fetchData('products');
        // console.log(res);
        setProductsData(res);
        } catch (err) {
        console.error('Error fetching data:', err);
        }
        finally{
            setLoading(false)
        }
    })();
    }, []);

  return (
    <SectionContainer>
        <Container>
            <Row className='justify-content-between'>
                <Col lg={6}><TitleStyled title={'Popular Right Now'}/></Col>
                <Col lg={6} className='d-flex justify-content-end'><Link to='/shop' className='btn order_now'>Browse All Products</Link></Col>
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
            productsData?.map((product, index) => (
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
                    <div className='p-3 flex-grow-1 d-flex justify-content-between'>
                      <div className='flex-grow-4'  style={{flex:4,width:'80%'}}>
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text small text-muted text-truncate" style={{maxWidth: '100%'}}>
                          {product.description}
                        </p>
                      </div>
                      {product.price && <p className="card-text fw-bold flex-grow-1 justify-content-end d-flex align-items-center" style={{flex:1}}>${product.price}</p>}
                    </div>
                    {/* addToCart */}
                    {
                      isLoggedIn ?
                      <Link onClick={()=>addToCart(product._id,1)} style={{width:'100%'}} className='btn order_now border-0 rounded-0 d-flex justify-content-center align-items-center gap-2'>
                        <i className="bi bi-handbag" style={{fontSize:'24px'}}></i>
                        Add to Bag
                      </Link>
                    :
                    <Link to={'/login'} style={{width:'100%'}} className='btn order_now border-0 rounded-0 d-flex justify-content-center align-items-center gap-2'>
                       <i className="bi bi-handbag" style={{fontSize:'24px'}}></i>
                      Add to Bag
                    </Link>
                    }
                    
                  </div>
                </div>
              </Col>
            ))
          )}
          
          {!loading && !error && productsData.length === 0 && (
            <Col className='text-center py-5'>
              <p>No product recommendations available at this time.</p>
            </Col>
          )}


            </Row>
        </Container>
    </SectionContainer>
  )
}

export default PopularProducts


