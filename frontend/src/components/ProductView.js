import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ProductTable from './ProductTable';
import Loader from './Loader';
import Message from './Message';

const ProductView = ({
  loading, error, isProduct, product, avalibleSizes, selectedSize, setSelectedSize, changeQuantity, selectedQuantity, addToCart,
}) => {
  if (loading) {
    return <Loader loading />;
  }

  if (error) {
    return <Message type="error" message={error} />;
  }

  if (!isProduct) {
    return null;
  }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{product.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={product.images[0]}
            className="img-fluid"
            alt={product.title}
          />
        </div>
        <div className="col-7">
          <ProductTable product={product} />
          {
              avalibleSizes.length
                ? (
                  <>
                    <div className="text-center">
                      <p>
Размеры в наличии:
                        {
                      avalibleSizes
                        .map((size) => (
                          <React.Fragment key={size.size}>
                              &nbsp;
                            <span
                              className={clsx('catalog-item-size', selectedSize === size.size && 'selected')}
                              onClick={() => setSelectedSize(size.size)}
                            >
                              {size.size}
                            </span>
                          </React.Fragment>
                        ))
                    }
                      </p>
                      <p>
Количество:
                        <span className="btn-group btn-group-sm pl-2">
                          <button className="btn btn-secondary" data-type="decrease" onClick={changeQuantity} disabled={selectedQuantity < 2}>-</button>
                          <span className="btn btn-outline-primary">{selectedQuantity}</span>
                          <button className="btn btn-secondary" data-type="increase" onClick={changeQuantity} disabled={selectedQuantity > 9}>+</button>
                        </span>
                      </p>
                    </div>
                    <button className="btn btn-danger btn-block btn-lg" disabled={!selectedSize} onClick={addToCart}>В корзину</button>
                  </>
                )
                : <p>Нет в наличии</p>
            }

        </div>
      </div>
    </section>
  );
};

ProductView.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isProduct: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    sku: PropTypes.string,
    manufacturer: PropTypes.string,
    color: PropTypes.string,
    material: PropTypes.string,
    season: PropTypes.string,
    reason: PropTypes.string,
  }).isRequired,
  avalibleSizes: PropTypes.array,
  selectedSize: PropTypes.string.isRequired,
  setSelectedSize: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  selectedQuantity: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductView;
