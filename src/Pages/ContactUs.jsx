import React, { useState } from 'react';
import SectionContainer from '../Components/reUsable/SectionContainer'
import { Col, Container, Row } from 'react-bootstrap';
import loginImage from '../assets/imgs/contact/contact-img.webp';
import { insertData } from '../../utilty/data/api';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    about: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    isError: false
  });
const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: '', isError: false });

    try {
      
      const response = await insertData('/helps/create', formData);
      // console.log(response)
      setSubmitStatus({
        message: response.message || 'Message sent successfully!',
        isError: false
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        about: '',
        message: ''
      });

    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to submit form. Please try again.';
      setSubmitStatus({
        message: errorMessage,
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    
    <SectionContainer background={"#BE8F451A"}>
      <Container>
        <Row className='row p-4'>
          <Col className='justify-content-center d-flex flex-column' md={6}>
          <h2>
            WE'RE HERE TO HELP.
          </h2>
          <p>
            Have A Question, Concern, Or Just Want To Say Hello? Whether it's About Your Order,<br />
            A Service Booking, Or Product Advice — We're Always Happy To Hear From You.
          </p>
          </Col>
          <Col md={6}>

          <div className='row justify-content-between mb-5'>
            <Col className='justify-content-center align-items-center d-flex flex-column' md={6}>
            <div className='icon-container'>
              <i class="bi bi-envelope-open"></i>
            </div>
            <h4>
            Email Address
          </h4>
          <p style={{ color: '#555' }}>Deborahkitenge@gmail.com</p>
          </Col>
            <Col className='justify-content-center align-items-center d-flex flex-column' md={6}>
            <div className='icon-container'>
              <i class="bi bi-telephone"></i>
            </div>
            <h4>
            Phone Number
          </h4>
          <p style={{ color: '#555' }}>+1-202-555-0177</p></Col>
          </div>
          </Col>
        </Row>
      </Container>
    </SectionContainer>

<SectionContainer background={"#fff"}>
    <div className="container" style={{  padding: '2rem' }}>


      {submitStatus.message && (
            <div className={`alert ${submitStatus.isError ? 'alert-danger' : 'alert-success'}`}>
              {submitStatus.message}
            </div>
          )}
      
<Row>
  <div className="col-md-6 col-lg-5 d-none d-md-block">
                                      <img 
                                          src={loginImage}
                                          style={{
                                              height: '100%',
                                              objectFit: 'cover',
                                              objectPosition: 'right'
                                          }}
                                          alt="Booking form" 
                                          className="img-fluid rounded-2"
                                      />
                                  </div>
<Col md='6'>
                                  <form onSubmit={handleSubmit} style={{ 
        padding: '0',
        marginBottom: '2rem'
      }}>
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <label htmlFor="fullName" className="form-label" style={{
              
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '0.8rem'
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label" style={{
              
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '0.8rem'
              }}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="about" className="form-label" style={{
            
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            What is This About?
          </label>
          <select className="form-control"
            id="about"
            name="about" value={formData.about}
            onChange={handleChange}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '0.8rem'
            }}
            >
            <option value="Product Question">Product Question</option>
            <option value="Service Appointment">Service Appointment</option>
            <option value="Order/Delivery Issue">Order/Delivery Issue</option>
            <option value="Feedback or Suggestion">Feedback or Suggestion</option>
            <option value="Other">Other</option>
          </select>
          
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="form-label" style={{
            
            display: 'block',
            marginBottom: '0.5rem'
          }}>
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell Us A Bit More..."
            required
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '0.8rem',
              minHeight: '120px'
            }}
          />
        </div>

        <button 
          type="submit" 
          className="btn w-100" 
          style={{
            backgroundColor: '#000',
            color: 'white',
            padding: '1rem',
            borderRadius: '4px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'normal'
          }}
          disabled={isSubmitting}
        >

          {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
        </button>
      </form>
      <p className="text-center" style={{ 
        color: '#666',
        fontStyle: 'italic',
        marginTop: '2rem'
      }}>
        We Aim To Respond Within 24 Hours, Monday To Saturday.
      </p>
      </Col>
</Row>
      
    </div>
    </SectionContainer>
    </>
  );
};

export default ContactUs;