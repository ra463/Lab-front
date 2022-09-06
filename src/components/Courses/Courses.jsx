import React from 'react';
import { useState, useEffect } from 'react';
import './Courses.scss';
import {
  // Button,
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import CourseCard from '../../Utils/CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToPlaylistCourses,
  getAllCourses,
} from '../../redux/actions/courseAction';
import { loadUser } from '../../redux/actions/userAction';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const { courses, error, message, loading } = useSelector(
    state => state.courses
  );

  const addtoplaylistHandler = async courseId => {
    await dispatch(addToPlaylistCourses(courseId));
    dispatch(loadUser());
  };

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, category, keyword, error, message]);

  const categories = [
    'Web Development',
    'Android Development',
    'App Development',
    'Data Science',
    'Data Structures & Algorithms',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
    'Blockchain',
    'UI/UX Design',
    'Game Development',
    'Animation',
  ];

  return (
    <div className="allcourse">
      <h2
        style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        All Courses
      </h2>

      <div className="input">
        <input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          type="text"
          placeholder="Search Courses"
        />
      </div>
      <div className="category">
        <Menu isOpen={isOpen}>
          <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Select Categories {isOpen ? <HiChevronUp /> : <HiChevronDown />}
            </span>
          </MenuButton>
          <MenuList
            overflow={'auto'}
            height={'20rem'}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            {categories.map((item, index) => (
              <MenuItem key={index} onClick={() => setCategory(item)}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <div className="course">
        {courses.length > 0 ? (
          courses.map(item => (
            <CourseCard
              key={item._id}
              id={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imgSrc={item.poster.url}
              creator={item.createdBy}
              lectureno={item.numOfVideos}
              addtoplaylist={addtoplaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <h3
            style={{
              marginTop: '2rem',
              fontSize: '2rem',
            }}
          >
            Course not available for selected category
          </h3>
        )}
      </div>
    </div>
  );
};

export default Courses;
