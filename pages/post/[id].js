import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../API/PostData';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setPostDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={postDetails.imageUrl} alt={postDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-dark ms-5 details">
        <h5>Title: {postDetails.title || ''}</h5>
        <p>Date: {postDetails.publicationDate || ''}</p>
        <p>Description: {postDetails.content || ''}</p>
        <hr />
      </div>
    </div>
  );
}
