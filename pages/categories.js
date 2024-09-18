import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import getCategories from '../API/CategoryData';

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    getCategories().then((response) => {
      const sortedCategories = response.sort((a, b) => a.label.localeCompare(b.label));
      setCategories(sortedCategories);
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <h1 className="header">All Categories</h1>
      <div className="category-container">
        {categories.map((category) => <div><Card style={{ width: '18rem' }} className="category-card"><h3>{category.label}</h3></Card></div>)}
      </div>
    </>
  );
}
