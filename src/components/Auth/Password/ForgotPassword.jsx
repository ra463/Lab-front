import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../redux/actions/profileAction';
import toast from 'react-hot-toast';
import { Button } from '@chakra-ui/react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const { loading, message, error } = useSelector(state => state.updateProfile);
  const dispatch = useDispatch();

  const forgotPasswordHandler = e => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, message, error]);

  return (
    <div className="login-div">
      <div className="login">
        <form className="loginform" onSubmit={forgotPasswordHandler}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Forgot Password
          </h2>
          <p className="head">Please enter your details.</p>
          <p className="email">Email</p>
          <input
            type="email"
            placeholder="abc@gmail.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Button
            isLoading={loading}
            type="submit"
            style={{ marginTop: '1rem' }}
          >
            Send Email
          </Button>
        </form>
      </div>
      <div className="background">
        <div>
          <img src="/login.png" alt="login" />
          <img src="/auth.png" alt="auth" />
        </div>
        <div>
          <p className="head-1">Welcome to Instagram</p>
          <p className="head-2">Sign in to explore the world!</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
