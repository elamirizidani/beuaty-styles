import React from 'react'
import SectionContainer from '../reUsable/SectionContainer'
import { Container, Col, Row } from 'react-bootstrap'
import LeftRightItems from '../reUsable/LeftRightItems'
import leftbgImage from '../../assets/imgs/leftbg.webp'
import { Link } from 'react-router-dom'

import { SERVICES } from '../../../utilty/data/serverData'
function Services() {

  return (
        <SectionContainer background={"#BE8F4508"}>
            <Container>
                {
                    SERVICES?.map((item,index)=>{
                        return(
                        <LeftRightItems key={index} itemIndex={index} item={item} leftbgImage={item?.bgImage}>
                            <div className='right-inner-wrapper align-items-stretch' style={{flex:1}}>
                                <h2 className="text-start title-text text-black">{item.title}</h2>
                                <ul className='list-group'>
                                {
                                    item?.minServices?.map((servive,i)=>{
                                        return(
                                            <li key={i} className='d-flex justify-content-between'>
                                            <h6><strong>{servive?.name}</strong></h6>
                                            <span>{servive.price}</span>
                                        </li>
                                        )
                                    })
                                }
                                </ul>
                                <Link to='/bookingForm'
                                    state={{ item }} 
                                    className='btn order_now curated-btn'> Book Now</Link>

                            </div>
                        </LeftRightItems>
                    )
                    })
                }
            </Container>
        </SectionContainer>
  )
}

export default Services
