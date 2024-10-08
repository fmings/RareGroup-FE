/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAuthUserPosts } from '../API/PostData';
import { useAuth } from '../utils/context/authContext';
import { getUsers } from '../API/UserData';
import PostCard from '../components/ProductCard';

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

  console.warn(userPosts);

  const getAllUsersPosts = () => {
    getAuthUserPosts(userId).then((response) => {
      const sortedPosts = response.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
      setUserPosts(sortedPosts);
    });
  };

  useEffect(() => {
    findUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getAllUsersPosts();
    }
  }, [userId]);

  return (
    <div
      className="post-cards-container index"
    >
      {userPosts.map((userPost) => (<PostCard key={userPost.id} postObj={userPost} onUpdate={getAllUsersPosts} />))}
    </div>
  );
}
