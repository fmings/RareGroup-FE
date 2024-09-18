import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
      <div className="text-center my-4">
        <Link href="/post/new" passHref>
          <Button>Add A Post</Button>
        </Link>
        <div>
          {posts.map((p) => (
            <PostCard className="posts" key={p.id} postObj={p} onUpdate={getAllThePosts} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
