import React from 'react';
import {sendOrder, changeFormInput} from '../actions/actionCreators';
import {useDispatch, useSelector} from 'react-redux';

const OrderForm = props => {
  const {items} = useSelector(state => state.cartItems);
  const {form, loading, message} = useSelector(state => state.cartForm);
  const dispatch = useDispatch();

  const handleChange = e => {
    const {id: name, value} = e.currentTarget;
    if (name === 'agreement') {
      dispatch(changeFormInput(name, !form.agreement))
      return;
    }
    dispatch(changeFormInput(name, value))
  }

  const isOrderBtnDisabled = !(form.agreement && form.phone && form.address && items.length);

  const handleSubmit = e => {
    dispatch(sendOrder(items, form));
    e.preventDefault();
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
                  <input type="checkbox" className="form-check-input" id="agreement" checked={form.agreement} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary" disabled={isOrderBtnDisabled}>Оформить</button>
          </form>

      </div>
    </section>
  );
};

export default OrderForm;