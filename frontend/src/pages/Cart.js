import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {formatPrice} from '../helpers';
import {useDispatch} from 'react-redux';
import {setCartItemsCount} from '../actions/actionCreators';
import PropTypes from 'prop-types';

const Cart = props => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

//   useEffect(() => {
//       console.log(items)
//       console.log(Array.isArray(items))
//   }, [items])

  const handleDelete = (id, size) => () => {
      const newItems = items.filter(item =>  !(item.id === id && item.size === size));
      setItems(newItems);
      localStorage.setItem('cart', JSON.stringify(newItems));
      dispatch(setCartItemsCount(newItems.length));
  };

  const totalAmount = items.reduce((acc, item) => acc + item.total, 0);

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Название</th>
                      <th scope="col">Размер</th>
                      <th scope="col">Кол-во</th>
                      <th scope="col">Стоимость</th>
                      <th scope="col">Итого</th>
                      <th scope="col">Действия</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      items.map((item, i) => {
                          return (
                            <tr key={item.id}>
                                <th scope="row">{i + 1}</th>
                                <td><Link to={`/catalog/${item.id}`}>{item.title}</Link></td>
                                <td>{item.size}</td>
                                <td>{item.count}</td>
                                <td>{formatPrice(item.price)}</td>
                                <td>{formatPrice(item.total)}</td>
                                <td><button className="btn btn-outline-danger btn-sm" onClick={handleDelete(item.id, item.size)}>Удалить</button></td>
                            </tr>
                          )
                      })
                  }
                  <tr>
                      <td colSpan="5" className="text-right">Общая стоимость</td>
                      <td>{formatPrice(totalAmount)}</td>
                  </tr>
              </tbody>
          </table>
      </section>
      <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
              <form className="card-body">
                  <div className="form-group">
                      <label htmlFor="phone">Телефон</label>
                      <input className="form-control" id="phone" placeholder="Ваш телефон" />
                  </div>
                  <div className="form-group">
                      <label htmlFor="address">Адрес доставки</label>
                      <input className="form-control" id="address" placeholder="Адрес доставки" />
                  </div>
                  <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="agreement" />
                      <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                  </div>
                  <button type="submit" className="btn btn-outline-secondary">Оформить</button>
              </form>

          </div>
      </section>
    </>
  );
};

Cart.propTypes = {
  
};

export default Cart;