import React from 'react';
import './Dashboard.scss';
import Sidebar from '../Sidebar';
import { AiOutlineSearch } from 'react-icons/ai';
import { Avatar, Progress } from '@chakra-ui/react';
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiGridFill,
  RiMessengerLine,
} from 'react-icons/ri';
import { MdSubscriptions } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { BsBell, BsViewStacked } from 'react-icons/bs';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAdminInfo } from '../../../redux/actions/adminAction';
import Loader from '../../Layout/Loader/Loader';

const Dashboard = () => {
  const Databox = ({ title, qty, qtypercent, profit, svg }) => (
    <div className="data-box">
      <div>
        <p style={{ color: '#6c757d' }}>{title}</p>
        <p style={{ fontWeight: 'bold', fontSize: '1.7rem', color: '#343a40' }}>
          {qty}
        </p>
        <div>
          {profit ? (
            <>
              <RiArrowUpLine color="#12bf24" />
              <p style={{ color: '#12bf24' }}>
                {`${qtypercent}%`} from last month
              </p>
            </>
          ) : (
            <>
              <RiArrowDownLine color="red" />
              <p style={{ color: 'red' }}>{`${qtypercent}%`} from last month</p>
            </>
          )}
        </div>
      </div>
      {svg}
    </div>
  );

  const Bar = ({ title, value, profit }) => (
    <div className="bar">
      <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>{title}</p>
      <div>
        <p style={{ marginRight: '5px', color: 'black' }}>
          {profit ? '0%' : `-${value}%`}
        </p>
        <Progress w="full" value={profit ? value : 0} colorScheme="green" />
        <p style={{ marginLeft: '5px', color: 'black' }}>{`${
          value > 100 ? value : 100
        }%`}</p>
      </div>
    </div>
  );

  const {
    loading,
    stats,
    numOfuser,
    numOfSubscription,
    numOfViews,
    subscriptionPercentage,
    userPercentage,
    viewsPercentage,
    userProfit,
    viewsProfit,
    subscriptionProfit,
  } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminInfo());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <Sidebar />
        {loading || !stats ? (
          <Loader />
        ) : (
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
                  Last changed on{' '}
                  {`${String(new Date(stats[11].createdAt)).split('G')[0]}`}
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
            <div className="dash-body">
              <Databox
                title="Total Views"
                qty={numOfViews}
                qtypercent={viewsPercentage}
                profit={viewsProfit}
                svg={<BsViewStacked className="svg" />}
              />
              <Databox
                title="Total Students"
                qty={numOfuser}
                qtypercent={userPercentage}
                profit={userProfit}
                svg={<HiOutlineUsers className="svg" />}
              />
              <Databox
                title="Total Subscription"
                qty={numOfSubscription}
                qtypercent={subscriptionPercentage}
                profit={subscriptionProfit}
                svg={<MdSubscriptions className="svg" />}
              />
            </div>
            <div className="graph-head">
              <div>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  Views Graph
                </p>
                <LineChart views={stats.map(item => item.views)} />
              </div>
            </div>
            <div className="views-graph">
              <div className="progress-bar">
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  Progress Bar
                </p>
                <Bar
                  profit={viewsProfit}
                  title="Views"
                  value={viewsPercentage}
                />
                <Bar profit={userProfit} title="Users" value={userPercentage} />
                <Bar
                  profit={subscriptionProfit}
                  title="Subscription"
                  value={subscriptionPercentage}
                />
              </div>

              <div className="next-graph">
                <div>
                  <p
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Users
                  </p>
                  <DoughnutChart
                    users={[numOfSubscription, numOfuser - numOfSubscription]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
