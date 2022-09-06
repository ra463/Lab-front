import React from 'react';
import './Payment.scss';
import paymentimage1 from '../../assets/images/payment1.jpg';
import { BsCheckCircle } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get('reference');
  return (
    <div className="payment">
      <div className="payment1">
        <div className="image">
          <img src={paymentimage1} alt="Payment Success" />
        </div>
        <div className="text-success">
          <BsCheckCircle style={{ color: 'green' }} />
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'green',
            }}
          >
            Your Payment is Successful
          </h2>
          <p>
            Thank you for your payment. Now you have access to the premium
            content.
          </p>
          <p className="goback">
            Go back to{' '}
            <a
              href="/"
              style={{
                color: '#ffcc00',
              }}
            >
              Home
            </a>
          </p>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              padding: '0.3rem 1rem',
              border: '1px solid grey',
              borderRadius: '10px',
            }}
          >
            ReferenceId: {reference}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
