import React, { useEffect } from 'react';
import './Mycourse.scss';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPlaylist } from '../../redux/actions/courseAction';
import { loadUser } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';

const Mycourse = ({ user }) => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(state => state.courses);

  const removefromplaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
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
  }, [dispatch, error, message]);

  return (
    <div
      style={{
        paddingTop: '10px',
      }}
    >
      <div className="mycourse">
        <h2
          style={{
            fontSize: '1.65rem',
            fontWeight: 'bold',
          }}
        >
          My Playlist
        </h2>
        <div className="mycourse__playlist">
          {user?.playlist.length > 0 && (
            <div className="mycourse__playlist__item">
              {user?.playlist.map(item => (
                <div
                  className="mycourse__playlist__item__card"
                  key={item.course}
                >
                  <img src={item.poster} alt="poster" />

                  <div>
                    <Link to={`/course/${item.course}`}>
                      <Button>Watch Now</Button>
                    </Link>
                    <Button
                      isLoading={loading}
                      className="delete"
                      onClick={() => removefromplaylistHandler(item.course)}
                    >
                      <MdDelete /> Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mycourse;
