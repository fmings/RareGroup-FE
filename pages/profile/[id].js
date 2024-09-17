import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '../../API/UserData';
import UserDetails from '../../components/UserDetails';

export default function ViewUser() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const viewUserDetails = () => {
    getSingleUser(id).then(setUser);
  };

  useEffect(() => {
    viewUserDetails();
  }, [id]);

  return (
    <div>
      <UserDetails userObj={user} />
    </div>
  );
}
