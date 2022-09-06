import React from 'react';
import './Home.scss';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/school.webp';
import learn from '../../assets/images/learn.jpg';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiBookBookmark } from 'react-icons/bi';
import { FaGgCircle } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import elearn from '../../assets/video/e-learn.mp4';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.courses);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [error, dispatch]);

  return (
    <section className="home">
      <div className="container">
        <div className="container-1">
          <img src={img} alt="img" />
          <div className="snipit">
            <BsFillPersonFill />
            <p>Total Students</p>
            <h2>15K</h2>
          </div>
          <div className="snipit-2">
            <BiBookBookmark />
            <ul>
              <li>Largest collection of every courses</li>
              <li>Learn from experts</li>
              <li>Experts Instructor</li>
            </ul>
          </div>
          <div className="intro">
            <h2>Move beyond the limitations of e-learning.</h2>
            <p>Anytime, anywhere to do discover yourself.</p>
            <Link to="/allcourses">
              <Button marginTop={'6'} size={'lg'} colorScheme="blue">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
        <div className="container-2">
          <div>
            <FaGgCircle /> <p>Online Tutoring</p>
          </div>
          <div>
            <FiClock />
            <p>Lifetime Access</p>
          </div>
          <div>
            <BsFillPersonFill />
            <p>Active Learning</p>
          </div>
          <div>
            <BiBookBookmark />
            <p>10K Courses</p>
          </div>
        </div>
        <div className="container-3">
          <div className="know-1">
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
              }}
            >
              Learn About Us
            </h2>
            <p>
              We are a team of passionate learners who love to share knowledge.
              As you know that knowledge is power. We are here to help you
              discover and share knowledge. Our content will help you to learn
              and discover yourself at your every step .
            </p>

            <ul>
              <li>Our content is very cheap to buy.</li>
              <li>It's safe to buy our content.</li>
              <li>We are always ready to help you.</li>
              <li>The course we provide are of top quality.</li>
            </ul>
          </div>
          <div className="know-2">
            <img alt="img" src={learn} />
          </div>
        </div>
        <div className="container-4">
          <video
            autoPlay
            controls
            src={elearn}
            // controlsList="nodownload nofullscreen noremoteplayback"
            // disablePictureInPicture
            // disableRemotePlayback
          ></video>
        </div>
      </div>
    </section>
  );
};

export default Home;
