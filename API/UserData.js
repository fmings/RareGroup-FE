import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL POSTS BY LOGGED IN USER
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

export default getUsers;
