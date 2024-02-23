import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_ORDERS_BEGIN,
  GET_ORDERS_SUCCESS,
  SET_EDIT_PRODUCT,
  SET_EDIT_SALES,
  SET_EDIT_PURCHASE,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_ERROR,
  EDIT_PRODUCT_BEGIN,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_SALES_BEGIN,
  EDIT_SALES_SUCCESS,
  EDIT_SALES_ERROR,

  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editProductId: '',
      name: '',
      brand: '',
      quantity: '',
      price: '',
      weight: '',
      exchangeQuantity: '',
      
    };
  
    return {
      ...state,
      ...initialState,
    };
  }




  if (action.type === CREATE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Product Created!',
    };
  }
  if (action.type === CREATE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      products: action.payload.products,
      totalProducts: action.payload.totalProducts,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_ORDERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_ORDERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      orders: action.payload.orders,
    };
  }
  if (action.type === SET_EDIT_PRODUCT) {
    const product = state.products.find((product) => product._id === action.payload.id);
    const { _id, name, brand, quantity, price } = product;

    let {weight} = product;
    const splitted = weight.split(" ");
    weight = splitted[0];

    let unit;
    if(!(weight === '')){
      unit = splitted[1];
    }else{
      unit = 'gm'
    }

    return {
      ...state,
      isEditing: true,
      editProductId: _id,
      name,
      brand,
      quantity,
      price,
      weight,
      unit,
    };
  }


  if (action.type === SET_EDIT_SALES) {
    const product = state.products.find((product) => product._id === action.payload.id);
    const { _id, name, brand, quantity, price } = product;

    let {weight} = product;
    const splitted = weight.split(" ");
    weight = splitted[0];

    let unit;
    if(!(weight === '')){
      unit = splitted[1];
    }else{
      unit = 'gm'
    }

    return {
      ...state,
      saleProductId: _id,
      name,
      brand,
      quantity,
      price,
      weight,
      unit,
      exchangeType: 'sales',
    };
  }

  if (action.type === SET_EDIT_PURCHASE) {
    const product = state.products.find((product) => product._id === action.payload.id);
    const { _id, name, brand, quantity, price } = product;

    let {weight} = product;
    const splitted = weight.split(" ");
    weight = splitted[0];

    let unit;
    if(!(weight === '')){
      unit = splitted[1];
    }else{
      unit = 'gm'
    }

    return {
      ...state,
      saleProductId: _id,
      name,
      brand,
      quantity,
      price,
      weight,
      unit,
      exchangeType: 'purchase',
    };
  }


  if (action.type === DELETE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === EDIT_PRODUCT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Product Updated!',
    };
  }
  if (action.type === EDIT_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === EDIT_SALES_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_SALES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Product Updated!',
    };
  }
  if (action.type === EDIT_SALES_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }




  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'Success',
      alertText: "Stats Updated",
      stats: action.payload.defaultStats,
      monthlySales: action.payload.monthlySales,
      totalProducts2: action.payload.totalProducts,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchBrand: '',
      searchQuantity: 'all',
      searchPrice: 'all',
      searchDateFrom: '',
      searchDateTo: '',
      searchExchangeType: 'all',
      sort: 'latest',
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, userLoading: true, showAlert: false };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
