import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts} from '../../actions/actionCreators';

const LoadBtn = ({items}) => {
  const dispatch = useDispatch();
  const {loadBtnVisible} = useSelector(state => state.productsList);
  const handleLoadMore = () => {
    dispatch(fetchProducts(items.length));
  }

  if (!loadBtnVisible) return null;
  
  return (
    <div className="text-center">
        <button className="btn btn-outline-primary" onClick={handleLoadMore}>Загрузить ещё</button>
    </div>
  )
};

export default LoadBtn;