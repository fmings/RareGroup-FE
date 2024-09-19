/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function UserCard({ userObj }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${userObj.id}`);
  };

  return (
    <div>
      <Card style={{ width: '18rem' }} onClick={handleClick} className="user-card">
        <img className="user-card-avatar" alt="default avatart" src="/user.png" width="50" />
        <h1>{userObj.firstName} {userObj.lastName}</h1>
      </Card>
    </div>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
