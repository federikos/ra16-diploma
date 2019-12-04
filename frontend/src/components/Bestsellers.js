import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBestsellers } from '../actions/actionCreators';
import { bestsellersListSelector } from '../selectors';
import Cards from './Cards';

const Bestsellers = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(bestsellersListSelector);

  useEffect(() => {
    dispatch(fetchBestsellers());
  }, []);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <Cards loading={loading} error={error} items={items} />
    </section>
  );
};

export default Bestsellers;
