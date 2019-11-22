import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const fetchBestsellers = (setLoading) => {
  setLoading(true);

  return fetch(`${process.env.REACT_APP_BASE_URL}top-sales`)
    .then(res => res.json())
    .then(res => res)
    .finally(() => setLoading(false))
}

const formatPrice = (price) => `${price.toFixed(0)} руб.`;

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

      {
        loading 
        &&
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      }

        { !loading &&
          <div className="row">
            {
              items.map(item => {
                return (
                  <div key={item.id} className="col-4">
                    <div className="card">
                      <img 
                      src={item.images[0]}
                      className="card-img-top img-fluid" 
                      alt={item.title} />
                      
                      <div className="card-body">
                        <p className="card-text">{item.title}</p>
                        <p className="card-text">{formatPrice(item.price)}</p>
                        <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
    </section>
  );
};

Bestsellers.propTypes = {
  
};

export default Bestsellers;