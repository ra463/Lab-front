import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Button,
  Text,
} from '@chakra-ui/react';
import './AdminLecture.scss';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';

const AdminLecture = ({
  isOpen,
  onClose,
  id,
  deleteLecture,
  courseTitle,
  addLectureHandler,
  lectures = [],
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const handleVideoChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton onClick={onClose} />

        <ModalBody px={['4', '16']} py={['8', '8']}>
          <div className="grid">
            <div className="lecture">
              <div className="lecturebox">
                <h2
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    color: 'black',
                  }}
                >
                  {courseTitle}
                </h2>
                <h2 style={{ fontSize: '0.8rem', color: 'slategray' }}>
                  {`#${id}`}
                </h2>
              </div>
              <h2
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.3rem',
                  color: 'black',
                }}
              >
                Lectures
              </h2>
              <div className="card">
                {lectures && lectures.length > 0 ? (
                  lectures.map((item, index) => (
                    <VideoCard
                      key={item._id}
                      title={item.title}
                      description={item.description}
                      num={index + 1}
                      lectureId={item._id}
                      courseId={id}
                      deleteLecture={deleteLecture}
                      loading={loading}
                    />
                  ))
                ) : (
                  <h2
                    style={{
                      textAlign: 'center',
                      marginTop: '3rem',
                      fontSize: '1.5rem',
                    }}
                  >
                    No Lectures Found
                  </h2>
                )}
              </div>
            </div>
            <div className="addLecture">
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <h2 style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                  Add Another Lecture
                </h2>
                <input
                  type="text"
                  placeholder="Title of Lecture"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <textarea
                  className="textarea"
                  type="text"
                  placeholder="Decription of Lecture"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <input
                  required
                  style={{
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    marginTop: '0',
                  }}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                />

                {videoPrev && (
                  <video
                    controlsList="nodownload"
                    controls
                    src={videoPrev}
                  ></video>
                )}

                <Button isLoading={loading} type="submit">
                  Upload Lecture
                </Button>
              </form>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="red" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdminLecture;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteLecture,
  loading,
}) {
  return (
    <div className="lecture-card">
      <div className="videocard">
        <h2 style={{ fontWeight: 'bold' }}>{`#${num} ${title}`}</h2>
        <Text noOfLines={2}>{description}</Text>
      </div>
      <div className="button">
        <Button
          isLoading={loading}
          onClick={() => deleteLecture(courseId, lectureId)}
          style={{
            background: '#ff000029',
            color: 'red',
          }}
        >
          <MdDelete />
        </Button>
      </div>
    </div>
  );
}
