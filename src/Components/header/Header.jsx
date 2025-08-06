import React,{useState} from 'react'
import {Button,Container,Form,Nav,Navbar,NavDropdown,Toast,ToastContainer} from 'react-bootstrap';
import './header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../MainLayout/AuthContext';
import CartModal from './CartModal';
import UserPref from './UserPref';
import { useAuthStore } from '../../store/authStore';
import SideModel from './SideModel';
export default function Header() {

  const { isLoggedIn,adminLogout,user } = useAuthStore();
const [show, setShow] = useState(true);

// console.log('logged user',user)
  return (
    <header>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#" className='site-logo'>Hea & Co.</Navbar.Brand>
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
            {
              isLoggedIn &&
              <Nav.Link as={Link} to="/MyAccount">
              My Account
            </Nav.Link>
            }
          </Nav>
          <div className="d-flex align-items-center gap-3">
            <i class="bi bi-search" style={{fontSize:'24px'}}></i>
            <CartModal />
            {
              isLoggedIn &&
              <>
              <UserPref/>
            <SideModel/>
            </>
            
}
            {
              isLoggedIn ?
              <>
                <button onClick={()=>adminLogout()} className="btn order_now">
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

{
  (isLoggedIn && !user?.preferences) &&
  <ToastContainer position="end" className="p-3" style={{ zIndex: 1,right:0 }}>
        <Toast bg='danger' onClose={() => setShow(false)} show={show} delay={30000} autohide>
          <Toast.Header>
            <strong className="me-auto">Update your preferences.</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body className={'text-white'}>Please complete your profile to set your preferences and personalize your experience.</Toast.Body>
        </Toast>
      </ToastContainer>
}
      


    </header>
  )
}
