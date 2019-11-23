import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const fetchCategories = (setLoading) => {
  setLoading(true);

  return fetch(`${process.env.REACT_APP_BASE_URL}categories`)
    .then(res => res.json())
    .then(res => res)
    .finally(() => setLoading(false));
}

const Categories = ({setLoading, categoryId, setCategoryId}) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});

  useEffect(() => {
    fetchCategories(setLoading)
      .then(res => {
        setCategories(res);
      })
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setCategoryId(id);
  }
  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
          <a className={clsx("nav-link", categoryId === null && 'active')} href="#" onClick={e => handleClick(e, null)}>Все</a>
      </li>
      {
        categories.map(category => {
          return (
            <li key={category.id} className="nav-item">
              <a className={clsx("nav-link", categoryId === category.id && 'active')} href="#" onClick={e => handleClick(e, category.id)}>{category.title}</a>
            </li>
          )
        })
      }
    </ul>
  );
};

Categories.propTypes = {
  
};

export default Categories;