import { Col, Container, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import leftbgImage from '../../assets/imgs/leftbg.webp'
export default function WithFullWidth (){
    return(
        <>
          <Row>
            <Col lg={6} className='left-container'
             style={{
                backgroundImage: `url(${leftbgImage})`,
                backgroundRepeat: 'no-repeat',                            
                backgroundSize: 'cover',                                 
                backgroundPosition: 'center center', 
            }}
            >
            </Col>
             <Col lg={6} className='right-container'> 
               <div className='right-inner-wrapper'>
                  <h2 className="title-text text-black section-title">
                          Curly Hair <br/>Essentials Kit
                  </h2>
                  <span className='text-center'>Tell us about your hair type, skin needs, and grooming goals and we’ll show you exactly what fits you best.</span>
                  <Link to='/' className='btn order_now curated-btn'> Shop Now</Link>
               </div>
                
            </Col>
          </Row>
          <Row className='flex-row-reverse'>
            <Col lg={6} className='left-container'
             style={{
                backgroundImage: `url(${leftbgImage})`,
                backgroundRepeat: 'no-repeat',                            
                backgroundSize: 'cover',                                 
                backgroundPosition: 'center center', 
            }}
            >
            </Col>
             <Col lg={6} className='right-container'> 
               <div className='right-inner-wrapper'>
                  <h2 className="title-text text-black section-title">
                          Curly Hair <br/>Essentials Kit
                  </h2>
                  <span className='text-center'>Tell us about your hair type, skin needs, and grooming goals and we’ll show you exactly what fits you best.</span>
                  <Link to='/' className='btn order_now curated-btn'> Shop Now</Link>
               </div>
                
            </Col>
          </Row>
        </>
    )
}