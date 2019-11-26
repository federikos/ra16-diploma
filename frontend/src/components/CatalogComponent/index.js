import React, {useState, useEffect} from 'react';
import Cards from '../Cards';
import Categories from './Categories';
import Search from './Search';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts, setSearchValue} from '../../actions/actionCreators';
import PropTypes from 'prop-types';

const CatalogComponent = ({search}) => {
  const {items, loading, error, loadBtnVisible} = useSelector(state => state.productsList);
  const {searchString} = useSelector(state => state.search);
  const dispatch = useDispatch();
  const {categoryId} = useSelector(state => state.categoriesList);

  useEffect(() => {
    //при отключении компонента очищаем строку поиска, чтобы на главной отображались все товары
    return () => dispatch(setSearchValue(''));
  }, []);

  useEffect(() => {
    dispatch(fetchProducts(categoryId, 0, searchString));
  }, [categoryId, searchString]);

  const handleLoadMore = () => {
    dispatch(fetchProducts(categoryId, items.length, searchString));
  }

  return (
    <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Search search={search} />
        <Categories />
        <Cards loading={loading} items={items} isCatalog />
        {
            loadBtnVisible
            &&
            <div className="text-center">
                <button className="btn btn-outline-primary" onClick={handleLoadMore}>Загрузить ещё</button>
            </div>
        }
    </section>
  );
};

CatalogComponent.propTypes = {
  
};

export default CatalogComponent;