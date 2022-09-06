import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../redux/actions/profileAction';
import toast from 'react-hot-toast';
import { Button } from '@chakra-ui/react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const params = useParams();

  const { loading, message, error } = useSelector(state => state.updateProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetPasswordHandler = async e => {
    e.preventDefault();
    await dispatch(resetPassword(params.token, password));
    navigate('/login');
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
        <form className="loginform" onSubmit={resetPasswordHandler}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Reset Password
          </h2>
          <p className="head">Reset Your Password</p>
          <p className="email">Password</p>
          <input
            type="password"
            placeholder="Enter Your New Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Link to="/login" className="password">
            <p>Go Back To Login</p>
          </Link>

          <Button isLoading={loading} type="submit">
            Reset Password
          </Button>
          <Link to="/forgotpassword" className="signup">
            <p>
              Send Another Email{' '}
              <span style={{ color: '#ffcc00' }}>Reset Link</span>{' '}
            </p>
          </Link>
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

export default ResetPassword;
