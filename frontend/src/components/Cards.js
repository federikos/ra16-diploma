import React from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {formatPrice} from '../helpers/index';
import PropTypes from 'prop-types';

const Cards = ({loading, items, isCatalog}) => {
  return (
    <>
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
                <div key={item.id} className={clsx("col-4", isCatalog && "catalog-item-card-wrapper")}>
                  <div className={clsx("card", isCatalog && "catalog-item-card")}>
                    <img 
                    src={item.images[0]}
                    className="card-img-top img-fluid" 
                    alt={item.title} />
                    
                    <div className="card-body">
                      <p className="card-text">{item.title}</p>
                      <p className="card-text">{formatPrice(item.price)}</p>
                      <Link to={`catalog/${item.id}`} className="btn btn-outline-primary">Заказать</Link>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      }
    </>
  );
};

Cards.propTypes = {
  
};

export default Cards;