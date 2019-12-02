import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Cards from '../Cards';
import Categories from './Categories';
import Search from './Search';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts, setSearchValue, setCategoryId, fetchCategories} from '../../actions/actionCreators';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import LoadBtn from './LoadBtn';

const CatalogComponent = ({match}) => {
  const dispatch = useDispatch();
  const {items, loading: cardsLoading} = useSelector(state => state.productsList);
  const {loading: categoriesLoading} = useSelector(state => state.categoriesList);
  const isCatalogPage = match.path === '/catalog';

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(0));

    //При отключении компонента сбрасываем строку поиска и категорию для каталога, 
    //чтобы при смене страницы отображались все товары
    //Чтобы не сломать поиск при переходе из Header'а, строку поиска обнуляем
    //только если он расположен на странице Каталог

    return () => {
      if (isCatalogPage) {
        dispatch(setSearchValue(''));
      }
      dispatch(setCategoryId(null))
    };
  }, []);

  //пока оба компонента (карточки товаров и категории) не загрузились - отображаем общий лоадер для всего каталога.
  const catalogLoading = cardsLoading && categoriesLoading;

  return (
    <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Search isVisible={isCatalogPage} />
          {
            !catalogLoading &&
              <>
              <Categories />
              <Cards loading={cardsLoading} items={items} isCatalog />
              <LoadBtn items={items} />
            </>
          }
        <Loader loading={catalogLoading} />
    </section>
  );
};

CatalogComponent.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(CatalogComponent);