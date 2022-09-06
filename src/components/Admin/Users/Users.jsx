import React from 'react';
import '../DashBoard/Dashboard.scss';
import Sidebar from '../Sidebar';
import './Users.scss';
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
} from '@chakra-ui/react';
import { RiGridFill, RiMessengerLine } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/adminAction';
import toast from 'react-hot-toast';

const Users = () => {
  const { users, loading, message, error } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  const updateRole = async userId => {
    await dispatch(updateUserRole(userId));
    dispatch(getAllUsers());
  };

  const deleteUserHandler = async userId => {
    await dispatch(deleteUser(userId));
    dispatch(getAllUsers());
  };
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
              All Users
            </h2>

            <div className="table">
              <TableContainer w={['100vw', 'full']} color={'black'}>
                <Table>
                  <TableCaption style={{ fontWeight: 'bold' }}>
                    All user in the database
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      <Th>Subscription</Th>
                      <Th isNumeric>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users &&
                      users.map(item => (
                        <Row
                          updateRole={updateRole}
                          deleteUserHandler={deleteUserHandler}
                          loading={loading}
                          key={item._id}
                          item={item}
                        />
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

function Row({ item, updateRole, deleteUserHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active' ? (
          <p style={{ color: 'green', fontWeight: 'bold' }}>Active</p>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>Not Active</p>
        )}
      </Td>
      <Td isNumeric>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            isLoading={loading}
            onClick={() => updateRole(item._id)}
            variant={'outline'}
          >
            <GrEdit style={{ marginRight: '5px' }} />
            Edit Role
          </Button>
          <Button
            isLoading={loading}
            onClick={() => deleteUserHandler(item._id)}
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
