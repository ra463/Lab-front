import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/actions/otherAction';
import toast from 'react-hot-toast';
import { Button } from '@chakra-ui/react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const {
    error,
    message: contactMessage,
    loading,
  } = useSelector(state => state.other);

  const contactHandler = e => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (contactMessage) {
      toast.success(contactMessage);
      dispatch({type:"clearMessage"})
    }
    if (error) {
      toast.error(error);
      dispatch({type:"clearError"})
    }
  }, [dispatch,error, contactMessage]);
  return (
    <div
      className="login-div"
      style={{
        paddingTop: '3.8rem',
      }}
    >
      <div
        className="login"
        style={{
          width: '50rem',
          margin: 'auto',
        }}
      >
        <form className="loginform" onSubmit={contactHandler}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Contact Us
          </h2>
          <p className="head">Want to contact us! Please enter the details.</p>
          <p className="email">Name</p>
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <p className="email">Email</p>
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p className="email">Your Message</p>
          <textarea
            className="textarea"
            type="text"
            placeholder="Your Message"
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button isLoading={loading} type="submit">Submit</Button>
          <Link to="/requestcourse" className="signup">
            <p>
              Want to request a new course?{' '}
              <span style={{ color: '#ffcc00' }}>Click here</span>{' '}
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Contact;
