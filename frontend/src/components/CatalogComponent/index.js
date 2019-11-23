import React, {useState, useEffect} from 'react';
import Cards from '../Cards';
import PropTypes from 'prop-types';
import Categories from './Categories';

const getFetchUrl = id => {
  if (!id) {
    return `${process.env.REACT_APP_BASE_URL}items`;
  }
  return `${process.env.REACT_APP_BASE_URL}items?categoryId=${id}`
}

const fetchItems = (setLoading, id) => {
    setLoading(true);
    const fetchUrl = getFetchUrl(id);
    return fetch(fetchUrl)
      .then(res => res.json())
      .then(res => res)
      .finally(() => setLoading(false));
  }

const CatalogComponent = ({search}) => {
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoadig] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems(setLoadig, categoryId)
        .then(res => setItems(res));
  }, [categoryId]);

  return (
    <section className="catalog">
        <h2 className="text-center">Каталог</h2>

        {
          search
          &&
          <form className="catalog-search-form form-inline">
            <input className="form-control" placeholder="Поиск" />
          </form>
        }

        <Categories setLoading={setLoadig} categoryId={categoryId} setCategoryId={setCategoryId} />
        <Cards loading={loading} items={items} isCatalog />
        <div className="text-center">
            <button className="btn btn-outline-primary">Загрузить ещё</button>
        </div>
    </section>
  );
};

CatalogComponent.propTypes = {
  
};

export default CatalogComponent;