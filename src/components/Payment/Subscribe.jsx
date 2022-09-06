import React from 'react';
import { Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buySubscription } from '../../redux/actions/userAction';
import axios from 'axios';
import { server } from '../../redux/store';
import toast from 'react-hot-toast';
import logo from '../../assets/images/payment2.jpg';

const Subscribe = ({ user }) => {
  const [key, setKey] = useState('');
  const dispatch = useDispatch();

  const { subscriptionId, error, loading } = useSelector(
    state => state.subscribe
  );

  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);

    setKey(data.key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'Learning Lab',
          description:
            'Join Our Membership and get access to the all the premium content.',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Rachit Patel From Jabalpur',
          },
          theme: {
            color: '#0B88FF',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };

      openPopUp();
    }
  }, [dispatch, error, user.name, user.email, key, subscriptionId]);

  return (
    <div className="payment">
      <div className="payment1">
        <div className="image">
          <img
            src="https://img.freepik.com/free-vector/mobile-app-concept_52683-5206.jpg?w=900&t=st=1661443413~exp=1661444013~hmac=d97bcf0b9bb540a57514d3800ca1cd29cd7ca110c93b1a8670ee87c10075b77d"
            alt="Join Membership"
          />
        </div>
        <div className="text-success">
          <p>
            Join Our Membership and get access to the all the premium content.
          </p>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'green',
            }}
          >
            For Rupee 299 Only
          </h2>
          <Button isLoading={loading} onClick={subscribeHandler}>
            Join Now
          </Button>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'lightslategray',
            }}
          >
            Get 100% Refund at cancellation. T&C* apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
