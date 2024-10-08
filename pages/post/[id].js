/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSinglePost } from '../../API/PostData';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const formattedDate = new Date(postDetails.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap post-details-container">
      <div>
        <h1>{postDetails.title || ''}</h1>
      </div>
      <div className="details-header">
        <div className="category-details">
          {postDetails.categories ? (
            <p className="post-category">Category: {postDetails.categories.label}</p>
          ) : (
            <p>No category selected</p>
          )}
        </div>
      </div>
      <div className="d-flex flex-column">
        <img src={postDetails.imageUrl} alt={postDetails.title} className="post-details-img" />
      </div>
      <div className="text-dark details">
        <p>Posted on {formattedDate || ''}</p>
        <p className="post-content">{postDetails.content || ''}</p>
        <div className="tagContainer">
          {postDetails.tags ? postDetails.tags.map((tag) => (
            <Button
              key={tag.id}
              variant="outline-secondary"
              className="tag-btn-details"
            >
              {tag.label}
            </Button>
          )) : ''}
        </div>
        <hr />
      </div>
    </div>
  );
}
