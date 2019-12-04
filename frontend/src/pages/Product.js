import React, {useEffect, useState} from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import {setCartItems, fetchProduct} from '../actions/actionCreators';
import PropTypes from 'prop-types';
import ProductTable from '../components/ProductTable';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { cartItemsSelector, productSelector } from '../selectors';

const Product = ({match}) => {
  const {id} = match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const {items} = useSelector(cartItemsSelector);
  const {product, loading, error} = useSelector(productSelector);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const changeQuantity = e => {
    const {type} = e.currentTarget.dataset;
    setSelectedQuantity(prevQuantity => {
      if (type === 'increase') {
        return prevQuantity + 1;
      }
      return prevQuantity - 1;
    })
  }

  const addToCart = () => {
    const foundItem = items.find(item => item.id === product.id && item.size === selectedSize);
    let newItems = [...items.map(item => {
      return {...item}
    })];
    let newItem;
    
    if (!foundItem) {
      newItem = {
        id: product.id,
        title: product.title,
        size: selectedSize,
        price: product.price,
        total: product.price * selectedQuantity,
        count: selectedQuantity,
      };
    }

    if(foundItem) {
      newItem = {
        ...foundItem,
        count: foundItem.count + selectedQuantity,
        price: product.price,
        total: foundItem.total + product.price * selectedQuantity,
      };

      newItems = items.filter(item => !(item.id === product.id && item.size === selectedSize));
    }

    newItems = newItems.concat(newItem)
    dispatch(setCartItems(newItems));
    history.push('/cart');
  };

  useEffect(() => {
    dispatch(fetchProduct(history, id));
  }, [id]);

  if (loading) {
    return <Loader loading={true} />
  }

  if (error) {
    return <Message type='error' message={error} />
  }

  if (!Object.keys(product).length) {
    return null;
  }

  const avalibleSizes = product.sizes.filter(size => size.avalible);

  return (
    <section className="catalog-item">
      <h2 className="text-center">{product.title}</h2>
      <div className="row">
        <div className="col-5">
            <img src={product.images[0]}
                className="img-fluid" alt={product.title} />
        </div>
        <div className="col-7">
          <ProductTable product={product} />
            {
              avalibleSizes.length
              ?
              <>
                <div className="text-center">
                  <p>Размеры в наличии: 
                    {
                      avalibleSizes
                        .map(size => {
                          return (
                            <React.Fragment key={size.size}>
                              &nbsp;<span
                              className={clsx("catalog-item-size", selectedSize === size.size && "selected")}
                              onClick={() => setSelectedSize(size.size)}
                              >
                                {size.size}
                              </span>
                            </React.Fragment>
                          )
                        })
                    }
                  </p>
                  <p>Количество: <span className="btn-group btn-group-sm pl-2">
                    <button className="btn btn-secondary" data-type='decrease' onClick={changeQuantity} disabled={selectedQuantity < 2}>-</button>
                    <span className="btn btn-outline-primary">{selectedQuantity}</span>
                    <button className="btn btn-secondary" data-type='increase' onClick={changeQuantity} disabled={selectedQuantity > 9}>+</button>
                    </span>
                  </p>
                </div>
                <button className="btn btn-danger btn-block btn-lg" disabled={!Boolean(selectedSize)} onClick={addToCart}>В корзину</button>
              </>
              : <p>Нет в наличии</p>
            }

        </div>
      </div>
    </section>
  );
};

Product.propTypes = {
  
};

export default withRouter(Product);