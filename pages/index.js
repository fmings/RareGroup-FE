import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllPosts } from '../API/PostData';
import PostCard from '../components/ProductCard';

function Home() {
  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getAllPosts().then((postData) => {
      const sortedPosts = postData.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
      setPosts(sortedPosts);
    });
  };

  console.warn(posts);

  useEffect(() => {
    getAllThePosts(setPosts);
  }, []);

  return (
    <>
      <div className="index">
        <Link href="/post/new" passHref>
          <Button className="add-post-btn">Add A Post</Button>
        </Link>
        <div className="class">
          {posts.map((p) => (
            <PostCard className="posts" key={p.id} postObj={p} onUpdate={getAllThePosts} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
