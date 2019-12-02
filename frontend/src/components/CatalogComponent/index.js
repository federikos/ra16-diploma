import React, {useState, useEffect} from 'react';
import Cards from '../Cards';
import Categories from './Categories';
import Search from './Search';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts, setSearchValue, setCategoryId, fetchCategories} from '../../actions/actionCreators';
import Loader from '../Loader';
import PropTypes from 'prop-types';

const CatalogComponent = ({search}) => {
  const {items, loading: cardsLoading, error, loadBtnVisible} = useSelector(state => state.productsList);
  const {loading: categoriesLoading} = useSelector(state => state.categoriesList);
  const {searchString} = useSelector(state => state.search);
  const dispatch = useDispatch();
  const {categoryId} = useSelector(state => state.categoriesList);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(0));
    //при отключении компонента сбрасываем строку поиска и категорию, чтобы на главной отображались все товары
    return () => {
      dispatch(setSearchValue(''));
      dispatch(setCategoryId(null))
    };
  }, []);

  const handleLoadMore = () => {
    dispatch(fetchProducts(items.length));
  }

  //пока оба компонента (карточки товаров и категории) не загрузились - отображаем общий лоадер на уровне каталога.
  const catalogLoading = cardsLoading && categoriesLoading;

  return (
    <section className="catalog">
        <h2 className="text-center">Каталог</h2>
          <Search search={search} />
          {
            !catalogLoading &&
              <>
              <Categories />
              <Cards loading={cardsLoading} items={items} isCatalog />
              {
                loadBtnVisible
                &&
                <div className="text-center">
                    <button className="btn btn-outline-primary" onClick={handleLoadMore}>Загрузить ещё</button>
                </div>
              }
            </>
          }
        <Loader loading={catalogLoading} />
    </section>
  );
};

CatalogComponent.propTypes = {
  
};

export default CatalogComponent;