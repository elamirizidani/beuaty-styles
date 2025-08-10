import React, { useState, useEffect, useRef } from 'react';
import { Offcanvas, Form, Button, Alert, Spinner, Card, InputGroup } from 'react-bootstrap';
import { insertData } from '../../../utilty/data/api';

const ForgetPsw = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('email'); // 'email', 'otp', 'newPassword', 'success'
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [tempToken,setTempToken]=useState('')
  const otpInputsRef = useRef([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    setErrors({});
    setMessage('');
    
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your API call
      const response = await insertData('auth/request-password-reset', {
        email:email
});
console.log(response)
    //   const data = await response.json();

      if (response.success) {
        setStep('otp');
        setCountdown(300); // 5 minutes countdown
        setMessageType('success');
        setMessage('OTP has been sent to your email address.');
        // Focus first OTP input
        setTimeout(() => {
          otpInputsRef.current[0]?.focus();
        }, 100);
      } else {
        setMessageType('danger');
        setMessage(response.message || 'Email not found or something went wrong.');
      }
    } catch (error) {
      setMessageType('danger');
      setMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  // Handle OTP input keydown
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    setErrors({});
    setMessage('');
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setErrors({ otp: 'Please enter complete 6-digit OTP' });
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your API call
      const response = await insertData('auth/verify-otp', { email:email, otp: otpString });
        // console.log(response)
    //   const data = await response.json();

      if (response.success) {
        setTempToken(response.tempToken)
        // localStorage.setItem('token', response.tempToken);
        setStep('newPassword');
        setMessageType('success');
        setMessage('OTP verified successfully. Please set your new password.');
      } else {
        setMessageType('danger');
        setMessage(response.message || 'Invalid or expired OTP.');
      }
    } catch (error) {
      setMessageType('danger');
      setMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    setErrors({});
    setMessage('');
    
    // if (!newPassword) {
    //   setErrors({ newPassword: 'New password is required' });
    //   return;
    // }
    
    // if (!validatePassword(newPassword)) {
    //   setErrors({ 
    //     newPassword: 'Password must be at least 8 characters with uppercase, lowercase, and number' 
    //   });
    //   return;
    // }
    
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your API call
      const response = await insertData('auth/reset-password', { 
          email:email, 
          otp: otp.join(''), 
          token:tempToken,
          newPassword:newPassword});

    //   const data = await response.json();

      if (response.success) {
        setStep('success');
        setMessageType('success');
        setMessage('Password reset successfully!');
      } else {
        setMessageType('danger');
        setMessage(response.message || 'Failed to reset password.');
      }
    } catch (error) {
      setMessageType('danger');
      setMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('auth/send-otp', {email:email});

      if (response.success) {
        setCountdown(300);
        setOtp(['', '', '', '', '', '']);
        setMessageType('success');
        setMessage('New OTP has been sent to your email.');
        otpInputsRef.current[0]?.focus();
      } else {
        setMessageType('danger');
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
        console.log(error)
      setMessageType('danger');
      setMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOffCanvasClose = () => {
    setEmail('');
    setOtp(['', '', '', '', '', '']);
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    setErrors({});
    setIsLoading(false);
    setStep('email');
    setCountdown(0);
    handleClose();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Offcanvas show={show} onHide={handleOffCanvasClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <i className="bi bi-key me-2"></i>
          Reset Password
          {step === 'otp' && <small className="text-muted ms-2">- Verify OTP</small>}
          {step === 'newPassword' && <small className="text-muted ms-2">- New Password</small>}
        </Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body>
        {message && (
          <Alert variant={messageType} className="mb-3">
            <i className={`bi ${messageType === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
            {message}
          </Alert>
        )}

        {/* Step 1: Email Input */}
        {step === 'email' && (
          <>
            <div className="mb-4">
              <div className="text-center mb-3">
                <i className="bi bi-envelope-at text-primary" style={{ fontSize: '3rem' }}></i>
              </div>
              <h6 className="text-center">Enter Your Email</h6>
              <p className="text-muted text-center small">
                We'll send you a 6-digit verification code to reset your password.
              </p>
            </div>

            <Form onSubmit={handleEmailSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-envelope me-2"></i>
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  disabled={isLoading}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid gap-2 mb-3">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isLoading}
                  size="sm"
                className='order_now'
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2"></i>
                      Send OTP
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <>
            <div className="mb-4">
              <div className="text-center mb-3">
                <i className="bi bi-shield-check text-success" style={{ fontSize: '3rem' }}></i>
              </div>
              <h6 className="text-center">Enter Verification Code</h6>
              <p className="text-muted text-center small">
                We've sent a 6-digit code to <strong>{email}</strong>
              </p>
            </div>

            <Form onSubmit={handleOtpSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-center w-100">
                  Enter 6-Digit OTP
                </Form.Label>
                <div className="d-flex justify-content-center gap-2 mb-2">
                  {otp.map((digit, index) => (
                    <Form.Control
                      key={index}
                      ref={el => otpInputsRef.current[index] = el}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      maxLength={1}
                      className="text-center fw-bold"
                      style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <div className="text-danger small text-center mt-2">
                    <i className="bi bi-exclamation-circle me-1"></i>
                    {errors.otp}
                  </div>
                )}
              </Form.Group>

              <div className="text-center mb-3">
                {countdown > 0 ? (
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    Resend OTP in {formatTime(countdown)}
                  </small>
                ) : (
                  <Button 
                    variant="link" 
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="p-0 text-decoration-none order_now"
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Resend OTP
                  </Button>
                )}
              </div>

              <div className="d-grid gap-2 mb-3">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isLoading}
                  size="sm"
                  className='order_now'
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg me-2"></i>
                      Verify OTP
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 'newPassword' && (
          <>
            <div className="mb-4">
              <div className="text-center mb-3">
                <i className="bi bi-lock text-primary" style={{ fontSize: '3rem' }}></i>
              </div>
              <h6 className="text-center">Set New Password</h6>
              <p className="text-muted text-center small">
                Create a strong password for your account.
              </p>
            </div>

            <Form onSubmit={handlePasswordReset}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-lock me-2"></i>
                  New Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    isInvalid={!!errors.newPassword}
                    disabled={isLoading}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className='order_now'
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </Button>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {errors.newPassword}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  At least 8 characters with uppercase, lowercase, and number
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-lock-fill me-2"></i>
                  Confirm Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={!!errors.confirmPassword}
                    disabled={isLoading}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className='order_now'
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </Button>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid gap-2 mb-3">
                <Button 
                  variant="success" 
                  type="submit" 
                  disabled={isLoading}
                  size="sm"
                  className='order_now'
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Update Password
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="text-center">
            <div className="mb-4">
              <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center" 
                   style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-check-lg text-white" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
            
            <h5 className="mb-3 text-success">Password Reset Successfully!</h5>
            <p className="text-muted mb-4">
              Your password has been updated successfully. You can now sign in with your new password.
            </p>
            
            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                onClick={handleOffCanvasClose}
                size="cm"
                className='order_now'
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Go to Sign In
              </Button>
            </div>
          </div>
        )}

        {(step === 'email' || step === 'otp') && (
          <>
            <hr className="my-4" />
            <div className="text-center">
              <Button 
                variant="outline-secondary order_now" 
                onClick={step === 'otp' ? () => setStep('email') : handleOffCanvasClose}
                disabled={isLoading}
                className="px-4 order_now"
              >
                <i className="bi bi-arrow-left me-2"></i>
                {step === 'otp' ? 'Change Email' : 'Back to Sign In'}
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ForgetPsw;