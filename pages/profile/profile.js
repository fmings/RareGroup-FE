import React, { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard';
import { getUsers } from '../../API/UserData';

export default function ViewProfiles() {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    getUsers().then(setUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <h1 className="header">Users</h1>
      <div className="user-container">
        {users.map((user) => (<UserCard userObj={user} />))}
      </div>
    </>
  );
}
