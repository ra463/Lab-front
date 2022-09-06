import React from 'react';
import './Sidebar.scss';
import { BiHomeCircle } from 'react-icons/bi';
import { BsBookmarks } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiUsers } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="side-head">
        <img
          src="https://codervent.com/skodash-angular/demo/collapsed-menu/ltr/assets/images/logo-icon.png"
          alt="logo"
        />
        <h2>LabDash</h2>
      </div>
      <div className="links">
        <Link to="/admin/dashboard">
          <Button
            className={location.pathname === '/admin/dashboard' ? 'active' : ''}
          >
            <BiHomeCircle /> Dashboard
          </Button>
        </Link>
        <Link to="/admin/createcourses">
          <Button
            className={
              location.pathname === '/admin/createcourses' ? 'active' : ''
            }
          >
            <IoIosAddCircleOutline /> Create Courses
          </Button>
        </Link>
        <Link to="/admin/courses">
          <Button
            className={location.pathname === '/admin/courses' ? 'active' : ''}
          >
            <BsBookmarks /> Courses
          </Button>
        </Link>
        <Link to="/admin/users">
          <Button
            className={location.pathname === '/admin/users' ? 'active' : ''}
          >
            <FiUsers /> Users
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
