import React, {useState} from 'react';
import {setCartItems} from '../actions/actionCreators';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const initialForm = {
  phone: '',
  address: '',
  isAgree: false
}

const OrderForm = props => {
  const {items} = useSelector(state => state.cartItems);
  const dispatch = useDispatch();
  const [form, setForm] = useState({...initialForm});

  const handleChange = e => {
    const {id: name, value} = e.target;
    if (name === 'agreement') {
      setForm({...form, isAgree: !form.isAgree});
      return;
    }
    setForm({...form, [name]: value})
  }

  const isOrderBtnDisabled = !(form.isAgree && form.phone && form.address);

  const handleSubmit = e => {
    e.preventDefault();
    const orderData = items.map(item => {
      return {id: item.id, price: item.price, count: item.count}
    });
    fetch(`${process.env.REACT_APP_BASE_URL}order`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        owner: {
          phone: form.phone,
          address: form.address,
        },
        items: orderData
      })
    })
      .then(res => {
        if (res.status === 204) {
          setForm({...initialForm});
          localStorage.removeItem('cart');
          dispatch(setCartItems([]));
        }
      })
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
          <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон" value={form.phone} onChange={handleChange}/>
              </div>
              <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки" value={form.address} onChange={handleChange} />
              </div>
              <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="agreement" value={form.isAgree} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary" disabled={isOrderBtnDisabled}>Оформить</button>
          </form>

      </div>
    </section>
  );
};

OrderForm.propTypes = {
  
};

export default OrderForm;