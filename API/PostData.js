import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL POSTS BY LOGGED IN USER
const getAuthUserPosts = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/user/${id}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export default getAuthUserPosts;
