import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { insertData } from '../../utilty/data/api';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY);
const CheckoutForm = ({ amount, onSuccess,userId,orderId,userName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Create payment intent on your server
      const {data: { clientSecret }} = await insertData('/api/payments/create-payment-intent', {
        amount: amount,
        currency: 'usd',
        metadata: {
          userId: userId, // Add your user ID here
          orderId: orderId // Add your order ID here
        }
      })
    //   const { data: { clientSecret } } = await axios.post('/api/payments/create-payment-intent', {
    //     amount: amount,
    //     currency: 'usd',
    //     metadata: {
    //       userId: '123', // Add your user ID here
    //       orderId: '456' // Add your order ID here
    //     }
    //   });

      // 2. Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userName, // Add customer name
          },
        }
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // 3. Payment succeeded
      if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{
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
      }} />
      
      {error && <div className="error">{error}</div>}
      
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

const StripePayment = ({ amount, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripePayment;


// import React from 'react'

// function CheckoutForm() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CheckoutForm
