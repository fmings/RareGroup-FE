import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  FloatingLabel, Button, Modal, Form,
} from 'react-bootstrap';
import { addTagToPost, getTags } from '../API/TagData';

export default function TagModal({ onClose, postId }) {
  const router = useRouter();
  const [tag, setTags] = useState([]);
  const [formInput, setFormInput] = useState([]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  const handleClose = () => {
    addTagToPost(postId, formInput).then(() => {
      onClose();
      router.push('/myPosts');
    });
  };

  const handleChange = (e) => {
    const { type, checked } = e.target;
    if (type === 'checkbox') {
      const currentTagIds = [...formInput];
      const tagId = parseInt(e.target.value, 10); // Assuming value attribute holds tag id
      if (checked) {
        currentTagIds.push(tagId);
      } else {
        const index = currentTagIds.indexOf(tagId);
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
              {tag.map((t) => (
                <Form.Check
                  type="checkbox"
                  name="tagId"
                  label={t.label}
                  checked={formInput.includes(t.id)}
                  onChange={handleChange}
                  key={t.id}
                  value={t.id}
                />
              ))}
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
