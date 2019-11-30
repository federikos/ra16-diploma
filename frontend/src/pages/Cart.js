import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {formatPrice} from '../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setCartItems} from '../actions/actionCreators';
import PropTypes from 'prop-types';
import OrderForm from '../components/OrderForm';

const Cart = props => {
  const {items} = useSelector(state => state.cartItems);
  const dispatch = useDispatch()

  const handleDelete = (id, size) => () => {
      const newItems = items.filter(item =>  !(item.id === id && item.size === size));
      dispatch(setCartItems(newItems));
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
                            <tr key={item.id + item.size}>
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
      <OrderForm />
    </>
  );
};

Cart.propTypes = {
  
};

export default Cart;