import React from 'react'
import PageHeader from '../Components/reUsable/PageHeader'
import bg from '../assets/imgs/headers/bookservice.jpg'
import Services from '../Components/bookService/Services'


function BookService() {
  return (
    <>
    <PageHeader bgImage={bg} title={'Book a service'}/>
    <Services/>
    </>
  )
}

export default BookService
