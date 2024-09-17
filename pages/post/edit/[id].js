import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PostForm from '../../../components/Form/PostForm';
import { getSinglePost } from '../../../API/PostData';

export default function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditPost);
  }, [id]);

  return <PostForm obj={editPost} />;
}
