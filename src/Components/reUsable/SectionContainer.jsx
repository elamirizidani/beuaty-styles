import React from 'react'

function SectionContainer({children,classes,background}) {
  return (
    <section className={`sections-container ${classes}`} style={{ backgroundColor: background }}>
      {children}
    </section>
  )
}

export default SectionContainer
