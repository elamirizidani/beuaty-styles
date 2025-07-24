import React from 'react'

function TitleStyled({title,align='start', subtext}) {
  return (
    <div className={`title-container d-flex flex-column align-items-${align}`}>
      <h3 className='title-text text-black section-title'>{title}</h3>
      {subtext && <p>{subtext}</p>}
      {/* <div className='title-underline'/> */}
    </div>
  )
}

export default TitleStyled
