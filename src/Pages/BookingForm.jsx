import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Table, Button, Badge, Spinner, Card, Form, Row, Col } from 'react-bootstrap';
import { login as apiLogin,register } from '../../utilty/data/api';
import { AuthContext } from '../MainLayout/AuthContext';
import loginImage from '../assets/imgs/auth/login.webp'
import SectionContainer from '../Components/reUsable/SectionContainer'


function BookingForm() {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [names,setNames] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    // const [showLogin,setShowLogin] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await apiLogin(email, password);
            // console.log(data.token)
            if (data.token) {
                alert('Login successful!');
                login();
                navigate('/'); 
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
            // setError('Login failed. Please try again.');
        }
    };


    const handleRegistor = async(e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
        const dataToSend={
            name: names,
            email: email,
            password: password
        }

        try {
            const data = await register(dataToSend);
            // console.log(dataToSend)
            console.log(data)
            if (data.token) {
                alert('Login successful!');
                login();
                navigate('/'); 
            }
        } catch (error) {
            // console.log(error.response?.data?.message)
            setError(error.response?.data?.message || 'Sign Up failed. Please try again.');
        }
        finally {
            setLoading(false);
            // setError('Sign Up failed. Please try again.');
        }
    }



  return (
    <SectionContainer background={"#BE8F4508"}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
                <div className="bg-white" >
                <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={loginImage}
                        style={{
                            height:'100%',
                            objectFit:'cover',
                            objectPosition:'left'
                        }}
                        alt="login form" className="img-fluid"/>
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                        <div className="d-flex align-items-center mb-3 pb-1">
                                        <i className="fas fa-cubes fa-2x" style={{color: '#ff6219'}}></i>
                                        <span className="h1 fw-bold mb-0">Hair Styling Services</span>
                                    </div>



                                    <form onSubmit={handleSubmit}>
                                    

                                    {/* <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Sign in</h5> */}

                                    <Form.Group controlId="filterDate">
                                        <Form.Label>Choose a type of hair styling you want</Form.Label>
                                        <Form.Control
                                            as="select"
                                            // value={filter.dateFrom}
                                            // onChange={handleDateChange}  // Handle the change
                                        >
                                            <option>Hair Styling</option>
                                            <option>Hair cut & Hair Styling</option>
                                            <option>Hair Colouring</option>
                                            <option>Blowaving Orising</option>
                                            <option>Hair Extension</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" for="form2Example17">When would you like to book your appointment?</label>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group>
                                                {/* <Form.Label>From Date</Form.Label> */}
                                                <Form.Control
                                                    type="date"
                                                    // onChange={(e) => setFilter({...filter, dateFrom: e.target.value})}
                                                />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                {/* <Form.Label>From Date</Form.Label> */}
                                                <Form.Control
                                                    type="time"
                                                    placeholder='Choose time slot'
                                                    // onChange={(e) => setFilter({...filter, dateFrom: e.target.value})}
                                                />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <Row>
                                            <Col md={4}>
                                                <Form.Group>
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder='Full Name'
                                                        // onChange={(e) => setFilter({...filter, dateFrom: e.target.value})}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group>
                                                    <Form.Label>Phone number</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        placeholder='Phone number'
                                                        // onChange={(e) => setFilter({...filter, dateFrom: e.target.value})}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group>
                                                    <Form.Label>Email Address</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder='email'
                                                         onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Any special requests?</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            placeholder='Tell us a bit more....'
                                            // value={currentProduct?.description || ''}
                                            // onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <div className="pt-1 mb-4 d-grid">
                                        {error && (
                                                <div style={{ color: 'red', marginBottom: 12 }}>
                                                {error}
                                                </div>
                                            )
                                        }

                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn order_now" disabled={loading} style={{ padding: '10px 15px', width: '100%' }}>
                                            {loading ? 'Submiting...' : 'Submit'}
                                        </button>

                                    </div>
                                </form>


                    </div>

                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </SectionContainer>
  )
}

export default BookingForm
