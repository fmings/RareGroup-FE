import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL POSTS BY LOGGED IN USER
const getAllPosts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/post/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllPosts,
  getSinglePost,

};
