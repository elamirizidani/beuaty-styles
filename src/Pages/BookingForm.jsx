import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import SectionContainer from '../Components/reUsable/SectionContainer';
import { insertData } from '../../utilty/data/api';
import { useLocation } from 'react-router-dom';

function BookingForm() {
    const location = useLocation();
    const serviceData = location.state?.item;
    // const serviceOptions = [
    //     'Hair Styling',
    //     'Hair cut & Hair Styling',
    //     'Cosmetics Services',
    //     'Luxury Self-Care Services'
    // ];
    const [formData, setFormData] = useState({
        serviceType:'',
        date: '',
        timeSlot: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        specialRequests: '',
        reminder: true
    });

    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // console.log(serviceData)

    useEffect(() => {
    // Scroll to the top of the page on mount
    window.scrollTo(0, 0);
  }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionError('');
        // console.log(validateForm())
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            await insertData('/bookings/create', formData);
            // alert(response.message)
            // console.log(response.message)
            // if (response.message === "Booking submitted successfully!") {

                setIsSuccess(true);
                setTimeout(() => {
                    setFormData({
                        serviceType: 'Hair Styling',
                        date: '',
                        timeSlot: '',
                        fullName: '',
                        phoneNumber: '',
                        email: '',
                        specialRequests: '',
                        reminder: true
                    });
                    setIsSuccess(false);
                }, 3000);
            // }
        } catch (error) {
            if (error.response) {
                setSubmissionError(error.response.data.message || 'Failed to submit booking. Please try again later.');
            } else if (error.request) {
                setSubmissionError('No response from server. Please check your connection.');
            } else {
                
                setSubmissionError('An error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <SectionContainer background={"#BE8F451A"}>
            <h2 className='text-center'>{serviceData?.title}</h2>
        </SectionContainer>
    
        <SectionContainer background={"#BE8F4508"}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="bg-white">
                            <div className="row g-0">
                                <div className="col-md-6 d-none d-md-block">
                                    <img 
                                        src={serviceData?.bgImage}
                                        style={{
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                        alt="Booking form" 
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <span className="h3 fw-bold mb-0">Book Your Appointment</span>
                                        </div>

                                        {isSuccess && (
                                            <Alert variant="success" className="mb-4">
                                                Booking submitted successfully! We'll contact you shortly to confirm.
                                            </Alert>
                                        )}

                                        {submissionError && (
                                            <Alert variant="danger" className="mb-4">
                                                {submissionError}
                                            </Alert>
                                        )}

                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="serviceType" className="mb-2">
                                                <Form.Label className='small fw-light'>Choose a type of hair styling</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="serviceType"
                                                    // defaultValue={serviceOptions.find(service=>service === serviceData?.title)}
                                                    value={formData.serviceType}
                                                    onChange={handleChange}
                                                >
                                                    {
                                                    serviceData?.minServices?.map((option,i) => (
                                                        <option key={i} value={option?.name}>{option?.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="appointmentDateTime" className="mb-2">
                                                <Form.Label className='small fw-light'>When would you like to book your appointment?</Form.Label>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type="date"
                                                                name="date"
                                                                value={formData.date}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.date}
                                                                min={new Date().toISOString().split('T')[0]}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.date}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type="time"
                                                                name="timeSlot"
                                                                placeholder="Choose time slot"
                                                                value={formData.timeSlot}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.timeSlot}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.timeSlot}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form.Group>


                                                <Row>
                                                    <Col md={4} className="mb-3 mb-md-0">
                                                        <Form.Group>
                                                            <Form.Label className='small fw-light'>Full Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="fullName"
                                                                placeholder="Full Name"
                                                                value={formData.fullName}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.fullName}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.fullName}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4} className="mb-3 mb-md-0">
                                                        <Form.Group>
                                                            <Form.Label className='small fw-light'>Phone number</Form.Label>
                                                            <Form.Control
                                                                type="tel"
                                                                name="phoneNumber"
                                                                placeholder="Phone number"
                                                                value={formData.phoneNumber}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.phoneNumber}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.phoneNumber}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label className='small fw-light'>Email Address</Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                name="email"
                                                                placeholder="Email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.email}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.email}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                            <Form.Group className="mb-2">
                                                <Form.Label className='small fw-light'>Any special requests?</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="specialRequests"
                                                    placeholder="Tell us a bit more...."
                                                    value={formData.specialRequests}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-4">
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Send me a reminder before my appointment"
                                                    name="reminder"
                                                    checked={formData.reminder}
                                                    onChange={(e) => setFormData({...formData, reminder: e.target.checked})}
                                                    style={{color:'#FF6A00'}}
                                                     className="custom-checkbox"
                                                />
                                            </Form.Group>

                                            <div className="pt-1 mb-4 d-grid">
                                                <Button 
                                                    variant="primary" 
                                                    type="submit" 
                                                    disabled={isSubmitting}
                                                    style={{ padding: '10px 15px',display:'flex',width:'100%' }}
                                                    className='order_now justify-content-center'
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="ms-2">Submitting...</span>
                                                        </>
                                                    ) : 'Submit'}
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
        </>
    );
}

export default BookingForm;