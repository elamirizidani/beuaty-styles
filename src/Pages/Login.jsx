import React, { useState } from 'react'
import { useNavigate,Navigate } from 'react-router-dom';
import loginImage from '../assets/imgs/auth/login.webp'
import signUpImage from '../assets/imgs/auth/signUp.webp'
import SectionContainer from '../Components/reUsable/SectionContainer'
import { Tab, Tabs } from 'react-bootstrap';
import { useAuthStore } from '../store/authStore';
import ForgetPsw from '../Components/Auth/ForgetPsw';

function Login() {
    const navigate = useNavigate();
      const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [names,setNames] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('signin');
    // const [showLogin,setShowLogin] = useState(true)

    const { adminLogin,userRegistration,isLoggedIn } = useAuthStore();

const handleTabSelect = (key) => {
        setActiveTab(key);
        // Clear form errors when switching tabs
        setError('');
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const userRole = await adminLogin({ email: email, password: password });
        
        if(userRole.status)
        {
            // console.log(userRole.role)
            // console.log(userRole?.role?.toLowerCase() === 'admin')
             if (userRole?.role?.toLowerCase() === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
        else{
            setLoading(false);
            setError('Login failed. Please try again.');
        }
    } catch (err) {
      setError(err.message);
      setLoading(false);
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
            const registor = await userRegistration(dataToSend);
            if(registor.status)
            {
                // if (registor === 'admin') {
                //     navigate('/admin');
                // } else {
                    navigate('/');
                // }
            }
            else{
                setError('Sign Up failed. Please try again.');
            }
        
        } catch (error) {
            // console.log(error.response?.data?.message)
            setError(error.response?.data?.message || 'Sign Up failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    }

     if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }


  return (
    <>
    <SectionContainer background={"#BE8F4508"}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
                <div className="bg-white" >
                <div className="row g-0">
                    <div className="col-md-7 d-none d-md-block">
                    <img src={activeTab === 'signin' ? loginImage : signUpImage}
                        style={{
                            height:'100%',
                            objectFit:'cover',
                            objectPosition:activeTab === 'signin' ? 'left':'center'
                        }}
                        alt={activeTab === 'signin' ? "Login" : "Sign Up"} 
                        className="img-fluid"/>
                    </div>
                    <div className="col-md-5 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                        <div className="d-flex align-items-center mb-3 pb-1">
                                        <i className="fas fa-cubes fa-2x" style={{color: '#ff6219'}}></i>
                                        <span className="h1 fw-bold mb-0">Hea & Co.</span>
                                    </div>

                        <Tabs
                            defaultActiveKey="signin"
                            activeKey={activeTab}
                            onSelect={handleTabSelect}
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

                                        <a className="small text-end mb-3" onClick={()=>setShowForgotPassword(true)} href="#" style={{color:'#ff6a00'}}>Forgot password?</a>
                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn order_now" disabled={loading} style={{ padding: '10px 15px', width: '100%',textTransform:'capitalize' }}>
                                            {loading ? 'Signing in...' : 'Sign in'}
                                        </button>

                                    </div>
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
    <ForgetPsw
    show={showForgotPassword}
        handleClose={() => setShowForgotPassword(false)}
        />
    </>
  )
}

export default Login
