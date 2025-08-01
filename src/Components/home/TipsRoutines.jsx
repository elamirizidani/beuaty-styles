
import { Col, Container, Row} from 'react-bootstrap'
import TitleStyled from '../reUsable/TitleStyled'
import { Link } from 'react-router-dom'
import tip1 from '../../assets/imgs/tip1.webp'
import tip2 from '../../assets/imgs/tip2.webp'
import tip3 from '../../assets/imgs/tip3.webp'
export default function TipsRoutines(){
    return(
        <>
           <div className="the-top-wrapper">
              <Container className='flex-column gap-3 d-flex'>
                 <Row className='justify-content-between'>

            
                    <Col md={6}><TitleStyled title={'Tips & Routines from the Experts'}/></Col>
                    <Col md={6} className='d-flex justify-content-end'><Link to='/' className='btn order_now'>Visit Learn Center</Link></Col>

                </Row>
                <Row className='container'>
                   <Col md={4} className='tip-card d-flex flex-column gap-3'> 
                     <img src={tip1} alt='tip image' className='tip-routes' />
                     <span className='date'>Apr 21, 2025</span>
                     <div className="tip-title">
                        <h4 className="tip-heading">
                            How to Pick the Right Conditioner for Your Hair Type
                        </h4>
                     </div>
                   </Col>
                   <Col md={4} className='tip-card d-flex flex-column gap-3'> 
                     <img src={tip2} alt='tip image' className='tip-routes' />
                     <span className='date'>Apr 21, 2025</span>
                     <div className="tip-title">
                        <h4 className="tip-heading">
                            How to Pick the Right Conditioner for Your Hair Type
                        </h4>
                     </div>
                   </Col>
                   <Col md={4} className='tip-card d-flex flex-column gap-3'> 
                     <img src={tip3} alt='tip image' className='tip-routes' />
                     <span className='date'>Apr 21, 2025</span>
                     <div className="tip-title">
                        <h4 className="tip-heading">
                            How to Pick the Right Conditioner for Your Hair Type
                        </h4>
                     </div>
                   </Col>

                </Row>
              </Container>
             

           </div>
          
        </>
    )
} 