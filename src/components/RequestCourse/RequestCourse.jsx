import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestCourse } from '../../redux/actions/otherAction';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@chakra-ui/react';

const RequestCourse = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');

  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(state => state.other);

  const courseRequestHandler = e => {
    e.preventDefault();
    dispatch(requestCourse(name, email, course));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [error, message, dispatch]);

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
        <form className="loginform" onSubmit={courseRequestHandler}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Request New Course
          </h2>
          <p className="head">
            Not able to find your desired course! Request your Course
          </p>
          <p className="email">Email</p>
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
          <p className="email">Course Explanation</p>
          <textarea
            className="textarea"
            type="text"
            placeholder="Explain your course..."
            required
            value={course}
            onChange={e => setCourse(e.target.value)}
          />
          <Button isLoading={loading} type="submit">
            Submit
          </Button>
          <Link to="/allcourses" className="signup">
            <p>
              See available courses{' '}
              <span style={{ color: '#ffcc00' }}>Click here</span>{' '}
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RequestCourse;
