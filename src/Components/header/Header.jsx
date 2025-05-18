import React from 'react'
import {Button,Container,Form,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import './header.css'
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Hea & Co.</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 justify-content-center flex-grow-1"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link  href="#action2">Book service</Nav.Link>
            <Nav.Link href="#action3">Shop</Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact us
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3">
            <Nav.Link href="#">
              <div className='headerIcon'><i class="bi bi-search"></i></div>
            </Nav.Link>
            <Nav.Link href="#">
              <div className='headerIcon'>
                <i class="bi bi-bag"></i>
                <em className='roundpoint'>2</em>
              </div>
            </Nav.Link>
            <Link to='/' variant="outline-success" className='btn order_now'>Sign in/Sign Up</Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}
