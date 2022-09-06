import React, { useState } from 'react';
import '../DashBoard/Dashboard.scss';
import Sidebar from '../Sidebar';
import '../Users/Users.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import { GrEdit } from 'react-icons/gr';
import {
  Avatar,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { RiGridFill, RiMessengerLine } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import AdminLecture from '../../../Utils/AdminLecture';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/courseAction';
import {
  addlecture,
  deleteCourse,
  deletelecture,
} from '../../../redux/actions/adminAction';
import toast from 'react-hot-toast';

const Courses = () => {
  const { courses, lectures } = useSelector(state => state.courses);
  const { message, error, loading } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const viewLecturePopUp = (userId, title) => {
    dispatch(getCourseLectures(userId));
    onOpen();
    setCourseId(userId);
    setCourseTitle(title);
  };

  const deleteLecture = async (courseId, lectureId) => {
    await dispatch(deletelecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(addlecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  };

  const deleteCourseHandler = async userId => {
    await dispatch(deleteCourse(userId));
    dispatch(getAllCourses());
  };

  useEffect(() => {
    dispatch(getAllCourses());

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
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

          <div className="users">
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              All Courses
            </h2>

            <div className="table">
              <TableContainer w={['100vw', 'full']} color={'black'}>
                <Table>
                  <TableCaption style={{ fontWeight: 'bold' }}>
                    All avaliable courses in the database
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Poster</Th>
                      <Th>Title</Th>
                      <Th>Category</Th>
                      <Th>Creator</Th>
                      <Th isNumeric>Views</Th>
                      <Th isNumeric>Lectures</Th>
                      <Th isNumeric>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {courses.map(item => (
                      <Row
                        viewLecturePopUp={viewLecturePopUp}
                        deleteCourseHandler={deleteCourseHandler}
                        key={item._id}
                        item={item}
                        loading={loading}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              <AdminLecture
                isOpen={isOpen}
                onClose={onClose}
                id={courseId}
                courseTitle={courseTitle}
                deleteLecture={deleteLecture}
                addLectureHandler={addLectureHandler}
                lectures={lectures}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

function Row({ item, viewLecturePopUp, deleteCourseHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} alt={item.title} />
      </Td>
      <Td>{item.title}</Td>
      <Td>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td>{item.views}</Td>
      <Td>{item.numOfVideos}</Td>
      <Td isNumeric>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => viewLecturePopUp(item._id, item.title)}
            variant={'outline'}
          >
            <GrEdit style={{ marginRight: '5px' }} />
            Add Lecture
          </Button>
          <Button
            onClick={() => deleteCourseHandler(item._id)}
            isLoading={loading}
            style={{
              marginLeft: '1rem',
              background: '#ff000029',
              color: 'red',
            }}
          >
            <MdDelete />
          </Button>
        </div>
      </Td>
    </Tr>
  );
}
