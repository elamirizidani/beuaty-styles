import React from 'react'
import { Col, Row} from 'react-bootstrap'

function LeftRightItems({leftbgImage,itemIndex,children}) {
  return (
            <Row className={itemIndex %2 ==1 ?'flex-row-reverse':null}>
                <Col lg={6} className='left-container'
                    style={{
                        backgroundImage: `url(${leftbgImage})`,
                        backgroundRepeat: 'no-repeat',                            
                        backgroundSize: 'cover',                                 
                        backgroundPosition: 'center center', 
                    }}
                >
                </Col>
                <Col lg={6} className='p-5 d-flex justify-content-start' style={{
                    backgroundColor:itemIndex %2 ==1? '#E3ECE7':'#BE8F451A'
                }}> 
                {children}
                </Col>
            </Row>
  )
}

export default LeftRightItems
