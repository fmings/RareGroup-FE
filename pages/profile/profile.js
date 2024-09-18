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
    <div>
      {users.map((user) => (<UserCard userObj={user} />))}
    </div>
  );
}
