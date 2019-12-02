import {
  CHANGE_FORM_INPUT,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  CLEAR_FORM
} from '../actions/actionTypes'

const initialState = {
  form: {
    phone: '',
    address: '',
    agreement: false,
  },
  loading: false,
  message: null
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM_INPUT:
      const {name, value} = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value
        }
      };
    case CLEAR_FORM:
      return {
        ...state,
        form: {
          ...initialState.form
        }
      }

    case SEND_ORDER_REQUEST:
        return {
          ...state,
          loading: true
        }
    case SEND_ORDER_SUCCESS:
      return {
        ...initialState,
        message: {
          type: 'success',
          message: 'Ваш заказ отправлен',
        }
      }
    case SEND_ORDER_ERROR:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        message: {
          type: 'error',
          message: error
        }
      }
    default:
      return state;
  }
}