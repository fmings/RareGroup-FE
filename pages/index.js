import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../API/PostData';
import PostCard from '../components/ProductCard';

function Home() {
  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts(setPosts);
  }, []);

  return (
    <>
      <div>
        {posts.map((p) => (
          <PostCard className="posts" key={p.id} postObj={p} onUpdate={getAllThePosts} />
        ))}
      </div>
    </>
  );
}

export default Home;
