import { Col, Container, Row} from 'react-bootstrap'
import TitleStyled from '../reUsable/TitleStyled'
import { Link } from 'react-router-dom'
import curatedImg1 from '../../assets/imgs/curated1.webp'
import curatedImg2 from '../../assets/imgs/curated2.webp'
import cutieImage from '../../assets/imgs/cutie.webp'
export default function CuratedKits(){

    return(
         <Container className='flex-column gap-3 d-flex curated-parent'>
                 <Row className='justify-content-between'>

                    <Col xs={8} sm={8} md={6}><TitleStyled title={'Curated Kits for Everyday Care'} subtext={'Simplify your routine with handpicked product combos'}/></Col>
                    <Col xs={4} sm={4} md={6} className='d-flex justify-content-end'><Link to='/shop' className='btn order_now'>Go Shop</Link></Col>

                </Row>
                <Row className='container curated-column-wrapper'>
                   <Col md={6} className='curated-column  curated'>
                     
                     <h2 className="title-text text-black">
                        Curly Hair <br/>Essentials Kit
                     </h2>
                     <Link to='/shop' className='btn order_now curated-btn'> Shop Now</Link>
                     <img src={curatedImg1} alt=''className='curated-img'/>

                   </Col>
                   <Col md={6} className='curated-column-right curated'>
                     <h2 className="title-text text-black">
                        Beard Grooming Set
                     </h2>
                     <Link to='/shop' className='btn order_now curated-btn'> Shop Now</Link>
                     <img src={curatedImg2} alt=''className='curated-img'/>
                     
                   </Col>
                </Row>
                <Row className='container curated-column-wrapper2'>
                   <Col md={6} className='curated-column-right  curated'>
                     
                     <h2 className="title-text text-black">
                        Hydration Starter Pack
                     </h2>
                     <Link to='/shop' className='btn order_now curated-btn'> Shop Now</Link>
                  
                   </Col>
                   <Col md={6} className='curated-column-right1 curated'>
                      <img src={cutieImage} alt='' style={{height: '100%',
                        objectFit: 'cover'}}/>
                   </Col>
                </Row>
        </Container>
    )

}