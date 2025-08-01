import React, { useState,useEffect } from 'react';
import { Button, Offcanvas, Tab, Tabs, Form, ListGroup, Row, Col } from 'react-bootstrap';
import { fetchData, insertData } from '../../../utilty/data/api';
import moment from 'moment';
import { FaRegUser, FaUserEdit } from 'react-icons/fa';


function SideModel() {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('history');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Mock purchase history data
//   const purchaseHistory = [
//     { id: 1, date: '2023-05-15', item: 'Revitalizing Gel', amount: 55.00, status: 'Delivered' },
//     { id: 2, date: '2023-06-20', item: 'Anti-Aging Cream', amount: 65.00, status: 'Shipped' },
//     { id: 3, date: '2023-07-10', item: 'Moisturizing Lotion', amount: 45.00, status: 'Processing' }
//   ];
  const [purchaseHistory,setPurchaseHistory]= useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await insertData('user/change-password',passwordForm)
        console.log(res)
        if(res?.success)
        {
            alert('Password changed successfully!');
            setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
            });
        }

    } catch (error) {
        alert(error?.response?.data?.message);
    }

    // Add your password change logic here
    // console.log('Password change submitted:', passwordForm);
    
  };


  useEffect(() => {
      const fetchCartData = async () => {
        try {
            const res = await fetchData('/user/purchases')
            console.log(res?.purchases)
             setPurchaseHistory(res?.purchases || []);
        } catch (error) {
            console.log(error)
        }
        
      };
  
      fetchCartData();
    }, []);

  return (
    <div className="p-4">
      <div 
        className="position-relative d-inline-block cursor-pointer"
        onClick={handleShow}
        style={{ cursor: 'pointer' }}
      >
        <FaRegUser size={20} className="text-dark" />
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '450px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Account Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Fixed Tabs - now properly in a row */}
          <div className="mb-4">
            <Row>
              <Col>
                <div className="d-flex border-bottom">
                <Button 
                    variant="link"
                    className={`text-decoration-none ${activeTab === 'history' ? 'text-primary border-bottom border-primary border-2' : 'text-secondary'}`}
                    onClick={() => setActiveTab('history')}
                  >
                    Purchase History
                  </Button>
                <Button 
                    variant="link"
                    className={`text-decoration-none me-3 ${activeTab === 'password' ? 'text-primary border-bottom border-primary border-2' : 'text-secondary'}`}
                    onClick={() => setActiveTab('password')}
                  >
                    Change Password
                  </Button>
                  
                </div>
              </Col>
            </Row>
          </div>

          {activeTab === 'password' && (
            <div className="mt-3">
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update Password
                </Button>
              </Form>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="mt-3">
              <h5>Your Recent Purchases</h5>
              <ListGroup>
                {purchaseHistory?.map(purchase => (
                  <ListGroup.Item key={purchase?.id}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{purchase?.product?.name} ({purchase?.quantity})</strong>
                        <div className="text-muted small">{moment(purchase?.date).format('MMM D, YYYY')}</div>
                      </div>
                      <div className="text-end">
                        
                        <div className={`badge bg-${purchase?.status === 'Delivered' ? 'success' : purchase?.status === 'Shipped' ? 'warning' : 'secondary'} ms-2`}>
                          {purchase?.status}
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SideModel;