import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/actions/userAction';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPrev, setAvatarPrev] = useState('');

  const dispatch = useDispatch();

  const handleImageChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatarPrev(reader.result);
      setAvatar(file);
    };
  };

  const registerHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', avatar);

    dispatch(register(myForm));
  };

  return (
    <div
      className="login-div"
      style={{
        paddingTop: '3.8rem',
      }}
    >
      <div className="login">
        <form className="loginform" onSubmit={registerHandler}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            Register User
          </h2>
          <p className="head">Please enter your details.</p>

          <p className="email">Name</p>
          <input
            style={{ padding: '0.5rem' }}
            type="text"
            placeholder="Enter Your Name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <p className="email">Email</p>
          <input
            style={{ padding: '0.5rem' }}
            type="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <p className="email">Password</p>
          <input
            style={{ padding: '0.5rem' }}
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div style={{ display: 'flex', margin: '1rem 0' }}>
            <Avatar src={avatarPrev} alt="User" size={'md'} />
            <input
              required
              style={{
                marginLeft: '7px',
                width: '100%',
                height: '3rem',
                padding: '0.5rem',
              }}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Register</button>

          <Link to="/login" className="signup">
            <p>
              Already have an account?{' '}
              <span style={{ color: '#ffcc00' }}>Sign In</span>{' '}
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

export default Register;
