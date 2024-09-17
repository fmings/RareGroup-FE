import React from 'react';
import PropTypes from 'prop-types';

export default function UserDetails({ userObj }) {
  return (
    <div>
      <img className="default-avatar" alt="default avatart" src="/user.png" width="50" />
      <h1>{userObj.firstName} {userObj.lastName}</h1>
      <h3>Display Name: {userObj.firstName}</h3>
      <h4>Email: {userObj.email}</h4>
      <h6>User since {userObj.createdOn}</h6>
      <h6>{userObj.isStaff ? 'Staff' : 'Member'}</h6>
      <h4>Bio: {userObj.bio}</h4>
    </div>
  );
}

UserDetails.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    createdOn: PropTypes.instanceOf(Date),
    isStaff: PropTypes.bool,
    bio: PropTypes.string,
  }).isRequired,
};
