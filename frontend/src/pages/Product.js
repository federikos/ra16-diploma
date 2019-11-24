import React, {useEffect, useState} from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import clsx from 'clsx';
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
    history.push('/cart');
  };

  useEffect(() => {
    fetchProduct(setLoadig, id)
      .then(res => setProduct(res));
  }, [id]);

  if (!Object.keys(product).length) {
    return null;
  }

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
                        <td>{product.sku}</td>
                    </tr>
                    <tr>
                        <td>Производитель</td>
                        <td>{product.manufacturer}</td>
                    </tr>
                    <tr>
                        <td>Цвет</td>
                        <td>{product.color}</td>
                    </tr>
                    <tr>
                        <td>Материалы</td>
                        <td>{product.material}</td>
                    </tr>
                    <tr>
                        <td>Сезон</td>
                        <td>{product.season}</td>
                    </tr>
                    <tr>
                        <td>Повод</td>
                        <td>{product.reason}</td>
                    </tr>
                </tbody>
            </table>
            <div className="text-center">
                <p>Размеры в наличии: 
                  {
                    product.sizes
                      .filter(size => size.avalible)
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
            <button className="btn btn-danger btn-block btn-lg" onClick={addToCart}>В корзину</button>
        </div>
      </div>
    </section>
  );
};

Product.propTypes = {
  
};

export default withRouter(Product);