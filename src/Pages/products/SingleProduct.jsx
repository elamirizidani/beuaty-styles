import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import {  Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './aiProduct.css'
import productImage from '../../assets/imgs/products/product.png'
import { fetchData } from '../../../utilty/data/api';
import { useAuthStore } from '../../store/authStore';
import SectionContainer from '../../Components/reUsable/SectionContainer';
import TitleStyled from '../../Components/reUsable/TitleStyled';
import UpperFooterPart from '../../Components/footer/UpperFooterPart';
import NotSure from '../../Components/NotSure';
import ProductReviews from '../../Components/products/ProductReviews';
function SingleProduct() {
  const { addToCart } = useAuthStore();
    const location = useLocation();
  const productData = location.state?.product;
  const [loading, setLoading] = useState(true);
  const [recomandedsData,setRecomandedData] = useState([])
  const [error, setError] = useState(null);
// console.log(productData)



useEffect(() => {
    (async () => {
        setLoading(true)
        try {
        const res = await fetchData(`/products/category/${productData?.category}`);
        console.log(res);
        setRecomandedData(res);
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
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <img className="product-image" src={productImage}/>

                </div>
                <div className="col-lg-6">
                    <div className="ps-lg-4">
                        <h3 className="display-4 fw-bold mb-3">{productData?.name}</h3>
                        <p className="lead mb-4">{productData?.description}</p>

                        <p><strong>Category: </strong>{productData?.category}</p>
                        {/* <p><strong>Tags: </strong>{productData?.category}</p> */}
                        {/* <p><strong>Benefits: </strong>
                            {
                                productData?.benefits?.map((item,i)=>(
                                <span key={i}>{item}, </span>
                                ))
                            }
                        </p> */}
                        <p><strong>Brand: </strong>{productData?.brand}</p>
                        

                    </div>
                </div>
            </div>
            <ProductReviews productId={productData?._id}/>
        </Container></SectionContainer>


    <NotSure />

    

<SectionContainer>
        <Container>
            <Row className='justify-content-between'>
                <Col lg={6}><TitleStyled title={'Related products'}/></Col>
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
                    <Link onClick={()=>addToCart(product._id,1)} style={{width:'100%'}} className='btn order_now border-0 rounded-0 d-flex justify-content-center align-items-center gap-2'>
                    <i className="bi bi-handbag" style={{fontSize:'24px'}}></i>
                                          Add to Bag
                                        </Link>
                  </div>
                </div>
              </Col>
            ))
          )}
          
          {!loading && !error && recomandedsData?.length === 0 && (
            <Col className='text-center py-5'>
              <p>No product recommendations available at this time.</p>
            </Col>
          )}


            </Row>
        </Container>
    </SectionContainer>

    <UpperFooterPart/>
    </>
  )
}

export default SingleProduct
