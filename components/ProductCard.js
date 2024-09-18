import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { deletePost } from '../API/PostData';
import { useAuth } from '../utils/context/authContext';

export default function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <>
      <div className="postCard">
        <Card style={{ width: '50rem', height: '40rem', margin: '10px' }}>
          <Card.Img variant="top" src={postObj.imageUrl} alt={postObj.title} style={{ height: '450px', width: '800px' }} />
          <h1>{postObj.title}</h1>
          <p>{postObj.content}</p>
          <div>
            <Link href={`/post/${postObj.id}`} passHref>
              <Button className="view-btn">View</Button>
            </Link>
            {user && user.id === postObj.userId && (
            <Link href={`/post/edit/${postObj.id}`} passHref>
              <Button className="edit-btn">Edit</Button>
            </Link>
            )}
            {user && user.id === postObj.userId && (
            <Button className="delete-btn" variant="danger" onClick={deleteThisPost}>
              Delete
            </Button>
            )}
          </div>
        </Card>
      </div>
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
