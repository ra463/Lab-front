import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { BsReverseLayoutSidebarInsetReverse } from 'react-icons/bs';
import { HiMenuAlt1 } from 'react-icons/hi';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { BiRupee } from 'react-icons/bi';
import { AiOutlineBook } from 'react-icons/ai';
import { MdContacts, MdDashboard } from 'react-icons/md';
import { GiBlackBook } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/userAction';
// import { useSelector } from 'react-redux';

const AllLinks = ({ url = '/', title = 'Home' }) => (
  <Link to={url}>
    <Button>{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };

  return (
    <>
      <div className="header">
        <div className="header__logo">
          <span>Learning Lab</span>
        </div>
        <div className="header__menu">
          {isAuthenticated ? (
            <>
              <Link to="/" className="logout">
                <Button
                  onClick={logoutHandler}
                  style={{
                    backgroundColor: '#ffcc00',
                    color: 'white',
                    marginLeft: '10px',
                  }}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="login">
                <Button style={{ border: '2px solid #ffcc00' }}>Login</Button>
              </Link>
              <Link to="/register" className="register">
                <Button
                  style={{
                    backgroundColor: '#ffcc00',
                    color: 'white',
                    marginLeft: '10px',
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <ColorModeSwitcher />
          <Button style={{ marginLeft: '10px' }} onClick={onOpen}>
            <HiMenuAlt1 />
          </Button>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay backdropFilter={'blur(3px)'} />
            <DrawerContent>
              <DrawerHeader
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #77889959',
                  alignItems: 'center',
                  backgroundColor: '#ffce444a',
                }}
              >
                <BsReverseLayoutSidebarInsetReverse
                  className="header__menu__icon"
                  style={{ marginRight: '10px' }}
                />
                <span
                  style={{
                    color: 'rgb(255, 180, 0)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  Learning Lab
                </span>
              </DrawerHeader>
              <DrawerBody
                className="drawer__body"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {isAuthenticated && user.role === 'admin' && (
                  <p onClick={onClose}>
                    <MdDashboard />
                    <AllLinks url="/admin/dashboard" title="Dashboard" />
                  </p>
                )}
                <p onClick={onClose}>
                  <FiHome />
                  <AllLinks url="/" title="Home" />
                </p>
                {isAuthenticated && (
                  <p onClick={onClose}>
                    <CgProfile />
                    <AllLinks url="/myprofile" title="My Profile" />
                  </p>
                )}
                {isAuthenticated && (
                  <p onClick={onClose}>
                    <GiBlackBook />
                    <AllLinks url="/mycourse" title="My Courses" />
                  </p>
                )}
                <p onClick={onClose}>
                  <AiOutlineBook />
                  <AllLinks url="/allcourses" title="All Courses" />
                </p>
                <p onClick={onClose}>
                  <BiRupee />
                  <AllLinks url="/requestcourse" title="Request New Course" />
                </p>
                <p onClick={onClose}>
                  <MdContacts />
                  <AllLinks url="/contact" title="Contact Us" />
                </p>
                {isAuthenticated && (
                  <p onClick={onClose}>
                    <FiLogOut />
                    <Link to="/">
                      <Button onClick={logoutHandler}>Logout</Button>
                    </Link>
                  </p>
                )}
              </DrawerBody>
              {isAuthenticated ? (
                <></>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 30px',
                    marginBottom: '10px',
                  }}
                >
                  <Link onClick={onClose} to="/login">
                    <Button style={{ border: '2px solid #ffcc00' }}>
                      Login
                    </Button>
                  </Link>
                  <Link onClick={onClose} to="/register">
                    <Button
                      style={{
                        backgroundColor: '#ffcc00',
                        color: 'white',
                        marginLeft: '10px',
                        hover: { backgroundColor: 'blue' },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Header;
