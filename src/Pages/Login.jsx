import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { login as apiLogin,register } from '../../utilty/data/api';
import { AuthContext } from '../MainLayout/AuthContext';
import loginImage from '../assets/imgs/auth/login.webp'
import SectionContainer from '../Components/reUsable/SectionContainer'
import { Tab, Tabs } from 'react-bootstrap';


function Login() {
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
                                        <span className="h1 fw-bold mb-0">Hea & Co.</span>
                                    </div>

                        <Tabs
                            defaultActiveKey="signin"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                            >
                            <Tab eventKey="signin" title="Sign In">
                               <form onSubmit={handleSubmit}>
                                    

                                    {/* <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Sign in</h5> */}

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" for="form2Example17">Email address</label>
                                        <input type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="you@example.com"
                                            id="form2Example17" className="form-control form-control-lg rounded-1" />
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" for="form2Example27">Password</label>
                                        <input type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="form2Example27" className="form-control form-control-lg rounded-1" />
                                    </div>

                                    <div className="pt-1 mb-4 d-grid">
                                        {error && (
                                                <div style={{ color: 'red', marginBottom: 12 }}>
                                                {error}
                                                </div>
                                            )
                                        }

                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn order_now" disabled={loading} style={{ padding: '10px 15px', width: '100%' }}>
                                            {loading ? 'Logging in...' : 'Login'}
                                        </button>

                                    </div>
                                    <a className="small text-muted" href="#!">Forgot password?</a>
                                </form>
                            </Tab>
                            <Tab eventKey="signout" title="Sign Up">
                                <form onSubmit={handleRegistor}>
                                    {/* <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Sign Up</h5> */}

                                    <div data-mdb-input-init className="form-outline mb-2">
                                        <label className="form-label" for="registorNames">Names</label>
                                        <input type="text"
                                            value={names}
                                            onChange={(e) => setNames(e.target.value)}
                                            required
                                            placeholder="Names"
                                            id="registorNames" className="form-control form-control-lg rounded-1" />
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-2">
                                        <label className="form-label" for="registorEmail">Email address</label>
                                        <input type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="you@example.com"
                                            id="registorEmail" className="form-control form-control-lg rounded-1" />
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-2">
                                        <label className="form-label" for="registorPassword">Password</label>
                                        <input type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="registorPassword" className="form-control form-control-lg rounded-1" />
                                    </div>
                                    <div data-mdb-input-init className="form-outline mb-2">
                                        <label className="form-label" for="formConfirmPass">Confirm Password</label>
                                        <input type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            id="formConfirmPass" className="form-control form-control-lg rounded-1" />
                                    </div>

                                    <div className="pt-1 mb-4 d-grid">
                                        {error && (
                                                <div style={{ color: 'red', marginBottom: 12 }}>
                                                {error}
                                                </div>
                                            )
                                        }

                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn order_now" disabled={loading} style={{ padding: '10px 15px', width: '100%' }}>
                                            {loading ? 'Logging in...' : 'Login'}
                                        </button>

                                    </div>
                                </form>
                            </Tab>
                        </Tabs>


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

export default Login
