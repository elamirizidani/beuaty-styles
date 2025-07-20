import React, { useContext } from 'react'
import {Button,Container,Form,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import './header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../MainLayout/AuthContext';
import CartModal from './CartModal';
import UserPref from './UserPref';
export default function Header() {
  const { isLoggedIn,logout,cartData } = useContext(AuthContext)
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
            <Nav.Link  as={Link} to='/bookService'>Book service</Nav.Link>
            <Nav.Link as={Link} to='/shop'>Shop</Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact us
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-3">
            {/* <Nav.Link href="#">
              <div className='headerIcon'><i class="bi bi-search"></i></div>
            </Nav.Link> */}
            {/* <Nav.Link href="#">
              <div className='headerIcon'>
                <i class="bi bi-bag"></i>
                <em className='roundpoint'>{cartData?.length}</em>
              </div>
            </Nav.Link> */}
            <CartModal />
            {
              isLoggedIn &&
            <UserPref/>
}
            {
              isLoggedIn ?
              <>
                <button onClick={()=>logout()} className="btn order_now">
                    Sign Out
                </button>
              </>
              :
              <Link to='/login' variant="outline-success" className='btn order_now'>Sign in/Sign Up</Link>
            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}
