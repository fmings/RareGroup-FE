import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
// import getTags from '../../API/TagData';
import { createPost, updatePost } from '../../API/PostData';
import getCatgories from '../../API/CategoryData';

const initialState = {
  title: '',
  imageUrl: '',
  content: '',
  approved: true,
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

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

  const handleChangeForCategory = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      // In this case i parse the value since I need the value to be an integer verse a string and I only a m dealing with one value in the form
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = { ...formInput, publicationDate: new Date() };
      updatePost(payload, obj.id).then(() => router.push('/'));
      console.warn(payload);
    } else {
      const updatePayload = { ...formInput, userId: user.id, publicationDate: new Date() };
      createPost(updatePayload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-dark mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

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
          name="imageUrl"
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
          onChange={handleChangeForCategory}
          className="mb-3"
          value={formInput.categoryId}
          required
        >
          <option value="">Select a Category</option>
          {
            categories.map((c) => (
              <option
                key={c.id}
                value={c.id}
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
      <Button className="create-post-btn" variant="primary" type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
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
