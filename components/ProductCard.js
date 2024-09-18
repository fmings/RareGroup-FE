import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deletePost } from '../API/PostData';
import { useAuth } from '../utils/context/authContext';
import TagModal from './TagModal';

export default function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleTag = () => {
    setIsModalOpen(true);
  };

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
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
        {user && user.id === postObj.userId && (
          <Link href={`/post/edit/${postObj.id}`} passHref>
            <Button>Edit</Button>
          </Link>
        )}
        {router.asPath === '/myPosts' && <Button onClick={handleTag}>Add a Tag</Button> }
        { isModalOpen && <TagModal onClose={() => setIsModalOpen(false)} postId={postObj.id} /> }
        {user && user.id === postObj.userId && (
          <Button variant="danger" onClick={deleteThisPost} className="m-2">
            DELETE
          </Button>
        )}
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
    userId: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
