import { Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profileAction';
import toast from 'react-hot-toast';
import { loadUser } from '../../redux/actions/userAction';

const EditProfile = ({ user }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const { loading, message, error } = useSelector(state => state.updateProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeProfileHandler = async e => {
    e.preventDefault();

    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
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
        <form className="loginform" onSubmit={changeProfileHandler}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Edit Profile
          </h2>
          <p
            style={{
              marginTop: '0rem',
            }}
            className="head"
          >
            Please enter the given details.
          </p>
          <p className="email">Name</p>
          <input
            type="text"
            placeholder={user.name}
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <p className="email">Email</p>
          <input
            type="email"
            placeholder={user.email}
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
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

export default EditProfile;
