import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function UserDetails({ userObj }) {
  const formattedDate = new Date(userObj.createdOn).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div>
      <div className="profile-card-container">
        <Card className="profile-container">
          <img className="default-avatar" alt="default avatart" src="/user.png" width="50" />
          <h1 className="details-display-name">{userObj.firstName}</h1>
          <h4 className="details-name">{userObj.firstName} {userObj.lastName}</h4>
          <h4 className="details-email">Email: {userObj.email}</h4>
          <h6>User since {formattedDate}</h6>
          <h6>{userObj.isStaff ? 'Staff' : 'Member'}</h6>
          <h4 className="details-bio">Bio: {userObj.bio}</h4>
        </Card>
      </div>
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
