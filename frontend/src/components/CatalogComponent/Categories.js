import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useSelector, useDispatch} from 'react-redux';
import {categoriesListSelector} from '../../selectors';
import {fetchCategories, setCategoryId, fetchProducts, clearProducts} from '../../actions/actionCreators';
import Message from '../Message';
import Loader from '../Loader';

const Categories = () => {
  const dispatch = useDispatch();
  const {items, categoryId, loading, error} = useSelector(categoriesListSelector);
  const itemsWithAll = [{title: 'Все', id: null}].concat(items);

  const handleClick = (e, id) => {
    e.preventDefault();
    dispatch(setCategoryId(id));
    dispatch(fetchProducts(0));
  }

  if(loading) return <Loader loading />
  if(error) return <Message type="error" message={error} />

  return (
    <ul className="catalog-categories nav justify-content-center">
      {
        itemsWithAll.map(category => {
          return (
            <li key={category.id} className="nav-item">
              <a 
              className={clsx("nav-link", categoryId === category.id && 'active')} 
              href="#" 
              onClick={e => handleClick(e, category.id)}>
                {category.title}
              </a>
            </li>
          )
        })
      }
    </ul>
  );
};

export default Categories;