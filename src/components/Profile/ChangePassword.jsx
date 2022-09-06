import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword } from '../../redux/actions/profileAction';
import toast from 'react-hot-toast';
import { Button } from '@chakra-ui/react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector(state => state.updateProfile);

  const changePasswordHandler = async e => {
    e.preventDefault();

    await dispatch(changePassword(oldPassword, newPassword));
    navigate('/myprofile');
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
        <form className="loginform" onSubmit={changePasswordHandler}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Change Password
          </h2>
          <p
            style={{
              marginTop: '0rem',
            }}
            className="head"
          >
            Please enter the given details.
          </p>
          <p className="email">Old Password</p>
          <input
            type="password"
            placeholder="Enter Your Old Password"
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
          <p className="email">New Password</p>
          <input
            type="password"
            placeholder="Enter New Password"
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <Button
            isLoading={loading}
            style={{
              marginTop: '1rem',
            }}
            type="submit"
          >
            Submit
          </Button>
          <Link to="/myprofile" className="signup">
            <p>
              Go back to profile{' '}
              <span style={{ color: '#ffcc00' }}>Click here</span>{' '}
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
