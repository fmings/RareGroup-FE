import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
import getCatgories from '../../API/CategoryData';
// import getTags from '../../API/TagData';
import { createPost, updatePost } from '../../API/PostData';

const initialState = {
  title: '',
  image: '',
  content: '',
  approved: true,
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  // const { user } = useAuth();

  useEffect(() => {
    getCatgories().then(setCategories);
    // getTags().then(setTags);

    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = { ...formInput, publicationDate: new Date() };
      updatePost(payload, obj.id).then(() => router.push('/'));
      console.warn(payload);
    } else {
      const updatePayload = { ...formInput, publicationDate: new Date() };
      createPost(updatePayload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Image Input" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Image URL"
          name="image"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* CONTENT INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Content" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Content"
          name="content"
          value={formInput.content}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* CATEGORY SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select
          aria-label="Category"
          name="categoryId"
          onChange={handleChange}
          className="mb-3"
          value={obj.categoryId}
          required
        >
          <option value="">Select a Category</option>
          {
            categories.map((c) => (
              <option
                key={c.id}
                value={parseInt(c.id, 10)}
              >
                {c.label}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* TAG SELECT
      <FloatingLabel controlId="floatingTags">
        <Form.Group className="mb-3">
          {tags.map((tag) => (
            <Form.Check
              type="checkbox"
              name="tag_id"
              label={tag.label}
              checked={obj.tagId}
              onChange={handleChange}
              key={tag.id}
              value={obj.id}
            />
          ))}
        </Form.Group>
      </FloatingLabel> */}

      {/* SUBMIT BUTTON  */}
      <Button variant="primary" type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    categoryId: PropTypes.number,
    // tagId: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
