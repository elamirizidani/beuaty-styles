import React from 'react'

function TitleStyled({title,align='start'}) {
  return (
    <div className={`title-container d-flex flex-column align-items-${align}`}>
      <h3 className='title-text'>{title}</h3>
      <div className='title-underline'/>
    </div>
  )
}

export default TitleStyled
