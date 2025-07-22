import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col,Badge } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';
import { updateData } from '../../../utilty/data/api';
import { useAuthStore } from '../../store/authStore';

const UserPref = ({ userId }) => {
  const { user } = useAuthStore();
  const [preferences, setPreferences] = useState({
    hairType: '',
    skinType: '',
    beautyGoals: '',
    priceRange: { min: '', max: '' }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', isError: false });
    const [show, setShow] = useState(false);
  // Hair type options
  const hairTypes = [
    'Straight', 'Wavy', 'Curly', 'Coily', 'Fine', 'Thick', 
    'Dry', 'Oily', 'Color-treated', 'Damaged'
  ];

  // Skin type options
  const skinTypes = [
    'Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 
    'Acne-prone', 'Mature', 'Dehydrated'
  ];

  // Beauty goals options
  const beautyGoals = [
    'Anti-aging', 'Hydration', 'Acne control', 'Brightening', 
    'Redness reduction', 'Pore minimization', 'Even skin tone'
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: '', isError: false });

    try {
        await updateData('auth/preferences',preferences)
    //   await axios.patch(`/api/users/${userId}/preferences`, { preferences });
      setSubmitStatus({
        message: 'Preferences saved successfully!',
        isError: false
      });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error) {
      console.error('Error saving preferences:', error);
      setSubmitStatus({
        message: error.response?.data?.message || 'Failed to save preferences. Please try again.',
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    
    <div 
        className="position-relative d-inline-block cursor-pointer"
        onClick={handleShow}
        style={{ cursor: 'pointer' }}
      >
        <FaUserEdit size={20} className="text-dark" />
        {!user?.preferences && (
          <Badge 
            pill 
            bg="danger" 
            className="position-absolute top-0 start-100 translate-middle"
          >
            .
          </Badge>
        )}
      </div>
      
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Tell Us About Your Preferences</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {submitStatus.message && (
          <div className={`alert ${submitStatus.isError ? 'alert-danger' : 'alert-success'} mb-4`}>
            {submitStatus.message}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="hairType">
                <Form.Label>Hair Type</Form.Label>
                <Form.Select 
                  name="hairType"
                  value={preferences.hairType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your hair type</option>
                  {hairTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="skinType">
                <Form.Label>Skin Type</Form.Label>
                <Form.Select 
                  name="skinType"
                  value={preferences.skinType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your skin type</option>
                  {skinTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="beautyGoals">
            <Form.Label>Beauty Goals</Form.Label>
            <Form.Select 
              name="beautyGoals"
              value={preferences.beautyGoals}
              onChange={handleChange}
              required
            >
              <option value="">Select your primary beauty goal</option>
              {beautyGoals.map(goal => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="priceMin">
                <Form.Label>Minimum Price Range ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="min"
                  value={preferences.priceRange.min}
                  onChange={handlePriceChange}
                  min="0"
                  placeholder="0"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="priceMax">
                <Form.Label>Maximum Price Range ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="max"
                  value={preferences.priceRange.max}
                  onChange={handlePriceChange}
                  min={preferences.priceRange.min || 0}
                  placeholder="100"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid gap-2 mt-4">
            <Button 
              variant="dark" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default UserPref;