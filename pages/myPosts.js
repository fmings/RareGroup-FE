import React, { useEffect, useState } from 'react';
import getAuthUserPosts from '../API/PostData';
import { useAuth } from '../utils/context/authContext';
import getUsers from '../API/UserData';

export default function ViewMyPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const { user } = useAuth();

  const findUserId = () => {
    getUsers().then((users) => {
      const foundUser = users.find((u) => u.uid === user.uid);
      if (foundUser) {
        setUserId(foundUser.id);
      } else {
        console.warn('user not found');
      }
    });
  };

  const getAllUsersPosts = () => {
    getAuthUserPosts(userId).then((response) => {
      setUserPosts(response.posts);
    });
  };

  useEffect(() => {
    console.warn('userid', userId);
    console.warn('useruid', user.uid);
    findUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getAllUsersPosts();
    }
  }, [userId]);

  // NEED TO PLUG IN POST CARD COMPONENT ONCE RECEIVED FROM FJM
  return (
    <div
      className="d-flex flex-wrap"
    >
      {console.warn('userPosts', userPosts)}
      {userPosts.map((userPost) => (userPost.title))}
    </div>
  );
}
