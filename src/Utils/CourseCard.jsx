import { Button, Text } from '@chakra-ui/react';
import './CourseCard.scss';
import React from 'react';
import { BsCollectionPlay, BsEye } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CourseCard = ({
  views,
  title,
  imgSrc,
  id,
  addtoplaylist,
  creator,
  description,
  lectureno,
  loading,
}) => {
  return (
    <div className="coursecard">
      <img src={imgSrc} alt="img" />
      <div>
        <div className="coursecard__title">
          <p>{title}</p>
          <Link to={`/course/${id}`}>
            <button>Watch Now</button>
          </Link>
        </div>
        <Text noOfLines={2}>{description}</Text>
        <p>
          Creator:{' '}
          <span
            style={{
              color: 'lightslategray',
            }}
          >
            {creator}
          </span>
        </p>
        <div className="coursecard-footer">
          <p>
            <BsCollectionPlay />
            {lectureno}
          </p>
          <p>
            <BsEye />
            {views}
          </p>
          <Button
            isLoading={loading}
            borderRadius={'50px'}
            padding={'1'}
            onClick={() => addtoplaylist(id)}
          >
            <AiOutlineShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
