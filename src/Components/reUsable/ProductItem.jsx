import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore';
import productImage from '../../assets/imgs/products/product.png'

function ProductItem({product,key,callAfter= undefined}) {
    const { addToCart,isLoggedIn } = useAuthStore();
  return (
    <Col lg={4} md={6} className="mb-4" key={key}>
                <div className="card border-0 h-100">
                  <Link
                  onClick={callAfter}
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
  )
}

export default ProductItem
