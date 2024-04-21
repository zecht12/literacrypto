import { useState } from 'react';

const Checkout = () => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubscribe = async () => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add payload data for payment transaction
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Payment Success:', data);
        setPaymentStatus('Payment Successful');
      } else {
        console.error('Failed to process payment');
        setPaymentStatus('Payment Failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus('Payment Error');
    }
  };

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={handleSubscribe}>Subscribe</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Checkout;