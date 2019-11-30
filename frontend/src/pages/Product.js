import React, {useEffect, useState} from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import {setCartItems} from '../actions/actionCreators';
import PropTypes from 'prop-types';


const fetchProduct = (setLoading, id) => {
  setLoading(true);

  return fetch(`${process.env.REACT_APP_BASE_URL}items/${id}`)
    .then(res => res.json())
    .then(res => res)
    .finally(() => setLoading(false))
}

const Product = ({match}) => {
  const {id} = match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.cartItems);
  
  const [loading, setLoadig] = useState(false);
  const [product, setProduct] = useState({});
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
    fetchProduct(setLoadig, id)
      .then(res => setProduct(res));
  }, [id]);

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
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>Артикул</td>
                        <td>{product.sku || null}</td>
                    </tr>
                    <tr>
                        <td>Производитель</td>
                        <td>{product.manufacturer || null}</td>
                    </tr>
                    <tr>
                        <td>Цвет</td>
                        <td>{product.color || null}</td>
                    </tr>
                    <tr>
                        <td>Материалы</td>
                        <td>{product.material || null}</td>
                    </tr>
                    <tr>
                        <td>Сезон</td>
                        <td>{product.season || null}</td>
                    </tr>
                    <tr>
                        <td>Повод</td>
                        <td>{product.reason || null}</td>
                    </tr>
                </tbody>
            </table>
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