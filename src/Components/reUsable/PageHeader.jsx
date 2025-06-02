import React from 'react'
import { Container } from 'react-bootstrap'
function PageHeader({bgImage,title}) {
  return (
      <div className='jumbotron text-white bg-dark'
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: '100% 20%',
        height: '550px',
        width: '100%',
      }}
      >
        <div className='d-flex align-items-center' style={{
            height:'100%',
            width:'100%',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(20, 20, 20, 1) 100%)',
        }}>
            <Container className='d-flex justify-content-end'>
                <div className='col-md-6 px-0'>
                <h1 className='display-4 font-italic text-end'>{title}</h1>
                </div>
            </Container>
        </div>
        
      </div>
  )
}

export default PageHeader
