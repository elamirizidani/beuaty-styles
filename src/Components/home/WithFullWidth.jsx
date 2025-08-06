import { Col, Container, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import rightBgImage from '../../assets/imgs/img2.webp'
import NotSure from '../NotSure';

export default function WithFullWidth (){

    return(
        <>
          <NotSure />
          <Row className='flex-row-reverse'>
            <Col lg={6} className='left-container'
             style={{
                backgroundImage: `url(${rightBgImage})`,
                backgroundRepeat: 'no-repeat',                            
                backgroundSize: 'cover',                                 
                backgroundPosition: 'center center', 
            }}
            >
            </Col>
             <Col lg={6} className='right-container'> 
               <div className='right-inner-wrapper'>
                  <h2 className="title-text text-black">
                          {/* Curly Hair <br/>Essentials Kit */}
                          Ready for a Fresh Cut or a<br/> Deep Clean?
                  </h2>
                  <span className='text-center'>Get professional grooming and treatments tailored to your look, your routine, and your schedule.</span>
                  <Link to='/bookService' className='btn order_now curated-btn'>Book a Service</Link>
                  
               </div>
                
            </Col>
          </Row>
        </>
    )
}