import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL USERS
const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// GET SINGLE USER BY ID
const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export { getUsers, getSingleUser };
