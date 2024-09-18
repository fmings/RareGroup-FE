import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
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
    <>
      <h1 className="header">All Tags</h1>
      <div className="tag-container">
        {tags.map((tag) => <Card className="tag-card"><h3>{tag.label}</h3></Card>)}
      </div>
    </>
  );
}
