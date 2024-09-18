import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL TAGS
const getTags = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addTagToPost = (postId, tagIds) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/post/${postId}/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tagIds), // Send the tag IDs as a JSON array
  })
    .then((response) => {
      if (response.ok) {
      // Assuming the response contains a list of added tags
        response.json().then((addedTags) => {
          resolve(addedTags);
        }).catch(reject);
      } else {
        reject(new Error(`Failed to add tags: ${response.statusText}`));
      }
    })
    .catch(reject);
});

export { getTags, addTagToPost };
