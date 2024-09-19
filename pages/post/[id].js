import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
      <div className="d-flex flex-column">
        <img src={postDetails.imageUrl} alt={postDetails.title} className="post-details-img" />
      </div>
      <div className="text-dark details">
        <p>Posted on {formattedDate || ''}</p>
        <p className="post-content">{postDetails.content || ''}</p>
        <hr />
      </div>
    </div>
  );
}
