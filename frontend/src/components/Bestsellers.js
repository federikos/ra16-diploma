import React, {useEffect, useState} from 'react';
import Cards from './Cards';
import PropTypes from 'prop-types';

const fetchBestsellers = (setLoading) => {
  setLoading(true);

  return fetch(`${process.env.REACT_APP_BASE_URL}top-sales`)
    .then(res => res.json())
    .then(res => res)
    .finally(() => setLoading(false))
}

const Bestsellers = props => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBestsellers(setLoading).then(res => setItems(res))
  }, []);

  if (!items.length && !loading) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <Cards loading={loading} items={items} />
    </section>
  );
};

Bestsellers.propTypes = {
  
};

export default Bestsellers;