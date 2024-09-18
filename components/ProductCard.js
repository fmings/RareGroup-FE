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

  // This function sets the state to true so when the add to tag button is clicked it will open to Modal
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
        {postObj.tags ? postObj.tags.map((tag) => (
          <p key={tag.id} className="tag">
            {tag.label}
          </p>
        )) : ''}
        <Link href={`/post/${postObj.id}`} passHref>
          <Button>View</Button>
        </Link>
        {user && user.id === postObj.userId && (
          <Link href={`/post/edit/${postObj.id}`} passHref>
            <Button>Edit</Button>
          </Link>
        )}
        {router.asPath === '/myPosts' && <Button onClick={handleTag}>Add a Tag</Button> }
        {/* As long as isModalOpen is true, the tag modal will open and we are setting the modal state to false in the onlose function so it can be can be passed to the function that will be used by a button in the TagModal component that will close the Modal */}
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
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
