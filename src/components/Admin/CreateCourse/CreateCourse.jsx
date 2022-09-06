import React from 'react';
import '../DashBoard/Dashboard.scss';
import Sidebar from '../Sidebar';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import { Avatar, Image, Select, Button } from '@chakra-ui/react';
import { RiGridFill, RiMessengerLine } from 'react-icons/ri';
import './createCourse.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/adminAction';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [image, setImage] = useState('');
  const [imagePre, setImagePre] = useState('');

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

  const dispatch = useDispatch();

  const { message, error, loading } = useSelector(state => state.admin);

  const handleImageChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePre(reader.result);
      setImage(file);
    };
  };

  const createCourseHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);

    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearError' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <Sidebar />
        <div className="dash">
          <div className="dash-head">
            <div className="head-2">
              <p>Dashboard</p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#5d6878',
                  fontWeight: '100',
                }}
              >
                Last changed on {`${String(new Date()).split('G')[0]}`}
              </p>
            </div>
            <div className="search">
              <AiOutlineSearch />
              <input type="text" placeholder="Type here to search" />
            </div>
            <div className="search1">
              <Avatar boxSize={'8'} marginLeft={'-1'} />
              <p>
                Rachit Patel <span style={{ color: 'green' }}>(Admin)</span>
              </p>
            </div>
            <div className="svg">
              <RiGridFill />
              <RiMessengerLine />
              <BsBell />
            </div>
          </div>
          <div className="createcourse">
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              Create New Course
            </h2>
            <form onSubmit={createCourseHandler}>
              <input
                type="text"
                placeholder="Title of course"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                className="textarea"
                type="text"
                placeholder="Decription of course"
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <Select
                className="select"
                focusBorderColor="#85b8ed"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <input
                type="text"
                placeholder="Creator Name"
                required
                value={createdBy}
                onChange={e => setCreatedBy(e.target.value)}
              />

              <div
                className="imagepre"
                style={{ display: 'flex', margin: '1rem 0' }}
              >
                <input
                  required
                  style={{
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    marginTop: '0',
                  }}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              {imagePre && (
                <Image src={imagePre} boxSize="64" objectFit={'contain'} />
              )}
              <Button isLoading={loading} type="submit">
                Create Course
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
