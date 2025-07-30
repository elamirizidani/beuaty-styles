
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Form, Row, Col, Card, ListGroup, Button, Alert } from 'react-bootstrap';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
// const stripePromise = loadStripe('your_stripe_publishable_key');

const CheckoutPage = () => {
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

  const cartItems = [
    { name: 'Revitalizing Gel', quantity: 1, price: 55000 },
    { name: 'Revitalizing Gel', quantity: 1, price: 55000 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shippingCost = deliveryMethod === 'pickup' ? 0 : 55000;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Payment processing would go here
  };

  if (paymentSuccess) {
    return (
      <Container className="my-5">
        <Alert variant="success">
          <Alert.Heading>Payment Successful!</Alert.Heading>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Shipping Information</h1>
      
      <Form onSubmit={handleSubmit}>
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
                  <span>{item.name}</span>
                  <span className="text-muted">{item.quantity}x</span>
                  <span>£{(item.price / 100).toFixed(2)}</span>
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
                <span>£{(subtotal / 100).toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>£{(shippingCost / 100).toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between">
                <span>Discount</span>
                <span>£0.00</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>£{(total / 100).toFixed(2)}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <Elements stripe={stripePromise}>
              <PaymentForm 
                total={total} 
                onError={setPaymentError} 
                onSuccess={setPaymentSuccess} 
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

const PaymentForm = ({ total, onError, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    onError(null);

    try {
      // In a real app, you would call your backend to create a payment intent
      // const { clientSecret } = await createPaymentIntent(total);
      // const { error } = await stripe.confirmCardPayment(clientSecret, {...});
      
      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess(true);
    } catch (err) {
      onError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Form onSubmit={handlePayment}>
      <Form.Group className="mb-3">
        <CardElement 
          options={{
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
          }}
        />
      </Form.Group>
      <Button 
        type="submit" 
        disabled={!stripe || processing}
        className="w-100 py-3"
      >
        {processing ? 'Processing...' : `Pay Now £${(total / 100).toFixed(2)}`}
      </Button>
    </Form>
  );
};

export default CheckoutPage;
