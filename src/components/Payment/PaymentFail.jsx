import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const PaymentFail = () => {
  return (
    <div className="payment">
      <div className="payment1">
        <div className="image">
          <img
            src="https://img.freepik.com/premium-vector/payment-error-info-message-smartphone-customer-cross-marks-failure-vector-illustration_106788-3023.jpg?w=900"
            alt="Payment Fail"
          />
        </div>
        <div className="text-success">
          <FiAlertTriangle style={{ color: 'red' }} />
          <h2
            style={{
              color: 'red',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            Your Payment is Failed
          </h2>
          <p>Payment failed due to some unexpected error. Please try again.</p>
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
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
