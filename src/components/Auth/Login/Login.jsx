import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../../redux/actions/userAction';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const loginHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-div">
      <div className="login">
        <form className="loginform" onSubmit={loginHandler}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Learning Lab Login
          </h2>
          <p className="head">Welcome Back! Please enter your details.</p>
          <p className="email">Email</p>
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p className="email">Password</p>
          <input
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Link to="/forgotpassword" className="password">
            <p>Forgot Your Password?</p>
          </Link>
          <button type="submit">Sign In</button>
          <Link to="/register" className="signup">
            <p>
              Don't have an account?{' '}
              <span style={{ color: '#ffcc00' }}>Sign Up</span>{' '}
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

export default Login;
