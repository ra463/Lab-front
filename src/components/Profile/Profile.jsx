import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.scss';
import { FcKey } from 'react-icons/fc';
import { CgProfile } from 'react-icons/cg';
import {
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../redux/actions/profileAction';
import { cancelSubscription, loadUser } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';

const Profile = ({ user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: subIsOpen,
    onClose: subOnClose,
    onOpen: subOnOpen,
  } = useDisclosure();

  const { message, error } = useSelector(state => state.updateProfile);
  const { error: cancelError, message: cancelMessage } = useSelector(
    state => state.subscribe
  );

  const dispatch = useDispatch();

  const imageSubmitHandler = async (e, avatar) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('file', avatar);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = async e => {
    e.preventDefault();
    await dispatch(cancelSubscription());
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (cancelError) {
      toast.error(cancelError);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (cancelMessage) {
      toast.success(cancelMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, message, error, cancelError, cancelMessage]);

  return (
    <div
      style={{
        paddingTop: '10px',
      }}
    >
      <div className="profile">
        <div className="profile-box1">
          <div className="header__logo">
            <span>Learning Lab</span>
          </div>
          <div className="profile-box1__menu">
            <Link to="/updatepassword">
              <FcKey /> Update Password
            </Link>
            <Link to="/updateprofile">
              <CgProfile /> Update Profile
            </Link>
          </div>
        </div>
        <div className="profile-box2">
          <div className="heading">
            <h2
              style={{
                fontSize: '1.65rem',
                fontWeight: 'bold',
              }}
            >
              My Profile Dashboard
            </h2>
            <p className="head">Welcome to your profile dashboard</p>
          </div>
          <div className="profile-box2__content">
            <div className="profile-box2__content__1">
              <div className="avatar">
                <Avatar boxSize={'48'} src={user.avatar.url} />
                <button onClick={onOpen}>Change Photo</button>
              </div>

              <div className="details">
                <span>
                  Name:<p> {user.name}</p>
                </span>
                <span>
                  Email: <p>{user.email}</p>
                </span>
              </div>
            </div>
            <div className="profile-box2__content__2">
              <h4>More Details</h4>
              <div className="moredetails">
                <span>
                  Created At: <p>{user.createdAt.split('T')[0]}</p>
                </span>
                {user.role !== 'admin' && (
                  <span>
                    Subscription:{' '}
                    <p style={{ color: 'green' }}>
                      {user.subscription &&
                      user.subscription.status === 'active' ? (
                        'Active'
                      ) : (
                        <p style={{ color: 'red', marginLeft: '0' }}>
                          Inactive
                        </p>
                      )}
                    </p>
                  </span>
                )}
              </div>
              {user.role !== 'admin' && (
                <div className="subscription">
                  <div className="subs">
                    {user.subscription &&
                    user.subscription.status === 'active' ? (
                      <>
                        <h4 className="sub">Not satisfied by our Services</h4>
                        <p style={{ marginLeft: '1rem' }}>
                          Cancel your subscription any time.
                        </p>
                      </>
                    ) : (
                      <>
                        <h4 className="sub">Want to buy our Services</h4>
                        <p style={{ marginLeft: '1rem' }}>
                          Get unlimited access to our premium content.
                        </p>
                      </>
                    )}

                    <span style={{ marginLeft: '1rem' }}>
                      Your Subscription is currently{' '}
                      <span
                        style={{
                          color: 'green',
                          marginLeft: '0',
                          fontWeight: 'bold',
                        }}
                      >
                        {user.subscription &&
                        user.subscription.status === 'active' ? (
                          'Active'
                        ) : (
                          <span style={{ color: 'red', marginLeft: '0' }}>
                            Inactive
                          </span>
                        )}
                      </span>
                      .
                    </span>
                    <span style={{ marginLeft: '1rem' }}>
                      {user.subscription &&
                      user.subscription.status === 'active' ? (
                        <Button onClick={subOnOpen}>Cancel Subscription</Button>
                      ) : (
                        <Link to="/subscribe">
                          <Button background={'yellow.400'} color={'white'}>
                            Subscribe
                          </Button>
                        </Link>
                      )}
                    </span>
                  </div>
                  <div className="img">
                    {user.subscription &&
                    user.subscription.status === 'active' ? (
                      <img
                        src="https://img.freepik.com/free-vector/cancel-concept-illustration_114360-4239.jpg?w=740&t=st=1661359248~exp=1661359848~hmac=4040f45bfab02d3f0d0816c2abce21f832e4a0e2f6daf218702b9522490b5859"
                        alt="cancel"
                      />
                    ) : (
                      <img
                        src="https://img.freepik.com/free-vector/subscriber-concept-illustration_114360-7323.jpg?w=740&t=st=1661359916~exp=1661360516~hmac=6df520ab2ddc1571809c0a99e346bdb9287f2f7b2d2e6912a2c34bb772fd21cb"
                        alt="subscribe"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChangeAvatar
        imageSubmitHandler={imageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SubscriptionCancel
        cancelSubscriptionHandler={cancelSubscriptionHandler}
        isOpen={subIsOpen}
        onClose={subOnClose}
      />
    </div>
  );
};

export default Profile;

function ChangeAvatar({ isOpen, onClose, imageSubmitHandler }) {
  const [avatar, setAvatar] = useState('');
  const [avatarPrev, setAvatarPrev] = useState('');
  const { loading } = useSelector(state => state.updateProfile);

  const handleImageChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatarPrev(reader.result);
      setAvatar(file);
    };
  };

  const onImageCloseHandler = () => {
    onClose();
    setAvatar('');
    setAvatarPrev('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onImageCloseHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="changeavatar">
            <form onSubmit={e => imageSubmitHandler(e, avatar)}>
              {avatarPrev && <Avatar src={avatarPrev} boxSize={'48'} />}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button isLoading={loading} type="submit">
                Change
              </Button>
            </form>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onImageCloseHandler}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function SubscriptionCancel({ isOpen, onClose, cancelSubscriptionHandler }) {
  const { loading } = useSelector(state => state.subscribe);

  const onSubscriptionCloseHandler = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onSubscriptionCloseHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Warning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="changeavatar">
            <p style={{marginBottom:"1rem"}}>Are you sure that you want to cancel your subscription.</p>
            <Button
              isLoading={loading}
              onClick={cancelSubscriptionHandler}
              type="submit"
            >
              Cancel Subscription
            </Button>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onSubscriptionCloseHandler}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
