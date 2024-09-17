import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { deletePost } from '../API/PostData';

function PostCard({ postObj, onUpdate }) {
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
        <Link href={`/post/edit/${postObj.id}`} passHref>
          <Button>Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPost} className="m-2">
          DELETE
        </Button>
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
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
