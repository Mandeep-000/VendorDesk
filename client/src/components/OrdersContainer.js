import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import {Loading, Alert, Order} from '../components';
import Wrapper from '../assets/wrappers/SalesContainer';
import PageBtnContainer from '../components/PageBtnContainer';


const OrdersContainer = () => {
  const {
    isLoading,
    page,
    search,
    sort,
   
    getOrders,
    orders,
    searchQuantity,
    searchExchangeType,
    searchDateFrom,
    searchDateTo,

    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, [page, search, searchExchangeType, searchDateFrom, searchDateTo, searchQuantity, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (orders.length === 0) {
    return (
      <Wrapper>
        <h2>No orders to display...</h2>
      </Wrapper>
    );
  }


  return (<>
    <Wrapper>
      {showAlert && <Alert />}
      <h2 style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>Order History</h2>
      <table className='jobs'>
        <tr className='header'>
          <th>Date</th>
          <th>Product Name</th>
          <th>Brand</th>
          <th>Quantity</th>
          <th>Revised Stock</th>
          <th>Exchange Type</th>
        </tr>
        
        {orders.map((order, index) => {
            // Find the product associated with the current order
            // const product = products.find((prod) => prod._id === order.product);

            return <Order key={order._id} index={index + 1} {...order} />})}
      </table>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
    </>
  );
};

export default OrdersContainer;
