import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  FloatingLabel, Button, Modal, Form,
} from 'react-bootstrap';
import { addTagToPost, getTags } from '../API/TagData';
import { getSinglePost } from '../API/PostData';

export default function TagModal({ onClose, postId }) {
  const router = useRouter();
  const [tag, setTags] = useState([]);
  const [formInput, setFormInput] = useState([]);

  useEffect(() => {
    Promise.all([getTags(), getSinglePost(postId).then((post) => post.tags)]) // Get all tags and post-specific tags
      .then(([allTags, postTags]) => {
        const availableTags = allTags.filter((t) => !postTags.some((postTag) => postTag.id === t.id));
        setTags(availableTags);
      });
  }, [postId]);

  // This is adding the tag to the post and then closing the modal and then going back to the myPosts page.
  const handleClose = () => {
    addTagToPost(postId, formInput).then(() => {
      onClose();
      router.push('/myPosts');
    });
  };

  const handleChange = (e) => {
    // Destructure event object to get type and checked properties of the target element
    const { type, checked } = e.target;

    if (type === 'checkbox') {
      // Create a copy of the current formInput state using spread syntax
      const currentTagIds = [...formInput];
      const tagId = parseInt(e.target.value, 10); // Assuming value attribute holds tag id
      if (checked) {
        // Add the tag ID to the copied formInput array
        currentTagIds.push(tagId);
      } else {
        // If the checkbox is unchecked, remove the unchecked tagId from the array of tagIds

        // Find the index of the tag ID in the copied formInput array
        const index = currentTagIds.indexOf(tagId);
        // Remove the element at the found index (the tag ID)
        currentTagIds.splice(index, 1);
      }
      setFormInput(currentTagIds);
    }
  };

  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show>
        <Modal.Body>
          <p><strong>Select some Tags</strong></p>
          <FloatingLabel controlId="floatingTags">
            <Form.Group className="mb-3">
              {tag.length !== 0 ? tag.map((t) => (
                <Form.Check
                  type="checkbox"
                  name="tagId"
                  label={t.label}
                  checked={formInput.includes(t.id)}
                  onChange={handleChange}
                  key={t.id}
                  value={t.id}
                />
              )) : <h5>There are no more tags</h5>}
            </Form.Group>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

TagModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
