import React, { useState, useEffect } from 'react';
import './CourseDetail.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getCourseLectures } from '../../redux/actions/courseAction';
import { useParams, Navigate } from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';

const CourseDetail = ({ user }) => {
  const [lectureNo, setlectureNo] = useState(0);

  // const lectures = [
  //   {
  //     title: 'Introduction',
  //     description: 'Introduction to the course',
  //     _id: '1',
  //   }
  // ]

  const { lectures, loading } = useSelector(state => state.courses);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <div
      style={{
        paddingTop: '10px',
      }}
    >
      {lectures && lectures.length > 0 ? (
        <>
          <div className="course">
            <div className="course-box1">
              <video
                autoPlay
                controls
                src={lectures[lectureNo].video.url}
                controlsList="nodownload noremoteplayback"
                // disablePictureInPicture
                // disableRemotePlayback
              ></video>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                }}
              >{`#${lectureNo + 1} ${lectures[lectureNo].title}`}</h2>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                Description
              </h2>
              <p>{lectures[lectureNo].description}</p>
            </div>
            <div className="course-box2">
              <div>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  Course Overview
                </h2>
                <div className="lectureno">
                  {lectures.map((item, index) => (
                    <button
                      key={item._id}
                      onClick={() => setlectureNo(index)}
                      className={lectureNo === index ? 'active' : ''}
                    >
                      <p>
                        #{index + 1} {item.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginTop: '1rem',
                  }}
                >
                  About this course
                </h2>
                <p style={{ marginTop: '1rem' }}>
                  This course is designed to help you understand the basics of
                  web development. You will learn the basics of HTML, CSS, and
                  JavaScript. You will also learn how to build a basic web
                  application. You will learn how to use the Bootstrap
                  framework. You will learn how to use the React framework. You
                  will learn how to use the Node.js framework. You will learn
                  how to use the MongoDB database. You will learn how to use the
                  Express framework. You will learn how to use the Mongoose
                  framework. You will learn how to use the MongoDB Atlas cloud
                  database.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1
          style={{
            marginTop: '3rem',
            fontSize: '2rem',
          }}
        >
          No lectures found
        </h1>
      )}
    </div>
  );
};

export default CourseDetail;
