import React from 'react'
import SectionContainer from '../reUsable/SectionContainer'
import { Container, Col, Row } from 'react-bootstrap'
import LeftRightItems from '../reUsable/LeftRightItems'
import leftbgImage from '../../assets/imgs/leftbg.webp'
import { Link } from 'react-router-dom'
function Services() {

    const services = [
        {
            bgImage:leftbgImage,
            title:'Hair Styling Services',
            minServices:[
                {
                    name:'Hair Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair cut & Hair Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair Colouring',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Blowaving Orising',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair Extension',
                    price:'From 20 to 80 £'
                }
            ]
        },{
            bgImage:leftbgImage,
            title:'Make-up Services',
            minServices:[
                {
                    name:'Hair Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair cut & Hair Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair Colouring',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Blowaving Orising',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair Extension',
                    price:'From 20 to 80 £'
                }
            ]
        },{
            bgImage:leftbgImage,
            title:'Cosmetics Services',
            minServices:[
                {
                    name:'Hair Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair cut & Hair Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair Colouring',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Blowaving Orising',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair Extension',
                    price:'From 20 to 80 £'
                }
            ]
        },{
            bgImage:leftbgImage,
            title:' Beard Trim & Shape',
            minServices:[
                {
                    name:'Hair Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair cut & Hair Styling',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair Colouring',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Blowaving Orising',
                    price:'From 20 to 80 £'
                },
                {
                    name:'Hair Extension',
                    price:'From 20 to 80 £'
                }
            ]
        }
    ]

  return (
        <SectionContainer background={"#BE8F4508"}>
            <Container>
                {
                    services?.map((item,index)=>{
                        return(
                        <LeftRightItems key={index} itemIndex={index} item={item} leftbgImage={leftbgImage}>
                            <div className='right-inner-wrapper'>
                                <h2 className="title-text text-black section-title">{item.title}</h2>
                                <ul>
                                {
                                    item?.minServices?.map((servive,i)=>{
                                        return(
                                            <li key={i} className='d-flex justify-content-between'>
                                            <span>{servive?.name}</span>
                                            <span>{servive.price}</span>
                                        </li>
                                        )
                                        
                                    })
                                }
                                </ul>
                                <Link to='/' className='btn order_now curated-btn'> Shop Now</Link>
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
