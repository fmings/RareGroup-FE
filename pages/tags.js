import React, { useEffect, useState } from 'react';
import getTags from '../API/TagData';

export default function ViewCategories() {
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    getTags().then((response) => {
      const sortedTags = response.sort((a, b) => a.label.localeCompare(b.label));
      setTags(sortedTags);
    });
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <div>
      {tags.map((tag) => <h3>{tag.label}</h3>)}
    </div>
  );
}
