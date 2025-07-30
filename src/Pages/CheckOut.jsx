import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Form, Row, Col, Card, ListGroup, Button, Alert } from 'react-bootstrap';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom'; // Add this import
import { insertData } from '../../utilty/data/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {
  const { cartData, addToCart, removeToCart, isLoggedIn, clearCart } = useAuthStore(); // Add clearCart
  const navigate = useNavigate(); // Add navigate hook
  
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    discountCode: ''
  });
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const cartItems = cartData?.filter(cartItems => cartItems?.productId);

  const subtotal = cartItems.reduce((sum, item) => sum + (item?.productId?.price * item?.quantity), 0);
  const shippingCost = deliveryMethod === 'pickup' ? 0 : 100;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent form submission - payment processing is handled in PaymentForm component
  };

  const handlePaymentSuccess = async () => {

    try {
    const purchaseResponse = await insertData('/user/purchase', {
      items: cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      }))
    });
console.log(purchaseResponse)
    clearCart();
    if (!purchaseResponse.success) {
      throw new Error('Failed to record purchase');
    }

    // Clear local cart state
    
    
    setPaymentSuccess(true);
    
    // Redirect after delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  } catch (error) {
    console.error('Error recording purchase:', error);
    setPaymentError('Payment succeeded but failed to record purchase. Please contact support.');
  }
  };

  if (paymentSuccess) {
    return (
      <Container className="my-5">
        <Alert variant="success">
          <Alert.Heading>Payment Successful!</Alert.Heading>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <p>Redirecting to home page...</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Shipping Information</h1>
      
      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Delivery</h2>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    id="pickup"
                    label="Pick Up"
                    name="delivery"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                  />
                  <Form.Check
                    type="radio"
                    id="shipping"
                    label="Shipping"
                    name="delivery"
                    checked={deliveryMethod === 'shipping'}
                    onChange={() => setDeliveryMethod('shipping')}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Contact Information</h2>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter Full Name"
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email Address"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter Phone Number"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {deliveryMethod === 'shipping' && (
              <Card className="mb-4">
                <Card.Body>
                  <h2 className="h5 mb-3">Shipping Address</h2>
                  <Form.Group className="mb-3">
                    <Form.Label>Country *</Form.Label>
                    <Form.Select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose Country</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                    </Form.Select>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter City"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter State"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP Code"
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Review your cart</h2>
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <span>{item?.productId?.name}</span>
                      <span className="text-muted">{item.quantity}x</span>
                      <span>${item?.productId?.price?.toFixed(2)}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <h2 className="h5 mb-3">Discount Code</h2>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    name="discountCode"
                    value={formData.discountCode}
                    onChange={handleInputChange}
                    placeholder="Enter discount code"
                  />
                  <Button variant="outline-secondary">Apply</Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>${subtotal?.toFixed(2)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Shipping</span>
                    <span>${shippingCost?.toFixed(2)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Discount</span>
                    <span>$0.00</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total</span>
                    <span>${total?.toFixed(2)}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Elements stripe={stripePromise}>
                  <PaymentForm 
                    total={total}
                    formData={formData}
                    cartItems={cartItems}
                    deliveryMethod={deliveryMethod}
                    onError={setPaymentError} 
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
                {paymentError && <Alert variant="danger" className="mt-3">{paymentError}</Alert>}
                <p className="text-muted small mt-3">
                  Secure Checkout – SSL Encrypted<br />
                  Ensuring your financial and personal details are secure during every transaction.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

const PaymentForm = ({ total, formData, cartItems, deliveryMethod, onError, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      onError('Payment system not ready. Please try again.');
      return;
    }

    setProcessing(true);
    onError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      // Configure card element options to disable postal code requirement
      const cardOptions = {
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
        hidePostalCode: true // This disables postal code collection
      };

      // Create payment method without strict postal code validation
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement, cardOptions), // Pass the options here
        billing_details: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          // Address is optional now
          address: {
            country: formData.country || null,
            postal_code: null, // Explicitly set to null
            city: formData.city || null,
            state: formData.state || null,
            line1: null
          }
        }
      });

      if (paymentMethodError) {
        throw paymentMethodError;
      }
// console.log(total)
      // Create payment intent
      const response = await insertData('/payments/create-payment-intent', {
        amount: Math.floor(total),
        currency: 'usd',
        payment_method_id: paymentMethod.id,
        metadata: {
          delivery_method: deliveryMethod,
          items_count: cartItems.length
        }
      });
      
      if (!response || !response.clientSecret) {
        throw new Error('Invalid server response');
      }

      // Confirm payment without postal code requirement
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        response.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement, cardOptions),
            billing_details: {
              address: {
                postal_code: null // Disable postal code validation
              }
            }
          }
        }
      );

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      console.error('Payment error:', err);
      onError(err.message || 'Payment failed. Please check your card details and try again.');
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Card Information</Form.Label>
        <div style={{ 
          padding: '12px', 
          border: '1px solid #ced4da', 
          borderRadius: '0.375rem',
          backgroundColor: '#fff'
        }}>
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
              hidePostalCode: true
            }}
          />
        </div>
      </Form.Group>
      <Button 
        type="button"
        onClick={handlePayment}
        disabled={!stripe || processing}
        className="w-100 py-3"
        variant="primary"
      >
        {processing ? 'Processing...' : `Pay Now ${total?.toFixed(2)}`}
      </Button>
    </div>
  );
};

export default CheckoutPage;