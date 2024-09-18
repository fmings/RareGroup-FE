import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TagModal from './TagModal';

export default function PostCard({ postObj }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleTag = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card>
        <Card.Img variant="top" src={postObj.imageUrl} alt={postObj.title} style={{ height: '350px' }} />
        <h1>{postObj.title}</h1>
        <p>{postObj.content}</p>
        <Link href={`/post/${postObj.id}`} passHref>
          <Button>View</Button>
        </Link>
        <Link href={`/post/edit/${postObj.id}`} passHref>
          <Button>Edit</Button>
        </Link>
        { router.asPath === '/myPosts' && <Button onClick={handleTag}>Add a Tag</Button> }
        { isModalOpen && <TagModal onClose={() => setIsModalOpen(false)} postId={postObj.id} /> }
      </Card>
    </>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};
