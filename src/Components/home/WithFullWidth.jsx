import { Col, Container, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import leftbgImage from '../../assets/imgs/leftbg.webp'
import rightBgImage from '../../assets/imgs/img2.webp'
import { useAuthStore } from '../../store/authStore';

export default function WithFullWidth (){

    const { changeShowProfile,isLoggedIn } = useAuthStore();
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
                         Not Sure What to Choose?
                  </h2>
                  <span className='text-center'>Tell us about your hair type, skin needs, and grooming goals and we’ll show you exactly what fits you best.</span>
                  {
                    isLoggedIn ? 
                    <Link onClick={()=>changeShowProfile()} className='btn order_now curated-btn'>Create My Beauty Profile</Link>
                    :
                    <Link to='/login' className='btn order_now curated-btn'>Create My Beauty Profile</Link>
                  }
                  
                  <font color='#FF6A00'>Takes less than a minute</font>
               </div>
                
            </Col>
          </Row>
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
                  <h2 className="title-text text-black section-title">
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