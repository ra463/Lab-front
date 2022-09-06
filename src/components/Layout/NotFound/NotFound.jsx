import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="payment">
      <div className="payment1">
        <div className="image">
          <img
            src="https://img.freepik.com/free-vector/404-error-with-people-holding-numbers-concept-illustration_114360-7923.jpg?w=900&t=st=1661277954~exp=1661278554~hmac=9c313182d881e9c7d16e15ab965ded5f815200e08fd34841501386b60e6743ee"
            alt="Not Found"
          />
        </div>
        <div className="text-success">
          <FiAlertCircle style={{color:"cadetblue"}} />
          <h2
            style={{
              color:"cadetblue",
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            Opps! Page Not Found
          </h2>
          <p>Sorry the page you're looking for dosen't exist. </p>
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

export default NotFound;
