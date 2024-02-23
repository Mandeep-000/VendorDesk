import React, { useReducer, useContext, useEffect } from 'react';

import reducer from './reducer';
import axios from 'axios';
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


const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',
  showSidebar: false,
  exchangeEdit: false,
  isEditing: false,
  
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlySales: [],

  editProductId: '',
  name: '',
  brand: '',
  quantity: '',
  price: '',
  weight: '',
  unitOptions: ['gm', 'kg', 'lt', 'ml'],
  unit: 'gm',
  exchangeType: '',
  exchangeQuantity: '',
  saleProductId: '',
  orders: [],
  totalOrders: 0,
  products: [],
  totalProducts: 0,
  totalProducts2: 0,
  
  search: '',
  quantityOptions: ['out of stock', 'few', 'average', 'sufficient'],
  searchQuantity: 'all',
  searchBrand: '',
  priceOptions: ['1-100', '101-500', '501-2000', '2001-10000', '>10000'],
  searchPrice: 'all',
  searchExchangeType: 'all',
  searchDateFrom: '',
  searchDateTo: '',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

 


  const createProduct = async () => {
    dispatch({ type: CREATE_PRODUCT_BEGIN });
    try {
      const { name, brand, quantity, price, unit } = state;
      let {weight} = state;
      weight =`${weight} ${unit}`
      await authFetch.post('/products', {
        name,
      brand,
      quantity,
      price,
      weight,
      unit,
      });
      dispatch({ type: CREATE_PRODUCT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getProducts = async () => {
    const { page, search, searchBrand, searchQuantity, searchPrice, sort } = state;
    
    let url = `/products?page=${page}&quantity=${searchQuantity}&price=${searchPrice}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    if (searchBrand) {
      url = url + `&brand=${searchBrand}`;
    }

    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { products, totalProducts, numOfPages } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          
          products,
          totalProducts,
          numOfPages,
        },
      });

      
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };


  const getOrders = async () => {
    
    const { search, searchExchangeType, searchQuantity, searchDateFrom, searchDateTo, sort } = state;
    
    let url = `/products/order?quantity=${searchQuantity}&type=${searchExchangeType}&sort=${sort}`;
    if (searchDateFrom && searchDateTo) {
      url = url + `&dateFrom=${searchDateFrom}&dateTo=${searchDateTo}`;
    }
    if (search) {
      url = url + `&search=${search}`;
    }


    dispatch({ type: GET_ORDERS_BEGIN });
    try {
      const { data } = await authFetch(url); 
      const { orders } = data;

      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: {
          orders,
        },
      });

      
    } catch (error) {
      // logoutUser();
      console.log(error);
    }
    clearAlert();
  };


  const setEditProduct = (id) => {
    dispatch({ type: SET_EDIT_PRODUCT, payload: { id } });
  };
  const editProduct = async () => {
    dispatch({ type: EDIT_PRODUCT_BEGIN });

    try {
      const { name, brand, quantity, price, unit } = state;
      let {weight} = state;
      weight =`${weight} ${unit}`
      await authFetch.patch(`/products/${state.editProductId}`, {
      name,
      brand,
      quantity,
      price,
      weight,
      unit,
      });


  
      dispatch({ type: EDIT_PRODUCT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };



  const setEditSales = (id) => {
    dispatch({ type: SET_EDIT_SALES, payload: { id } });
  };
  const setEditPurchase = (id) => {
    dispatch({ type: SET_EDIT_PURCHASE, payload: { id } });
  };

  const editSales = async () => {
    dispatch({ type: EDIT_SALES_BEGIN });

    try {
      const { exchangeQuantity, exchangeType, price } = state;

      await authFetch.patch(`/products/order/${state.saleProductId}`, {
      exchangeQuantity,
      price,
      exchangeType,
      });

      

      dispatch({ type: EDIT_SALES_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_SALES_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteProduct = async (productId) => {
    dispatch({ type: DELETE_PRODUCT_BEGIN });
    try {
      await authFetch.delete(`/products/${productId}`);
      getProducts();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };





  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/products/stats');
      const { defaultStats, monthlySales, totalProducts} = data
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          defaultStats,
          monthlySales,
          totalProducts,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, location } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };


  
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,

        createProduct,
        getProducts,
        getOrders,
        setEditProduct,
        setEditSales,
        setEditPurchase,
        deleteProduct,
        editProduct,
        editSales,

        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
