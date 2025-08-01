import React, { useState,useEffect } from 'react';
import { Button, Offcanvas, Tab, Tabs, Form, ListGroup, Row, Col, Container,Table, Card } from 'react-bootstrap';
import moment from 'moment';
import { FaRegUser, FaUserEdit } from 'react-icons/fa';
import { fetchData, insertData } from '../../utilty/data/api';
import SectionContainer from '../Components/reUsable/SectionContainer';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';


function MyAccount() {
    const { isLoggedIn,user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  

  const [purchaseHistory,setPurchaseHistory]= useState([])

  

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

    if(!isLoggedIn)
{
    return <Navigate to="/" replace />
}

  return (
    <>
    <SectionContainer background={"#BE8F451A"}>
        <h2 className='text-center'>My Account</h2>
    </SectionContainer>

    <Container className='py-5'>
          {/* Fixed Tabs - now properly in a row */}
          <Row>
            <Col md={4}>
            <div className="mb-4">
            <Row>
              <Col>
                <div className="flex-column d-flex">
                <Button 
                    variant="link"
                    className={`text-decoration-none ${activeTab === 'profile' && 'active'} text-secondary my-tabs`}
                    onClick={() => setActiveTab('profile')}
                  >
                    Account Information
                  </Button>
                <Button 
                    variant="link"
                    className={`text-decoration-none ${activeTab === 'history' && 'active'} text-secondary my-tabs`}
                    onClick={() => setActiveTab('history')}
                  >
                    Order History
                  </Button>
                <Button 
                    variant="link"
                    className={`text-decoration-none ${activeTab === 'password' && 'active'} text-secondary my-tabs`}
                    onClick={() => setActiveTab('password')}
                  >
                    Change Password
                  </Button>
                  
                </div>
              </Col>
            </Row>
          </div></Col>
            <Col md={8}>
          

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
            {activeTab === 'profile' && (
                <div>
                    <Card className='p-4'>
                        <h5>
                            <strong>
                                Account Information
                            </strong>
                        </h5>
                        <Row>
                            <Col md='6'>
                            <span>Full Name</span>
                            <p>{user?.name}</p>
                            </Col>
                            <Col md='6'>
                            <span>Email Address</span>
                            <p>{user?.email}</p>
                            </Col>
                        </Row>
                    </Card>
                </div>
            )}
          {activeTab === 'history' && (
            <div>
                <Table hover responsive>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            purchaseHistory?.map(purchase=>(
                                <tr key={purchase?.id}>
                                    <td>{purchase?.product?.name}</td>
                                    <td>{purchase?.quantity}</td>
                                    <td>{moment(purchase?.date).format('MMM D, YYYY')}</td>
                                    <td>{purchase?.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
          )}
          </Col>
          </Row>
    </Container>
    </>
  );
}

export default MyAccount;