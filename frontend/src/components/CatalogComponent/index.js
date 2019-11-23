import React, {useState, useEffect} from 'react';
import Cards from '../Cards';
import PropTypes from 'prop-types';
import Categories from './Categories';

const getFetchUrl = (id, offset, q) => {
    let fetchUrl = `${process.env.REACT_APP_BASE_URL}items?offset=${offset}`;

    if (id) {
        fetchUrl += `&categoryId=${id}`
    }

    if (q) {
        fetchUrl += `&q=${q}`
    }

  return fetchUrl
}

const fetchItems = (setLoading, id, offset, q) => {
    setLoading(true);
    const fetchUrl = getFetchUrl(id, offset, q);
    return fetch(fetchUrl)
      .then(res => res.json())
      .then(res => res)
      .finally(() => setLoading(false));
  }

const CatalogComponent = ({search}) => {
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoadig] = useState(false);
  const [items, setItems] = useState([]);
  const [loadBtnVisible, setLoadBtnVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setLoadBtnVisible(true);

    fetchItems(setLoadig, categoryId, 0, inputValue)
        .then(async res => {
            if (!res.length || res.length < 6) {
                setLoadBtnVisible(false);
            }
            setItems(res);
        })
  }, [categoryId, inputValue]);

  const handleLoadMore = () => {
    fetchItems(setLoadig, categoryId, items.length, inputValue)
    .then(res => {
        if (!res.length || res.length < 6) {
            setLoadBtnVisible(false);
        }
        setItems(prevItems => [...prevItems, ...res]);
    });
  }

  const handleInputChange = e => {
      setInputValue(e.target.value);
  }

  return (
    <section className="catalog">
        <h2 className="text-center">Каталог</h2>

        {
          search
          &&
          <form className="catalog-search-form form-inline">
            <input className="form-control" placeholder="Поиск" value={inputValue} onChange={handleInputChange} />
          </form>
        }

        <Categories setLoading={setLoadig} categoryId={categoryId} setCategoryId={setCategoryId} />
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