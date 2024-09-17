import React, { useEffect, useState } from 'react';
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
    <div>
      {categories.map((category) => <h3>{category.label}</h3>)}
    </div>
  );
}
